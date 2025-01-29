'use sever'

import { Divider } from '@/app/components/ui/divider'
import { architectsDaughter } from '@/app/components/ui/fonts'
import { H } from '@/app/components/ui/header'
import { Nav } from '@/app/components/ui/nav'
import { Pagination } from '@/app/components/ui/pagination'
import { Sheet } from '@/app/components/ui/sheet'
import { fetchPoemPageData } from '@/app/lib/db/publicFetch'
import { prettyDateFormat } from '@/app/lib/util/format'
import { renderMarkdown } from '@/app/lib/util/renderMarkdown'
import { notFound } from 'next/navigation'

export default async function PoemPage({ params: { id } }: { params: { id: string } }) {
  const result = await fetchPoemPageData(id);

  if (result.type === 'error') {
    if (result.message === 'Not found') { notFound(); }
    else { throw new Error(result.message); }
  }

  const { thisPoem, allPoems } = result.content;
  const poemIndex = allPoems.findIndex(poem => poem.id === id);
  const justifyDirection = thisPoem.justifyDirection === 'START' ? 'text-start'
    : thisPoem.justifyDirection === 'CENTER' ? 'text-center'
      : 'text-end';

  return (
    <>
      <Nav />

      <H level="1" size="6xl" className="pt-16 text-center">Poetry Site</H>
      <Divider className="mt-8 mb-6" />
      <H level="2" size="3xl" className="pb-16 text-center">Tales of a Loser</H>

      <Pagination
        prevHref={poemIndex > 0 ? decodeURIComponent(allPoems[poemIndex - 1].id) : undefined}
        nextHref={poemIndex < allPoems.length - 1 ? decodeURIComponent(allPoems[poemIndex + 1].id) : undefined}
      >
        - {prettyDateFormat(thisPoem.date)} -
      </Pagination>

      <a href="google.com" title=""></a>

      <Sheet>
        <H level="3" size="5xl" variant="poem" className="pt-12 pb-6 -translate-y-2">{thisPoem.title}</H>
        <div className="flex items-center justify-center">
          <div
            dangerouslySetInnerHTML={{ __html: await renderMarkdown(thisPoem.content) }}
            className={`${architectsDaughter.className} text-graphite ${justifyDirection} text-xl *:leading-poem mx-2`}
          />
        </div>
      </Sheet>
    </>
  );
}
