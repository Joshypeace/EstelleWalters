import { createTRPCRouter, publicProcedure } from './trpc'
import { ventureRouter } from './routers/venture'
import { journalRouter } from './routers/journal'
import { travelRouter } from './routers/travel'

/**
 * Root tRPC router. Each content type the dashboard manages has its own router.
 */
export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => ({ ok: true, time: new Date().toISOString() })),
  venture: ventureRouter,
  journal: journalRouter,
  travel: travelRouter,
})

export type AppRouter = typeof appRouter
