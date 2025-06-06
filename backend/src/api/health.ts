import { Router, Request, Response } from 'express';

const router = Router();

interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  system: {
    platform: string;
    arch: string;
    nodeVersion: string;
  };
  dependencies: {
    database: 'connected' | 'disconnected' | 'unknown';
    redis: 'connected' | 'disconnected' | 'unknown';
  };
}

// Basic health check endpoint
router.get('/', (req: Request, res: Response) => {
  const memUsage = process.memoryUsage();
  const healthCheck: HealthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    memory: {
      used: Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100, // MB
      total: Math.round((memUsage.heapTotal / 1024 / 1024) * 100) / 100, // MB
      percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100),
    },
    system: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
    },
    dependencies: {
      database: 'unknown', // TODO: Implement actual database health check
      redis: 'unknown', // TODO: Implement actual Redis health check
    },
  };

  res.status(200).json(healthCheck);
});

// Detailed health check endpoint
router.get('/detailed', (req: Request, res: Response) => {
  const memUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  
  const detailedHealth = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    memory: {
      rss: Math.round((memUsage.rss / 1024 / 1024) * 100) / 100, // MB
      heapTotal: Math.round((memUsage.heapTotal / 1024 / 1024) * 100) / 100, // MB
      heapUsed: Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100, // MB
      external: Math.round((memUsage.external / 1024 / 1024) * 100) / 100, // MB
      arrayBuffers: Math.round((memUsage.arrayBuffers / 1024 / 1024) * 100) / 100, // MB
    },
    cpu: {
      user: cpuUsage.user,
      system: cpuUsage.system,
    },
    system: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      pid: process.pid,
      ppid: process.ppid,
    },
    dependencies: {
      database: 'unknown', // TODO: Implement actual database health check
      redis: 'unknown', // TODO: Implement actual Redis health check
    },
  };

  res.status(200).json(detailedHealth);
});

// Readiness probe endpoint (for Kubernetes/container orchestration)
router.get('/ready', (req: Request, res: Response) => {
  // TODO: Add actual readiness checks (database connections, etc.)
  res.status(200).json({
    status: 'ready',
    timestamp: new Date().toISOString(),
  });
});

// Liveness probe endpoint (for Kubernetes/container orchestration)
router.get('/live', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
  });
});

export { router as healthRouter };