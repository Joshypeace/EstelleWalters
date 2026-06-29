import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

// Admin form fields <-> DB. The dashboard speaks display strings
// ("Active"/"Hidden"); the DB stores a ContentStatus enum.
const ventureFields = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and dashes'),
  tagline: z.string().default(''),
  description: z.string().default(''),
  highlights: z.array(z.string()).default([]),
  url: z.string().default(''),
  site: z.string().default(''),
  logo: z.string().default(''),
  status: z.string().default('Active'),
})

const toStatus = (s: string) => (s === 'Hidden' ? 'HIDDEN' : 'PUBLISHED')
const fromStatus = (s: string) => (s === 'HIDDEN' ? 'Hidden' : 'Active')

export const ventureRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.venture.findMany({ orderBy: { sortOrder: 'asc' } })
    return rows.map((v) => ({
      id: v.id,
      name: v.name,
      slug: v.slug,
      tagline: v.tagline,
      description: v.description,
      highlights: v.highlights,
      url: v.url,
      site: v.site,
      logo: v.logoUrl,
      status: fromStatus(v.status),
    }))
  }),

  create: protectedProcedure.input(ventureFields).mutation(async ({ ctx, input }) => {
    const count = await ctx.db.venture.count()
    return ctx.db.venture.create({
      data: {
        name: input.name,
        slug: input.slug,
        tagline: input.tagline,
        description: input.description,
        highlights: input.highlights,
        url: input.url,
        site: input.site,
        logoUrl: input.logo,
        status: toStatus(input.status),
        sortOrder: count,
      },
    })
  }),

  update: protectedProcedure
    .input(ventureFields.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.venture.update({
        where: { id: input.id },
        data: {
          name: input.name,
          slug: input.slug,
          tagline: input.tagline,
          description: input.description,
          highlights: input.highlights,
          url: input.url,
          site: input.site,
          logoUrl: input.logo,
          status: toStatus(input.status),
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.venture.delete({ where: { id: input.id } })
      return { ok: true }
    }),
})
