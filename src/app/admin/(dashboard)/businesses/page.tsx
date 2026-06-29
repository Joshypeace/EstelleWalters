'use client'

import { ResourceManager, StatusBadge, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { trpc } from '@/trpc/react'

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
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.venture.list.useQuery()
  const invalidate = () => utils.venture.list.invalidate()
  const create = trpc.venture.create.useMutation({ onSuccess: invalidate })
  const update = trpc.venture.update.useMutation({ onSuccess: invalidate })
  const remove = trpc.venture.delete.useMutation({ onSuccess: invalidate })

  return (
    <ResourceManager<VentureRow>
      title="Ventures"
      description="Manage the venture cards and the content of each venture detail page."
      singular="Venture"
      columns={columns}
      fields={fields}
      data={(data ?? []) as VentureRow[]}
      loading={isLoading}
      searchKeys={['name', 'tagline']}
      makeEmpty={() => ({ status: 'Active' })}
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
