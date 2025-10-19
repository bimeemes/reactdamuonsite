/**
 * API-ONLY version with different base path to avoid conflicts
 * VERSION: 2025-09-23-v4 - API on separate path
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import questionnaire API with SMS.ir integration
const { setupQuestionnaireRoutes } = require('./questionnaire-api-cjs.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('Starting API-ONLY server on separate path...');

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

// Setup questionnaire routes on /qapi path (different from /questionnaire)
console.log('Setting up questionnaire routes on /qapi path...');
setupQuestionnaireRoutes(app, '/qapi');

// Debug route
app.get('/qapi/debug', (req, res) => {
  res.json({
    success: true,
    message: 'API working on separate path /qapi',
    version: '2025-09-23-v4',
    timestamp: new Date().toISOString(),
    path: req.path,
    separatePath: true,
    endpoints: {
      sendCode: '/qapi/api/questionnaire/send-code',
      verifyCode: '/qapi/api/questionnaire/verify-code',
      submit: '/qapi/api/questionnaire/submit',
    },
  });
});

// Root route for this API server
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Questionnaire API Server on separate path',
    version: '2025-09-23-v4',
    basePath: '/qapi',
    endpoints: {
      debug: '/qapi/debug',
      sendCode: '/qapi/api/questionnaire/send-code',
      verifyCode: '/qapi/api/questionnaire/verify-code',
      submit: '/qapi/api/questionnaire/submit',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found on API server',
    path: req.url,
    availableEndpoints: ['/qapi/debug', '/qapi/api/questionnaire/send-code'],
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
  console.log(`🚀 API Server running on separate path /qapi`);
  console.log(`🐛 Debug: http://localhost:${PORT}/qapi/debug`);
  console.log(`📱 SMS: http://localhost:${PORT}/qapi/api/questionnaire/send-code`);
});

module.exports = app;
