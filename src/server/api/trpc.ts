import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { auth } from '@/server/auth'
import { db } from '@/server/db'

/**
 * Context available to every procedure: the Prisma client and the current
 * NextAuth session (null when signed out).
 */
export async function createTRPCContext(opts: { headers: Headers }) {
  const session = await auth()
  return { db, session, headers: opts.headers }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.issues : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory

/** Open to everyone — used for public-site reads. */
export const publicProcedure = t.procedure

/** Requires an authenticated, APPROVED account (any role). */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  if (ctx.session.user.approvalStatus !== 'APPROVED') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Account pending approval' })
  }
  return next({
    ctx: { ...ctx, session: { ...ctx.session, user: ctx.session.user } },
  })
})

/** Requires an APPROVED account with the ADMIN role. */
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session.user.role !== 'ADMIN') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admins only' })
  }
  return next({ ctx })
})
