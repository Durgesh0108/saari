// middleware/checkLoading.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const isLoading = request.cookies.get('isLoading');
  if (isLoading === 'true') {
    const response = NextResponse.next();
    response.headers.set('X-Loading', 'true');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
