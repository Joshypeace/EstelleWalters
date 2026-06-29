'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PhotoGallery } from '@/components/ui/photo-gallery'
import { SocialGallery } from '@/components/ui/social-embeds'
import type { TravelPost } from '@/lib/travel'

export function TravelArticle({ post }: { post: TravelPost }) {
  return (
    <>
      {/* Hero with featured image */}
      <section className="relative min-h-[70vh] flex items-end px-4 pb-12 pt-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/travel"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Back to Travel
            </Link>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
              {post.category}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-balance mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                {post.country}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert max-w-none"
          >
            <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
              {post.content}
            </div>
          </motion.article>

          {/* Gallery */}
          {post.gallery && post.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-serif font-semibold mb-6">Gallery</h2>
              <PhotoGallery photos={post.gallery} columns={3} aspectRatio="square" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Linked social posts */}
      {post.social && post.social.length > 0 && (
        <SocialGallery posts={post.social} title="From the Feed" />
      )}
    </>
  )
}
