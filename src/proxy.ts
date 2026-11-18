import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const STATIC_ASSET_PATTERN =
  /\.(?:pdf|svg|png|jpe?g|webp|gif|ico|wasm|js|css|woff2?|splinecode|txt|xml)$/i;

/**
 * Next.js 16 Proxy — enforces clean RFC-compliant HTTP method handling on
 * static public files so unsupported methods (POST/PUT/PATCH/DELETE) return
 * 405 Method Not Allowed instead of triggering a 500 Internal Server Error.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();

  if (STATIC_ASSET_PATTERN.test(pathname)) {
    if (method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          Allow: 'GET, HEAD, OPTIONS',
        },
      });
    }

    if (method !== 'GET' && method !== 'HEAD') {
      return new NextResponse('Method Not Allowed', {
        status: 405,
        headers: {
          Allow: 'GET, HEAD, OPTIONS',
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image).*)',
  ],
};
