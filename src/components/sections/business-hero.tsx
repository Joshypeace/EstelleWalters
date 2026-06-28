'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface HeroBusinessPageProps {
  title: string
  subtitle: string
  description: string
}

export function HeroBusinessPage({ title, subtitle, description }: HeroBusinessPageProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/#businesses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            Back to Ventures
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-6">
            {subtitle}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-balance mb-8 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
