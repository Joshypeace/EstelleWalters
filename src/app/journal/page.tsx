'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SectionHeader, LuxuryCard } from '@/components/ui/luxury-card'
import { containerVariants } from '@/lib/animations'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'

export default function JournalPage() {
  const articles = [
    {
      title: 'The Art of Luxury Beauty in Modern Times',
      excerpt:
        'Exploring how craftsmanship and innovation come together to create beauty experiences that transcend the ordinary.',
      date: 'March 15, 2024',
      category: 'Beauty',
      slug: 'luxury-beauty',
    },
    {
      title: 'Building Global Connections in Trade',
      excerpt:
        'Insights from connecting suppliers and distributors across international markets and breaking down silos.',
      date: 'March 8, 2024',
      category: 'Business',
      slug: 'global-trade',
    },
    {
      title: 'Wellness Philosophy: Beyond the Surface',
      excerpt:
        'A deep dive into holistic wellness, sustainability, and the importance of mindful beauty practices.',
      date: 'February 28, 2024',
      category: 'Wellness',
      slug: 'wellness-philosophy',
    },
    {
      title: 'Travel Diaries: Beauty Rituals Around the World',
      excerpt:
        'Discovering beauty traditions and wellness practices across three continents and how they inspire my work.',
      date: 'February 18, 2024',
      category: 'Travel',
      slug: 'travel-beauty',
    },
    {
      title: 'The Future of Entrepreneurship',
      excerpt:
        'My vision for the next generation of business leaders and how to build enterprises that matter.',
      date: 'February 8, 2024',
      category: 'Business',
      slug: 'future-entrepreneurship',
    },
    {
      title: 'Sustainability in Beauty Supply Chains',
      excerpt:
        'How ethical sourcing and sustainable practices are transforming the global beauty industry.',
      date: 'January 28, 2024',
      category: 'Beauty',
      slug: 'sustainability-beauty',
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="min-h-64 flex items-center justify-center pt-20 px-4">
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                    <motion.a
                      href={`/journal/${article.slug}`}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="cursor-pointer"
                    >
                      <ArrowRight size={16} className="text-accent" />
                    </motion.a>
                  </div>
                </div>
              </LuxuryCard>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
