# CEO of One - Backend API

Backend API infrastructure for CEO of One, an AI-powered chief of staff for solo CEOs.

## 🏗️ Architecture

- **Framework**: Express.js with TypeScript
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator
- **Error Handling**: Centralized error handling with custom error classes
- **Logging**: Request/response logging middleware
- **Deployment**: Vercel-ready serverless functions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Setup

Copy `.env.example` to `.env` and configure the following variables:

```env
NODE_ENV=development
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

## 📚 API Endpoints

### Health Check
- `GET /api/health` - Basic health check
- `GET /api/health/detailed` - Detailed system information
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/live` - Liveness probe

### Root
- `GET /` - API information and status

## 🛡️ Security Features

### Middleware Stack
1. **Helmet**: Security headers
2. **CORS**: Cross-origin resource sharing
3. **Rate Limiting**: 100 requests per 15 minutes per IP
4. **Compression**: Response compression
5. **Request Logging**: Comprehensive request/response logging
6. **Error Handling**: Centralized error handling

### Security Headers
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Strict-Transport-Security

## 🔧 Configuration

The API uses a centralized configuration system in `src/config/index.ts`:

- **Server**: Port, environment
- **Database**: Supabase configuration
- **JWT**: Secret and expiration
- **Rate Limiting**: Window and request limits
- **CORS**: Allowed origins
- **API Keys**: External service keys

## 📁 Project Structure

```
backend/
├── src/
│   ├── api/           # API route handlers
│   │   └── health.ts  # Health check endpoints
│   ├── config/        # Configuration management
│   │   └── index.ts   # Centralized config
│   ├── middleware/    # Express middleware
│   │   ├── errorHandler.ts
│   │   └── requestLogger.ts
│   ├── services/      # Business logic services
│   ├── utils/         # Utility functions
│   │   ├── asyncHandler.ts
│   │   └── validation.ts
│   └── index.ts       # Main server file
├── dist/              # Compiled TypeScript
├── .env.example       # Environment template
├── .eslintrc.js       # ESLint configuration
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

## 🚀 Deployment

### Vercel Deployment

The API is configured for Vercel deployment using serverless functions:

1. **Build**: `npm run build`
2. **Deploy**: Automatic deployment via Vercel CLI or GitHub integration

### Environment Variables for Production

Ensure these are set in your Vercel dashboard:

- `NODE_ENV=production`
- `JWT_SECRET` - Strong secret key
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `CORS_ORIGINS` - Production domain origins

### Vercel Configuration

The `vercel.json` file configures:
- TypeScript compilation
- Route handling
- Function timeout (30s)
- Environment variables

## 🧪 Development

### Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Adding New Routes

1. Create route handler in `src/api/`
2. Import and register in `src/index.ts`
3. Add validation if needed
4. Update this README

Example:
```typescript
// src/api/users.ts
import { Router } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  res.json({ users: [] });
}));

export { router as usersRouter };
```

### Error Handling

Use the `AppError` class for operational errors:

```typescript
import { AppError } from '@/middleware/errorHandler';

throw new AppError('Resource not found', 404);
```

### Validation

Use the validation utilities:

```typescript
import { validate, validationRules } from '@/utils/validation';

router.post('/', 
  validate([
    validationRules.required('name'),
    validationRules.email()
  ]),
  asyncHandler(async (req, res) => {
    // Handler logic
  })
);
```

## 📊 Monitoring

### Health Checks

- Basic: `GET /api/health`
- Detailed: `GET /api/health/detailed` (includes memory, CPU usage)
- Kubernetes probes: `/api/health/ready` and `/api/health/live`

### Logging

All requests are logged with:
- Timestamp
- Method and URL
- Response status and duration
- Request headers and body (for non-GET requests)

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use the established middleware stack
3. Add appropriate error handling
4. Include validation for new endpoints
5. Update documentation

## 📝 License

MIT License - see LICENSE file for details.