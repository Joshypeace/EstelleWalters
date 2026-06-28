'use client'

import { motion } from 'framer-motion'
import { PremiumButton } from '@/components/ui/premium-button'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/content/travel/paris-eiffel-tower.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-6">
            Welcome to
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-balance mb-6 leading-tight">
            Estelle<span className="text-accent">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto mb-8 leading-relaxed">
            Entrepreneur, beauty visionary, and architect of luxury experiences across three continents.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <PremiumButton variant="primary" size="lg" href="#about">
            Discover My Story
          </PremiumButton>
          <PremiumButton variant="outline" size="lg" href="#contact">
            Get in Touch
          </PremiumButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground hover:text-accent transition-colors cursor-pointer"
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
