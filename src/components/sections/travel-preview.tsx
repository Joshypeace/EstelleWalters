'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PremiumButton } from '@/components/ui/premium-button'
import { ArrowUpRight } from 'lucide-react'

const travelPreviewPhotos = [
  { src: '/content/travel/paris-eiffel-tower.jpg', alt: 'Paris', label: 'Paris' },
  { src: '/content/travel/norway-winter.jpg', alt: 'Norway', label: 'Norway' },
  { src: '/content/travel/giraffe-centre-kenya.jpg', alt: 'Kenya', label: 'Kenya' },
  { src: '/content/travel/la-selva-dining.jpg', alt: 'Fine Dining', label: 'Dining' },
  { src: '/content/business/supplier-certificate.jpg', alt: 'China', label: 'China' },
  { src: '/content/travel/restaurant-selfie.jpg', alt: 'Lifestyle', label: 'Lifestyle' },
]

export function TravelPreview() {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
            Across Continents
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-balance mb-4">
            Travel & Inspiration
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            From Parisian streets to Norwegian fjords, Kenyan wildlife to Chinese trade hubs —
            every journey shapes the vision behind our brands.
          </p>
        </motion.div>

        {/* Photo strip */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-10">
          {travelPreviewPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <span className="text-white text-[10px] font-semibold uppercase tracking-wider">
                  {photo.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <PremiumButton
            href="/travel"
            variant="outline"
            size="sm"
            icon={<ArrowUpRight size={16} />}
          >
            View All Travel
          </PremiumButton>
        </div>
      </div>
    </section>
  )
}
