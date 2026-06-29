'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import { PageHeader } from '@/components/admin/ui'
import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/react'

type FieldKind = 'text' | 'textarea'

interface Field {
  key: string
  label: string
  kind: FieldKind
  value: string
}

interface Section {
  title: string
  fields: Field[]
}

interface SitePage {
  key: string
  label: string
  sections: Section[]
}

const inputClass =
  'w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition'

export default function AdminPagesEditor() {
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.page.list.useQuery()
  const saveMutation = trpc.page.update.useMutation({
    onSuccess: () => utils.page.list.invalidate(),
  })

  const [pages, setPages] = useState<SitePage[]>([])
  const [activeKey, setActiveKey] = useState('')

  // Initialise local edit state once from the server.
  useEffect(() => {
    if (data && pages.length === 0) {
      setPages(data.map((p) => ({ key: p.key, label: p.label, sections: p.data.sections })))
      setActiveKey((prev) => prev || data[0]?.key || '')
    }
  }, [data, pages.length])

  const active = pages.find((p) => p.key === activeKey)

  const updateField = (sectionIdx: number, fieldIdx: number, value: string) => {
    setPages((prev) =>
      prev.map((p) =>
        p.key !== activeKey
          ? p
          : {
              ...p,
              sections: p.sections.map((s, si) =>
                si !== sectionIdx
                  ? s
                  : { ...s, fields: s.fields.map((f, fi) => (fi !== fieldIdx ? f : { ...f, value })) }
              ),
            }
      )
    )
  }

  const handleSave = async () => {
    if (!active) return
    try {
      await saveMutation.mutateAsync({ key: active.key, data: { sections: active.sections } })
    } catch (e) {
      alert((e as Error)?.message ?? 'Could not save page content.')
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader title="Pages" description="Edit the content of your static pages and home sections." />

      {isLoading || !active ? (
        <p className="text-muted-foreground py-16 text-center text-sm">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
          {/* Page list */}
          <div className="flex lg:flex-col gap-2">
            {pages.map((p) => (
              <button
                key={p.key}
                onClick={() => setActiveKey(p.key)}
                className={cn(
                  'text-left px-4 py-2.5 rounded-lg text-sm font-medium transition',
                  p.key === activeKey
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card border border-border text-foreground hover:border-accent/50'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Section editor */}
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {active.sections.map((section, si) => (
              <div key={section.title} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-5">{section.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {section.fields.map((field, fi) => (
                    <div key={field.key} className={field.kind === 'textarea' ? 'sm:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                      {field.kind === 'textarea' ? (
                        <textarea
                          rows={3}
                          value={field.value}
                          onChange={(e) => updateField(si, fi, e.target.value)}
                          className={cn(inputClass, 'resize-y')}
                        />
                      ) : (
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => updateField(si, fi, e.target.value)}
                          className={inputClass}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition disabled:opacity-60"
            >
              <Save size={18} />
              {saveMutation.isPending ? 'Saving…' : `Save ${active.label}`}
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
