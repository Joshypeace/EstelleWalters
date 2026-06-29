import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { BusinessesSection } from '@/components/sections/businesses'
import { TravelPreview } from '@/components/sections/travel-preview'
import { RelatedProjects } from '@/components/sections/related-projects'
import { JournalPreview } from '@/components/sections/journal-preview'
import { CTASection } from '@/components/sections/cta'
import { getVentures, getPublishedJournalPosts, getConnectedVentures } from '@/server/queries'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [ventures, journalPosts, connected] = await Promise.all([
    getVentures(),
    getPublishedJournalPosts(),
    getConnectedVentures(),
  ])

  const journalPreview = journalPosts.slice(0, 3).map((p) => ({
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    category: p.category,
    slug: p.slug,
  }))

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <BusinessesSection businesses={ventures} />
      <TravelPreview />
      <RelatedProjects projects={connected} />
      <JournalPreview articles={journalPreview} />
      <CTASection />
      <Footer />
    </main>
  )
}
