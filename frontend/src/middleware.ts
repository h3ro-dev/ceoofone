import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSecurityHeaders } from '@/lib/api/middleware/security';

/**
 * Global middleware for all routes
 * Applies to all requests before they reach route handlers
 */
export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Add request ID for tracking
  const requestId = crypto.randomUUID();
  requestHeaders.set('x-request-id', requestId);
  
  // Create response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // Apply security headers to all responses
  const securityHeaders = getSecurityHeaders();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value as string);
  });
  
  // Add request ID to response headers for debugging
  response.headers.set('x-request-id', requestId);
  
  // Log requests in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url} [${requestId}]`);
  }
  
  return response;
}

/**
 * Configure which routes the middleware applies to
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};