import type { GalleryPhoto } from '@/components/ui/photo-gallery'

export interface JournalPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  author: string
  /** Featured / hero image for the post */
  featuredImage: string
  /** Optional image gallery shown within the article */
  gallery?: GalleryPhoto[]
  /** Optional venture slug this post is linked to (see lib/ventures) */
  venture?: string
  content: string
}

export const journalPosts: JournalPost[] = [
  {
    slug: 'luxury-beauty',
    title: 'The Art of Luxury Beauty in Modern Times',
    excerpt:
      'Exploring how craftsmanship and innovation come together to create beauty experiences that transcend the ordinary.',
    date: 'March 15, 2024',
    readTime: '8 min read',
    category: 'Beauty',
    author: 'Estelle Walters',
    featuredImage: '/content/beauty/product-launch.jpg',
    venture: 'bilas-beauty',
    gallery: [
      { src: '/content/beauty/product-launch.jpg', alt: 'Bilas Beauty product launch', caption: 'Showcasing the curated lash collection', category: 'Launch' },
      { src: '/content/beauty/lashes-display.jpg', alt: 'Lashes product display', caption: 'Premium lash selection sourced from the world\'s best manufacturers', category: 'Products' },
    ],
    content: `
Luxury beauty has evolved beyond traditional definitions. In today's world, true luxury isn't just about exclusivity—it's about intentionality, craftsmanship, and the profound impact a single moment can have on someone's sense of self.

Throughout my journey building Bilas Studio and Bilas Beauty, I've come to understand that luxury exists at the intersection of three elements: exceptional quality, personal transformation, and timeless elegance.

**The Foundation: Quality Beyond Compare**

Every product, every treatment, every experience at Bilas Studio begins with an uncompromising commitment to quality. This isn't about high price tags—it's about honest craftsmanship. From sourcing the finest ingredients to training consultants with meticulous attention to detail, quality is non-negotiable.

When I curated the Bilas Beauty collection, I visited artisans, spoke with chemists, and understood the stories behind each formulation. This intimate knowledge ensures that every item in our collection represents genuine excellence.

**The Experience: More Than a Treatment**

Luxury beauty has transcended the boundaries of transactional services. Clients don't simply come to Bilas Studio for a facial—they come for a transformation. They come to be seen, understood, and elevated.

Our consultants spend time understanding each client's unique needs, skin history, lifestyle, and aspirations. This consultation isn't rushed; it's sacred. From this understanding emerges a personalized treatment plan that addresses not just skin concerns, but the deeper need to feel cared for and valued.

**The Future: Sustainability & Innovation**

As the beauty industry evolves, so does my commitment to responsible luxury. The future of beauty lies in innovation that doesn't compromise ethics, in products that perform without harming, in businesses that scale beauty without exploiting communities.

This philosophy extends to every venture I lead. At ConnetSuppliers, we ensure that our supply chains honor artisans and producers. At Bilas Beauty, we prioritize brands that align with these values. Luxury, in modern times, means creating beauty that the world can be proud of.
    `,
  },
  {
    slug: 'global-trade',
    title: 'Building Global Connections in Trade',
    excerpt:
      'Insights from connecting suppliers and distributors across international markets and breaking down silos.',
    date: 'March 8, 2024',
    readTime: '10 min read',
    category: 'Business',
    author: 'Estelle Walters',
    featuredImage: '/content/business/logistics-shipping.jpg',
    venture: 'connet-suppliers',
    gallery: [
      { src: '/content/business/supplier-certificate.jpg', alt: 'Verified Supplier Certificate', caption: 'Earning Alibaba Verified Supplier Certification', category: 'Partnerships' },
      { src: '/content/business/garment-factory.jpg', alt: 'Garment factory inspection', caption: 'On-site factory inspection in Guangzhou', category: 'Quality Control' },
      { src: '/content/business/warehouse-operations.jpg', alt: 'Warehouse operations', caption: 'Coordinating inventory and fulfillment', category: 'Operations' },
    ],
    content: `
International trade has been romanticized as a complex, intimidating landscape reserved for large corporations. But my experience building ConnetSuppliers has revealed something different: trade becomes magical when you remove barriers and build genuine relationships.

The genesis of ConnetSuppliers came from frustration. I watched talented artisans and small producers struggle to find distributors. Conversely, I knew distributors desperately seeking reliable suppliers. The disconnect was real, and the solution seemed obvious—yet surprisingly absent from the market.

**The Challenge: More Than Logistics**

Global trade isn't just about shipping and customs. It's about trust. It's about understanding regulatory frameworks across continents. It's about language, culture, and the unique challenges each market presents.

When I started building the network, I realized that successful trade partnerships require more than transactional efficiency. They require relationship building, continuous communication, and problem-solving that goes beyond spreadsheets.

**The Breakthrough: Technology Meets Human Connection**

ConnetSuppliers succeeds because we haven't replaced human connection with algorithms. Technology serves the purpose of connecting people efficiently, but the relationships themselves remain central.

We vet every supplier personally. We understand distributor needs intimately. We facilitate introductions not as a matchmaking app, but as trusted advisors who understand both sides of the equation.

**The Vision: Democratizing Global Trade**

My dream for ConnetSuppliers extends beyond connecting existing businesses. I envision a world where a talented small business in Vietnam can seamlessly connect with a distributor in Brazil. Where a sustainable brand in Kenya can reach markets they'd never access alone. Where geography and company size are no longer barriers to global impact.

This vision drives every decision we make, every feature we build, every partnership we facilitate.
    `,
  },
  {
    slug: 'wellness-philosophy',
    title: 'Wellness Philosophy: Beyond the Surface',
    excerpt:
      'A deep dive into holistic wellness, sustainability, and the importance of mindful beauty practices.',
    date: 'February 28, 2024',
    readTime: '7 min read',
    category: 'Wellness',
    author: 'Estelle Walters',
    featuredImage: '/content/beauty/lashes-display.jpg',
    venture: 'bilas-studio',
    content: `
Wellness isn't a trend—it's a fundamental shift in how we understand our relationship with ourselves. After years of building beauty businesses, I've learned that true beauty emerges from genuine wellness.

The clients who experience the most transformation at Bilas Studio aren't necessarily those seeking cosmetic changes. They're the ones seeking to align their outer presentation with their inner truth.

**Redefining Wellness**

Conventional wellness often means rigid fitness routines and restrictive diets. I've never believed in this approach. My wellness philosophy is rooted in sustainability, meaning it must be maintainable, enjoyable, and aligned with your authentic lifestyle.

True wellness means understanding that a luxurious treatment can be deeply therapeutic. That skincare can be a meditation. That taking time for yourself isn't selfish—it's essential.

**The Intersection of Beauty and Wellness**

When you invest in premium skincare, you're not just addressing surface-level concerns. You're creating a ritual of self-care. You're communicating to yourself that you're worth time and investment.

At Bilas Studio, we've discovered that treatments often provide benefits beyond the physical. Clients report feeling more confident, more grounded, more themselves. This isn't magic—it's the result of addressing the whole person: the body, the mind, and the spirit.

**Sustainability: The Missing Link**

Wellness is only meaningful if it's sustainable—for you and for the planet. I've intentionally built my businesses around sustainable practices because genuine wellness cannot exist at the expense of others or the environment.

This means sourcing responsibly, treating our team with respect, and ensuring that every product in Bilas Beauty reflects our commitment to doing business ethically.
    `,
  },
  {
    slug: 'travel-beauty',
    title: 'Travel Diaries: Beauty Rituals Around the World',
    excerpt:
      'Discovering beauty traditions and wellness practices across three continents and how they inspire my work.',
    date: 'February 18, 2024',
    readTime: '9 min read',
    category: 'Travel',
    author: 'Estelle Walters',
    featuredImage: '/content/travel/paris-eiffel-tower.jpg',
    gallery: [
      { src: '/content/travel/paris-eiffel-tower.jpg', alt: 'Paris', caption: 'Paris, France — where every corner inspires', category: 'Paris' },
      { src: '/content/travel/giraffe-centre-kenya.jpg', alt: 'Nairobi, Kenya', caption: 'Giraffe Centre, Nairobi', category: 'Kenya' },
      { src: '/content/travel/norway-mountains.jpg', alt: 'Norway', caption: 'Snow-capped mountains and frozen shores', category: 'Norway' },
    ],
    content: `
There is no better teacher of beauty than the world itself. Every destination I've visited has gifted me a new perspective on what it means to care for ourselves—and how deeply beauty is woven into culture, ritual, and identity.

**Paris: The Art of Effortlessness**

In Paris, beauty is a philosophy of restraint. The French approach to skincare taught me that less is often more—that consistency and quality outshine excess. A simple ritual, performed with intention, can be more transformative than a shelf of products.

**Kenya: Beauty Rooted in Nature**

In Nairobi, I discovered beauty traditions built on natural ingredients and ancestral wisdom—shea, marula, and botanicals passed down through generations. These rituals reminded me that the most powerful ingredients are often the ones closest to the earth.

**Norway: Stillness as Self-Care**

The Nordic approach to wellness centers on balance and stillness. Between fjords and quiet winters, I learned that beauty isn't only what we apply—it's the rest, the reflection, and the space we give ourselves to simply be.

**Bringing the World Home**

Each of these rituals now lives in the DNA of Bilas Beauty and Bilas Studio. Travel doesn't just inspire my work—it shapes a vision of beauty that is global, inclusive, and deeply human.
    `,
  },
  {
    slug: 'future-entrepreneurship',
    title: 'The Future of Entrepreneurship',
    excerpt:
      'My vision for the next generation of business leaders and how to build enterprises that matter.',
    date: 'February 8, 2024',
    readTime: '6 min read',
    category: 'Business',
    author: 'Estelle Walters',
    featuredImage: '/content/press/magazine-cover.jpg',
    gallery: [
      { src: '/content/press/magazine-cover.jpg', alt: 'Magazine cover feature', caption: 'Featured in print', category: 'Press' },
      { src: '/content/press/magazine-article.jpg', alt: 'Magazine article', caption: 'Telling the story behind the brands', category: 'Press' },
    ],
    content: `
Entrepreneurship is changing. The next generation of founders won't be defined by how fast they scale, but by the values they refuse to compromise along the way.

**Purpose Before Profit**

Building Bilas Studio, Bilas Beauty, and ConnetSuppliers taught me that profit follows purpose—not the other way around. When you solve a real problem for real people, growth becomes a natural consequence rather than a forced outcome.

**Building Across Borders**

The future entrepreneur is global by default. Sourcing in China, serving customers in Papua New Guinea, and drawing inspiration from Paris to Nairobi—modern businesses live everywhere at once. Embracing that complexity is no longer optional; it's the advantage.

**Lifting Others as You Rise**

True leadership means creating opportunity beyond yourself. Through training, mentorship, and community initiatives, the businesses we build can become engines of empowerment—especially for women and young people who rarely see themselves represented at the top.

The future of entrepreneurship is purposeful, borderless, and generous. That's the kind of business worth building.
    `,
  },
  {
    slug: 'sustainability-beauty',
    title: 'Sustainability in Beauty Supply Chains',
    excerpt:
      'How ethical sourcing and sustainable practices are transforming the global beauty industry.',
    date: 'January 28, 2024',
    readTime: '8 min read',
    category: 'Beauty',
    author: 'Estelle Walters',
    featuredImage: '/content/business/sourcing-beauty-products.jpg',
    venture: 'bilas-beauty',
    gallery: [
      { src: '/content/business/sourcing-beauty-products.jpg', alt: 'Sourcing beauty products', caption: 'Product sampling and quality verification', category: 'Sourcing' },
      { src: '/content/business/beauty-supplier-visit.jpg', alt: 'Beauty supplier visit', caption: 'Building relationships with beauty suppliers', category: 'Sourcing' },
    ],
    content: `
The beauty industry has a sustainability problem—and also an extraordinary opportunity. Every product tells a story, and increasingly, customers want that story to be one they can be proud of.

**Tracing the Supply Chain**

Sustainability begins with knowing where your products come from. Through ConnetSuppliers, I've walked the factory floors and supplier offices that most brands never see. That transparency is the foundation of ethical sourcing.

**Clean Formulations, Honest Claims**

At Bilas Beauty, clean beauty isn't a marketing slogan—it's a standard. Natural ingredients, responsible packaging, and honest labeling mean customers know exactly what they're putting on their skin.

**The Business Case for Doing Good**

Sustainable practices aren't a cost—they're an investment in trust. Customers reward brands that respect people and the planet, and those relationships compound over time.

The future of beauty is sustainable, transparent, and accountable. Building it that way isn't just the right thing to do—it's the smart thing to do.
    `,
  },
]

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug)
}

export function getJournalPostsByVenture(ventureSlug: string): JournalPost[] {
  return journalPosts.filter((p) => p.venture === ventureSlug)
}
