/**
 * CommonJS version of questionnaire API - for hosting compatibility
 * This version avoids ES modules to work on more hosting environments
 */

const fs = require('fs');
const path = require('path');

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
 * Validate Iranian phone number
 */
function isValidPhoneNumber(phone) {
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Setup questionnaire routes
 */
function setupQuestionnaireRoutes(app) {
  // Send SMS verification code
  app.post('/api/questionnaire/send-code', (req, res) => {
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

      res.json({
        success: true,
        message: 'کد تایید ارسال شد',
        // Debug info for development
        debug_code: code,
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
  app.post('/api/questionnaire/verify-code', (req, res) => {
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
  app.post('/api/questionnaire/submit', (req, res) => {
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
  app.get('/api/questionnaire/submissions', (req, res) => {
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
  app.get('/api/admin/questionnaire-submissions', (req, res) => {
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
