import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

const journalFields = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and dashes'),
  category: z.string().default(''),
  venture: z.string().default(''), // venture slug or ''
  author: z.string().default(''),
  date: z.string().default(''),
  readTime: z.string().default(''),
  status: z.string().default('Draft'),
  excerpt: z.string().default(''),
  featuredImage: z.string().default(''),
  gallery: z.array(z.string()).default([]),
  content: z.string().default(''),
})

const toStatus = (s: string) => (s === 'Published' ? 'PUBLISHED' : 'DRAFT')
const fromStatus = (s: string) => (s === 'PUBLISHED' ? 'Published' : 'Draft')
const galleryRows = (srcs: string[]) =>
  srcs.filter(Boolean).map((src, i) => ({ src, sortOrder: i }))

async function ventureIdFromSlug(
  db: { venture: { findUnique: (a: { where: { slug: string } }) => Promise<{ id: string } | null> } },
  slug: string
) {
  if (!slug) return null
  const v = await db.venture.findUnique({ where: { slug } })
  return v?.id ?? null
}

export const journalRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.journalPost.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { gallery: { orderBy: { sortOrder: 'asc' } }, venture: true },
    })
    return rows.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      venture: p.venture?.slug ?? '',
      author: p.author,
      date: p.date,
      readTime: p.readTime,
      status: fromStatus(p.status),
      excerpt: p.excerpt,
      featuredImage: p.featuredImageUrl,
      gallery: p.gallery.map((g) => g.src),
      content: p.content,
    }))
  }),

  create: protectedProcedure.input(journalFields).mutation(async ({ ctx, input }) => {
    const count = await ctx.db.journalPost.count()
    return ctx.db.journalPost.create({
      data: {
        title: input.title,
        slug: input.slug,
        category: input.category,
        author: input.author,
        date: input.date,
        readTime: input.readTime,
        status: toStatus(input.status),
        excerpt: input.excerpt,
        featuredImageUrl: input.featuredImage,
        content: input.content,
        sortOrder: count,
        ventureId: await ventureIdFromSlug(ctx.db, input.venture),
        gallery: { create: galleryRows(input.gallery) },
      },
    })
  }),

  update: protectedProcedure
    .input(journalFields.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.journalPost.update({
        where: { id: input.id },
        data: {
          title: input.title,
          slug: input.slug,
          category: input.category,
          author: input.author,
          date: input.date,
          readTime: input.readTime,
          status: toStatus(input.status),
          excerpt: input.excerpt,
          featuredImageUrl: input.featuredImage,
          content: input.content,
          ventureId: await ventureIdFromSlug(ctx.db, input.venture),
          gallery: { deleteMany: {}, create: galleryRows(input.gallery) },
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.journalPost.delete({ where: { id: input.id } })
      return { ok: true }
    }),

  // Public: published posts linked to a venture (for the venture pages).
  byVenture: publicProcedure
    .input(z.object({ ventureSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.journalPost.findMany({
        where: { status: 'PUBLISHED', venture: { slug: input.ventureSlug } },
        orderBy: { sortOrder: 'asc' },
      })
      return rows.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        date: p.date,
        category: p.category,
        featuredImage: p.featuredImageUrl,
      }))
    }),
})
