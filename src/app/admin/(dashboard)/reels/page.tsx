'use client'

import { ResourceManager, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { trpc } from '@/trpc/react'

interface ReelRow extends ResourceItem {
  title: string
  src: string
  description: string
}

const columns: ColumnDef<ReelRow>[] = [
  { key: 'title', label: 'Title', className: 'font-medium' },
  { key: 'src', label: 'Video file', render: (r) => <span className="text-muted-foreground font-mono text-xs">{r.src}</span> },
  { key: 'description', label: 'Description', render: (r) => <span className="text-muted-foreground">{r.description}</span> },
]

const fields: FieldDef[] = [
  { key: 'title', label: 'Title', full: true },
  { key: 'src', label: 'Video', type: 'video', full: true, placeholder: 'https://…/travel-1.mp4 or upload' },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
]

export default function AdminReelsPage() {
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.reel.list.useQuery()
  const invalidate = () => utils.reel.list.invalidate()
  const create = trpc.reel.create.useMutation({ onSuccess: invalidate })
  const update = trpc.reel.update.useMutation({ onSuccess: invalidate })
  const remove = trpc.reel.delete.useMutation({ onSuccess: invalidate })

  return (
    <ResourceManager<ReelRow>
      title="Travel Reels"
      description="Manage the short-form video reels shown on the Travel page."
      singular="Reel"
      columns={columns}
      fields={fields}
      data={(data ?? []) as ReelRow[]}
      loading={isLoading}
      searchKeys={['title', 'description']}
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
