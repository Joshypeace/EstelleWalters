import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Next.js 16 renamed `middleware` to `proxy`. This is a lightweight, fast
// redirect for unauthenticated visitors hitting the dashboard — it only checks
// for the presence of a session cookie. The authoritative role/approval checks
// live in the dashboard layout (auth()) and in protected tRPC procedures.
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/register']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next()
  }

  // Auth.js v5 session cookie name (dev vs. secure prod variant).
  const hasSession =
    request.cookies.has('authjs.session-token') ||
    request.cookies.has('__Secure-authjs.session-token')

  if (!hasSession) {
    const url = new URL('/admin/login', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
