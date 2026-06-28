'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, FileText, Briefcase, Sparkles, Settings, LogOut } from 'lucide-react'

interface AdminSidebarProps {
  onLogout: () => void
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FileText, label: 'Articles', href: '/admin/articles' },
  { icon: Briefcase, label: 'Businesses', href: '/admin/businesses' },
  { icon: Sparkles, label: 'AI Tools', href: '/admin/ai-tools' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-64 bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0 md:relative md:h-auto"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-serif font-bold text-foreground">Estelle</h2>
        <p className="text-xs text-muted-foreground mt-1">Publishing Hub</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition cursor-pointer ${
                  isActive ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-secondary'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition text-sm font-medium"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </motion.aside>
  )
}
