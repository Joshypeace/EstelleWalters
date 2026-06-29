'use client'

import { ResourceManager, StatusBadge, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { travelPosts } from '@/lib/travel'

interface TravelRow extends ResourceItem {
  title: string
  slug: string
  country: string
  category: string
  date: string
  readTime: string
  status: string
  featuredImage: string
  excerpt: string
  gallery: string[]
  social: string[]
  content: string
}

const initialData: TravelRow[] = travelPosts.map((p) => ({
  id: p.slug,
  title: p.title,
  slug: p.slug,
  country: p.country,
  category: p.category,
  date: p.date,
  readTime: p.readTime,
  status: 'Published',
  featuredImage: p.featuredImage,
  excerpt: p.excerpt,
  gallery: (p.gallery ?? []).map((g) => g.src),
  social: (p.social ?? []).map((s) => s.url),
  content: p.content.trim(),
}))

const columns: ColumnDef<TravelRow>[] = [
  { key: 'title', label: 'Title', className: 'font-medium' },
  { key: 'country', label: 'Country', render: (r) => <span className="text-muted-foreground">{r.country}</span> },
  { key: 'category', label: 'Category', render: (r) => <span className="text-muted-foreground">{r.category}</span> },
  { key: 'date', label: 'Date', render: (r) => <span className="text-muted-foreground">{r.date}</span> },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const fields: FieldDef[] = [
  { key: 'title', label: 'Title', full: true },
  { key: 'slug', label: 'Slug', placeholder: 'url-slug' },
  { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'].map((s) => ({ label: s, value: s })) },
  { key: 'country', label: 'Destination country' },
  { key: 'category', label: 'Category', placeholder: 'Culture & Wildlife' },
  { key: 'date', label: 'Date', placeholder: 'April 12, 2024' },
  { key: 'readTime', label: 'Read time', placeholder: '6 min read' },
  { key: 'featuredImage', label: 'Featured image', type: 'image', full: true },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea', full: true },
  { key: 'gallery', label: 'Gallery images', type: 'imagelist', full: true },
  {
    key: 'social',
    label: 'Linked social posts',
    type: 'imagelist',
    full: true,
    placeholder: 'One Instagram / TikTok URL per line',
    help: 'Paste Instagram or TikTok post URLs, one per line.',
  },
  { key: 'content', label: 'Content', type: 'richtext', full: true },
]

export default function AdminTravelPage() {
  return (
    <ResourceManager<TravelRow>
      title="Travel Stories"
      description="Manage individual travel blog posts and their galleries."
      singular="Story"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={['title', 'country', 'category']}
      makeEmpty={() => ({ status: 'Draft' })}
    />
  )
}
