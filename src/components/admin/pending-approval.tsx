import Link from 'next/link'
import { Clock, XCircle } from 'lucide-react'
import type { ApprovalStatus } from '@/generated/prisma/enums'
import LogoutButton from './logout-button'

export default function PendingApproval({
  name,
  email,
  status,
}: {
  name: string | null
  email: string
  status: ApprovalStatus
}) {
  const rejected = status === 'REJECTED'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-8 text-center">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 ${
            rejected ? 'bg-destructive/15 text-destructive' : 'bg-yellow-500/15 text-yellow-400'
          }`}
        >
          {rejected ? <XCircle size={26} /> : <Clock size={26} />}
        </div>

        <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
          {rejected ? 'Access not granted' : 'Awaiting approval'}
        </h1>

        <p className="text-muted-foreground text-sm mb-6">
          {rejected ? (
            <>
              The account <span className="text-foreground">{email}</span> has not been approved for
              dashboard access. Please contact an administrator if you believe this is a mistake.
            </>
          ) : (
            <>
              Thanks{name ? `, ${name}` : ''}. Your account (<span className="text-foreground">{email}</span>)
              has been created and is waiting for an administrator to approve dashboard access. Once
              approved, sign in again to continue.
            </>
          )}
        </p>

        <div className="flex items-center justify-center gap-3">
          <LogoutButton className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-foreground bg-secondary hover:bg-secondary/80 transition text-sm" />
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg font-medium text-muted-foreground hover:text-foreground transition text-sm"
          >
            Back to site
          </Link>
        </div>
      </div>
    </div>
  )
}
