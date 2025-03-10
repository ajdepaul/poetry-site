import 'server-only';

import { auth } from '@/auth';

async function checkIsAdmin(): Promise<boolean> {
  const session = await auth();
  if (session && session.user) {
    return true;
  } else {
    return false;
  }
}

export default checkIsAdmin;
