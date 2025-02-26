import 'server-only';

import NewForm from '@/app/admin/new/form';
import { H } from '@/app/components/header';
import { Sheet } from '@/app/components/sheet';

export default async function EditPage() {
  return (
    <>
      <H level="1" size="6xl" className="py-16 text-center">Admin Dashboard</H>
      <Sheet>
        <div className="md:px-8 flex flex-col">
          <H level="3" size="5xl" variant="poem" className="pt-12 -translate-y-2 text-theme-dark-green">
            New Poem
          </H>
          <NewForm />
        </div>
      </Sheet>
    </>
  )
}
