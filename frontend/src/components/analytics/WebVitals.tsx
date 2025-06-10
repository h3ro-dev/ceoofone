'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { reportWebVitals } from '@/utils/webVitals';

export function WebVitals() {
  useEffect(() => {
    // Report Core Web Vitals
    onCLS(reportWebVitals);
    onINP(reportWebVitals); // INP replaced FID in web-vitals v3+
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
  }, []);

  return null;
}