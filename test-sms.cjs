/**
 * Test script to verify Faraz SMS integration
 */

const { default: fetch } = require('node-fetch');

async function testFarazSMS() {
  const API_KEY =
    'OWZmNDkwMjctZjMxYS00YjczLTgxZWUtNDIzMDQyMWMwZmY3OGRhZWQ5ZWExNGEyYWE3YTM4NzdmYTk5MGY4MDFjNzk=';

  try {
    console.log('Testing Faraz SMS API...');

    const url = 'https://edge.ippanel.com/v1/api/send';
    const payload = {
      sending_type: 'pattern',
      code: 'l1cvyoij5emtmz5',
      from_number: '3000505', // Default service number for pattern/webservice
      recipients: ['+989025409857'], // Your test number
      params: {
        CODE: '123456', // This matches your pattern parameter (uppercase)
      },
    };

    console.log('Request payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_KEY,
      },
      body: JSON.stringify(payload),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));

    let result;
    try {
      result = await response.json();
    } catch (e) {
      result = await response.text();
      console.log('Response as text:', result);
    }

    console.log('API Response:', JSON.stringify(result, null, 2));

    if (response.ok && result.meta && result.meta.status === true) {
      console.log('✅ SMS should be sent successfully');
    } else {
      console.log('❌ SMS sending failed');
      console.log('Error:', result.meta?.message || result.message);
    }
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testFarazSMS();
