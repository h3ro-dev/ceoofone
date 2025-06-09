'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: ReactNode;
  onVisible?: () => void;
}

export function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder = null,
  onVisible,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, onVisible]);

  return (
    <div ref={containerRef}>
      {isVisible ? children : placeholder}
    </div>
  );
}