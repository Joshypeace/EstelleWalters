'use client'

import { motion } from 'framer-motion'
import { SectionHeader, LuxuryCard } from '@/components/ui/luxury-card'
import { containerVariants } from '@/lib/animations'

interface Service {
  title: string
  description: string
  icon: string
}

interface ServicesProps {
  services: Service[]
}

export function Services({ services }: ServicesProps) {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Our Services" subtitle="Crafted experiences designed for your transformation" centered />

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          {services.map((service, index) => (
            <LuxuryCard key={index} delay={index} hoverable>
              <div className="mb-4 text-4xl">{service.icon}</div>
              <h3 className="text-2xl font-serif font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </LuxuryCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
