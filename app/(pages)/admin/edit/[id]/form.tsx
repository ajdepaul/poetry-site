'use client'

import { Button, buttonVariants } from "@/app/components/ui/button"
import { architectsDaughter } from "@/app/components/ui/fonts"
import { Input } from "@/app/components/ui/input"
import { P } from "@/app/components/ui/paragraph"
import { editPoem, restorePoem } from "@/app/lib/db/admin-actions"
import { formatDateToYYYYMMDD, shortDateFormat } from "@/app/lib/util/format"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { useFormState, useFormStatus } from "react-dom"
import { twMerge } from "tailwind-merge"

interface PoemData {
  id: string,
  title: string,
  date: Date,
  precedence: number,
  content: string,
  published: boolean,
}

export default function EditForm(props: { poem: PoemData }) {
  const [formState, formDispatch] = useFormState(editPoem, {})
  const { poem } = props

  return (
    <form action={formDispatch}>
      <input type="hidden" name="id" value={poem.id}></input>

      <Input labelName="Title" name="title" defaultValue={poem.title} required={true} className="max-w-full w-fit" />
      <Input labelName="Date" name="date" defaultValue={formatDateToYYYYMMDD(poem.date)} type="date" required={true} />
      <Input labelName="Precedence" name="precedence" defaultValue={poem.precedence} type="number" required={true} className="w-32" />

      <P className="text-left pb-0 italic flex items-center">
        {
          poem.published ?
            (
              <>
                This poem is currently&nbsp;
                <span className="underline text-theme-dark-green font-bold">published</span>&nbsp;
                <EyeIcon className="size-5 inline fill-theme-dark-green hover:fill-theme-green" />
              </>
            ) : (
              <>
                This poem is currently&nbsp;
                <span className="underline text-theme-dark-brown font-bold">not published</span>&nbsp;
                <EyeSlashIcon className="size-5 inline fill-theme-dark-brown hover:fill-theme-brown" />
              </>
            )
        }
      </P>

      <Input
        labelName="Content"
        name="content"
        defaultValue={poem.content}
        containerVariant="vertical"
        inputVariant="monospace"
        textArea={true}
        required={true}
        className="text-nowrap h-96 min-h-24"
      />

      {
        formState.message && (
          <>
            <P className="text-theme-red pb-0 leading-poem-1/2 pt-9 text-left">
              {formState.message}
            </P>
            {
              Object.entries(formState.errors!).map(([field, errors]) => (
                <P key={field} className="text-theme-red pb-0 leading-poem-1/2 text-left pl-6">
                  {field}: {(errors as string[]).join(', ')}
                </P>
              ))
            }
          </>
        )
      }

      <div className="w-full flex justify-evenly py-12">
        <BackButton />
        <ConfirmButton />
      </div>
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
      onClick={(e) => { router.push('/admin') }}
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
      Apply
    </Button>
  )
}
