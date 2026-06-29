import bcrypt from 'bcryptjs'
import { db } from '../src/server/db'
import { ventures } from '../src/lib/ventures'
import { journalPosts } from '../src/lib/journal'
import { travelPosts } from '../src/lib/travel'
import {
  teamMembers,
  testimonials,
  reels,
  connectedVentures,
  pageContents,
  settings,
} from './seed-data'

// Seed the bootstrap owner: a single pre-approved ADMIN read from env vars.
async function seedOwner() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.toLowerCase()
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD
  const name = process.env.BOOTSTRAP_ADMIN_NAME ?? 'Owner'

  if (!email || !password) {
    console.warn('⚠ BOOTSTRAP_ADMIN_EMAIL / BOOTSTRAP_ADMIN_PASSWORD not set — skipping owner seed.')
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const owner = await db.user.upsert({
    where: { email },
    update: { role: 'ADMIN', approvalStatus: 'APPROVED', name },
    create: { email, name, passwordHash, role: 'ADMIN', approvalStatus: 'APPROVED' },
  })
  console.log(`✓ Owner ready: ${owner.email} (ADMIN, APPROVED)`)
}

async function seedVentures() {
  for (const [i, v] of ventures.entries()) {
    const data = {
      name: v.name,
      tagline: v.tagline,
      description: v.description,
      highlights: v.highlights,
      url: v.url,
      site: v.site,
      logoUrl: v.logo,
      sortOrder: i,
    }
    await db.venture.upsert({
      where: { slug: v.slug },
      update: data,
      create: { slug: v.slug, ...data },
    })
  }
  console.log(`✓ Ventures: ${ventures.length}`)
}

/** Map venture slug -> id for foreign keys. */
async function ventureIdMap() {
  const rows = await db.venture.findMany({ select: { id: true, slug: true } })
  return new Map(rows.map((r) => [r.slug, r.id]))
}

async function seedJournal(venturesBySlug: Map<string, string>) {
  for (const [i, p] of journalPosts.entries()) {
    const galleryRows = (p.gallery ?? []).map((g, gi) => ({
      src: g.src,
      alt: g.alt ?? null,
      caption: g.caption ?? null,
      category: g.category ?? null,
      sortOrder: gi,
    }))
    const data = {
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      author: p.author,
      date: p.date,
      readTime: p.readTime,
      featuredImageUrl: p.featuredImage,
      ventureId: p.venture ? venturesBySlug.get(p.venture) ?? null : null,
      sortOrder: i,
    }
    await db.journalPost.upsert({
      where: { slug: p.slug },
      update: { ...data, gallery: { deleteMany: {}, create: galleryRows } },
      create: { slug: p.slug, ...data, gallery: { create: galleryRows } },
    })
  }
  console.log(`✓ Journal posts: ${journalPosts.length}`)
}

async function seedTravel() {
  for (const [i, p] of travelPosts.entries()) {
    const galleryRows = (p.gallery ?? []).map((g, gi) => ({
      src: g.src,
      alt: g.alt ?? null,
      caption: g.caption ?? null,
      category: g.category ?? null,
      sortOrder: gi,
    }))
    const socialRows = (p.social ?? []).map((s, si) => ({
      type: s.type,
      url: s.url,
      caption: s.caption ?? null,
      externalId: s.postId ?? s.videoId ?? null,
      sortOrder: si,
    }))
    const data = {
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      country: p.country,
      category: p.category,
      date: p.date,
      readTime: p.readTime,
      featuredImageUrl: p.featuredImage,
      sortOrder: i,
    }
    await db.travelPost.upsert({
      where: { slug: p.slug },
      update: {
        ...data,
        gallery: { deleteMany: {}, create: galleryRows },
        social: { deleteMany: {}, create: socialRows },
      },
      create: {
        slug: p.slug,
        ...data,
        gallery: { create: galleryRows },
        social: { create: socialRows },
      },
    })
  }
  console.log(`✓ Travel posts: ${travelPosts.length}`)
}

async function seedTeam(venturesBySlug: Map<string, string>) {
  await db.teamMember.deleteMany()
  await db.teamMember.createMany({
    data: teamMembers.map((m, i) => ({
      name: m.name,
      role: m.role,
      ventureId: venturesBySlug.get(m.ventureSlug) ?? null,
      sortOrder: i,
    })),
  })
  console.log(`✓ Team members: ${teamMembers.length}`)
}

async function seedTestimonials(venturesBySlug: Map<string, string>) {
  await db.testimonial.deleteMany()
  await db.testimonial.createMany({
    data: testimonials.map((t, i) => ({
      author: t.author,
      role: t.role,
      text: t.text,
      ventureId: venturesBySlug.get(t.ventureSlug) ?? null,
      sortOrder: i,
    })),
  })
  console.log(`✓ Testimonials: ${testimonials.length}`)
}

async function seedReels() {
  await db.reel.deleteMany()
  await db.reel.createMany({
    data: reels.map((r, i) => ({ title: r.title, src: r.src, description: r.description, sortOrder: i })),
  })
  console.log(`✓ Reels: ${reels.length}`)
}

async function seedConnectedVentures() {
  await db.connectedVenture.deleteMany()
  await db.connectedVenture.createMany({
    data: connectedVentures.map((c, i) => ({
      name: c.name,
      description: c.description,
      url: c.url,
      status: c.status,
      sortOrder: i,
    })),
  })
  console.log(`✓ Connected ventures: ${connectedVentures.length}`)
}

async function seedPages() {
  for (const p of pageContents) {
    await db.pageContent.upsert({
      where: { key: p.key },
      update: { label: p.label, data: p.data },
      create: { key: p.key, label: p.label, data: p.data },
    })
  }
  console.log(`✓ Pages: ${pageContents.length}`)
}

async function seedSettings() {
  for (const s of settings) {
    await db.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    })
  }
  console.log(`✓ Settings: ${settings.length}`)
}

async function main() {
  await seedOwner()
  await seedVentures()
  const venturesBySlug = await ventureIdMap()
  await seedJournal(venturesBySlug)
  await seedTravel()
  await seedTeam(venturesBySlug)
  await seedTestimonials(venturesBySlug)
  await seedReels()
  await seedConnectedVentures()
  await seedPages()
  await seedSettings()
  console.log('✓ Seed complete.')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
