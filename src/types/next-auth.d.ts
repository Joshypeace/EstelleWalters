import type { DefaultSession } from 'next-auth'
import type { Role, ApprovalStatus } from '@/generated/prisma/enums'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
      approvalStatus: ApprovalStatus
    } & DefaultSession['user']
  }

  interface User {
    role: Role
    approvalStatus: ApprovalStatus
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: string
    role: Role
    approvalStatus: ApprovalStatus
  }
}
