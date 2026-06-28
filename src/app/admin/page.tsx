'use client'

import { motion } from 'framer-motion'
import { FileText, Briefcase, Users, TrendingUp } from 'lucide-react'

interface StatCard {
  icon: React.ReactNode
  label: string
  value: string
  trend: string
  color: string
}

export default function AdminDashboard() {
  const stats: StatCard[] = [
    {
      icon: <FileText size={24} />,
      label: 'Total Articles',
      value: '24',
      trend: '+3 this month',
      color: 'bg-blue-500/20 text-blue-400',
    },
    {
      icon: <Briefcase size={24} />,
      label: 'Active Businesses',
      value: '3',
      trend: 'All operational',
      color: 'bg-purple-500/20 text-purple-400',
    },
    {
      icon: <Users size={24} />,
      label: 'Subscribers',
      value: '1,240',
      trend: '+180 this month',
      color: 'bg-green-500/20 text-green-400',
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Monthly Views',
      value: '12.4K',
      trend: '+24% vs last month',
      color: 'bg-orange-500/20 text-orange-400',
    },
  ]

  const recentArticles = [
    {
      id: 1,
      title: 'The Art of Luxury Beauty',
      status: 'Published',
      date: 'Mar 15, 2026',
    },
    {
      id: 2,
      title: 'Global Trade Opportunities',
      status: 'Published',
      date: 'Mar 10, 2026',
    },
    {
      id: 3,
      title: 'Wellness and Self-Care',
      status: 'Draft',
      date: 'Mar 5, 2026',
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your publishing hub today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.trend}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-lg overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Recent Articles</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.map((article) => (
                <motion.tr
                  key={article.id}
                  whileHover={{ backgroundColor: 'rgba(212, 165, 116, 0.05)' }}
                  className="border-b border-border last:border-b-0 cursor-pointer transition"
                >
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{article.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        article.status === 'Published'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{article.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
