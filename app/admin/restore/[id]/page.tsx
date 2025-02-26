import 'server-only';

import RestoreForm from '@/app/admin/restore/[id]/form';
import { H } from '@/app/components/header';
import { P } from '@/app/components/paragraph';
import { Sheet } from '@/app/components/sheet';
import { fetchPoem } from '@/app/lib/fetch/adminFetch';
import { notFound } from 'next/navigation';

export default async function RestorePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const fetchResult = await fetchPoem(id);

  if (fetchResult.type === 'error') {
    if (fetchResult.message === 'Not found') { notFound(); }
    else { throw Error(fetchResult.message); }
  }

  const { title } = fetchResult.result;

  return (
    <>
      <div className="size-full flex items-center justify-center pt-16">
        <Sheet>
          <div className="md:px-8">
            <H level="3" size="5xl" variant="poem" className="pt-12 pb-6 -translate-y-2 text-theme-dark-green">
              Restore Confirmation
            </H>
            <P className="text-wrap">
              Are you sure you want to restore "<span className="text-theme-dark-green">{title}</span>"?
            </P>
            <RestoreForm id={id} />
          </div>
        </Sheet>
      </div>
    </>
  )
}
