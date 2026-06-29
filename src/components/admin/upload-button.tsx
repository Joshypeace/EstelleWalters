'use client'

import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { upload } from '@vercel/blob/client'
import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/react'

interface UploadButtonProps {
  /** File input accept filter, e.g. 'image/*' or 'video/*'. */
  accept?: string
  /** Allow selecting several files at once (returns all uploaded URLs). */
  multiple?: boolean
  /** Called with the public Blob URL(s) after a successful upload. */
  onUploaded: (urls: string[]) => void
  label?: string
  className?: string
}

/**
 * Uploads local files to Vercel Blob and records them in the media library,
 * reusing the same flow as the admin media page. On success it hands the
 * resulting public URL(s) back to the caller so the field value can be set.
 */
export function UploadButton({
  accept = 'image/*',
  multiple = false,
  onUploaded,
  label = 'Upload',
  className,
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const utils = trpc.useUtils()
  const record = trpc.media.record.useMutation()

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setBusy(true)
    try {
      const urls: string[] = []
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
        urls.push(blob.url)
      }
      await utils.media.list.invalidate()
      onUploaded(urls)
    } catch (e) {
      alert((e as Error)?.message ?? 'Upload failed.')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className={cn(
          'flex shrink-0 items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground bg-secondary border border-border hover:border-accent/50 transition disabled:opacity-60',
          className
        )}
      >
        <Upload size={14} />
        {busy ? 'Uploading…' : label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </>
  )
}
