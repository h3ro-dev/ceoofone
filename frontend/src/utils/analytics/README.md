# Analytics Implementation

## Overview
This analytics implementation provides comprehensive tracking for the CEO of One landing page with Google Analytics 4, custom event tracking, and a monitoring dashboard.

## Features

### 1. Event Tracking
- **Page Views**: Automatic tracking with scroll depth
- **CTA Clicks**: Differentiated by location (header, hero, section)
- **Booking Modal**: Complete funnel tracking (open → start → submit)
- **Form Interactions**: Field focus/blur tracking
- **External Links**: Automatic tracking of outbound clicks
- **Time on Page**: Periodic updates and exit tracking

### 2. Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **API Response Times**: Automatic tracking with useAPITracking hook
- **Page Load Times**: Performance metrics collection

### 3. Conversion Tracking
- **Booking Form Submissions**: Full funnel analysis
- **Email Subscriptions**: Newsletter signups
- **Custom Conversions**: Flexible conversion tracking

### 4. Privacy Features
- **Cookie Consent**: GDPR-compliant consent banner
- **Do Not Track**: Respects browser DNT settings
- **Opt-out**: Users can disable tracking
- **Anonymous Mode**: Option for privacy-conscious users

## Setup

### 1. Environment Variables
```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Analytics Dashboard (optional)
ANALYTICS_API_KEY=your-secure-api-key-here
```

### 2. Google Analytics Setup
1. Create a GA4 property in Google Analytics
2. Get your Measurement ID (starts with G-)
3. Add to environment variables
4. Deploy and verify in GA4 real-time view

### 3. Analytics Dashboard
Access the analytics dashboard at `/analytics` with your API key.

Demo access: Use API key `demo-key` for testing.

## Usage

### Track Custom Events
```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

const { trackEvent } = useAnalytics();

// Track a custom event
trackEvent('video_play', {
  category: 'engagement',
  label: 'intro_video',
  value: 30 // seconds
});
```

### Track CTA Clicks
```typescript
const { trackCTAClick } = useAnalytics();

// In your component
<Button onClick={() => trackCTAClick('hero', 'Sign Up')}>
  Sign Up
</Button>
```

### Track Conversions
```typescript
const { trackConversion } = useAnalytics();

// After successful action
trackConversion('purchase', 99.99, {
  product: 'premium_plan',
  coupon: 'LAUNCH20'
});
```

## Dashboard Metrics

The analytics dashboard (`/analytics`) provides:

### Real-time Data
- Active users
- Recent events
- Live conversion tracking

### Visitor Analytics
- Total visitors
- Unique vs returning
- Page views per session

### Conversion Funnel
- Page View → CTA Click → Modal Open → Form Start → Submit
- Drop-off rates at each stage
- Conversion rate optimization insights

### Performance Metrics
- Core Web Vitals scores
- API response times
- Page load performance

## Best Practices

1. **Event Naming**: Use snake_case for consistency
2. **Categories**: navigation, engagement, conversion, error, performance
3. **Labels**: Be descriptive but concise
4. **Values**: Use numeric values for aggregation

## Privacy Compliance

### GDPR
- Explicit consent required before tracking
- Users can withdraw consent anytime
- No tracking without consent

### Data Minimization
- No PII in event tracking
- Session-based tracking only
- Automatic data expiration

## Troubleshooting

### Events Not Showing in GA4
1. Check Measurement ID is correct
2. Verify consent is granted
3. Use GA4 DebugView for testing
4. Check browser console for errors

### Dashboard Access Issues
1. Verify API key is correct
2. Check environment variables
3. Ensure route is accessible

## Future Enhancements

1. **Enhanced E-commerce**: Revenue tracking
2. **User Properties**: Segment analysis
3. **Custom Dimensions**: Business-specific metrics
4. **BigQuery Export**: Advanced analysis
5. **Real-time Alerts**: Anomaly detection