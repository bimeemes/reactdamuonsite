/**
 * CommonJS version of server for hosting compatibility - Fixed for root route
 * This version avoids ES modules to work on hosting environments that don't support them
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import questionnaire API with SMS.ir integration
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
console.log('Setting up questionnaire routes without prefix...');
setupQuestionnaireRoutes(app);

// Setup questionnaire routes with /questionnaire prefix (in case Passenger doesn't strip the base URI)
console.log('Setting up questionnaire routes with /questionnaire prefix...');
setupQuestionnaireRoutes(app, '/questionnaire');

// Direct test route for debugging
app.post('/questionnaire/api/questionnaire/send-code', (req, res) => {
  console.log('Direct route hit for /questionnaire/api/questionnaire/send-code');
  res.json({
    success: true,
    message: 'Direct route working',
    timestamp: new Date().toISOString(),
    body: req.body,
    path: req.path,
  });
});

// Root route - serve API info instead of trying to serve React app
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Questionnaire API Server is running',
    timestamp: new Date().toISOString(),
    version: 'v1.0.0',
    endpoints: {
      test: '/api/test',
      health: '/health',
      sendCode: '/api/questionnaire/send-code',
      verifyCode: '/api/questionnaire/verify-code',
      submit: '/api/questionnaire/submit',
    },
    nodeVersion: process.version,
  });
});

// Handle /questionnaire route - serve React app instead of API info
app.get('/questionnaire', (req, res) => {
  // Try to serve the React app's index.html
  const indexPath = path.join(__dirname, 'dist', 'index.html');

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback: show API info if React build doesn't exist
    res.json({
      success: true,
      message: 'Questionnaire API Server is running - React app not found',
      note: 'Place your React build files in the "dist" directory',
      timestamp: new Date().toISOString(),
      version: 'v1.0.0',
      endpoints: {
        test: '/api/test',
        health: '/health',
        sendCode: '/api/questionnaire/send-code',
        verifyCode: '/api/questionnaire/verify-code',
        submit: '/api/questionnaire/submit',
      },
      nodeVersion: process.version,
    });
  }
});

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

// Handle /questionnaire/api/test (in case Passenger doesn't strip the base URI)
app.get('/questionnaire/api/test', (req, res) => {
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

// Handle /questionnaire/api/test/questionnaire (in case Passenger doesn't strip the base URI)
app.post('/questionnaire/api/test/questionnaire', (req, res) => {
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

// Handle /questionnaire/health (in case Passenger doesn't strip the base URI)
app.get('/questionnaire/health', (req, res) => {
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

// Serve React app static files (JS, CSS, images)
app.use(
  '/questionnaire/static',
  express.static(path.join(__dirname, 'dist', 'static'), {
    maxAge: '1h',
    etag: true,
    lastModified: true,
  })
);

// Serve React app assets (with /questionnaire prefix)
app.use(
  '/questionnaire/assets',
  express.static(path.join(__dirname, 'dist', 'assets'), {
    maxAge: '1h',
    etag: true,
    lastModified: true,
  })
);

// Catch-all for React app routes (MUST be LAST - after all API routes)
app.use('/questionnaire', (req, res, next) => {
  // Skip API routes completely
  if (req.path.startsWith('/api/')) {
    return next();
  }

  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      success: false,
      error: {
        message: 'React app not found',
        code: 'APP_NOT_FOUND',
        path: req.url,
      },
    });
  }
});

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

// 404 handler for other routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND',
      path: req.url,
      availableEndpoints: ['/api/test', '/health', '/api/questionnaire/send-code'],
    },
  });
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
  console.log(
    `📱 Prefixed SMS endpoint: http://localhost:${PORT}/questionnaire/api/questionnaire/send-code`
  );
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
