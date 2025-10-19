/**
 * Questionnaire API routes for Damuon Insurance Site
 * Handles SMS verification and questionnaire submission
 * @module questionnaire-api
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    } else {
      console.log('Data directory already exists');
    }

    // Test write permissions
    const testFile = path.join(dataDir, 'test.txt');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('Data directory is writable');
  } catch (error) {
    console.error('Error with data directory:', error);
    throw error;
  }
}

/**
 * Read questionnaire submissions from file
 * @returns {Array} Array of questionnaire submissions
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
 * @param {Array} questionnaires - Array of questionnaire submissions
 */
function writeQuestionnaires(questionnaires) {
  ensureDataDir();
  try {
    fs.writeFileSync(QUESTIONNAIRE_FILE, JSON.stringify(questionnaires, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing questionnaires:', error);
  }
}

/**
 * Read SMS codes from file
 * @returns {Object} SMS codes object
 */
function readSMSCodes() {
  try {
    ensureDataDir();
    console.log('Reading SMS codes from:', SMS_CODES_FILE);

    if (!fs.existsSync(SMS_CODES_FILE)) {
      console.log('SMS codes file does not exist, returning empty object');
      return {};
    }

    const data = fs.readFileSync(SMS_CODES_FILE, 'utf-8');
    console.log('SMS codes file read successfully');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading SMS codes:', error);
    throw error;
  }
}

/**
 * Write SMS codes to file
 * @param {Object} codes - SMS codes object
 */
function writeSMSCodes(codes) {
  try {
    ensureDataDir();
    console.log('Writing SMS codes to:', SMS_CODES_FILE);
    const data = JSON.stringify(codes, null, 2);
    fs.writeFileSync(SMS_CODES_FILE, data, 'utf-8');
    console.log('SMS codes written successfully');
  } catch (error) {
    console.error('Error writing SMS codes:', error);
    throw error;
  }
}

/**
 * Generate a random 6-digit verification code
 * @returns {string} 6-digit verification code
 */
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Validate Iranian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
function isValidPhoneNumber(phone) {
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Send SMS verification code
 * POST /api/questionnaire/send-code
 */
/**
 * POST /formenazarsanjiquestionnairedamuon/api/questionnaire/send-code
 */
router.post('/api/questionnaire/send-code', (req, res) => {
  try {
    const { phone } = req.body;

    // Debug logging
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

    // Generate verification code
    const code = generateVerificationCode();
    console.log('Generated code:', code);

    // Store code with expiration (5 minutes)
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

    codes[phone] = {
      code,
      timestamp: Date.now(),
      attempts: 0,
      verified: false,
    };

    try {
      writeSMSCodes(codes);
      console.log('Wrote codes successfully');
    } catch (error) {
      console.error('Error writing SMS codes:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در ذخیره کد',
        debug: error.message,
      });
    }

    // In a real application, you would send SMS here
    // For demonstration, we'll log the code
    console.log(`SMS Code for ${phone}: ${code}`);

    res.json({
      success: true,
      message: 'کد تایید ارسال شد',
      // In production, don't send the code in response
      ...(process.env.NODE_ENV === 'development' && { code }),
      // Temporary debug info
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
        name: error.name,
      },
    });
  }
});

/**
 * Verify SMS code
 * POST /api/questionnaire/verify-code
 */
router.post('/api/questionnaire/verify-code', (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({
      success: false,
      message: 'شماره تلفن و کد تایید الزامی است',
    });
  }

  try {
    const codes = readSMSCodes();
    const phoneData = codes[phone];

    if (!phoneData) {
      return res.status(400).json({
        success: false,
        message: 'کد تایید یافت نشد',
      });
    }

    // Check if code is expired (5 minutes)
    const isExpired = Date.now() - phoneData.timestamp > 5 * 60 * 1000;
    if (isExpired) {
      delete codes[phone];
      writeSMSCodes(codes);
      return res.status(400).json({
        success: false,
        message: 'کد تایید منقضی شده است',
      });
    }

    // Check attempt limit
    if (phoneData.attempts >= 3) {
      return res.status(400).json({
        success: false,
        message: 'تعداد تلاش‌های مجاز تمام شده است',
      });
    }

    // Verify code
    if (phoneData.code !== code) {
      phoneData.attempts += 1;
      codes[phone] = phoneData;
      writeSMSCodes(codes);

      return res.status(400).json({
        success: false,
        message: 'کد تایید اشتباه است',
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

/**
 * Submit questionnaire
 * POST /api/questionnaire/submit
 */
router.post('/api/questionnaire/submit', (req, res) => {
  const { phone, ...formData } = req.body;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: 'شماره تلفن الزامی است',
    });
  }

  try {
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
    writeQuestionnaires(questionnaires);

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

/**
 * Get questionnaire submissions (admin only)
 * GET /api/questionnaire/submissions
 */
router.get('/api/questionnaire/submissions', (req, res) => {
  // In a real application, you would check admin authentication here
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

/**
 * Get questionnaire submissions (admin route - alternative path)
 * GET /api/admin/questionnaire-submissions
 */
router.get('/api/admin/questionnaire-submissions', (req, res) => {
  // In a real application, you would check admin authentication here
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

export default router;
