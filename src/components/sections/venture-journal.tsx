'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/luxury-card'
import { trpc } from '@/trpc/react'

interface VentureJournalProps {
  ventureSlug: string
  title?: string
  subtitle?: string
}

export function VentureJournal({
  ventureSlug,
  title = 'From the Journal',
  subtitle = 'Stories and insights connected to this venture',
}: VentureJournalProps) {
  const { data: posts = [] } = trpc.journal.byVenture.useQuery({ ventureSlug })

  if (posts.length === 0) return null

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={title} subtitle={subtitle} centered />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-lg overflow-hidden transition-colors hover:border-accent/50"
            >
              <Link href={`/journal/${post.slug}`} className="block group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-white bg-accent/80 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-serif font-semibold mb-2 text-balance leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    <ArrowRight size={16} className="text-accent transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
