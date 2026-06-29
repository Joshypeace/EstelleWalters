import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TravelArticle } from '@/components/sections/travel-article'
import { getTravelPostBySlug, getPublishedTravelPosts } from '@/server/queries'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const posts = await getPublishedTravelPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function TravelPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getTravelPostBySlug(slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="min-h-64 flex items-center justify-center pt-20 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Travel story not found</h1>
            <Link href="/travel" className="text-accent hover:underline">
              Back to Travel
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <TravelArticle post={post} />
      <Footer />
    </main>
  )
}
