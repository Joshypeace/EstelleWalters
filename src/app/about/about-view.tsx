'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SectionHeader, LuxuryCard } from '@/components/ui/luxury-card'
import { PhotoGallery } from '@/components/ui/photo-gallery'
import { containerVariants } from '@/lib/animations'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Globe, Heart } from 'lucide-react'

const DEFAULT_BODY = [
  "With a deep passion for beauty, design, and meaningful connections, I've dedicated my career to creating transformative experiences across multiple industries. After spending years in China — becoming fluent in Chinese, building supplier networks, and studying international business firsthand — I returned to Papua New Guinea with a vision.",
  "From establishing Bilas Studio — a sanctuary for luxury beauty treatments where young women from settlements gain employment and professional skills — to curating Bilas Beauty's premium Pacific-inspired collection, each venture reflects my philosophy: that true beauty and business success emerge from thoughtful design, genuine relationships, and a commitment to quality that never wavers.",
  'ConnetSuppliers represents the culmination of my understanding of global trade. With offices spanning Port Moresby, Guangzhou, and Tianjin, we bridge continents and cultures. Together, these ventures embody my vision: to inspire, elevate, and transform through luxury, innovation, and authentic connection.',
].join('\n\n')

export function AboutView({ content }: { content: Record<string, string> }) {
  const title = content.title || 'About Estelle'
  const intro =
    content.intro ||
    'Entrepreneur, beauty visionary, and architect of luxury experiences across three continents.'
  const bodyParagraphs = (content.body || DEFAULT_BODY).split(/\n\n+/).filter(Boolean)

  const timeline = [
    {
      year: '2015',
      title: 'The Spark',
      description: 'First concept of a luxury beauty studio takes shape while living in China, learning the language, and building international connections.',
    },
    {
      year: '2017',
      title: 'Bilas Studio Opens',
      description: 'Returned to PNG and launched Bilas Studio — starting small, powered by faith, self-belief, and a vision for international-standard beauty.',
    },
    {
      year: '2019',
      title: 'Bilas Beauty Launches',
      description: 'Curated product line launched with carefully selected global brands, celebrating Pacific beauty heritage with 100% natural ingredients.',
    },
    {
      year: '2021',
      title: 'ConnetSuppliers Grows',
      description: 'Global trade network expands with offices in Port Moresby, Guangzhou, and Tianjin — connecting suppliers and distributors across continents.',
    },
    {
      year: '2024',
      title: 'Magazine Cover Feature',
      description: 'Featured on the cover of PNG Entrepreneur magazine, recognized for promoting women in MSMEs and SME business across Papua New Guinea.',
    },
  ]

  const pressPhotos = [
    { src: '/content/press/magazine-cover.jpg', alt: 'PNG Entrepreneur Magazine Cover featuring Estelle', caption: 'Cover story — PNG Entrepreneur Issue 11: "Finding a Passion While Searching for a Career Path"' },
    { src: '/content/press/magazine-article.jpg', alt: 'Magazine article spread', caption: 'Full feature article documenting Estelle\'s entrepreneurial journey from China to PNG' },
    { src: '/content/press/magazine-stand.jpg', alt: 'Magazine on newsstand', caption: 'PNG Entrepreneur magazine displayed at retail — promoting women in MSMEs and SME Business' },
  ]

  const stats = [
    { icon: Globe, value: '3', label: 'Countries', detail: 'PNG, China, Kenya' },
    { icon: Award, value: '4', label: 'Ventures', detail: 'Studio, Beauty, Suppliers, Foundation' },
    { icon: Heart, value: '13+', label: 'Team Members', detail: 'Across two studio locations' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero with magazine photo */}
      <section className="relative min-h-[50vh] flex items-end justify-center px-4 pb-16 pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/content/travel/la-selva-dining.jpg"
            alt="Estelle Walters"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 text-balance">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              {intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 px-4 bg-secondary/30 border-y border-border">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon size={18} className="text-accent mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-serif font-bold text-accent">{stat.value}</p>
              <p className="text-sm font-semibold">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {bodyParagraphs.map((para, i) => (
              <p
                key={i}
                className="text-xl text-muted-foreground leading-relaxed mb-8 last:mb-0"
              >
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="The Journey" subtitle="From a vision in China to a business empire spanning three countries" centered />

          <div className="mt-12 max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 pb-10 last:pb-0 border-l border-border"
              >
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-accent -translate-x-[7px]" />
                <p className="text-2xl font-serif font-bold text-accent mb-1">{item.year}</p>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press & Media */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Press & Media"
            subtitle="Featured in PNG Entrepreneur — promoting women in MSMEs and SME business"
            centered
          />
          <div className="mt-12">
            <PhotoGallery photos={pressPhotos} columns={3} aspectRatio="portrait" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="My Values" subtitle="The principles that guide everything I do" centered />

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              { title: 'Excellence', description: 'Unwavering commitment to quality, detail, and perfection in every endeavor.' },
              { title: 'Innovation', description: 'Continuous evolution, creative thinking, and forward-looking approaches to challenges.' },
              { title: 'Connection', description: 'Building genuine relationships, understanding needs, and creating meaningful experiences.' },
              { title: 'Empowerment', description: 'Elevating others — employing and training young women, creating real opportunities.' },
              { title: 'Authenticity', description: 'Staying true to vision, transparent communication, and genuine representation.' },
              { title: 'Sustainability', description: 'Ethical practices, responsible sourcing, and care for communities and the environment.' },
            ].map((value, index) => (
              <LuxuryCard key={index} delay={index * 0.05} hoverable>
                <h3 className="text-lg font-semibold mb-3 text-accent">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </LuxuryCard>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
