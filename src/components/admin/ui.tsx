'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Search, X, Save } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ----------------------------------------------------------------------------
 * Primitives
 * ------------------------------------------------------------------------- */

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8"
    >
      <div>
        <h2 className="text-3xl font-serif font-bold text-foreground mb-2">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {action}
    </motion.div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase()
  const tone =
    s === 'published' || s === 'active' || s === 'live'
      ? 'bg-green-500/20 text-green-400'
      : s === 'draft' || s === 'coming soon' || s === 'hidden'
        ? 'bg-yellow-500/20 text-yellow-400'
        : 'bg-secondary text-muted-foreground'
  return (
    <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-semibold', tone)}>
      {status}
    </span>
  )
}

export function PrimaryButton({
  children,
  onClick,
  type = 'button',
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-2.5 rounded-lg font-medium transition',
        className
      )}
    >
      {children}
    </motion.button>
  )
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-16 text-center text-muted-foreground text-sm">{message}</div>
  )
}

/* ----------------------------------------------------------------------------
 * Field definitions & inputs
 * ------------------------------------------------------------------------- */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'number'
  | 'select'
  | 'tags'
  | 'image'
  | 'imagelist'

export interface FieldDef {
  key: string
  label: string
  type?: FieldType
  options?: { label: string; value: string }[]
  placeholder?: string
  help?: string
  full?: boolean
}

const inputClass =
  'w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition'

function FieldShell({ field, children }: { field: FieldDef; children: React.ReactNode }) {
  return (
    <div className={field.full ? 'sm:col-span-2' : ''}>
      <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
      {children}
      {field.help && <p className="text-xs text-muted-foreground mt-1.5">{field.help}</p>}
    </div>
  )
}

function Thumb({ src }: { src: string }) {
  if (!src) return null
  // Plain img on purpose — admin previews accept arbitrary local/remote paths.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className="w-12 h-12 rounded-md object-cover border border-border" />
}

