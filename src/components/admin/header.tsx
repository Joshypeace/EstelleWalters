'use client'

import { AdminUser } from '@/lib/admin-auth'
import { motion } from 'framer-motion'
import { ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'

interface AdminHeaderProps {
  user: AdminUser
  onLogout: () => void
}

export default function AdminHeader({ user, onLogout }: AdminHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="bg-card border-b border-border">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Publishing Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your content and business</p>
        </div>

        {/* User Menu */}
        <div className="relative">
          <motion.button
            onClick={() => setShowDropdown(!showDropdown)}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition"
          >
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">
                {user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <ChevronDown size={16} className="text-muted-foreground" />
          </motion.button>

          {/* Dropdown */}
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg"
            >
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition text-sm font-medium"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}
