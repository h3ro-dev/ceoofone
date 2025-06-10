#!/bin/bash

# Run initial tests to check site compliance
echo "Running initial Playwright tests..."
cd "$(dirname "$0")"

# Set PATH to include node
export PATH="/Users/jamesbrady/.nvm/versions/node/v22.15.0/bin:$PATH"

# First install browsers if needed
echo "Installing Playwright browsers..."
npx playwright install chromium

# Run a simple test to check if site is accessible
echo "Running landing page test..."
npx playwright test landing-page.spec.ts --project=chromium --reporter=list

echo "Test run complete!"