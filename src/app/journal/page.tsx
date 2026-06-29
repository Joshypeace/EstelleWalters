'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { journalPosts } from '@/lib/journal'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function JournalPage() {
  const articles = journalPosts

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="min-h-64 flex items-center justify-center pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-balance">
              Journal
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Thoughts on beauty, business, travel, and the art of living well.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-background to-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-lg overflow-hidden transition-colors hover:border-accent/50"
              >
                <Link href={`/journal/${article.slug}`} className="block group">
                  {/* Featured Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-white bg-accent/80 px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between gap-4 p-6">
                    <div>
                      <h3 className="text-xl font-serif font-semibold mb-3 text-balance leading-tight group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar size={14} />
                        {article.date}
                      </div>
                      <ArrowRight size={16} className="text-accent transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
