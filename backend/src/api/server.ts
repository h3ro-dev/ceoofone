import dotenv from 'dotenv';
import http from 'http';
import app from '../index';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

/**
 * Start the Express server
 */
export const startServer = async (): Promise<http.Server> => {
  return new Promise((resolve, reject) => {
    server.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════╗
║          CEO of One API Server             ║
╠════════════════════════════════════════════╣
║  🚀 Server running on port ${PORT}            ║
║  📡 Environment: ${process.env.NODE_ENV || 'development'}         ║
║  🔗 Health: http://localhost:${PORT}/api/health ║
║  📊 Docs: http://localhost:${PORT}/api/docs     ║
╚════════════════════════════════════════════╝
      `);
      resolve(server);
    });

    server.on('error', (error: Error) => {
      console.error('❌ Server failed to start:', error);
      reject(error);
    });
  });
};

/**
 * Graceful shutdown handler
 */
export const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n⚠️  ${signal} received. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log('✅ HTTP server closed');
    
    // Close database connections, cleanup resources
    // Add your cleanup logic here
    
    process.exit(0);
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('❌ Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30000);
};

// Handle process termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

// Start server if this file is run directly
if (require.main === module) {
  startServer().catch((error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });
}

export default server;