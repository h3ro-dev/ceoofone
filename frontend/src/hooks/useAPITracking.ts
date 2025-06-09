import { trackAPIResponseTime } from '@/utils/analytics';

export function useAPITracking() {
  const trackFetch = async (
    url: string,
    options?: RequestInit
  ): Promise<Response> => {
    const startTime = performance.now();
    
    try {
      const response = await fetch(url, options);
      const duration = performance.now() - startTime;
      
      // Track API response time
      trackAPIResponseTime(url, duration, response.status);
      
      return response;
    } catch (error) {
      const duration = performance.now() - startTime;
      // Track failed request
      trackAPIResponseTime(url, duration, 0);
      throw error;
    }
  };

  return { trackFetch };
}