/**
 * CEO of One Design System
 * 
 * A comprehensive design system following Utlyze brand guidelines
 * Clean, minimalist design with lots of white space
 * Primary: Trust-building blue (#4169E1)
 * Accent: Action-oriented orange for CTAs
 */

// ============================================================================
// Color Palette
// ============================================================================

export const colors = {
  // Primary Colors - Trust & Stability
  primary: {
    50: '#e6eeff',
    100: '#c7d9ff',
    200: '#a3c1ff',
    300: '#7aa5ff',
    400: '#5789ff',
    500: '#4169E1', // Utlyze Blue - Main brand color
    600: '#3454c4',
    700: '#2842a8',
    800: '#1f3189',
    900: '#162360',
  },
  
  // Accent Colors - Energy & Action
  accent: {
    50: '#fff0e6',
    100: '#ffdcc7',
    200: '#ffc4a3',
    300: '#ffa87a',
    400: '#ff8b51',
    500: '#FF6B35', // Orange - CTAs and highlights
    600: '#e5522a',
    700: '#cc3d20',
    800: '#b32d18',
    900: '#991f11',
  },
  
  // Neutral Colors - Clean & Minimal
  neutral: {
    50: '#fafbfc',
    100: '#f5f7f9',
    200: '#ebeef2',
    300: '#d5dae1',
    400: '#a7b1bd',
    500: '#6b7785',
    600: '#4a5568',
    700: '#2d3748',
    800: '#1a202c',
    900: '#0f1419',
  },
  
  // Semantic Colors
  success: {
    light: '#d4edda',
    main: '#28a745',
    dark: '#155724',
  },
  warning: {
    light: '#fff3cd',
    main: '#ffc107',
    dark: '#856404',
  },
  error: {
    light: '#f8d7da',
    main: '#dc3545',
    dark: '#721c24',
  },
  info: {
    light: '#d1ecf1',
    main: '#17a2b8',
    dark: '#0c5460',
  },
  
  // Background Colors
  background: {
    primary: '#ffffff',
    secondary: '#fafbfc',
    tertiary: '#f5f7f9',
    overlay: 'rgba(15, 20, 25, 0.75)',
  },
  
  // Text Colors
  text: {
    primary: '#1a202c',
    secondary: '#4a5568',
    tertiary: '#6b7785',
    inverse: '#ffffff',
    muted: '#a7b1bd',
  },
};

// ============================================================================
// Typography Scale
// ============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    sans: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(', '),
    serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'].join(', '),
    mono: ['Menlo', 'Monaco', 'Consolas', '"Courier New"', 'monospace'].join(', '),
  },
  
  // Font Sizes - Desktop
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  
  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Font Weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Text Styles - Composed
  heading: {
    h1: {
      fontSize: '3.75rem',
      lineHeight: '1.1',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      mobile: {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '3rem',
      lineHeight: '1.2',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      mobile: {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '2.25rem',
      lineHeight: '1.25',
      fontWeight: 600,
      letterSpacing: '-0.025em',
      mobile: {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.875rem',
      lineHeight: '1.375',
      fontWeight: 600,
      letterSpacing: '0',
      mobile: {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      lineHeight: '1.375',
      fontWeight: 600,
      letterSpacing: '0',
      mobile: {
        fontSize: '1.125rem',
      },
    },
    h6: {
      fontSize: '1.25rem',
      lineHeight: '1.5',
      fontWeight: 600,
      letterSpacing: '0',
      mobile: {
        fontSize: '1rem',
      },
    },
  },
  
  body: {
    large: {
      fontSize: '1.125rem',
      lineHeight: '1.75',
      fontWeight: 400,
    },
    regular: {
      fontSize: '1rem',
      lineHeight: '1.625',
      fontWeight: 400,
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: '1.5',
      fontWeight: 400,
    },
  },
};

// ============================================================================
// Spacing System
// ============================================================================

export const spacing = {
  // Base unit: 4px
  0: '0',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
};

// ============================================================================
// Layout System
// ============================================================================

export const layout = {
  // Container widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Content widths
  content: {
    narrow: '768px',
    regular: '1024px',
    wide: '1280px',
  },
  
  // Grid system
  grid: {
    columns: 12,
    gap: spacing[4],
    gapLarge: spacing[8],
  },
};

// ============================================================================
// Border System
// ============================================================================

export const borders = {
  radius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  width: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
  
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    double: 'double',
    none: 'none',
  },
};

// ============================================================================
// Shadows
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Colored shadows
  primary: `0 10px 15px -3px rgba(65, 105, 225, 0.2), 0 4px 6px -2px rgba(65, 105, 225, 0.1)`,
  accent: `0 10px 15px -3px rgba(255, 107, 53, 0.2), 0 4px 6px -2px rgba(255, 107, 53, 0.1)`,
};

// ============================================================================
// Transitions
// ============================================================================

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  timing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  property: {
    all: 'all',
    colors: 'background-color, border-color, color, fill, stroke',
    opacity: 'opacity',
    shadow: 'box-shadow',
    transform: 'transform',
  },
};

