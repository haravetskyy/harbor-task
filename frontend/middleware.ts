import { NextRequest, NextResponse } from 'next/server';

const redirectToSignIn = (redirectUrl: string): NextResponse => {
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_MAGIC_HUT_URL}/sign-in`);

  response.cookies.set('magic-hut.redirectUrl', redirectUrl, {
    path: '/',
    maxAge: 3600,
    httpOnly: false,
  });

  return response;
};

export const middleware = async (request: NextRequest) => {
  const sessionCookie = request.cookies.get('magic-hut.session_token');

  if (!sessionCookie) {
    return redirectToSignIn(request.url);
  }

  const sessionResponse = await fetch(`${process.env.NEXT_PUBLIC_MAGIC_HUT_URL}api/auth/session`, {
    method: 'GET',
    headers: {
      Cookie: `magic-hut.session-token=${sessionCookie.value}`,
    },
  });

  if (!sessionResponse.ok) {
    return redirectToSignIn(request.url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/'],
};
