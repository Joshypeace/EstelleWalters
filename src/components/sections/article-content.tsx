'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

interface ArticleContentProps {
  title: string
  date: string
  readTime: string
  category: string
  content: string
  author: string
}

export function ArticleContent({
  title,
  date,
  readTime,
  category,
  content,
  author,
}: ArticleContentProps) {
  return (
    <>
      {/* Article Header */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-background to-secondary/20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-6">{category}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance mb-6 leading-tight">
              {title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {readTime}
              </div>
              <div>By {author}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert max-w-none"
          >
            <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
              {content}
            </div>
          </motion.article>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <Link href="/journal" className="text-accent hover:underline flex items-center gap-2">
              ← Back to Journal
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
