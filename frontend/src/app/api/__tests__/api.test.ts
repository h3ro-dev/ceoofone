/**
 * API Route Tests
 * 
 * This file demonstrates how to test Next.js API routes.
 * To run tests, you'll need to set up a testing framework like Jest.
 * 
 * Installation:
 * npm install --save-dev jest @testing-library/jest-dom @testing-library/react jest-environment-jsdom
 * 
 * Create jest.config.js and set up test environment
 */

import { NextRequest } from 'next/server';

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.UPSTASH_REDIS_REST_URL = '';
process.env.UPSTASH_REDIS_REST_TOKEN = '';

// Example test structure (uncomment when Jest is set up)
/*
import { GET as healthGET } from '../health/route';
import { POST as bookingPOST } from '../bookings/route';
import { POST as subscribePOST } from '../subscribe/route';
import { POST as analyticsPOST } from '../analytics/route';

describe('API Routes', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await healthGET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.status).toBe('healthy');
    });
  });

  describe('POST /api/bookings', () => {
    it('should accept valid booking data', async () => {
      const bookingData = {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        challenge: 'automation',
        challengeDetails: 'Need help with automating our processes',
        preferredDate: '2024-01-25',
        preferredTime: '14:00',
        timezone: 'UTC'
      };

      const request = new NextRequest('http://localhost:3000/api/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });

      const response = await bookingPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.bookingId).toBeDefined();
    });

    it('should reject invalid booking data', async () => {
      const invalidData = {
        name: 'T', // Too short
        email: 'invalid-email',
        // Missing required fields
      };

      const request = new NextRequest('http://localhost:3000/api/bookings', {
        method: 'POST',
        body: JSON.stringify(invalidData),
      });

      const response = await bookingPOST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/subscribe', () => {
    it('should accept valid email subscription', async () => {
      const subscriptionData = {
        email: 'subscriber@example.com',
        source: 'test'
      };

      const request = new NextRequest('http://localhost:3000/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscriptionData),
      });

      const response = await subscribePOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.subscriptionId).toBeDefined();
    });
  });

  describe('POST /api/analytics', () => {
    it('should track single event', async () => {
      const event = {
        event: 'test_event',
        category: 'testing',
        properties: { test: true }
      };

      const request = new NextRequest('http://localhost:3000/api/analytics', {
        method: 'POST',
        body: JSON.stringify(event),
      });

      const response = await analyticsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.processed).toBe(1);
    });

    it('should track batch events', async () => {
      const events = [
        { event: 'event1', category: 'test' },
        { event: 'event2', category: 'test' }
      ];

      const request = new NextRequest('http://localhost:3000/api/analytics', {
        method: 'POST',
        body: JSON.stringify(events),
      });

      const response = await analyticsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.processed).toBe(2);
    });
  });
});
*/

/**
 * Manual Testing Commands
 * Run these in your terminal to test the API
 */

export const testCommands = {
  health: `
    curl http://localhost:3000/api/health
  `,
  
  booking: `
    curl -X POST http://localhost:3000/api/bookings \\
      -H "Content-Type: application/json" \\
      -d '{
        "name": "Test User",
        "email": "test@example.com",
        "company": "Test Company",
        "challenge": "automation",
        "challengeDetails": "Testing the booking system with a detailed description",
        "preferredDate": "2024-01-25",
        "preferredTime": "14:00",
        "timezone": "UTC"
      }'
  `,
  
  subscribe: `
    curl -X POST http://localhost:3000/api/subscribe \\
      -H "Content-Type: application/json" \\
      -d '{"email": "test@example.com", "source": "api-test"}'
  `,
  
  unsubscribe: `
    curl -X DELETE http://localhost:3000/api/subscribe \\
      -H "Content-Type: application/json" \\
      -d '{"email": "test@example.com", "token": "test-token"}'
  `,
  
  analytics: `
    curl -X POST http://localhost:3000/api/analytics \\
      -H "Content-Type: application/json" \\
      -d '{
        "event": "api_test",
        "category": "testing",
        "properties": {"source": "curl", "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
      }'
  `,
  
  analyticsBatch: `
    curl -X POST http://localhost:3000/api/analytics \\
      -H "Content-Type: application/json" \\
      -d '[
        {"event": "test1", "category": "testing"},
        {"event": "test2", "category": "testing", "properties": {"batch": true}}
      ]'
  `,
  
  rateLimitTest: `
    # Run this to test rate limiting (will make 15 requests quickly)
    for i in {1..15}; do
      echo "Request $i:"
      curl -X POST http://localhost:3000/api/bookings \\
        -H "Content-Type: application/json" \\
        -d '{"name": "Rate Limit Test", "email": "test@example.com", "company": "Test", "challenge": "test", "challengeDetails": "Testing rate limits", "preferredDate": "2024-01-25", "preferredTime": "14:00", "timezone": "UTC"}' \\
        -w "\\nStatus: %{http_code}\\n\\n"
      sleep 0.1
    done
  `
};

// Export test utilities
export function createMockRequest(
  url: string,
  options: RequestInit = {}
): NextRequest {
  return new NextRequest(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}

export async function parseResponse(response: Response) {
  const data = await response.json();
  return {
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    data,
  };
}