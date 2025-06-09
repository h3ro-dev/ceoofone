import { z } from 'zod';

/**
 * Common validation schemas
 */

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// Common field schemas
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters');
export const companySchema = z.string().min(1, 'Company name is required').max(200, 'Company name must be less than 200 characters');
export const messageSchema = z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be less than 5000 characters');

// Date and time schemas
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)');
export const timeSchema = z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)');
export const timezoneSchema = z.string().min(1, 'Timezone is required');

// Booking schema
export const bookingSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  company: companySchema,
  challenge: z.string().min(1, 'Challenge type is required'),
  challengeDetails: messageSchema,
  preferredDate: dateSchema,
  preferredTime: timeSchema,
  timezone: timezoneSchema,
});

// Email subscription schema
export const subscriptionSchema = z.object({
  email: emailSchema,
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Analytics event schema
export const analyticsEventSchema = z.object({
  event: z.string().min(1, 'Event name is required'),
  category: z.string().min(1, 'Category is required'),
  properties: z.record(z.any()).optional(),
  timestamp: z.string().datetime().optional(),
  sessionId: z.string().optional(),
  userId: z.string().optional(),
});

// Type exports
export type BookingData = z.infer<typeof bookingSchema>;
export type SubscriptionData = z.infer<typeof subscriptionSchema>;
export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

/**
 * Validate request data against a schema
 */
export async function validateRequest<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; errors: z.ZodError }> {
  try {
    const validatedData = await schema.parseAsync(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

/**
 * Format Zod errors for API response
 */
export function formatZodErrors(errors: z.ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};
  
  errors.errors.forEach((error) => {
    const path = error.path.join('.');
    if (!formatted[path]) {
      formatted[path] = [];
    }
    formatted[path].push(error.message);
  });
  
  return formatted;
}