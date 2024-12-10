import { fetchLatestPoem } from '@/app/lib/db/user-data'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const { content, errorMsg } = await fetchLatestPoem()
  redirect(`/p/${encodeURIComponent(content!)}`)
}
