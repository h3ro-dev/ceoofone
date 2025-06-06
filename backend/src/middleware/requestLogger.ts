import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  // Log incoming request
  console.log(`📥 ${timestamp} ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  
  // Log additional details for non-GET requests
  if (req.method !== 'GET') {
    console.log(`   Headers: ${JSON.stringify(req.headers)}`);
    if (req.body && Object.keys(req.body).length > 0) {
      console.log(`   Body: ${JSON.stringify(req.body)}`);
    }
  }

  // Override res.end to log response
  const originalEnd = res.end.bind(res);
  res.end = function(chunk?: any, encoding?: BufferEncoding | (() => void), cb?: () => void) {
    const duration = Date.now() - start;
    const responseTimestamp = new Date().toISOString();
    
    console.log(`📤 ${responseTimestamp} ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    
    // Call original end method with proper argument handling
    if (typeof encoding === 'function') {
      return originalEnd(chunk, encoding);
    }
    if (encoding !== undefined) {
      return originalEnd(chunk, encoding, cb);
    }
    return originalEnd(chunk, cb);
  };

  next();
};