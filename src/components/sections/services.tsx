'use client'

import { motion } from 'framer-motion'
import {
  Palette,
  Droplet,
  Sparkles,
  Package,
  Gem,
  Truck,
  Scissors,
  Brush,
  Leaf,
  Ship,
  Plane,
  ClipboardCheck,
  Search,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeader, LuxuryCard } from '@/components/ui/luxury-card'
import { containerVariants } from '@/lib/animations'

/**
 * Icon registry. Pages pass a serializable string key (so the data can live in
 * Server Components too) and the icon component is resolved here on the client.
 */
export const serviceIcons = {
  palette: Palette,
  droplet: Droplet,
  sparkles: Sparkles,
  package: Package,
  gem: Gem,
  truck: Truck,
  scissors: Scissors,
  brush: Brush,
  leaf: Leaf,
  ship: Ship,
  plane: Plane,
  'clipboard-check': ClipboardCheck,
  search: Search,
  globe: Globe,
} satisfies Record<string, LucideIcon>

export type ServiceIconName = keyof typeof serviceIcons

interface Service {
  title: string
  description: string
  icon: ServiceIconName
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
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon]
            return (
              <LuxuryCard key={index} delay={index} hoverable>
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </LuxuryCard>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
