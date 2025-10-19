/**
 * API server with Faraz SMS integration - Updated for new SMS provider
 * VERSION: 2025-09-24-faraz-sms
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import questionnaire API with Faraz SMS integration
const { setupQuestionnaireRoutes } = require('./questionnaire-api-cjs.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('Starting API server with Faraz SMS integration...');

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
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API server is healthy',
    timestamp: new Date().toISOString(),
    version: '2025-09-24-faraz-sms',
    sms_provider: 'Faraz SMS',
  });
});

// Debug endpoint
app.get('/debug', (req, res) => {
  res.json({
    success: true,
    message: 'API server debug info',
    timestamp: new Date().toISOString(),
    baseURI: process.env.PASSENGER_BASE_URI || 'none',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    sms_provider: 'Faraz SMS',
    endpoints: [
      '/health',
      '/debug',
      '/api/debug',
      '/api/questionnaire/send-code',
      '/api/questionnaire/verify-code',
      '/api/questionnaire/submit',
    ],
  });
});

// Setup questionnaire routes with /api prefix
setupQuestionnaireRoutes(app, '/api');

// Also setup routes for /api/debug (double prefix handling for Passenger BaseURI)
app.get('/api/debug', (req, res) => {
  res.json({
    success: true,
    message: 'API server debug info (/api prefix)',
    timestamp: new Date().toISOString(),
    baseURI: process.env.PASSENGER_BASE_URI || 'none',
    sms_provider: 'Faraz SMS',
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Damuon Insurance API Server with Faraz SMS',
    timestamp: new Date().toISOString(),
    version: '2025-09-24-faraz-sms',
    endpoints: {
      health: '/health',
      debug: '/debug',
      sendCode: '/api/questionnaire/send-code',
      verifyCode: '/api/questionnaire/verify-code',
      submit: '/api/questionnaire/submit',
    },
    sms_provider: 'Faraz SMS',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl,
    method: req.method,
    available_endpoints: [
      '/health',
      '/debug',
      '/api/questionnaire/send-code',
      '/api/questionnaire/verify-code',
      '/api/questionnaire/submit',
    ],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Damuon Insurance API Server running on port ${PORT}`);
  console.log(`📱 SMS Provider: Faraz SMS (sms.farazsms.com)`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
