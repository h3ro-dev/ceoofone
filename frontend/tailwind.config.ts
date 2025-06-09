import type { Config } from 'tailwindcss';
import designSystem from './src/styles/design-system';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: designSystem.colors.primary.blue,
          blue: designSystem.colors.primary.blue,
          orange: designSystem.colors.primary.orange,
        },
        // Neutral Colors
        neutral: designSystem.colors.neutral,
        // Semantic Colors
        semantic: designSystem.colors.semantic,
        // Legacy support
        accent: {
          DEFAULT: designSystem.colors.primary.orange,
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        sans: designSystem.typography.fontFamily.primary.split(',').map(f => f.trim().replace(/"/g, '')),
        mono: designSystem.typography.fontFamily.monospace.split(',').map(f => f.trim().replace(/"/g, '')),
      },
      fontSize: designSystem.typography.fontSize,
      fontWeight: designSystem.typography.fontWeight,
      lineHeight: designSystem.typography.lineHeight,
      spacing: designSystem.spacing,
      borderRadius: designSystem.borderRadius,
      boxShadow: designSystem.shadows,
      animation: {
        'fade-in': `fadeIn ${designSystem.animation.duration.deliberate} ${designSystem.animation.easing.easeOut}`,
        'slide-up': `slideUp ${designSystem.animation.duration.deliberate} ${designSystem.animation.easing.easeOut}`,
        'button-hover': `buttonHover ${designSystem.animation.duration.quick} ${designSystem.animation.easing.easeOut}`,
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        buttonHover: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
        },
      },
      screens: {
        sm: designSystem.breakpoints.sm,
        md: designSystem.breakpoints.md,
        lg: designSystem.breakpoints.lg,
        xl: designSystem.breakpoints.xl,
        '2xl': designSystem.breakpoints['2xl'],
      },
    },
  },
  plugins: [],
};
export default config;
