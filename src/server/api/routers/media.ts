import { z } from 'zod'
import { del } from '@vercel/blob'
import { createTRPCRouter, protectedProcedure } from '../trpc'

function deriveFolder(pathname: string) {
  const parts = pathname.split('/')
  return parts.length > 1 ? parts.slice(0, -1).join('/') : 'uploads'
}

export const mediaRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } })
    return rows.map((m) => ({
      id: m.id,
      url: m.url,
      pathname: m.pathname,
      folder: m.folder,
      filename: m.filename,
      contentType: m.contentType,
    }))
  }),

  // Record an asset after a successful client-side upload to Vercel Blob.
  record: protectedProcedure
    .input(
      z.object({
        url: z.string().url(),
        pathname: z.string(),
        contentType: z.string().optional(),
        size: z.number().int().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const filename = input.pathname.split('/').pop() ?? input.pathname
      return ctx.db.mediaAsset.upsert({
        where: { url: input.url },
        update: {},
        create: {
          url: input.url,
          pathname: input.pathname,
          folder: deriveFolder(input.pathname),
          filename,
          contentType: input.contentType ?? null,
          size: input.size ?? null,
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const asset = await ctx.db.mediaAsset.findUnique({ where: { id: input.id } })
      if (!asset) return { ok: true }
      try {
        await del(asset.url)
      } catch {
        // Asset may already be gone from Blob; still remove the DB row.
      }
      await ctx.db.mediaAsset.delete({ where: { id: input.id } })
      return { ok: true }
    }),
})
