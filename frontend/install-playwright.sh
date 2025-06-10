#!/bin/bash

# Install Playwright browsers
echo "Installing Playwright browsers..."
cd "$(dirname "$0")"

# Set PATH to include node
export PATH="/Users/jamesbrady/.nvm/versions/node/v22.15.0/bin:$PATH"

# Install browsers
npx playwright install

echo "Playwright browsers installed successfully!"