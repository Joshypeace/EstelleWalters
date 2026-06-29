import { getPublishedTravelPosts, getReels } from '@/server/queries'
import { TravelPageView } from './travel-page-view'

export const dynamic = 'force-dynamic'

export default async function TravelPage() {
  const [posts, reels] = await Promise.all([getPublishedTravelPosts(), getReels()])
  return <TravelPageView posts={posts} reels={reels} />
}
