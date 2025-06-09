import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import { withMiddleware } from '@/lib/api/middleware';
import { validateRequest, subscriptionSchema, formatZodErrors } from '@/lib/api/validation';
import { ValidationError } from '@/lib/api/errors';

/**
 * Email subscription endpoint
 * POST /api/subscribe
 */
export const POST = withMiddleware(
  async (req: NextRequest) => {
    try {
      // Parse request body
      const body = await req.json();

      // Validate request data
      const validation = await validateRequest(body, subscriptionSchema);
      
      if (!validation.success) {
        throw new ValidationError(
          'Invalid subscription data',
          formatZodErrors(validation.errors)
        );
      }

      const subscriptionData = validation.data;

      // Generate subscription ID
      const subscriptionId = `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Log subscription data (in production, save to database/email service)
      const subscriptionRecord = {
        id: subscriptionId,
        email: subscriptionData.email,
        source: subscriptionData.source || 'website',
        tags: subscriptionData.tags || ['newsletter'],
        subscribedAt: new Date().toISOString(),
        ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
        status: 'active',
        confirmed: false, // Will be true after email confirmation
      };

      console.log('New subscription:', subscriptionRecord);

      // TODO: Production integrations
      // 1. Save to database (Supabase)
      // 2. Add to email service (SendGrid, Mailchimp, ConvertKit, etc.)
      // 3. Send welcome/confirmation email
      // 4. Track analytics event
      // 5. Add to CRM if applicable

      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 300));

      // Return success response
      return successResponse({
        subscriptionId,
        message: 'Successfully subscribed to newsletter',
        email: subscriptionData.email,
        nextSteps: [
          'Check your email for confirmation',
          'Add our email to your contacts to ensure delivery',
          'Expect weekly insights on productivity and business automation',
        ],
      }, 201);

    } catch (error) {
      // Error is handled by middleware
      throw error;
    }
  },
  {
    rateLimit: 'subscription', // 5 requests per minute
  }
);

/**
 * Unsubscribe handler
 * DELETE /api/subscribe
 */
export const DELETE = withMiddleware(
  async (req: NextRequest) => {
    try {
      const { email, token } = await req.json();

      if (!email) {
        throw new ValidationError('Email is required');
      }

      // TODO: Verify unsubscribe token in production
      // This would typically be a signed token sent in emails

      console.log('Unsubscribe request:', { email, token });

      // TODO: Production implementation
      // 1. Verify token
      // 2. Update database
      // 3. Remove from email service
      // 4. Track analytics event

      return successResponse({
        message: 'Successfully unsubscribed',
        email,
      });

    } catch (error) {
      throw error;
    }
  },
  {
    rateLimit: 'subscription',
  }
);

/**
 * Method not allowed handler
 */
export const GET = withMiddleware(
  async () => {
    return errorResponse('Method not allowed', 405);
  },
  {
    rateLimit: false,
  }
);