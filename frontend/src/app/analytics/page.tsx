'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

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
      timestamp: string;
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

export default function AnalyticsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/analytics/dashboard', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key');
        }
        throw new Error('Failed to fetch analytics');
      }

      const result = await response.json();
      setData(result.data);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if API key is stored
    const storedKey = localStorage.getItem('analytics-api-key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  useEffect(() => {
    if (apiKey) {
      fetchAnalytics();
      // Refresh every 30 seconds
      const interval = setInterval(fetchAnalytics, 30000);
      return () => clearInterval(interval);
    }
  }, [apiKey]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem('analytics-api-key', apiKey);
      fetchAnalytics();
    }
  };

  if (!isAuthenticated && !loading) {
    return (
      <Section className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full p-8">
          <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
          <form onSubmit={handleAuth}>
            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
                API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your API key"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </Card>
      </Section>
    );
  }

  if (loading && !data) {
    return (
      <Section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </Section>
    );
  }

  if (!data) return null;

  // Calculate funnel conversion rates
  const funnelRates = {
    viewToCTA: ((data.funnel.ctaClick / data.funnel.pageView) * 100).toFixed(1),
    ctaToModal: ((data.funnel.modalOpen / data.funnel.ctaClick) * 100).toFixed(1),
    modalToStart: ((data.funnel.formStart / data.funnel.modalOpen) * 100).toFixed(1),
    startToSubmit: ((data.funnel.formSubmit / data.funnel.formStart) * 100).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
            <button
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Visitor Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Visitors
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.visitors.total.toLocaleString()}
            </p>
            <p className="text-sm text-green-600 mt-2">
              {data.visitors.active} active now
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Unique Visitors
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.visitors.unique.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {((data.visitors.unique / data.visitors.total) * 100).toFixed(1)}% of total
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Page Views
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.pageViews.total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {data.pageViews.averagePerSession.toFixed(1)} per session
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Conversions
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.conversions.total}
            </p>
            <p className="text-sm text-green-600 mt-2">
              {data.conversions.rate.toFixed(1)}% conversion rate
            </p>
          </Card>
        </div>

        {/* Conversion Funnel */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Conversion Funnel</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Page Views</span>
                  <span className="text-sm text-gray-600">{data.funnel.pageView}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ width: '100%' }}>
                    100%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CTA Clicks</span>
                  <span className="text-sm text-gray-600">{data.funnel.ctaClick}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ width: `${funnelRates.viewToCTA}%` }}>
                    {funnelRates.viewToCTA}%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Modal Opens</span>
                  <span className="text-sm text-gray-600">{data.funnel.modalOpen}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ width: `${(data.funnel.modalOpen / data.funnel.pageView * 100).toFixed(1)}%` }}>
                    {(data.funnel.modalOpen / data.funnel.pageView * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Form Starts</span>
                  <span className="text-sm text-gray-600">{data.funnel.formStart}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ width: `${(data.funnel.formStart / data.funnel.pageView * 100).toFixed(1)}%` }}>
                    {(data.funnel.formStart / data.funnel.pageView * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Form Submits</span>
                  <span className="text-sm text-gray-600">{data.funnel.formSubmit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div className="bg-green-600 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ width: `${(data.funnel.formSubmit / data.funnel.pageView * 100).toFixed(1)}%` }}>
                    {(data.funnel.formSubmit / data.funnel.pageView * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Web Vitals</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">LCP (Largest Contentful Paint)</span>
                  <span className={`text-sm font-medium ${data.performance.webVitals.LCP.rating === 'good' ? 'text-green-600' : data.performance.webVitals.LCP.rating === 'needs-improvement' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {data.performance.webVitals.LCP.value}s - {data.performance.webVitals.LCP.rating}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">FID (First Input Delay)</span>
                  <span className={`text-sm font-medium ${data.performance.webVitals.FID.rating === 'good' ? 'text-green-600' : data.performance.webVitals.FID.rating === 'needs-improvement' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {data.performance.webVitals.FID.value}ms - {data.performance.webVitals.FID.rating}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CLS (Cumulative Layout Shift)</span>
                  <span className={`text-sm font-medium ${data.performance.webVitals.CLS.rating === 'good' ? 'text-green-600' : data.performance.webVitals.CLS.rating === 'needs-improvement' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {data.performance.webVitals.CLS.value} - {data.performance.webVitals.CLS.rating}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Average Load Time</span>
                <span className="text-sm">{data.performance.averageLoadTime}s</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm font-medium">Average API Response</span>
                <span className="text-sm">{data.performance.averageResponseTime}ms</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Top Events</h2>
            <div className="space-y-3">
              {data.events.topEvents.map((event, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">
                    {event.name.replace(/_/g, ' ')}
                  </span>
                  <span className="text-sm text-gray-600">
                    {event.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Events */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Events</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metadata
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.events.recent.map((event, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {event.name.replace(/_/g, ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.metadata ? JSON.stringify(event.metadata) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}