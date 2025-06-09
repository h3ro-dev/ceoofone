import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import { withMiddleware } from '@/lib/api/middleware';
import { validateRequest, bookingSchema, formatZodErrors } from '@/lib/api/validation';
import { ValidationError } from '@/lib/api/errors';
import { env } from '@/lib/env';

/**
 * Booking submission endpoint
 * POST /api/bookings
 */
export const POST = withMiddleware(
  async (req: NextRequest) => {
    try {
      // Parse request body
      const body = await req.json();

      // Validate request data
      const validation = await validateRequest(body, bookingSchema);
      
      if (!validation.success) {
        throw new ValidationError(
          'Invalid booking data',
          formatZodErrors(validation.errors)
        );
      }

      const bookingData = validation.data;

      // Generate booking ID
      const bookingId = `BOOK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Log booking data (in production, save to database)
      const bookingRecord = {
        id: bookingId,
        ...bookingData,
        submittedAt: new Date().toISOString(),
        ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
        status: 'pending',
      };

      console.log('New booking received:', bookingRecord);

      // TODO: Production integrations
      // 1. Save to database (Supabase)
      // 2. Send confirmation email
      // 3. Create calendar event
      // 4. Send notification to admin
      // 5. Add to CRM
      // 6. Track analytics event

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Return success response
      return successResponse({
        bookingId,
        message: 'Booking submitted successfully',
        booking: {
          name: bookingData.name,
          email: bookingData.email,
          company: bookingData.company,
          scheduledFor: `${bookingData.preferredDate} at ${bookingData.preferredTime} (${bookingData.timezone})`,
        },
        nextSteps: [
          'You will receive a confirmation email shortly',
          'Our team will review your submission within 24 hours',
          'You will receive a calendar invite once confirmed',
        ],
      }, 201);

    } catch (error) {
      // Error is handled by middleware
      throw error;
    }
  },
  {
    rateLimit: 'booking', // 10 requests per minute
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