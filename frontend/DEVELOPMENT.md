# Development Guide

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Code Quality Checks

Before committing, run:
```bash
npm run preflight
```

This runs:
- TypeScript type checking
- ESLint linting
- Prettier formatting check

### Bundle Analysis

To analyze bundle size:
```bash
npm run analyze
```

### Performance Testing

To run Lighthouse locally:
```bash
npm run lighthouse
```

## Architecture

### Project Structure
```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── sections/    # Page sections
│   └── layout/      # Layout components
├── contexts/        # React contexts
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── styles/          # Global styles
└── utils/           # Helper functions
```

### Key Technologies
- **Next.js 14**: App Router with RSC support
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **React Context**: State management
- **SWR/React Query**: Data fetching (when needed)

## Performance Best Practices

### 1. Image Optimization
Always use Next.js Image component:
```tsx
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // for above-the-fold images
  placeholder="blur" // with blurDataURL
/>
```

### 2. Code Splitting
- Use dynamic imports for heavy components
- Implement route-based code splitting
- Lazy load below-the-fold components

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // if not needed for SSR
});
```

### 3. Font Optimization
Fonts are optimized in layout.tsx using next/font

### 4. Static Generation
Use static generation whenever possible:
```tsx
export async function generateStaticParams() {
  // Return array of params
}

export const revalidate = 3600; // Revalidate every hour
```

### 5. Client Components
Only use 'use client' when necessary:
- Interactive components
- Browser-only APIs
- Event handlers
- State/effects

## SEO Checklist

- [ ] Unique, descriptive page titles (< 60 chars)
- [ ] Meta descriptions (< 160 chars)
- [ ] Proper heading hierarchy (h1 > h2 > h3)
- [ ] Alt text for all images
- [ ] Structured data (JSON-LD)
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] XML sitemap
- [ ] robots.txt

## Accessibility Checklist

- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Color contrast (WCAG AA)
- [ ] Screen reader testing
- [ ] Reduced motion support

## Testing

### Manual Testing
1. Test on multiple devices
2. Test with slow network (Chrome DevTools)
3. Test with JavaScript disabled
4. Test keyboard navigation
5. Test with screen reader

### Performance Testing
1. Run Lighthouse (target 95+ scores)
2. Check Core Web Vitals
3. Monitor bundle size
4. Test loading performance

## Deployment

### Pre-deployment Checklist
- [ ] Environment variables set
- [ ] Build succeeds locally
- [ ] All tests pass
- [ ] Bundle size acceptable
- [ ] Lighthouse scores > 95
- [ ] Security headers configured
- [ ] Error tracking setup
- [ ] Analytics configured

### Build and Deploy
```bash
npm run build
npm run start # Test production build locally
```

## Monitoring

### Key Metrics to Track
- **Core Web Vitals**: LCP, FID, CLS
- **Performance**: Page load time, bundle size
- **Errors**: JavaScript errors, API failures
- **User Behavior**: Conversions, bounce rate

### Tools
- Vercel Analytics (built-in)
- Google Analytics
- Sentry (error tracking)
- Lighthouse CI

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors: `npm run type-check`
   - Check ESLint: `npm run lint`
   - Clear cache: `npm run clean`

2. **Performance Issues**
   - Run bundle analyzer
   - Check for large dependencies
   - Optimize images
   - Enable caching headers

3. **SEO Issues**
   - Validate structured data
   - Check meta tags
   - Verify sitemap
   - Test with Google Search Console

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Web.dev Performance](https://web.dev/performance)
- [Core Web Vitals](https://web.dev/vitals)