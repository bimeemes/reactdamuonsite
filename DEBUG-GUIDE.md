# Debugging Node.js API Issues on cPanel

## Current Problem:

- API requests to `/api/questionnaire/send-code` return `content-type: text/html` instead of JSON
- This means the Node.js app is NOT handling the request - Apache is serving HTML instead

## Debugging Steps:

### 1. Verify Node.js App is Running

Test these URLs in your browser:

- `https://damuon.com/formenazarsanjiquestionnairedamuon/health` (should return JSON)
- `https://damuon.com/formenazarsanjiquestionnairedamuon/api/test` (should return JSON)

If these return HTML instead of JSON, your Node.js app is NOT running.

### 2. Check cPanel Node.js App Status

In your cPanel:

- Go to "Node.js App"
- Check if your app shows as "Running"
- Check if the startup file is set to "server.js"
- Check if all dependencies are installed

### 3. Verify File Structure in cPanel

Your Node.js app directory should have:

```
/home9/damuonco/public_html/formenazarsanjiquestionnairedamuon/
├── .htaccess (THIS IS CRITICAL - upload the nodejs-app.htaccess file as .htaccess)
├── server.js
├── package.json
├── questionnaire-api.js
├── blog-api.js
├── upload-api.js
├── backend-utils.js
├── node_modules/ (auto-created by cPanel)
└── data/ (create this directory)
```

### 4. Test Individual API Endpoints

Once the app is confirmed running, test:

- `https://damuon.com/formenazarsanjiquestionnairedamuon/api/test/questionnaire` (POST request)
- `https://damuon.com/formenazarsanjiquestionnairedamuon/api/questionnaire/send-code` (POST request)

### 5. Common Issues and Solutions:

**Issue: App shows as stopped/error**

- Check server.js for syntax errors
- Verify all required files are uploaded
- Check Node.js version compatibility

**Issue: App runs but APIs return HTML**

- Missing or incorrect .htaccess file
- Port binding issues (let cPanel assign the port)
- Route conflicts

**Issue: CORS errors**

- Add proper CORS headers (already in server.js)
- Verify origin settings

### 6. Emergency Fallback

If Node.js app won't start, check the error logs in cPanel Node.js App section.

## Next Steps:

1. Upload the updated server.js file
2. Ensure .htaccess exists in the Node.js app directory (rename nodejs-app.htaccess)
3. Restart the Node.js application
4. Test the /health endpoint first
5. Then test the API endpoints
