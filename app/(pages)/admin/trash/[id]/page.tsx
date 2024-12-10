'use server'

import { H } from '@/app/components/ui/header'
import { P } from '@/app/components/ui/paragraph'
import { Sheet } from '@/app/components/ui/sheet'
import { fetchPoem } from '@/app/lib/db/admin-data'
import TrashForm from './form'
import { notFound } from 'next/navigation'
import { Nav } from '@/app/components/ui/nav'

export default async function TrashPage({ params }: { params: { id: string } }) {
  const { content, errorMsg } = await fetchPoem(params.id)

  if (errorMsg === 'Not found') { notFound() }

  return (
    <>
      <Nav isAtHome={false} isAdmin={true} isAtAdminHome={false} />
      
      <div className="size-full flex items-center justify-center pt-16">
        <Sheet>
          <div className="md:px-8">
            <H level="3" size="5xl" variant="poem" className="pt-12 pb-6 -translate-y-2 text-theme-red">Trash Confirmation</H>

            <P className="text-wrap">
              Are you sure you want to move "<span className="text-theme-dark-green">{content?.title}</span>" to the trash?
            </P>

            <TrashForm id={params.id} />
          </div>
        </Sheet>
      </div>
    </>
  )
}
