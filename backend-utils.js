/**
 * Backend Error Handling and Logging Utilities
 * Provides production-ready error handling similar to MISRA C standards
 * @module backend-utils
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log levels
export const LogLevel = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

/**
 * Ensure logs directory exists
 */
function ensureLogDir() {
  const logDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  return logDir;
}

/**
 * Professional logging system
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} metadata - Additional metadata
 * @param {Error} error - Error object if applicable
 */
export function logger(level, message, metadata = {}, error = null) {
  const timestamp = new Date().toISOString();
  const logDir = ensureLogDir();

  const logEntry = {
    timestamp,
    level,
    message,
    metadata,
    ...(error && {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    }),
    processId: process.pid,
    nodeEnv: process.env.NODE_ENV || 'development',
  };

  const logString = JSON.stringify(logEntry, null, 2) + '\n';

  // Write to appropriate log file
  const logFile = path.join(logDir, `${level.toLowerCase()}.log`);
  const allLogFile = path.join(logDir, 'all.log');

  try {
    fs.appendFileSync(logFile, logString);
    fs.appendFileSync(allLogFile, logString);

    // Console output in development
    if (process.env.NODE_ENV !== 'production') {
      console[level.toLowerCase()] || console.log(`[${timestamp}] ${level}: ${message}`, metadata);
    }
  } catch (writeError) {
    // Fallback: write to console if file write fails
    console.error('Failed to write to log file:', writeError);
    console.log(logString);
  }
}

/**
 * Structured error class for backend operations
 */
export class BackendError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR', metadata = {}) {
    super(message);
    this.name = 'BackendError';
    this.statusCode = statusCode;
    this.code = code;
    this.metadata = metadata;
    this.timestamp = new Date().toISOString();

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      metadata: this.metadata,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

/**
 * Express error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export function errorHandler(err, req, res, next) {
  // Log the error
  logger(
    LogLevel.ERROR,
    'Request error occurred',
    {
      url: req.url,
      method: req.method,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      body: req.body,
      params: req.params,
      query: req.query,
    },
    err
  );

  // Don't expose internal errors in production
  const isDevelopment = process.env.NODE_ENV !== 'production';

  // Handle different error types
  if (err instanceof BackendError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
        ...(isDevelopment && { stack: err.stack, metadata: err.metadata }),
      },
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: err.details || err.message,
      },
    });
  }

  // Handle MongoDB/Database errors
  if (err.name === 'MongoError' || err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Database operation failed',
        code: 'DATABASE_ERROR',
        ...(isDevelopment && { details: err.message }),
      },
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Authentication failed',
        code: 'AUTH_ERROR',
      },
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    error: {
      message: isDevelopment ? err.message : 'Internal server error',
      code: 'INTERNAL_ERROR',
      ...(isDevelopment && { stack: err.stack }),
    },
  });
}

/**
 * Async error wrapper for route handlers
 * @param {Function} fn - Async route handler function
 * @returns {Function} Wrapped function with error handling
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Request validation wrapper
 * @param {Object} schema - Validation schema
 * @param {string} source - Source of data ('body', 'params', 'query')
 * @returns {Function} Middleware function
 */
export function validateRequest(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const data = req[source];
      const { error, value } = schema.validate(data, { abortEarly: false });

      if (error) {
        const details = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
        }));

        throw new BackendError('Validation failed', 400, 'VALIDATION_ERROR', { details });
      }

      // Replace request data with validated/sanitized data
      req[source] = value;
      next();
    } catch (err) {
      next(err);
    }
  };
}

/**
 * Rate limiting configuration
 */
export const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP',
      code: 'RATE_LIMIT_EXCEEDED',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger(LogLevel.WARN, 'Rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
    res.status(429).json(rateLimitOptions.message);
  },
};

/**
 * Security headers configuration
 */
export const securityHeaders = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Needed for development
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: false,
  referrerPolicy: { policy: 'no-referrer' },
  xssFilter: true,
};

/**
 * Graceful shutdown handler
 */
export function setupGracefulShutdown(server, connections = new Set()) {
  // Track connections
  server.on('connection', connection => {
    connections.add(connection);
    connection.on('close', () => connections.delete(connection));
  });

  // Shutdown handler
  function gracefulShutdown(signal) {
    logger(LogLevel.INFO, `Received ${signal}, shutting down gracefully`);

    server.close(() => {
      logger(LogLevel.INFO, 'HTTP server closed');

      // Close all connections
      connections.forEach(connection => connection.destroy());

      logger(LogLevel.INFO, 'Process exiting');
      process.exit(0);
    });

    // Force close after timeout
    setTimeout(() => {
      logger(LogLevel.ERROR, 'Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  }

  // Register signal handlers
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', error => {
    logger(LogLevel.ERROR, 'Uncaught Exception', {}, error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger(LogLevel.ERROR, 'Unhandled Rejection', {
      reason: reason.toString(),
      promise: promise.toString(),
    });
    process.exit(1);
  });
}

/**
 * Health check endpoint data
 */
export function getHealthCheck() {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    pid: process.pid,
    version: process.version,
    environment: process.env.NODE_ENV || 'development',
  };
}
