/**
 * CommonJS version of questionnaire API - for hosting compatibility
 * This version avoids ES modules to work on more hosting environments
 */

const fs = require('fs');
const path = require('path');

// Polyfill fetch for older Node.js versions
const fetch = (() => {
  try {
    return globalThis.fetch || require('node-fetch');
  } catch (e) {
    return null;
  }
})();

// Data storage paths
const QUESTIONNAIRE_FILE = path.join(__dirname, 'data', 'questionnaires.json');
const SMS_CODES_FILE = path.join(__dirname, 'data', 'sms-codes.json');

/**
 * Ensure data directory exists
 */
function ensureDataDir() {
  const dataDir = path.join(__dirname, 'data');
  console.log('Checking data directory:', dataDir);

  try {
    if (!fs.existsSync(dataDir)) {
      console.log('Creating data directory...');
      fs.mkdirSync(dataDir, { recursive: true });
      console.log('Data directory created successfully');
    }

    // Test write permissions
    const testFile = path.join(dataDir, 'test.txt');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('Data directory is writable');
    return true;
  } catch (error) {
    console.error('Error with data directory:', error);
    return false;
  }
}

/**
 * Read questionnaire submissions from file
 */
function readQuestionnaires() {
  ensureDataDir();
  if (!fs.existsSync(QUESTIONNAIRE_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(QUESTIONNAIRE_FILE, 'utf-8'));
  } catch (error) {
    console.error('Error reading questionnaires:', error);
    return [];
  }
}

/**
 * Write questionnaire submissions to file
 */
function writeQuestionnaires(questionnaires) {
  ensureDataDir();
  try {
    fs.writeFileSync(QUESTIONNAIRE_FILE, JSON.stringify(questionnaires, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing questionnaires:', error);
    return false;
  }
}

/**
 * Read SMS codes from file
 */
function readSMSCodes() {
  ensureDataDir();
  if (!fs.existsSync(SMS_CODES_FILE)) {
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(SMS_CODES_FILE, 'utf-8'));
  } catch (error) {
    console.error('Error reading SMS codes:', error);
    return {};
  }
}

/**
 * Write SMS codes to file
 */
function writeSMSCodes(codes) {
  ensureDataDir();
  try {
    const data = JSON.stringify(codes, null, 2);
    fs.writeFileSync(SMS_CODES_FILE, data, 'utf-8');
    console.log('SMS codes written successfully');
    return true;
  } catch (error) {
    console.error('Error writing SMS codes:', error);
    return false;
  }
}

/**
 * Generate a random 6-digit verification code
 */
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send SMS using Faraz SMS (IPPanel) API
 */
async function sendSMSViaFarazSMS(phone, code) {
  const API_KEY =
    'OWZmNDkwMjctZjMxYS00YjczLTgxZWUtNDIzMDQyMWMwZmY3OGRhZWQ5ZWExNGEyYWE3YTM4NzdmYTk5MGY4MDFjNzk=';

  try {
    console.log('Attempting to send SMS via Faraz SMS (IPPanel) with pattern:', { phone, code });

    // Check if fetch is available
    if (!fetch) {
      console.error('Fetch not available - SMS sending disabled');
      return {
        success: false,
        error: 'HTTP client not available',
        provider: 'Faraz SMS',
      };
    }

    // IPPanel API endpoint with pattern-based SMS
    const url = 'https://edge.ippanel.com/v1/api/send';
    const payload = {
      sending_type: 'pattern',
      code: 'l1cvyoij5emtmz5', // Your custom pattern from Faraz SMS panel
      from_number: '3000505', // Default service number for pattern/webservice
      recipients: [`+98${phone.substring(1)}`], // Convert 09xxxxxxxxx to +989xxxxxxxxx
      params: {
        CODE: code, // Pattern parameter - matches %CODE% in your template (uppercase)
      },
    };

    console.log('Sending request to IPPanel API with pattern:', {
      url: url,
      payload: payload,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_KEY,
      },
      body: JSON.stringify(payload),
    });

    let result;
    try {
      result = await response.json();
    } catch (e) {
      result = await response.text();
    }

    console.log('IPPanel API response:', {
      status: response.status,
      statusText: response.statusText,
      result: result,
    });

    // Check for success according to IPPanel documentation
    if (response.ok && result.meta && result.meta.status === true) {
      return {
        success: true,
        messageId: result.data?.message_outbox_ids?.[0] || 'sent',
        provider: 'Faraz SMS (IPPanel) - Pattern',
        api_response: result,
      };
    } else {
      // Return detailed error information
      const errorMessage = result.meta?.message || result.message || 'SMS sending failed';
      return {
        success: false,
        error: errorMessage,
        provider: 'Faraz SMS (IPPanel) - Pattern',
        api_response: result,
        http_status: response.status,
      };
    }
  } catch (error) {
    console.error('Faraz SMS API error:', error);
    return {
      success: false,
      error: error.message,
      provider: 'Faraz SMS (IPPanel) - Pattern',
    };
  }
}

/**
 * Validate Iranian phone number
 */
