export const APP_CONFIG = {
  name: 'CEO of One',
  description: 'AI-powered chief of staff for solo CEOs',
  company: 'Utlyze',
  version: '1.0.0',
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://ceoofone.com'
      : 'http://localhost:3000',
} as const;

export const BRAND_COLORS = {
  primary: '#4169E1', // Utlyze blue
  accent: '#FF6B35', // Orange for CTAs
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  pricing: '/pricing',
  contact: '/contact',
  dashboard: '/dashboard',
} as const;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/utlyze',
  linkedin: 'https://linkedin.com/company/utlyze',
} as const;
