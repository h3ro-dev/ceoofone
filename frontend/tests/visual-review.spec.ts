import { test, devices } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

// Create screenshots directory
const screenshotsDir = path.join(process.cwd(), 'visual-review-screenshots');

test.describe('Visual Review - CEO of One', () => {
  test.beforeAll(async () => {
    await fs.mkdir(screenshotsDir, { recursive: true });
  });

  test('Generate comprehensive visual review', async ({ browser }) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const reviewDir = path.join(screenshotsDir, `review-${timestamp}`);
    await fs.mkdir(reviewDir, { recursive: true });

    // Define viewports
    const viewports = [
      { name: 'desktop', width: 1920, height: 1080, device: null },
      { name: 'tablet', width: 768, height: 1024, device: null },
      { name: 'mobile', width: 375, height: 667, device: devices['iPhone 12'] }
    ];

    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        ...viewport.device
      });
      const page = await context.newPage();

      console.log(`\n📸 Capturing ${viewport.name} screenshots...`);

      // 1. Landing Page - Full
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000); // Wait for animations
      await page.screenshot({
        path: path.join(reviewDir, `01-landing-full-${viewport.name}.png`),
        fullPage: true
      });
      console.log(`✓ Landing page full - ${viewport.name}`);

      // 2. Hero Section
      await page.goto('/');
      const heroSection = page.locator('section').first();
      await page.screenshot({
        path: path.join(reviewDir, `02-hero-section-${viewport.name}.png`),
        clip: await heroSection.boundingBox() || undefined
      });
      console.log(`✓ Hero section - ${viewport.name}`);

      // 3. Pain Points Section
      const painPoints = page.locator('[data-testid="pain-points"], section:has-text("Drowning in emails")').first();
      await painPoints.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(reviewDir, `03-pain-points-${viewport.name}.png`),
        clip: await painPoints.boundingBox() || undefined
      });
      console.log(`✓ Pain points section - ${viewport.name}`);

      // 4. Solution Section
      const solution = page.locator('section:has-text("CEO of One acts as your intelligent chief of staff")').first();
      await solution.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(reviewDir, `04-solution-section-${viewport.name}.png`),
        clip: await solution.boundingBox() || undefined
      });
      console.log(`✓ Solution section - ${viewport.name}`);

      // 5. Testimonials Section
      const testimonials = page.locator('section:has-text("Jennifer eliminated")').first();
      if (await testimonials.isVisible()) {
        await testimonials.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.screenshot({
          path: path.join(reviewDir, `05-testimonials-${viewport.name}.png`),
          clip: await testimonials.boundingBox() || undefined
        });
        console.log(`✓ Testimonials section - ${viewport.name}`);
      }

      // 6. Footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      const footer = page.locator('footer').first();
      if (await footer.isVisible()) {
        await page.screenshot({
          path: path.join(reviewDir, `06-footer-${viewport.name}.png`),
          clip: await footer.boundingBox() || undefined
        });
        console.log(`✓ Footer - ${viewport.name}`);
      }

      // 7. Navigation States
      if (viewport.name === 'mobile') {
        // Mobile menu
        const hamburger = page.locator('button[aria-label*="menu" i], button[class*="menu" i], .hamburger').first();
        if (await hamburger.isVisible()) {
          await hamburger.click();
          await page.waitForTimeout(500);
          await page.screenshot({
            path: path.join(reviewDir, `07-mobile-menu-open-${viewport.name}.png`)
          });
          console.log(`✓ Mobile menu - ${viewport.name}`);
          await page.click('body', { position: { x: 10, y: 10 } }); // Close menu
        }
      }

      // 8. Booking Modal - Empty
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const ctaButton = page.locator('button:has-text("Get Your Free Strategy Session"), a:has-text("Get Your Free Strategy Session")').first();
      await ctaButton.click();
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(reviewDir, `08-booking-modal-empty-${viewport.name}.png`)
      });
      console.log(`✓ Booking modal empty - ${viewport.name}`);

      // 9. Booking Modal - Filled
      const modal = page.locator('[role="dialog"], [data-testid="booking-modal"], .modal').first();
      await modal.locator('input[name="name"], input[placeholder*="name" i]').first().fill('John Doe');
      await modal.locator('input[type="email"], input[name="email"]').first().fill('john.doe@example.com');
      await modal.locator('input[type="tel"], input[name="phone"], input[placeholder*="phone" i]').first().fill('(555) 123-4567');
      await modal.locator('input[name="company"], input[placeholder*="company" i], input[placeholder*="business" i]').first().fill('Acme Corp');
      
      const messageField = modal.locator('textarea').first();
      if (await messageField.isVisible()) {
        await messageField.fill('I need help focusing on strategic growth while managing daily operations. Currently spending 70+ hours per week on operational tasks.');
      }
      
      await page.screenshot({
        path: path.join(reviewDir, `09-booking-modal-filled-${viewport.name}.png`)
      });
      console.log(`✓ Booking modal filled - ${viewport.name}`);

      // 10. Booking Modal - Validation Errors
      await page.reload();
      await page.locator('button:has-text("Get Your Free Strategy Session")').first().click();
      await page.waitForTimeout(500);
      const submitButton = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Book")').first();
      await submitButton.click();
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(reviewDir, `10-booking-modal-errors-${viewport.name}.png`)
      });
      console.log(`✓ Booking modal errors - ${viewport.name}`);

      // 11. Interactive States - Button Hover
      if (viewport.name === 'desktop') {
        await page.goto('/');
        const hoverButton = page.locator('button:has-text("Get Your Free Strategy Session")').first();
        await hoverButton.hover();
        await page.waitForTimeout(300);
        await page.screenshot({
          path: path.join(reviewDir, `11-button-hover-state-${viewport.name}.png`),
          clip: await hoverButton.boundingBox() || undefined
        });
        console.log(`✓ Button hover state - ${viewport.name}`);

        // 12. Interactive States - Button Focus
        await hoverButton.focus();
        await page.screenshot({
          path: path.join(reviewDir, `12-button-focus-state-${viewport.name}.png`),
          clip: await hoverButton.boundingBox() || undefined
        });
        console.log(`✓ Button focus state - ${viewport.name}`);
      }

      // 13. Scroll Progress (if implemented)
      await page.goto('/');
      for (let i = 0; i <= 100; i += 25) {
        await page.evaluate((scrollPercent) => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo(0, (maxScroll * scrollPercent) / 100);
        }, i);
        await page.waitForTimeout(500);
        
        if (i === 50) { // Mid-page screenshot
          await page.screenshot({
            path: path.join(reviewDir, `13-scroll-progress-${i}-${viewport.name}.png`)
          });
          console.log(`✓ Scroll progress ${i}% - ${viewport.name}`);
        }
      }

      await context.close();
    }

    // Generate HTML review page
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CEO of One - Visual Review</title>
    <style>
        body {
            font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        h1 {
            color: #4169E1;
            margin-bottom: 30px;
        }
        h2 {
            color: #333;
            margin-top: 40px;
            border-bottom: 2px solid #4169E1;
            padding-bottom: 10px;
        }
        .viewport-section {
            margin-bottom: 60px;
        }
        .screenshot-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .screenshot-item {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .screenshot-item img {
            width: 100%;
            height: auto;
            display: block;
        }
        .screenshot-label {
            padding: 10px;
            font-weight: 500;
            color: #666;
            text-align: center;
            background: #f9f9f9;
        }
        .timestamp {
            color: #888;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .summary {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 40px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .summary h3 {
            margin-top: 0;
            color: #4169E1;
        }
        .checklist {
            list-style: none;
            padding: 0;
        }
        .checklist li {
            padding: 8px 0;
            padding-left: 30px;
            position: relative;
        }
        .checklist li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #4CAF50;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>CEO of One - Visual Review</h1>
        <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
        
        <div class="summary">
            <h3>Review Checklist</h3>
            <ul class="checklist">
                <li>Hero headline matches PRD: "Wearing Every Hat? Focus on the One That Grows Your Business"</li>
                <li>Subheading emphasizes 80/20 principle with AI-powered leverage</li>
                <li>Primary CTA uses Action Orange (#FF6B35)</li>
                <li>Pain points section addresses target persona challenges</li>
                <li>Solution section presents 4 key benefits</li>
                <li>Testimonials show social proof</li>
                <li>Booking modal has all required fields</li>
                <li>Responsive design works across all viewports</li>
                <li>Brand colors follow guidelines (Utlyze Blue #4169E1)</li>
                <li>Typography hierarchy is clear and consistent</li>
            </ul>
        </div>

        <div class="viewport-section">
            <h2>Desktop (1920x1080)</h2>
            <div class="screenshot-grid">
                ${await generateScreenshotHTML(reviewDir, 'desktop')}
            </div>
        </div>

        <div class="viewport-section">
            <h2>Tablet (768x1024)</h2>
            <div class="screenshot-grid">
                ${await generateScreenshotHTML(reviewDir, 'tablet')}
            </div>
        </div>

        <div class="viewport-section">
            <h2>Mobile (375x667)</h2>
            <div class="screenshot-grid">
                ${await generateScreenshotHTML(reviewDir, 'mobile')}
            </div>
        </div>
    </div>
</body>
</html>
    `;

    await fs.writeFile(path.join(reviewDir, 'index.html'), htmlContent);
    
    console.log(`\n✅ Visual review complete!`);
    console.log(`📁 Screenshots saved to: ${reviewDir}`);
    console.log(`🌐 Open ${path.join(reviewDir, 'index.html')} in your browser to view the review`);
  });
});

async function generateScreenshotHTML(dir: string, viewport: string): Promise<string> {
  const files = await fs.readdir(dir);
  const viewportFiles = files.filter(f => f.includes(viewport) && f.endsWith('.png'));
  
  return viewportFiles.map(file => {
    const label = file
      .replace(/^\d+-/, '')
      .replace(`-${viewport}.png`, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    return `
      <div class="screenshot-item">
        <img src="${file}" alt="${label}" loading="lazy">
        <div class="screenshot-label">${label}</div>
      </div>
    `;
  }).join('');
}