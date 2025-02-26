'use client';

import { Button } from '@/app/components/button';
import { architectsDaughter } from '@/app/components/fonts';
import { P } from '@/app/components/paragraph';
import { ActionResult } from '@/app/lib/actions/actionTypes';
import { restorePoem } from '@/app/lib/actions/adminActions';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

export default function RestoreForm({ id }: { id: string }) {
  const router = useRouter();

  const [formState, formAction, formPending] = useActionState<ActionResult<string> | null>(
    async () => {
      const result = await restorePoem(id);
      if (result.type === 'success') { router.push('/admin'); }
      return result;
    },
    null
  );

  const message = formState && (formState.type === 'error' ? formState.message : formState.result);

  return (
    <form inert={formPending} action={formAction}>
      <div className="w-full flex justify-evenly pb-12">
        <Button
          type="button"
          onClick={(e) => { router.push('/admin/trash') }}
          bgColor="dark-brown"
          className={`${architectsDaughter.className} w-32 text-lg text-graphite`}
        >
          Back
        </Button>
        <Button
          type="submit"
          bgColor="dark-green"
          className={`${architectsDaughter.className} w-32 text-lg text-graphite`}
        >
          Restore
        </Button>
      </div>
      {
        message && (
          <P className={formState.type === 'error' ? 'text-theme-red' : 'text-theme-dark-green'}>
            {message}
          </P>
        )
      }
    </form >
  );
}
