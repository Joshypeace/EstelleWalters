'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface VideoItem {
  src: string
  title: string
  description?: string
}

interface VideoShowcaseProps {
  videos: VideoItem[]
}

function VideoCard({ video }: { video: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-lg border border-border bg-card"
    >
      <div className="relative aspect-[9/16] max-h-[480px] overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={video.src}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
        />

        {/* Play/Pause overlay */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
        >
          {!playing && (
            <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center backdrop-blur-sm">
              <Play size={28} className="text-accent-foreground ml-1" />
            </div>
          )}
        </button>

        {/* Mute toggle */}
        {playing && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleMute() }}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50 text-white/80 hover:text-white transition-colors backdrop-blur-sm"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-semibold text-sm mb-1">{video.title}</h4>
        {video.description && (
          <p className="text-xs text-muted-foreground">{video.description}</p>
        )}
      </div>
    </motion.div>
  )
}

export function VideoShowcase({ videos }: VideoShowcaseProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video, i) => (
        <VideoCard key={i} video={video} />
      ))}
    </div>
  )
}
