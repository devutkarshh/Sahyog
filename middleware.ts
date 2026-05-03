import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Skip middleware for public routes
  const publicRoutes = ["/", "/api/auth/login", "/api/auth/register", "/api/pharmacy/medicines", "/login", "/register"]
  const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check for authentication token in cookies
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // For now, just check if token exists - JWT verification happens in API routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/patient/:path*",
    "/doctor/:path*",
    "/consultation/:path*",
    "/health-records/:path*",
    "/api/appointments/:path*",
    "/api/health-records/:path*",
    "/api/video-consultation/:path*",
    "/api/notifications/:path*",
  ],
}
