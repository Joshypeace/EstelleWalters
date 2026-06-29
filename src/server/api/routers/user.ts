import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, adminProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  list: adminProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.user.findMany({ orderBy: { createdAt: 'desc' } })
    return rows.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      approvalStatus: u.approvalStatus,
      createdAt: u.createdAt,
    }))
  }),

  setApproval: adminProcedure
    .input(z.object({ id: z.string(), status: z.enum(['PENDING', 'APPROVED', 'REJECTED']) }))
    .mutation(async ({ ctx, input }) => {
      if (input.id === ctx.session.user.id && input.status !== 'APPROVED') {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'You cannot revoke your own access.' })
      }
      return ctx.db.user.update({ where: { id: input.id }, data: { approvalStatus: input.status } })
    }),

  setRole: adminProcedure
    .input(z.object({ id: z.string(), role: z.enum(['ADMIN', 'EDITOR']) }))
    .mutation(async ({ ctx, input }) => {
      if (input.id === ctx.session.user.id && input.role !== 'ADMIN') {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'You cannot remove your own admin role.' })
      }
      return ctx.db.user.update({ where: { id: input.id }, data: { role: input.role } })
    }),

  remove: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (input.id === ctx.session.user.id) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'You cannot delete your own account.' })
      }
      await ctx.db.user.delete({ where: { id: input.id } })
      return { ok: true }
    }),
})
