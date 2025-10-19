# Updated Deployment Guide - Node.js in /backend

## New Directory Structure

Your hosting setup should be:

```
/home/username/
├── public_html/                    # React Frontend
│   ├── index.html                 # Main React app
│   ├── assets/                    # React build files
│   └── .htaccess                  # Client-side routing
└── backend/               # Node.js Backend
    ├── server.js                  # Main server (upload server-cjs.cjs as this)
    ├── questionnaire-api-cjs.cjs  # API routes
    ├── package.json               # Dependencies
    ├── data/                      # Data storage
    └── .htaccess                  # Node.js app config
```

## Deployment Steps:

### 1. Setup Node.js App in cPanel

- Go to cPanel → Node.js Selector
- Create new Node.js app in `/backend` directory
- Set startup file: `server.js`
- Choose Node.js version (18+ recommended)

### 2. Upload Backend Files

Upload these files to `/backend/`:

- `server-cjs.cjs` → rename to `server.js`
- `questionnaire-api-cjs.cjs` → keep as is
- `package.json` (existing)
- `nodejs-app.htaccess` → rename to `.htaccess`

### 3. New API URLs

Your backend will be accessible at:

- Main API: `https://damuon.com:3001/api/...`
- Or: `https://yourdomain.com/backend/api/...` (depends on hosting config)

### 4. Update Frontend API Calls

We'll need to update your React app to point to the new backend location.

## Next Steps:

1. Create the Node.js app in cPanel
2. Upload the files
3. Update frontend API URLs
4. Test the connection
