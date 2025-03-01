'use server';

import 'server-only';

import { Action } from '@/app/lib/actions/actionTypes';
import { prisma } from '@/app/lib/prisma';
import isAdmin from '@/app/util/isAdmin';
import { nanoid } from '@/app/util/nanoid';
import { PoemData } from '@/app/util/poemData';

type AdminActionType = <A, R>(action: Action<A, R>) => Action<A, R>;

const adminAction: AdminActionType = <A, R>(action: Action<A, R>) => async (args: A) => {
  if (!isAdmin()) { return { type: 'error', message: 'Unauthorized' }; }
  return action(args);
};

const trashPoem = adminAction<string, string>(async (id: string) => {
  try {
    await prisma.poem.update({
      where: { id },
      data: {
        published: false,
        deleted_on: new Date(),
      }
    });
  } catch (error) {
    console.error('Database Error:', error);
    return { type: 'error', message: 'Database Error' };
  }

  return { type: 'success', result: 'Poem moved to trash successfully' };
});

const restorePoem = adminAction<string, string>(async (id: string) => {
  try {
    await prisma.poem.update({
      where: { id },
      data: {
        published: false,
        deleted_on: null
      }
    });
  } catch (error) {
    console.error('Database Error:', error);
    return { type: 'error', message: 'Database Error' };
  }

  return { type: 'success', result: 'Poem restored successfully' };
});

const publishPoem = adminAction<{ id: string, action: 'publish' | 'unpublish' }, string>(async ({ id, action }) => {
  try {
    await prisma.poem.update({
      where: { id },
      data: {
        published: action === 'publish',
        deleted_on: null
      }
    });
  } catch (error) {
    console.error('Database Error:', error);
    return { type: 'error', message: 'Database Error' };
  }

  return { type: 'success', result: `Poem ${action}ed successfully` };
});

const editPoem = adminAction<{ id: string, poemData: PoemData }, string>(async ({ id, poemData }) => {
  try {
    await prisma.poem.update({
      where: { id },
      data: { ...poemData }
    });
  } catch (error) {
    console.error('Database Error:', error);
    return { type: 'error', message: 'Database Error' };
  }

  return { type: 'success', result: 'Poem updated successfully' };
});

const deletePoem = adminAction<string, string>(async (id: string) => {
  try {
    await prisma.poem.delete({ where: { id: id } });
  } catch (error) {
    console.error('Database Error:', error);
    return { type: 'error', message: 'Database Error' };
  }

  return { type: 'success', result: 'Poem deleted successfully' };
});

const newPoem = adminAction<PoemData, string>(async (poemData) => {
  try {
    await prisma.poem.create({
      data: {
        id: nanoid(),
        ...poemData
      }
    });
  } catch (error) {
    console.error('Database Error:', error);
    return { type: 'error', message: 'Database Error' };
  }

  return { type: 'success', result: 'Poem created successfully' };
});

export { deletePoem, editPoem, newPoem, publishPoem, restorePoem, trashPoem };

