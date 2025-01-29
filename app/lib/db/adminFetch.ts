import { FetchResult } from "@/app/lib/util/db"
import { prisma } from "@/app/lib/prisma"

interface AdminPageData {
  poemCount: number,
  poems: {
    title: string,
    date: Date,
    published: boolean,
    id: string,
  }[],
}

export async function fetchPoems(page: number, pageSize: number): Promise<FetchResult<AdminPageData>> {
  try {
    const poemCountQuery = prisma.poem.count({
      where: {
        deleted_on: null
      }
    })

    const poemPageQuery = prisma.poem.findMany({
      skip: page * pageSize,
      take: pageSize,
      select: {
        title: true,
        date: true,
        published: true,
        id: true,
      },
      where: {
        deleted_on: null
      },
      orderBy: [
        { date: 'desc' },
        { precedence: 'desc' },
      ]
    })

    const [poemCount, poems] = await Promise.all([poemCountQuery, poemPageQuery])

    return {
      content: {
        poemCount: poemCount,
        poems: poems,
      },
    }

  } catch (error) {
    console.error('Database error:', error)
    return {
      errorMsg: 'Database error',
    }
  }
}

interface PoemData {
  title: string,
  content: string,
  date: Date,
  published: boolean,
  precedence: number,
}

export async function fetchPoem(id: string): Promise<FetchResult<PoemData>> {
  try {
    const result = await prisma.poem.findUnique({
      select: {
        title: true,
        content: true,
        date: true,
        published: true,
        precedence: true,
      },
      where: {
        id: id,
      },
    })

    if (result === null) {
      return {
        errorMsg: 'Not found',
      }
    }

    return { content: result }
    
  } catch (error) {
    console.error('Database error:', error)
    return {
      errorMsg: 'Database error',
    }
  }
}

interface TrashPageData {
  poemCount: number,
  poems: {
    title: string,
    date: Date,
    id: string,
  }[],
}

export async function fetchTrashPoems(page: number, pageSize: number): Promise<FetchResult<TrashPageData>> {
  try {
    const poemCountQuery = prisma.poem.count({
      where: {
        deleted_on: { not: null }
      }
    })

    const poemPageQuery = prisma.poem.findMany({
      skip: page * pageSize,
      take: pageSize,
      select: {
        title: true,
        date: true,
        id: true
      },
      where: {
        deleted_on: { not: null }
      },
      orderBy: [
        { date: 'asc' },
        { precedence: 'desc' },
      ]
    })

    const [poemCount, poems] = await Promise.all([poemCountQuery, poemPageQuery])

    return {
      content: {
        poemCount: poemCount,
        poems: poems,
      },
    }

  } catch (error) {
    console.error('Database error:', error)
    return {
      errorMsg: 'Database error',
    }
  }
}
