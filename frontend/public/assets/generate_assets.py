#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw
import cairosvg
import io

# Define colors
UTLYZE_BLUE = (65, 105, 225)  # #4169E1
WHITE = (255, 255, 255)
LIGHT_GRAY = (240, 240, 240)

def create_favicon():
    """Create favicon.ico with 16x16 and 32x32 sizes"""
    # Create images for different sizes
    icon_16 = Image.new('RGBA', (16, 16), (255, 255, 255, 0))
    icon_32 = Image.new('RGBA', (32, 32), (255, 255, 255, 0))
    
    # Draw 16x16 icon
    draw_16 = ImageDraw.Draw(icon_16)
    # Outer circle
    draw_16.ellipse([1, 1, 14, 14], outline=UTLYZE_BLUE, width=1)
    # Person head
    draw_16.ellipse([6, 4, 9, 7], fill=UTLYZE_BLUE)
    # Person body
    draw_16.rectangle([5, 8, 10, 12], fill=UTLYZE_BLUE)
    
    # Draw 32x32 icon
    draw_32 = ImageDraw.Draw(icon_32)
    # Outer circle
    draw_32.ellipse([2, 2, 29, 29], outline=UTLYZE_BLUE, width=2)
    # Person head
    draw_32.ellipse([12, 8, 19, 15], fill=UTLYZE_BLUE)
    # Person body (simplified)
    draw_32.polygon([(10, 20), (10, 16), (12, 14), (19, 14), (21, 16), (21, 20)], fill=UTLYZE_BLUE)
    # AI dots
    draw_32.ellipse([6, 14, 8, 16], fill=UTLYZE_BLUE)
    draw_32.ellipse([23, 14, 25, 16], fill=UTLYZE_BLUE)
    
    # Save as ICO file
    icon_32.save('../favicon.ico', format='ICO', sizes=[(16, 16), (32, 32)])
    
    # Also save individual PNGs for other uses
    icon_16.save('favicon-16x16.png', 'PNG')
    icon_32.save('favicon-32x32.png', 'PNG')

def create_apple_touch_icon():
    """Create apple-touch-icon.png at 180x180"""
    # Convert SVG to PNG
    svg_path = 'logo-icon.svg'
    png_data = cairosvg.svg2png(url=svg_path, output_width=180, output_height=180)
    
    # Open with PIL
    image = Image.open(io.BytesIO(png_data))
    
    # Create white background
    background = Image.new('RGBA', (180, 180), (255, 255, 255, 255))
    
    # Paste icon on white background
    background.paste(image, (0, 0), image)
    
    # Save
    background.save('../apple-touch-icon.png', 'PNG')

def create_og_image():
    """Create Open Graph image at 1200x630"""
    # Create base image with light background
    og_image = Image.new('RGB', (1200, 630), LIGHT_GRAY)
    draw = ImageDraw.Draw(og_image)
    
    # Convert logo SVG to PNG for embedding
    logo_png_data = cairosvg.svg2png(url='logo.svg', output_width=480, output_height=120)
    logo_image = Image.open(io.BytesIO(logo_png_data))
    
    # Center the logo
    logo_x = (1200 - 480) // 2
    logo_y = (630 - 120) // 2 - 50
    
    # Create a white rectangle behind logo for contrast
    draw.rectangle([logo_x - 40, logo_y - 40, logo_x + 520, logo_y + 160], fill=WHITE)
    
    # Paste logo
    og_image.paste(logo_image, (logo_x, logo_y), logo_image if logo_image.mode == 'RGBA' else None)
    
    # Add tagline below
    # Note: PIL doesn't have great font support by default, so we'll keep it simple
    # In production, you'd want to use a proper font
    
    # Save
    og_image.save('../og-image.png', 'PNG', optimize=True)

def create_additional_sizes():
    """Create additional icon sizes for various platforms"""
    sizes = [
        (192, 'icon-192x192.png'),  # PWA
        (512, 'icon-512x512.png'),  # PWA
        (72, 'icon-72x72.png'),     # Older iOS
        (144, 'icon-144x144.png'),  # Retina
    ]
    
    for size, filename in sizes:
        png_data = cairosvg.svg2png(url='logo-icon.svg', output_width=size, output_height=size)
        image = Image.open(io.BytesIO(png_data))
        
        # Create white background
        background = Image.new('RGBA', (size, size), (255, 255, 255, 255))
        background.paste(image, (0, 0), image)
        
        background.save(filename, 'PNG', optimize=True)

if __name__ == '__main__':
    print("Generating brand assets...")
    
    try:
        create_favicon()
        print("✓ Created favicon.ico")
        
        create_apple_touch_icon()
        print("✓ Created apple-touch-icon.png")
        
        create_og_image()
        print("✓ Created og-image.png")
        
        create_additional_sizes()
        print("✓ Created additional icon sizes")
        
        print("\nAll assets generated successfully!")
        
    except Exception as e:
        print(f"Error: {e}")
        print("\nMake sure you have the required packages installed:")
        print("pip install pillow cairosvg")