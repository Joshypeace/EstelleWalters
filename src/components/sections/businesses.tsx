'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionHeader, LuxuryCard } from '@/components/ui/luxury-card'
import { PremiumButton } from '@/components/ui/premium-button'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { containerVariants } from '@/lib/animations'
import type { Venture } from '@/lib/ventures'

export function BusinessesSection({ businesses }: { businesses: Venture[] }) {
  return (
    <section id="businesses" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="My Ventures"
          subtitle="Three distinct brands, unified by a commitment to excellence and luxury"
          centered
        />

        {/* Businesses Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {businesses.map((business, index) => (
            <LuxuryCard key={index} delay={index} hoverable className="flex flex-col justify-between">
              <div>
                {/* Logo */}
                <div className="mb-4 h-16 flex items-center justify-center">
                  <Image
                    src={business.logo}
                    alt={`${business.name} logo`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                
                <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-2">
                  {business.tagline}
                </p>
                <h3 className="text-2xl font-serif font-semibold mb-3">{business.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {business.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1 mb-6">
                  {business.highlights.map((highlight, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <PremiumButton
                  href={business.url}
                  variant="outline"
                  size="sm"
                  icon={<ArrowUpRight size={16} />}
                >
                  Explore
                </PremiumButton>
                <PremiumButton
                  href={business.site}
                  variant="primary"
                  size="sm"
                  external
                  icon={<ExternalLink size={16} />}
                >
                  Visit Site
                </PremiumButton>
              </div>
            </LuxuryCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
