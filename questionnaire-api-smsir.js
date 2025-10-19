/**
 * SMS.ir integration functions
 * Updated questionnaire API with SMS.ir real SMS sending capability
 */

const fs = require('fs');
const path = require('path');

// SMS.ir configuration
const SMS_IR_CONFIG = {
  apiKey:
    'OWZmNDkwMjctZjMxYS00YjczLTgxZWUtNDIzMDQyMWMwZmY3OGRhZWQ5ZWExNGEyYWE3YTM4NzdmYTk5MGY4MDFjNzk=', // Updated API key
  baseUrl: 'https://api.sms.ir/v1',
  templateId: 123456, // You'll need to create a template in SMS.ir panel
};

// Data storage paths
const QUESTIONNAIRE_FILE = path.join(__dirname, 'data', 'questionnaires.json');
const SMS_CODES_FILE = path.join(__dirname, 'data', 'sms-codes.json');

/**
 * Send SMS using SMS.ir Verify API
 */
async function sendSMSVerification(phone, code) {
  try {
    console.log('Attempting to send SMS via SMS.ir:', { phone, code });

    const smsData = {
      mobile: phone,
      templateId: SMS_IR_CONFIG.templateId,
      parameters: [
        {
          name: 'CODE', // This should match your template parameter
          value: code,
        },
      ],
    };

    const response = await fetch(`${SMS_IR_CONFIG.baseUrl}/send/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': SMS_IR_CONFIG.apiKey,
      },
      body: JSON.stringify(smsData),
    });

    const result = await response.json();

    console.log('SMS.ir API response:', result);

    if (result.status === 1) {
      return {
        success: true,
        messageId: result.data.messageId,
        cost: result.data.cost,
        provider: 'SMS.ir',
      };
    } else {
      throw new Error(result.message || 'SMS sending failed');
    }
  } catch (error) {
    console.error('SMS.ir API error:', error);
    return {
      success: false,
      error: error.message,
      provider: 'SMS.ir',
    };
  }
}

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
function writeQuestionnaires(data) {
  ensureDataDir();
  try {
    fs.writeFileSync(QUESTIONNAIRE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Questionnaires saved successfully');
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
function writeSMSCodes(data) {
  ensureDataDir();
  try {
    fs.writeFileSync(SMS_CODES_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('SMS codes saved successfully');
    return true;
  } catch (error) {
    console.error('Error writing SMS codes:', error);
    return false;
  }
}

/**
 * Generate random verification code
 */
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Validate Iranian phone number
 */
function isValidPhoneNumber(phone) {
  const cleanPhone = phone.replace(/\D/g, '');
  return /^(09|9)\d{9}$/.test(cleanPhone) || /^(\+98|0098|98)9\d{9}$/.test(cleanPhone);
}

/**
 * Normalize phone number for consistency
 */
function normalizePhoneNumber(phone) {
  let clean = phone.replace(/\D/g, '');

  if (clean.startsWith('98')) {
    clean = clean.substring(2);
  }

  if (clean.startsWith('0')) {
    clean = clean.substring(1);
  }

  if (!clean.startsWith('9')) {
    clean = '9' + clean;
  }

  return clean;
}

/**
 * Setup questionnaire routes with SMS.ir integration and optional prefix
 */
function setupQuestionnaireRoutes(app, prefix = '') {
  // Send SMS verification code
  app.post(`${prefix}/api/questionnaire/send-code`, async (req, res) => {
    try {
      const { phone } = req.body;

      console.log('Send-code request received:', { phone, body: req.body, prefix });

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
      const normalizedPhone = normalizePhoneNumber(phone);
      codes[normalizedPhone] = {
        code,
        originalPhone: phone,
        timestamp: Date.now(),
        attempts: 0,
        verified: false,
      };

      // Write codes
      if (!writeSMSCodes(codes)) {
        return res.status(500).json({
          success: false,
          message: 'خطا در ذخیره کد تایید',
        });
      }

      // Send SMS via SMS.ir
      const smsResult = await sendSMSVerification(phone, code);

      if (smsResult.success) {
        // SMS sent successfully
        res.json({
          success: true,
          message: 'کد تایید ارسال شد',
          smsInfo: {
            provider: smsResult.provider,
            messageId: smsResult.messageId,
            cost: smsResult.cost,
          },
          debug: {
            phone: normalizedPhone,
            originalPhone: phone,
            // Remove code from production
            code: code,
          },
        });
      } else {
        // SMS sending failed - still save the code for testing
        console.error('SMS sending failed but code saved:', smsResult.error);
        res.json({
          success: false,
          message: 'خطا در ارسال پیامک',
          error: smsResult.error,
          debug: {
            phone: normalizedPhone,
            originalPhone: phone,
            // Keep code for manual testing
            code: code,
            smsError: smsResult.error,
          },
        });
      }
    } catch (error) {
      console.error('Error in send-code:', error);
      res.status(500).json({
        success: false,
        message: 'خطای سرور',
        debug: error.message,
      });
    }
  });

  // Verify SMS code
  app.post(`${prefix}/api/questionnaire/verify-code`, (req, res) => {
    try {
      const { phone, code } = req.body;

      console.log('Verify-code request received:', { phone, code });

      // Validate inputs
      if (!phone || !code) {
        return res.status(400).json({
          success: false,
          message: 'شماره تلفن و کد تایید الزامی است',
        });
      }

      // Read codes
      const codes = readSMSCodes();
      const normalizedPhone = normalizePhoneNumber(phone);
      const phoneData = codes[normalizedPhone];

      if (!phoneData) {
        return res.status(400).json({
          success: false,
          message: 'کد تایید برای این شماره یافت نشد',
        });
      }

      // Check if already verified
      if (phoneData.verified) {
        return res.json({
          success: true,
          message: 'شماره قبلاً تایید شده است',
        });
      }

      // Check code expiration (10 minutes)
      const codeAge = Date.now() - phoneData.timestamp;
      if (codeAge > 10 * 60 * 1000) {
        delete codes[normalizedPhone];
        writeSMSCodes(codes);
        return res.status(400).json({
          success: false,
          message: 'کد تایید منقضی شده است. لطفاً مجدداً درخواست کنید',
        });
      }

      // Check attempts
      if (phoneData.attempts >= 3) {
        return res.status(400).json({
          success: false,
          message: 'تعداد تلاش‌های اشتباه زیاد است. لطفاً مجدداً درخواست کنید',
        });
      }

      // Verify code
      if (phoneData.code !== code.toString()) {
        phoneData.attempts += 1;
        codes[normalizedPhone] = phoneData;
        writeSMSCodes(codes);

        return res.status(400).json({
          success: false,
          message: 'کد تایید اشتباه است',
          remainingAttempts: 3 - phoneData.attempts,
        });
      }

      // Success - mark as verified
      phoneData.verified = true;
      phoneData.verifiedAt = Date.now();
      codes[normalizedPhone] = phoneData;
      writeSMSCodes(codes);

      res.json({
        success: true,
        message: 'شماره تلفن با موفقیت تایید شد',
      });
    } catch (error) {
      console.error('Error in verify-code:', error);
      res.status(500).json({
        success: false,
        message: 'خطای سرور',
        debug: error.message,
      });
    }
  });

  // Submit questionnaire
  app.post(`${prefix}/api/questionnaire/submit`, (req, res) => {
    try {
      console.log('Questionnaire submit request received:', req.body);

      const { phone, ...questionnaireData } = req.body;

      // Validate phone number
      if (!phone) {
        return res.status(400).json({
          success: false,
          message: 'شماره تلفن الزامی است',
        });
      }

      // Check if phone is verified
      const codes = readSMSCodes();
      const normalizedPhone = normalizePhoneNumber(phone);
      const phoneData = codes[normalizedPhone];

      if (!phoneData || !phoneData.verified) {
        return res.status(400).json({
          success: false,
          message: 'شماره تلفن تایید نشده است',
        });
      }

      // Read existing questionnaires
      const questionnaires = readQuestionnaires();

      // Create submission
      const submission = {
        id: Date.now().toString(),
        phone: normalizedPhone,
        originalPhone: phone,
        data: questionnaireData,
        submittedAt: new Date().toISOString(),
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
      };

      // Add to list
      questionnaires.push(submission);

      // Save
      if (!writeQuestionnaires(questionnaires)) {
        return res.status(500).json({
          success: false,
          message: 'خطا در ذخیره اطلاعات',
        });
      }

      console.log('Questionnaire saved successfully:', submission.id);

      res.json({
        success: true,
        message: 'پرسشنامه با موفقیت ثبت شد',
        submissionId: submission.id,
      });
    } catch (error) {
      console.error('Error in submit questionnaire:', error);
      res.status(500).json({
        success: false,
        message: 'خطای سرور',
        debug: error.message,
      });
    }
  });

  // Get questionnaire submissions (admin endpoint)
  app.get(`${prefix}/api/questionnaire/submissions`, (req, res) => {
    try {
      const questionnaires = readQuestionnaires();

      res.json({
        success: true,
        submissions: questionnaires,
        count: questionnaires.length,
      });
    } catch (error) {
      console.error('Error getting submissions:', error);
      res.status(500).json({
        success: false,
        message: 'خطای سرور',
        debug: error.message,
      });
    }
  });
}

module.exports = { setupQuestionnaireRoutes };
