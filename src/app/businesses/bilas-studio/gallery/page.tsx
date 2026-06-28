'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SocialGallery } from '@/components/ui/social-embeds'
import { motion } from 'framer-motion'

const bilasStudioContent = [
  {
    id: '1',
    type: 'tiktok' as const,
    url: 'https://www.tiktok.com/@bilastudios/video/7406099477225868552',
    caption: 'Hair givingggggg🔥 7 days in a week #bilastudio #pngtiktok🇵🇬 #protectivehairstyles',
    videoId: '7406099477225868552',
  },
  {
    id: '2',
    type: 'tiktok' as const,
    url: 'https://www.tiktok.com/@bilastudios/video/7361598512762473736',
    caption: '#onthisday get the Bilas Glammmmm 💋 #bilastudio #pngtiktok🇵🇬 #hairandmakeup',
    videoId: '7361598512762473736',
  },
  {
    id: '3',
    type: 'tiktok' as const,
    url: 'https://www.tiktok.com/@bilastudios/video/7288658365280963841',
    caption: 'Get your hair silk pressed and laidddd at Bilas Studio 💈 #bilastudio #pngtiktok🇵🇬 #silkpress',
    videoId: '7288658365280963841',
  },
  {
    id: '4',
    type: 'tiktok' as const,
    url: 'https://www.tiktok.com/@bilastudios/video/7485180874238070034',
    caption: "It's Monday and our boss is lazy uh sorry busy….hope to see you at Bilas this week ❤️🤭 #bilastudio #hairsaloncontent",
    videoId: '7485180874238070034',
  },
  {
    id: '5',
    type: 'tiktok' as const,
    url: 'https://www.tiktok.com/@bilastudios/video/7277520732303740161',
    caption: 'Get your independence braids done at Bilas 💈 walk ins are welcome 🫶🏾 #bilastudio #pngtiktok🇵🇬 #pngindependence',
    videoId: '7277520732303740161',
  },
  {
    id: '6',
    type: 'tiktok' as const,
    url: 'https://www.tiktok.com/@bilastudios/video/7519844776066305298',
    caption: '#onthisday throw back to this beautiful Bilas bride 👰',
    videoId: '7519844776066305298',
  },
  {
    id: '7',
    type: 'tiktok' as const,
    url: 'https://www.tiktok.com/@bilastudios/video/7488543444659440903',
    caption: 'To our favorite window shopper we hope you stop browsing and start booking 😁 Happy new month to you 🥰 #bilastudio #hairsalontiktok',
    videoId: '7488543444659440903',
  },
  {
    id: '8',
    type: 'tiktok' as const,
    url: 'https://www.tiktok.com/@bilastudios/video/7152103562032467201',
    caption: 'Another great day for a corporate hair and makeup gig with Bilas Studio 🫶🏾 #bilastudio #pngtiktok🇵🇬',
    videoId: '7152103562032467201',
  },
  {
    id: '9',
    type: 'tiktok' as const,
    url: 'https://www.tiktok.com/@bilastudios/video/7498886124694228231',
    caption: '20% off all hair services at Bilas Studio Ela Beach studio when you go by to get an outfit tailored at Paradise Boutique — Graduation sale ends May 5th 2025 📍',
    videoId: '7498886124694228231',
  },
  {
    id: '10',
    type: 'tiktok' as const,
    url: 'https://www.tiktok.com/@bilastudios/video/7486295145814527250',
    caption: 'Just a Bilas fan😚 Contact our friendly staff to make an appointment on WhatsApp 78314360 or direct call us on 78314360 or 3421001 ☎️ #bilastudio #hairsalontiktok',
    videoId: '7486295145814527250',
  },
  {
    id: '11',
    type: 'instagram' as const,
    url: 'https://www.instagram.com/p/DPvSl_qE74C/',
    caption: 'Pedicure + massage = therapy session without leaving the salon',
    postId: 'DPvSl_qE74C',
  },
]

export default function BilasStudioGalleryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-balance">
              Bilas Studio Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover transformations, beauty tutorials, and behind-the-scenes moments from our studios across Papua New Guinea.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Gallery */}
      <SocialGallery
        posts={bilasStudioContent}
        title="Featured Content"
      />

      <Footer />
    </main>
  )
}
