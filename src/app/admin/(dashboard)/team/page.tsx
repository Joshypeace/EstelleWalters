'use client'

import { useMemo } from 'react'
import { ResourceManager, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { trpc } from '@/trpc/react'

interface TeamRow extends ResourceItem {
  name: string
  role: string
  venture: string
}

export default function AdminTeamPage() {
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.team.list.useQuery()
  const { data: ventures } = trpc.venture.list.useQuery()
  const invalidate = () => utils.team.list.invalidate()
  const create = trpc.team.create.useMutation({ onSuccess: invalidate })
  const update = trpc.team.update.useMutation({ onSuccess: invalidate })
  const remove = trpc.team.delete.useMutation({ onSuccess: invalidate })

  const ventureName = useMemo(
    () => new Map((ventures ?? []).map((v) => [v.slug, v.name])),
    [ventures]
  )
  const ventureOptions = (ventures ?? []).map((v) => ({ label: v.name, value: v.slug }))
  const firstVenture = ventures?.[0]?.slug ?? ''

  const columns: ColumnDef<TeamRow>[] = [
    { key: 'name', label: 'Name', className: 'font-medium' },
    { key: 'role', label: 'Role', render: (r) => <span className="text-muted-foreground">{r.role}</span> },
    {
      key: 'venture',
      label: 'Venture',
      render: (r) => <span className="text-muted-foreground">{ventureName.get(r.venture) ?? '—'}</span>,
    },
  ]

  const fields: FieldDef[] = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'venture', label: 'Venture', type: 'select', options: ventureOptions, full: true },
  ]

  return (
    <ResourceManager<TeamRow>
      title="Team"
      description="Manage team members shown on venture pages."
      singular="Member"
      columns={columns}
      fields={fields}
      data={(data ?? []) as TeamRow[]}
      loading={isLoading}
      searchKeys={['name', 'role']}
      makeEmpty={() => ({ venture: firstVenture })}
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
