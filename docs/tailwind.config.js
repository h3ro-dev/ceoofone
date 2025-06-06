/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Brand Colors
      colors: {
        // Primary Utlyze Brand Colors
        primary: {
          50: '#eff4ff',
          100: '#dbe4fe',
          200: '#bfcffe',
          300: '#93b4fd',
          400: '#6094fa',
          500: '#4169e1', // Primary Utlyze Blue
          600: '#2d4ed8',
          700: '#2539c5',
          800: '#2330a0',
          900: '#212f7f',
          950: '#171e4f',
        },
        // Action Orange for CTAs
        accent: {
          50: '#fff8f3',
          100: '#ffe8d5',
          200: '#fed2aa',
          300: '#fdb174',
          400: '#fb8a3c',
          500: '#ff6b35', // Action Orange
          600: '#e8501f',
          700: '#c63e18',
          800: '#a0331a',
          900: '#822d19',
          950: '#46140a',
        },
        // Neutral Grays
        neutral: {
          50: '#f8f9fa',  // Soft Gray
          100: '#e9ecef', // Light Gray
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d', // Medium Gray
          600: '#495057',
          700: '#343a40', // Dark Gray
          800: '#212529', // Charcoal
          900: '#16181b',
          950: '#0d0f11',
        },
        // Semantic Colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#28a745', // Success Green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#ffc107', // Warning Amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#dc3545', // Error Red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        info: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#17a2b8', // Info Blue
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      
      // Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'monospace'],
      },
      
      // Font Sizes (Type Scale)
      fontSize: {
        'caption': ['0.75rem', { lineHeight: '2' }],        // 12px
        'body-sm': ['0.875rem', { lineHeight: '1.625' }],   // 14px
        'body': ['1rem', { lineHeight: '1.5' }],            // 16px
        'body-lg': ['1.125rem', { lineHeight: '1.5' }],     // 18px
        'h6': ['1.125rem', { lineHeight: '1.375' }],        // 18px
        'h5': ['1.25rem', { lineHeight: '1.375' }],         // 20px
        'h4': ['1.5rem', { lineHeight: '1.375' }],          // 24px
        'h3': ['1.875rem', { lineHeight: '1.25' }],         // 30px
        'h2': ['2.25rem', { lineHeight: '1.25' }],          // 36px
        'h1': ['3rem', { lineHeight: '1.25' }],             // 48px
        'display': ['4rem', { lineHeight: '1.25' }],        // 64px
      },
      
      // Font Weights
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      
      // Spacing (8px base unit)
      spacing: {
        'xs': '0.5rem',   // 8px
        'sm': '0.75rem',  // 12px
        'md': '1rem',     // 16px
        'lg': '1.5rem',   // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',    // 48px
        '3xl': '4rem',    // 64px
        '4xl': '5rem',    // 80px
        '5xl': '6rem',    // 96px
        '6xl': '8rem',    // 128px
        '7xl': '10rem',   // 160px
      },
      
      // Border Radius
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      
      // Box Shadows
      boxShadow: {
        'button-primary': '0 4px 12px rgba(255, 107, 53, 0.25)',
        'button-secondary': '0 2px 8px rgba(65, 105, 225, 0.15)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'feature-card': '0 8px 24px rgba(65, 105, 225, 0.12)',
        'focus': '0 0 0 3px rgba(65, 105, 225, 0.1)',
      },
      
      // Animation & Transitions
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        'ease-in-out': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      
      transitionDuration: {
        'instant': '100ms',
        'quick': '200ms',
        'standard': '300ms',
        'deliberate': '500ms',
        'slow': '700ms',
      },
      
      // Layout
      maxWidth: {
        'container': '1200px',
      },
      
      // Grid
      gridTemplateColumns: {
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fit-350': 'repeat(auto-fit, minmax(350px, 1fr))',
      },
    },
  },
  plugins: [
    // Custom component classes
    function({ addComponents, theme }) {
      addComponents({
        // Button Components
        '.btn-primary': {
          backgroundColor: theme('colors.accent.500'),
          color: theme('colors.white'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.semibold'),
          boxShadow: theme('boxShadow.button-primary'),
          transition: 'all 200ms ease-out',
          '&:hover': {
            backgroundColor: theme('colors.accent.600'),
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(255, 107, 53, 0.35)',
          },
          '&:focus': {
            outline: 'none',
            boxShadow: `${theme('boxShadow.button-primary')}, ${theme('boxShadow.focus')}`,
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        
        '.btn-secondary': {
          backgroundColor: theme('colors.primary.500'),
          color: theme('colors.white'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.semibold'),
          boxShadow: theme('boxShadow.button-secondary'),
          transition: 'all 200ms ease-out',
          '&:hover': {
            backgroundColor: theme('colors.primary.600'),
          },
          '&:focus': {
            outline: 'none',
            boxShadow: `${theme('boxShadow.button-secondary')}, ${theme('boxShadow.focus')}`,
          },
        },
        
        '.btn-ghost': {
          backgroundColor: 'transparent',
          color: theme('colors.primary.500'),
          padding: `${theme('spacing.2.5')} ${theme('spacing.5.5')}`,
          border: `2px solid ${theme('colors.primary.500')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.semibold'),
          transition: 'all 200ms ease-out',
          '&:hover': {
            backgroundColor: theme('colors.primary.500'),
            color: theme('colors.white'),
          },
          '&:focus': {
            outline: 'none',
            boxShadow: theme('boxShadow.focus'),
          },
        },
        
        // Card Components
        '.card': {
          backgroundColor: theme('colors.white'),
          border: `1px solid ${theme('colors.neutral.100')}`,
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.card'),
          transition: 'all 300ms ease-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.card-hover'),
          },
        },
        
        '.card-feature': {
          backgroundColor: theme('colors.white'),
          border: `2px solid ${theme('colors.primary.500')}`,
          borderRadius: theme('borderRadius.xl'),
          padding: theme('spacing.8'),
          boxShadow: theme('boxShadow.feature-card'),
        },
        
        // Form Components
        '.input': {
          backgroundColor: theme('colors.white'),
          border: `2px solid ${theme('colors.neutral.100')}`,
          borderRadius: theme('borderRadius.md'),
          padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
          fontSize: theme('fontSize.body')[0],
          transition: 'all 200ms ease-out',
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.primary.500'),
            boxShadow: theme('boxShadow.focus'),
          },
          '&.error': {
            borderColor: theme('colors.error.500'),
          },
        },
        
        // Typography Utilities
        '.text-display': {
          fontSize: theme('fontSize.display')[0],
          lineHeight: theme('fontSize.display')[1].lineHeight,
          fontWeight: theme('fontWeight.extrabold'),
        },
        
        '.text-h1': {
          fontSize: theme('fontSize.h1')[0],
          lineHeight: theme('fontSize.h1')[1].lineHeight,
          fontWeight: theme('fontWeight.bold'),
        },
        
        '.text-h2': {
          fontSize: theme('fontSize.h2')[0],
          lineHeight: theme('fontSize.h2')[1].lineHeight,
          fontWeight: theme('fontWeight.bold'),
        },
        
        '.text-h3': {
          fontSize: theme('fontSize.h3')[0],
          lineHeight: theme('fontSize.h3')[1].lineHeight,
          fontWeight: theme('fontWeight.semibold'),
        },
        
        '.text-h4': {
          fontSize: theme('fontSize.h4')[0],
          lineHeight: theme('fontSize.h4')[1].lineHeight,
          fontWeight: theme('fontWeight.semibold'),
        },
        
        '.text-body-lg': {
          fontSize: theme('fontSize.body-lg')[0],
          lineHeight: theme('fontSize.body-lg')[1].lineHeight,
          fontWeight: theme('fontWeight.normal'),
        },
        
        '.text-body': {
          fontSize: theme('fontSize.body')[0],
          lineHeight: theme('fontSize.body')[1].lineHeight,
          fontWeight: theme('fontWeight.normal'),
        },
        
        // Layout Utilities
        '.container-site': {
          maxWidth: theme('maxWidth.container'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.6'),
          paddingRight: theme('spacing.6'),
          '@media (max-width: 768px)': {
            paddingLeft: theme('spacing.4'),
            paddingRight: theme('spacing.4'),
          },
        },
        
        '.section-spacing': {
          paddingTop: theme('spacing.5xl'),
          paddingBottom: theme('spacing.5xl'),
          '@media (max-width: 768px)': {
            paddingTop: theme('spacing.3xl'),
            paddingBottom: theme('spacing.3xl'),
          },
        },
      })
    },
  ],
}