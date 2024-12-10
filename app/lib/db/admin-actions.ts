'use server'

import { redirect } from 'next/navigation'
import { FormResult } from '@/app/lib/util/db'
import { z } from 'zod'
import { prisma } from '@/app/lib/prisma'

const editPoemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  date: z.coerce.date(),
  precedence: z.number().int(),
  content: z.string().min(1),
})

interface EditPoemErrors {
  id?: string[],
  title?: string[],
  date?: string[],
  precedence?: string[],
  content?: string[],
}

export async function editPoem(prevState: FormResult<EditPoemErrors>, formData: FormData): Promise<FormResult<EditPoemErrors>> {
  const validation = editPoemSchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    date: formData.get('date'),
    precedence: (formData.get('precedence') as string).trim().length !== 0 ? Number(formData.get('precedence')) : undefined,
    content: formData.get('content'),
  })

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Failed validation',
    }
  }

  const { id, ...data } = validation.data

  try {
    await prisma.poem.update({
      where: {
        id: id,
      },
      data: data
    })
  } catch (error) {
    console.error('Database error:', error)
    return { message: 'Database error' }
  }

  redirect('/admin')
}

const restorePoemSchema = z.object({ id: z.string() })

interface TrashPoemErrors {
  id?: string[]
}

export async function restorePoem(prevState: FormResult<TrashPoemErrors>, formData: FormData): Promise<FormResult<TrashPoemErrors>> {
  const validation = restorePoemSchema.safeParse({ id: formData.get('id') })

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Failed validation',
    }
  }

  const { id } = validation.data

  try {
    await prisma.poem.update({
      where: {
        id: id,
      },
      data: {
        published: false,
        deleted_on: null,
      }
    })
  } catch (error) {
    console.error('Database error:', error)
    return { message: 'Database error' }
  }

  redirect('/admin/trash')
}

const deletePoemSchema = z.object({ id: z.string() })

interface TrashPoemErrors {
  id?: string[]
}

export async function deletePoem(prevState: FormResult<TrashPoemErrors>, formData: FormData): Promise<FormResult<TrashPoemErrors>> {
  const validation = deletePoemSchema.safeParse({ id: formData.get('id') })

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Failed validation',
    }
  }

  const { id } = validation.data

  try {
    await prisma.poem.delete({
      where: { id: id }
    })
  } catch (error) {
    console.error('Database error:', error)
    return { message: 'Database error' }
  }

  redirect('/admin/trash')
}

const trashPoemSchema = z.object({ id: z.string() })

interface TrashPoemErrors {
  id?: string[]
}

export async function trashPoem(prevState: FormResult<TrashPoemErrors>, formData: FormData): Promise<FormResult<TrashPoemErrors>> {
  const validation = trashPoemSchema.safeParse({ id: formData.get('id') })

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Failed validation',
    }
  }

  const { id } = validation.data

  try {
    await prisma.poem.update({
      where: {
        id: id,
      },
      data: {
        published: false,
        deleted_on: new Date(),
      }
    })
  } catch (error) {
    console.error('Database error:', error)
    return { message: 'Database error' }
  }

  redirect('/admin')
}

const publishPoemSchema = z.object({ id: z.string() })

interface PublishPoemErrors {
  id?: string[]
}

export async function publishPoem(prevState: FormResult<PublishPoemErrors>, formData: FormData): Promise<FormResult<PublishPoemErrors>> {
  const validation = publishPoemSchema.safeParse({ id: formData.get('id') })

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Failed validation',
    }
  }

  const { id } = validation.data

  try {
    await prisma.poem.update({
      where: {
        id: id,
      },
      data: {
        published: true,
      }
    })
  } catch (error) {
    console.error('Database error:', error)
    return { message: 'Database error' }
  }

  redirect('/admin')
}

const unpublishPoemSchema = z.object({ id: z.string() })

interface UnpublishPoemErrors {
  id?: string[]
}

export async function unpublishPoem(prevState: FormResult<UnpublishPoemErrors>, formData: FormData): Promise<FormResult<UnpublishPoemErrors>> {
  const validation = unpublishPoemSchema.safeParse({ id: formData.get('id') })

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Failed validation',
    }
  }

  const { id } = validation.data

  try {
    await prisma.poem.update({
      where: {
        id: id,
      },
      data: {
        published: false,
      }
    })
  } catch (error) {
    console.error('Database error:', error)
    return { message: 'Database error' }
  }

  redirect('/admin')
}
