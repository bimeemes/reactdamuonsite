/**
 * API server with /api base path - no questionnaire prefix conflicts
 * VERSION: 2025-09-23-v5 - API on /api path only
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import questionnaire API with SMS.ir integration
const { setupQuestionnaireRoutes } = require('./questionnaire-api-cjs.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('Starting API server on /api path...');

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
  res.setHeader('Content-Type', 'application/json');
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  next();
});

// Setup questionnaire routes - with /api prefix to match full path
console.log('Setting up questionnaire API routes...');
setupQuestionnaireRoutes(app, '/api');

// Direct test route for SMS endpoint (for debugging)
app.post(['/api/questionnaire/send-code', '/api/api/questionnaire/send-code'], (req, res) => {
  console.log('Direct SMS route hit:', req.path, req.body);
  res.json({
    success: true,
    message: 'Direct SMS route working',
    path: req.path,
    body: req.body,
    timestamp: new Date().toISOString(),
  });
});

// Debug route - handle both /debug and /api/debug
app.get(['/debug', '/api/debug'], (req, res) => {
  res.json({
    success: true,
    message: 'API server working on /api path',
    version: '2025-09-23-v5',
    timestamp: new Date().toISOString(),
    path: req.path,
    originalUrl: req.originalUrl,
    baseURI: '/api',
    endpoints: {
      debug: '/api/debug',
      sendCode: '/api/api/questionnaire/send-code',
      verifyCode: '/api/api/questionnaire/verify-code',
      submit: '/api/api/questionnaire/submit',
    },
  });
});

// Test route - handle both /test and /api/test
app.get(['/test', '/api/test'], (req, res) => {
  res.json({
    success: true,
    message: 'API test endpoint working',
    path: req.path,
    originalUrl: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
});

// Root route - handle both / and /api
app.get(['/', '/api', '/api/'], (req, res) => {
  res.json({
    success: true,
    message: 'Questionnaire API Server running on /api',
    version: '2025-09-23-v5',
    endpoints: {
      debug: '/api/debug',
      test: '/api/test',
      sendCode: '/api/api/questionnaire/send-code',
      verifyCode: '/api/api/questionnaire/verify-code',
      submit: '/api/api/questionnaire/submit',
    },
  });
});

// Handle Apache's index.html appending behavior
app.get(['/index.html', '/api/index.html'], (req, res) => {
  res.json({
    success: true,
    message: 'API Server - Apache tried to append index.html',
    actualPath: req.path,
    requestedURL: req.url,
    note: 'This happens when Apache treats API endpoints as directories',
    version: '2025-09-23-v5',
    endpoints: {
      debug: '/api/debug',
      test: '/api/test',
      sendCode: '/api/api/questionnaire/send-code',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    path: req.url,
    availableEndpoints: ['/api/debug', '/api/test', '/api/api/questionnaire/send-code'],
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 API Server running on /api path`);
  console.log(`🐛 Debug: /api/debug`);
  console.log(`📱 SMS: /api/api/questionnaire/send-code`);
});

module.exports = app;
