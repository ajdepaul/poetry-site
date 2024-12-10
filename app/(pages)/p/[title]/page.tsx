'use sever'

import { Divider } from '@/app/components/ui/divider'
import { H } from '@/app/components/ui/header'
import { Nav } from '@/app/components/ui/nav'
import { Pagination } from '@/app/components/ui/pagination'
import { P } from '@/app/components/ui/paragraph'
import { Sheet } from '@/app/components/ui/sheet'
import { fetchPoemPageData } from '@/app/lib/db/user-data'
import { prettyDateFormat } from '@/app/lib/util/format'
import { marked } from 'marked'
import { notFound } from 'next/navigation'

export default async function PoemPage({ params }: { params: { title: string } }) {
  const title = decodeURI(params.title)
  const { content, errorMsg } = await fetchPoemPageData(title)

  if (errorMsg === 'Not found') { notFound() }
  else if (errorMsg !== undefined) { throw new Error(errorMsg) }

  const poemIndex = content!.allPoems.findIndex(poem => poem.title === title)

  // TODO
  const isAdmin = true

  const poemContent = marked.parse(content!.thisPoem.poem)

  return (
    <>
      <Nav isAtHome={poemIndex === content!.allPoems.length - 1} isAdmin={isAdmin} isAtAdminHome={false} />

      <H level="1" size="6xl" className="pt-16 text-center">Poetry Site</H>
      <Divider className="mt-8 mb-6" />
      <H level="2" size="3xl" className="pb-16 text-center">Tales of a Loser</H>

      <Pagination
        prevHref={poemIndex > 0 ? decodeURIComponent(content!.allPoems[poemIndex - 1].title) : undefined}
        nextHref={poemIndex < content!.allPoems.length - 1 ? decodeURIComponent(content!.allPoems[poemIndex + 1].title) : undefined}
      >
        - {prettyDateFormat(content!.thisPoem.date)} -
      </Pagination>

      <Sheet>
        <H level="3" size="5xl" variant="poem" className="pt-12 pb-6 -translate-y-2">{content?.thisPoem.title}</H>
        <div dangerouslySetInnerHTML={{ __html: poemContent }} ></div>
        {/* {
          content!.thisPoem.poem.split('\n\n').map((paragraph, i) => {
            return (<P key={`poem-p-${i}`}>{paragraph}</P>)
          })
        } */}
      </Sheet>
    </>
  )
}
