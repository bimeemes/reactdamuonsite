# Resume Builder System - دامون

## 🎯 Resume URLs - How They Work

### **✅ YES, the resume URLs now work!**

The system generates shareable URLs like:

```
https://damooninsurance.ir/resume/damoon-xyz123
```

## 🚀 Quick Start

### 1. **Start the Resume API Server**

```bash
npm run start:resume-api
```

This starts the resume management API on `http://localhost:3001`

### 2. **Start the Main Website**

```bash
npm run dev
```

This starts your React website on `http://localhost:5173`

### 3. **Access the Resume Builder**

- Go to: `http://localhost:5173/resume-builder`
- Build your resume with all sections
- Save and get a unique shareable URL

### 4. **View Public Resumes**

- Access any resume via: `http://localhost:5173/resume/[resume-id]`
- Example: `http://localhost:5173/resume/damoon-abc123`

## 📋 Features Implemented

### **Resume Builder (`/resume-builder`)**

- ✅ **Photo Upload** - Profile picture with preview
- ✅ **Personal Info** - Email, phone, job title, location, etc.
- ✅ **About Me** - Professional description
- ✅ **Skills** - Dynamic skill addition with levels
- ✅ **Work Experience** - Company, position, descriptions
- ✅ **Education** - Degree, field, university details
- ✅ **Languages** - Language proficiency tracking
- ✅ **Job Preferences** - Categories, salary, benefits
- ✅ **Quality Scoring** - Real-time completion percentage
- ✅ **Auto-save** - Automatic draft saving
- ✅ **PDF Export** - Professional resume download
- ✅ **Unique URLs** - Shareable resume links

### **Public Resume Display (`/resume/:id`)**

- ✅ **Professional Layout** - Clean, print-friendly design
- ✅ **All Resume Sections** - Complete resume display
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Print Support** - Optimized for printing
- ✅ **View Counter** - Tracks resume views
- ✅ **Call-to-Action** - Links back to resume builder

### **Backend API**

- ✅ **Save/Load Resumes** - JSON file storage
- ✅ **Search System** - For employer access
- ✅ **Statistics** - Usage analytics
- ✅ **Privacy Controls** - Searchable/private options
- ✅ **Data Validation** - Form integrity checks

## 🌐 URL Structure

| URL Pattern       | Component        | Purpose             |
| ----------------- | ---------------- | ------------------- |
| `/resume-builder` | ResumeBuilder    | Create/edit resumes |
| `/resume/:id`     | PublicResumePage | View public resumes |
| `/api/resumes`    | Resume API       | Backend operations  |

## 📁 Files Created

### **Frontend Components**

- `src/components/ResumeBuilder.jsx` - Main resume builder
- `src/components/ResumePreview.jsx` - Resume preview modal
- `src/components/PublicResumePage.jsx` - Public resume display
- `src/services/resumeAPI.js` - API service layer
- `src/styles/ResumeBuilder.css` - Responsive styles

### **Backend API**

- `resume-api.js` - Complete resume management API
- `resumes/` - Directory for storing resume files (auto-created)
- `resume-stats.json` - Usage statistics (auto-created)

## 🔧 API Endpoints

| Method | Endpoint              | Purpose                |
| ------ | --------------------- | ---------------------- |
| POST   | `/api/resumes`        | Save new resume        |
| GET    | `/api/resumes/:id`    | Get resume by ID       |
| PUT    | `/api/resumes/:id`    | Update existing resume |
| DELETE | `/api/resumes/:id`    | Delete resume          |
| GET    | `/api/resumes/search` | Search resumes         |
| GET    | `/api/resumes/stats`  | Get statistics         |

## 📱 Mobile Support

The resume system is fully responsive and works on:

- ✅ **Desktop** - Full featured experience
- ✅ **Tablet** - Optimized layout
- ✅ **Mobile** - Touch-friendly interface
- ✅ **Print** - Professional print styles

## 🎨 Design Features

- **Orange Theme** - Consistent #f66e20 branding
- **Persian RTL** - Right-to-left layout support
- **Smooth Animations** - Professional transitions
- **Accessibility** - High contrast & reduced motion support
- **Loading States** - User feedback during operations

## 🔒 Privacy & Security

- **Searchable Toggle** - Users control visibility
- **Data Validation** - Input sanitization
- **File Limits** - Photo and attachment size limits
- **No Sensitive Data** - Safe for public sharing

## 💡 Usage Examples

### **Create Resume**

1. Visit `/resume-builder`
2. Fill out all sections
3. Upload profile photo
4. Save to get unique URL
5. Share URL with employers

### **View Resume**

1. Click on shared URL (e.g., `/resume/damoon-abc123`)
2. View professional resume layout
3. Print or download as needed
4. Contact candidate directly

### **For Employers**

1. Access search API: `/api/resumes/search`
2. Filter by skills, location, experience
3. View candidate profiles
4. Contact promising candidates

## 🚀 Next Steps

1. **Start both servers** (resume API + main website)
2. **Test the resume builder** at `/resume-builder`
3. **Create a test resume** and get shareable URL
4. **Verify public access** works with the generated URL
5. **Integrate with your hiring process**

The resume URLs are now **fully functional** and ready for use! 🎉
