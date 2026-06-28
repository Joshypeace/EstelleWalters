'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getStoredUser, clearUser, AdminUser } from '@/lib/admin-auth'
import AdminSidebar from '@/components/admin/sidebar'
import AdminHeader from '@/components/admin/header'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = getStoredUser()
    if (!storedUser && pathname !== '/admin/login') {
      router.push('/admin/login')
    } else if (storedUser) {
      setUser(storedUser)
    }
    setLoading(false)
  }, [router, pathname])

  const handleLogout = () => {
    clearUser()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return children
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col">
        <AdminHeader user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
