'use server'

import { prisma } from '@/app/lib/prisma'
import { FetchResult } from '@/app/lib/util/db'

interface PoemPageData {
  allPoems: {
    title: string,
    date: Date,
    precedence: number,
  }[],
  thisPoem: {
    id: string,
    title: string,
    poem: string,
    date: Date,
  }
}

export async function fetchPoemPageData(title: string): Promise<FetchResult<PoemPageData>> {

  try {

    const allPoemsQuery = prisma.poem.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        precedence: true,
      },
      where: {
        published: true,
        deleted_on: null,
      },
      orderBy: [
        { date: 'asc' },
        { precedence: 'asc' }
      ]
    })

    const thisPoemQuery = prisma.poem.findUnique({
      where: {
        title: title,
        published: true,
      }
    })

    const [allPoems, thisPoem] = await Promise.all([allPoemsQuery, thisPoemQuery])

    if (thisPoem === null) {
      return { errorMsg: 'Not found', }
    }

    return {
      content: {
        allPoems: allPoems.map(poem => (
          {
            title: poem.title,
            date: poem.date,
            precedence: poem.precedence,
          }
        )),
        thisPoem: {
          id: thisPoem.id,
          title: thisPoem.title,
          poem: thisPoem.content,
          date: thisPoem.date,
        },
      },
    }

  } catch (error) {
    console.error('Database error:', error)
    return { errorMsg: 'Database error', }
  }
}

export async function fetchLatestPoem(): Promise<FetchResult<string>> {
  try {

    const allPoemsQuery = await prisma.poem.findFirst({
      select: {
        title: true
      },
      where: {
        published: true,
        deleted_on: null,
      },
      orderBy: [
        { date: 'desc' },
        {precedence: 'desc' },
      ]
    })

    if (allPoemsQuery === null) {
      return { errorMsg: 'Not found' }
    }

    return {
      content: allPoemsQuery.title
    }

  } catch (error) {
    console.error('Database error:', error)
    return { errorMsg: 'Database error' }
  }
}
