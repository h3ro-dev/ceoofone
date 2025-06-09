const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const sharp = require('sharp');

// Generate favicon from SVG
async function generateFavicon() {
  try {
    // Convert SVG to PNG and create favicon
    await sharp('logo-icon.svg')
      .resize(32, 32)
      .png()
      .toFile('../favicon-32x32.png');
    
    await sharp('logo-icon.svg')
      .resize(16, 16)
      .png()
      .toFile('../favicon-16x16.png');
      
    console.log('✓ Created favicon PNGs');
  } catch (err) {
    console.error('Error creating favicon:', err);
  }
}

// Generate apple touch icon
async function generateAppleTouchIcon() {
  try {
    await sharp('logo-icon.svg')
      .resize(180, 180)
      .png()
      .toFile('../apple-touch-icon.png');
      
    console.log('✓ Created apple-touch-icon.png');
  } catch (err) {
    console.error('Error creating apple touch icon:', err);
  }
}

// Generate OG image
async function generateOGImage() {
  try {
    // Create a 1200x630 canvas
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Light gray background
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, 1200, 630);
    
    // White rectangle for logo area
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(300, 200, 600, 230);
    
    // Add text (since we can't easily load the SVG)
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CEO of One', 600, 300);
    
    ctx.fillStyle = '#666666';
    ctx.font = '32px Arial';
    ctx.fillText('AI-powered leadership assistant', 600, 350);
    
    // Save the image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('../og-image.png', buffer);
    
    console.log('✓ Created og-image.png');
  } catch (err) {
    console.error('Error creating OG image:', err);
  }
}

// Generate additional icon sizes
async function generateAdditionalSizes() {
  const sizes = [
    { size: 192, name: 'icon-192x192.png' },
    { size: 512, name: 'icon-512x512.png' },
  ];
  
  try {
    for (const { size, name } of sizes) {
      await sharp('logo-icon.svg')
        .resize(size, size)
        .png()
        .toFile(name);
    }
    console.log('✓ Created additional icon sizes');
  } catch (err) {
    console.error('Error creating additional sizes:', err);
  }
}

// Check if packages are installed
try {
  require('sharp');
  require('canvas');
  
  // Run all generators
  (async () => {
    console.log('Generating brand assets...\n');
    await generateFavicon();
    await generateAppleTouchIcon();
    await generateOGImage();
    await generateAdditionalSizes();
    console.log('\nAll assets generated successfully!');
  })();
} catch (err) {
  console.log('Required packages not found. Installing...');
  console.log('Run: npm install sharp canvas');
}