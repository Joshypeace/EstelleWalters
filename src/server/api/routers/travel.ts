import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const travelFields = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and dashes'),
  country: z.string().default(''),
  category: z.string().default(''),
  date: z.string().default(''),
  readTime: z.string().default(''),
  status: z.string().default('Draft'),
  excerpt: z.string().default(''),
  featuredImage: z.string().default(''),
  gallery: z.array(z.string()).default([]),
  social: z.array(z.string()).default([]), // post URLs
  content: z.string().default(''),
})

const toStatus = (s: string) => (s === 'Published' ? 'PUBLISHED' : 'DRAFT')
const fromStatus = (s: string) => (s === 'PUBLISHED' ? 'Published' : 'Draft')

const galleryRows = (srcs: string[]) =>
  srcs.filter(Boolean).map((src, i) => ({ src, sortOrder: i }))

// Derive the platform + external id from a pasted social URL.
function socialRows(urls: string[]) {
  return urls.filter(Boolean).map((url, i) => {
    const isTikTok = /tiktok\.com/i.test(url)
    const igMatch = url.match(/instagram\.com\/(?:p|reel)\/([\w-]+)/i)
    return {
      type: (isTikTok ? 'tiktok' : 'instagram') as 'tiktok' | 'instagram',
      url,
      externalId: igMatch?.[1] ?? null,
      sortOrder: i,
    }
  })
}

export const travelRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.travelPost.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        gallery: { orderBy: { sortOrder: 'asc' } },
        social: { orderBy: { sortOrder: 'asc' } },
      },
    })
    return rows.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      country: p.country,
      category: p.category,
      date: p.date,
      readTime: p.readTime,
      status: fromStatus(p.status),
      excerpt: p.excerpt,
      featuredImage: p.featuredImageUrl,
      gallery: p.gallery.map((g) => g.src),
      social: p.social.map((s) => s.url),
      content: p.content,
    }))
  }),

  create: protectedProcedure.input(travelFields).mutation(async ({ ctx, input }) => {
    const count = await ctx.db.travelPost.count()
    return ctx.db.travelPost.create({
      data: {
        title: input.title,
        slug: input.slug,
        country: input.country,
        category: input.category,
        date: input.date,
        readTime: input.readTime,
        status: toStatus(input.status),
        excerpt: input.excerpt,
        featuredImageUrl: input.featuredImage,
        content: input.content,
        sortOrder: count,
        gallery: { create: galleryRows(input.gallery) },
        social: { create: socialRows(input.social) },
      },
    })
  }),

  update: protectedProcedure
    .input(travelFields.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.travelPost.update({
        where: { id: input.id },
        data: {
          title: input.title,
          slug: input.slug,
          country: input.country,
          category: input.category,
          date: input.date,
          readTime: input.readTime,
          status: toStatus(input.status),
          excerpt: input.excerpt,
          featuredImageUrl: input.featuredImage,
          content: input.content,
          gallery: { deleteMany: {}, create: galleryRows(input.gallery) },
          social: { deleteMany: {}, create: socialRows(input.social) },
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.travelPost.delete({ where: { id: input.id } })
      return { ok: true }
    }),
})
