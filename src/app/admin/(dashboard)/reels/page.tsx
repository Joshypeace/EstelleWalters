'use client'

import { ResourceManager, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'

interface ReelRow extends ResourceItem {
  title: string
  src: string
  description: string
}

// Seeded from the Travel page "Travel Reels" section.
const initialData: ReelRow[] = [
  { id: 'r1', title: 'Exploring New Horizons', src: '/content/videos/travel-1.mp4', description: 'Highlights from recent travels across continents' },
  { id: 'r2', title: 'Business Meets Adventure', src: '/content/videos/travel-2.mp4', description: 'Where entrepreneurship and exploration intersect' },
  { id: 'r3', title: 'Behind the Scenes', src: '/content/videos/travel-3.mp4', description: 'The real moments between the destinations' },
]

const columns: ColumnDef<ReelRow>[] = [
  { key: 'title', label: 'Title', className: 'font-medium' },
  { key: 'src', label: 'Video file', render: (r) => <span className="text-muted-foreground font-mono text-xs">{r.src}</span> },
  { key: 'description', label: 'Description', render: (r) => <span className="text-muted-foreground">{r.description}</span> },
]

const fields: FieldDef[] = [
  { key: 'title', label: 'Title', full: true },
  { key: 'src', label: 'Video file path', full: true, placeholder: '/content/videos/travel-1.mp4' },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
]

export default function AdminReelsPage() {
  return (
    <ResourceManager<ReelRow>
      title="Travel Reels"
      description="Manage the short-form video reels shown on the Travel page."
      singular="Reel"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={['title', 'description']}
    />
  )
}
