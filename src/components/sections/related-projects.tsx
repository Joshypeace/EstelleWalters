'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/luxury-card'
import { containerVariants } from '@/lib/animations'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export interface RelatedProject {
  name: string
  description: string
  url: string
  status?: string
}

const cardColors = [
  'from-blue-500/20 to-blue-600/20',
  'from-purple-500/20 to-purple-600/20',
  'from-yellow-500/20 to-yellow-600/20',
  'from-amber-500/20 to-amber-600/20',
]

export function RelatedProjects({ projects }: { projects: RelatedProject[] }) {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Connected Ventures"
          subtitle="Expanding the Bilas ecosystem through complementary brands and initiatives"
          centered
        />

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariant}>
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <div className={`bg-gradient-to-br ${cardColors[index % cardColors.length]} border border-border rounded-lg p-6 h-full hover:border-accent transition-all duration-300 cursor-pointer group`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground flex-1 group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                    {!project.status && (
                      <ExternalLink size={16} className="text-accent ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  {project.status && (
                    <div className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                      {project.status}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
