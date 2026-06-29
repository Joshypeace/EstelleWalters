'use client'

import { ResourceManager, StatusBadge, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'

interface ProjectRow extends ResourceItem {
  name: string
  description: string
  url: string
  status: string
}

// Seeded from the home "Connected Ventures" section (related-projects).
const initialData: ProjectRow[] = [
  { id: 'p1', name: 'Bilas Foundation', description: 'Community impact arm empowering individuals through beauty, education, sports, and youth training.', url: 'https://www.facebook.com/share/1Goe3wntvk/?mibextid=wwXIfr', status: 'Live' },
  { id: 'p2', name: 'Melagirl', description: 'Premium hair extensions brand with tools and accessories for professional and everyday use.', url: 'https://www.facebook.com/share/18Q8cwC7Zg/?mibextid=wwXIfr', status: 'Live' },
  { id: 'p3', name: 'MelaSkn', description: 'Results-driven skincare brand by Estelle Walters featuring turmeric face and body scrub.', url: 'https://www.facebook.com/share/18HJnzTzwD/?mibextid=wwXIfr', status: 'Live' },
  { id: 'p4', name: 'Starla Accessories', description: 'Statement gold and vintage-inspired jewelry brand by Estelle Walters.', url: '#', status: 'Coming Soon' },
]

const columns: ColumnDef<ProjectRow>[] = [
  { key: 'name', label: 'Name', className: 'font-medium' },
  { key: 'description', label: 'Description', render: (r) => <span className="text-muted-foreground line-clamp-1">{r.description}</span> },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', full: true },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'url', label: 'Link URL', full: true, placeholder: 'https://...' },
  { key: 'status', label: 'Status', type: 'select', options: ['Live', 'Coming Soon'].map((s) => ({ label: s, value: s })) },
]

export default function AdminConnectedVenturesPage() {
  return (
    <ResourceManager<ProjectRow>
      title="Connected Ventures"
      description="Manage the complementary brands shown in the Connected Ventures section."
      singular="Venture"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={['name', 'description']}
      makeEmpty={() => ({ status: 'Live' })}
    />
  )
}
