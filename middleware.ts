import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the route is /admin/editor or any sub-route of /admin except the login page
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
    const token = request.cookies.get('admin_token')
    
    // If there is no token, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  
  // If user visits /admin but is already logged in, redirect to editor
  if (request.nextUrl.pathname === '/admin') {
    const token = request.cookies.get('admin_token')
    if (token) {
      return NextResponse.redirect(new URL('/admin/editor', request.url))
    }
  }

  return NextResponse.next()
}

// Configure the paths where this middleware should run
export const config = {
  matcher: ['/admin/:path*'],
}
