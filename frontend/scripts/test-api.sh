#!/bin/bash

# Test script for CEO of One API endpoints
# Make sure the development server is running: npm run dev

API_URL="http://localhost:3000/api"

echo "Testing CEO of One API Endpoints"
echo "================================"

# Test health endpoint
echo -e "\n1. Testing Health Check..."
curl -s "$API_URL/health" | jq '.'

# Test booking endpoint
echo -e "\n2. Testing Booking Submission..."
curl -s -X POST "$API_URL/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "challenge": "automation",
    "challengeDetails": "We need help automating our customer onboarding process",
    "preferredDate": "2024-02-01",
    "preferredTime": "14:00",
    "timezone": "America/New_York"
  }' | jq '.'

# Test subscription endpoint
echo -e "\n3. Testing Email Subscription..."
curl -s -X POST "$API_URL/subscribe" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "subscriber@example.com",
    "source": "test-script",
    "tags": ["automation", "productivity"]
  }' | jq '.'

# Test analytics endpoint
echo -e "\n4. Testing Analytics Tracking..."
curl -s -X POST "$API_URL/analytics" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "api_test",
    "category": "testing",
    "properties": {
      "source": "test-script",
      "version": "1.0"
    }
  }' | jq '.'

# Test batch analytics
echo -e "\n5. Testing Batch Analytics..."
curl -s -X POST "$API_URL/analytics" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "event": "page_view",
      "category": "navigation",
      "properties": {"page": "/"}
    },
    {
      "event": "button_click",
      "category": "engagement",
      "properties": {"button": "hero-cta"}
    }
  ]' | jq '.'

# Test validation errors
echo -e "\n6. Testing Validation Error Handling..."
curl -s -X POST "$API_URL/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "T",
    "email": "invalid-email",
    "company": ""
  }' | jq '.'

# Test CORS preflight
echo -e "\n7. Testing CORS Preflight..."
curl -s -X OPTIONS "$API_URL/bookings" \
  -H "Origin: http://example.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v 2>&1 | grep -E "(< Access-Control-|< HTTP)"

echo -e "\n\nAll tests completed!"