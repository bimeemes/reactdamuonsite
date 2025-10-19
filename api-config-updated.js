// Updated API configuration for /api base path
const API_CONFIG = {
  BASE_URL: 'https://damuon.com/api',

  endpoints: {
    sendCode: 'https://damuon.com/api/api/questionnaire/send-code',
    verifyCode: 'https://damuon.com/api/api/questionnaire/verify-code',
    submit: 'https://damuon.com/api/api/questionnaire/submit',
    debug: 'https://damuon.com/api/debug',
    test: 'https://damuon.com/api/test',
  },
};

export default API_CONFIG;
