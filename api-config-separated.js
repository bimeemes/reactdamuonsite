// Updated API configuration for separated deployment
const API_CONFIG = {
  // Full URL since React app and API are now separate
  BASE_URL: 'https://damuon.com/questionnaire/api',

  endpoints: {
    sendCode: 'https://damuon.com/questionnaire/api/questionnaire/send-code',
    verifyCode: 'https://damuon.com/questionnaire/api/questionnaire/verify-code',
    submit: 'https://damuon.com/questionnaire/api/questionnaire/submit',
    debug: 'https://damuon.com/questionnaire/api/debug',
  },
};

export default API_CONFIG;
