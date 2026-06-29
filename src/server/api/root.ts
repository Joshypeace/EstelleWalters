import { createTRPCRouter, publicProcedure } from './trpc'
import { ventureRouter } from './routers/venture'
import { journalRouter } from './routers/journal'
import { travelRouter } from './routers/travel'
import { teamRouter } from './routers/team'
import { testimonialRouter } from './routers/testimonial'
import { reelRouter } from './routers/reel'
import { connectedVentureRouter } from './routers/connectedVenture'
import { pageRouter } from './routers/page'
import { settingRouter } from './routers/setting'
import { mediaRouter } from './routers/media'
import { userRouter } from './routers/user'

/**
 * Root tRPC router. Each content type the dashboard manages has its own router.
 */
export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => ({ ok: true, time: new Date().toISOString() })),
  venture: ventureRouter,
  journal: journalRouter,
  travel: travelRouter,
  team: teamRouter,
  testimonial: testimonialRouter,
  reel: reelRouter,
  connectedVenture: connectedVentureRouter,
  page: pageRouter,
  setting: settingRouter,
  media: mediaRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
