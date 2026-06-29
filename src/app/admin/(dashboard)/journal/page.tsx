'use client'

import { useMemo } from 'react'
import { ResourceManager, StatusBadge, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { trpc } from '@/trpc/react'

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

export default function AdminJournalPage() {
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.journal.list.useQuery()
  const { data: ventures } = trpc.venture.list.useQuery()
  const invalidate = () => utils.journal.list.invalidate()
  const create = trpc.journal.create.useMutation({ onSuccess: invalidate })
  const update = trpc.journal.update.useMutation({ onSuccess: invalidate })
  const remove = trpc.journal.delete.useMutation({ onSuccess: invalidate })

  const ventureName = useMemo(
    () => new Map((ventures ?? []).map((v) => [v.slug, v.name])),
    [ventures]
  )
  const ventureOptions = (ventures ?? []).map((v) => ({ label: v.name, value: v.slug }))

  const columns: ColumnDef<JournalRow>[] = [
    { key: 'title', label: 'Title', className: 'font-medium' },
    { key: 'category', label: 'Category', render: (r) => <span className="text-muted-foreground">{r.category}</span> },
    {
      key: 'venture',
      label: 'Venture',
      render: (r) => <span className="text-muted-foreground">{ventureName.get(r.venture) ?? '—'}</span>,
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

  return (
    <ResourceManager<JournalRow>
      title="Journal"
      description="Create and manage journal posts shown across the site."
      singular="Post"
      columns={columns}
      fields={fields}
      data={(data ?? []) as JournalRow[]}
      loading={isLoading}
      searchKeys={['title', 'category', 'author']}
      makeEmpty={() => ({ status: 'Draft', author: 'Estelle Walters' })}
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
