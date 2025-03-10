import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
});

export const config = {
  matcher: ['/admin/:path*']
};
