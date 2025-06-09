# CEO of One API Documentation

## Overview

This is the API for the CEO of One website, built with Next.js 14 App Router. All endpoints follow RESTful conventions and return JSON responses.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://yourdomain.com/api`

## Authentication

Currently, the API is public. Future versions will implement JWT-based authentication for protected endpoints.

## Rate Limiting

Rate limiting is implemented using Upstash Redis. Different endpoints have different limits:

- **Bookings**: 10 requests per minute
- **Subscriptions**: 5 requests per minute
- **Analytics**: 100 requests per minute
- **General**: 60 requests per minute

Rate limit information is included in response headers:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Time when the limit resets

## Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": {} // Optional additional information
  },
  "meta": {
    "timestamp": "2024-01-20T12:00:00.000Z",
    "version": "1.0.0"
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR`: Invalid request data
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Endpoints

### Health Check

Check API status and configuration.

```
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "service": "CEO of One API",
    "details": {
      "api": true,
      "environment": "development",
      "version": "1.0.0",
      "timestamp": "2024-01-20T12:00:00.000Z",
      "features": {
        "rateLimiting": true,
        "database": false,
        "email": false,
        "analytics": true
      }
    }
  }
}
```

### Booking Submission

Submit a consultation booking request.

```
POST /api/bookings
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "challenge": "automation",
  "challengeDetails": "We need help automating our customer support workflow...",
  "preferredDate": "2024-01-25",
  "preferredTime": "14:00",
  "timezone": "America/New_York"
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `company`: Required, 1-200 characters
- `challenge`: Required
- `challengeDetails`: Required, 10-5000 characters
- `preferredDate`: Required, format YYYY-MM-DD
- `preferredTime`: Required, format HH:MM
- `timezone`: Required

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "bookingId": "BOOK-1705750800000-abc123def",
    "message": "Booking submitted successfully",
    "booking": {
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Acme Corp",
      "scheduledFor": "2024-01-25 at 14:00 (America/New_York)"
    },
    "nextSteps": [
      "You will receive a confirmation email shortly",
      "Our team will review your submission within 24 hours",
      "You will receive a calendar invite once confirmed"
    ]
  }
}
```

### Email Subscription

Subscribe to the newsletter.

```
POST /api/subscribe
```

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "source": "homepage",
  "tags": ["newsletter", "productivity"]
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `source`: Optional, source of subscription
- `tags`: Optional, array of tags

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "subscriptionId": "SUB-1705750800000-xyz789abc",
    "message": "Successfully subscribed to newsletter",
    "email": "subscriber@example.com",
    "nextSteps": [
      "Check your email for confirmation",
      "Add our email to your contacts to ensure delivery",
      "Expect weekly insights on productivity and business automation"
    ]
  }
}
```

### Unsubscribe

Unsubscribe from the newsletter.

```
DELETE /api/subscribe
```

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "token": "unsubscribe-token"
}
```

### Analytics Tracking

Track analytics events.

```
POST /api/analytics
```

**Single Event:**
```json
{
  "event": "page_view",
  "category": "navigation",
  "properties": {
    "page": "/solutions",
    "referrer": "https://google.com"
  },
  "sessionId": "session-123",
  "userId": "user-456"
}
```

**Batch Events:**
```json
[
  {
    "event": "page_view",
    "category": "navigation",
    "properties": { "page": "/" }
  },
  {
    "event": "button_click",
    "category": "engagement",
    "properties": { "button": "cta-hero" }
  }
]
```

**Validation Rules:**
- `event`: Required, event name
- `category`: Required, event category
- `properties`: Optional, additional event data
- `timestamp`: Optional, ISO 8601 format
- `sessionId`: Optional
- `userId`: Optional

**Success Response:**
```json
{
  "success": true,
  "data": {
    "message": "Analytics events tracked successfully",
    "processed": 2,
    "failed": 0
  }
}
```

### Get Analytics Configuration

Get public analytics configuration.

```
GET /api/analytics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "enabled": true,
    "providers": {
      "googleAnalytics": true,
      "mixpanel": false
    },
    "events": {
      "pageView": true,
      "userEngagement": true,
      "conversion": true,
      "custom": true
    },
    "categories": [
      "navigation",
      "engagement",
      "conversion",
      "error",
      "performance"
    ]
  }
}
```

## Security Headers

All API responses include security headers:

- `Content-Security-Policy`: Restricts resource loading
- `Strict-Transport-Security`: Enforces HTTPS
- `X-Content-Type-Options`: Prevents MIME sniffing
- `X-Frame-Options`: Prevents clickjacking
- `X-XSS-Protection`: XSS protection (legacy)
- `Referrer-Policy`: Controls referrer information
- `Permissions-Policy`: Controls browser features

## CORS

Cross-Origin Resource Sharing (CORS) is configured to allow:
- All origins in development
- Specific origins in production (configure in `.env`)
- Credentials are supported
- Preflight requests are handled automatically

## Testing

To test the API endpoints:

```bash
# Health check
curl http://localhost:3000/api/health

# Submit booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
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

# Subscribe to newsletter
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Track analytics event
curl -X POST http://localhost:3000/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "event": "test_event",
    "category": "testing",
    "properties": {"test": true}
  }'
```

## Environment Variables

See `.env.example` for required environment variables.

## Future Enhancements

1. **Authentication**: JWT-based auth for protected endpoints
2. **Database Integration**: Supabase for data persistence
3. **Email Service**: SendGrid/Resend for transactional emails
4. **Payment Processing**: Stripe integration
5. **Webhook Support**: For third-party integrations
6. **GraphQL API**: Alternative to REST
7. **API Versioning**: Support for multiple API versions
8. **OpenAPI Documentation**: Auto-generated API docs