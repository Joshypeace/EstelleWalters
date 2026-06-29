'use client'

import { ResourceManager, StatusBadge, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { trpc } from '@/trpc/react'

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
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.travel.list.useQuery()
  const invalidate = () => utils.travel.list.invalidate()
  const create = trpc.travel.create.useMutation({ onSuccess: invalidate })
  const update = trpc.travel.update.useMutation({ onSuccess: invalidate })
  const remove = trpc.travel.delete.useMutation({ onSuccess: invalidate })

  return (
    <ResourceManager<TravelRow>
      title="Travel Stories"
      description="Manage individual travel blog posts and their galleries."
      singular="Story"
      columns={columns}
      fields={fields}
      data={(data ?? []) as TravelRow[]}
      loading={isLoading}
      searchKeys={['title', 'country', 'category']}
      makeEmpty={() => ({ status: 'Draft' })}
      onCreate={async (v) => {
        await create.mutateAsync(v as Parameters<typeof create.mutateAsync>[0])
      }}
      onUpdate={async (id, v) => {
        await update.mutateAsync({ id, ...v } as Parameters<typeof update.mutateAsync>[0])
      }}
      onDelete={async (id) => {
        await remove.mutateAsync({ id })
      }}
    />
  )
}
