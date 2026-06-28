'use client'

import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'

interface Article {
  id: number
  title: string
  category: string
  status: 'Draft' | 'Published'
  views: number
  date: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: 'The Art of Luxury Beauty',
      category: 'Beauty',
      status: 'Published',
      views: 2840,
      date: 'Mar 15, 2026',
    },
    {
      id: 2,
      title: 'Global Trade Opportunities',
      category: 'Business',
      status: 'Published',
      views: 1920,
      date: 'Mar 10, 2026',
    },
    {
      id: 3,
      title: 'Wellness and Self-Care',
      category: 'Wellness',
      status: 'Draft',
      views: 0,
      date: 'Mar 5, 2026',
    },
  ])

  const handleDelete = (id: number) => {
    setArticles(articles.filter(a => a.id !== id))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Articles</h2>
          <p className="text-muted-foreground">Manage your published and draft articles</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition"
        >
          <Plus size={20} />
          New Article
        </motion.button>
      </motion.div>

      {/* Articles Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">
                  Title
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">
                  Views
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <motion.tr
                  key={article.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(212, 165, 116, 0.05)' }}
                  className="border-b border-border last:border-b-0 transition"
                >
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{article.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{article.category}</td>
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
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      {article.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{article.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-accent hover:text-accent/80 transition"
                      >
                        <Edit2 size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(article.id)}
                        className="text-destructive hover:text-destructive/80 transition"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
