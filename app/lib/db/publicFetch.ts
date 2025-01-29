'use server';

import { prisma } from '@/app/lib/prisma';
import { FetchResult } from '@/app/lib/util/db';

type PoemPageData = {
  allPoems: {
    id: string;
    title: string;
    date: Date;
    precedence: number;
  }[];
  thisPoem: {
    id: string;
    title: string;
    content: string;
    justifyDirection: 'START' | 'CENTER' | 'END';
    date: Date;
  }
};

export async function fetchPoemPageData(id: string): Promise<FetchResult<PoemPageData>> {

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
    });

    const thisPoemQuery = prisma.poem.findUnique({
      where: {
        id: id,
        published: true,
      }
    });

    const [allPoems, thisPoem] = await Promise.all([allPoemsQuery, thisPoemQuery]);

    if (thisPoem === null) {
      return { type: 'error', message: 'Not found' };
    }

    return {
      type: 'success',
      content: {
        allPoems: allPoems.map(poem => (
          {
            id: poem.id,
            title: poem.title,
            date: poem.date,
            precedence: poem.precedence,
          }
        )),
        thisPoem: {
          id: thisPoem.id,
          title: thisPoem.title,
          content: thisPoem.content,
          justifyDirection: thisPoem.justifyDirection,
          date: thisPoem.date,
        },
      },
    };

  } catch (error) {
    console.error('Database error:', error);
    return { type: 'error', message: 'Database error', };
  }
}

export async function fetchLatestPoem(): Promise<FetchResult<string>> {
  try {

    const allPoemsQuery = await prisma.poem.findFirst({
      select: {
        id: true
      },
      where: {
        published: true,
        deleted_on: null,
      },
      orderBy: [
        { date: 'desc' },
        { precedence: 'desc' },
      ]
    });

    if (allPoemsQuery === null) {
      return { type: 'error', message: 'Not found' };
    }

    return { type: 'success', content: allPoemsQuery.id };

  } catch (error) {
    console.error('Database error:', error);
    return { type: 'error', message: 'Database error' };
  }
}
