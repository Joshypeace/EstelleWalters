import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroBusinessPage } from '@/components/sections/business-hero'
import { BusinessAbout } from '@/components/sections/business-about'
import { Services } from '@/components/sections/services'
import { Testimonials } from '@/components/sections/testimonials'
import { CTASection } from '@/components/sections/cta'
import { VentureJournal } from '@/components/sections/venture-journal'
import { TeamMembers } from '@/components/sections/team-members'
import Image from 'next/image'

export const metadata = {
  title: 'Bilas Studio | Luxury Beauty Experiences',
  description: 'An exclusive beauty studio offering personalized treatments, bespoke services, and immersive wellness experiences.',
}

const teamMembers = [
  { name: 'Estelle Walters', role: 'Founder' },
  { name: 'Sarah Hemine', role: 'Waigani Studio Manager' },
  { name: 'Theresa Manu', role: 'Ela Beach Studio Manager' },
  { name: 'Jessica Tokima', role: 'Senior Hair Dresser' },
  { name: 'Imelda Kovio', role: 'Spa Therapist' },
  { name: 'Marie Wailou', role: 'Hair Dresser' },
  { name: 'Torea Moripi', role: 'Receptionist' },
  { name: 'Josie Utame', role: 'Hair Dresser' },
  { name: 'Joe Velena', role: 'Barber' },
  { name: 'Serah Heau', role: 'Hair Dresser' },
  { name: 'Bobby Haoda', role: 'Barber' },
  { name: 'Alice Titus', role: 'Hair Braider' },
  { name: 'Jazmine Kosi', role: 'Nail Tech & Makeup Artist' },
]

export default function BilasStudioPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Logo Section */}
      <section className="pt-24 pb-8 px-4 bg-secondary/20 border-b border-border">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Image
            src="/logos/bilas-studio.jpg"
            alt="Bilas Studio Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      </section>

      <HeroBusinessPage
        title="Bilas Studio"
        subtitle="Confidence Begins Here — Reveal Your True Beauty"
        description="An exclusive sanctuary for beauty, wellness, and self-discovery. Personalized treatments crafted by expert consultants in a refined setting designed for transformation."
      />
      <BusinessAbout
        title="The Bilas Studio Experience"
        content="At Bilas Studio, we believe beauty is a personal journey. Every service is tailored to you—from comprehensive skin analysis to bespoke treatment plans. Our expert consultants blend artistry, science, and intuition to create transformative experiences that go beyond traditional beauty services."
        highlights={[
          'Expert Consultants',
          'Premium Treatments',
          'Personalized Care',
          'Luxury Setting',
          'Holistic Wellness',
          'Premium Products',
        ]}
      />
      <Services
        services={[
          {
            title: 'Hair Styling & Precision Cuts',
            description: 'Expert styling and cutting services tailored to your unique look and lifestyle.',
            icon: 'scissors',
          },
          {
            title: 'Vibrant Hair Coloring',
            description: 'Professional coloring and treatments using premium products for long-lasting results.',
            icon: 'palette',
          },
          {
            title: 'Skin Treatments',
            description: 'Comprehensive skincare and facial treatments for rejuvenation and renewal.',
            icon: 'sparkles',
          },
          {
            title: 'Makeup & Nails',
            description: 'Professional makeup application and nail extensions for every occasion.',
            icon: 'brush',
          },
          {
            title: 'Spa & Relaxation',
            description: 'Therapeutic spa services designed to restore balance and wellness.',
            icon: 'leaf',
          },
          {
            title: 'Barbing Services',
            description: "Precision men's grooming and barbering by expert technicians.",
            icon: 'gem',
          },
        ]}
      />
      <Testimonials
        title="What Our Clients Say"
        testimonials={[
          {
            text: 'I absolutely love what the ladies did on my hair. They did an amazing job! Too good!',
            author: 'Dream Cube',
            role: 'Customer',
          },
          {
            text: 'Taking beauty to another level. I love that your beauty styles are international standard and professional. Keep changing the looks of these women out there, great job.',
            author: 'Oimops W.',
            role: 'Customer',
          },
          {
            text: 'Bilas Studio always comes through, highly recommend for your next cut and fade.',
            author: 'Mai Aka',
            role: 'Customer',
          },
          {
            text: 'Got my hair done today. Thank you for the relaxing and customer service was excellent. Will be coming back for sure. Keep up the good work, God bless always.',
            author: 'Bilas Customer',
            role: 'Loyal Client',
          },
        ]}
      />
      
      <TeamMembers members={teamMembers} title="Meet Our Talented Team" />
      
      {/* Gallery Link Section */}
      <section className="py-16 px-4 bg-secondary/20 border-y border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-serif font-bold mb-4">View More Content</h3>
          <p className="text-muted-foreground mb-8">Follow our social media channels to see the latest transformations and behind-the-scenes moments from our studios.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/businesses/bilas-studio/gallery"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              View Gallery
            </a>
            <a
              href="https://www.tiktok.com/@bilastudios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors"
            >
              Follow on TikTok
            </a>
          </div>
        </div>
      </section>

      <VentureJournal ventureSlug="bilas-studio" />

      <CTASection />
      <Footer />
    </main>
  )
}
