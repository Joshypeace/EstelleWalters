'use client'

import { ResourceManager, type ColumnDef, type FieldDef, type ResourceItem } from '@/components/admin/ui'
import { ventures } from '@/lib/ventures'

interface TeamRow extends ResourceItem {
  name: string
  role: string
  venture: string
}

// Seeded from the Bilas Studio team section.
const initialData: TeamRow[] = [
  { name: 'Estelle Walters', role: 'Founder' },
  { name: 'Sarah Hemine', role: 'Waigani Studio Manager' },
  { name: 'Theresa Manu', role: 'Ela Beach Studio Manager' },
  { name: 'Jessica Tokima', role: 'Senior Hair Dresser' },
  { name: 'Imelda Kovio', role: 'Spa Therapist' },
  { name: 'Marie Wailou', role: 'Hair Dresser' },
  { name: 'Torea Moripi', role: 'Receptionist' },
  { name: 'Josie Utame', role: 'Hair Dresser' },
  { name: 'Joe Velena', role: 'Barber' },
  { name: 'Serah Heau', role: 'Hair Dresser' },
  { name: 'Bobby Haoda', role: 'Barber' },
  { name: 'Alice Titus', role: 'Hair Braider' },
  { name: 'Jazmine Kosi', role: 'Nail Tech & Makeup Artist' },
].map((m, i) => ({ id: `t${i + 1}`, venture: 'bilas-studio', ...m }))

const ventureOptions = ventures.map((v) => ({ label: v.name, value: v.slug }))

const columns: ColumnDef<TeamRow>[] = [
  { key: 'name', label: 'Name', className: 'font-medium' },
  { key: 'role', label: 'Role', render: (r) => <span className="text-muted-foreground">{r.role}</span> },
  {
    key: 'venture',
    label: 'Venture',
    render: (r) => (
      <span className="text-muted-foreground">{ventures.find((v) => v.slug === r.venture)?.name ?? '—'}</span>
    ),
  },
]

const fields: FieldDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'venture', label: 'Venture', type: 'select', options: ventureOptions, full: true },
]

export default function AdminTeamPage() {
  return (
    <ResourceManager<TeamRow>
      title="Team"
      description="Manage team members shown on venture pages."
      singular="Member"
      columns={columns}
      fields={fields}
      initialData={initialData}
      searchKeys={['name', 'role']}
      makeEmpty={() => ({ venture: 'bilas-studio' })}
    />
  )
}
