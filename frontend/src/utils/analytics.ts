/* eslint-disable @typescript-eslint/no-explicit-any */
// Analytics utility for Google Analytics 4 and custom event tracking

declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
  }
}

// Google Analytics measurement ID (replace with your actual ID)
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Analytics event names
export const ANALYTICS_EVENTS = {
  // Page tracking
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',

  // CTA tracking
  CTA_CLICK: 'cta_click',
  HEADER_CTA_CLICK: 'header_cta_click',
  HERO_CTA_CLICK: 'hero_cta_click',
  SECTION_CTA_CLICK: 'section_cta_click',

  // Booking modal
  BOOKING_MODAL_OPEN: 'booking_modal_open',
  BOOKING_MODAL_CLOSE: 'booking_modal_close',
  BOOKING_STEP_COMPLETE: 'booking_step_complete',
  BOOKING_FORM_START: 'booking_form_start',
  BOOKING_FORM_SUBMIT: 'booking_form_submit',
  BOOKING_FORM_ERROR: 'booking_form_error',

  // Form interactions
  FORM_FIELD_FOCUS: 'form_field_focus',
  FORM_FIELD_BLUR: 'form_field_blur',
  EMAIL_SUBSCRIBE: 'email_subscribe',

  // External links
  EXTERNAL_LINK_CLICK: 'external_link_click',

  // Performance
  WEB_VITALS: 'web_vitals',
  API_RESPONSE_TIME: 'api_response_time',

  // Conversions
  CONVERSION: 'conversion',
} as const;

// Initialize Google Analytics
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  parameters?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: parameters?.category,
      event_label: parameters?.label,
      value: parameters?.value,
      ...parameters,
    });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', action, parameters);
  }
};

// Track CTA clicks with context
export const trackCTAClick = (location: 'header' | 'hero' | 'section', label?: string) => {
  const eventMap = {
    header: ANALYTICS_EVENTS.HEADER_CTA_CLICK,
    hero: ANALYTICS_EVENTS.HERO_CTA_CLICK,
    section: ANALYTICS_EVENTS.SECTION_CTA_CLICK,
  };

  trackEvent(eventMap[location], {
    category: 'CTA',
    label: label || location,
    location,
  });

  // Also track generic CTA click
  trackEvent(ANALYTICS_EVENTS.CTA_CLICK, {
    category: 'CTA',
    label: label || location,
    location,
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent(ANALYTICS_EVENTS.SCROLL_DEPTH, {
    category: 'Engagement',
    label: `${percentage}%`,
    value: percentage,
  });
};

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  trackEvent(ANALYTICS_EVENTS.TIME_ON_PAGE, {
    category: 'Engagement',
    label: `${seconds} seconds`,
    value: seconds,
  });
};

// Track booking modal interactions
export const trackBookingModal = (
  action: 'open' | 'close' | 'step_complete' | 'start' | 'submit' | 'error',
  data?: any
) => {
  const eventMap = {
    open: ANALYTICS_EVENTS.BOOKING_MODAL_OPEN,
    close: ANALYTICS_EVENTS.BOOKING_MODAL_CLOSE,
    step_complete: ANALYTICS_EVENTS.BOOKING_STEP_COMPLETE,
    start: ANALYTICS_EVENTS.BOOKING_FORM_START,
    submit: ANALYTICS_EVENTS.BOOKING_FORM_SUBMIT,
    error: ANALYTICS_EVENTS.BOOKING_FORM_ERROR,
  };

  trackEvent(eventMap[action], {
    category: 'Booking',
    label: action,
    ...data,
  });
};

// Track form interactions
export const trackFormInteraction = (
  action: 'focus' | 'blur',
  fieldName: string,
  formName?: string
) => {
  const event = action === 'focus' ? ANALYTICS_EVENTS.FORM_FIELD_FOCUS : ANALYTICS_EVENTS.FORM_FIELD_BLUR;

  trackEvent(event, {
    category: 'Form',
    label: fieldName,
    form_name: formName,
  });
};

// Track external links
export const trackExternalLink = (url: string, label?: string) => {
  trackEvent(ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK, {
    category: 'Outbound',
    label: label || url,
    url,
  });
};

// Track conversions
export const trackConversion = (type: string, value?: number, data?: any) => {
  trackEvent(ANALYTICS_EVENTS.CONVERSION, {
    category: 'Conversion',
    label: type,
    value,
    conversion_type: type,
    ...data,
  });
};

// Track web vitals
export const trackWebVitals = (metric: {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}) => {
  trackEvent(ANALYTICS_EVENTS.WEB_VITALS, {
    category: 'Performance',
    label: metric.name,
    value: Math.round(metric.value),
    metric_name: metric.name,
    metric_rating: metric.rating,
  });
};

// Track API response times
export const trackAPIResponseTime = (endpoint: string, duration: number, status: number) => {
  trackEvent(ANALYTICS_EVENTS.API_RESPONSE_TIME, {
    category: 'Performance',
    label: endpoint,
    value: Math.round(duration),
    status_code: status,
  });
};

// Utility to check if analytics should be enabled
export const isAnalyticsEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for DNT (Do Not Track)
  if (navigator.doNotTrack === '1') return false;
  
  // Check for user consent (implement your consent logic)
  const consent = localStorage.getItem('analytics-consent');
  return consent === 'granted' && !!GA_MEASUREMENT_ID;
};

// Set user consent
export const setAnalyticsConsent = (granted: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('analytics-consent', granted ? 'granted' : 'denied');
    
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
      });
    }
  }
};

// Get analytics data for dashboard
export const getAnalyticsData = async () => {
  try {
    const response = await fetch('/api/analytics');
    if (!response.ok) throw new Error('Failed to fetch analytics data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return null;
  }
};