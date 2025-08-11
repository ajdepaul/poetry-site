import 'server-only';

import { Divider } from '@/app/components/divider';
import { architectsDaughter } from '@/app/components/fonts';
import { H } from '@/app/components/header';
import { Pagination } from '@/app/components/pagination';
import { Sheet } from '@/app/components/sheet';
import { fetchPoemPageData } from '@/app/lib/fetch/publicFetch';
import { prettyDateFormat } from '@/app/util/format';
import { renderMarkdown } from '@/app/util/renderMarkdown';
import { notFound } from 'next/navigation';

export default async function PoemPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const fetchResult = await fetchPoemPageData(id);

  if (fetchResult.type === 'error') {
    if (fetchResult.message === 'Not found') { notFound(); }
    else { throw new Error(fetchResult.message); }
  }

  const { thisPoem, allPoems } = fetchResult.result;
  const poemIndex = allPoems.findIndex(poem => poem.id === id);
  const justifyDirection = thisPoem.justifyDirection === 'START' ? 'text-start'
    : thisPoem.justifyDirection === 'CENTER' ? 'text-center'
      : 'text-end';

  return (
    <>
      <H level="1" size="6xl" className="pt-16 text-center">Poetry Site</H>
      <Divider className="mt-8 mb-6" />
      <H level="2" size="3xl" className="pb-16 text-center">Demo Site</H>

      <Pagination
        prevHref={poemIndex > 0 ? decodeURIComponent(allPoems[poemIndex - 1].id) : undefined}
        nextHref={poemIndex < allPoems.length - 1 ? decodeURIComponent(allPoems[poemIndex + 1].id) : undefined}
      >
        - {prettyDateFormat(thisPoem.date)} -
      </Pagination>

      <a href="google.com" title=""></a>

      <Sheet>
        <H level="3" size="5xl" variant="poem" className="pt-12 pb-3 -translate-y-2">{thisPoem.title}</H>
        <div className="flex items-center justify-center">
          <div
            dangerouslySetInnerHTML={{ __html: await renderMarkdown(thisPoem.content) }}
            className={`${architectsDaughter.className} text-graphite ${justifyDirection} text-xl *:leading-poem-1/2 *:pb-6 mx-2`}
          />
        </div>
      </Sheet>
    </>
  );
}
