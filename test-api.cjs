// Simple test script to verify API endpoints
const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing API endpoint...');

    const response = await axios.post(
      'http://localhost:3001/questionnaire/api/questionnaire/send-code',
      {
        phone: '09025409857',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('SUCCESS!');
    console.log('Response status:', response.status);
    console.log('Response content-type:', response.headers['content-type']);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('ERROR:', error.message);
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error content-type:', error.response.headers['content-type']);
      console.log('Error data:', error.response.data);
    }
  }
}

testAPI();
