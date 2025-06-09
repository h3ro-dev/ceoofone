import { trackWebVitals } from './analytics';

export function reportWebVitals(metric: {
  id: string;
  name: string;
  label: string;
  value: number;
}) {
  // Calculate rating based on Web Vitals thresholds
  let rating: 'good' | 'needs-improvement' | 'poor' = 'good';

  switch (metric.name) {
    case 'FCP': // First Contentful Paint
      if (metric.value > 3000) rating = 'poor';
      else if (metric.value > 1800) rating = 'needs-improvement';
      break;
    case 'LCP': // Largest Contentful Paint
      if (metric.value > 4000) rating = 'poor';
      else if (metric.value > 2500) rating = 'needs-improvement';
      break;
    case 'FID': // First Input Delay
      if (metric.value > 300) rating = 'poor';
      else if (metric.value > 100) rating = 'needs-improvement';
      break;
    case 'CLS': // Cumulative Layout Shift
      if (metric.value > 0.25) rating = 'poor';
      else if (metric.value > 0.1) rating = 'needs-improvement';
      break;
    case 'TTFB': // Time to First Byte
      if (metric.value > 1800) rating = 'poor';
      else if (metric.value > 800) rating = 'needs-improvement';
      break;
  }

  trackWebVitals({
    name: metric.name,
    value: metric.value,
    rating,
  });
}