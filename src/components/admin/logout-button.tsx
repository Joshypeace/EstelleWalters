'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className={className}
    >
      <LogOut size={18} />
      Sign Out
    </button>
  )
}
