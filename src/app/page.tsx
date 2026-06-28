import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { BusinessesSection } from '@/components/sections/businesses'
import { TravelPreview } from '@/components/sections/travel-preview'
import { RelatedProjects } from '@/components/sections/related-projects'
import { JournalPreview } from '@/components/sections/journal-preview'
import { CTASection } from '@/components/sections/cta'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <BusinessesSection />
      <TravelPreview />
      <RelatedProjects />
      <JournalPreview />
      <CTASection />
      <Footer />
    </main>
  )
}
