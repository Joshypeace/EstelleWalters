import { getPublishedTravelPosts } from '@/server/queries'
import { TravelPageView } from './travel-page-view'

export const dynamic = 'force-dynamic'

export default async function TravelPage() {
  const posts = await getPublishedTravelPosts()
  return <TravelPageView posts={posts} />
}
