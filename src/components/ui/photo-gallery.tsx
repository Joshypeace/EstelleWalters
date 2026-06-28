'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface GalleryPhoto {
  src: string
  alt: string
  caption?: string
  category?: string
}

interface PhotoGalleryProps {
  photos: GalleryPhoto[]
  columns?: 2 | 3 | 4
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto'
}

export function PhotoGallery({
  photos,
  columns = 3,
  aspectRatio = 'portrait',
}: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    auto: 'aspect-auto min-h-[240px]',
  }

  const navigate = (dir: 1 | -1) => {
    if (lightboxIndex === null) return
    const next = lightboxIndex + dir
    if (next >= 0 && next < photos.length) setLightboxIndex(next)
  }

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {photos.map((photo, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            viewport={{ once: true }}
            onClick={() => setLightboxIndex(i)}
            className="group relative overflow-hidden rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <div className={`relative ${aspectClasses[aspectRatio]} overflow-hidden`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs leading-relaxed">{photo.caption}</p>
                </div>
              )}
            </div>
            {photo.category && (
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-accent/80 px-2 py-0.5 rounded-full">
                  {photo.category}
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
            >
              <X size={28} />
            </button>

            {/* Prev */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(-1) }}
                className="absolute left-4 z-10 text-white/70 hover:text-white transition-colors p-2"
              >
                <ChevronLeft size={36} />
              </button>
            )}

            {/* Next */}
            {lightboxIndex < photos.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(1) }}
                className="absolute right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
              >
                <ChevronRight size={36} />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
              {photos[lightboxIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <p className="text-white text-sm">{photos[lightboxIndex].caption}</p>
                </div>
              )}
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {lightboxIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
