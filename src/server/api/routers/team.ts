import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { ventureIdFromSlug } from './_util'

const teamFields = z.object({
  name: z.string().min(1),
  role: z.string().default(''),
  venture: z.string().default(''), // venture slug or ''
})

export const teamRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.teamMember.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { venture: true },
    })
    return rows.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      venture: m.venture?.slug ?? '',
    }))
  }),

  create: protectedProcedure.input(teamFields).mutation(async ({ ctx, input }) => {
    const count = await ctx.db.teamMember.count()
    return ctx.db.teamMember.create({
      data: {
        name: input.name,
        role: input.role,
        ventureId: await ventureIdFromSlug(ctx.db, input.venture),
        sortOrder: count,
      },
    })
  }),

  update: protectedProcedure
    .input(teamFields.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.teamMember.update({
        where: { id: input.id },
        data: {
          name: input.name,
          role: input.role,
          ventureId: await ventureIdFromSlug(ctx.db, input.venture),
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.teamMember.delete({ where: { id: input.id } })
      return { ok: true }
    }),
})
