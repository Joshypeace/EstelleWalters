import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const reelFields = z.object({
  title: z.string().min(1),
  src: z.string().default(''),
  description: z.string().default(''),
})

export const reelRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.reel.findMany({ orderBy: { sortOrder: 'asc' } })
    return rows.map((r) => ({ id: r.id, title: r.title, src: r.src, description: r.description ?? '' }))
  }),

  create: protectedProcedure.input(reelFields).mutation(async ({ ctx, input }) => {
    const count = await ctx.db.reel.count()
    return ctx.db.reel.create({
      data: { title: input.title, src: input.src, description: input.description, sortOrder: count },
    })
  }),

  update: protectedProcedure
    .input(reelFields.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.reel.update({
        where: { id: input.id },
        data: { title: input.title, src: input.src, description: input.description },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.reel.delete({ where: { id: input.id } })
      return { ok: true }
    }),
})
