'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor(): JSX.Element | null {
  useEffect(() => {
    // Only run in production
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Basic performance monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics
        console.log(`${entry.name}: ${entry.duration}ms`);
        // In production, send to your monitoring service
      }
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });

    return () => observer.disconnect();
  }, []);

  // This component doesn't render anything visible
  return null;
}