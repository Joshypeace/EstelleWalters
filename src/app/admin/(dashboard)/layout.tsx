import { redirect } from 'next/navigation'
import { auth } from '@/server/auth'
import AdminSidebar from '@/components/admin/sidebar'
import AdminHeader from '@/components/admin/header'
import PendingApproval from '@/components/admin/pending-approval'

// Server-side auth gate for the whole dashboard. Unauthenticated users are
// redirected to the login page; authenticated-but-unapproved users see a
// pending screen instead of the dashboard chrome.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/login')
  }

  if (session.user.approvalStatus !== 'APPROVED') {
    return (
      <PendingApproval
        name={session.user.name ?? null}
        email={session.user.email ?? ''}
        status={session.user.approvalStatus}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar isAdmin={session.user.role === 'ADMIN'} />
      <div className="flex-1 flex flex-col">
        <AdminHeader
          name={session.user.name ?? 'User'}
          email={session.user.email ?? ''}
          role={session.user.role}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
