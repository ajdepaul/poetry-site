import 'server-only';

import { FetchResult } from "@/app/lib/fetch/fetchTypes";
import { prisma } from "@/app/lib/prisma";
import { PoemData } from '@/app/util/poemData';

type AdminPageData = {
  poemCount: number;
  poems: {
    title: string;
    date: Date;
    published: boolean;
    id: string;
  }[];
};

export async function fetchPoems(page: number, pageSize: number): Promise<FetchResult<AdminPageData>> {
  try {
    const poemCountQuery = prisma.poem.count({
      where: { deleted_on: null }
    });

    const poemPageQuery = prisma.poem.findMany({
      skip: page * pageSize,
      take: pageSize,
      select: {
        title: true,
        date: true,
        published: true,
        id: true
      },
      where: { deleted_on: null },
      orderBy: [
        { date: 'desc' },
        { precedence: 'desc' }
      ]
    });

    const [poemCount, poems] = await Promise.all([poemCountQuery, poemPageQuery]);

    return { type: 'success', result: { poemCount, poems } };

  } catch (error) {
    console.error('Database error:', error);
    return { type: 'error', message: 'Database error' };
  }
}

export async function fetchPoem(id: string): Promise<FetchResult<PoemData>> {
  try {
    const result = await prisma.poem.findUnique({
      select: {
        title: true,
        content: true,
        justifyDirection: true,
        date: true,
        published: true,
        precedence: true
      },
      where: { id: id }
    });

    if (result === null) {
      return { type: 'error', message: 'Not found' };
    }

    return { type: 'success', result };

  } catch (error) {
    console.error('Database error:', error);
    return { type: 'error', message: 'Database error' };
  }
}

type TrashPageData = {
  poemCount: number;
  poems: {
    title: string;
    date: Date;
    id: string;
  }[];
};

export async function fetchTrashPoems(page: number, pageSize: number): Promise<FetchResult<TrashPageData>> {
  try {
    const poemCountQuery = prisma.poem.count({
      where: { deleted_on: { not: null } }
    });

    const poemPageQuery = prisma.poem.findMany({
      skip: page * pageSize,
      take: pageSize,
      select: {
        title: true,
        date: true,
        id: true
      },
      where: { deleted_on: { not: null } },
      orderBy: [
        { date: 'asc' },
        { precedence: 'desc' }
      ]
    });

    const [poemCount, poems] = await Promise.all([poemCountQuery, poemPageQuery]);

    return { type: 'success', result: { poemCount, poems } };

  } catch (error) {
    console.error('Database error:', error);
    return { type: 'error', message: 'Database error' };
  }
}
