import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const settingRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.setting.findMany()
    return Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string>
  }),

  set: protectedProcedure
    .input(z.record(z.string(), z.string()))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.$transaction(
        Object.entries(input).map(([key, value]) =>
          ctx.db.setting.upsert({ where: { key }, update: { value }, create: { key, value } })
        )
      )
      return { ok: true }
    }),
})
