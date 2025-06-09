# Deployment Checklist

## Pre-Deployment

### Code Quality
- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] ESLint passing (`npm run lint`)
- [ ] Prettier formatting applied (`npm run format`)
- [ ] No console.logs in production code
- [ ] All TODO comments addressed

### Performance
- [ ] Bundle size analyzed and optimized (`npm run analyze`)
- [ ] Images optimized (WebP/AVIF format, proper sizing)
- [ ] Fonts optimized (subset, preload critical)
- [ ] Unused dependencies removed
- [ ] Code splitting implemented for large components

### Testing
- [ ] Build succeeds locally (`npm run build`)
- [ ] Production build tested (`npm run start`)
- [ ] Lighthouse scores > 95 for all metrics
- [ ] Core Web Vitals passing (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Mobile responsive testing complete
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility testing (keyboard nav, screen reader)

### SEO
- [ ] Meta tags configured for all pages
- [ ] Open Graph tags tested (use Facebook debugger)
- [ ] Twitter Card tags tested (use Twitter validator)
- [ ] Sitemap.xml generating correctly
- [ ] Robots.txt configured properly
- [ ] Structured data validated (use Google's tool)
- [ ] Canonical URLs set

### Security
- [ ] Environment variables secured
- [ ] API keys not exposed in client code
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] Rate limiting implemented
- [ ] Input validation on all forms
- [ ] XSS prevention measures in place

### Infrastructure
- [ ] Domain configured and SSL certificate active
- [ ] CDN configured for static assets
- [ ] Error tracking (Sentry) configured
- [ ] Analytics (GA4) configured
- [ ] Backup strategy in place

## Deployment

### Environment Variables
- [ ] All required env vars set in production
- [ ] API endpoints pointing to production
- [ ] Feature flags configured appropriately
- [ ] Third-party service credentials active

### Monitoring Setup
- [ ] Real User Monitoring (RUM) active
- [ ] Uptime monitoring configured
- [ ] Error alerting configured
- [ ] Performance budgets set

### Final Checks
- [ ] Version tagged in git
- [ ] Changelog updated
- [ ] Team notified of deployment
- [ ] Rollback plan documented

## Post-Deployment

### Verification
- [ ] Site accessible via primary domain
- [ ] All pages loading correctly
- [ ] Forms and interactions working
- [ ] Analytics data flowing
- [ ] No console errors in production

### Performance Monitoring
- [ ] Check initial Core Web Vitals
- [ ] Monitor error rates
- [ ] Check server response times
- [ ] Verify CDN cache hit rates

### SEO Verification
- [ ] Submit sitemap to Google Search Console
- [ ] Check for crawl errors
- [ ] Verify pages are being indexed
- [ ] Monitor search performance

### Communication
- [ ] Update status page (if applicable)
- [ ] Notify stakeholders
- [ ] Document any issues encountered
- [ ] Schedule post-deployment review

## Rollback Procedure

If issues arise:
1. Revert to previous deployment
2. Investigate issues in staging
3. Fix and re-test thoroughly
4. Re-deploy with fixes
5. Document lessons learned

## Performance Targets

- **Lighthouse Scores**: 95+ across all categories
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.8s
- **Total Blocking Time**: < 300ms
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 200KB (gzipped)