'use server'

import { H } from '@/app/components/ui/header'
import { Nav } from '@/app/components/ui/nav'
import { Sheet } from '@/app/components/ui/sheet'
import { fetchPoem } from '@/app/lib/db/adminFetch'
import { notFound } from 'next/navigation'
import EditForm from './form'

export default async function EditPage({ params }: { params: { id: string } }) {
  const { content, errorMsg } = await fetchPoem(params.id)

  if (errorMsg === 'Not found') { notFound() }

  return (
    <>
      <Nav isAtHome={false} isAdmin={true} isAtAdminHome={false} />

      <H level="1" size="6xl" className="py-16 text-center">Admin Dashboard</H>

      <Sheet>
        <div className="md:px-8 flex flex-col">
          <H level="3" size="5xl" variant="poem" className="pt-12 -translate-y-2 text-theme-dark-brown">Edit Poem</H>

          <EditForm poem={{ id: params.id, ...content!! }} />
        </div>
      </Sheet>
    </>
  )
}
