'use client'

import { ResourceManager, StatusBadge, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { trpc } from '@/trpc/react'

interface ProjectRow extends ResourceItem {
  name: string
  description: string
  url: string
  status: string
}

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
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.connectedVenture.list.useQuery()
  const invalidate = () => utils.connectedVenture.list.invalidate()
  const create = trpc.connectedVenture.create.useMutation({ onSuccess: invalidate })
  const update = trpc.connectedVenture.update.useMutation({ onSuccess: invalidate })
  const remove = trpc.connectedVenture.delete.useMutation({ onSuccess: invalidate })

  return (
    <ResourceManager<ProjectRow>
      title="Connected Ventures"
      description="Manage the complementary brands shown in the Connected Ventures section."
      singular="Venture"
      columns={columns}
      fields={fields}
      data={(data ?? []) as ProjectRow[]}
      loading={isLoading}
      searchKeys={['name', 'description']}
      makeEmpty={() => ({ status: 'Live' })}
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
