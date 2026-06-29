'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Trash2, Search, Copy } from 'lucide-react'
import { PageHeader, PrimaryButton } from '@/components/admin/ui'
import { cn } from '@/lib/utils'

interface MediaItem {
  id: string
  src: string
  folder: string
}

const files = [
  '/content/beauty/product-1.png',
  '/content/beauty/product-2.png',
  '/content/beauty/product-3.png',
  '/content/beauty/product-4.jpeg',
  '/content/beauty/lashes-display.jpg',
  '/content/beauty/product-launch.jpg',
  '/content/business/supplier-certificate.jpg',
  '/content/business/garment-factory.jpg',
  '/content/business/logistics-shipping.jpg',
  '/content/business/warehouse-operations.jpg',
  '/content/business/warehouse-partner.jpg',
  '/content/business/beauty-supplier-visit.jpg',
  '/content/business/sourcing-beauty-products.jpg',
  '/content/business/jewelry-accessories.jpg',
  '/content/press/magazine-cover.jpg',
  '/content/press/magazine-article.jpg',
  '/content/press/magazine-stand.jpg',
  '/content/travel/paris-eiffel-tower.jpg',
  '/content/travel/norway-winter.jpg',
  '/content/travel/norway-mountains.jpg',
  '/content/travel/norway-bridge.jpg',
  '/content/travel/giraffe-centre-kenya.jpg',
  '/content/travel/karibu-kenya.jpg',
  '/content/travel/kenya-wildlife.jpg',
  '/content/travel/la-selva-dining.jpg',
  '/content/travel/la-selva-ambiance.jpg',
  '/content/travel/la-selva-menu.jpg',
  '/content/travel/restaurant-selfie.jpg',
  '/content/travel/dinner-outing.jpg',
  '/content/travel/airport.jpg',
  '/logos/bilas-studio.jpg',
  '/logos/bilas-beauty.png',
  '/logos/connet-suppliers.png',
]

const initialData: MediaItem[] = files.map((src, i) => ({
  id: `m${i}`,
  src,
  folder: src.split('/').slice(0, -1).join('/').replace(/^\//, ''),
}))

const folders = ['All', ...Array.from(new Set(initialData.map((m) => m.folder)))]

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>(initialData)
  const [folder, setFolder] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      items.filter(
        (m) =>
          (folder === 'All' || m.folder === folder) &&
          m.src.toLowerCase().includes(query.toLowerCase())
      ),
    [items, folder, query]
  )

  const remove = (id: string) => {
    if (window.confirm('Remove this asset from the library?')) {
      setItems((prev) => prev.filter((m) => m.id !== id))
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Media Library"
        description="Browse and manage images used across the website."
        action={
          <PrimaryButton onClick={() => alert('Upload is UI-only in this preview.')}>
            <Upload size={18} />
            Upload
          </PrimaryButton>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search media..."
            className="w-full pl-9 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setFolder(f)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition',
                folder === f
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {filtered.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className="group relative bg-card border border-border rounded-lg overflow-hidden"
          >
            <div className="aspect-square bg-secondary overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
              <p className="text-[11px] text-muted-foreground truncate" title={m.src}>
                {m.src.split('/').pop()}
              </p>
            </div>
            {/* Hover actions */}
            <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(m.src)
                }}
                className="p-1.5 rounded-md bg-black/60 text-white hover:bg-black/80 transition"
                aria-label="Copy path"
                title="Copy path"
              >
                <Copy size={14} />
              </button>
              <button
                onClick={() => remove(m.id)}
                className="p-1.5 rounded-md bg-black/60 text-white hover:bg-destructive transition"
                aria-label="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted-foreground text-sm">No media found.</p>
      )}
    </div>
  )
}