function isValidPhoneNumber(phone) {
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Setup questionnaire routes
 */
function setupQuestionnaireRoutes(app, prefix = '') {
  // Send SMS verification code
  app.post(`${prefix}/api/questionnaire/send-code`, async (req, res) => {
    try {
      const { phone } = req.body;

      console.log('Send-code request received:', { phone, body: req.body });

      // Validate request body
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: 'بدنه درخواست خالی است',
        });
      }

      // Validate phone number
      if (!phone || !isValidPhoneNumber(phone)) {
        return res.status(400).json({
          success: false,
          message: 'شماره تلفن معتبر نیست',
          debug: { receivedPhone: phone },
        });
      }

      // Check data directory
      if (!ensureDataDir()) {
        return res.status(500).json({
          success: false,
          message: 'خطا در ایجاد پوشه داده‌ها',
        });
      }

      // Generate verification code
      const code = generateVerificationCode();
      console.log('Generated code:', code);

      // Read existing codes
      let codes;
      try {
        codes = readSMSCodes();
        console.log('Read existing codes successfully');
      } catch (error) {
        console.error('Error reading SMS codes:', error);
        return res.status(500).json({
          success: false,
          message: 'خطا در خواندن فایل کدها',
          debug: error.message,
        });
      }

      // Store new code
      codes[phone] = {
        code,
        timestamp: Date.now(),
        attempts: 0,
        verified: false,
      };

      // Write codes
      if (!writeSMSCodes(codes)) {
        return res.status(500).json({
          success: false,
          message: 'خطا در ذخیره کد',
        });
      }

      console.log(`SMS Code for ${phone}: ${code}`);

      // Send actual SMS via Faraz SMS
      const smsResult = await sendSMSViaFarazSMS(phone, code);
      console.log('SMS sending result:', smsResult);

      // Always return success for now - even if SMS fails, user can still use debug code
      res.json({
        success: true,
        message: 'کد تایید ارسال شد',
        sms_status: smsResult.success ? 'sent' : 'failed',
        sms_provider: smsResult.provider,
        // Debug info for development - remove in production
        debug_code: code,
        debug_sms: {
          api_tried: smsResult.config_used || 'unknown',
          api_response: smsResult.api_response || null,
          error: smsResult.error || null,
          phone: phone,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Error in send-code endpoint:', error);
      res.status(500).json({
        success: false,
        message: 'خطا در سرور',
        debug: {
          message: error.message,
          stack: error.stack,
        },
      });
    }
  });

  // Verify SMS code
  app.post(`${prefix}/api/questionnaire/verify-code`, (req, res) => {
    try {
      const { phone, code } = req.body;

      if (!phone || !code) {
        return res.status(400).json({
          success: false,
          message: 'شماره تلفن و کد تایید الزامی است',
        });
      }

      const codes = readSMSCodes();
      const phoneData = codes[phone];

      if (!phoneData) {
        return res.status(400).json({
          success: false,
          message: 'کد تایید برای این شماره یافت نشد',
        });
      }

      // Check expiration (5 minutes)
      const now = Date.now();
      const codeAge = now - phoneData.timestamp;
      if (codeAge > 5 * 60 * 1000) {
        delete codes[phone];
        writeSMSCodes(codes);
        return res.status(400).json({
          success: false,
          message: 'کد تایید منقضی شده است',
        });
      }

      // Check code
      if (phoneData.code !== code) {
        phoneData.attempts += 1;
        if (phoneData.attempts >= 3) {
          delete codes[phone];
        }
        writeSMSCodes(codes);
        return res.status(400).json({
          success: false,
          message: 'کد تایید صحیح نیست',
        });
      }

      // Mark as verified
      phoneData.verified = true;
      codes[phone] = phoneData;
      writeSMSCodes(codes);

      res.json({
        success: true,
        message: 'تایید شد',
      });
    } catch (error) {
      console.error('Error verifying SMS code:', error);
      res.status(500).json({
        success: false,
        message: 'خطا در تایید کد',
      });
    }
  });

  // Submit questionnaire
  app.post(`${prefix}/api/questionnaire/submit`, (req, res) => {
    try {
      const { phone, ...formData } = req.body;

      if (!phone) {
        return res.status(400).json({
          success: false,
          message: 'شماره تلفن الزامی است',
        });
      }

      // Check if phone is verified
      const codes = readSMSCodes();
      const phoneData = codes[phone];

      if (!phoneData || !phoneData.verified) {
        return res.status(400).json({
          success: false,
          message: 'شماره تلفن تایید نشده است',
        });
      }

      // Save questionnaire
      const questionnaires = readQuestionnaires();
      const submission = {
        id: Date.now().toString(),
        phone,
        ...formData,
        submittedAt: new Date().toISOString(),
        ipAddress: req.ip || req.connection.remoteAddress,
      };

      questionnaires.push(submission);

      if (!writeQuestionnaires(questionnaires)) {
        throw new Error('Failed to save questionnaire');
      }

      // Clean up SMS code
      delete codes[phone];
      writeSMSCodes(codes);

      res.json({
        success: true,
        message: 'پرسشنامه با موفقیت ثبت شد',
        submissionId: submission.id,
      });
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      res.status(500).json({
        success: false,
        message: 'خطا در ثبت پرسشنامه',
      });
    }
  });

  // Get questionnaire submissions (admin)
  app.get(`${prefix}/api/questionnaire/submissions`, (req, res) => {
    try {
      const questionnaires = readQuestionnaires();
      res.json({
        success: true,
        submissions: questionnaires,
        total: questionnaires.length,
      });
    } catch (error) {
      console.error('Error getting questionnaire submissions:', error);
      res.status(500).json({
        success: false,
        message: 'خطا در دریافت پرسشنامه‌ها',
      });
    }
  });

  // Alternative admin route
  app.get(`${prefix}/api/admin/questionnaire-submissions`, (req, res) => {
    try {
      const questionnaires = readQuestionnaires();
      res.json(questionnaires);
    } catch (error) {
      console.error('Error getting questionnaire submissions:', error);
      res.status(500).json({
        success: false,
        message: 'خطا در دریافت پرسشنامه‌ها',
      });
    }
  });
}

module.exports = { setupQuestionnaireRoutes };
