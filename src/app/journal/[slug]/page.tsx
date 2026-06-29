import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArticleContent } from '@/components/sections/article-content'
import { getJournalPostBySlug, getPublishedJournalPosts } from '@/server/queries'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const posts = await getPublishedJournalPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getJournalPostBySlug(slug)

  if (!article) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="min-h-64 flex items-center justify-center pt-20 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Article not found</h1>
            <Link href="/journal" className="text-accent hover:underline">
              Back to Journal
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
      <ArticleContent
        title={article.title}
        date={article.date}
        readTime={article.readTime}
        category={article.category}
        content={article.content}
        author={article.author}
        featuredImage={article.featuredImage}
        gallery={article.gallery}
      />
      <Footer />
    </main>
  )
}
