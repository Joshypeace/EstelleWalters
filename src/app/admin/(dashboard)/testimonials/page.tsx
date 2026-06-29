'use client'

import { useMemo } from 'react'
import { ResourceManager, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { trpc } from '@/trpc/react'

interface TestimonialRow extends ResourceItem {
  author: string
  role: string
  venture: string
  text: string
}

export default function AdminTestimonialsPage() {
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.testimonial.list.useQuery()
  const { data: ventures } = trpc.venture.list.useQuery()
  const invalidate = () => utils.testimonial.list.invalidate()
  const create = trpc.testimonial.create.useMutation({ onSuccess: invalidate })
  const update = trpc.testimonial.update.useMutation({ onSuccess: invalidate })
  const remove = trpc.testimonial.delete.useMutation({ onSuccess: invalidate })

  const ventureName = useMemo(
    () => new Map((ventures ?? []).map((v) => [v.slug, v.name])),
    [ventures]
  )
  const ventureOptions = (ventures ?? []).map((v) => ({ label: v.name, value: v.slug }))
  const firstVenture = ventures?.[0]?.slug ?? ''

  const columns: ColumnDef<TestimonialRow>[] = [
    { key: 'author', label: 'Author', className: 'font-medium' },
    { key: 'role', label: 'Role', render: (r) => <span className="text-muted-foreground">{r.role}</span> },
    {
      key: 'venture',
      label: 'Venture',
      render: (r) => <span className="text-muted-foreground">{ventureName.get(r.venture) ?? '—'}</span>,
    },
    { key: 'text', label: 'Quote', render: (r) => <span className="text-muted-foreground line-clamp-1">{r.text}</span> },
  ]

  const fields: FieldDef[] = [
    { key: 'author', label: 'Author' },
    { key: 'role', label: 'Role' },
    { key: 'venture', label: 'Venture', type: 'select', options: ventureOptions, full: true },
    { key: 'text', label: 'Quote', type: 'textarea', full: true },
  ]

  return (
    <ResourceManager<TestimonialRow>
      title="Testimonials"
      description="Manage customer testimonials shown on venture pages."
      singular="Testimonial"
      columns={columns}
      fields={fields}
      data={(data ?? []) as TestimonialRow[]}
      loading={isLoading}
      searchKeys={['author', 'text', 'role']}
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
