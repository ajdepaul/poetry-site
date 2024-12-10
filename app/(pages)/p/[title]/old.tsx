'use sever'

import { Sheet } from "@/app/components/ui/sheet"
import { H } from '@/app/components/ui/header'
import { P } from "@/app/components/ui/paragraph"
import { Divider } from "@/app/components/ui/divider"
import { Pagination } from "@/app/components/ui/pagination"
import { Flower1, Flower2 } from "@/app/components/svg/flower"
import { fetchPoemPageData } from "@/app/lib/db/user-data"
import { notFound } from "next/navigation"

export default async function PoemPage({ params }: { params: { poem: string } }) {
  const { content, errorMsg } = await fetchPoemPageData(decodeURIComponent(params.poem))

  if (errorMsg !== undefined) {
    if (errorMsg === 'Not found') {
      notFound()
    } else {
      throw new Error(errorMsg)
    }
  }

  return (
    <main className="pb-16 size-full flex flex-col items-center
    md:px-16
    sm:px-8
    px-0">

      <Flower1 className="fixed -z-10 fill-theme-green bottom-0 right-1/4 lg:translate-x-32 translate-x-64 scale-150 rotate-12" />
      <Flower2 className="fixed -z-10 fill-theme-brown/30 top-64 left-1/4 lg:-translate-x-32 -translate-x-64 scale-150 -rotate-12" />

      <H level="1" size="6xl" className="pt-16 text-center">Poetry Site</H>
      <Divider className="mt-8 mb-6" />
      <H level="2" size="3xl" className="pb-16 text-center">Tales of a Loser</H>

      <Pagination />

      <Sheet>
        <div className="bg-grid">
          <H level="3" size="5xl" variant="poem" className="pt-12 pb-6 -translate-y-2">Digital Canvas:<br />A Gift for My Sister</H>
          <P>
            In the digital expanse, where dreams take flight,<br />
            I crafted a realm, bathed in pixels bright.<br />
            For my sister dear, a site to call her own,<br />
            Where her passions shine, in a cyber zone.
          </P>
          <P>
            In lines of code, I wove her tale,<br />
            With colors vibrant, like a vibrant sail.<br />
            Each click, each scroll, a journey anew,<br />
            Reflecting her essence, tried and true.
          </P>
          <P>
            From homepage to blog, her voice finds wings,<br />
            In a virtual stage, where her heart sings.<br />
            Pictures and prose, in harmonious blend,<br />
            Her website, a sanctuary, without end.
          </P>
          <P>
            So here it stands, a gift from me,<br />
            A digital canvas, boundless and free.<br />
            For my sister, a space to thrive and grow,<br />
            In the vast web's embrace, her brilliance to show.
          </P>
          <P>- ChatGPT</P>
        </div>
      </Sheet>
    </main>
  );
}
