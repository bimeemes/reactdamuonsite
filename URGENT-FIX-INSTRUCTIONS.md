# URGENT FIX: Node.js Backend 500 Error Resolution

## Problem Identified: ES Modules Compatibility Issue

The 500 Internal Server Error was caused by your hosting environment not properly supporting ES modules (`import`/`export` syntax). Many cPanel hosting providers have issues with ES modules.

## Solution: CommonJS Version

I've created CommonJS-compatible versions of your backend files that use `require()` instead of `import`.

## Files to Upload to Your Server

Replace these files in your `/home9/damuonco/public_html/formenazarsanjiquestionnairedamuon/` directory:

### 1. **server-cjs.cjs** → Upload as **server.js** (replace existing)

### 2. **questionnaire-api-cjs.cjs** → Upload as **questionnaire-api-cjs.cjs** (new file)

## Deployment Steps:

1. **Backup your current files** (just in case)
2. **Upload `server-cjs.cjs`** to your server and rename it to `server.js`
3. **Upload `questionnaire-api-cjs.cjs`** to your server (keep the .cjs extension)
4. **Ensure your .htaccess file** is correctly configured for Passenger
5. **Restart your Node.js app** from cPanel

## Why This Will Fix the Issue:

- **ES Modules Problem**: Your original `questionnaire-api.js` used `import fs from 'fs'` which doesn't work on many hosting environments
- **CommonJS Solution**: The new version uses `const fs = require('fs')` which is universally supported
- **File Permissions**: Improved error handling for file system operations
- **Better Logging**: Enhanced console logging to help with debugging

## Test After Deployment:

After uploading, test these URLs:

1. **Backend Health Check**: `https://damuon.com/formenazarsanjiquestionnairedamuon/health`
2. **API Test**: `https://damuon.com/formenazarsanjiquestionnairedamuon/api/test`
3. **SMS API**: Use your questionnaire form at `https://damuon.com/questionnaire`

## Expected Result:

Your questionnaire form at `https://damuon.com/questionnaire` should now work without the 500 error when users enter their phone number and click "ارسال کد تایید".

## If Still Having Issues:

Check the logs at `/home9/damuonco/public_html/formenazarsanjiquestionnairedamuon/logs/` for any new error messages.

The CommonJS version includes better error handling and will provide more detailed error messages if something else is wrong.
