/**
 * Database connection utilities
 * Prepared for Supabase integration
 */

import { env } from '@/lib/env';

export interface DatabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
}

/**
 * Get database configuration
 */
export function getDatabaseConfig(): DatabaseConfig | null {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    return null;
  }

  return {
    url: env.SUPABASE_URL,
    anonKey: env.SUPABASE_ANON_KEY,
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

/**
 * Check if database is configured
 */
export function isDatabaseConfigured(): boolean {
  return getDatabaseConfig() !== null;
}

// TODO: When ready to integrate Supabase:
// 1. npm install @supabase/supabase-js
// 2. Import and initialize Supabase client
// 3. Create database schema
// 4. Implement CRUD operations

/**
 * Example Supabase integration (uncomment when ready):
 * 
 * import { createClient } from '@supabase/supabase-js';
 * 
 * const config = getDatabaseConfig();
 * 
 * export const supabase = config
 *   ? createClient(config.url, config.anonKey)
 *   : null;
 * 
 * export const supabaseAdmin = config && config.serviceRoleKey
 *   ? createClient(config.url, config.serviceRoleKey)
 *   : null;
 */

/**
 * Database tables interface (for type safety)
 */
export interface Database {
  bookings: {
    id: string;
    name: string;
    email: string;
    company: string;
    challenge: string;
    challengeDetails: string;
    preferredDate: string;
    preferredTime: string;
    timezone: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
  };
  
  subscriptions: {
    id: string;
    email: string;
    source: string;
    tags: string[];
    status: 'active' | 'unsubscribed';
    confirmed: boolean;
    subscribedAt: string;
    unsubscribedAt?: string;
  };
  
  analytics: {
    id: string;
    event: string;
    category: string;
    properties: Record<string, any>;
    sessionId?: string;
    userId?: string;
    timestamp: string;
    metadata: {
      ipAddress: string;
      userAgent: string;
      referer: string;
    };
  };
}