'use client'

import { motion } from 'framer-motion'
import { LuxuryCard } from '@/components/ui/luxury-card'
import { containerVariants } from '@/lib/animations'

interface BusinessAboutProps {
  title: string
  content: string
  highlights: string[]
}

export function BusinessAbout({ title, content, highlights }: BusinessAboutProps) {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-8 text-balance">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{content}</p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {highlights.map((highlight, index) => (
            <LuxuryCard key={index} delay={index} hoverable className="flex items-center justify-center min-h-24">
              <p className="text-center text-sm font-medium text-accent">{highlight}</p>
            </LuxuryCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
