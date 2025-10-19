/**
 * Debug server for testing questionnaire API issues
 * Uses CommonJS to avoid ES modules compatibility issues
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const debugQuestionnaireApi = require('./debug-questionnaire-api.js');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Debug logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Use debug questionnaire API
app.use(debugQuestionnaireApi);

// Basic test endpoint
app.get('/api/test-debug', (req, res) => {
  res.json({
    success: true,
    message: 'Debug server is working',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.url,
    method: req.method,
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Debug server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔧 Debug server running on http://localhost:${PORT}`);
  console.log(`📊 Test endpoint: http://localhost:${PORT}/api/test-debug`);
  console.log(`🐛 Debug endpoint: http://localhost:${PORT}/api/questionnaire/debug`);
  console.log(`📱 SMS debug endpoint: http://localhost:${PORT}/api/questionnaire/send-code-debug`);
});

module.exports = app;
