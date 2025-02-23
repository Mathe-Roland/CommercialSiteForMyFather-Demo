import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname === '/robots.txt') {
    return NextResponse.rewrite(new URL('/api/robots', request.url));
  }
  if (request.nextUrl.pathname === '/sitemap.xml') {
    return NextResponse.rewrite(new URL('/api/sitemap', request.url));
  }
}

export const config = {
  matcher: ['/robots.txt', '/sitemap.xml'],
};
