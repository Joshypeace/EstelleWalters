import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const fieldSchema = z.object({
  key: z.string(),
  label: z.string(),
  kind: z.enum(['text', 'textarea']),
  value: z.string(),
})
const sectionSchema = z.object({ title: z.string(), fields: z.array(fieldSchema) })
const pageDataSchema = z.object({ sections: z.array(sectionSchema) })

export type PageData = z.infer<typeof pageDataSchema>

export const pageRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.pageContent.findMany({ orderBy: { key: 'asc' } })
    return rows.map((p) => ({ key: p.key, label: p.label, data: p.data as PageData }))
  }),

  update: protectedProcedure
    .input(z.object({ key: z.string(), data: pageDataSchema }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.pageContent.update({
        where: { key: input.key },
        data: { data: input.data },
      })
      return { ok: true }
    }),
})
