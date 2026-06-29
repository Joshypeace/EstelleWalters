import { getPageContent } from '@/server/queries'
import { AboutView } from './about-view'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const content = await getPageContent('about')
  return <AboutView content={content} />
}
