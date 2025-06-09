import { NextResponse } from 'next/server';

export interface SecurityHeaders {
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  xContentTypeOptions?: string;
  xFrameOptions?: string;
  xXssProtection?: string;
  referrerPolicy?: string;
  permissionsPolicy?: string;
}

/**
 * Default security headers
 */
export const defaultSecurityHeaders: SecurityHeaders = {
  // Content Security Policy
  contentSecurityPolicy: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.vercel-insights.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://vitals.vercel-insights.com",
    "media-src 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; '),
  
  // HTTP Strict Transport Security
  strictTransportSecurity: 'max-age=31536000; includeSubDomains',
  
  // Prevent MIME type sniffing
  xContentTypeOptions: 'nosniff',
  
  // Clickjacking protection
  xFrameOptions: 'DENY',
  
  // XSS protection (legacy, but still useful)
  xXssProtection: '1; mode=block',
  
  // Referrer Policy
  referrerPolicy: 'strict-origin-when-cross-origin',
  
  // Permissions Policy (formerly Feature Policy)
  permissionsPolicy: [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
  ].join(', '),
};

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(
  response: NextResponse,
  customHeaders?: Partial<SecurityHeaders>
): NextResponse {
  const headers = { ...defaultSecurityHeaders, ...customHeaders };
  
  if (headers.contentSecurityPolicy) {
    response.headers.set('Content-Security-Policy', headers.contentSecurityPolicy);
  }
  
  if (headers.strictTransportSecurity) {
    response.headers.set('Strict-Transport-Security', headers.strictTransportSecurity);
  }
  
  if (headers.xContentTypeOptions) {
    response.headers.set('X-Content-Type-Options', headers.xContentTypeOptions);
  }
  
  if (headers.xFrameOptions) {
    response.headers.set('X-Frame-Options', headers.xFrameOptions);
  }
  
  if (headers.xXssProtection) {
    response.headers.set('X-XSS-Protection', headers.xXssProtection);
  }
  
  if (headers.referrerPolicy) {
    response.headers.set('Referrer-Policy', headers.referrerPolicy);
  }
  
  if (headers.permissionsPolicy) {
    response.headers.set('Permissions-Policy', headers.permissionsPolicy);
  }
  
  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  
  return response;
}

/**
 * Get security headers as HeadersInit
 */
export function getSecurityHeaders(customHeaders?: Partial<SecurityHeaders>): HeadersInit {
  const headers = { ...defaultSecurityHeaders, ...customHeaders };
  const result: HeadersInit = {};
  
  if (headers.contentSecurityPolicy) {
    result['Content-Security-Policy'] = headers.contentSecurityPolicy;
  }
  
  if (headers.strictTransportSecurity) {
    result['Strict-Transport-Security'] = headers.strictTransportSecurity;
  }
  
  if (headers.xContentTypeOptions) {
    result['X-Content-Type-Options'] = headers.xContentTypeOptions;
  }
  
  if (headers.xFrameOptions) {
    result['X-Frame-Options'] = headers.xFrameOptions;
  }
  
  if (headers.xXssProtection) {
    result['X-XSS-Protection'] = headers.xXssProtection;
  }
  
  if (headers.referrerPolicy) {
    result['Referrer-Policy'] = headers.referrerPolicy;
  }
  
  if (headers.permissionsPolicy) {
    result['Permissions-Policy'] = headers.permissionsPolicy;
  }
  
  // Additional security headers
  result['X-DNS-Prefetch-Control'] = 'on';
  result['X-Permitted-Cross-Domain-Policies'] = 'none';
  
  return result;
}