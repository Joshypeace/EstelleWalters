'use client'

import { ResourceManager, StatusBadge, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { journalPosts } from '@/lib/journal'
import { ventures } from '@/lib/ventures'

interface JournalRow extends ResourceItem {
  title: string
  slug: string
  category: string
  venture: string
  author: string
  date: string
  readTime: string
  status: string
  excerpt: string
  featuredImage: string
  gallery: string[]
  content: string
}

const initialData: JournalRow[] = journalPosts.map((p) => ({
  id: p.slug,
  title: p.title,
  slug: p.slug,
  category: p.category,
  venture: p.venture ?? '',
  author: p.author,
  date: p.date,
  readTime: p.readTime,
  status: 'Published',
  excerpt: p.excerpt,
  featuredImage: p.featuredImage,
  gallery: (p.gallery ?? []).map((g) => g.src),
  content: p.content.trim(),
}))

const ventureOptions = ventures.map((v) => ({ label: v.name, value: v.slug }))

const columns: ColumnDef<JournalRow>[] = [
  { key: 'title', label: 'Title', className: 'font-medium' },
  { key: 'category', label: 'Category', render: (r) => <span className="text-muted-foreground">{r.category}</span> },
  {
    key: 'venture',
    label: 'Venture',
    render: (r) => (
      <span className="text-muted-foreground">
        {ventures.find((v) => v.slug === r.venture)?.name ?? '—'}
      </span>
    ),
  },
  { key: 'date', label: 'Date', render: (r) => <span className="text-muted-foreground">{r.date}</span> },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const fields: FieldDef[] = [
  { key: 'title', label: 'Title', full: true, placeholder: 'Post title' },
  { key: 'slug', label: 'Slug', placeholder: 'url-slug' },
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    options: ['Beauty', 'Business', 'Wellness', 'Travel'].map((c) => ({ label: c, value: c })),
  },
  { key: 'venture', label: 'Linked Venture', type: 'select', options: ventureOptions },
  { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'].map((s) => ({ label: s, value: s })) },
  { key: 'author', label: 'Author', placeholder: 'Estelle Walters' },
  { key: 'date', label: 'Date', placeholder: 'March 15, 2024' },
  { key: 'readTime', label: 'Read time', placeholder: '8 min read' },
  { key: 'featuredImage', label: 'Featured image', type: 'image', full: true },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea', full: true },
  { key: 'gallery', label: 'Gallery images', type: 'imagelist', full: true },
  { key: 'content', label: 'Content', type: 'richtext', full: true },
]

export default function AdminJournalPage() {
  return (
    <ResourceManager<JournalRow>
      title="Journal"
      description="Create and manage journal posts shown across the site."
      singular="Post"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={['title', 'category', 'author']}
      makeEmpty={() => ({ status: 'Draft', author: 'Estelle Walters' })}
    />
  )
}
