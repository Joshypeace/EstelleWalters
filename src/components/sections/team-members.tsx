'use client'

import { motion } from 'framer-motion'

interface TeamMember {
  name: string
  role: string
}

interface TeamMembersProps {
  members: TeamMember[]
  title?: string
}

export function TeamMembers({ members, title = 'Our Team' }: TeamMembersProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{title}</h2>
          <div className="h-1 w-20 bg-accent rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 text-foreground">{member.name}</h3>
              <p className="text-sm text-accent font-medium">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
