import { test, expect } from '@playwright/test';

test.describe('Performance & Core Web Vitals - CEO of One', () => {
  test('should load within acceptable time limits', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should measure First Contentful Paint (FCP)', async ({ page }) => {
    await page.goto('/');
    
    const fcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          resolve(fcpEntry ? fcpEntry.startTime : null);
        }).observe({ entryTypes: ['paint'] });
      });
    });
    
    // FCP should be under 1.8 seconds for good score
    expect(fcp).toBeLessThan(1800);
  });

  test('should measure Largest Contentful Paint (LCP)', async ({ page }) => {
    await page.goto('/');
    
    // Wait for LCP to stabilize
    await page.waitForTimeout(2500);
    
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        let lcpValue = 0;
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.startTime > lcpValue) {
              lcpValue = entry.startTime;
            }
          });
          resolve(lcpValue);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Fallback after timeout
        setTimeout(() => resolve(lcpValue), 1000);
      });
    });
    
    // LCP should be under 2.5 seconds for good score
    expect(lcp).toBeLessThan(2500);
  });

  test('should measure Cumulative Layout Shift (CLS)', async ({ page }) => {
    await page.goto('/');
    
    // Scroll through the page to trigger any layout shifts
    await page.evaluate(() => {
      return new Promise((resolve) => {
        let totalShift = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              totalShift += entry.value;
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Scroll through page
        const scrollHeight = document.documentElement.scrollHeight;
        const step = scrollHeight / 10;
        let currentPosition = 0;
        
        const scrollInterval = setInterval(() => {
          currentPosition += step;
          window.scrollTo(0, currentPosition);
          
          if (currentPosition >= scrollHeight) {
            clearInterval(scrollInterval);
            setTimeout(() => {
              observer.disconnect();
              resolve(totalShift);
            }, 1000);
          }
        }, 100);
      });
    });
    
    const cls = await page.evaluate(() => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      return clsValue;
    });
    
    // CLS should be under 0.1 for good score
    expect(cls).toBeLessThan(0.1);
  });

  test('should measure First Input Delay (FID) simulation', async ({ page }) => {
    await page.goto('/');
    
    // Simulate user interaction
    const startTime = Date.now();
    await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
    const responseTime = Date.now() - startTime;
    
    // Response should be under 100ms for good FID
    expect(responseTime).toBeLessThan(100);
  });

  test('should measure Time to Interactive (TTI)', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    
    // Wait for page to be fully interactive
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      return new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve(null);
        } else {
          window.addEventListener('load', () => resolve(null));
        }
      });
    });
    
    const tti = Date.now() - startTime;
    
    // TTI should be under 3.8 seconds for good score
    expect(tti).toBeLessThan(3800);
  });

  test('should check bundle sizes', async ({ page }) => {
    const resources: { url: string; size: number; type: string }[] = [];
    
    page.on('response', response => {
      const url = response.url();
      const headers = response.headers();
      const contentLength = headers['content-length'];
      
      if (contentLength) {
        const size = parseInt(contentLength);
        let type = 'other';
        
        if (url.endsWith('.js') || headers['content-type']?.includes('javascript')) {
          type = 'javascript';
        } else if (url.endsWith('.css') || headers['content-type']?.includes('css')) {
          type = 'css';
        } else if (headers['content-type']?.includes('image')) {
          type = 'image';
        }
        
        resources.push({ url, size, type });
      }
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Calculate total sizes by type
    const totalSizes = resources.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + resource.size;
      acc.total += resource.size;
      return acc;
    }, { total: 0, javascript: 0, css: 0, image: 0, other: 0 });
    
    // JavaScript bundle should be under 500KB
    expect(totalSizes.javascript).toBeLessThan(500 * 1024);
    
    // CSS should be under 100KB
    expect(totalSizes.css).toBeLessThan(100 * 1024);
    
    // Total page weight should be under 2MB
    expect(totalSizes.total).toBeLessThan(2 * 1024 * 1024);
  });

  test('should check image optimization', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        loading: img.loading,
        width: img.width,
        height: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        alt: img.alt
      }));
    });
    
    for (const img of images) {
      // Images should have loading="lazy" for below-fold content
      if (img.src && !img.src.includes('hero')) {
        expect(img.loading).toBe('lazy');
      }
      
      // Images should have explicit dimensions
      expect(img.width).toBeGreaterThan(0);
      expect(img.height).toBeGreaterThan(0);
      
      // Images should have alt text
      expect(img.alt).toBeTruthy();
      
      // Check for responsive images (not serving huge images)
      if (img.naturalWidth > 0) {
        const displayRatio = img.width / img.naturalWidth;
        // Natural size shouldn't be more than 2x display size
        expect(displayRatio).toBeGreaterThan(0.5);
      }
    }
  });

  test('should check font loading performance', async ({ page }) => {
    const fontLoadPromises: Promise<any>[] = [];
    
    page.on('response', response => {
      if (response.url().includes('.woff') || response.url().includes('.woff2')) {
        fontLoadPromises.push(response.finished());
      }
    });
    
    await page.goto('/');
    
    if (fontLoadPromises.length > 0) {
      const startTime = Date.now();
      await Promise.all(fontLoadPromises);
      const fontLoadTime = Date.now() - startTime;
      
      // Fonts should load quickly
      expect(fontLoadTime).toBeLessThan(1000);
    }
    
    // Check for font-display usage
    const fontDisplay = await page.evaluate(() => {
      const stylesheets = Array.from(document.styleSheets);
      for (const sheet of stylesheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule instanceof CSSFontFaceRule) {
              return rule.style.getPropertyValue('font-display');
            }
          }
        } catch (e) {
          // Cross-origin stylesheets will throw
        }
      }
      return null;
    });
    
    // Should use font-display: swap or optional for performance
    if (fontDisplay) {
      expect(['swap', 'optional']).toContain(fontDisplay);
    }
  });

  test('should check critical CSS', async ({ page }) => {
    // Disable JavaScript to see if critical CSS is properly inlined
    await page.setJavaScriptEnabled(false);
    await page.goto('/');
    
    // Check if hero content is visible without JavaScript
    const heroVisible = await page.locator('h1').first().isVisible();
    expect(heroVisible).toBeTruthy();
    
    // Check if primary CTA is styled
    const ctaButton = page.locator('button:has-text("Get Your Free Strategy Session"), a:has-text("Get Your Free Strategy Session")').first();
    const ctaBackground = await ctaButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Should have some styling even without JS
    expect(ctaBackground).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('should check for memory leaks on interactions', async ({ page }) => {
    await page.goto('/');
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return null;
    });
    
    if (initialMemory) {
      // Perform multiple interactions
      for (let i = 0; i < 10; i++) {
        await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
        await page.locator('body').click({ position: { x: 10, y: 10 } }); // Close modal
        await page.waitForTimeout(100);
      }
      
      // Force garbage collection if available
      await page.evaluate(() => {
        if ('gc' in window) {
          (window as any).gc();
        }
      });
      
      await page.waitForTimeout(1000);
      
      // Check memory after interactions
      const finalMemory = await page.evaluate(() => {
        if ('memory' in performance) {
          return (performance as any).memory.usedJSHeapSize;
        }
        return null;
      });
      
      if (finalMemory) {
        // Memory shouldn't increase by more than 10MB
        const memoryIncrease = finalMemory - initialMemory;
        expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
      }
    }
  });

  test('should check for efficient DOM updates', async ({ page }) => {
    await page.goto('/');
    
    // Monitor DOM mutations
    const mutations = await page.evaluate(() => {
      return new Promise((resolve) => {
        const mutations: number[] = [];
        const observer = new MutationObserver((mutationsList) => {
          mutations.push(mutationsList.length);
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true
        });
        
        // Observe for 2 seconds
        setTimeout(() => {
          observer.disconnect();
          resolve(mutations);
        }, 2000);
      });
    });
    
    // There shouldn't be excessive DOM mutations on idle page
    const totalMutations = (mutations as number[]).reduce((a, b) => a + b, 0);
    expect(totalMutations).toBeLessThan(50);
  });

  test('should check request count and size', async ({ page }) => {
    let requestCount = 0;
    let totalSize = 0;
    
    page.on('request', () => {
      requestCount++;
    });
    
    page.on('response', response => {
      const headers = response.headers();
      const contentLength = headers['content-length'];
      if (contentLength) {
        totalSize += parseInt(contentLength);
      }
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Should have reasonable number of requests
    expect(requestCount).toBeLessThan(50);
    
    // Total size should be under 2MB
    expect(totalSize).toBeLessThan(2 * 1024 * 1024);
  });

  test('should check for proper caching headers', async ({ page }) => {
    const cacheableResources: { url: string; cacheControl: string | null }[] = [];
    
    page.on('response', response => {
      const url = response.url();
      const headers = response.headers();
      
      // Check static assets
      if (url.match(/\.(js|css|png|jpg|jpeg|gif|woff2?)$/)) {
        cacheableResources.push({
          url,
          cacheControl: headers['cache-control'] || null
        });
      }
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Static assets should have cache headers
    for (const resource of cacheableResources) {
      expect(resource.cacheControl).toBeTruthy();
      
      // Should have max-age of at least 1 hour for static assets
      if (resource.cacheControl) {
        const maxAgeMatch = resource.cacheControl.match(/max-age=(\d+)/);
        if (maxAgeMatch) {
          const maxAge = parseInt(maxAgeMatch[1]);
          expect(maxAge).toBeGreaterThanOrEqual(3600);
        }
      }
    }
  });
});