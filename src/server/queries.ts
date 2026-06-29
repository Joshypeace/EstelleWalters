// Server-side read helpers for the public site. These return the same shapes
// as the original src/lib/* modules so public pages/components need minimal
// changes. Only PUBLISHED content is returned.
import { db } from './db'
import type { JournalPost } from '@/lib/journal'
import type { TravelPost } from '@/lib/travel'
import type { Venture } from '@/lib/ventures'
import type { GalleryPhoto } from '@/components/ui/photo-gallery'
import type { SocialPost } from '@/components/ui/social-embeds'

type GalleryRow = { src: string; alt: string | null; caption: string | null; category: string | null }
type SocialRow = { id: string; type: 'instagram' | 'tiktok'; url: string; caption: string | null; externalId: string | null }

const mapGallery = (g: GalleryRow[]): GalleryPhoto[] =>
  g.map((x) => ({ src: x.src, alt: x.alt ?? '', caption: x.caption ?? '', category: x.category ?? '' }))

const mapSocial = (s: SocialRow[]): SocialPost[] =>
  s.map((x) => ({
    id: x.id,
    type: x.type,
    url: x.url,
    caption: x.caption ?? '',
    ...(x.type === 'instagram' ? { postId: x.externalId ?? undefined } : { videoId: x.externalId ?? undefined }),
  }))

// ---------------- Ventures ----------------

function mapVenture(v: {
  slug: string; name: string; tagline: string; description: string
  highlights: string[]; url: string; site: string; logoUrl: string
}): Venture {
  return {
    slug: v.slug,
    name: v.name,
    tagline: v.tagline,
    description: v.description,
    highlights: v.highlights,
    url: v.url,
    site: v.site,
    logo: v.logoUrl,
  }
}

export async function getVentures(): Promise<Venture[]> {
  const rows = await db.venture.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { sortOrder: 'asc' },
  })
  return rows.map(mapVenture)
}

export async function getVentureBySlug(slug: string): Promise<Venture | null> {
  const v = await db.venture.findFirst({ where: { slug, status: 'PUBLISHED' } })
  return v ? mapVenture(v) : null
}

// ---------------- Connected ventures ----------------

export type ConnectedProject = { name: string; description: string; url: string; status?: string }

export async function getConnectedVentures(): Promise<ConnectedProject[]> {
  const rows = await db.connectedVenture.findMany({ orderBy: { sortOrder: 'asc' } })
  return rows.map((c) => ({
    name: c.name,
    description: c.description,
    url: c.url,
    ...(c.status === 'COMING_SOON' ? { status: 'Coming Soon' } : {}),
  }))
}

// ---------------- Journal ----------------

function mapJournal(p: {
  slug: string; title: string; excerpt: string; date: string; readTime: string
  category: string; author: string; featuredImageUrl: string; content: string
  venture: { slug: string } | null; gallery: GalleryRow[]
}): JournalPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    readTime: p.readTime,
    category: p.category,
    author: p.author,
    featuredImage: p.featuredImageUrl,
    gallery: p.gallery.length ? mapGallery(p.gallery) : undefined,
    venture: p.venture?.slug,
    content: p.content,
  }
}

const journalInclude = { gallery: { orderBy: { sortOrder: 'asc' as const } }, venture: true }

export async function getPublishedJournalPosts(): Promise<JournalPost[]> {
  const rows = await db.journalPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { sortOrder: 'asc' },
    include: journalInclude,
  })
  return rows.map(mapJournal)
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const p = await db.journalPost.findFirst({
    where: { slug, status: 'PUBLISHED' },
    include: journalInclude,
  })
  return p ? mapJournal(p) : null
}

export async function getJournalPostsByVenture(ventureSlug: string): Promise<JournalPost[]> {
  const rows = await db.journalPost.findMany({
    where: { status: 'PUBLISHED', venture: { slug: ventureSlug } },
    orderBy: { sortOrder: 'asc' },
    include: journalInclude,
  })
  return rows.map(mapJournal)
}

// ---------------- Travel ----------------

function mapTravel(p: {
  slug: string; title: string; excerpt: string; date: string; country: string
  category: string; readTime: string; featuredImageUrl: string; content: string
  gallery: GalleryRow[]; social: SocialRow[]
}): TravelPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    country: p.country,
    category: p.category,
    readTime: p.readTime,
    featuredImage: p.featuredImageUrl,
    gallery: p.gallery.length ? mapGallery(p.gallery) : undefined,
    social: p.social.length ? mapSocial(p.social) : undefined,
    content: p.content,
  }
}

const travelInclude = {
  gallery: { orderBy: { sortOrder: 'asc' as const } },
  social: { orderBy: { sortOrder: 'asc' as const } },
}

export async function getPublishedTravelPosts(): Promise<TravelPost[]> {
  const rows = await db.travelPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { sortOrder: 'asc' },
    include: travelInclude,
  })
  return rows.map(mapTravel)
}

export async function getTravelPostBySlug(slug: string): Promise<TravelPost | null> {
  const p = await db.travelPost.findFirst({
    where: { slug, status: 'PUBLISHED' },
    include: travelInclude,
  })
  return p ? mapTravel(p) : null
}

// ---------------- Reels ----------------

export type Reel = { title: string; src: string; description: string }

export async function getReels(): Promise<Reel[]> {
  const rows = await db.reel.findMany({ orderBy: { sortOrder: 'asc' } })
  return rows.map((r) => ({ title: r.title, src: r.src, description: r.description ?? '' }))
}

// ---------------- Page content ----------------

type PageDataShape = { sections: { fields: { key: string; value: string }[] }[] }

// Returns a flat { fieldKey: value } map for the given page key. Field keys are
// unique within a page (see prisma/seed-data.ts), so flattening is safe.
export async function getPageContent(key: string): Promise<Record<string, string>> {
  const row = await db.pageContent.findUnique({ where: { key } })
  const data = row?.data as PageDataShape | undefined
  const map: Record<string, string> = {}
  for (const section of data?.sections ?? []) {
    for (const field of section.fields) map[field.key] = field.value
  }
  return map
}
