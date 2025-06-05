import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Utlyze brand colors
        primary: {
          DEFAULT: '#4169E1', // Utlyze blue
          50: '#F0F4FF',
          100: '#E5EFFF',
          200: '#D1E1FF',
          300: '#B3CCFF',
          400: '#85A3FF',
          500: '#4169E1',
          600: '#2952CC',
          700: '#1E3F99',
          800: '#1A3366',
          900: '#152633',
        },
        accent: {
          DEFAULT: '#FF6B35', // Orange for CTAs
          50: '#FFF5F2',
          100: '#FFEDE5',
          200: '#FFD6CC',
          300: '#FFB399',
          400: '#FF8F66',
          500: '#FF6B35',
          600: '#E6551F',
          700: '#B8421A',
          800: '#8A3214',
          900: '#5C220E',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
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
      },
    },
  },
  plugins: [],
};
export default config;
