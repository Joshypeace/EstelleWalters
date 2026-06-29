'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
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
  ArrowRight,
} from 'lucide-react'
import { trpc } from '@/trpc/react'

const sections = [
  { icon: FileText, label: 'Journal', desc: 'Articles & stories', href: '/admin/journal' },
  { icon: Plane, label: 'Travel Stories', desc: 'Individual travel blogs', href: '/admin/travel' },
  { icon: Film, label: 'Travel Reels', desc: 'Short-form videos', href: '/admin/reels' },
  { icon: Briefcase, label: 'Ventures', desc: 'Business detail pages', href: '/admin/businesses' },
  { icon: Network, label: 'Connected Ventures', desc: 'Complementary brands', href: '/admin/connected-ventures' },
  { icon: Users, label: 'Team', desc: 'Staff & members', href: '/admin/team' },
  { icon: Quote, label: 'Testimonials', desc: 'Customer reviews', href: '/admin/testimonials' },
  { icon: ImageIcon, label: 'Media Library', desc: 'Images & assets', href: '/admin/media' },
  { icon: LayoutTemplate, label: 'Pages', desc: 'Home, About, Contact', href: '/admin/pages' },
  { icon: Sparkles, label: 'AI Tools', desc: 'Content generation', href: '/admin/ai-tools' },
  { icon: Settings, label: 'Settings', desc: 'Site configuration', href: '/admin/settings' },
]

export default function AdminDashboard() {
  const { data: journalPosts = [] } = trpc.journal.list.useQuery()
  const { data: travelPosts = [] } = trpc.travel.list.useQuery()
  const { data: ventures = [] } = trpc.venture.list.useQuery()
  const { data: media = [] } = trpc.media.list.useQuery()

  const stats = [
    { icon: FileText, label: 'Journal Posts', value: String(journalPosts.length), href: '/admin/journal', color: 'bg-blue-500/20 text-blue-400' },
    { icon: Plane, label: 'Travel Stories', value: String(travelPosts.length), href: '/admin/travel', color: 'bg-emerald-500/20 text-emerald-400' },
    { icon: Briefcase, label: 'Ventures', value: String(ventures.length), href: '/admin/businesses', color: 'bg-purple-500/20 text-purple-400' },
    { icon: ImageIcon, label: 'Media Assets', value: String(media.length), href: '/admin/media', color: 'bg-orange-500/20 text-orange-400' },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">Manage every piece of content across the website from one place.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={stat.href}
                className="block bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Manage everything */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-bold text-foreground mb-4"
      >
        Manage Content
      </motion.h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {sections.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.04 }}
            >
              <Link
                href={s.href}
                className="group flex items-center gap-4 bg-card border border-border rounded-lg p-5 hover:border-accent/50 transition"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">{s.label}</p>
                  <p className="text-sm text-muted-foreground truncate">{s.desc}</p>
                </div>
                <ArrowRight
                  size={18}
                  className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition flex-shrink-0"
                />
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Recent journal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-lg overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Recent Journal Posts</h3>
          <Link href="/admin/journal" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Title</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Category</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {journalPosts.slice(0, 5).map((p) => (
                <tr key={p.id} className="border-b border-border last:border-b-0 hover:bg-accent/5 transition">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{p.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{p.category}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
