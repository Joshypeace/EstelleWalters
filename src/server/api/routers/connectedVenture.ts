import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const connectedFields = z.object({
  name: z.string().min(1),
  description: z.string().default(''),
  url: z.string().default(''),
  status: z.string().default('Live'),
})

const toStatus = (s: string) => (s === 'Coming Soon' ? 'COMING_SOON' : 'LIVE')
const fromStatus = (s: string) => (s === 'COMING_SOON' ? 'Coming Soon' : 'Live')

export const connectedVentureRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.connectedVenture.findMany({ orderBy: { sortOrder: 'asc' } })
    return rows.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      url: c.url,
      status: fromStatus(c.status),
    }))
  }),

  create: protectedProcedure.input(connectedFields).mutation(async ({ ctx, input }) => {
    const count = await ctx.db.connectedVenture.count()
    return ctx.db.connectedVenture.create({
      data: {
        name: input.name,
        description: input.description,
        url: input.url,
        status: toStatus(input.status),
        sortOrder: count,
      },
    })
  }),

  update: protectedProcedure
    .input(connectedFields.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.connectedVenture.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          url: input.url,
          status: toStatus(input.status),
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.connectedVenture.delete({ where: { id: input.id } })
      return { ok: true }
    }),
})
