import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { db } from './db'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Adapter kept for future OAuth account linking; Credentials uses JWT sessions.
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  trustHost: true,
  pages: { signIn: '/admin/login' },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (raw) => {
        const parsed = credentialsSchema.safeParse(raw)
        if (!parsed.success) return null

        const email = parsed.data.email.toLowerCase()
        const user = await db.user.findUnique({ where: { email } })
        if (!user?.passwordHash) return null

        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
        if (!valid) return null

        // Approval is NOT enforced here — we still issue a session so the
        // dashboard can show a clear "pending approval" screen. The actual
        // gate lives in the admin layout + protected tRPC procedures.
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          approvalStatus: user.approvalStatus,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.uid = user.id as string
        token.role = user.role
        token.approvalStatus = user.approvalStatus
      }
      // Allow a client-side `update()` to refresh approval status without a
      // full re-login (used after an admin approves the account).
      if (trigger === 'update' && session?.approvalStatus) {
        token.approvalStatus = session.approvalStatus
        token.role = session.role ?? token.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string
        session.user.role = token.role as typeof session.user.role
        session.user.approvalStatus = token.approvalStatus as typeof session.user.approvalStatus
      }
      return session
    },
  },
})
