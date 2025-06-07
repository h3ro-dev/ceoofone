# CEO of One Design System Documentation

## Overview

The CEO of One design system is built following Utlyze brand guidelines with a focus on clean, minimalist design that helps solo CEOs focus on what matters. This system provides consistent design tokens, components, and utilities for building a cohesive user experience.

## Core Principles

1. **Clarity Over Cleverness** - Every element should have a clear purpose
2. **White Space is Sacred** - Generous spacing creates focus and reduces cognitive load
3. **Trust Through Consistency** - Unified design language builds credibility
4. **Action-Oriented Design** - Clear CTAs guide users to desired outcomes

## Color System

### Primary Palette - Trust & Stability

The primary blue color (#4169E1) represents trust, stability, and professionalism - essential qualities for a CEO tool.

```typescript
import { colors } from '@/styles/design-system';

// Primary blue for main brand elements
<div style={{ color: colors.primary[500] }}>
  CEO of One
</div>

// Lighter shades for backgrounds
<div style={{ backgroundColor: colors.primary[50] }}>
  Light background
</div>
```

### Accent Palette - Energy & Action

The accent orange (#FF6B35) is reserved for CTAs and elements that require immediate attention.

```typescript
// CTA button
<button style={{ backgroundColor: colors.accent[500] }}>
  Get Started
</button>

// Hover state
<button style={{ backgroundColor: colors.accent[600] }}>
  Get Started (hover)
</button>
```

### Semantic Colors

Use semantic colors for consistent messaging:

```typescript
// Success messages
<Alert color={colors.success.main}>
  Your strategy session has been booked!
</Alert>

// Error states
<Input style={{ borderColor: colors.error.main }} />
```

## Typography

### Font Stack

We use system fonts for optimal performance and native feel:

```typescript
import { typography } from '@/styles/design-system';

// Apply font family
<body style={{ fontFamily: typography.fontFamily.sans }}>
```

### Type Scale

The typography scale follows a harmonious progression:

```typescript
// Hero heading
<h1 style={{
  fontSize: typography.heading.h1.fontSize,
  lineHeight: typography.heading.h1.lineHeight,
  fontWeight: typography.heading.h1.fontWeight,
}}>
  Focus on the 20% that matters
</h1>

// Body text
<p style={{
  fontSize: typography.body.regular.fontSize,
  lineHeight: typography.body.regular.lineHeight,
}}>
  Your AI-powered chief of staff
</p>
```

### Responsive Typography

Use mobile variants for smaller screens:

```typescript
// Responsive heading
<h1 style={{
  fontSize: typography.heading.h1.mobile.fontSize, // On mobile
  fontSize: typography.heading.h1.fontSize, // On desktop
}}>
```

## Spacing System

The spacing system is based on a 4px unit for consistent rhythm:

```typescript
import { spacing } from '@/styles/design-system';

// Component spacing
<div style={{
  padding: spacing[4], // 16px
  marginBottom: spacing[8], // 32px
}}>

// Section spacing
<section style={{
  paddingTop: spacing[20], // 80px
  paddingBottom: spacing[20], // 80px
}}>
```

### Common Spacing Patterns

- **Tight**: spacing[2] (8px) - For related elements
- **Default**: spacing[4] (16px) - Standard spacing
- **Comfortable**: spacing[8] (32px) - Between sections
- **Spacious**: spacing[16] (64px) - Major sections

## Component Patterns

### Buttons

Use predefined button variants for consistency:

```typescript
import { components } from '@/styles/design-system';

// Primary CTA
<button style={{
  ...components.button.base,
  ...components.button.sizes.lg,
  ...components.button.variants.primary,
}}>
  Book Strategy Session
</button>

// Secondary action
<button style={{
  ...components.button.base,
  ...components.button.sizes.md,
  ...components.button.variants.secondary,
}}>
  Learn More
</button>

// Ghost button
<button style={{
  ...components.button.base,
  ...components.button.sizes.md,
  ...components.button.variants.ghost,
}}>
  View Examples
</button>
```

### Cards

Cards create contained content areas:

```typescript
// Default card
<div style={{
  ...components.card.base,
  ...components.card.variants.default,
  padding: spacing[6],
}}>
  <h3>AI-Powered Insights</h3>
  <p>Get clarity on what truly drives growth</p>
</div>

// Elevated card (for emphasis)
<div style={{
  ...components.card.base,
  ...components.card.variants.elevated,
}}>
  Premium feature
</div>
```

### Form Inputs

Consistent input styling:

```typescript
// Text input
<input
  type="text"
  style={{
    ...components.input.base,
    ...components.input.sizes.md,
  }}
  placeholder="Enter your email"
/>

// Large input for hero sections
<input
  style={{
    ...components.input.base,
    ...components.input.sizes.lg,
  }}
/>
```

## Layout Guidelines

### Container Widths

```typescript
import { layout } from '@/styles/design-system';

// Content container
<div style={{ maxWidth: layout.content.regular }}>
  Main content area
</div>

// Narrow content (for readability)
<article style={{ maxWidth: layout.content.narrow }}>
  Blog post content
</article>
```

### Grid System

Use the 12-column grid with consistent gaps:

```typescript
// Grid container
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: layout.grid.gap,
}}>
  <div style={{ gridColumn: 'span 8' }}>Main content</div>
  <div style={{ gridColumn: 'span 4' }}>Sidebar</div>
</div>
```

## Shadows & Elevation

Use shadows to create visual hierarchy:

```typescript
import { shadows } from '@/styles/design-system';

// Subtle elevation
<div style={{ boxShadow: shadows.sm }}>
  Card content
</div>

// Interactive elements
<button style={{ 
  boxShadow: shadows.md,
  '&:hover': { boxShadow: shadows.lg }
}}>
  Elevated button
</button>

// Colored shadows for brand elements
<div style={{ boxShadow: shadows.primary }}>
  Primary branded card
</div>
```

## Animations

Smooth transitions enhance user experience:

```typescript
import { transitions, animations } from '@/styles/design-system';

// Button transition
<button style={{
  transition: `all ${transitions.duration.normal} ${transitions.timing.easeInOut}`,
}}>

// Fade in animation
<div style={{
  animation: `fadeIn ${transitions.duration.normal} ${transitions.timing.easeOut}`,
}}>

// Slide up on appear
<div style={{
  animation: `slideInUp ${transitions.duration.normal} ${transitions.timing.easeOut}`,
}}>
```

## Responsive Design

### Breakpoints

```typescript
import { breakpoints } from '@/styles/design-system';

// Media queries
const styles = `
  @media (min-width: ${breakpoints.md}) {
    // Tablet and up
  }
  
  @media (min-width: ${breakpoints.lg}) {
    // Desktop and up
  }
`;
```

### Responsive Utilities

Use the responsive helper:

```typescript
import { responsive } from '@/styles/design-system';

const responsiveStyles = responsive({
  base: {
    fontSize: '16px',
    padding: '16px',
  },
  md: {
    fontSize: '18px',
    padding: '24px',
  },
  lg: {
    fontSize: '20px',
    padding: '32px',
  },
});
```

## CSS Variables

Generate CSS custom properties for use in CSS files:

```typescript
import { generateCSSVariables } from '@/styles/design-system';

// In your global CSS
const cssVariables = generateCSSVariables();
// Outputs: :root { --color-primary-500: #4169E1; ... }
```

Use in CSS:

```css
.hero-section {
  background-color: var(--color-primary-50);
  color: var(--color-text-primary);
  padding: var(--spacing-20) var(--spacing-4);
}
```

## Best Practices

### Do's ✅

1. **Use semantic color names** - `colors.success.main` not `colors.green`
2. **Maintain spacing rhythm** - Stick to the spacing scale
3. **Keep it minimal** - Less is more in our design philosophy
4. **Test responsive behavior** - Ensure designs work on all devices
5. **Use consistent shadows** - Follow the elevation hierarchy

### Don'ts ❌

1. **Don't create custom colors** - Use the defined palette
2. **Don't use arbitrary spacing** - Stick to the spacing system
3. **Don't over-animate** - Keep animations subtle and purposeful
4. **Don't forget accessibility** - Ensure proper contrast ratios
5. **Don't mix component styles** - Use one variant per component

## Implementation Examples

### Hero Section

```typescript
const HeroSection = () => (
  <section style={{
    backgroundColor: colors.background.secondary,
    padding: `${spacing[20]} ${spacing[4]}`,
  }}>
    <div style={{ maxWidth: layout.content.regular, margin: '0 auto' }}>
      <h1 style={{
        ...typography.heading.h1,
        color: colors.text.primary,
        marginBottom: spacing[6],
      }}>
        Wearing every hat?
        <span style={{ color: colors.primary[500] }}>
          Focus on the one that matters.
        </span>
      </h1>
      
      <p style={{
        ...typography.body.large,
        color: colors.text.secondary,
        marginBottom: spacing[8],
      }}>
        Your AI-powered chief of staff identifies the critical 20% 
        that drives 80% of your results.
      </p>
      
      <button style={{
        ...components.button.base,
        ...components.button.sizes.xl,
        ...components.button.variants.accent,
      }}>
        Get Your Free Strategy Session
      </button>
    </div>
  </section>
);
```

### Feature Card

```typescript
const FeatureCard = ({ icon, title, description }) => (
  <div style={{
    ...components.card.base,
    ...components.card.variants.default,
    padding: spacing[6],
    textAlign: 'center',
    transition: `all ${transitions.duration.normal} ${transitions.timing.easeInOut}`,
    '&:hover': {
      boxShadow: shadows.lg,
      transform: 'translateY(-4px)',
    },
  }}>
    <div style={{
      color: colors.primary[500],
      fontSize: '48px',
      marginBottom: spacing[4],
    }}>
      {icon}
    </div>
    
    <h3 style={{
      ...typography.heading.h4,
      color: colors.text.primary,
      marginBottom: spacing[3],
    }}>
      {title}
    </h3>
    
    <p style={{
      ...typography.body.regular,
      color: colors.text.secondary,
    }}>
      {description}
    </p>
  </div>
);
```

## Accessibility Considerations

1. **Color Contrast** - Ensure WCAG AA compliance:
   - Text on primary: Use white text (#ffffff)
   - Text on accent: Use white text (#ffffff)
   - Body text: Minimum 4.5:1 contrast ratio

2. **Focus States** - Always visible and clear:
   ```typescript
   '&:focus': {
     outline: `2px solid ${colors.primary[500]}`,
     outlineOffset: '2px',
   }
   ```

3. **Touch Targets** - Minimum 44x44px for mobile
4. **Readable Typography** - Body text minimum 16px
5. **Semantic HTML** - Use proper heading hierarchy

## Migration Guide

If updating from a previous design system:

1. Replace color values: `#0066CC` → `colors.primary[500]`
2. Update spacing: `margin: 20px` → `margin: spacing[5]`
3. Use component variants: Custom buttons → `components.button`
4. Apply responsive utilities: Media queries → `responsive()`
5. Update shadows: `box-shadow: 0 2px 4px...` → `shadows.md`

## Questions?

For design system questions or suggestions:
- Review this documentation
- Check the design-system.ts file for all available tokens
- Follow Utlyze brand guidelines
- Keep the solo CEO audience in mind

Remember: The goal is to help solo CEOs focus on what matters. Every design decision should support this mission.