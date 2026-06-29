'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroBusinessPage } from '@/components/sections/business-hero'
import { BusinessAbout } from '@/components/sections/business-about'
import { Services } from '@/components/sections/services'
import { VentureTestimonials } from '@/components/sections/venture-testimonials'
import { CTASection } from '@/components/sections/cta'
import { VentureJournal } from '@/components/sections/venture-journal'
import { PhotoGallery } from '@/components/ui/photo-gallery'
import { SectionHeader } from '@/components/ui/luxury-card'
import Image from 'next/image'
import { motion } from 'framer-motion'

const sourcingPhotos = [
  { src: '/content/beauty/product-launch.jpg', alt: 'Bilas Beauty product launch', caption: 'Showcasing our curated lash collection — "You deserve to feel beautiful"', category: 'Launch' },
  { src: '/content/beauty/lashes-display.jpg', alt: 'Lashes product display', caption: 'Premium lash selection sourced from the world\'s best manufacturers', category: 'Products' },
  { src: '/content/business/sourcing-beauty-products.jpg', alt: 'Beauty product sourcing', caption: 'Quality sampling at supplier offices — every product hand-selected', category: 'Sourcing' },
  { src: '/content/business/beauty-supplier-visit.jpg', alt: 'Beauty market visit', caption: 'Building relationships with beauty suppliers across China\'s wholesale markets', category: 'Sourcing' },
]

export default function BilaBeautyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Logo Section */}
      <section className="pt-24 pb-8 px-4 bg-secondary/20 border-b border-border">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Image src="/logos/bilas-beauty.png" alt="Bilas Beauty Logo" width={120} height={120} className="object-contain" />
        </div>
      </section>

      <HeroBusinessPage
        title="Bilas Beauty"
        subtitle="Beauty Made Simple. Confidence Made Everyday."
        description="Premium Pacific-inspired cosmetics and hair care products celebrating Melanesian, Polynesian, and Micronesian culture with 100% natural ingredients and clean beauty formulations."
      />
      <BusinessAbout
        title="Pacific Beauty Redefined"
        content="Bilas Beauty celebrates the rich beauty heritage of the Pacific, infusing traditional wisdom with modern science. We craft products using natural ingredients inspired by Melanesian, Polynesian, and Micronesian traditions. Every formula is clean, effective, and designed to enhance your natural beauty while honoring cultural roots."
        highlights={['100% Natural Ingredients', 'Culturally Inspired', 'Clean Beauty Formulations', 'Professional Grade', 'Quality You Can Trust', 'Simple Solutions']}
      />
      <Services
        services={[
          { title: 'Cosmetics & Makeup', description: 'Professional-grade cosmetics and makeup essentials for everyday and professional use.', icon: 'palette' },
          { title: 'Hair Care Products', description: 'Premium hair care formulations designed for strength, vitality, and natural beauty.', icon: 'droplet' },
          { title: 'Skincare Solutions', description: 'Advanced skincare products addressing all skin types with natural, clean formulations.', icon: 'sparkles' },
          { title: 'Wholesale & Bulk', description: 'Special wholesale pricing and bulk supplies for salons and beauty professionals.', icon: 'package' },
          { title: 'Nail & Lash', description: 'Nail extensions, quality lashes, and professional adhesives for flawless finishes.', icon: 'gem' },
          { title: 'Free Shipping', description: 'Complimentary shipping on orders over $99 on all store items.', icon: 'truck' },
        ]}
      />

      {/* Behind the Brand — Sourcing Gallery */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Behind the Brand"
            subtitle="From supplier markets to your beauty shelf — every product is hand-selected"
            centered
          />
          <div className="mt-12">
            <PhotoGallery photos={sourcingPhotos} columns={2} aspectRatio="landscape" />
          </div>
        </div>
      </section>

      <VentureTestimonials ventureSlug="bilas-beauty" title="Customer Reviews" />

      {/* Featured Products */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-balance">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of premium beauty products crafted with natural ingredients and cultural inspiration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              '/content/beauty/product-1.png',
              '/content/beauty/product-2.png',
              '/content/beauty/product-3.png',
              '/content/beauty/product-4.jpeg',
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg border border-border hover:border-accent transition-colors group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image src={img} alt={`Bilas Beauty Product ${index + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://bilasbeauty.com/shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      <VentureJournal ventureSlug="bilas-beauty" />

      <CTASection />
      <Footer />
    </main>
  )
}
