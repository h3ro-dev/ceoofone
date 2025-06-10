import { test, expect } from '@playwright/test';

test.describe('Smoke Test - CEO of One', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check if page loads
    await expect(page).toHaveTitle(/CEO of One|Utlyze/);
    
    // Check if hero section exists
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();
    
    // Check if primary CTA exists
    const ctaButton = page.locator('button, a').filter({ hasText: /Get.*Free.*Strategy|Book.*Consultation|Get Started/i }).first();
    await expect(ctaButton).toBeVisible();
    
    console.log('✅ Homepage loaded successfully');
  });

  test('should have key sections', async ({ page }) => {
    await page.goto('/');
    
    // Check for key content
    const painPointsIndicator = page.locator('text=/drowning|overwhelm|wearing.*hat/i').first();
    const solutionIndicator = page.locator('text=/AI|leverage|focus.*20%|chief.*staff/i').first();
    
    expect(await painPointsIndicator.count()).toBeGreaterThan(0);
    expect(await solutionIndicator.count()).toBeGreaterThan(0);
    
    console.log('✅ Key sections found');
  });

  test('should open booking modal', async ({ page }) => {
    await page.goto('/');
    
    // Find and click primary CTA
    const ctaButton = page.locator('button, a').filter({ hasText: /Get.*Free.*Strategy|Book.*Consultation|Get Started/i }).first();
    await ctaButton.click();
    
    // Wait for modal or new page
    await page.waitForTimeout(1000);
    
    // Check if modal opened or navigation happened
    const modalVisible = await page.locator('[role="dialog"], .modal, [class*="modal"]').isVisible().catch(() => false);
    const urlChanged = page.url() !== 'http://localhost:3000/';
    
    expect(modalVisible || urlChanged).toBeTruthy();
    
    console.log('✅ Booking flow initiated');
  });

  test('should capture current state screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of current state
    await page.screenshot({
      path: 'tests/screenshots/current-homepage.png',
      fullPage: true
    });
    
    console.log('✅ Screenshot captured: tests/screenshots/current-homepage.png');
  });
});