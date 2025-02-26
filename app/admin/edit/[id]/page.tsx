import 'server-only';

import EditForm from '@/app/admin/edit/[id]/form';
import { H } from '@/app/components/header';
import { Sheet } from '@/app/components/sheet';
import { fetchPoem } from '@/app/lib/fetch/adminFetch';
import { notFound } from 'next/navigation';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const fetchResult = await fetchPoem(id);

  if (fetchResult.type === 'error') {
    if (fetchResult.message === 'Not found') { notFound(); }
    else { throw Error(fetchResult.message); }
  }

  const poemData = fetchResult.result;

  return (
    <>
      <H level="1" size="6xl" className="py-16 text-center">Admin Dashboard</H>
      <Sheet>
        <div className="md:px-8 flex flex-col">
          <H level="3" size="5xl" variant="poem" className="pt-12 -translate-y-2 text-theme-dark-brown">
            Edit Poem
          </H>
          <EditForm id={id} poemData={poemData} />
        </div>
      </Sheet>
    </>
  )
}
