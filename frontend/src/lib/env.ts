import { z } from 'zod';

/**
 * Environment variable schema
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // API Configuration
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  API_VERSION: z.string().default('1.0.0'),
  
  // Rate limiting (Upstash Redis)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  
  // Database (Supabase - for future use)
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  
  // Email Service (for future use)
  EMAIL_SERVICE_API_KEY: z.string().optional(),
  EMAIL_FROM_ADDRESS: z.string().email().optional(),
  EMAIL_FROM_NAME: z.string().optional(),
  
  // Analytics (for future use)
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_MIXPANEL_TOKEN: z.string().optional(),
  ANALYTICS_API_KEY: z.string().optional(),
  
  // Security
  API_SECRET_KEY: z.string().optional(),
  ALLOWED_ORIGINS: z.string().optional(), // Comma-separated list
  
  // Feature flags
  ENABLE_RATE_LIMITING: z.boolean().default(true),
  ENABLE_ANALYTICS: z.boolean().default(true),
  ENABLE_EMAIL_NOTIFICATIONS: z.boolean().default(false),
});

/**
 * Parse and validate environment variables
 */
function parseEnv() {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      API_VERSION: process.env.API_VERSION,
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      EMAIL_SERVICE_API_KEY: process.env.EMAIL_SERVICE_API_KEY,
      EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
      EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
      NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
      ANALYTICS_API_KEY: process.env.ANALYTICS_API_KEY,
      API_SECRET_KEY: process.env.API_SECRET_KEY,
      ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
      ENABLE_RATE_LIMITING: process.env.ENABLE_RATE_LIMITING === 'true',
      ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === 'true',
      ENABLE_EMAIL_NOTIFICATIONS: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Invalid environment variables:', error.errors);
      throw new Error('Invalid environment variables');
    }
    throw error;
  }
}

export const env = parseEnv();

// Export type for TypeScript
export type Env = z.infer<typeof envSchema>;

/**
 * Get allowed origins from environment
 */
export function getAllowedOrigins(): string[] {
  if (!env.ALLOWED_ORIGINS) {
    // Default allowed origins
    return env.NODE_ENV === 'production'
      ? ['https://yourdomain.com'] // Replace with your actual domain
      : ['http://localhost:3000', 'http://localhost:3001'];
  }
  
  return env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: 'rateLimiting' | 'analytics' | 'emailNotifications'): boolean {
  switch (feature) {
    case 'rateLimiting':
      return env.ENABLE_RATE_LIMITING && !!env.UPSTASH_REDIS_REST_URL && !!env.UPSTASH_REDIS_REST_TOKEN;
    case 'analytics':
      return env.ENABLE_ANALYTICS && (!!env.NEXT_PUBLIC_GA_MEASUREMENT_ID || !!env.NEXT_PUBLIC_MIXPANEL_TOKEN);
    case 'emailNotifications':
      return env.ENABLE_EMAIL_NOTIFICATIONS && !!env.EMAIL_SERVICE_API_KEY;
    default:
      return false;
  }
}