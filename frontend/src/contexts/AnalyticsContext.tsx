'use client';

import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import {
  trackEvent,
  trackScrollDepth,
  trackTimeOnPage,
  trackCTAClick,
  trackBookingModal,
  trackFormInteraction,
  trackExternalLink,
  trackConversion,
  isAnalyticsEnabled,
} from '@/utils/analytics';

interface AnalyticsContextType {
  trackEvent: typeof trackEvent;
  trackCTAClick: typeof trackCTAClick;
  trackBookingModal: typeof trackBookingModal;
  trackFormInteraction: typeof trackFormInteraction;
  trackExternalLink: typeof trackExternalLink;
  trackConversion: typeof trackConversion;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const startTime = useRef(Date.now());
  const scrollDepthRef = useRef(0);
  const hasTrackedDepths = useRef(new Set<number>());

  // Track scroll depth
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = Math.round((scrolled / scrollHeight) * 100);

      // Track at 25%, 50%, 75%, and 100%
      const depths = [25, 50, 75, 100];
      depths.forEach((depth) => {
        if (scrollPercentage >= depth && !hasTrackedDepths.current.has(depth)) {
          hasTrackedDepths.current.add(depth);
          trackScrollDepth(depth);
        }
      });

      scrollDepthRef.current = Math.max(scrollDepthRef.current, scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track time on page
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const trackTime = () => {
      const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(timeOnPage);
    };

    // Track time when user leaves
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackTime();
      }
    };

    const handleBeforeUnload = () => {
      trackTime();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Track time at intervals (every 30 seconds)
    const interval = setInterval(() => {
      if (!document.hidden) {
        trackTime();
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Track external link clicks
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        const currentHost = window.location.host;

        if (url.host !== currentHost && !url.href.startsWith('mailto:') && !url.href.startsWith('tel:')) {
          trackExternalLink(url.href, anchor.textContent || undefined);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const contextValue: AnalyticsContextType = {
    trackEvent: useCallback((action, parameters) => {
      if (isAnalyticsEnabled()) {
        trackEvent(action, parameters);
      }
    }, []),
    trackCTAClick: useCallback((location, label) => {
      if (isAnalyticsEnabled()) {
        trackCTAClick(location, label);
      }
    }, []),
    trackBookingModal: useCallback((action, data) => {
      if (isAnalyticsEnabled()) {
        trackBookingModal(action, data);
      }
    }, []),
    trackFormInteraction: useCallback((action, fieldName, formName) => {
      if (isAnalyticsEnabled()) {
        trackFormInteraction(action, fieldName, formName);
      }
    }, []),
    trackExternalLink: useCallback((url, label) => {
      if (isAnalyticsEnabled()) {
        trackExternalLink(url, label);
      }
    }, []),
    trackConversion: useCallback((type, value, data) => {
      if (isAnalyticsEnabled()) {
        trackConversion(type, value, data);
      }
    }, []),
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}