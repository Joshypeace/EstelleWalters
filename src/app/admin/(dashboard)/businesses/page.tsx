'use client'

import { ResourceManager, StatusBadge, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { ventures } from '@/lib/ventures'

interface VentureRow extends ResourceItem {
  name: string
  slug: string
  tagline: string
  description: string
  highlights: string[]
  url: string
  site: string
  logo: string
  status: string
}

const initialData: VentureRow[] = ventures.map((v) => ({
  id: v.slug,
  name: v.name,
  slug: v.slug,
  tagline: v.tagline,
  description: v.description,
  highlights: v.highlights,
  url: v.url,
  site: v.site,
  logo: v.logo,
  status: 'Active',
}))

const columns: ColumnDef<VentureRow>[] = [
  { key: 'name', label: 'Venture', className: 'font-medium' },
  { key: 'tagline', label: 'Tagline', render: (r) => <span className="text-muted-foreground">{r.tagline}</span> },
  {
    key: 'site',
    label: 'Website',
    render: (r) => (
      <span className="text-accent font-mono text-xs">{r.site.replace(/^https?:\/\//, '')}</span>
    ),
  },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const fields: FieldDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'slug', label: 'Slug', placeholder: 'bilas-studio' },
  { key: 'tagline', label: 'Tagline', full: true },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'highlights', label: 'Highlights', type: 'tags', full: true, placeholder: 'Premium Treatments, Expert Consultants' },
  { key: 'url', label: 'Internal page', placeholder: '/businesses/bilas-studio' },
  { key: 'site', label: 'External website', placeholder: 'https://bilasstudio.com' },
  { key: 'logo', label: 'Logo', type: 'image', full: true },
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Hidden'].map((s) => ({ label: s, value: s })) },
]

export default function AdminVenturesPage() {
  return (
    <ResourceManager<VentureRow>
      title="Ventures"
      description="Manage the venture cards and the content of each venture detail page."
      singular="Venture"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={['name', 'tagline']}
      makeEmpty={() => ({ status: 'Active' })}
    />
  )
}
