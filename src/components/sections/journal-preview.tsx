'use client'

import { motion } from 'framer-motion'
import { SectionHeader, LuxuryCard } from '@/components/ui/luxury-card'
import { PremiumButton } from '@/components/ui/premium-button'
import { Calendar, ArrowRight } from 'lucide-react'
import { containerVariants } from '@/lib/animations'

export interface JournalPreviewItem {
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
}

export function JournalPreview({ articles }: { articles: JournalPreviewItem[] }) {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Journal"
          subtitle="Thoughts on beauty, business, travel, and the art of living well"
          centered
        />

        {/* Articles Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {articles.map((article, index) => (
            <LuxuryCard key={index} delay={index} hoverable>
              <div className="flex flex-col justify-between h-full gap-4">
                <div>
                  <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-3">
                    {article.category}
                  </p>
                  <h3 className="text-xl font-serif font-semibold mb-3 text-balance leading-tight">
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
                  <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <ArrowRight size={16} className="text-accent" />
                  </motion.div>
                </div>
              </div>
            </LuxuryCard>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <PremiumButton href="#journal" variant="secondary" size="lg">
            Read All Articles
          </PremiumButton>
        </motion.div>
      </div>
    </section>
  )
}
