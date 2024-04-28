import { NextRequest, NextResponse } from 'next/server';

import { ADMIN_USER_ID } from '@/constants/values';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
};

const protectedPage = ['/admin'];

export function middleware(request: NextRequest) {
  const userId = String(request.cookies.get('userId')?.value);
  const currentPath = request.nextUrl.pathname;

  if (userId !== ADMIN_USER_ID && protectedPage.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';

    return NextResponse.redirect(url);
  }
}
