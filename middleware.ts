import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

// Define which routes are protected (require authentication)
const protectedRoutes = [
  '/dashboard',
  '/tests/builder',
  '/tests/[id]/take',
  '/resources/bookmarks',
  '/profile',
]

// Define which routes are admin-only
const adminRoutes = [
  '/admin',
]

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const pathname = request.nextUrl.pathname

  // Check if it's a protected route and not authenticated
  const isProtectedRoute = protectedRoutes.some(route => {
    // Handle dynamic routes like /tests/[id]/take
    if (route.includes('[id]')) {
      const pattern = route.replace('[id]', '\\w+')
      const regex = new RegExp(`^${pattern}$`)
      return regex.test(pathname)
    }
    return pathname === route || pathname.startsWith(`${route}/`)
  })

  // Check for admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))

  // If it's an auth route and already logged in, redirect to dashboard
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If it's a protected route and not logged in
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // If it's an admin route and not an admin
  if (isAdminRoute && (!token || (token as any).role !== 'admin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/tests/builder/:path*',
    '/tests/:path*/take',
    '/resources/bookmarks/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
} 