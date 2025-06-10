import { test, expect } from '@playwright/test';

test.describe('Visual Regression - CEO of One', () => {
  test.describe('Full Page Screenshots', () => {
    test('should capture landing page - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Wait for any animations to complete
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('landing-page-desktop.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('should capture landing page - tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('landing-page-tablet.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('should capture landing page - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('landing-page-mobile.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  test.describe('Component Screenshots', () => {
    test('should capture hero section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const heroSection = page.locator('section').first();
      await expect(heroSection).toHaveScreenshot('hero-section.png', {
        animations: 'disabled'
      });
    });

    test('should capture pain points section', async ({ page }) => {
      await page.goto('/');
      const painPointsSection = page.locator('[data-testid="pain-points"], section:has-text("Drowning in emails")');
      
      await painPointsSection.scrollIntoViewIfNeeded();
      await expect(painPointsSection).toHaveScreenshot('pain-points-section.png', {
        animations: 'disabled'
      });
    });

    test('should capture solution section', async ({ page }) => {
      await page.goto('/');
      const solutionSection = page.locator('section:has-text("CEO of One acts as your intelligent chief of staff")');
      
      await solutionSection.scrollIntoViewIfNeeded();
      await expect(solutionSection).toHaveScreenshot('solution-section.png', {
        animations: 'disabled'
      });
    });

    test('should capture testimonials section', async ({ page }) => {
      await page.goto('/');
      const testimonialsSection = page.locator('section:has-text("Jennifer eliminated")');
      
      await testimonialsSection.scrollIntoViewIfNeeded();
      await expect(testimonialsSection).toHaveScreenshot('testimonials-section.png', {
        animations: 'disabled'
      });
    });

    test('should capture footer', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      
      const footer = page.locator('footer');
      await expect(footer).toHaveScreenshot('footer.png', {
        animations: 'disabled'
      });
    });
  });

  test.describe('Modal Screenshots', () => {
    test('should capture booking modal - empty state', async ({ page }) => {
      await page.goto('/');
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
      await expect(modal).toBeVisible();
      await page.waitForTimeout(500); // Wait for animation
      
      await expect(modal).toHaveScreenshot('booking-modal-empty.png', {
        animations: 'disabled'
      });
    });

    test('should capture booking modal - filled state', async ({ page }) => {
      await page.goto('/');
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
      
      // Fill form
      await modal.locator('input[name="name"], input[placeholder*="name" i]').fill('John Doe');
      await modal.locator('input[type="email"], input[name="email"]').fill('john@example.com');
      await modal.locator('input[type="tel"], input[name="phone"]').fill('555-123-4567');
      await modal.locator('input[name="company"], input[placeholder*="company" i]').fill('Acme Corp');
      
      const messageField = modal.locator('textarea').first();
      if (await messageField.isVisible()) {
        await messageField.fill('I need help focusing on strategic growth while managing daily operations.');
      }
      
      await expect(modal).toHaveScreenshot('booking-modal-filled.png', {
        animations: 'disabled'
      });
    });

    test('should capture booking modal - error state', async ({ page }) => {
      await page.goto('/');
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
      
      // Try to submit empty form to trigger validation
      await modal.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Book")').click();
      await page.waitForTimeout(500); // Wait for validation messages
      
      await expect(modal).toHaveScreenshot('booking-modal-error.png', {
        animations: 'disabled'
      });
    });
  });

  test.describe('Interactive States', () => {
    test('should capture button hover states', async ({ page }) => {
      await page.goto('/');
      
      const primaryButton = page.locator('button:has-text("Get Your Free Strategy Session")').first();
      await primaryButton.hover();
      await page.waitForTimeout(300); // Wait for hover animation
      
      await expect(primaryButton).toHaveScreenshot('primary-button-hover.png');
    });

    test('should capture button focus states', async ({ page }) => {
      await page.goto('/');
      
      const primaryButton = page.locator('button:has-text("Get Your Free Strategy Session")').first();
      await primaryButton.focus();
      
      await expect(primaryButton).toHaveScreenshot('primary-button-focus.png');
    });

    test('should capture input focus states', async ({ page }) => {
      await page.goto('/');
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
      const nameInput = modal.locator('input[name="name"], input[placeholder*="name" i]');
      
      await nameInput.focus();
      await expect(nameInput).toHaveScreenshot('input-focus.png');
    });
  });

  test.describe('Dark Mode (if implemented)', () => {
    test('should capture dark mode variations', async ({ page }) => {
      await page.goto('/');
      
      // Check if dark mode toggle exists
      const darkModeToggle = page.locator('[aria-label*="dark mode" i], button:has-text("Dark"), .dark-mode-toggle');
      
      if (await darkModeToggle.isVisible()) {
        await darkModeToggle.click();
        await page.waitForTimeout(500); // Wait for theme transition
        
        await expect(page).toHaveScreenshot('landing-page-dark.png', {
          fullPage: true,
          animations: 'disabled'
        });
      }
    });
  });

  test.describe('Navigation States', () => {
    test('should capture mobile menu open', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      const hamburger = page.locator('button[aria-label*="menu" i], button[class*="menu" i], .hamburger');
      
      if (await hamburger.isVisible()) {
        await hamburger.click();
        await page.waitForTimeout(500); // Wait for menu animation
        
        const mobileMenu = page.locator('.mobile-menu, [class*="mobile-nav"], nav[aria-expanded="true"]');
        await expect(mobileMenu).toHaveScreenshot('mobile-menu-open.png');
      }
    });

    test('should capture sticky nav on scroll', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(300); // Wait for any scroll animations
      
      const nav = page.locator('nav, header').first();
      await expect(nav).toHaveScreenshot('sticky-nav.png');
    });
  });

  test.describe('Loading States', () => {
    test('should capture form submission loading', async ({ page }) => {
      await page.goto('/');
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal');
      
      // Fill minimum required fields
      await modal.locator('input[name="name"], input[placeholder*="name" i]').fill('John Doe');
      await modal.locator('input[type="email"], input[name="email"]').fill('john@example.com');
      
      // Intercept and delay submission
      await page.route('**/api/booking', async route => {
        // Don't fulfill immediately to capture loading state
        await page.waitForTimeout(2000);
        await route.fulfill({ status: 200 });
      });
      
      const submitButton = modal.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Book")');
      await submitButton.click();
      
      // Capture during loading
      await page.waitForTimeout(500);
      await expect(modal).toHaveScreenshot('booking-modal-loading.png');
    });
  });

  test.describe('Brand Compliance', () => {
    test('should verify Utlyze Blue usage', async ({ page }) => {
      await page.goto('/');
      
      // Capture elements that should use brand blue
      const brandElements = page.locator('h1, h2, .text-primary, [class*="primary"]').first();
      await expect(brandElements).toHaveScreenshot('brand-blue-elements.png');
    });

    test('should verify Action Orange CTAs', async ({ page }) => {
      await page.goto('/');
      
      const orangeCTA = page.locator('button:has-text("Get Your Free Strategy Session")').first();
      await expect(orangeCTA).toHaveScreenshot('action-orange-cta.png');
    });

    test('should verify typography hierarchy', async ({ page }) => {
      await page.goto('/');
      
      // Create a composite of different text levels
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.style.padding = '2rem';
        container.style.backgroundColor = 'white';
        container.innerHTML = `
          <h1 style="margin: 1rem 0">H1 Heading</h1>
          <h2 style="margin: 1rem 0">H2 Heading</h2>
          <h3 style="margin: 1rem 0">H3 Heading</h3>
          <p style="margin: 1rem 0">Body text paragraph</p>
          <small style="display: block; margin: 1rem 0">Small text</small>
        `;
        document.body.prepend(container);
      });
      
      const typographyShowcase = page.locator('body > div').first();
      await expect(typographyShowcase).toHaveScreenshot('typography-hierarchy.png');
    });
  });
});