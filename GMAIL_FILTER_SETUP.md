# Gmail Filter Setup for Resume System

## Automatic Email Organization for Resume Submissions

### Option 1: Gmail Filter (Recommended)

1. **Go to Gmail Settings:**
   - Open Gmail (bimeemes@gmail.com)
   - Click the gear icon → "See all settings"
   - Go to "Filters and Blocked Addresses" tab

2. **Create New Filter:**
   - Click "Create a new filter"
   - In the filter criteria:
     - **From:** bimeemes@gmail.com
     - **Subject:** [RESUME-SYSTEM]
     - **Has the words:** X-Category:resume-submission

3. **Set Filter Actions:**
   - ✅ Skip the Inbox (Archive it)
   - ✅ Apply the label: "Resumes" (create this label)
   - ✅ Star it
   - ✅ Mark as important
   - Optional: Forward to another email if needed

4. **Click "Create filter"**

### Option 2: Gmail Labels & Rules

1. **Create Labels:**
   - Create label: "HR/Resumes"
   - Create sub-labels:
     - "HR/Resumes/New"
     - "HR/Resumes/Reviewed"

2. **Advanced Filter:**
   ```
   from:(bimeemes@gmail.com)
   subject:([RESUME-SYSTEM])
   OR
   has:attachment filename:resume
   OR
   "X-Resume-System: damoon-insurance"
   ```

### Option 3: Third-Party Email Rules

If using Outlook or other email clients, create rules based on:

- **Sender:** bimeemes@gmail.com
- **Subject contains:** [RESUME-SYSTEM]
- **Header contains:** X-Resume-System: damoon-insurance

### Email Headers Added for Filtering:

The system automatically adds these headers to resume emails:

- `X-Resume-System: damoon-insurance`
- `X-Category: resume-submission`
- `List-ID: resumes.bimeemes.com`

### Email Content Includes:

Each resume email contains:

- 👤 Personal information
- 💼 Work experience
- 🔧 Skills
- 📍 Direct link to view resume
- 🆔 Resume ID for management

### Testing:

1. Submit a test resume through the website
2. Check if email arrives with proper subject: "[RESUME-SYSTEM] رزومه جدید - ..."
3. Verify filter is working correctly
4. Check that emails go to designated folder/label

### Troubleshooting:

- If emails go to spam, mark as "Not Spam" and create filter
- Gmail may require App Password (not regular password)
- Check email quota limits
- Verify SMTP settings are correct

This system ensures all resume submissions are automatically organized and don't clutter your main inbox!
