import type { GalleryPhoto } from '@/components/ui/photo-gallery'
import type { SocialPost } from '@/components/ui/social-embeds'

export interface TravelPost {
  slug: string
  title: string
  excerpt: string
  date: string
  /** Destination country */
  country: string
  category: string
  readTime: string
  featuredImage: string
  gallery?: GalleryPhoto[]
  /** Linked social posts (Instagram / TikTok) */
  social?: SocialPost[]
  content: string
}

export const travelPosts: TravelPost[] = [
  {
    slug: 'paris-beauty-and-design',
    title: 'Paris: Where Beauty Meets Design',
    excerpt:
      'The city of light taught me that elegance lives in restraint — a lesson now woven into everything I create.',
    date: 'April 12, 2024',
    country: 'France',
    category: 'Beauty & Design Inspiration',
    readTime: '6 min read',
    featuredImage: '/content/travel/paris-eiffel-tower.jpg',
    gallery: [
      { src: '/content/travel/paris-eiffel-tower.jpg', alt: 'Estelle in Paris with Eiffel Tower', caption: 'Paris, France — where every corner inspires', category: 'Paris' },
      { src: '/content/travel/la-selva-dining.jpg', alt: 'Fine dining', caption: 'An evening of elegance and fine cuisine', category: 'Dining' },
      { src: '/content/travel/restaurant-selfie.jpg', alt: 'Restaurant ambiance', caption: 'Wine cellars and quiet luxury', category: 'Dining' },
    ],
    social: [
      { id: 'p1', type: 'instagram', url: 'https://www.instagram.com/p/DUriVFWjSDH/', caption: 'Discovering beauty and culture across continents', postId: 'DUriVFWjSDH' },
    ],
    content: `
Paris doesn't shout. It whispers — and somehow that whisper is louder than anything else.

I came to Paris expecting fashion and found philosophy. The French approach to beauty is built on restraint: a few exceptional things, used with intention, instead of an overwhelming abundance. A single red lip. A perfectly cut coat. Skin that looks like skin.

**The Lesson of Less**

Walking through the city, I kept noticing how much was achieved with how little. This is the principle I carry back to Bilas Beauty — that a curated, intentional collection serves people far better than endless choice.

**Light, Texture, and Time**

Paris is a masterclass in atmosphere. The way light falls across limestone in the late afternoon, the texture of a quiet café, the patience of a long dinner — all of it taught me that beauty is as much about the experience as the product.

I left Paris with no shopping bags and a notebook full of ideas. That, I think, is the most Parisian souvenir of all.
    `,
  },
  {
    slug: 'kenya-roots-and-wildlife',
    title: 'Kenya: Roots, Warmth, and Wildlife',
    excerpt:
      'In Nairobi I found beauty rituals rooted in nature and a warmth that reshaped how I think about community.',
    date: 'March 2, 2024',
    country: 'Kenya',
    category: 'Culture & Wildlife',
    readTime: '7 min read',
    featuredImage: '/content/travel/giraffe-centre-kenya.jpg',
    gallery: [
      { src: '/content/travel/giraffe-centre-kenya.jpg', alt: 'Giraffe Centre Nairobi', caption: 'Giraffe Centre, Nairobi — up close with nature', category: 'Kenya' },
      { src: '/content/travel/karibu-kenya.jpg', alt: 'Karibu Kenya sign', caption: 'Karibu Kenya — welcome to East Africa', category: 'Kenya' },
      { src: '/content/travel/kenya-wildlife.jpg', alt: 'Kenya wildlife experience', caption: 'Exploring Kenya\'s incredible wildlife', category: 'Kenya' },
    ],
    social: [
      { id: 'k1', type: 'instagram', url: 'https://www.instagram.com/p/CzXyd2rhQi-/', caption: 'Multi-destination journey: exploring markets and cultures', postId: 'CzXyd2rhQi-' },
    ],
    content: `
"Karibu" — welcome. From the moment I arrived in Nairobi, that single word set the tone for everything that followed.

**Beauty from the Earth**

Kenya reminded me that the most powerful ingredients are often the oldest. Shea, marula, botanicals passed down through generations — beauty here is rooted in nature and ancestral wisdom, not laboratories alone.

**Wildlife and Wonder**

Standing eye-to-eye with a giraffe at the Giraffe Centre, I felt something reset in me. There is a humility that comes from being close to wildlife — a reminder of scale, of patience, of how much exists beyond our small ambitions.

**Warmth as a Way of Life**

But what stayed with me most was the warmth of the people. Community in Kenya isn't a buzzword; it's a practice. That spirit is exactly what I want my businesses — and the Bilas Foundation — to carry forward.
    `,
  },
  {
    slug: 'norway-stillness-in-the-north',
    title: 'Norway: Finding Stillness in the North',
    excerpt:
      'Between fjords and frozen shores, Norway taught me that rest and reflection are forms of self-care too.',
    date: 'January 20, 2024',
    country: 'Norway',
    category: 'Nature & Reflection',
    readTime: '5 min read',
    featuredImage: '/content/travel/norway-winter.jpg',
    gallery: [
      { src: '/content/travel/norway-winter.jpg', alt: 'Winter in Norway', caption: 'Arctic serenity in the Norwegian fjords', category: 'Norway' },
      { src: '/content/travel/norway-mountains.jpg', alt: 'Norwegian mountain landscape', caption: 'Snow-capped mountains and frozen shores', category: 'Norway' },
      { src: '/content/travel/norway-bridge.jpg', alt: 'Norway bridge', caption: 'Crossing into quiet, open landscapes', category: 'Norway' },
    ],
    social: [
      { id: 'n1', type: 'instagram', url: 'https://www.instagram.com/p/DLHcNE6Sgh3/', caption: 'Global connections through travel and authentic experiences', postId: 'DLHcNE6Sgh3' },
    ],
    content: `
Some places fill you up with noise. Norway empties you out — in the best possible way.

**The Power of Quiet**

Surrounded by snow-capped mountains and silent fjords, I understood something I'd been too busy to notice: rest is not the absence of productivity. It is the foundation of it.

**Beauty as Balance**

The Nordic approach to wellness is about balance — saunas and cold water, light and dark, activity and deep stillness. Beauty here isn't only what you apply; it's the space you give yourself to simply be.

**Coming Home Lighter**

I returned from Norway with fewer thoughts and clearer ones. In a world that rewards constant motion, learning to be still might be the most radical act of self-care there is.
    `,
  },
  {
    slug: 'guangzhou-at-the-source',
    title: 'Guangzhou: Sourcing at the Source',
    excerpt:
      'Walking factory floors in China showed me what transparency really means — and shaped the vision for ConnetSuppliers.',
    date: 'November 15, 2023',
    country: 'China',
    category: 'Business & Sourcing',
    readTime: '8 min read',
    featuredImage: '/content/business/supplier-certificate.jpg',
    gallery: [
      { src: '/content/business/garment-factory.jpg', alt: 'Garment factory inspection', caption: 'On-site factory inspection in Guangzhou', category: 'Quality Control' },
      { src: '/content/business/sourcing-beauty-products.jpg', alt: 'Sourcing beauty products', caption: 'Product sampling at supplier offices', category: 'Sourcing' },
      { src: '/content/business/logistics-shipping.jpg', alt: 'Logistics and shipping', caption: 'Coordinating international freight', category: 'Logistics' },
    ],
    social: [
      { id: 'g1', type: 'tiktok', url: 'https://vt.tiktok.com/ZSChhpCWL/', caption: 'Trade connections: from China to PNG' },
    ],
    content: `
The world calls Guangzhou "the world's factory floor." I call it the place where ConnetSuppliers was truly born.

**Seeing It With My Own Eyes**

Most brands never visit the places their products come from. I made the opposite choice. Walking factory floors, sampling products at supplier offices, inspecting quality firsthand — that transparency became non-negotiable.

**Relationships Over Transactions**

Trade isn't just logistics and customs. It's trust, language, and culture. The partnerships I built in Guangzhou and Tianjin are based on genuine relationships, not just purchase orders.

**From Source to Shelf**

Every supplier handshake, every quality check, every shipment coordinated from China to Papua New Guinea shaped a simple conviction: global trade should be reliable, ethical, and human. That conviction is the foundation of ConnetSuppliers today.
    `,
  },
]

export function getTravelPost(slug: string): TravelPost | undefined {
  return travelPosts.find((p) => p.slug === slug)
}
