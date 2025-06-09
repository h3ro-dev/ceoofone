'use client';

import { useState, useEffect } from 'react';
import { setAnalyticsConsent } from '@/utils/analytics';
import { Button } from '@/components/ui/Button';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics-consent');
    if (!consent) {
      setShowBanner(true);
      // Delay for smooth animation
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-sm text-gray-600 dark:text-gray-400">
            <p>
              We use cookies to analyze site usage and improve your experience. 
              By continuing, you agree to our use of analytics cookies. 
              <a
                href="/privacy"
                className="underline hover:text-gray-900 dark:hover:text-gray-200 ml-1"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDecline}
            >
              Decline
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAccept}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}