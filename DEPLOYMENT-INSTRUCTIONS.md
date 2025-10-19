# 🚀 Deployment Instructions for Host Iran

## 📁 Files to Upload

Upload these files/folders to your `/home9/damuonco/backend` directory:

```
backend/
├── app.js                 (Node.js server entry point)
├── package.json          (rename package-deploy.json to package.json)
├── dist/                 (entire dist folder with React build)
│   ├── index.html
│   ├── assets/
│   └── ... (all build files)
└── .htaccess            (optional, for additional config)
```

## 🔧 Deployment Steps

### 1. Connect via SSH

```bash
ssh your-username@your-host-iran-server.com
```

### 2. Navigate to your directory and activate environment

```bash
source /home9/damuonco/nodevenv/backend/20/bin/activate
cd /home9/damuonco/backend
```

### 3. Verify Node.js version

```bash
node --version
# Should show: v22.17.0 or similar
```

### 4. Clean existing files (if any)

```bash
rm -rf node_modules
rm -f package-lock.json
```

### 5. Rename deployment package.json

```bash
mv package-deploy.json package.json
```

### 6. Install dependencies

```bash
npm install
```

### 7. Test the application

```bash
node app.js
```

### 8. Create/Update .htaccess file

Create `.htaccess` in your domain's public folder (likely `/home9/damuonco/public_html`):

```apache
# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION BEGIN
PassengerAppRoot "/home9/damuonco/backend"
PassengerBaseURI "/"
PassengerNodejs "/home9/damuonco/nodevenv/backend/20/bin/node"
PassengerAppType node
PassengerStartupFile app.js
# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION END

# Custom redirects and optimizations
RewriteEngine On

# Force HTTPS (if SSL is enabled)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## 🧪 Testing

1. Visit `https://damuon.com` in your browser
2. Check all sections load properly
3. Test the image slider functionality
4. Verify smooth scrolling works
5. Test search functionality
6. Check mobile responsiveness

## 🔍 Troubleshooting

### If site shows "It works!" instead of your site:

- Check `.htaccess` file is in the correct location
- Verify `PassengerAppRoot` points to `/home9/damuonco/backend`
- Ensure `app.js` exists in the backend directory

### If you see 404 errors:

- Verify `dist` folder is uploaded completely
- Check `app.js` is serving static files correctly

### If images don't load:

- Confirm all files in `dist/assets/` are uploaded
- Check file permissions (should be 644 for files, 755 for directories)

## 📞 Support

If you need help:

- Contact Host Iran support
- Check error logs in your control panel
- Verify all file paths are correct

## 🎉 Go Live!

Once deployed, your professional insurance website will be live at:
**https://damuon.com**

Features included:
✅ Professional insurance landing page
✅ Interactive image slider
✅ Smooth scrolling navigation
✅ Search functionality
✅ Mobile-responsive design
✅ Persian language support
✅ Modern UI with animations
