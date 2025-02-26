import 'server-only';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

async function isAdmin() {
  const { isAuthenticated, getAccessToken } = getKindeServerSession();
  if (!await isAuthenticated()) { return false; }
  const accessToken = await getAccessToken();
  return accessToken?.permissions.includes('admin_permission') ?? false;
}

export default isAdmin;
