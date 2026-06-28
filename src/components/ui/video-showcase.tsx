'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface VideoItem {
  src: string
  title: string
  description?: string
}

interface VideoShowcaseProps {
  videos: VideoItem[]
}

function VideoThumb({ video, onOpen }: { video: VideoItem; onOpen: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onOpen}
      className="group relative overflow-hidden rounded-lg border border-border bg-card text-left focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <div className="relative aspect-[9/16] max-h-[480px] overflow-hidden bg-black">
        <video
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-110">
            <Play size={28} className="text-accent-foreground ml-1" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-semibold text-sm mb-1">{video.title}</h4>
        {video.description && (
          <p className="text-xs text-muted-foreground">{video.description}</p>
        )}
      </div>
    </motion.button>
  )
}

export function VideoShowcase({ videos }: VideoShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  const close = () => setActiveIndex(null)
  const navigate = (dir: 1 | -1) => {
    setActiveIndex((cur) => {
      if (cur === null) return cur
      const next = cur + dir
      if (next < 0 || next >= videos.length) return cur
      return next
    })
  }

  // Lock body scroll + keyboard controls while the modal is open
  useEffect(() => {
    if (activeIndex === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [activeIndex, videos.length])

  const active = activeIndex !== null ? videos[activeIndex] : null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, i) => (
          <VideoThumb key={i} video={video} onOpen={() => setActiveIndex(i)} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
            >
              <X size={28} />
            </button>

            {/* Prev */}
            {activeIndex! > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(-1) }}
                aria-label="Previous"
                className="absolute left-4 z-10 text-white/70 hover:text-white transition-colors p-2"
              >
                <ChevronLeft size={36} />
              </button>
            )}

            {/* Next */}
            {activeIndex! < videos.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(1) }}
                aria-label="Next"
                className="absolute right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
              >
                <ChevronRight size={36} />
              </button>
            )}

            {/* Video */}
            <motion.div
              key={activeIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-[420px] max-h-[88vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalVideoRef}
                src={active.src}
                autoPlay
                controls
                loop
                playsInline
                className="w-full h-auto max-h-[80vh] rounded-lg bg-black object-contain"
              />
              <div className="mt-3 text-center">
                <h4 className="font-semibold text-white">{active.title}</h4>
                {active.description && (
                  <p className="text-sm text-white/60 mt-1">{active.description}</p>
                )}
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {activeIndex! + 1} / {videos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
