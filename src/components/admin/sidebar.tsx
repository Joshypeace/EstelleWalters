'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Plane,
  Film,
  Briefcase,
  Network,
  Users,
  Quote,
  Image as ImageIcon,
  LayoutTemplate,
  Sparkles,
  Settings,
  LogOut,
} from 'lucide-react'

interface AdminSidebarProps {
  onLogout: () => void
}

interface NavItem {
  icon: typeof LayoutDashboard
  label: string
  href: string
}

interface NavGroup {
  heading?: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    items: [{ icon: LayoutDashboard, label: 'Dashboard', href: '/admin' }],
  },
  {
    heading: 'Content',
    items: [
      { icon: FileText, label: 'Journal', href: '/admin/journal' },
      { icon: Plane, label: 'Travel Stories', href: '/admin/travel' },
      { icon: Film, label: 'Travel Reels', href: '/admin/reels' },
      { icon: Briefcase, label: 'Ventures', href: '/admin/businesses' },
      { icon: Network, label: 'Connected Ventures', href: '/admin/connected-ventures' },
      { icon: Users, label: 'Team', href: '/admin/team' },
      { icon: Quote, label: 'Testimonials', href: '/admin/testimonials' },
    ],
  },
  {
    heading: 'Site',
    items: [
      { icon: ImageIcon, label: 'Media Library', href: '/admin/media' },
      { icon: LayoutTemplate, label: 'Pages', href: '/admin/pages' },
      { icon: Sparkles, label: 'AI Tools', href: '/admin/ai-tools' },
      { icon: Settings, label: 'Settings', href: '/admin/settings' },
    ],
  },
]

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-64 bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0 z-40 md:relative md:h-auto"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-serif font-bold text-foreground">Estelle</h2>
        <p className="text-xs text-muted-foreground mt-1">Content Hub</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {navGroups.map((group, gi) => (
          <div key={gi} className="space-y-1">
            {group.heading && (
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {group.heading}
              </p>
            )}
            {group.items.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname === item.href || pathname.startsWith(item.href + '/')
              const Icon = item.icon

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-destructive hover:bg-destructive/10 rounded-lg transition text-sm font-medium"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </motion.aside>
  )
}
