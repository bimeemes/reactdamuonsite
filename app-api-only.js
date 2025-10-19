/**
 * API-ONLY version of server for hosting compatibility
 * VERSION: 2025-09-23-v3 - API-only, no React serving
 * This version ONLY serves API endpoints and does NOT serve React files
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import questionnaire API with SMS.ir integration
const { setupQuestionnaireRoutes } = require('./questionnaire-api-cjs.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('Starting API-ONLY server with CommonJS compatibility...');
console.log('This server DOES NOT serve React files - API endpoints only');

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

// Request logging with API route detection
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Force JSON response for all requests
  res.setHeader('Content-Type', 'application/json');
  console.log('Setting JSON content type for all responses');

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

// Debug route to check server status
app.get('/questionnaire/api/debug', (req, res) => {
  res.json({
    success: true,
    message: 'API-ONLY server working - no React serving',
    version: '2025-09-23-v3',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    path: req.path,
    method: req.method,
    serverInfo: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cwd: process.cwd(),
      env: process.env.NODE_ENV || 'development',
      apiOnly: true,
    },
  });
});

// Root route - API info only
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Questionnaire API Server (API-ONLY) is running',
    version: '2025-09-23-v3',
    timestamp: new Date().toISOString(),
    endpoints: {
      debug: '/questionnaire/api/debug',
      test: '/api/test',
      health: '/health',
      sendCode: '/api/questionnaire/send-code',
      sendCodePrefixed: '/questionnaire/api/questionnaire/send-code',
      verifyCode: '/api/questionnaire/verify-code',
      submit: '/api/questionnaire/submit',
    },
    nodeVersion: process.version,
    note: 'This is an API-only server. React app should be served separately.',
  });
});

// Handle /questionnaire route - API info only (no React serving)
app.get('/questionnaire', (req, res) => {
  res.json({
    success: true,
    message: 'API-ONLY server - React app not served from here',
    version: '2025-09-23-v3',
    timestamp: new Date().toISOString(),
    endpoints: {
      debug: '/questionnaire/api/debug',
      sendCode: '/questionnaire/api/questionnaire/send-code',
      verifyCode: '/questionnaire/api/questionnaire/verify-code',
      submit: '/questionnaire/api/questionnaire/submit',
    },
    nodeVersion: process.version,
    note: 'React app should be served from a separate directory',
  });
});

// Basic test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Node.js API is working (API-ONLY version)',
    version: '2025-09-23-v3',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    path: req.path,
    method: req.method,
  });
});

// Handle /questionnaire/api/test
app.get('/questionnaire/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Node.js API is working (API-ONLY version with prefix)',
    version: '2025-09-23-v3',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    path: req.path,
    method: req.method,
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const healthCheck = {
    success: true,
    message: 'API-ONLY server is healthy',
    version: '2025-09-23-v3',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
    dataDirectory: {
      exists: fs.existsSync(path.join(__dirname, 'data')),
      path: path.join(__dirname, 'data'),
    },
    apiOnly: true,
  };

  res.json(healthCheck);
});

// Handle /questionnaire/health
app.get('/questionnaire/health', (req, res) => {
  const healthCheck = {
    success: true,
    message: 'API-ONLY server is healthy (prefixed)',
    version: '2025-09-23-v3',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
    dataDirectory: {
      exists: fs.existsSync(path.join(__dirname, 'data')),
      path: path.join(__dirname, 'data'),
    },
    apiOnly: true,
  };

  res.json(healthCheck);
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
      version: '2025-09-23-v3',
    },
  });
});

// 404 handler for other routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found - API-ONLY server',
      code: 'NOT_FOUND',
      path: req.url,
      availableEndpoints: [
        '/questionnaire/api/debug',
        '/api/test',
        '/health',
        '/questionnaire/api/questionnaire/send-code',
      ],
      version: '2025-09-23-v3',
      note: 'This server only serves API endpoints, not React app',
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
      version: '2025-09-23-v3',
    },
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 API-ONLY Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`🐛 Debug endpoint: http://localhost:${PORT}/questionnaire/api/debug`);
  console.log(
    `📱 SMS endpoint: http://localhost:${PORT}/questionnaire/api/questionnaire/send-code`
  );
  console.log('⚠️  This server does NOT serve React files - API endpoints only!');
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
