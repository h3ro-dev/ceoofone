import { test, expect } from '@playwright/test';

test.describe('Landing Page - CEO of One', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the landing page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/CEO of One/);
  });

  test.describe('Hero Section', () => {
    test('should display hero headline matching PRD', async ({ page }) => {
      const heroHeadline = page.locator('h1').first();
      await expect(heroHeadline).toContainText('Wearing Every Hat?');
      await expect(heroHeadline).toContainText('Focus on the One That Grows Your Business');
    });

    test('should display hero subheading with 80/20 principle', async ({ page }) => {
      const heroSubheading = page.locator('[data-testid="hero-subheading"], .hero-subheading, h2').first();
      await expect(heroSubheading).toContainText('80%');
      await expect(heroSubheading).toContainText('20%');
      await expect(heroSubheading).toContainText('AI-powered leverage');
    });

    test('should have primary CTA button', async ({ page }) => {
      const ctaButton = page.locator('button:has-text("Get Your Free Strategy Session"), a:has-text("Get Your Free Strategy Session")').first();
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toHaveCSS('background-color', 'rgb(255, 107, 53)'); // Action Orange
    });

    test('should have secondary CTA button', async ({ page }) => {
      const secondaryCTA = page.locator('button:has-text("See How It Works"), a:has-text("See How It Works")');
      await expect(secondaryCTA).toBeVisible();
    });
  });

  test.describe('Pain Points Section', () => {
    test('should display all pain points from PRD', async ({ page }) => {
      const painPoints = [
        'Drowning in emails while strategy suffers?',
        'Making $1,000/hour decisions between $10/hour tasks?',
        'Working IN your business instead of ON it?',
        'Feeling like a juggler dropping important balls?'
      ];

      for (const painPoint of painPoints) {
        await expect(page.locator(`text="${painPoint}"`)).toBeVisible();
      }
    });

    test('should have proper visual hierarchy', async ({ page }) => {
      const painPointSection = page.locator('[data-testid="pain-points"], section:has-text("Drowning in emails")');
      await expect(painPointSection).toBeVisible();
    });
  });

  test.describe('Solution Section', () => {
    test('should display all solution benefits', async ({ page }) => {
      const solutions = [
        { title: 'Morning Briefing', desc: 'Start each day knowing your top 3 priorities' },
        { title: 'Decision Support', desc: 'Get data-driven insights for critical choices' },
        { title: 'Task Triage', desc: 'AI handles routine tasks so you don\'t have to' },
        { title: 'Strategic Focus', desc: 'Finally have time for the work only you can do' }
      ];

      for (const solution of solutions) {
        await expect(page.locator(`text="${solution.title}"`)).toBeVisible();
        await expect(page.locator(`text="${solution.desc}"`)).toBeVisible();
      }
    });

    test('should display "CEO of One acts as your intelligent chief of staff"', async ({ page }) => {
      await expect(page.locator('text="CEO of One acts as your intelligent chief of staff"')).toBeVisible();
    });
  });

  test.describe('Social Proof Section', () => {
    test('should display testimonials', async ({ page }) => {
      const testimonials = [
        'Jennifer eliminated 80% of her daily tasks and doubled revenue in 90 days',
        'Marcus cut his work week from 70 to 40 hours while growing 3x',
        'Sarah finally took a vacation without the business falling apart'
      ];

      for (const testimonial of testimonials) {
        await expect(page.locator(`text=/${testimonial}/i`)).toBeVisible();
      }
    });
  });

  test.describe('Trust Signals', () => {
    test('should display security badges', async ({ page }) => {
      const trustSignals = page.locator('[data-testid="trust-signals"], .trust-signals, section:has-text("Security")');
      await expect(trustSignals).toBeVisible();
    });

    test('should display guarantee message', async ({ page }) => {
      await expect(page.locator('text=/30-day guarantee|pilot program/i')).toBeVisible();
    });

    test('should display "Human + AI" messaging', async ({ page }) => {
      await expect(page.locator('text=/Human.*AI|AI.*Human/i')).toBeVisible();
    });
  });

  test.describe('Brand Colors', () => {
    test('should use Utlyze Blue (#4169E1) for primary elements', async ({ page }) => {
      const primaryElements = page.locator('.text-primary, [class*="primary"], h1, h2').first();
      const color = await primaryElements.evaluate(el => 
        window.getComputedStyle(el).color
      );
      // Check if color is blue-ish (allowing for slight variations)
      expect(color).toMatch(/rgb\(6[0-9], 10[0-9], 22[0-9]\)|#4169E1/i);
    });

    test('should use Action Orange for primary CTAs', async ({ page }) => {
      const primaryCTA = page.locator('button:has-text("Get Your Free Strategy Session")').first();
      const bgColor = await primaryCTA.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      // Check if background is orange-ish
      expect(bgColor).toMatch(/rgb\(25[0-9], 10[0-7], 5[0-9]\)|#FF6B35/i);
    });
  });

  test.describe('Navigation', () => {
    test('should have sticky navigation', async ({ page }) => {
      const nav = page.locator('nav, header').first();
      await expect(nav).toBeVisible();
      
      // Scroll down and check if nav is still visible
      await page.evaluate(() => window.scrollBy(0, 500));
      await expect(nav).toBeVisible();
    });

    test('should have logo', async ({ page }) => {
      const logo = page.locator('[data-testid="logo"], .logo, img[alt*="CEO of One"], a:has-text("CEO of One")').first();
      await expect(logo).toBeVisible();
    });
  });

  test.describe('Footer', () => {
    test('should have footer with necessary links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });
  });

  test.describe('White Space and Clarity', () => {
    test('should have proper spacing between sections', async ({ page }) => {
      const sections = page.locator('section, [class*="section"]');
      const count = await sections.count();
      
      for (let i = 0; i < count - 1; i++) {
        const section = sections.nth(i);
        const paddingBottom = await section.evaluate(el => 
          window.getComputedStyle(el).paddingBottom
        );
        const marginBottom = await section.evaluate(el => 
          window.getComputedStyle(el).marginBottom
        );
        
        // Check that sections have adequate spacing (at least 48px)
        const totalSpacing = parseInt(paddingBottom) + parseInt(marginBottom);
        expect(totalSpacing).toBeGreaterThanOrEqual(48);
      }
    });
  });

  test('should track page view analytics', async ({ page }) => {
    // Check for analytics scripts (Google Analytics, etc.)
    const analyticsScript = page.locator('script[src*="gtag"], script[src*="analytics"], script[src*="segment"]');
    const hasAnalytics = await analyticsScript.count() > 0;
    expect(hasAnalytics).toBeTruthy();
  });
});