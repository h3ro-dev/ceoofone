import { NextRequest, NextResponse } from 'next/server';

export interface CorsOptions {
  origin?: string | string[] | ((origin: string) => boolean);
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

const defaultOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

/**
 * Get CORS headers based on options
 */
export function getCorsHeaders(req: NextRequest, options: CorsOptions = {}): HeadersInit {
  const opts = { ...defaultOptions, ...options };
  const headers: HeadersInit = {};
  
  const origin = req.headers.get('origin') || '*';
  
  // Handle origin
  if (opts.origin === '*') {
    headers['Access-Control-Allow-Origin'] = '*';
  } else if (typeof opts.origin === 'string') {
    headers['Access-Control-Allow-Origin'] = opts.origin;
  } else if (Array.isArray(opts.origin)) {
    if (opts.origin.includes(origin)) {
      headers['Access-Control-Allow-Origin'] = origin;
    }
  } else if (typeof opts.origin === 'function') {
    if (opts.origin(origin)) {
      headers['Access-Control-Allow-Origin'] = origin;
    }
  }
  
  // Other CORS headers
  if (opts.credentials) {
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  
  if (opts.methods && opts.methods.length > 0) {
    headers['Access-Control-Allow-Methods'] = opts.methods.join(', ');
  }
  
  if (opts.allowedHeaders && opts.allowedHeaders.length > 0) {
    headers['Access-Control-Allow-Headers'] = opts.allowedHeaders.join(', ');
  }
  
  if (opts.exposedHeaders && opts.exposedHeaders.length > 0) {
    headers['Access-Control-Expose-Headers'] = opts.exposedHeaders.join(', ');
  }
  
  if (opts.maxAge) {
    headers['Access-Control-Max-Age'] = opts.maxAge.toString();
  }
  
  return headers;
}

/**
 * Handle CORS preflight requests
 */
export function handleCorsPreflightResponse(
  req: NextRequest,
  options: CorsOptions = {}
): NextResponse {
  const headers = getCorsHeaders(req, options);
  
  return new NextResponse(null, {
    status: 200,
    headers,
  });
}

/**
 * Apply CORS headers to response
 */
export function applyCorsHeaders(
  response: NextResponse,
  req: NextRequest,
  options: CorsOptions = {}
): NextResponse {
  const corsHeaders = getCorsHeaders(req, options);
  
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value as string);
  });
  
  return response;
}