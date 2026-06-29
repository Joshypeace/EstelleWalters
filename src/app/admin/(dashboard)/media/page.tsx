'use client'

import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { upload } from '@vercel/blob/client'
import { Upload, Trash2, Search, Copy, Check } from 'lucide-react'
import { PageHeader, PrimaryButton } from '@/components/admin/ui'
import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/react'

export default function AdminMediaPage() {
  const utils = trpc.useUtils()
  const { data: items = [], isLoading } = trpc.media.list.useQuery()
  const record = trpc.media.record.useMutation()
  const remove = trpc.media.delete.useMutation({ onSuccess: () => utils.media.list.invalidate() })

  const [folder, setFolder] = useState('All')
  const [query, setQuery] = useState('')
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const folders = useMemo(
    () => ['All', ...Array.from(new Set(items.map((m) => m.folder)))],
    [items]
  )

  const filtered = useMemo(
    () =>
      items.filter(
        (m) =>
          (folder === 'All' || m.folder === folder) &&
          (m.filename.toLowerCase().includes(query.toLowerCase()) ||
            m.url.toLowerCase().includes(query.toLowerCase()))
      ),
    [items, folder, query]
  )

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const blob = await upload(`uploads/${file.name}`, file, {
          access: 'public',
          handleUploadUrl: '/api/blob/upload',
        })
        await record.mutateAsync({
          url: blob.url,
          pathname: blob.pathname,
          contentType: file.type || undefined,
          size: file.size,
        })
      }
      await utils.media.list.invalidate()
    } catch (e) {
      alert((e as Error)?.message ?? 'Upload failed.')
    } finally {
      setUploading(false)
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  const copyUrl = async (url: string) => {
    await navigator.clipboard?.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied((c) => (c === url ? null : c)), 1500)
  }

  const onDelete = (id: string) => {
    if (window.confirm('Delete this asset from Blob and the library? This cannot be undone.')) {
      remove.mutate({ id })
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <input
        ref={fileInput}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <PageHeader
        title="Media Library"
        description="Upload images and videos to Vercel Blob and reuse their URLs across the site."
        action={
          <PrimaryButton onClick={() => fileInput.current?.click()}>
            <Upload size={18} />
            {uploading ? 'Uploading…' : 'Upload'}
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
        {filtered.map((m, i) => {
          const isVideo = m.contentType?.startsWith('video') || /\.(mp4|webm|mov)$/i.test(m.pathname)
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="group relative bg-card border border-border rounded-lg overflow-hidden"
            >
              <div className="aspect-square bg-secondary overflow-hidden">
                {isVideo ? (
                  <video src={m.url} className="w-full h-full object-cover" muted playsInline />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-2">
                <p className="text-[11px] text-muted-foreground truncate" title={m.url}>
                  {m.filename}
                </p>
              </div>
              {/* Hover actions */}
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => copyUrl(m.url)}
                  className="p-1.5 rounded-md bg-black/60 text-white hover:bg-black/80 transition"
                  aria-label="Copy URL"
                  title="Copy URL"
                >
                  {copied === m.url ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <button
                  onClick={() => onDelete(m.id)}
                  className="p-1.5 rounded-md bg-black/60 text-white hover:bg-destructive transition"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted-foreground text-sm">
          {isLoading ? 'Loading…' : 'No media yet. Upload images or videos to get started.'}
        </p>
      )}
    </div>
  )
}
