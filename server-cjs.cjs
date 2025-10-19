/**
 * CommonJS version of server for hosting compatibility
 * This version avoids ES modules to work on hosting environments that don't support them
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import questionnaire API
const { setupQuestionnaireRoutes } = require('./questionnaire-api-cjs.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('Starting server with CommonJS compatibility...');

// Security and middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  next();
});

// Setup questionnaire routes
setupQuestionnaireRoutes(app);

// Basic test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Node.js API is working (CommonJS version)',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    path: req.path,
    method: req.method,
  });
});

// Test POST endpoint
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

// Health check endpoint
app.get('/health', (req, res) => {
  const healthCheck = {
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
    dataDirectory: {
      exists: fs.existsSync(path.join(__dirname, 'data')),
      path: path.join(__dirname, 'data'),
    },
  };

  res.json(healthCheck);
});

// Serve uploaded images
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'public', 'uploads'), {
    maxAge: '1d',
    etag: true,
    lastModified: true,
  })
);

// Serve static files
app.use(
  express.static(path.join(__dirname, 'dist'), {
    maxAge: '1h',
    etag: true,
    lastModified: true,
  })
);

// 404 handler for API routes
app.use('/api', (req, res) => {
  console.log('404 - API route not found:', req.url);
  res.status(404).json({
    success: false,
    error: {
      message: 'API endpoint not found',
      code: 'NOT_FOUND',
      path: req.url,
    },
  });
});

// 404 handler for non-API routes - serve index.html for SPA routing
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return next();
  }

  const indexPath = path.join(__dirname, 'dist', 'index.html');

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      success: false,
      error: {
        message: 'Application not found',
        code: 'APP_NOT_FOUND',
      },
    });
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (CommonJS version)`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📱 SMS endpoint: http://localhost:${PORT}/api/questionnaire/send-code`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
