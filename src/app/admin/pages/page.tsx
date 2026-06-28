'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import { PageHeader } from '@/components/admin/ui'
import { cn } from '@/lib/utils'

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

const initialPages: SitePage[] = [
  {
    key: 'home',
    label: 'Home',
    sections: [
      {
        title: 'Hero',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', kind: 'text', value: 'Entrepreneur · Beauty Expert · Global Trader' },
          { key: 'title', label: 'Headline', kind: 'text', value: 'Estelle Walters' },
          { key: 'subtitle', label: 'Subtitle', kind: 'textarea', value: 'Building beauty brands and global trade networks with purpose and elegance.' },
        ],
      },
      {
        title: 'About',
        fields: [
          { key: 'heading', label: 'Heading', kind: 'text', value: 'About Estelle' },
          { key: 'body', label: 'Body', kind: 'textarea', value: 'A multi-passionate entrepreneur bridging beauty, business, and culture across continents.' },
        ],
      },
      {
        title: 'Sections heading',
        fields: [
          { key: 'venturesTitle', label: 'Ventures title', kind: 'text', value: 'My Ventures' },
          { key: 'venturesSubtitle', label: 'Ventures subtitle', kind: 'text', value: 'Three distinct brands, unified by a commitment to excellence and luxury' },
        ],
      },
      {
        title: 'Call to action',
        fields: [
          { key: 'ctaHeading', label: 'CTA heading', kind: 'text', value: "Let's Create Something Beautiful" },
          { key: 'ctaBody', label: 'CTA body', kind: 'textarea', value: 'Reach out for collaborations, partnerships, or to learn more about the Bilas ecosystem.' },
          { key: 'ctaButton', label: 'Button label', kind: 'text', value: 'Get in Touch' },
        ],
      },
    ],
  },
  {
    key: 'about',
    label: 'About',
    sections: [
      {
        title: 'Header',
        fields: [
          { key: 'title', label: 'Title', kind: 'text', value: 'About Estelle Walters' },
          { key: 'intro', label: 'Intro', kind: 'textarea', value: 'The story behind the brands, the travels, and the vision.' },
        ],
      },
      {
        title: 'Biography',
        fields: [
          { key: 'body', label: 'Body', kind: 'textarea', value: 'Estelle Walters is an entrepreneur, beauty expert, and global trader building purposeful brands across the Pacific and beyond.' },
        ],
      },
    ],
  },
  {
    key: 'contact',
    label: 'Contact',
    sections: [
      {
        title: 'Header',
        fields: [
          { key: 'title', label: 'Title', kind: 'text', value: 'Get in Touch' },
          { key: 'subtitle', label: 'Subtitle', kind: 'textarea', value: 'For collaborations, partnerships, and inquiries.' },
        ],
      },
      {
        title: 'Details',
        fields: [
          { key: 'email', label: 'Email', kind: 'text', value: 'hello@estellewalters.com' },
          { key: 'phone', label: 'Phone', kind: 'text', value: '+675 7831 4360' },
          { key: 'location', label: 'Location', kind: 'text', value: 'Port Moresby, Papua New Guinea' },
        ],
      },
    ],
  },
]

const inputClass =
  'w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition'

export default function AdminPagesEditor() {
  const [pages, setPages] = useState<SitePage[]>(initialPages)
  const [activeKey, setActiveKey] = useState('home')

  const active = pages.find((p) => p.key === activeKey)!

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader title="Pages" description="Edit the content of your static pages and home sections." />

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
            onClick={() => alert(`Saved "${active.label}" page content (UI-only in this preview).`)}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition"
          >
            <Save size={18} />
            Save {active.label}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
