'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SectionHeader } from '@/components/ui/luxury-card'
import { PhotoGallery } from '@/components/ui/photo-gallery'
import { VideoShowcase } from '@/components/ui/video-showcase'
import { SocialGallery } from '@/components/ui/social-embeds'
import type { TravelPost } from '@/lib/travel'
import { motion } from 'framer-motion'
import { MapPin, Plane, Camera, Calendar, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const travelContent = [
  { id: '1', type: 'instagram' as const, url: 'https://www.instagram.com/reel/DVqMLZHkZLH/', caption: 'Travel adventures and lifestyle moments from around the world', postId: 'DVqMLZHkZLH' },
  { id: '2', type: 'instagram' as const, url: 'https://www.instagram.com/p/DUriVFWjSDH/', caption: 'Discovering beauty and culture across continents', postId: 'DUriVFWjSDH' },
  { id: '3', type: 'instagram' as const, url: 'https://www.instagram.com/reel/DCvFZHshJ8w/', caption: 'Behind-the-scenes travel experiences and insights', postId: 'DCvFZHshJ8w' },
  { id: '4', type: 'instagram' as const, url: 'https://www.instagram.com/p/CzXyd2rhQi-/', caption: 'Multi-destination journey: exploring markets and cultures', postId: 'CzXyd2rhQi-' },
  { id: '5', type: 'instagram' as const, url: 'https://www.instagram.com/p/DLHcNE6Sgh3/', caption: 'Global connections through travel and authentic experiences', postId: 'DLHcNE6Sgh3' },
  { id: '6', type: 'tiktok' as const, url: 'https://vt.tiktok.com/ZSChhEw8j/', caption: 'Travel vlog: exploring new destinations' },
  { id: '7', type: 'tiktok' as const, url: 'https://vt.tiktok.com/ZSChk1RgF/', caption: 'Cultural experiences and local markets' },
  { id: '8', type: 'tiktok' as const, url: 'https://vt.tiktok.com/ZSChhpCWL/', caption: 'Trade connections: from China to PNG' },
  { id: '9', type: 'tiktok' as const, url: 'https://vt.tiktok.com/ZSChkUaFd/', caption: 'Business travel insights and logistics' },
  { id: '10', type: 'tiktok' as const, url: 'https://vt.tiktok.com/ZSChkLkLj/', caption: 'Lifestyle moments from around the world' },
  { id: '11', type: 'tiktok' as const, url: 'https://vt.tiktok.com/ZSChkbYyM/', caption: 'Adventures in international business and culture' },
]

const destinations = [
  { city: 'Paris', country: 'France', image: '/content/travel/paris-eiffel-tower.jpg', description: 'The city of light and luxury — where art, fashion, and beauty converge in timeless elegance.', highlights: 'Beauty & Design Inspiration' },
  { city: 'Nairobi', country: 'Kenya', image: '/content/travel/giraffe-centre-kenya.jpg', description: "Wildlife, warmth, and vibrant culture. East Africa's beating heart and a gateway to extraordinary experiences.", highlights: 'Culture & Wildlife' },
  { city: 'Norway', country: 'Scandinavia', image: '/content/travel/norway-winter.jpg', description: 'Snow-capped fjords and arctic serenity. Finding stillness and perspective in the far north.', highlights: 'Nature & Reflection' },
  { city: 'Guangzhou', country: 'China', image: '/content/business/supplier-certificate.jpg', description: "The world's factory floor. Building supplier relationships and sourcing premium products at the source.", highlights: 'Business & Sourcing' },
]

const travelPhotos = [
  { src: '/content/travel/norway-mountains.jpg', alt: 'Norwegian mountain landscape', caption: 'Snow-capped mountains and frozen shores', category: 'Norway' },
  { src: '/content/travel/norway-bridge.jpg', alt: 'Norway bridge crossing', caption: 'Crossing into quiet, open landscapes', category: 'Norway' },
  { src: '/content/travel/karibu-kenya.jpg', alt: 'Karibu Kenya sign', caption: 'Karibu Kenya — welcome to East Africa', category: 'Kenya' },
  { src: '/content/travel/kenya-wildlife.jpg', alt: 'Kenya wildlife experience', caption: "Exploring Kenya's incredible wildlife", category: 'Kenya' },
  { src: '/content/travel/la-selva-dining.jpg', alt: 'Fine dining at La Selva', caption: 'La Selva — where tropical ambiance meets fine cuisine', category: 'Dining' },
  { src: '/content/travel/restaurant-selfie.jpg', alt: 'Restaurant ambiance', caption: 'An evening of elegance and wine cellars', category: 'Dining' },
  { src: '/content/travel/dinner-outing.jpg', alt: 'Evening outing', caption: 'Nights out with good company', category: 'Lifestyle' },
  { src: '/content/travel/airport.jpg', alt: 'Airport travels', caption: 'Always on the move — another boarding pass, another adventure', category: 'Travel' },
  { src: '/content/travel/la-selva-ambiance.jpg', alt: 'La Selva restaurant ambiance', caption: 'Jungle-inspired dining in the city', category: 'Dining' },
  { src: '/content/travel/la-selva-menu.jpg', alt: 'La Selva menu', caption: 'Curated menus in extraordinary settings', category: 'Dining' },
]

const travelVideos = [
  { src: '/content/videos/travel-1.mp4', title: 'Exploring New Horizons', description: 'Highlights from recent travels across continents' },
  { src: '/content/videos/travel-2.mp4', title: 'Business Meets Adventure', description: 'Where entrepreneurship and exploration intersect' },
  { src: '/content/videos/travel-3.mp4', title: 'Behind the Scenes', description: 'The real moments between the destinations' },
]

export function TravelPageView({ posts }: { posts: TravelPost[] }) {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero with featured travel image */}
      <section className="relative min-h-[60vh] flex items-end justify-center px-4 pb-16 pt-24">
        <div className="absolute inset-0 z-0">
          <Image src="/content/travel/norway-winter.jpg" alt="Travel hero — Norway" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Plane size={16} className="text-accent" />
              <p className="text-accent text-sm font-semibold uppercase tracking-widest">Travel & Inspiration</p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-balance">
              Where Business<br />Meets Wonder
            </h1>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Journeys across continents — discovering beauty rituals, forging supplier partnerships,
              and collecting stories from Paris to Papua New Guinea.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Destinations" subtitle="Places that inspire, connect, and transform" centered />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {destinations.map((dest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={dest.image} alt={`${dest.city}, ${dest.country}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={14} className="text-accent" />
                      <span className="text-xs text-accent font-semibold uppercase tracking-wider">{dest.highlights}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white">{dest.city}</h3>
                    <p className="text-white/60 text-sm">{dest.country}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">{dest.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Travel Gallery" subtitle="Moments captured across continents" centered />
          <div className="flex items-center justify-center gap-2 mt-2 mb-12">
            <Camera size={14} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Tap any photo to view full size</p>
          </div>
          <PhotoGallery photos={travelPhotos} columns={3} aspectRatio="square" />
        </div>
      </section>

      {/* Travel Videos */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Travel Reels" subtitle="Stories in motion from the road" centered />
          <div className="mt-12">
            <VideoShowcase videos={travelVideos} />
          </div>
        </div>
      </section>

      {/* Travel Stories — managed from the dashboard */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Travel Stories" subtitle="Individual journals from the road — beauty, business, and wonder across the world" centered />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
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
                <Link href={`/travel/${post.slug}`} className="block group">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={post.featuredImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-accent/80 px-2 py-0.5 rounded-full">{post.country}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-2">{post.category}</p>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-balance leading-tight group-hover:text-accent transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar size={14} />
                        {post.date}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm text-accent font-medium">
                        Read story
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social embed gallery */}
      <SocialGallery posts={travelContent} title="Follow the Journey" />

      <Footer />
    </main>
  )
}
