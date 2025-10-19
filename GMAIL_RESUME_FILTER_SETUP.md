# Gmail Filter Setup for Resume Emails

## Automatic Email Organization for Resume Submissions

### Step 1: Create Labels in Gmail

1. Open Gmail (bimeemes@gmail.com)
2. Go to Settings (⚙️ icon) → "See all settings"
3. Click on "Labels" tab
4. Click "Create new label"
5. Create these labels:
   - **"HR"** (main category)
   - **"HR/Resumes"** (subcategory)
   - **"HR/Resumes/New"** (for unreviewed resumes)
   - **"HR/Resumes/Reviewed"** (for processed resumes)

### Step 2: Create Email Filter (CORRECTED)

1. In Gmail, click the search box
2. Click the filter icon (☰) on the right side of search box
3. Set up filter with ONLY these criteria:

**Filter Criteria (IMPORTANT - Only fill these fields):**

- **From:** bimeemes@gmail.com
- **Subject:** [RESUME-SYSTEM]
- **Leave ALL other fields EMPTY** (Gmail can't filter by custom headers)

### Step 3: Filter Actions (CORRECTED)

After creating the filter, set these actions:

- ✅ **Skip the Inbox** (Archive it)
- ✅ **Apply the label:** "HR/Resume/New" (NOT HR/HR/Resume/...)
- ✅ **Star it**
- ✅ **Always mark it as important**
- ✅ **Never send it to Spam**
- ✅ **Also apply filter to existing emails** (optional)

**CRITICAL:** Make sure label path is exactly "HR/Resume/New" not "HR/HR/Resume/HR/Resume/New"

### Step 4: Create Second Filter for Organization

Create another filter for easy management:

- **Has the words:** X-Category:resume-submission
- **Actions:**
  - Apply label: "HR/Resumes/New"
  - Star it
  - Mark as important

### Step 5: Mobile App Setup

To see these emails on your phone:

1. Open Gmail app
2. Tap ☰ (hamburger menu)
3. Scroll down to see "HR/Resumes/New" label
4. Tap it to view resume emails

## Result:

- ✅ Resume emails will NOT appear in inbox
- ✅ They go directly to "HR/Resumes/New" folder
- ✅ Starred and marked important for easy identification
- ✅ Can be accessed from sidebar in Gmail
- ✅ Mobile-friendly access

## Quick Access:

- **Desktop:** Click "HR/Resumes/New" in left sidebar
- **Mobile:** Menu → HR/Resumes/New
- **Search:** Use `label:hr-resumes-new` in search box
