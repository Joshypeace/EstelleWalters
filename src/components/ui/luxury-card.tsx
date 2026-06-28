'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface LuxuryCardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  animate?: boolean
  delay?: number
}

export function LuxuryCard({
  children,
  className = '',
  hoverable = true,
  animate = true,
  delay = 0,
}: LuxuryCardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : {}}
      whileInView={animate ? { opacity: 1, y: 0 } : {}}
      whileHover={hoverable ? { y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay }}
      className={`bg-card border border-border rounded-lg p-6 transition-colors ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-balance mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-balance max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
