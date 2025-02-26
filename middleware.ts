import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { isAuthenticated, getAccessToken } = getKindeServerSession();

    // redirect not logged in users to log in
    if (!await isAuthenticated()) {
      return NextResponse.redirect(new URL('/api/auth/login', request.url));
    }

    // redirect non admins to log out
    const isAdmin = (await getAccessToken())?.permissions.includes('admin_permission');
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/api/auth/logout', request.url))
    }
  }
}
