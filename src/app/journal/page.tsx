import { getPublishedJournalPosts } from '@/server/queries'
import { JournalListView } from './journal-list-view'

// Always reflect the latest published content from the dashboard.
export const dynamic = 'force-dynamic'

export default async function JournalPage() {
  const articles = await getPublishedJournalPosts()
  return <JournalListView articles={articles} />
}