export function FormField({
  field,
  value,
  onChange,
}: {
  field: FieldDef
  value: unknown
  onChange: (v: unknown) => void
}) {
  const type = field.type ?? 'text'

  switch (type) {
    case 'textarea':
    case 'richtext':
      return (
        <FieldShell field={field}>
          <textarea
            value={(value as string) ?? ''}
            placeholder={field.placeholder}
            rows={type === 'richtext' ? 10 : 4}
            onChange={(e) => onChange(e.target.value)}
            className={cn(inputClass, 'resize-y font-mono text-sm')}
          />
        </FieldShell>
      )
    case 'number':
      return (
        <FieldShell field={field}>
          <input
            type="number"
            value={(value as number | string) ?? ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
            className={inputClass}
          />
        </FieldShell>
      )
    case 'select':
      return (
        <FieldShell field={field}>
          <select
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          >
            <option value="">— Select —</option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </FieldShell>
      )
    case 'tags': {
      const arr = Array.isArray(value) ? (value as string[]) : []
      return (
        <FieldShell field={field}>
          <input
            type="text"
            value={arr.join(', ')}
            placeholder={field.placeholder ?? 'Comma separated'}
            onChange={(e) =>
              onChange(
                e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            className={inputClass}
          />
          {arr.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {arr.map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-accent/15 text-accent text-xs">
                  {t}
                </span>
              ))}
            </div>
          )}
        </FieldShell>
      )
    }
    case 'image':
      return (
        <FieldShell field={field}>
          <div className="flex items-center gap-3">
            <Thumb src={(value as string) ?? ''} />
            <input
              type="text"
              value={(value as string) ?? ''}
              placeholder={field.placeholder ?? '/content/...'}
              onChange={(e) => onChange(e.target.value)}
              className={inputClass}
            />
          </div>
        </FieldShell>
      )
    case 'imagelist': {
      const arr = Array.isArray(value) ? (value as string[]) : []
      return (
        <FieldShell field={field}>
          <textarea
            value={arr.join('\n')}
            placeholder={field.placeholder ?? 'One image path per line'}
            rows={4}
            onChange={(e) =>
              onChange(
                e.target.value
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            className={cn(inputClass, 'font-mono text-sm')}
          />
          {arr.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {arr.map((s, i) => (
                <Thumb key={i} src={s} />
              ))}
            </div>
          )}
        </FieldShell>
      )
    }
    default:
      return (
        <FieldShell field={field}>
          <input
            type="text"
            value={(value as string) ?? ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        </FieldShell>
      )
  }
}

/* ----------------------------------------------------------------------------
 * Slide-over drawer
 * ------------------------------------------------------------------------- */

export function Drawer({
  open,
  title,
  onClose,
  onSave,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  onSave: () => void
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="absolute right-0 top-0 h-full w-full max-w-xl bg-card border-l border-border flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg font-medium text-foreground bg-secondary hover:bg-secondary/80 transition"
              >
                Cancel
              </button>
              <PrimaryButton onClick={onSave}>
                <Save size={18} />
                Save
              </PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ----------------------------------------------------------------------------
 * Generic resource manager (table + search + create/edit/delete)
 * ------------------------------------------------------------------------- */

export interface ResourceItem {
  id: string
  [key: string]: unknown
}

export interface ColumnDef<T extends ResourceItem> {
  key: string
  label: string
  render?: (row: T) => React.ReactNode
  className?: string
}

export function ResourceManager<T extends ResourceItem>({
  title,
  description,
  singular,
  columns,
  fields,
  initialData,
  searchKeys,
  makeEmpty,
}: {
  title: string
  description?: string
  singular: string
  columns: ColumnDef<T>[]
  fields: FieldDef[]
  initialData: T[]
  searchKeys?: string[]
  makeEmpty?: () => Partial<T>
}) {
  const [items, setItems] = useState<T[]>(initialData)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Record<string, unknown>>({})

  const filtered = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    const keys = searchKeys ?? columns.map((c) => c.key)
    return items.filter((it) =>
      keys.some((k) => String(it[k] ?? '').toLowerCase().includes(q))
    )
  }, [items, query, searchKeys, columns])

  const blankForm = () => {
    const base: Record<string, unknown> = makeEmpty ? { ...makeEmpty() } : {}
    for (const f of fields) {
      if (f.key in base) continue
      base[f.key] = f.type === 'tags' || f.type === 'imagelist' ? [] : ''
    }
    return base
  }

  const openNew = () => {
    setEditingId(null)
    setForm(blankForm())
    setOpen(true)
  }

  const openEdit = (row: T) => {
    setEditingId(row.id)
    setForm({ ...row })
    setOpen(true)
  }

  const save = () => {
    if (editingId) {
      setItems((prev) => prev.map((it) => (it.id === editingId ? ({ ...it, ...form } as T) : it)))
    } else {
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : String(Date.now())
      setItems((prev) => [{ ...(form as T), id }, ...prev])
    }
    setOpen(false)
  }

  const remove = (row: T) => {
    if (window.confirm(`Delete this ${singular.toLowerCase()}? This cannot be undone.`)) {
      setItems((prev) => prev.filter((it) => it.id !== row.id))
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title={title}
        description={description}
        action={
          <PrimaryButton onClick={openNew}>
            <Plus size={18} />
            New {singular}
          </PrimaryButton>
        }
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
            className={cn(inputClass, 'pl-9 py-2.5')}
          />
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {filtered.length} {filtered.length === 1 ? singular.toLowerCase() : `${singular.toLowerCase()}s`}
        </span>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-card border border-border rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground"
                  >
                    {c.label}
                  </th>
                ))}
                <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-b-0 hover:bg-accent/5 transition"
                >
                  {columns.map((c) => (
                    <td key={c.key} className={cn('px-6 py-4 text-sm text-foreground', c.className)}>
                      {c.render ? c.render(row) : String(row[c.key] ?? '')}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEdit(row)}
                        className="text-accent hover:text-accent/80 transition"
                        aria-label="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => remove(row)}
                        className="text-muted-foreground hover:text-destructive transition"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <EmptyState message={query ? 'No matches for your search.' : `No ${singular.toLowerCase()}s yet.`} />
          )}
        </div>
      </motion.div>

      {/* Create / Edit drawer */}
      <Drawer
        open={open}
        title={editingId ? `Edit ${singular}` : `New ${singular}`}
        onClose={() => setOpen(false)}
        onSave={save}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map((f) => (
            <FormField
              key={f.key}
              field={f}
              value={form[f.key]}
              onChange={(v) => setForm((prev) => ({ ...prev, [f.key]: v }))}
            />
          ))}
        </div>
      </Drawer>
    </div>
  )
}
