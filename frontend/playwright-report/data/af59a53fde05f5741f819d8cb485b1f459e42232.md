# Test info

- Name: Visual Review - CEO of One >> Generate comprehensive visual review
- Location: /Users/jamesbrady/Utlyze Sites/CEOofOne/frontend/tests/visual-review.spec.ts:13:7

# Error details

```
Error: browserType.launch: Chromium distribution 'msedge' is not found at /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
Run "npx playwright install msedge"
```

# Test source

```ts
   1 | import { test, devices } from '@playwright/test';
   2 | import { promises as fs } from 'fs';
   3 | import path from 'path';
   4 |
   5 | // Create screenshots directory
   6 | const screenshotsDir = path.join(process.cwd(), 'visual-review-screenshots');
   7 |
   8 | test.describe('Visual Review - CEO of One', () => {
   9 |   test.beforeAll(async () => {
   10 |     await fs.mkdir(screenshotsDir, { recursive: true });
   11 |   });
   12 |
>  13 |   test('Generate comprehensive visual review', async ({ browser }) => {
      |       ^ Error: browserType.launch: Chromium distribution 'msedge' is not found at /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
   14 |     const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
   15 |     const reviewDir = path.join(screenshotsDir, `review-${timestamp}`);
   16 |     await fs.mkdir(reviewDir, { recursive: true });
   17 |
   18 |     // Define viewports
   19 |     const viewports = [
   20 |       { name: 'desktop', width: 1920, height: 1080, device: null },
   21 |       { name: 'tablet', width: 768, height: 1024, device: null },
   22 |       { name: 'mobile', width: 375, height: 667, device: devices['iPhone 12'] }
   23 |     ];
   24 |
   25 |     for (const viewport of viewports) {
   26 |       const context = await browser.newContext({
   27 |         viewport: { width: viewport.width, height: viewport.height },
   28 |         ...viewport.device
   29 |       });
   30 |       const page = await context.newPage();
   31 |
   32 |       console.log(`\n📸 Capturing ${viewport.name} screenshots...`);
   33 |
   34 |       // 1. Landing Page - Full
   35 |       await page.goto('/', { waitUntil: 'networkidle' });
   36 |       await page.waitForTimeout(2000); // Wait for animations
   37 |       await page.screenshot({
   38 |         path: path.join(reviewDir, `01-landing-full-${viewport.name}.png`),
   39 |         fullPage: true
   40 |       });
   41 |       console.log(`✓ Landing page full - ${viewport.name}`);
   42 |
   43 |       // 2. Hero Section
   44 |       await page.goto('/');
   45 |       const heroSection = page.locator('section').first();
   46 |       await page.screenshot({
   47 |         path: path.join(reviewDir, `02-hero-section-${viewport.name}.png`),
   48 |         clip: await heroSection.boundingBox() || undefined
   49 |       });
   50 |       console.log(`✓ Hero section - ${viewport.name}`);
   51 |
   52 |       // 3. Pain Points Section
   53 |       const painPoints = page.locator('[data-testid="pain-points"], section:has-text("Drowning in emails")').first();
   54 |       await painPoints.scrollIntoViewIfNeeded();
   55 |       await page.waitForTimeout(500);
   56 |       await page.screenshot({
   57 |         path: path.join(reviewDir, `03-pain-points-${viewport.name}.png`),
   58 |         clip: await painPoints.boundingBox() || undefined
   59 |       });
   60 |       console.log(`✓ Pain points section - ${viewport.name}`);
   61 |
   62 |       // 4. Solution Section
   63 |       const solution = page.locator('section:has-text("CEO of One acts as your intelligent chief of staff")').first();
   64 |       await solution.scrollIntoViewIfNeeded();
   65 |       await page.waitForTimeout(500);
   66 |       await page.screenshot({
   67 |         path: path.join(reviewDir, `04-solution-section-${viewport.name}.png`),
   68 |         clip: await solution.boundingBox() || undefined
   69 |       });
   70 |       console.log(`✓ Solution section - ${viewport.name}`);
   71 |
   72 |       // 5. Testimonials Section
   73 |       const testimonials = page.locator('section:has-text("Jennifer eliminated")').first();
   74 |       if (await testimonials.isVisible()) {
   75 |         await testimonials.scrollIntoViewIfNeeded();
   76 |         await page.waitForTimeout(500);
   77 |         await page.screenshot({
   78 |           path: path.join(reviewDir, `05-testimonials-${viewport.name}.png`),
   79 |           clip: await testimonials.boundingBox() || undefined
   80 |         });
   81 |         console.log(`✓ Testimonials section - ${viewport.name}`);
   82 |       }
   83 |
   84 |       // 6. Footer
   85 |       await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
   86 |       await page.waitForTimeout(1000);
   87 |       const footer = page.locator('footer').first();
   88 |       if (await footer.isVisible()) {
   89 |         await page.screenshot({
   90 |           path: path.join(reviewDir, `06-footer-${viewport.name}.png`),
   91 |           clip: await footer.boundingBox() || undefined
   92 |         });
   93 |         console.log(`✓ Footer - ${viewport.name}`);
   94 |       }
   95 |
   96 |       // 7. Navigation States
   97 |       if (viewport.name === 'mobile') {
   98 |         // Mobile menu
   99 |         const hamburger = page.locator('button[aria-label*="menu" i], button[class*="menu" i], .hamburger').first();
  100 |         if (await hamburger.isVisible()) {
  101 |           await hamburger.click();
  102 |           await page.waitForTimeout(500);
  103 |           await page.screenshot({
  104 |             path: path.join(reviewDir, `07-mobile-menu-open-${viewport.name}.png`)
  105 |           });
  106 |           console.log(`✓ Mobile menu - ${viewport.name}`);
  107 |           await page.click('body', { position: { x: 10, y: 10 } }); // Close menu
  108 |         }
  109 |       }
  110 |
  111 |       // 8. Booking Modal - Empty
  112 |       await page.goto('/');
  113 |       await page.waitForLoadState('networkidle');
```