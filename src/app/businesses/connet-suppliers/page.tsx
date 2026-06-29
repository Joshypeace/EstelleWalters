'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroBusinessPage } from '@/components/sections/business-hero'
import { BusinessAbout } from '@/components/sections/business-about'
import { Services } from '@/components/sections/services'
import { Testimonials } from '@/components/sections/testimonials'
import { CTASection } from '@/components/sections/cta'
import { VentureJournal } from '@/components/sections/venture-journal'
import { PhotoGallery } from '@/components/ui/photo-gallery'
import { SectionHeader } from '@/components/ui/luxury-card'
import { SocialGallery } from '@/components/ui/social-embeds'
import Image from 'next/image'
import { motion } from 'framer-motion'

const operationsPhotos = [
  { src: '/content/business/supplier-certificate.jpg', alt: 'Verified Supplier Certificate', caption: 'Receiving Alibaba Verified Supplier Certification — building trust in global trade', category: 'Partnerships' },
  { src: '/content/business/garment-factory.jpg', alt: 'Garment factory inspection', caption: 'On-site factory inspection — ensuring quality from the production floor', category: 'Quality Control' },
  { src: '/content/business/logistics-shipping.jpg', alt: 'Logistics and shipping', caption: 'Overseeing large-scale shipments — tires loaded for international freight', category: 'Logistics' },
  { src: '/content/business/warehouse-partner.jpg', alt: 'Warehouse operations', caption: 'Hands-on warehouse management with our sourcing partners', category: 'Warehousing' },
  { src: '/content/business/warehouse-operations.jpg', alt: 'Warehouse operations', caption: 'Coordinating inventory and fulfillment across facilities', category: 'Operations' },
  { src: '/content/business/beauty-supplier-visit.jpg', alt: 'Beauty supplier visit', caption: 'Building lasting supplier relationships in China\'s beauty markets', category: 'Sourcing' },
  { src: '/content/business/sourcing-beauty-products.jpg', alt: 'Sourcing beauty products', caption: 'Product sampling and quality verification at supplier offices', category: 'Sourcing' },
  { src: '/content/business/jewelry-accessories.jpg', alt: 'Accessories sourcing', caption: 'Curating stainless steel jewelry and fashion accessories for Starla', category: 'Products' },
]

export default function ConnetSuppliersPage() {
  const conneteContent = [
    { id: '1', type: 'instagram' as const, url: 'https://www.instagram.com/reel/DVqMLZHkZLH/', caption: 'Behind-the-scenes of our global logistics operations', postId: 'DVqMLZHkZLH' },
    { id: '2', type: 'instagram' as const, url: 'https://www.instagram.com/p/DUriVFWjSDH/', caption: 'Connecting businesses across China and PNG', postId: 'DUriVFWjSDH' },
    { id: '3', type: 'instagram' as const, url: 'https://www.instagram.com/reel/DCvFZHshJ8w/', caption: 'Supply chain innovation and strategic partnerships', postId: 'DCvFZHshJ8w' },
    { id: '4', type: 'tiktok' as const, url: 'https://vt.tiktok.com/ZSChhEw8j/', caption: 'Logistics in action: delivering excellence' },
    { id: '5', type: 'tiktok' as const, url: 'https://vt.tiktok.com/ZSChk1RgF/', caption: 'Trade connections: China to Papua New Guinea' },
    { id: '6', type: 'tiktok' as const, url: 'https://vt.tiktok.com/ZSChhpCWL/', caption: 'Global supply chains made seamless' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Logo Section */}
      <section className="pt-24 pb-8 px-4 bg-secondary/20 border-b border-border">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Image src="/logos/connet-suppliers.png" alt="Connet Suppliers Logo" width={140} height={140} className="object-contain" />
        </div>
      </section>

      <HeroBusinessPage
        title="Connet Suppliers"
        subtitle="Expert Logistics from China to Papua New Guinea"
        description="Strategic logistics and sourcing connecting businesses across China, Papua New Guinea, and beyond. We enable international trade through reliable partnerships and seamless supply chain solutions."
      />
      <BusinessAbout
        title="Global Supply Chain Expertise"
        content="With offices in Port Moresby (Papua New Guinea), Guangzhou, and Tianjin (China), Connet Suppliers bridges continents and markets. We specialize in seamless logistics, customs expertise, and strategic sourcing that transforms international trade from complex to achievable. Our bilingual team and deep market knowledge ensure smooth operations from procurement to delivery."
        highlights={['China-PNG Expertise', 'Multi-Office Operations', 'Customs Specialists', 'Reliable Logistics', 'Strategic Sourcing', 'Bilingual Support']}
      />

      {/* Operations Gallery */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Operations in Action"
            subtitle="From factory floors to shipping yards — we're hands-on at every stage"
            centered
          />
          <div className="mt-12">
            <PhotoGallery photos={operationsPhotos} columns={4} aspectRatio="square" />
          </div>
        </div>
      </section>

      <Services
        services={[
          { title: 'Sea Freight', description: 'Reliable and cost-effective sea freight for large-scale international shipments from China to Papua New Guinea.', icon: 'ship' },
          { title: 'Air Freight', description: 'Fast and reliable air freight for urgent international shipments with full follow-up and support.', icon: 'plane' },
          { title: 'Road Freight', description: 'Efficient road freight services across cities and regions with real-time tracking.', icon: 'truck' },
          { title: 'Customs Clearance', description: 'Expert documentation and customs expertise for seamless international shipping.', icon: 'clipboard-check' },
          { title: 'Sourcing Services', description: 'Strategic product sourcing from verified suppliers with quality assurance.', icon: 'search' },
          { title: 'Supplier Network', description: 'Access to vetted suppliers across multiple industries and regions in China and beyond.', icon: 'globe' },
        ]}
      />
      <Testimonials
        title="Partner Testimonials"
        testimonials={[
          { text: 'ConnetSuppliers transformed how we source internationally. The connections are genuine and the process is seamless.', author: 'Marco V.', role: 'Import/Export Manager' },
          { text: 'Finally found reliable suppliers through their vetted network. Business growth accelerated significantly.', author: 'Chen L.', role: 'Distributor' },
          { text: 'The platform takes the complexity out of global trade. Highly professional team.', author: 'Hassan M.', role: 'Supply Chain Director' },
        ]}
      />

      <SocialGallery posts={conneteContent} title="Connet in Action" />

      <VentureJournal ventureSlug="connet-suppliers" />

      <CTASection />
      <Footer />
    </main>
  )
}
