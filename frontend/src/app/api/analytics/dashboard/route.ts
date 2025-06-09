import { NextRequest, NextResponse } from 'next/server';
import { createApiResponse, handleApiError } from '@/lib/api/response';
import { applyMiddleware } from '@/lib/api/middleware';
import { env } from '@/lib/env';

// Analytics dashboard data structure
interface DashboardData {
  visitors: {
    total: number;
    unique: number;
    returning: number;
    active: number;
  };
  pageViews: {
    total: number;
    byPage: Record<string, number>;
    averagePerSession: number;
  };
  conversions: {
    total: number;
    bookings: number;
    subscriptions: number;
    rate: number;
  };
  funnel: {
    pageView: number;
    ctaClick: number;
    modalOpen: number;
    formStart: number;
    formSubmit: number;
  };
  events: {
    recent: Array<{
      name: string;
      category: string;
      timestamp: Date;
      metadata?: any;
    }>;
    topEvents: Array<{
      name: string;
      count: number;
    }>;
  };
  performance: {
    averageLoadTime: number;
    averageResponseTime: number;
    webVitals: {
      LCP: { value: number; rating: string };
      FID: { value: number; rating: string };
      CLS: { value: number; rating: string };
    };
  };
}

// In production, this would be fetched from a database or analytics service
const mockDashboardData: DashboardData = {
  visitors: {
    total: 1523,
    unique: 892,
    returning: 631,
    active: 23,
  },
  pageViews: {
    total: 4892,
    byPage: {
      '/': 2341,
      '/about': 892,
      '/contact': 1659,
    },
    averagePerSession: 3.2,
  },
  conversions: {
    total: 156,
    bookings: 89,
    subscriptions: 67,
    rate: 10.2,
  },
  funnel: {
    pageView: 4892,
    ctaClick: 892,
    modalOpen: 456,
    formStart: 234,
    formSubmit: 156,
  },
  events: {
    recent: [],
    topEvents: [
      { name: 'page_view', count: 4892 },
      { name: 'cta_click', count: 892 },
      { name: 'scroll_depth', count: 3421 },
      { name: 'booking_modal_open', count: 456 },
      { name: 'booking_form_submit', count: 156 },
    ],
  },
  performance: {
    averageLoadTime: 2.3,
    averageResponseTime: 145,
    webVitals: {
      LCP: { value: 2.1, rating: 'good' },
      FID: { value: 45, rating: 'good' },
      CLS: { value: 0.08, rating: 'good' },
    },
  },
};

export async function GET(request: NextRequest) {
  try {
    // Apply middleware
    const middlewareResult = await applyMiddleware(request);
    if (middlewareResult) return middlewareResult;

    // Check authentication - in production, use proper auth
    const authHeader = request.headers.get('authorization');
    const apiKey = env.ANALYTICS_API_KEY || 'demo-key';

    if (authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Add some recent events for demo
    const now = new Date();
    mockDashboardData.events.recent = [
      {
        name: 'page_view',
        category: 'navigation',
        timestamp: new Date(now.getTime() - 1000 * 60),
        metadata: { page: '/' },
      },
      {
        name: 'cta_click',
        category: 'engagement',
        timestamp: new Date(now.getTime() - 1000 * 120),
        metadata: { location: 'hero' },
      },
      {
        name: 'booking_form_submit',
        category: 'conversion',
        timestamp: new Date(now.getTime() - 1000 * 180),
        metadata: { formId: 'booking-123' },
      },
    ];

    // Return dashboard data
    return createApiResponse(mockDashboardData);
  } catch (error) {
    return handleApiError(error);
  }
}