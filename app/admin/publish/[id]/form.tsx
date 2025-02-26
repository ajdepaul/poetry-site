'use client';

import { Button } from '@/app/components/button';
import { architectsDaughter } from '@/app/components/fonts';
import { P } from '@/app/components/paragraph';
import { ActionResult } from '@/app/lib/actions/actionTypes';
import { publishPoem } from '@/app/lib/actions/adminActions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

export default function PublishForm({ id, action }: { id: string, action: 'publish' | 'unpublish' }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectHref = searchParams.has('redirect')
    ? `/admin${decodeURI(searchParams.get('redirect')!)}`
    : '/admin';

  const [formState, formAction, formPending] = useActionState<ActionResult<string> | null>(
    async () => {
      const result = await publishPoem({ id, action });
      if (result.type === 'success') { router.push(redirectHref); }
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
          onClick={(e) => { router.push(redirectHref); }}
          bgColor="dark-brown"
          className={`${architectsDaughter.className} w-32 text-lg text-graphite`}
        >
          Back
        </Button>
        <Button
          type="submit"
          bgColor={action === 'publish' ? 'dark-green' : 'red'}
          className={`${architectsDaughter.className} w-32 text-lg text-graphite`}
        >
          {action === 'publish' ? 'Publish' : 'Unpublish'}
        </Button>
      </div>
      {
        message && (
          <P className={formState.type === 'error' ? 'text-theme-red' : 'text-theme-dark-green'}>
            {message}
          </P>
        )
      }
    </form>
  );
}
