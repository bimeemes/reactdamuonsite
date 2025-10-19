# Upload Commands for Your Fixed Backend Files

## Using SCP (if you have SSH access):

```bash
# Upload the fixed server file
scp server-cjs.cjs username@damuon.com:/home9/damuonco/public_html/formenazarsanjiquestionnairedamuon/server.js

# Upload the fixed questionnaire API
scp questionnaire-api-cjs.cjs username@damuonco.com:/home9/damuonco/public_html/formenazarsanjiquestionnairedamuon/questionnaire-api-cjs.cjs
```

## Using VS Code SSH Extension:

1. Install "Remote - SSH" extension
2. Connect to your server: `ssh username@damuon.com`
3. Navigate to: `/home9/damuonco/public_html/formenazarsanjiquestionnairedamuon/`
4. Upload files using the file explorer

## Using cPanel File Manager:

1. Login to cPanel
2. Open File Manager
3. Navigate to: `public_html/formenazarsanjiquestionnairedamuon/`
4. Upload `server-cjs.cjs` and rename to `server.js`
5. Upload `questionnaire-api-cjs.cjs` (keep the .cjs extension)

## Files to Upload:

- ✅ `server-cjs.cjs` → rename to `server.js` (replace existing)
- ✅ `questionnaire-api-cjs.cjs` → upload as is

## After Upload:

1. Restart your Node.js app from cPanel
2. Test: https://damuon.com/questionnaire
