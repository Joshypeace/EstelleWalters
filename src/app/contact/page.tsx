import { getPageContent } from '@/server/queries'
import { ContactView } from './contact-view'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const content = await getPageContent('contact')
  return <ContactView content={content} />
}
