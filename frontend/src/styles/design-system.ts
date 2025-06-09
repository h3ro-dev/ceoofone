// CEO of One Design System
// Design tokens implementing the brand guidelines and design system

export const colors = {
  // Primary Colors
  primary: {
    blue: '#4169E1', // Utlyze Blue - Trust, stability, intelligence
    orange: '#FF6B35', // Action Orange - Energy, transformation, urgency
  },
  
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    softGray: '#F8F9FA',
    lightGray: '#E9ECEF',
    mediumGray: '#6C757D',
    darkGray: '#343A40',
    charcoal: '#212529',
  },
  
  // Semantic Colors
  semantic: {
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',
  },
} as const;

export const typography = {
  // Font Family
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    monospace: '"SF Mono", "Monaco", "Inconsolata", monospace',
  },
  
  // Font Sizes
  fontSize: {
    display: '4rem', // 64px
    h1: '3rem', // 48px
    h2: '2.25rem', // 36px
    h3: '1.875rem', // 30px
    h4: '1.5rem', // 24px
    h5: '1.25rem', // 20px
    h6: '1.125rem', // 18px
    bodyLarge: '1.125rem', // 18px
    body: '1rem', // 16px
    bodySmall: '0.875rem', // 14px
    caption: '0.75rem', // 12px
  },
  
  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

export const spacing = {
  xs: '0.5rem', // 8px
  sm: '0.75rem', // 12px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
  '4xl': '5rem', // 80px
  '5xl': '6rem', // 96px
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.25rem', // 4px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  card: '0 4px 16px rgba(0, 0, 0, 0.08)',
  cardHover: '0 8px 24px rgba(0, 0, 0, 0.12)',
  button: '0 4px 12px rgba(65, 105, 225, 0.25)',
  buttonOrange: '0 4px 12px rgba(255, 107, 53, 0.25)',
} as const;

export const animation = {
  // Timing Functions
  easing: {
    easeOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  
  // Duration Scale
  duration: {
    instant: '100ms',
    quick: '200ms',
    standard: '300ms',
    deliberate: '500ms',
    slow: '700ms',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Component-specific tokens
export const components = {
  button: {
    primary: {
      background: colors.primary.orange,
      text: colors.neutral.white,
      shadow: shadows.buttonOrange,
      hover: {
        background: '#E55A2B', // Darkened 5%
        transform: 'translateY(-2px)',
      },
    },
    secondary: {
      background: colors.primary.blue,
      text: colors.neutral.white,
      shadow: shadows.button,
      hover: {
        background: '#3458C8', // Darkened 5%
      },
    },
    ghost: {
      background: 'transparent',
      border: `2px solid ${colors.primary.blue}`,
      text: colors.primary.blue,
      hover: {
        background: colors.primary.blue,
        text: colors.neutral.white,
      },
    },
  },
  
  card: {
    primary: {
      background: colors.neutral.white,
      border: `1px solid ${colors.neutral.lightGray}`,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      shadow: shadows.card,
      hover: {
        shadow: shadows.cardHover,
        transform: 'translateY(-4px)',
      },
    },
    feature: {
      background: colors.neutral.white,
      border: `2px solid ${colors.primary.blue}`,
      borderRadius: borderRadius.xl,
      padding: spacing.xl,
      shadow: '0 8px 24px rgba(65, 105, 225, 0.12)',
    },
  },
  
  input: {
    background: colors.neutral.white,
    border: `2px solid ${colors.neutral.lightGray}`,
    borderRadius: borderRadius.md,
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.fontSize.body,
    focus: {
      border: colors.primary.blue,
      shadow: `0 0 0 3px rgba(65, 105, 225, 0.1)`,
    },
    error: {
      border: colors.semantic.error,
    },
  },
} as const;

// CSS Custom Properties for dynamic theming
export const getCSSVariables = () => `
  :root {
    /* Colors */
    --color-primary-blue: ${colors.primary.blue};
    --color-primary-orange: ${colors.primary.orange};
    --color-neutral-white: ${colors.neutral.white};
    --color-neutral-soft-gray: ${colors.neutral.softGray};
    --color-neutral-light-gray: ${colors.neutral.lightGray};
    --color-neutral-medium-gray: ${colors.neutral.mediumGray};
    --color-neutral-dark-gray: ${colors.neutral.darkGray};
    --color-neutral-charcoal: ${colors.neutral.charcoal};
    --color-success: ${colors.semantic.success};
    --color-warning: ${colors.semantic.warning};
    --color-error: ${colors.semantic.error};
    --color-info: ${colors.semantic.info};
    
    /* Typography */
    --font-family-primary: ${typography.fontFamily.primary};
    --font-family-monospace: ${typography.fontFamily.monospace};
    
    /* Spacing */
    --spacing-xs: ${spacing.xs};
    --spacing-sm: ${spacing.sm};
    --spacing-md: ${spacing.md};
    --spacing-lg: ${spacing.lg};
    --spacing-xl: ${spacing.xl};
    --spacing-2xl: ${spacing['2xl']};
    --spacing-3xl: ${spacing['3xl']};
    --spacing-4xl: ${spacing['4xl']};
    --spacing-5xl: ${spacing['5xl']};
    
    /* Animation */
    --animation-ease-out: ${animation.easing.easeOut};
    --animation-ease-in-out: ${animation.easing.easeInOut};
    --animation-spring: ${animation.easing.spring};
    --animation-instant: ${animation.duration.instant};
    --animation-quick: ${animation.duration.quick};
    --animation-standard: ${animation.duration.standard};
  }
`;

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  components,
  getCSSVariables,
};