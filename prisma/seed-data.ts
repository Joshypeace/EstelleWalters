// Canonical seed data for content that currently lives inline in admin/public
// components (team, testimonials, reels, connected ventures, page copy,
// settings). Ventures/journal/travel are imported from src/lib in seed.ts.

export const teamMembers: { name: string; role: string; ventureSlug: string }[] = [
  { name: 'Estelle Walters', role: 'Founder', ventureSlug: 'bilas-studio' },
  { name: 'Sarah Hemine', role: 'Waigani Studio Manager', ventureSlug: 'bilas-studio' },
  { name: 'Theresa Manu', role: 'Ela Beach Studio Manager', ventureSlug: 'bilas-studio' },
  { name: 'Jessica Tokima', role: 'Senior Hair Dresser', ventureSlug: 'bilas-studio' },
  { name: 'Imelda Kovio', role: 'Spa Therapist', ventureSlug: 'bilas-studio' },
  { name: 'Marie Wailou', role: 'Hair Dresser', ventureSlug: 'bilas-studio' },
  { name: 'Torea Moripi', role: 'Receptionist', ventureSlug: 'bilas-studio' },
  { name: 'Josie Utame', role: 'Hair Dresser', ventureSlug: 'bilas-studio' },
  { name: 'Joe Velena', role: 'Barber', ventureSlug: 'bilas-studio' },
  { name: 'Serah Heau', role: 'Hair Dresser', ventureSlug: 'bilas-studio' },
  { name: 'Bobby Haoda', role: 'Barber', ventureSlug: 'bilas-studio' },
  { name: 'Alice Titus', role: 'Hair Braider', ventureSlug: 'bilas-studio' },
  { name: 'Jazmine Kosi', role: 'Nail Tech & Makeup Artist', ventureSlug: 'bilas-studio' },
]

export const testimonials: {
  author: string
  role: string
  ventureSlug: string
  text: string
}[] = [
  { author: 'Victoria T.', role: 'Beauty Enthusiast', ventureSlug: 'bilas-beauty', text: 'The quality and selection are unmatched. Every product feels luxurious and truly works.' },
  { author: 'Amanda K.', role: 'Conscious Consumer', ventureSlug: 'bilas-beauty', text: 'Finally a place where beauty products are both effective AND ethically sourced.' },
  { author: 'Dream Cube', role: 'Customer', ventureSlug: 'bilas-studio', text: 'I absolutely love what the ladies did on my hair. They did an amazing job! Too good!' },
  { author: 'Mai Aka', role: 'Customer', ventureSlug: 'bilas-studio', text: 'Bilas Studio always comes through, highly recommend for your next cut and fade.' },
  { author: 'Marco V.', role: 'Import/Export Manager', ventureSlug: 'connet-suppliers', text: 'ConnetSuppliers transformed how we source internationally. The connections are genuine and the process is seamless.' },
  { author: 'Chen L.', role: 'Distributor', ventureSlug: 'connet-suppliers', text: 'Finally found reliable suppliers through their vetted network. Business growth accelerated significantly.' },
]

export const reels: { title: string; src: string; description: string }[] = [
  { title: 'Exploring New Horizons', src: '/content/videos/travel-1.mp4', description: 'Highlights from recent travels across continents' },
  { title: 'Business Meets Adventure', src: '/content/videos/travel-2.mp4', description: 'Where entrepreneurship and exploration intersect' },
  { title: 'Behind the Scenes', src: '/content/videos/travel-3.mp4', description: 'The real moments between the destinations' },
]

export const connectedVentures: {
  name: string
  description: string
  url: string
  status: 'LIVE' | 'COMING_SOON'
}[] = [
  { name: 'Bilas Foundation', description: 'Community impact arm empowering individuals through beauty, education, sports, and youth training.', url: 'https://www.facebook.com/share/1Goe3wntvk/?mibextid=wwXIfr', status: 'LIVE' },
  { name: 'Melagirl', description: 'Premium hair extensions brand with tools and accessories for professional and everyday use.', url: 'https://www.facebook.com/share/18Q8cwC7Zg/?mibextid=wwXIfr', status: 'LIVE' },
  { name: 'MelaSkn', description: 'Results-driven skincare brand by Estelle Walters featuring turmeric face and body scrub.', url: 'https://www.facebook.com/share/18HJnzTzwD/?mibextid=wwXIfr', status: 'LIVE' },
  { name: 'Starla Accessories', description: 'Statement gold and vintage-inspired jewelry brand by Estelle Walters.', url: '#', status: 'COMING_SOON' },
]

