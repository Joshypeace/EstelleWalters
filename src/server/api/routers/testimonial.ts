import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { ventureIdFromSlug } from './_util'

const testimonialFields = z.object({
  author: z.string().min(1),
  role: z.string().default(''),
  venture: z.string().default(''), // venture slug or ''
  text: z.string().default(''),
})

export const testimonialRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.testimonial.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { venture: true },
    })
    return rows.map((t) => ({
      id: t.id,
      author: t.author,
      role: t.role,
      venture: t.venture?.slug ?? '',
      text: t.text,
    }))
  }),

  // Public: testimonials for a given venture, shown on the business pages.
  byVenture: publicProcedure
    .input(z.object({ ventureSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.testimonial.findMany({
        where: { venture: { slug: input.ventureSlug } },
        orderBy: { sortOrder: 'asc' },
      })
      return rows.map((t) => ({ text: t.text, author: t.author, role: t.role }))
    }),

  create: protectedProcedure.input(testimonialFields).mutation(async ({ ctx, input }) => {
    const count = await ctx.db.testimonial.count()
    return ctx.db.testimonial.create({
      data: {
        author: input.author,
        role: input.role,
        text: input.text,
        ventureId: await ventureIdFromSlug(ctx.db, input.venture),
        sortOrder: count,
      },
    })
  }),

  update: protectedProcedure
    .input(testimonialFields.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.testimonial.update({
        where: { id: input.id },
        data: {
          author: input.author,
          role: input.role,
          text: input.text,
          ventureId: await ventureIdFromSlug(ctx.db, input.venture),
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.testimonial.delete({ where: { id: input.id } })
      return { ok: true }
    }),
})
