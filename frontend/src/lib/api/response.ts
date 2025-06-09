import { NextResponse } from 'next/server';
import { ApiError } from './errors';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    version?: string;
    requestId?: string;
  };
}

/**
 * Create a successful API response
 */
export function successResponse<T>(
  data: T,
  status = 200,
  headers?: HeadersInit
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  };

  return NextResponse.json(response, { status, headers });
}

/**
 * Create an error API response
 */
export function errorResponse(
  error: Error | ApiError | string,
  status = 500,
  headers?: HeadersInit
): NextResponse<ApiResponse> {
  let errorMessage: string;
  let errorCode: string | undefined;
  let errorDetails: any;
  let statusCode = status;

  if (error instanceof ApiError) {
    errorMessage = error.message;
    errorCode = error.code;
    errorDetails = error.details;
    statusCode = error.statusCode;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorCode = 'ERROR';
  } else {
    errorMessage = error;
    errorCode = 'ERROR';
  }

  const response: ApiResponse = {
    success: false,
    error: {
      message: errorMessage,
      code: errorCode,
      ...(errorDetails && { details: errorDetails }),
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  };

  // Add security headers
  const responseHeaders = new Headers(headers);
  responseHeaders.set('X-Content-Type-Options', 'nosniff');
  responseHeaders.set('X-Frame-Options', 'DENY');
  responseHeaders.set('X-XSS-Protection', '1; mode=block');

  return NextResponse.json(response, { status: statusCode, headers: responseHeaders });
}

/**
 * Create a simple health check response
 */
export function healthResponse(
  status: 'healthy' | 'unhealthy' = 'healthy',
  details?: any
): NextResponse {
  return successResponse({
    status,
    service: 'CEO of One API',
    ...(details && { details }),
  });
}