'use client';

import { Button } from "@/app/components/button";
import { architectsDaughter } from "@/app/components/fonts";
import { Input, inputLabelVariants, inputVariants } from "@/app/components/input";
import { P } from "@/app/components/paragraph";
import { ActionResult } from "@/app/lib/actions/actionTypes";
import { newPoem } from "@/app/lib/actions/adminActions";
import { formatDateToYYYYMMDD } from "@/app/util/format";
import formDataToJson from "@/app/util/formDataToJson";
import { PoemData, PoemDataSchema } from "@/app/util/poemData";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { twMerge } from "tailwind-merge";

type EditFormActionResult = ActionResult<string> | {
  type: 'error';
  message: string[];
};

export default function NewForm() {
  const router = useRouter();

  const currentDate = new Date();
  const { title, content, justifyDirection, date, precedence }: PoemData = {
    title: 'Untitled Poem',
    content: '',
    justifyDirection: 'CENTER',
    // convert current date to as if this was UTC
    date: new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())),
    published: false,
    precedence: 0
  };

  const [formState, formAction, formPending] = useActionState<EditFormActionResult | null, FormData>(
    async (_, formData) => {
      formData.append('published', 'false');

      const formValidation = PoemDataSchema.safeParse(formDataToJson(formData));
      if (formValidation.error) {
        return {
          type: 'error',
          message: ['Bad form data:', ...formValidation.error.issues.map(({ path, message }) => `${path} ${message}`)]
        };
      }
      const poemData = formValidation.data;

      const result = await newPoem(poemData);
      if (result.type === 'success') { router.push('/admin') };
      return { type: 'success', result: '' };
    },
    null
  );

  const message = formState && (formState.type === 'error' ? formState.message : formState.result);

  return (
    <form action={formAction} className="flex flex-col">
      <Input
        labelName="Title"
        name="title"
        defaultValue={title}
        required={true}
        className="max-w-full w-fit"
      />
      <Input
        labelName="Date"
        name="date"
        defaultValue={formatDateToYYYYMMDD(date)}
        type="date"
        required={true}
      />
      <Input
        labelName="Precedence"
        name="precedence"
        defaultValue={precedence}
        type="number"
        required={true}
        className="w-32"
      />

      <label className={inputLabelVariants({})}>
        Text Align:&nbsp;
        <select
          name="justifyDirection"
          defaultValue={justifyDirection}
          className={twMerge(inputVariants({}), 'bg-white')}
        >
          <option value="START">Start</option>
          <option value="CENTER">Center</option>
          <option value="END">End</option>
        </select>
      </label>

      <Input
        labelName="Content"
        name="content"
        defaultValue={content}
        containerVariant="vertical"
        inputVariant="monospace"
        textArea={true}
        required={true}
        className="text-nowrap h-96 min-h-24"
      />

      <div className="w-full flex justify-evenly py-12">
        <Button
          type='button'
          bgColor="dark-brown"
          onClick={(e) => { router.push('/admin'); }}
          className={`${architectsDaughter.className} w-32 text-lg text-graphite`}
        >
          Back
        </Button>
        <Button
          type="submit"
          bgColor="dark-green"
          className={`${architectsDaughter.className} w-32 text-lg text-graphite`}
        >
          Create
        </Button>
      </div>

      {
        message && (() => {
          const textStyle = `text-wrap text-start leading-poem-1/2 pb-6 last:pb-0 ${formState.type === 'error' ? 'text-theme-red' : 'text-theme-dark-green'}`;
          return (
            <div className="self-center p-8 bg-yellow-200 shadow-md mb-12">
              {formState.type === 'error' && (<P className={twMerge(textStyle, 'text-center')}>- Error -</P>)}
              {[message].flat().map((message, i) => (<P key={i} className={textStyle}>{message}</P>))}
            </div>
          );
        })()
      }
    </form>
  )
}
