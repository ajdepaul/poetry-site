'use client'

import { Button, buttonVariants } from "@/app/components/ui/button"
import { architectsDaughter } from "@/app/components/ui/fonts"
import { P } from "@/app/components/ui/paragraph"
import { restorePoem } from "@/app/lib/db/admin-actions"
import { useRouter } from "next/navigation"
import { useFormState, useFormStatus } from "react-dom"
import { twMerge } from "tailwind-merge"

export default function RestoreForm(props: { id: string }) {
  const [formState, formDispatch] = useFormState(restorePoem, {})
  return (
    <form action={formDispatch}>
      <input type="hidden" name="id" value={props.id}></input>
      <div className="w-full flex justify-evenly pb-12">
        <BackButton />
        <ConfirmButton />
      </div>
      {formState.message && (<P className="text-theme-red">[ {formState.message} ]</P>)}
    </form>
  )
}

function BackButton() {
  const { pending } = useFormStatus()
  const router = useRouter()

  return (
    <Button
      aria-disabled={pending} disabled={pending}
      type='button'
      onClick={(e) => { router.push('/admin/trash') }}
      className={twMerge(buttonVariants(), `${architectsDaughter.className} w-32 bg-theme-dark-brown border-theme-dark-brown text-lg text-graphite hover:bg-theme-brown hover:border-theme-brown
      ${pending && 'opacity-75 cursor-progress'}`)}
    >
      Back
    </Button>
  )
}

function ConfirmButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      aria-disabled={pending} disabled={pending}
      className={`${architectsDaughter.className} w-32 bg-theme-dark-green border-theme-dark-green text-lg text-graphite hover:bg-theme-green hover:border-theme-green
      ${pending && 'opacity-75 cursor-progress'}`}
    >
      Restore
    </Button>
  )
}
