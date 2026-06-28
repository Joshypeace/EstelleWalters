import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArticleContent } from '@/components/sections/article-content'
import Link from 'next/link'

// Sample articles data - in real app this would come from database
const articles: Record<string, any> = {
  'luxury-beauty': {
    title: 'The Art of Luxury Beauty in Modern Times',
    date: 'March 15, 2024',
    readTime: '8 min read',
    category: 'Beauty',
    excerpt:
      'Exploring how craftsmanship and innovation come together to create beauty experiences that transcend the ordinary.',
    author: 'Estelle Walters',
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
  'global-trade': {
    title: 'Building Global Connections in Trade',
    date: 'March 8, 2024',
    readTime: '10 min read',
    category: 'Business',
    excerpt:
      'Insights from connecting suppliers and distributors across international markets and breaking down silos.',
    author: 'Estelle Walters',
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
  'wellness-philosophy': {
    title: 'Wellness Philosophy: Beyond the Surface',
    date: 'February 28, 2024',
    readTime: '7 min read',
    category: 'Wellness',
    excerpt:
      'A deep dive into holistic wellness, sustainability, and the importance of mindful beauty practices.',
    author: 'Estelle Walters',
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
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="min-h-64 flex items-center justify-center pt-20 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Article not found</h1>
            <Link href="/journal" className="text-accent hover:underline">
              Back to Journal
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ArticleContent
        title={article.title}
        date={article.date}
        readTime={article.readTime}
        category={article.category}
        content={article.content}
        author={article.author}
      />
      <Footer />
    </main>
  )
}
