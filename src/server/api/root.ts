import { createTRPCRouter, publicProcedure } from './trpc'

/**
 * Root tRPC router. Per-entity routers (journal, travel, venture, …) are
 * added in subsequent steps.
 */
export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => ({ ok: true, time: new Date().toISOString() })),
})

export type AppRouter = typeof appRouter
