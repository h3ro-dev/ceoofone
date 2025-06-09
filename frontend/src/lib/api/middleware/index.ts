import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '../errors';
import { errorResponse } from '../response';
import { applyCorsHeaders, getCorsHeaders, CorsOptions } from './cors';
import { applySecurityHeaders, SecurityHeaders } from './security';
import { checkRateLimit, getRateLimitHeaders, rateLimiters } from './rate-limit';

export interface MiddlewareOptions {
  cors?: CorsOptions | boolean;
  security?: SecurityHeaders | boolean;
  rateLimit?: keyof typeof rateLimiters | false;
}

/**
 * Wrap API route handler with middleware
 */
export function withMiddleware<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T,
  options: MiddlewareOptions = {}
): T {
  return (async (...args: Parameters<T>) => {
    const [req] = args as [NextRequest, ...any[]];
    
    try {
      // Handle CORS preflight
      if (req.method === 'OPTIONS') {
        const headers = getCorsHeaders(req, typeof options.cors === 'object' ? options.cors : {});
        return new NextResponse(null, { status: 200, headers });
      }
      
      // Check rate limit
      let rateLimitInfo: { limit?: number; remaining?: number; reset?: number } = {};
      if (options.rateLimit !== false) {
        rateLimitInfo = await checkRateLimit(req, options.rateLimit || 'general');
      }
      
      // Execute handler
      let response = await handler(...args);
      
      // Apply CORS headers
      if (options.cors !== false) {
        response = applyCorsHeaders(
          response,
          req,
          typeof options.cors === 'object' ? options.cors : {}
        );
      }
      
      // Apply security headers
      if (options.security !== false) {
        response = applySecurityHeaders(
          response,
          typeof options.security === 'object' ? options.security : {}
        );
      }
      
      // Apply rate limit headers
      const rateLimitHeaders = getRateLimitHeaders(
        rateLimitInfo.limit,
        rateLimitInfo.remaining,
        rateLimitInfo.reset
      );
      Object.entries(rateLimitHeaders).forEach(([key, value]) => {
        response.headers.set(key, value as string);
      });
      
      return response;
    } catch (error) {
      // Handle errors
      if (error instanceof ApiError) {
        return errorResponse(error, error.statusCode);
      }
      
      console.error('API Error:', error);
      return errorResponse(
        error instanceof Error ? error : new Error('Internal server error'),
        500
      );
    }
  }) as T;
}

export * from './cors';
export * from './security';
export * from './rate-limit';