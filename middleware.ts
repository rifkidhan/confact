import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/events/addEvent:path*', '/:username'],
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const isSession =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token')
  if (isSession) {
    return NextResponse.next()
  }

  // if (url.pathname.startsWith('/auth') && isSession) {
  //   url
  // }

  const loginUrl = new URL('/auth', req.url)
  loginUrl.searchParams.set('from', url.pathname)
  return NextResponse.rewrite(loginUrl)
}
