'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionHeader, LuxuryCard } from '@/components/ui/luxury-card'
import { PremiumButton } from '@/components/ui/premium-button'
import { ArrowUpRight } from 'lucide-react'
import { containerVariants } from '@/lib/animations'

export function BusinessesSection() {
  const businesses = [
    {
      name: 'Bilas Studio',
      tagline: 'Luxury Beauty Experiences',
      description:
        'An exclusive beauty studio offering personalized treatments, bespoke services, and immersive wellness experiences crafted for discerning clients.',
      highlights: ['Premium Treatments', 'Expert Consultants', 'Luxury Setting'],
      url: '/businesses/bilas-studio',
      logo: '/logos/bilas-studio.jpg',
    },
    {
      name: 'Bilas Beauty',
      tagline: 'Curated Beauty Products',
      description:
        'A carefully curated collection of premium beauty and skincare products sourced from the finest artisans and brands worldwide.',
      highlights: ['Premium Products', 'Global Sourcing', 'Expert Selection'],
      url: '/businesses/bilas-beauty',
      logo: '/logos/bilas-beauty.png',
    },
    {
      name: 'ConnetSuppliers',
      tagline: 'Global Trade Network',
      description:
        'Connecting suppliers and distributors across continents, facilitating seamless international partnerships and transforming supply chains.',
      highlights: ['B2B Network', 'Strategic Partnerships', 'Global Reach'],
      url: '/businesses/connet-suppliers',
      logo: '/logos/connet-suppliers.png',
    },
  ]

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

              <PremiumButton
                href={business.url}
                variant="outline"
                size="sm"
                icon={<ArrowUpRight size={16} />}
              >
                Explore
              </PremiumButton>
            </LuxuryCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
