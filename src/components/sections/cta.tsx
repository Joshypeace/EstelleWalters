'use client'

import { motion } from 'framer-motion'
import { PremiumButton } from '@/components/ui/premium-button'
import { Mail, Phone } from 'lucide-react'

interface CTASectionProps {
  heading?: string
  body?: string
  buttonLabel?: string
}

export function CTASection({
  heading = "Let's Connect",
  body = "Whether you're interested in collaboration, partnership, or simply want to say hello, I'd love to hear from you.",
  buttonLabel = 'Send an Email',
}: CTASectionProps = {}) {
  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-secondary to-secondary/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6 text-balance">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-balance">
            {body}
          </p>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Email */}
          <motion.a
            href="mailto:hello@estelle.com"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center gap-4 p-6 bg-card border border-border rounded-lg hover:border-accent transition-colors group"
          >
            <div className="p-3 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
              <Mail size={24} className="text-accent" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-muted-foreground text-sm">hello@estelle.com</p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+1-555-0123"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center gap-4 p-6 bg-card border border-border rounded-lg hover:border-accent transition-colors group"
          >
            <div className="p-3 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
              <Phone size={24} className="text-accent" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Phone</h4>
              <p className="text-muted-foreground text-sm">+1 (555) 012-3456</p>
            </div>
          </motion.a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <PremiumButton
            href="mailto:hello@estelle.com"
            variant="primary"
            size="lg"
            icon={<Mail size={18} />}
          >
            {buttonLabel}
          </PremiumButton>
          <PremiumButton variant="outline" size="lg">
            Schedule a Call
          </PremiumButton>
        </motion.div>
      </div>
    </section>
  )
}
