import 'server-only';

import { A } from '@/app/components/anchor';
import { H } from '@/app/components/header';
import { Pagination } from '@/app/components/pagination';
import { paragraphVariants } from '@/app/components/paragraph';
import { Sheet } from '@/app/components/sheet';
import { fetchTrashPoems } from '@/app/lib/fetch/adminFetch';
import { shortDateFormat } from '@/app/util/format';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { IoArrowBack, IoArrowUndo, IoBackspace, IoTrash } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

export default async function TrashPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const pageSize = 20;
  return (
    <>
      <H level="1" size="6xl" className="py-16 text-center">Admin Dashboard</H>
      <Suspense fallback={TrashListFallback(pageSize)}>
        <TrashList currentPage={Number(page) || 1} pageSize={pageSize} />
      </Suspense>
    </>
  );
}

async function TrashList({ currentPage, pageSize }: { currentPage: number, pageSize: number }) {
  const fetchResult = await fetchTrashPoems(currentPage - 1, pageSize);

  if (fetchResult.type === 'error') {
    if (fetchResult.message === 'Not found') { notFound(); }
    else { throw new Error(fetchResult.message); }
  }

  const { poems, poemCount } = fetchResult.result;
  const pageCount = Math.max(Math.ceil(poemCount / pageSize), 1);

  return (
    <>
      <Pagination
        prevHref={currentPage === 2 ? '/admin' : currentPage > 1 ? `/admin?page=${currentPage - 1}` : undefined}
        nextHref={currentPage < pageCount ? `/admin?page=${currentPage + 1}` : undefined}
        isSearchParamRedirect={true}
      >
        <div>Page {currentPage} / {pageCount}</div>
      </Pagination>

      <Sheet>
        <div className="md:px-8 px-3">
          <H level="3" size="5xl" variant="poem" className="pt-12 -translate-y-2 flex items-center justify-center text-theme-red">
            Trash&nbsp;
            <IoTrash className="inline size-10" />
          </H>

          <div className={twMerge(paragraphVariants(), 'flex justify-center pb-0 last:pb-0')}>
            <A href="/admin" variant="no-underline" className="text-theme-dark-brown hover:text-theme-brown flex items-center">
              <IoArrowBack className="inline size-5" />&nbsp;Back
            </A>
          </div>

          <ul className={twMerge(paragraphVariants(), 'text-start pt-3.5 sm:pt-0')}>
            {
              poems.map(poem => (
                <li key={poem.title} className="flex justify-between">
                  <div className="mr-4 flex overflow-hidden line-through">
                    <span className="sm:inline-block hidden overflow-hidden text-ellipsis">
                      {shortDateFormat(poem.date)} - {poem.title}
                    </span>
                    <div className="sm:hidden flex flex-col items-start leading-poem-1/2 overflow-hidden">
                      <div className="inline-block items-center w-full overflow-hidden text-ellipsis">
                        {poem.title}
                      </div>
                      <div className="pb-6 pl-7">{shortDateFormat(poem.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <A href={`/admin/restore/${poem.id}`} variant="no-underline" className="text-theme-dark-green hover:text-theme-green flex items-center">
                      <span className="hidden sm:inline">Restore&nbsp;</span>
                      <IoArrowUndo className="inline size-5" />
                    </A>
                    &nbsp;<span className="hidden sm:inline">|&nbsp;</span>
                    <A href={`/admin/delete/${poem.id}`} variant="no-underline" className="text-theme-red hover:text-theme-light-red flex items-center">
                      <span className="hidden sm:inline">Delete&nbsp;</span>
                      <IoBackspace className="inline size-5" />
                    </A>
                  </div>
                </li>
              ))
            }
            {
              Array(pageSize - poems.length).fill(undefined)
                .map((_, i) => (<li key={`spacer: ${i}`} className="h-12" />))
            }
          </ul>
        </div>
      </Sheet>
    </>
  );
}

function TrashListFallback(pageSize: number) {
  return (
    <>
      <Pagination><div>Page - / -</div></Pagination>
      <Sheet>
        <div>
          <H level="3" size="5xl" variant="poem" className="pt-12 -translate-y-2 flex items-center justify-center text-theme-red">
            Trash&nbsp;
            <IoTrash className="inline size-10" />
          </H>

          <div className={twMerge(paragraphVariants(), 'flex justify-center pb-0 last:pb-0')}>
            <A href="/admin" variant="no-underline" className="text-theme-dark-brown hover:text-theme-brown flex items-center">
              <IoArrowBack className="inline size-5" />&nbsp;Back
            </A>
          </div>

          <ul className={twMerge(paragraphVariants(), 'relative text-start pt-3.5 sm:pt-0')}>
            {
              Array(pageSize).fill(undefined)
                .map((_, i) => (<li key={`spacer: ${i}`} className="h-12" />))
            }
            <div className="absolute inset-0 flex items-center justify-center">
              <FaPencilAlt className="size-16 md:size-24 animate-bounce" />
            </div>
          </ul>
        </div>
      </Sheet>
    </>
  );
}