// ============================================================================
// Z-Index Scale
// ============================================================================

export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// ============================================================================
// Breakpoints
// ============================================================================

export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================================================
// Component Variants
// ============================================================================

export const components = {
  // Button Variants
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: typography.fontWeight.semibold,
      borderRadius: borders.radius.lg,
      transition: `all ${transitions.duration.normal} ${transitions.timing.easeInOut}`,
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
      textDecoration: 'none',
    },
    
    sizes: {
      sm: {
        padding: `${spacing[2]} ${spacing[4]}`,
        fontSize: typography.fontSize.sm,
        lineHeight: typography.lineHeight.tight,
      },
      md: {
        padding: `${spacing[3]} ${spacing[6]}`,
        fontSize: typography.fontSize.base,
        lineHeight: typography.lineHeight.tight,
      },
      lg: {
        padding: `${spacing[4]} ${spacing[8]}`,
        fontSize: typography.fontSize.lg,
        lineHeight: typography.lineHeight.tight,
      },
      xl: {
        padding: `${spacing[5]} ${spacing[10]}`,
        fontSize: typography.fontSize.xl,
        lineHeight: typography.lineHeight.tight,
      },
    },
    
    variants: {
      primary: {
        backgroundColor: colors.primary[500],
        color: colors.text.inverse,
        boxShadow: shadows.md,
        '&:hover': {
          backgroundColor: colors.primary[600],
          boxShadow: shadows.lg,
          transform: 'translateY(-1px)',
        },
        '&:active': {
          backgroundColor: colors.primary[700],
          transform: 'translateY(0)',
        },
      },
      
      accent: {
        backgroundColor: colors.accent[500],
        color: colors.text.inverse,
        boxShadow: shadows.accent,
        '&:hover': {
          backgroundColor: colors.accent[600],
          boxShadow: shadows.lg,
          transform: 'translateY(-1px)',
        },
        '&:active': {
          backgroundColor: colors.accent[700],
          transform: 'translateY(0)',
        },
      },
      
      secondary: {
        backgroundColor: colors.neutral[100],
        color: colors.text.primary,
        border: `${borders.width[1]} ${borders.style.solid} ${colors.neutral[300]}`,
        '&:hover': {
          backgroundColor: colors.neutral[200],
          borderColor: colors.neutral[400],
        },
        '&:active': {
          backgroundColor: colors.neutral[300],
        },
      },
      
      ghost: {
        backgroundColor: 'transparent',
        color: colors.primary[500],
        '&:hover': {
          backgroundColor: colors.primary[50],
        },
        '&:active': {
          backgroundColor: colors.primary[100],
        },
      },
      
      text: {
        backgroundColor: 'transparent',
        color: colors.primary[500],
        padding: 0,
        textDecoration: 'underline',
        '&:hover': {
          color: colors.primary[600],
        },
      },
    },
  },
  
  // Card Variants
  card: {
    base: {
      backgroundColor: colors.background.primary,
      borderRadius: borders.radius.xl,
      boxShadow: shadows.default,
      overflow: 'hidden',
    },
    
    variants: {
      default: {
        border: `${borders.width[1]} ${borders.style.solid} ${colors.neutral[200]}`,
      },
      
      elevated: {
        boxShadow: shadows.lg,
        '&:hover': {
          boxShadow: shadows.xl,
        },
      },
      
      outlined: {
        border: `${borders.width[2]} ${borders.style.solid} ${colors.neutral[300]}`,
        boxShadow: 'none',
      },
    },
  },
  
  // Input Variants
  input: {
    base: {
      width: '100%',
      backgroundColor: colors.background.primary,
      border: `${borders.width[1]} ${borders.style.solid} ${colors.neutral[300]}`,
      borderRadius: borders.radius.md,
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.normal,
      transition: `all ${transitions.duration.fast} ${transitions.timing.easeInOut}`,
      
      '&:focus': {
        borderColor: colors.primary[500],
        outline: 'none',
        boxShadow: `0 0 0 3px ${colors.primary[100]}`,
      },
      
      '&:disabled': {
        backgroundColor: colors.neutral[50],
        cursor: 'not-allowed',
        opacity: 0.6,
      },
    },
    
    sizes: {
      sm: {
        padding: `${spacing[2]} ${spacing[3]}`,
        fontSize: typography.fontSize.sm,
      },
      md: {
        padding: `${spacing[3]} ${spacing[4]}`,
        fontSize: typography.fontSize.base,
      },
      lg: {
        padding: `${spacing[4]} ${spacing[5]}`,
        fontSize: typography.fontSize.lg,
      },
    },
  },
  
  // Badge Variants
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${spacing[1]} ${spacing[2]}`,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
      borderRadius: borders.radius.full,
      textTransform: 'uppercase',
      letterSpacing: typography.letterSpacing.wider,
    },
    
    variants: {
      primary: {
        backgroundColor: colors.primary[100],
        color: colors.primary[700],
      },
      accent: {
        backgroundColor: colors.accent[100],
        color: colors.accent[700],
      },
      success: {
        backgroundColor: colors.success.light,
        color: colors.success.dark,
      },
      warning: {
        backgroundColor: colors.warning.light,
        color: colors.warning.dark,
      },
      error: {
        backgroundColor: colors.error.light,
        color: colors.error.dark,
      },
      neutral: {
        backgroundColor: colors.neutral[100],
        color: colors.neutral[700],
      },
    },
  },
};

// ============================================================================
// Animation Keyframes
// ============================================================================

export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  
  slideInUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  
  slideInDown: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  
  slideInLeft: {
    from: { transform: 'translateX(-20px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
  
  slideInRight: {
    from: { transform: 'translateX(20px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
  
  scaleIn: {
    from: { transform: 'scale(0.9)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  
  pulse: {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
  },
  
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
  },
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get a CSS variable value from the design system
 */
export const getCSSVariable = (path: string): string => {
  const keys = path.split('.');
  let value: any = { colors, typography, spacing, borders, shadows, transitions, zIndex };
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return '';
  }
  
  return value;
};

/**
 * Create a responsive style object
 */
export const responsive = (styles: {
  base?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
  '2xl'?: any;
}) => {
  const result: any = { ...styles.base };
  
  if (styles.sm) {
    result[`@media (min-width: ${breakpoints.sm})`] = styles.sm;
  }
  if (styles.md) {
    result[`@media (min-width: ${breakpoints.md})`] = styles.md;
  }
  if (styles.lg) {
    result[`@media (min-width: ${breakpoints.lg})`] = styles.lg;
  }
  if (styles.xl) {
    result[`@media (min-width: ${breakpoints.xl})`] = styles.xl;
  }
  if (styles['2xl']) {
    result[`@media (min-width: ${breakpoints['2xl']})`] = styles['2xl'];
  }
  
  return result;
};

/**
 * Generate CSS custom properties from design tokens
 */
export const generateCSSVariables = () => {
  const cssVars: string[] = [];
  
  // Colors
  const colorCategories = Object.keys(colors) as Array<keyof typeof colors>;
  colorCategories.forEach((category) => {
    const categoryValues = colors[category];
    if (typeof categoryValues === 'object') {
      const colorKeys = Object.keys(categoryValues);
      colorKeys.forEach((key) => {
        const value = (categoryValues as any)[key];
        cssVars.push(`--color-${category}-${key}: ${value};`);
      });
    }
  });
  
  // Spacing
  const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
  spacingKeys.forEach((key) => {
    const value = spacing[key];
    cssVars.push(`--spacing-${key}: ${value};`);
  });
  
  // Typography
  cssVars.push(`--font-sans: ${typography.fontFamily.sans};`);
  cssVars.push(`--font-serif: ${typography.fontFamily.serif};`);
  cssVars.push(`--font-mono: ${typography.fontFamily.mono};`);
  
  const fontSizeKeys = Object.keys(typography.fontSize) as Array<keyof typeof typography.fontSize>;
  fontSizeKeys.forEach((key) => {
    const value = typography.fontSize[key];
    cssVars.push(`--font-size-${key}: ${value};`);
  });
  
  // Shadows
  const shadowKeys = Object.keys(shadows) as Array<keyof typeof shadows>;
  shadowKeys.forEach((key) => {
    const value = shadows[key];
    cssVars.push(`--shadow-${key}: ${value};`);
  });
  
  // Border radius
  const radiusKeys = Object.keys(borders.radius) as Array<keyof typeof borders.radius>;
  radiusKeys.forEach((key) => {
    const value = borders.radius[key];
    cssVars.push(`--radius-${key}: ${value};`);
  });
  
  return `:root {\n  ${cssVars.join('\n  ')}\n}`;
};

// Export everything as default for easy importing
export default {
  colors,
  typography,
  spacing,
  layout,
  borders,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  components,
  animations,
  getCSSVariable,
  responsive,
  generateCSSVariables,
};