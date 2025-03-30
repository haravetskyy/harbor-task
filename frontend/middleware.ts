import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('magic-hut.session_token');

  if (!isAuthenticated) {
    const redirectUrl = encodeURIComponent(request.url);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_MAGIC_HUT_URL}/sign-in?redirectUrl=${redirectUrl}`,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
