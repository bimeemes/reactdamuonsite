# Node.js App Deployment Guide for cPanel

## Files to Upload to Node.js App Directory

Upload these files to your cPanel Node.js app directory (`/home9/damuonco/public_html/formenazarsanjiquestionnairedamuon/`):

### Backend Files (Required):

1. **server.js** - Main server file
2. **package.json** - Dependencies and scripts
3. **blog-api.js** - Blog API routes
4. **questionnaire-api.js** - Questionnaire API routes (UPDATED - contains fixed routes)
5. **upload-api.js** - File upload API routes
6. **backend-utils.js** - Backend utility functions
7. **nodejs-app.htaccess** - Rename this to `.htaccess` after upload

### Data Files (Required):

8. **blog-posts.json** - Blog posts data
9. Create **data/** directory for questionnaire submissions
10. Create **logs/** directory for error logs
11. Create **public/uploads/** directory for file uploads

### Static Assets (Optional but recommended):

12. **public/** folder contents (if any static files needed)

## Deployment Steps:

1. **Upload all backend files** to your Node.js app directory
2. **Rename `nodejs-app.htaccess` to `.htaccess`** in the app directory
3. **Install dependencies** via cPanel Node.js App interface
4. **Set startup file** to `server.js` in cPanel
5. **Restart the Node.js application**

## Important Notes:

- The `.htaccess` file MUST exist in the Node.js app directory for cPanel to work properly
- The questionnaire API routes have been fixed to work with the cPanel path configuration
- Make sure the Node.js version matches your app requirements (specified in package.json engines)
- The app should run on the port assigned by cPanel (not 3001)

## Testing:

After deployment, test these URLs:

- https://damuon.com/formenazarsanjiquestionnairedamuon/ (should show app status)
- https://damuon.com/formenazarsanjiquestionnairedamuon/api/questionnaire/send-code (POST request)
- https://damuon.com/formenazarsanjiquestionnairedamuon/api/admin/questionnaire-submissions (GET request)

## Frontend (React App) - Separate Deployment:

The React frontend (dist/ folder contents) should be uploaded to the main public_html directory with its own .htaccess file for client-side routing.
