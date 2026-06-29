'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Businesses', href: '/#businesses' },
  { label: 'Journal', href: '/journal' },
  { label: 'Travel', href: '/travel' },
  { label: 'Contact', href: '/#contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  // Only approved accounts see a way into the dashboard; anonymous visitors
  // get no sign-in/registration links anywhere on the public site.
  const showDashboard = session?.user?.approvalStatus === 'APPROVED'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xl font-serif font-semibold tracking-tight text-foreground"
            >
              Estelle<span className="text-accent">.</span>
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {item.label}
              </motion.a>
            ))}
            {showDashboard && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-border"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {showDashboard && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 py-2 text-sm text-accent hover:text-accent/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
            )}
          </motion.nav>
        )}
      </div>
    </header>
  )
}
