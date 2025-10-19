# DEPLOYMENT TO /backend FOLDER

## Backend Deployment (Node.js App)

### Upload to `/backend` folder:

1. **server-cjs.cjs** → Upload as **server.js** (replace existing)
2. **questionnaire-api-cjs.cjs** → Upload as **questionnaire-api-cjs.cjs**
3. **package.json** → Upload (if needed)
4. **nodejs-app.htaccess** → Upload as **.htaccess**

### Via SSH Terminal (if you're connected):

```bash
# Navigate to backend directory
cd ~/backend

# Upload files from your local machine
# (Run these commands from your local machine, not SSH)
scp server-cjs.cjs username@damuon.com:~/backend/server.js
scp questionnaire-api-cjs.cjs username@damuon.com:~/backend/questionnaire-api-cjs.cjs
```

### Via cPanel File Manager:

1. Login to cPanel
2. Open File Manager
3. Navigate to `/backend/` folder
4. Upload `server-cjs.cjs` and rename to `server.js`
5. Upload `questionnaire-api-cjs.cjs` (keep .cjs extension)

## Frontend Deployment (React App)

### Upload to `/public_html` folder:

1. Run `npm run build` to create production build
2. Upload contents of `dist/` folder to `public_html/`
3. Ensure `.htaccess` is in `public_html/` for React routing

## After Deployment:

1. **Restart Node.js app** from cPanel Node.js interface
2. **Test backend**: `https://damuon.com/backend/api/test`
3. **Test frontend**: `https://damuon.com/questionnaire`

## Expected URLs:

- **Frontend**: https://damuon.com/
- **Questionnaire Form**: https://damuon.com/questionnaire
- **Backend API**: https://damuon.com/backend/api/questionnaire/send-code
- **Admin Panel**: https://damuon.com/admin (if you have one)
