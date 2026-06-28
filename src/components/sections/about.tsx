'use client'

import { motion } from 'framer-motion'
import { SectionHeader, LuxuryCard } from '@/components/ui/luxury-card'
import { containerVariants } from '@/lib/animations'
import Image from 'next/image'

export function AboutSection() {
  const highlights = [
    {
      title: 'Visionary Leadership',
      description:
        'Pioneering luxury beauty experiences that redefine industry standards — recognized on the cover of PNG Entrepreneur magazine.',
    },
    {
      title: 'Global Impact',
      description:
        'Building bridges across PNG, China, and Kenya — connecting suppliers with distributors and transforming international trade.',
    },
    {
      title: 'Empowerment',
      description:
        'Creating real opportunities — training and employing young women from local settlements, building careers in beauty.',
    },
  ]

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-background via-background to-secondary/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="About Me"
          subtitle="A journey of entrepreneurship, innovation, and refined aesthetics"
          centered
        />

        {/* Two-column: photo + text */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center mt-12 mb-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 relative"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border">
              <Image
                src="/content/press/magazine-cover.jpg"
                alt="Estelle Walters — PNG Entrepreneur Magazine Cover"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              PNG Entrepreneur Magazine — Cover Story
            </p>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              After years spent in China — learning the language, building international supplier networks,
              and studying global trade firsthand — I returned to Papua New Guinea with a vision for bringing
              world-class beauty and business to the Pacific.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My philosophy is simple: create experiences that inspire, empower, and elevate. Whether
              through luxury beauty at Bilas Studio, curated products at Bilas Beauty, or seamless logistics
              with ConnetSuppliers, I believe in the transformative power of thoughtful design and genuine connection.
            </p>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {highlights.map((highlight, index) => (
            <LuxuryCard key={index} delay={index} hoverable>
              <h3 className="text-lg font-semibold mb-3 text-accent">{highlight.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{highlight.description}</p>
            </LuxuryCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
