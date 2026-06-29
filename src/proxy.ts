import { NextResponse } from 'next/server'
import { auth } from '../src/server/auth'

export async function proxy(request: any) {
  const { pathname } = request.nextUrl

  const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/register']

  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const session = await auth()

  if (!session?.user) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}