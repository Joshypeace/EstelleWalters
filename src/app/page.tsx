import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { BusinessesSection } from '@/components/sections/businesses'
import { TravelPreview } from '@/components/sections/travel-preview'
import { RelatedProjects } from '@/components/sections/related-projects'
import { JournalPreview } from '@/components/sections/journal-preview'
import { CTASection } from '@/components/sections/cta'
import { getVentures, getPublishedJournalPosts, getConnectedVentures, getPageContent } from '@/server/queries'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [ventures, journalPosts, connected, content] = await Promise.all([
    getVentures(),
    getPublishedJournalPosts(),
    getConnectedVentures(),
    getPageContent('home'),
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
      <HeroSection
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
      />
      <AboutSection heading={content.heading} body={content.body} />
      <BusinessesSection
        businesses={ventures}
        title={content.venturesTitle}
        subtitle={content.venturesSubtitle}
      />
      <TravelPreview />
      <RelatedProjects projects={connected} />
      <JournalPreview articles={journalPreview} />
      <CTASection
        heading={content.ctaHeading}
        body={content.ctaBody}
        buttonLabel={content.ctaButton}
      />
      <Footer />
    </main>
  )
}
