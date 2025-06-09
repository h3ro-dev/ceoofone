// Performance monitoring utilities

export function measurePerformance(metricName: string) {
  if (typeof window === 'undefined') return;
  
  // Use Performance Observer API
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`${metricName}:`, entry);
        }
        
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: metricName,
            value: Math.round(entry.duration),
            event_category: 'Performance',
          });
        }
      }
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation'] });
  } catch (error) {
    console.error('Performance measurement error:', error);
  }
}

// Lazy load images with Intersection Observer
export function lazyLoadImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const images = document.querySelectorAll('img[data-lazy]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute('data-lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01,
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Prefetch critical resources
export function prefetchCriticalResources(urls: string[]) {
  if (typeof window === 'undefined') return;
  
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}