// Mirrors the admin Pages editor's nested sections/fields structure.
export const pageContents: {
  key: string
  label: string
  data: { sections: { title: string; fields: { key: string; label: string; kind: 'text' | 'textarea'; value: string }[] }[] }
}[] = [
  {
    key: 'home',
    label: 'Home',
    data: {
      sections: [
        {
          title: 'Hero',
          fields: [
            { key: 'eyebrow', label: 'Eyebrow', kind: 'text', value: 'Entrepreneur · Beauty Expert · Global Trader' },
            { key: 'title', label: 'Headline', kind: 'text', value: 'Estelle Walters' },
            { key: 'subtitle', label: 'Subtitle', kind: 'textarea', value: 'Building beauty brands and global trade networks with purpose and elegance.' },
          ],
        },
        {
          title: 'About',
          fields: [
            { key: 'heading', label: 'Heading', kind: 'text', value: 'About Estelle' },
            { key: 'body', label: 'Body', kind: 'textarea', value: 'A multi-passionate entrepreneur bridging beauty, business, and culture across continents.' },
          ],
        },
        {
          title: 'Sections heading',
          fields: [
            { key: 'venturesTitle', label: 'Ventures title', kind: 'text', value: 'My Ventures' },
            { key: 'venturesSubtitle', label: 'Ventures subtitle', kind: 'text', value: 'Three distinct brands, unified by a commitment to excellence and luxury' },
          ],
        },
        {
          title: 'Call to action',
          fields: [
            { key: 'ctaHeading', label: 'CTA heading', kind: 'text', value: "Let's Create Something Beautiful" },
            { key: 'ctaBody', label: 'CTA body', kind: 'textarea', value: 'Reach out for collaborations, partnerships, or to learn more about the Bilas ecosystem.' },
            { key: 'ctaButton', label: 'Button label', kind: 'text', value: 'Get in Touch' },
          ],
        },
      ],
    },
  },
  {
    key: 'about',
    label: 'About',
    data: {
      sections: [
        {
          title: 'Header',
          fields: [
            { key: 'title', label: 'Title', kind: 'text', value: 'About Estelle Walters' },
            { key: 'intro', label: 'Intro', kind: 'textarea', value: 'The story behind the brands, the travels, and the vision.' },
          ],
        },
        {
          title: 'Biography',
          fields: [
            { key: 'body', label: 'Body', kind: 'textarea', value: 'Estelle Walters is an entrepreneur, beauty expert, and global trader building purposeful brands across the Pacific and beyond.' },
          ],
        },
      ],
    },
  },
  {
    key: 'contact',
    label: 'Contact',
    data: {
      sections: [
        {
          title: 'Header',
          fields: [
            { key: 'title', label: 'Title', kind: 'text', value: 'Get in Touch' },
            { key: 'subtitle', label: 'Subtitle', kind: 'textarea', value: 'For collaborations, partnerships, and inquiries.' },
          ],
        },
        {
          title: 'Details',
          fields: [
            { key: 'email', label: 'Email', kind: 'text', value: 'hello@estellewalters.com' },
            { key: 'phone', label: 'Phone', kind: 'text', value: '+675 7831 4360' },
            { key: 'location', label: 'Location', kind: 'text', value: 'Port Moresby, Papua New Guinea' },
          ],
        },
      ],
    },
  },
]

export const settings: { key: string; value: string }[] = [
  { key: 'siteName', value: 'Estelle Walters' },
  { key: 'siteUrl', value: 'https://estellewalters.com' },
  { key: 'email', value: 'hello@estellewalters.com' },
  { key: 'phone', value: '+675 7831 4360' },
  { key: 'description', value: 'Personal brand of Estelle Walters — luxury beauty, wellness, and international trade.' },
]
