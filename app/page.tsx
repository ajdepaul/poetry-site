import 'server-only';

import { fetchLatestPoem } from '@/app/lib/fetch/publicFetch';
import { notFound, redirect } from 'next/navigation';

export default async function HomePage() {
  const result = await fetchLatestPoem();
  if (result.type === 'error') { notFound(); }
  redirect(`/p/${encodeURIComponent(result.result)}`);
}
