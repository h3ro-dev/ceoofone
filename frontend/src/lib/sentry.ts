// Sentry configuration
// To enable Sentry:
// 1. Install: npm install @sentry/nextjs
// 2. Run: npx @sentry/wizard@latest -i nextjs
// 3. Add your SENTRY_DSN to .env.local

export const sentryConfig = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  
  // Environment
  environment: process.env.NODE_ENV,
  
  // Filtering
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    // Facebook errors
    'fb_xd_fragment',
    // Chrome extensions
    'chrome-extension://',
    'moz-extension://',
  ],
  
  denyUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
    // Firefox extensions
    /^moz-extension:\/\//i,
  ],
  
  beforeSend(event, hint) {
    // Filter out non-app errors
    if (event.exception) {
      const error = hint.originalException;
      // Add custom filtering logic here
    }
    return event;
  },
};