/**
 * Debug version of questionnaire API - CommonJS compatible
 * This version uses require() instead of import to avoid ES modules issues
 */

const fs = require('fs');
const path = require('path');

const express = require('express');

const router = express.Router();

// Data storage paths
const QUESTIONNAIRE_FILE = path.join(__dirname, 'data', 'questionnaires.json');
const SMS_CODES_FILE = path.join(__dirname, 'data', 'sms-codes.json');

/**
 * Ensure data directory exists
 */
function ensureDataDir() {
  const dataDir = path.join(__dirname, 'data');
  console.log('Debug - Checking data directory:', dataDir);

  try {
    if (!fs.existsSync(dataDir)) {
      console.log('Debug - Creating data directory...');
      fs.mkdirSync(dataDir, { recursive: true });
      console.log('Debug - Data directory created successfully');
    } else {
      console.log('Debug - Data directory already exists');
    }

    // Test write permissions
    const testFile = path.join(dataDir, 'test.txt');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('Debug - Data directory is writable');
    return true;
  } catch (error) {
    console.error('Debug - Error with data directory:', error);
    return false;
  }
}

/**
 * Read SMS codes from file
 */
function readSMSCodes() {
  if (!fs.existsSync(SMS_CODES_FILE)) {
    return {};
  }
  try {
    const data = fs.readFileSync(SMS_CODES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Debug - Error reading SMS codes:', error);
    return {};
  }
}

/**
 * Write SMS codes to file
 */
function writeSMSCodes(codes) {
  try {
    const data = JSON.stringify(codes, null, 2);
    fs.writeFileSync(SMS_CODES_FILE, data, 'utf-8');
    console.log('Debug - SMS codes written successfully');
    return true;
  } catch (error) {
    console.error('Debug - Error writing SMS codes:', error);
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
 * Debug endpoint for testing
 */
router.get('/api/questionnaire/debug', (req, res) => {
  try {
    const debugInfo = {
      success: true,
      message: 'Debug endpoint working',
      serverTime: new Date().toISOString(),
      dirname: __dirname,
      dataDir: path.join(__dirname, 'data'),
      dataDirExists: fs.existsSync(path.join(__dirname, 'data')),
      canWriteToDataDir: false,
    };

    // Test data directory
    const canWrite = ensureDataDir();
    debugInfo.canWriteToDataDir = canWrite;

    res.json(debugInfo);
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Debug endpoint failed',
      error: error.message,
      stack: error.stack,
    });
  }
});

/**
 * Simplified send-code endpoint for debugging
 */
router.post('/api/questionnaire/send-code-debug', (req, res) => {
  try {
    console.log('Debug - Send-code request received:', {
      body: req.body,
      contentType: req.get('Content-Type'),
      method: req.method,
    });

    const { phone } = req.body;

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

    // Check if data directory can be created/accessed
    if (!ensureDataDir()) {
      return res.status(500).json({
        success: false,
        message: 'خطا در ایجاد پوشه داده‌ها',
        debug: 'Cannot create or access data directory',
      });
    }

    // Generate verification code
    const code = generateVerificationCode();
    console.log('Debug - Generated code:', code);

    // Try to read existing codes
    let codes;
    try {
      codes = readSMSCodes();
      console.log('Debug - Read existing codes successfully');
    } catch (error) {
      console.error('Debug - Error reading SMS codes:', error);
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

    // Try to write codes
    if (!writeSMSCodes(codes)) {
      return res.status(500).json({
        success: false,
        message: 'خطا در ذخیره کد',
        debug: 'Failed to write SMS codes file',
      });
    }

    console.log(`Debug - SMS Code for ${phone}: ${code}`);

    res.json({
      success: true,
      message: 'کد تایید ارسال شد (نسخه دیباگ)',
      debug_code: code,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Debug - Error in send-code-debug endpoint:', error);
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

module.exports = router;
