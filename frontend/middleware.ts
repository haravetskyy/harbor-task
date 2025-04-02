import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const sessionCookie = request.cookies.get('magic-hut.session_token');

  if (!sessionCookie) {
    const redirectUrl = encodeURIComponent(request.url);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_MAGIC_HUT_URL}/sign-in?redirectUrl=${redirectUrl}`,
    );
  }

  const sessionResponse = await fetch(`${process.env.NEXT_PUBLIC_MAGIC_HUT_URL}api/auth/session`, {
    method: 'GET',
    headers: {
      Cookie: `magic-hut.session-token=${sessionCookie.value}`,
    },
  });

  if (!sessionResponse.ok) {
    const redirectUrl = encodeURIComponent(request.url);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_MAGIC_HUT_URL}/sign-in?redirectUrl=${redirectUrl}`,
    );
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/'],
};
