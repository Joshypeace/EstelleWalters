export interface Venture {
  slug: string
  name: string
  tagline: string
  description: string
  highlights: string[]
  /** Internal detail page within this site */
  url: string
  /** External website to open in a new tab */
  site: string
  logo: string
}

export const ventures: Venture[] = [
  {
    slug: 'bilas-studio',
    name: 'Bilas Studio',
    tagline: 'Luxury Beauty Experiences',
    description:
      'An exclusive beauty studio offering personalized treatments, bespoke services, and immersive wellness experiences crafted for discerning clients.',
    highlights: ['Premium Treatments', 'Expert Consultants', 'Luxury Setting'],
    url: '/businesses/bilas-studio',
    site: 'https://bilasstudio.com',
    logo: '/logos/bilas-studio.jpg',
  },
  {
    slug: 'bilas-beauty',
    name: 'Bilas Beauty',
    tagline: 'Curated Beauty Products',
    description:
      'A carefully curated collection of premium beauty and skincare products sourced from the finest artisans and brands worldwide.',
    highlights: ['Premium Products', 'Global Sourcing', 'Expert Selection'],
    url: '/businesses/bilas-beauty',
    site: 'https://bilasbeauty.com',
    logo: '/logos/bilas-beauty.png',
  },
  {
    slug: 'connet-suppliers',
    name: 'ConnetSuppliers',
    tagline: 'Global Trade Network',
    description:
      'Connecting suppliers and distributors across continents, facilitating seamless international partnerships and transforming supply chains.',
    highlights: ['B2B Network', 'Strategic Partnerships', 'Global Reach'],
    url: '/businesses/connet-suppliers',
    site: 'https://connetsuppliers.com',
    logo: '/logos/connet-suppliers.png',
  },
]

export function getVenture(slug: string): Venture | undefined {
  return ventures.find((v) => v.slug === slug)
}
