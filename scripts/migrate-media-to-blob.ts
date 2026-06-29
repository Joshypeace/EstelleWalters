/**
 * One-time migration: upload everything under public/content and public/logos
 * to Vercel Blob, record each as a MediaAsset, and rewrite DB references
 * (journal/travel featured images + galleries, reels, venture logos) from the
 * local `/content/...` paths to their Blob URLs.
 *
 * Idempotent: re-running overwrites the same Blob pathnames and re-points refs.
 * Repo files are left in place; remove them in a later cleanup once verified.
 *
 * Run with: pnpm migrate:media
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, posix } from 'node:path'
import { put } from '@vercel/blob'
import { db } from '../src/server/db'

const PUBLIC_DIR = join(process.cwd(), 'public')
const ROOTS = ['content', 'logos']

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...(await walk(full)))
    else files.push(full)
  }
  return files
}

function toPathname(absPath: string): string {
  // public/content/beauty/x.jpg -> content/beauty/x.jpg (posix separators)
  return absPath.slice(PUBLIC_DIR.length + 1).split(/[\\/]/).join(posix.sep)
}

function deriveFolder(pathname: string) {
  const parts = pathname.split('/')
  return parts.length > 1 ? parts.slice(0, -1).join('/') : 'uploads'
}

async function main() {
  const map = new Map<string, string>() // '/content/..' -> blob url

  for (const root of ROOTS) {
    let files: string[]
    try {
      files = await walk(join(PUBLIC_DIR, root))
    } catch {
      console.warn(`(skip) public/${root} not found`)
      continue
    }
    for (const abs of files) {
      const pathname = toPathname(abs)
      const buffer = await readFile(abs)
      const blob = await put(pathname, buffer, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
      })
      map.set('/' + pathname, blob.url)
      await db.mediaAsset.upsert({
        where: { url: blob.url },
        update: { pathname, folder: deriveFolder(pathname) },
        create: {
          url: blob.url,
          pathname,
          folder: deriveFolder(pathname),
          filename: pathname.split('/').pop() ?? pathname,
          contentType: blob.contentType ?? null,
          size: buffer.byteLength,
        },
      })
      console.log(`↑ ${pathname}`)
    }
  }

  console.log(`\nUploaded ${map.size} files. Rewriting DB references…`)
  const remap = (v: string | null | undefined) => (v && map.get(v)) || v

  // Journal: featured image + gallery
  for (const p of await db.journalPost.findMany({ include: { gallery: true } })) {
    const newFeatured = remap(p.featuredImageUrl)
    if (newFeatured !== p.featuredImageUrl) {
      await db.journalPost.update({ where: { id: p.id }, data: { featuredImageUrl: newFeatured! } })
    }
    for (const g of p.gallery) {
      const ns = remap(g.src)
      if (ns !== g.src) await db.galleryImage.update({ where: { id: g.id }, data: { src: ns! } })
    }
  }

  // Travel: featured image + gallery
  for (const p of await db.travelPost.findMany({ include: { gallery: true } })) {
    const newFeatured = remap(p.featuredImageUrl)
    if (newFeatured !== p.featuredImageUrl) {
      await db.travelPost.update({ where: { id: p.id }, data: { featuredImageUrl: newFeatured! } })
    }
    for (const g of p.gallery) {
      const ns = remap(g.src)
      if (ns !== g.src) await db.galleryImage.update({ where: { id: g.id }, data: { src: ns! } })
    }
  }

  // Reels (video src) + venture logos
  for (const r of await db.reel.findMany()) {
    const ns = remap(r.src)
    if (ns !== r.src) await db.reel.update({ where: { id: r.id }, data: { src: ns! } })
  }
  for (const v of await db.venture.findMany()) {
    const nl = remap(v.logoUrl)
    if (nl !== v.logoUrl) await db.venture.update({ where: { id: v.id }, data: { logoUrl: nl! } })
  }

  console.log('✓ Migration complete. DB references now point to Vercel Blob.')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
