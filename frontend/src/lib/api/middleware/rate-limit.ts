import { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { RateLimitError } from '../errors';

// Initialize Redis client
// For local development, you can use memory storage
// For production, use Upstash Redis with environment variables
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Rate limit configurations for different endpoints
export const rateLimiters = {
  // Booking endpoint: 10 requests per minute
  booking: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '1 m'),
        analytics: true,
        prefix: 'ratelimit:booking',
      })
    : null,

  // Subscription endpoint: 5 requests per minute
  subscription: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '1 m'),
        analytics: true,
        prefix: 'ratelimit:subscription',
      })
    : null,

  // Analytics endpoint: 100 requests per minute
  analytics: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, '1 m'),
        analytics: true,
        prefix: 'ratelimit:analytics',
      })
    : null,

  // General API: 60 requests per minute
  general: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(60, '1 m'),
        analytics: true,
        prefix: 'ratelimit:general',
      })
    : null,
};

/**
 * Get client identifier from request
 */
function getClientId(req: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  
  // Use the first available IP or fallback to a default
  const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'anonymous';
  
  return ip;
}

/**
 * Rate limit middleware
 */
export async function rateLimit(
  req: NextRequest,
  limiterName: keyof typeof rateLimiters = 'general'
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  const limiter = rateLimiters[limiterName];
  
  // If rate limiting is not configured (e.g., in development), allow all requests
  if (!limiter) {
    return { success: true };
  }

  const clientId = getClientId(req);
  
  try {
    const { success, limit, reset, remaining } = await limiter.limit(clientId);
    
    return {
      success,
      limit,
      remaining,
      reset,
    };
  } catch (error) {
    // If rate limiting fails, allow the request but log the error
    console.error('Rate limiting error:', error);
    return { success: true };
  }
}

/**
 * Rate limit headers to include in response
 */
export function getRateLimitHeaders(
  limit?: number,
  remaining?: number,
  reset?: number
): HeadersInit {
  const headers: HeadersInit = {};
  
  if (limit !== undefined) {
    headers['X-RateLimit-Limit'] = limit.toString();
  }
  
  if (remaining !== undefined) {
    headers['X-RateLimit-Remaining'] = remaining.toString();
  }
  
  if (reset !== undefined) {
    headers['X-RateLimit-Reset'] = new Date(reset).toISOString();
  }
  
  return headers;
}

/**
 * Check rate limit and throw error if exceeded
 */
export async function checkRateLimit(
  req: NextRequest,
  limiterName: keyof typeof rateLimiters = 'general'
): Promise<{ limit?: number; remaining?: number; reset?: number }> {
  const result = await rateLimit(req, limiterName);
  
  if (!result.success) {
    const retryAfter = result.reset ? Math.ceil((result.reset - Date.now()) / 1000) : 60;
    throw new RateLimitError('Too many requests. Please try again later.', retryAfter);
  }
  
  return {
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}