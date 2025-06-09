import { NextRequest } from 'next/server';
import { healthResponse } from '@/lib/api/response';
import { withMiddleware } from '@/lib/api/middleware';
import { env } from '@/lib/env';

/**
 * Health check endpoint
 * GET /api/health
 */
export const GET = withMiddleware(
  async (req: NextRequest) => {
    // Check various system components
    const checks = {
      api: true,
      environment: env.NODE_ENV,
      version: env.API_VERSION,
      timestamp: new Date().toISOString(),
      features: {
        rateLimiting: !!env.UPSTASH_REDIS_REST_URL,
        database: !!env.SUPABASE_URL,
        email: !!env.EMAIL_SERVICE_API_KEY,
        analytics: !!env.NEXT_PUBLIC_GA_MEASUREMENT_ID || !!env.NEXT_PUBLIC_MIXPANEL_TOKEN,
      },
    };

    // You can add additional health checks here
    // For example, checking database connectivity, external services, etc.

    return healthResponse('healthy', checks);
  },
  {
    rateLimit: false, // No rate limiting for health checks
  }
);