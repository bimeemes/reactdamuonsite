/**
 * Main Express Server with MISRA-C Equivalent Quality Standards
 * Implements comprehensive error handling, security, and monitoring
 * @.fileoverview Production-ready server with enterprise-grade quality controls
 */

import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Import API modules
import blogApi from './blog-api.js';
import questionnaireApi from './questionnaire-api.js';
import uploadApi from './upload-api.js';

// Import backend utilities
import {
  logger,
  LogLevel,
  errorHandler,
  asyncHandler,
  BackendError,
  rateLimitOptions,
  securityHeaders,
  setupGracefulShutdown,
  getHealthCheck,
} from './backend-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const connections = new Set();

// Initialize logging
logger(LogLevel.INFO, 'Server initialization started', {
  nodeVersion: process.version,
  environment: process.env.NODE_ENV || 'development',
  port: PORT,
});

// Security middleware - Applied first
app.use(helmet(securityHeaders));

// Rate limiting
const limiter = rateLimit(rateLimitOptions);
app.use(limiter);

// CORS configuration with validation
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = [
      'http://localhost:5173',
      'https://damuon.com',
      'http://localhost:3001',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ];

    if (process.env.NODE_ENV === 'production') {
      // Add production domains here
      allowedOrigins.push('https://yourdomain.com');
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      logger(LogLevel.WARN, 'CORS blocked origin', { origin });
      callback(new BackendError('Not allowed by CORS', 403, 'CORS_ERROR'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parsing with size limits and validation
app.use(
  express.json({
    limit: '10mb',
    verify: (req, res, buf) => {
      try {
        if (buf.length > 0) {
          JSON.parse(buf);
        }
      } catch (e) {
        throw new BackendError('Invalid JSON', 400, 'INVALID_JSON');
      }
    },
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  })
);

// Request logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();

  // Log request
  logger(LogLevel.INFO, 'Incoming request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    contentLength: req.get('Content-Length'),
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const level = res.statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO;

    logger(level, 'Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('Content-Length'),
    });
  });

  next();
});

// Health check endpoint (should be before rate limiting for monitoring)
app.get(
  '/health',
  asyncHandler(async (req, res) => {
    const health = getHealthCheck();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: health,
    });
  })
);

// Simple API test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Node.js API is working',
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  });
});

// Test POST endpoint for questionnaire debugging
app.post('/api/test/questionnaire', (req, res) => {
  res.json({
    success: true,
    message: 'POST to questionnaire test endpoint is working',
    timestamp: new Date().toISOString(),
    body: req.body,
    path: req.path,
    method: req.method,
  });
});

// API Routes with error handling
app.use(
  '/api/blog',
  asyncHandler(async (req, res, next) => {
    blogApi(req, res, next);
  })
);

app.use(
  '/api/upload',
  asyncHandler(async (req, res, next) => {
    uploadApi(req, res, next);
  })
);

// Legacy routes for backward compatibility
app.use(blogApi);
app.use(questionnaireApi);
app.use(uploadApi);

// Serve uploaded images with security headers
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'public', 'uploads'), {
    maxAge: '1d',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      // Additional security headers for uploaded files
      res.set('X-Content-Type-Options', 'nosniff');
      res.set('X-Frame-Options', 'DENY');
    },
  })
);

// Serve static files (for production build)
app.use(
  express.static(path.join(__dirname, 'dist'), {
    maxAge: '1h',
    etag: true,
    lastModified: true,
  })
);

// Test API endpoint
app.get(
  '/api/test',
  asyncHandler(async (req, res) => {
    logger(LogLevel.INFO, 'Test endpoint accessed', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });
  })
);

// 404 handler for API routes
app.use('/api', (req, res) => {
  logger(LogLevel.WARN, '404 - API route not found', {
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  res.status(404).json({
    success: false,
    error: {
      message: 'API endpoint not found',
      code: 'NOT_FOUND',
      path: req.url,
    },
  });
});

// Catch-all route (must be last)
app.get(
  /^\/.*$/,
  asyncHandler(async (req, res) => {
    const indexPath = path.join(__dirname, 'dist', 'index.html');

    try {
      res.sendFile(indexPath);
    } catch (error) {
      logger(LogLevel.ERROR, 'Failed to serve index.html', { path: indexPath }, error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to load application',
          code: 'APP_LOAD_ERROR',
        },
      });
    }
  })
);

// Global error handler (must be last middleware)
app.use(errorHandler);

// Start server with error handling
const server = app.listen(PORT, error => {
  if (error) {
    logger(LogLevel.ERROR, 'Failed to start server', { port: PORT }, error);
    process.exit(1);
  }

  logger(LogLevel.INFO, 'Server started successfully', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    pid: process.pid,
  });

  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Setup graceful shutdown
setupGracefulShutdown(server, connections);

// Export for testing
export default app;
