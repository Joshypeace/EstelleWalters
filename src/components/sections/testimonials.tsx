'use client'

import { motion } from 'framer-motion'
import { SectionHeader, LuxuryCard } from '@/components/ui/luxury-card'
import { containerVariants } from '@/lib/animations'
import { Star } from 'lucide-react'

interface Testimonial {
  text: string
  author: string
  role: string
}

interface TestimonialsProps {
  title: string
  testimonials: Testimonial[]
}

export function Testimonials({ title, testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={title} centered />

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {testimonials.map((testimonial, index) => (
            <LuxuryCard key={index} delay={index} hoverable>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                {testimonial.text}
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </LuxuryCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
