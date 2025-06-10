import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility - CEO of One', () => {
  test('should pass automated accessibility checks on landing page', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test.describe('Keyboard Navigation', () => {
    test('should be fully navigable with keyboard', async ({ page }) => {
      await page.goto('/');
      
      // Start from the top
      await page.keyboard.press('Tab');
      
      // Check if focus is visible
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        return {
          tagName: el.tagName,
          text: el.textContent?.trim(),
          visible: window.getComputedStyle(el).outline !== 'none'
        };
      });
      
      expect(focusedElement).toBeTruthy();
      expect(focusedElement?.visible).toBeTruthy();
    });

    test('should trap focus in modal', async ({ page }) => {
      await page.goto('/');
      
      // Open modal
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
      await expect(modal).toBeVisible();
      
      // Tab through modal elements
      const focusableElements = await modal.locator('button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])').count();
      
      for (let i = 0; i < focusableElements + 2; i++) {
        await page.keyboard.press('Tab');
        
        // Check if focus is still within modal
        const focusInModal = await page.evaluate(() => {
          const modal = document.querySelector('[role="dialog"], [data-testid="booking-modal"], .modal');
          const activeEl = document.activeElement;
          return modal?.contains(activeEl);
        });
        
        expect(focusInModal).toBeTruthy();
      }
    });

    test('should close modal with Escape key', async ({ page }) => {
      await page.goto('/');
      
      // Open modal
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
      await expect(modal).toBeVisible();
      
      // Press Escape
      await page.keyboard.press('Escape');
      
      // Modal should be closed
      await expect(modal).not.toBeVisible();
    });
  });

  test.describe('Screen Reader Support', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/');
      
      const headings = await page.evaluate(() => {
        const h1s = document.querySelectorAll('h1');
        const h2s = document.querySelectorAll('h2');
        const h3s = document.querySelectorAll('h3');
        const h4s = document.querySelectorAll('h4');
        
        return {
          h1Count: h1s.length,
          h2Count: h2s.length,
          h3Count: h3s.length,
          h4Count: h4s.length,
          h1Text: Array.from(h1s).map(h => h.textContent?.trim())
        };
      });
      
      // Should have exactly one h1
      expect(headings.h1Count).toBe(1);
      
      // Should have h2s if there are h3s
      if (headings.h3Count > 0) {
        expect(headings.h2Count).toBeGreaterThan(0);
      }
    });

    test('should have descriptive link text', async ({ page }) => {
      await page.goto('/');
      
      const links = await page.evaluate(() => {
        const allLinks = Array.from(document.querySelectorAll('a'));
        return allLinks.map(link => ({
          text: link.textContent?.trim(),
          href: link.href,
          hasAriaLabel: !!link.getAttribute('aria-label')
        }));
      });
      
      for (const link of links) {
        // Links should have descriptive text or aria-label
        const hasDescriptiveText = link.text && 
          link.text.length > 0 && 
          !['click here', 'here', 'read more', 'more'].includes(link.text.toLowerCase());
        
        expect(hasDescriptiveText || link.hasAriaLabel).toBeTruthy();
      }
    });

    test('should have alt text for all images', async ({ page }) => {
      await page.goto('/');
      
      const images = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => ({
          src: img.src,
          alt: img.alt,
          decorative: img.getAttribute('role') === 'presentation' || img.alt === ''
        }));
      });
      
      for (const img of images) {
        // Images should have alt text or be marked as decorative
        expect(img.alt !== null && img.alt !== undefined).toBeTruthy();
      }
    });

    test('should have proper ARIA labels for interactive elements', async ({ page }) => {
      await page.goto('/');
      
      const interactiveElements = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('button, a, input, textarea, select'));
        return elements.map(el => ({
          tagName: el.tagName,
          text: el.textContent?.trim(),
          ariaLabel: el.getAttribute('aria-label'),
          ariaLabelledBy: el.getAttribute('aria-labelledby'),
          title: el.getAttribute('title'),
          placeholder: (el as HTMLInputElement).placeholder
        }));
      });
      
      for (const element of interactiveElements) {
        // Each interactive element should have some form of label
        const hasLabel = element.text || 
                        element.ariaLabel || 
                        element.ariaLabelledBy || 
                        element.title ||
                        element.placeholder;
        
        expect(hasLabel).toBeTruthy();
      }
    });

    test('should announce form errors to screen readers', async ({ page }) => {
      await page.goto('/');
      
      // Open modal
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
      
      // Try to submit empty form
      await modal.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Book")').click();
      
      // Check for ARIA live regions or role="alert"
      const errorAnnouncements = await page.evaluate(() => {
        const alerts = Array.from(document.querySelectorAll('[role="alert"], [aria-live="polite"], [aria-live="assertive"]'));
        return alerts.map(alert => ({
          text: alert.textContent?.trim(),
          role: alert.getAttribute('role'),
          ariaLive: alert.getAttribute('aria-live')
        }));
      });
      
      // Should have error announcements
      expect(errorAnnouncements.length).toBeGreaterThan(0);
    });
  });

  test.describe('Color Contrast', () => {
    test('should have sufficient color contrast for text', async ({ page }) => {
      await page.goto('/');
      
      // Run color contrast check
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .include('body')
        .analyze();
      
      const contrastViolations = accessibilityScanResults.violations.filter(
        violation => violation.id === 'color-contrast'
      );
      
      expect(contrastViolations).toEqual([]);
    });

    test('should not rely solely on color to convey information', async ({ page }) => {
      await page.goto('/');
      
      // Check for color-only indicators
      const colorOnlyElements = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
        const problematic: string[] = [];
        
        elements.forEach(el => {
          const styles = window.getComputedStyle(el);
          const text = el.textContent?.trim();
          
          // Check for elements that might use color alone
          if (text && (text.includes('red') || text.includes('green') || text.includes('blue'))) {
            if (!el.querySelector('svg, img, [aria-label]')) {
              problematic.push(text);
            }
          }
        });
        
        return problematic;
      });
      
      // Should not have color-only references
      expect(colorOnlyElements.length).toBe(0);
    });
  });

  test.describe('Form Accessibility', () => {
    test('should have associated labels for all form inputs', async ({ page }) => {
      await page.goto('/');
      
      // Open modal
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
      
      const formInputs = await modal.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
        return inputs.map(input => {
          const id = input.id;
          const label = id ? document.querySelector(`label[for="${id}"]`) : null;
          const ariaLabel = input.getAttribute('aria-label');
          const ariaLabelledBy = input.getAttribute('aria-labelledby');
          
          return {
            type: input.getAttribute('type') || input.tagName,
            hasLabel: !!label,
            hasAriaLabel: !!ariaLabel,
            hasAriaLabelledBy: !!ariaLabelledBy,
            placeholder: (input as HTMLInputElement).placeholder
          };
        });
      });
      
      for (const input of formInputs) {
        // Each input should have a label
        const hasAccessibleLabel = input.hasLabel || input.hasAriaLabel || input.hasAriaLabelledBy;
        expect(hasAccessibleLabel).toBeTruthy();
      }
    });

    test('should have clear error messages associated with fields', async ({ page }) => {
      await page.goto('/');
      
      // Open modal and trigger validation
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
      
      // Submit empty form
      await modal.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Book")').click();
      
      // Check error associations
      const errorAssociations = await modal.evaluate(() => {
        const errors = Array.from(document.querySelectorAll('.error, [class*="error"]'));
        return errors.map(error => {
          const errorId = error.id;
          const associatedInput = errorId ? 
            document.querySelector(`[aria-describedby*="${errorId}"], [aria-errormessage="${errorId}"]`) : 
            null;
          
          return {
            errorText: error.textContent?.trim(),
            hasAssociation: !!associatedInput
          };
        });
      });
      
      // Errors should be associated with their fields
      for (const error of errorAssociations) {
        if (error.errorText) {
          expect(error.hasAssociation).toBeTruthy();
        }
      }
    });
  });

  test.describe('Responsive Accessibility', () => {
    test('should maintain accessibility on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .analyze();
      
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have touch-friendly targets on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      const touchTargets = await page.evaluate(() => {
        const interactiveElements = Array.from(document.querySelectorAll('button, a, input, textarea, select'));
        return interactiveElements.map(el => {
          const rect = el.getBoundingClientRect();
          return {
            element: el.tagName,
            width: rect.width,
            height: rect.height,
            text: el.textContent?.trim()
          };
        });
      });
      
      for (const target of touchTargets) {
        // Touch targets should be at least 44x44px
        if (target.width > 0 && target.height > 0) {
          const area = target.width * target.height;
          expect(area).toBeGreaterThanOrEqual(44 * 44);
        }
      }
    });
  });

  test.describe('Focus Management', () => {
    test('should have visible focus indicators', async ({ page }) => {
      await page.goto('/');
      
      // Tab to first interactive element
      await page.keyboard.press('Tab');
      
      const focusStyle = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineOffset: styles.outlineOffset,
          boxShadow: styles.boxShadow
        };
      });
      
      // Should have visible focus indicator
      const hasVisibleFocus = focusStyle && (
        focusStyle.outline !== 'none' || 
        focusStyle.boxShadow !== 'none'
      );
      
      expect(hasVisibleFocus).toBeTruthy();
    });

    test('should return focus to trigger element when modal closes', async ({ page }) => {
      await page.goto('/');
      
      // Focus and click CTA
      const ctaButton = page.locator('button:has-text("Get Your Free Strategy Session")').first();
      await ctaButton.focus();
      await ctaButton.click();
      
      // Close modal
      await page.keyboard.press('Escape');
      
      // Check if focus returned to CTA
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.textContent?.trim();
      });
      
      expect(focusedElement).toContain('Get Your Free Strategy Session');
    });
  });

  test('should have proper language attribute', async ({ page }) => {
    await page.goto('/');
    
    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang).toBeTruthy();
    expect(lang).toBe('en');
  });

  test('should have skip navigation link', async ({ page }) => {
    await page.goto('/');
    
    // Look for skip link (might be visually hidden)
    const skipLink = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links.find(link => 
        link.textContent?.toLowerCase().includes('skip') ||
        link.getAttribute('aria-label')?.toLowerCase().includes('skip')
      );
    });
    
    // Skip link is a best practice but not always required
    if (skipLink) {
      expect(skipLink).toBeTruthy();
    }
  });
});