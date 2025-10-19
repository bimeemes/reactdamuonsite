// API Configuration for different environments
const API_CONFIG = {
  development: 'http://localhost:3001',
  production: 'https://damuon.com/api', // Updated to match new API path
};

// Detect environment
const isDevelopment =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

// API endpoints
export const API_ENDPOINTS = {
  sendCode: `${API_BASE_URL}/api/questionnaire/send-code`,
  verifyCode: `${API_BASE_URL}/api/questionnaire/verify-code`,
  submitQuestionnaire: `${API_BASE_URL}/api/questionnaire/submit`,
  getSubmissions: `${API_BASE_URL}/api/admin/questionnaire-submissions`,
  test: `${API_BASE_URL}/test`,
  health: `${API_BASE_URL}/health`,
};

export default API_BASE_URL;
