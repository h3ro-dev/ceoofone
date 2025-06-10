import { test, expect, devices } from '@playwright/test';

const viewports = [
  { name: 'Mobile - iPhone 12', viewport: devices['iPhone 12'].viewport },
  { name: 'Mobile - Pixel 5', viewport: devices['Pixel 5'].viewport },
  { name: 'Tablet - iPad', viewport: { width: 768, height: 1024 } },
  { name: 'Tablet - iPad Pro', viewport: devices['iPad Pro'].viewport },
  { name: 'Desktop - 1080p', viewport: { width: 1920, height: 1080 } },
  { name: 'Desktop - 1440p', viewport: { width: 2560, height: 1440 } },
];

test.describe('Responsive Design - CEO of One', () => {
  for (const device of viewports) {
    test.describe(`${device.name}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto('/');
      });

      test('should display hero section properly', async ({ page }) => {
        const hero = page.locator('h1').first();
        await expect(hero).toBeVisible();
        
        // Check text is not cut off
        const heroBox = await hero.boundingBox();
        expect(heroBox).toBeTruthy();
        expect(heroBox!.width).toBeGreaterThan(100);
        
        // Check CTA button is visible and clickable
        const ctaButton = page.locator('button:has-text("Get Your Free Strategy Session"), a:has-text("Get Your Free Strategy Session")').first();
        await expect(ctaButton).toBeVisible();
        await expect(ctaButton).toBeInViewport();
      });

      test('should have readable font sizes', async ({ page }) => {
        // Check hero text
        const heroFontSize = await page.locator('h1').first().evaluate(el => 
          window.getComputedStyle(el).fontSize
        );
        const heroSize = parseInt(heroFontSize);
        
        if (device.viewport.width < 768) {
          // Mobile
          expect(heroSize).toBeGreaterThanOrEqual(28);
          expect(heroSize).toBeLessThanOrEqual(40);
        } else if (device.viewport.width < 1024) {
          // Tablet
          expect(heroSize).toBeGreaterThanOrEqual(36);
          expect(heroSize).toBeLessThanOrEqual(48);
        } else {
          // Desktop
          expect(heroSize).toBeGreaterThanOrEqual(48);
        }

        // Check body text
        const bodyFontSize = await page.locator('p').first().evaluate(el => 
          window.getComputedStyle(el).fontSize
        );
        const bodySize = parseInt(bodyFontSize);
        expect(bodySize).toBeGreaterThanOrEqual(14); // Minimum readable size
      });

      test('should have appropriate spacing', async ({ page }) => {
        const sections = page.locator('section, [class*="section"]');
        const count = await sections.count();
        
        for (let i = 0; i < Math.min(count, 3); i++) {
          const section = sections.nth(i);
          const padding = await section.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              top: parseInt(styles.paddingTop),
              bottom: parseInt(styles.paddingBottom),
              left: parseInt(styles.paddingLeft),
              right: parseInt(styles.paddingRight)
            };
          });

          if (device.viewport.width < 768) {
            // Mobile should have less horizontal padding
            expect(padding.left).toBeLessThanOrEqual(32);
            expect(padding.right).toBeLessThanOrEqual(32);
          } else {
            // Desktop should have more breathing room
            expect(padding.left).toBeGreaterThanOrEqual(16);
            expect(padding.right).toBeGreaterThanOrEqual(16);
          }
        }
      });

      test('should handle navigation appropriately', async ({ page }) => {
        const nav = page.locator('nav, header').first();
        await expect(nav).toBeVisible();

        if (device.viewport.width < 768) {
          // Mobile should have hamburger menu
          const hamburger = nav.locator('button[aria-label*="menu" i], button[class*="menu" i], .hamburger');
          const isHamburgerVisible = await hamburger.isVisible().catch(() => false);
          
          if (isHamburgerVisible) {
            // Test hamburger menu functionality
            await hamburger.click();
            const mobileMenu = page.locator('.mobile-menu, [class*="mobile-nav"], nav[aria-expanded="true"]');
            await expect(mobileMenu).toBeVisible();
          }
        } else {
          // Desktop should show full navigation
          const navLinks = nav.locator('a:visible');
          const linkCount = await navLinks.count();
          expect(linkCount).toBeGreaterThan(0);
        }
      });

      test('should display pain points section properly', async ({ page }) => {
        const painPointsSection = page.locator('[data-testid="pain-points"], section:has-text("Drowning in emails")');
        await expect(painPointsSection).toBeVisible();

        if (device.viewport.width < 768) {
          // Mobile: Check vertical stacking
          const painPoints = painPointsSection.locator('[class*="pain-point"], li, .card');
          const count = await painPoints.count();
          
          if (count > 1) {
            const firstBox = await painPoints.first().boundingBox();
            const secondBox = await painPoints.nth(1).boundingBox();
            
            if (firstBox && secondBox) {
              // Items should be stacked vertically on mobile
              expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 10);
            }
          }
        } else {
          // Desktop: Check horizontal layout if applicable
          const painPoints = painPointsSection.locator('[class*="pain-point"], li, .card');
          const count = await painPoints.count();
          
          if (count > 1) {
            const firstBox = await painPoints.first().boundingBox();
            const secondBox = await painPoints.nth(1).boundingBox();
            
            if (firstBox && secondBox) {
              // Items might be side by side on desktop
              const isHorizontal = Math.abs(firstBox.y - secondBox.y) < 50;
              const isVertical = secondBox.y > firstBox.y + firstBox.height - 10;
              expect(isHorizontal || isVertical).toBeTruthy();
            }
          }
        }
      });

      test('should handle images responsively', async ({ page }) => {
        const images = page.locator('img:visible');
        const count = await images.count();

        for (let i = 0; i < Math.min(count, 5); i++) {
          const img = images.nth(i);
          const box = await img.boundingBox();
          
          if (box) {
            // Images should not overflow viewport
            expect(box.width).toBeLessThanOrEqual(device.viewport.width);
            
            // Images should maintain reasonable aspect ratios
            const aspectRatio = box.width / box.height;
            expect(aspectRatio).toBeGreaterThan(0.3); // Not too tall
            expect(aspectRatio).toBeLessThan(5); // Not too wide
          }
        }
      });

      test('should make CTA buttons touch-friendly on mobile', async ({ page }) => {
        if (device.viewport.width < 768) {
          const buttons = page.locator('button:visible, a[class*="button"]:visible');
          const count = await buttons.count();

          for (let i = 0; i < Math.min(count, 5); i++) {
            const button = buttons.nth(i);
            const box = await button.boundingBox();
            
            if (box) {
              // Touch targets should be at least 44x44px on mobile
              expect(box.height).toBeGreaterThanOrEqual(44);
              expect(box.width).toBeGreaterThanOrEqual(44);
            }
          }
        }
      });

      test('should handle modal responsively', async ({ page }) => {
        // Open booking modal
        await page.locator('button:has-text("Get Your Free Strategy Session"), a:has-text("Get Your Free Strategy Session")').first().click();
        const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
        await expect(modal).toBeVisible();

        const modalBox = await modal.boundingBox();
        if (modalBox) {
          if (device.viewport.width < 768) {
            // Mobile: Modal should be nearly full width
            expect(modalBox.width).toBeGreaterThan(device.viewport.width * 0.85);
            expect(modalBox.width).toBeLessThanOrEqual(device.viewport.width);
          } else {
            // Desktop: Modal should be centered with max width
            expect(modalBox.width).toBeLessThanOrEqual(800);
            expect(modalBox.x).toBeGreaterThan(0); // Has left margin
          }
        }
      });

      test('should handle long text properly', async ({ page }) => {
        // Check that text wraps properly and doesn't overflow
        const textElements = page.locator('p:visible, h1:visible, h2:visible, h3:visible');
        const count = await textElements.count();

        for (let i = 0; i < Math.min(count, 10); i++) {
          const element = textElements.nth(i);
          const overflow = await element.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              overflowX: styles.overflowX,
              textOverflow: styles.textOverflow,
              whiteSpace: styles.whiteSpace
            };
          });

          // Text should wrap or use ellipsis, not overflow
          if (overflow.whiteSpace !== 'nowrap') {
            expect(overflow.overflowX).not.toBe('visible');
          }
        }
      });

      test('should maintain proper contrast ratios', async ({ page }) => {
        // Sample key text elements for contrast
        const textElements = [
          page.locator('h1').first(),
          page.locator('p').first(),
          page.locator('button:has-text("Get Your Free Strategy Session")').first()
        ];

        for (const element of textElements) {
          if (await element.isVisible()) {
            const contrast = await element.evaluate(el => {
              const styles = window.getComputedStyle(el);
              const bg = styles.backgroundColor;
              const color = styles.color;
              
              // This is a simplified check - real contrast calculation is complex
              // Just ensure text and background are different
              return bg !== color;
            });

            expect(contrast).toBeTruthy();
          }
        }
      });
    });
  }

  test('should handle orientation changes', async ({ page, context }) => {
    // Test portrait to landscape transition
    await page.setViewportSize({ width: 414, height: 896 }); // iPhone portrait
    await page.goto('/');
    
    const heroPortrait = await page.locator('h1').first().boundingBox();
    
    await page.setViewportSize({ width: 896, height: 414 }); // iPhone landscape
    await page.waitForTimeout(300); // Allow for any transitions
    
    const heroLandscape = await page.locator('h1').first().boundingBox();
    
    // Layout should adapt to orientation
    expect(heroPortrait).toBeTruthy();
    expect(heroLandscape).toBeTruthy();
    expect(heroLandscape!.width).toBeGreaterThan(heroPortrait!.width);
  });
});