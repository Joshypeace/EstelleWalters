'use client'

import { ResourceManager, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { ventures } from '@/lib/ventures'

interface TestimonialRow extends ResourceItem {
  author: string
  role: string
  venture: string
  text: string
}

// Seeded from testimonials across the venture pages.
const initialData: TestimonialRow[] = [
  { author: 'Victoria T.', role: 'Beauty Enthusiast', venture: 'bilas-beauty', text: 'The quality and selection are unmatched. Every product feels luxurious and truly works.' },
  { author: 'Amanda K.', role: 'Conscious Consumer', venture: 'bilas-beauty', text: 'Finally a place where beauty products are both effective AND ethically sourced.' },
  { author: 'Dream Cube', role: 'Customer', venture: 'bilas-studio', text: 'I absolutely love what the ladies did on my hair. They did an amazing job! Too good!' },
  { author: 'Mai Aka', role: 'Customer', venture: 'bilas-studio', text: 'Bilas Studio always comes through, highly recommend for your next cut and fade.' },
  { author: 'Marco V.', role: 'Import/Export Manager', venture: 'connet-suppliers', text: 'ConnetSuppliers transformed how we source internationally. The connections are genuine and the process is seamless.' },
  { author: 'Chen L.', role: 'Distributor', venture: 'connet-suppliers', text: 'Finally found reliable suppliers through their vetted network. Business growth accelerated significantly.' },
].map((t, i) => ({ id: `q${i + 1}`, ...t }))

const ventureOptions = ventures.map((v) => ({ label: v.name, value: v.slug }))

const columns: ColumnDef<TestimonialRow>[] = [
  { key: 'author', label: 'Author', className: 'font-medium' },
  { key: 'role', label: 'Role', render: (r) => <span className="text-muted-foreground">{r.role}</span> },
  {
    key: 'venture',
    label: 'Venture',
    render: (r) => (
      <span className="text-muted-foreground">{ventures.find((v) => v.slug === r.venture)?.name ?? '—'}</span>
    ),
  },
  { key: 'text', label: 'Quote', render: (r) => <span className="text-muted-foreground line-clamp-1">{r.text}</span> },
]

const fields: FieldDef[] = [
  { key: 'author', label: 'Author' },
  { key: 'role', label: 'Role' },
  { key: 'venture', label: 'Venture', type: 'select', options: ventureOptions, full: true },
  { key: 'text', label: 'Quote', type: 'textarea', full: true },
]

export default function AdminTestimonialsPage() {
  return (
    <ResourceManager<TestimonialRow>
      title="Testimonials"
      description="Manage customer testimonials shown on venture pages."
      singular="Testimonial"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={['author', 'text', 'role']}
      makeEmpty={() => ({ venture: 'bilas-beauty' })}
    />
  )
}
