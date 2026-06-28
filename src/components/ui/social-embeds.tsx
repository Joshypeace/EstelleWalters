'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

interface TikTokEmbedProps {
  url: string
  videoId?: string
}

interface InstagramEmbedProps {
  url: string
  postId?: string
}

interface YouTubeShortsEmbedProps {
  videoId: string
}

// TikTok Embed Component
export function TikTokEmbed({ url, videoId }: TikTokEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="flex justify-center my-4">
      <blockquote
        className="tiktok-embed"
        cite={url}
        data-video-id={videoId}
        style={{ maxWidth: '605px', minWidth: '325px' }}
      >
        <section></section>
      </blockquote>
    </div>
  )
}

// Instagram Embed Component
export function InstagramEmbed({ url, postId }: InstagramEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)
    
    // Reload Instagram embeds if already loaded
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [])

  return (
    <div className="flex justify-center my-4">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ maxWidth: '540px', minWidth: '326px' }}
      ></blockquote>
    </div>
  )
}

// YouTube Shorts Embed Component
export function YouTubeShortsEmbed({ videoId }: YouTubeShortsEmbedProps) {
  return (
    <div className="flex justify-center my-4">
      <iframe
        width="315"
        height="560"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
  )
}

// Social Gallery Grid Component
interface SocialPost {
  id: string
  type: 'tiktok' | 'instagram'
  url: string
  caption: string
  videoId?: string
  postId?: string
}

interface SocialGalleryProps {
  posts: SocialPost[]
  title?: string
}

export function SocialGallery({ posts, title }: SocialGalleryProps) {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-balance">
              {title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow our journey on social media for daily updates, behind-the-scenes content, and exclusive offers.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="rounded-lg overflow-hidden bg-card border border-border">
              <div className="p-4 bg-secondary/50">
                <p className="text-sm text-muted-foreground line-clamp-2">{post.caption}</p>
              </div>
              {post.type === 'tiktok' && (
                <TikTokEmbed url={post.url} videoId={post.videoId} />
              )}
              {post.type === 'instagram' && (
                <InstagramEmbed url={post.url} postId={post.postId} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
