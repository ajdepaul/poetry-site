'use sever';

import { A } from '@/app/components/ui/anchor';
import { H } from '@/app/components/ui/header';
import { Nav } from '@/app/components/ui/nav';
import { Pagination } from '@/app/components/ui/pagination';
import { paragraphVariants } from '@/app/components/ui/paragraph';
import { Sheet } from '@/app/components/ui/sheet';
import { fetchPoems } from '@/app/lib/db/adminFetch';
import { shortDateFormat } from '@/app/lib/util/format';
import { DocumentTextIcon, EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { twMerge } from 'tailwind-merge';

export default async function AdminPage({ searchParams }: { searchParams?: { page?: string } }) {
  const pageSize = 20;
  return (
    <>
      <Nav />

      <H level="1" size="6xl" className="py-16 text-center">Admin Dashboard</H>

      <Suspense fallback={PoemListFallback(pageSize)}>
        <PoemList searchParams={searchParams} pageSize={pageSize} />
      </Suspense>
    </>
  )
}

async function PoemList({ searchParams, pageSize }: { searchParams?: { page?: string }, pageSize: number }) {
  const currentPage = Number(searchParams?.page) || 1;
  const { content, errorMsg } = await fetchPoems(currentPage - 1, pageSize);

  if (errorMsg === 'Not found') { notFound() }
  else if (errorMsg !== undefined) { throw new Error(errorMsg) }

  const { poems, poemCount } = content!;
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
          <H level="3" size="5xl" variant="poem" className="pt-12 -translate-y-2">Poems</H>

          <div className={twMerge(paragraphVariants(), 'flex justify-center pb-0 last:pb-0')}>
            <A href="/admin/new" variant="no-underline" className="text-theme-dark-green hover:text-theme-green flex items-center">
              New Poem&nbsp;<DocumentTextIcon className="inline size-5" />
            </A>
            &nbsp;|&nbsp;
            <A href="/admin/trash" variant="no-underline" className="text-theme-red hover:text-theme-light-red flex items-center">
              View Trash&nbsp;<TrashIcon className="inline size-5" />
            </A>
          </div>

          <ul className={twMerge(paragraphVariants(), 'text-start pt-3.5 sm:pt-0')}>
            {
              poems.map(poem => (
                <li key={poem.title} className="flex justify-between">
                  <div className="mr-4 flex overflow-hidden">
                    <span className="sm:inline-block hidden overflow-hidden text-ellipsis">
                      <Link href={`/admin/publish/${poem.id}`}>
                        {poem.published ? (
                          <EyeIcon className="size-5 inline fill-theme-dark-green hover:fill-theme-green" />
                        ) : (
                          <EyeSlashIcon className="size-5 inline fill-theme-dark-brown hover:fill-theme-brown" />
                        )}
                      </Link>
                      &nbsp;
                      {shortDateFormat(poem.date)} - {poem.title}
                    </span>
                    <div className="sm:hidden flex flex-col items-start leading-poem-1/2 overflow-hidden">
                      <div className="inline-block items-center w-full overflow-hidden text-ellipsis">
                        <Link href={`/admin/publish/${poem.id}`}>
                          {poem.published ? (
                            <EyeIcon className="size-5 inline fill-theme-dark-green hover:fill-theme-green" />
                          ) : (
                            <EyeSlashIcon className="size-5 inline fill-theme-dark-brown hover:fill-theme-brown" />
                          )}
                        </Link>
                        &nbsp;
                        {poem.title}
                      </div>
                      <div className="pb-6 pl-7">{shortDateFormat(poem.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <A href={`/admin/edit/${poem.id}`} variant="no-underline" className="text-theme-dark-brown hover:text-theme-brown flex items-center">
                      <span className="hidden sm:inline">Edit&nbsp;</span>
                      <PencilIcon className="inline size-5" />
                    </A>
                    &nbsp;<span className="hidden sm:inline">|&nbsp;</span>
                    <A href={`/admin/trash/${poem.id}`} variant="no-underline" className="text-theme-red hover:text-theme-light-red flex items-center">
                      <span className="hidden sm:inline">Trash&nbsp;</span>
                      <TrashIcon className="inline size-5" />
                    </A>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </Sheet>
    </>
  )
}

function PoemListFallback(pageSize: number) {
  return (
    <>
      <Pagination><div>Page - / -</div></Pagination>

      <Sheet>
        <div>
          <H level="3" size="5xl" variant="poem" className="pt-12 -translate-y-2">Poems</H>

          <div className={twMerge(paragraphVariants(), 'flex justify-center pb-0 last:pb-0')}>
            <A href="/admin/new" className="text-theme-dark-green flex items-center">
              New&nbsp;<DocumentTextIcon className="inline size-5" />
            </A>
            &nbsp;|&nbsp;
            <A href="/admin/trash" className="text-theme-red flex items-center">
              Trash&nbsp;<TrashIcon className="inline size-5" />
            </A>
          </div>

          <ul className={twMerge(paragraphVariants())}>
            {Array(pageSize).fill(null).map((_, i) => (
              <li key={i} className="h-12" />
            ))}
          </ul>
        </div>
      </Sheet>
    </>
  );
}
