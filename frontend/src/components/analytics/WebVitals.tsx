'use client';

import { useEffect } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';
import { reportWebVitals } from '@/utils/webVitals';

export function WebVitals() {
  useEffect(() => {
    // Report Core Web Vitals
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
  }, []);

  return null;
}