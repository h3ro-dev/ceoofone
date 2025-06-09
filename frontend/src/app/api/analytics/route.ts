import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import { withMiddleware } from '@/lib/api/middleware';
import { validateRequest, analyticsEventSchema, formatZodErrors } from '@/lib/api/validation';
import { ValidationError } from '@/lib/api/errors';

/**
 * Analytics tracking endpoint
 * POST /api/analytics
 */
export const POST = withMiddleware(
  async (req: NextRequest) => {
    try {
      // Parse request body
      const body = await req.json();

      // Handle batch events
      const events = Array.isArray(body) ? body : [body];
      const validatedEvents = [];
      const errors = [];

      // Validate each event
      for (let i = 0; i < events.length; i++) {
        const validation = await validateRequest(events[i], analyticsEventSchema);
        
        if (validation.success) {
          validatedEvents.push({
            ...validation.data,
            timestamp: validation.data.timestamp || new Date().toISOString(),
            eventId: `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          });
        } else {
          errors.push({
            index: i,
            errors: formatZodErrors(validation.errors),
          });
        }
      }

      // If all events failed validation, throw error
      if (validatedEvents.length === 0 && errors.length > 0) {
        throw new ValidationError('Invalid analytics data', errors);
      }

      // Enrich events with request metadata
      const enrichedEvents = validatedEvents.map(event => ({
        ...event,
        metadata: {
          ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
          userAgent: req.headers.get('user-agent') || 'unknown',
          referer: req.headers.get('referer') || 'direct',
          receivedAt: new Date().toISOString(),
        },
      }));

      console.log('Analytics events received:', enrichedEvents);

      // TODO: Production integrations
      // 1. Send to Google Analytics 4
      // 2. Send to Mixpanel
      // 3. Save to database for custom analytics
      // 4. Stream to data warehouse (BigQuery, Snowflake, etc.)
      // 5. Trigger real-time notifications if needed

      // Return success response
      return successResponse({
        message: 'Analytics events tracked successfully',
        processed: validatedEvents.length,
        failed: errors.length,
        ...(errors.length > 0 && { errors }),
      });

    } catch (error) {
      // Error is handled by middleware
      throw error;
    }
  },
  {
    rateLimit: 'analytics', // 100 requests per minute
  }
);

/**
 * Get analytics configuration
 * GET /api/analytics
 */
export const GET = withMiddleware(
  async (req: NextRequest) => {
    // Return public analytics configuration
    // This can be used by frontend to know what to track
    return successResponse({
      enabled: true,
      providers: {
        googleAnalytics: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
        mixpanel: !!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
      },
      events: {
        pageView: true,
        userEngagement: true,
        conversion: true,
        custom: true,
      },
      categories: [
        'navigation',
        'engagement',
        'conversion',
        'error',
        'performance',
      ],
    });
  },
  {
    rateLimit: false,
  }
);