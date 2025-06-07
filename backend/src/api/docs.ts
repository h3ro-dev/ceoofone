import { Router, Request, Response } from 'express';

const router = Router();

const apiDocumentation = {
  title: 'CEO of One API Documentation',
  version: '1.0.0',
  description: 'AI-powered chief of staff for solo CEOs',
  baseUrl: process.env.API_BASE_URL || 'http://localhost:3001',
  endpoints: [
    {
      method: 'GET',
      path: '/',
      description: 'API status and information',
      authentication: false,
    },
    {
      method: 'GET',
      path: '/api/health',
      description: 'Basic health check',
      authentication: false,
    },
    {
      method: 'GET',
      path: '/api/health/detailed',
      description: 'Detailed system metrics',
      authentication: false,
    },
    {
      method: 'GET',
      path: '/api/health/ready',
      description: 'Readiness probe for container orchestration',
      authentication: false,
    },
    {
      method: 'GET',
      path: '/api/health/live',
      description: 'Liveness probe for container orchestration',
      authentication: false,
    },
    {
      method: 'POST',
      path: '/api/leads',
      description: 'Create a new lead',
      authentication: false,
      body: {
        email: 'string (required)',
        name: 'string (required)',
        company: 'string (optional)',
        phone: 'string (optional)',
        message: 'string (optional)',
      },
    },
    {
      method: 'GET',
      path: '/api/leads/status',
      description: 'Check lead capture system status',
      authentication: false,
    },
    {
      method: 'GET',
      path: '/api/docs',
      description: 'API documentation (this page)',
      authentication: false,
    },
  ],
  errors: {
    400: 'Bad Request - Invalid input data',
    401: 'Unauthorized - Authentication required',
    403: 'Forbidden - Insufficient permissions',
    404: 'Not Found - Resource not found',
    429: 'Too Many Requests - Rate limit exceeded',
    500: 'Internal Server Error',
  },
  rateLimiting: {
    window: '15 minutes',
    maxRequests: 100,
    message: 'Rate limit exceeded. Please try again later.',
  },
  security: {
    cors: 'Configured for production domains',
    helmet: 'Security headers enabled',
    validation: 'Input validation on all endpoints',
    https: 'Required in production',
  },
};

/**
 * @route   GET /api/docs
 * @desc    Get API documentation
 * @access  Public
 */
router.get('/', (req: Request, res: Response) => {
  res.json(apiDocumentation);
});

/**
 * @route   GET /api/docs/postman
 * @desc    Get Postman collection
 * @access  Public
 */
router.get('/postman', (req: Request, res: Response) => {
  const postmanCollection = {
    info: {
      name: 'CEO of One API',
      description: 'AI-powered chief of staff for solo CEOs',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: apiDocumentation.endpoints.map(endpoint => ({
      name: endpoint.description,
      request: {
        method: endpoint.method,
        url: {
          raw: `{{baseUrl}}${endpoint.path}`,
          host: ['{{baseUrl}}'],
          path: endpoint.path.split('/').filter(Boolean),
        },
        body: endpoint.body ? {
          mode: 'raw',
          raw: JSON.stringify(endpoint.body, null, 2),
          options: {
            raw: {
              language: 'json',
            },
          },
        } : undefined,
      },
    })),
    variable: [
      {
        key: 'baseUrl',
        value: apiDocumentation.baseUrl,
        type: 'string',
      },
    ],
  };

  res.json(postmanCollection);
});

export { router as docsRouter };