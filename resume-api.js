// Resume Management API for Damoon Insurance Resume Builder
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const RESUMES_DIR = path.join(__dirname, 'resumes');
const STATS_FILE = path.join(__dirname, 'resume-stats.json');

// Email configuration
const emailConfig = {
  service: 'gmail',
  auth: {
    user: 'bimeemes@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password', // You'll need to set this
  },
};

console.log('📧 Email config:', {
  user: emailConfig.auth.user,
  hasPassword: !!process.env.EMAIL_PASSWORD,
  passwordLength: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 0,
});

const transporter = nodemailer.createTransport(emailConfig);

// Ensure directories exist
async function initializeDirectories() {
  try {
    await fs.access(RESUMES_DIR);
  } catch {
    await fs.mkdir(RESUMES_DIR, { recursive: true });
  }
}

// Initialize stats file
async function initializeStats() {
  try {
    await fs.access(STATS_FILE);
  } catch {
    const initialStats = {
      totalResumes: 0,
      activeResumes: 0,
      searchableResumes: 0,
      categoriesCount: {},
      lastUpdated: new Date().toISOString(),
    };
    await fs.writeFile(STATS_FILE, JSON.stringify(initialStats, null, 2));
  }
}

// Generate unique resume ID
function generateResumeId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `damoon-${timestamp}-${random}`;
}

// Send resume notification email
async function sendResumeNotification(resumeData, resumeId) {
  try {
    console.log('📤 Attempting to send email notification...');
    console.log('👤 Resume data preview:', {
      name: resumeData.personal?.fullName,
      email: resumeData.personal?.email,
      jobTitle: resumeData.personal?.jobTitle,
    });

    const mailOptions = {
      from: 'bimeemes@gmail.com',
      to: 'bimeemes@gmail.com',
      subject: `[RESUME-SYSTEM] رزومه جدید - ${resumeData.personal?.jobTitle || 'نامشخص'}`,
      html: `
        <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
          <h2 style="color: #f36e21;">🎯 رزومه جدید دریافت شد</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>اطلاعات کلی:</h3>
            <p><strong>نام:</strong> ${resumeData.personal?.fullName || 'نامشخص'}</p>
            <p><strong>ایمیل:</strong> ${resumeData.personal?.email || 'نامشخص'}</p>
            <p><strong>تلفن:</strong> ${resumeData.personal?.phone || 'نامشخص'}</p>
            <p><strong>سمت مورد نظر:</strong> ${resumeData.personal?.jobTitle || 'نامشخص'}</p>
            <p><strong>استان:</strong> ${resumeData.personal?.province || 'نامشخص'}</p>
            <p><strong>وضعیت اشتغال:</strong> ${resumeData.personal?.workStatus || 'نامشخص'}</p>
          </div>

          ${
            resumeData.retiredParent &&
            (resumeData.retiredParent.parentName ||
              resumeData.retiredParent.retirementNumber ||
              resumeData.retiredParent.retiredMobile ||
              resumeData.retiredParent.workPlace ||
              resumeData.retiredParent.retirementYear ||
              resumeData.retiredParent.retirementType)
              ? `
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>اطلاعات فرزند بازنشسته:</h3>
            ${resumeData.retiredParent.parentName ? `<p><strong>نام پدر/مادر:</strong> ${resumeData.retiredParent.parentName}</p>` : ''}
            ${resumeData.retiredParent.retirementNumber ? `<p><strong>شماره بازنشستگی:</strong> ${resumeData.retiredParent.retirementNumber}</p>` : ''}
            ${resumeData.retiredParent.retiredMobile ? `<p><strong>شماره موبایل بازنشسته:</strong> ${resumeData.retiredParent.retiredMobile}</p>` : ''}
            ${resumeData.retiredParent.workPlace ? `<p><strong>محل خدمت:</strong> ${resumeData.retiredParent.workPlace}</p>` : ''}
            ${resumeData.retiredParent.retirementYear ? `<p><strong>سال بازنشستگی:</strong> ${resumeData.retiredParent.retirementYear}</p>` : ''}
            ${resumeData.retiredParent.retirementType ? `<p><strong>نوع بازنشستگی:</strong> ${resumeData.retiredParent.retirementType === 'social_security' ? 'تامین اجتماعی' : 'کارمندی'}</p>` : ''}
          </div>
          `
              : ''
          }

          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>سوابق کاری:</h3>
            ${
              resumeData.workExperience?.length > 0
                ? resumeData.workExperience
                    .map(
                      work =>
                        `<p>• ${work.position} در ${work.company} (${work.startDate} - ${work.endDate})</p>`
                    )
                    .join('')
                : '<p>سابقه کاری ثبت نشده</p>'
            }
          </div>

          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>مهارت‌ها:</h3>
            ${
              resumeData.skills?.length > 0
                ? resumeData.skills
                    .map(
                      skill =>
                        `<span style="background: #f36e21; color: white; padding: 4px 8px; margin: 2px; border-radius: 4px; display: inline-block;">${skill.skill} (${skill.level})</span>`
                    )
                    .join(' ')
                : '<p>مهارت ثبت نشده</p>'
            }
          </div>

          <div style="background: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>عملیات مدیریت:</h3>
            <p><strong>شناسه رزومه:</strong> ${resumeId}</p>
            <p><strong>تاریخ ارسال:</strong> ${new Date().toLocaleDateString('fa-IR')}</p>
            <p><a href="https://damuon.com/resume/${resumeId}" style="color: #f36e21;">مشاهده رزومه عمومی</a></p>
            <p>برای مدیریت این رزومه، به پنل ادمین مراجعه کنید.</p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            این ایمیل از سیستم مدیریت رزومه وبسایت دامون (damuon.com) ارسال شده است.<br>
            برای جلوگیری از دریافت این نوع ایمیل‌ها، فیلتر خاصی تنظیم کنید.
          </p>
        </div>
      `,
      // Set custom headers to help with filtering
      headers: {
        'X-Resume-System': 'damuon-website',
        'X-Category': 'resume-submission',
        'X-Priority': 'high',
        'X-Auto-Response-Suppress': 'DR, RN, NRN, OOF, AutoReply',
        'List-ID': 'resumes.damuon.com',
        'List-Unsubscribe': '<mailto:noreply@damuon.com>',
        'X-Message-Flag': 'RESUME-NOTIFICATION',
      },
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Resume notification sent for: ${resumeData.personal?.fullName}`);
  } catch (error) {
    console.error('❌ Failed to send resume notification:', error);
    // Don't throw error - we don't want email failure to break resume saving
  }
}

// Save resume
app.post('/api/resumes', async (req, res) => {
  try {
    console.log('💾 Resume save request received');
    const { resumeData, profilePhoto } = req.body;
    const resumeId = generateResumeId();

    console.log('📝 Creating resume document with ID:', resumeId);
    console.log('👤 Resume data preview:', {
      name: resumeData?.personal?.fullName || 'No name',
      email: resumeData?.personal?.email || 'No email',
      jobTitle: resumeData?.personal?.jobTitle || 'No job title',
    });

    const resumeDocument = {
      id: resumeId,
      data: resumeData,
      photo: profilePhoto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      status: 'pending', // For admin review
    };

    const filePath = path.join(RESUMES_DIR, `${resumeId}.json`);
    await fs.writeFile(filePath, JSON.stringify(resumeDocument, null, 2));
    console.log('📁 Resume file saved to:', filePath);

    await updateStats();
    console.log('📊 Stats updated');

    // Send email notification
    console.log('📧 Calling sendResumeNotification...');
    await sendResumeNotification(resumeData, resumeId);
    console.log('✅ Email notification completed');

    res.json({
      success: true,
      resumeId: resumeId,
      message: 'رزومه با موفقیت ذخیره شد',
      publicUrl: `https://damuon.com/resume/${resumeId}`,
    });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ذخیره سازی رزومه',
    });
  }
});

// Get specific resume
app.get('/api/resumes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = path.join(RESUMES_DIR, `${id}.json`);
    const resumeData = await fs.readFile(filePath, 'utf8');
    const resume = JSON.parse(resumeData);

    // Increment view count
    resume.views = (resume.views || 0) + 1;
    resume.lastViewed = new Date().toISOString();
    await fs.writeFile(filePath, JSON.stringify(resume, null, 2));

    res.json({
      success: true,
      resume: resume,
    });
  } catch (error) {
    console.error('Error loading resume:', error);
    res.status(404).json({
      success: false,
      message: 'رزومه یافت نشد',
    });
  }
});

// Update resume
app.put('/api/resumes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { resumeData, profilePhoto } = req.body;
    const filePath = path.join(RESUMES_DIR, `${id}.json`);

    // Load existing resume
    const existingData = await fs.readFile(filePath, 'utf8');
    const existingResume = JSON.parse(existingData);

    // Update resume
    const updatedResume = {
      ...existingResume,
      data: resumeData,
      photo: profilePhoto,
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(filePath, JSON.stringify(updatedResume, null, 2));

    res.json({
      success: true,
      message: 'رزومه با موفقیت بروزرسانی شد',
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در بروزرسانی رزومه',
    });
  }
});

// Delete resume
app.delete('/api/resumes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = path.join(RESUMES_DIR, `${id}.json`);
    await fs.unlink(filePath);

    await updateStats();

    res.json({
      success: true,
      message: 'رزومه با موفقیت حذف شد',
    });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در حذف رزومه',
    });
  }
});

// Get all resumes for admin management
app.get('/api/admin/resumes', async (req, res) => {
  try {
    const files = await fs.readdir(RESUMES_DIR);
    const resumes = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(RESUMES_DIR, file);
        const resumeData = await fs.readFile(filePath, 'utf8');
        const resume = JSON.parse(resumeData);

        // Include all resume data for admin
        resumes.push({
          id: resume.id,
          personalInfo: resume.data?.personal || {},
          workExperience: resume.data?.workExperience || [],
          skills: resume.data?.skills || [],
          education: resume.data?.education || [],
          jobPreferences: resume.data?.jobPreferences || {},
          status: resume.status || 'pending',
          createdAt: resume.createdAt,
          updatedAt: resume.updatedAt,
          views: resume.views || 0,
          managerNotes: resume.managerNotes || '',
          reviewedAt: resume.reviewedAt,
          reviewedBy: resume.reviewedBy,
        });
      }
    }

    // Sort by creation date (newest first)
    resumes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(resumes);
  } catch (error) {
    console.error('خطا در دریافت لیست رزومه‌ها:', error);
    res.status(500).json({ error: 'خطا در دریافت لیست رزومه‌ها' });
  }
});

// Update resume status (for admin)
app.patch('/api/admin/resumes/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, managerNotes, reviewedBy } = req.body;

    const filePath = path.join(RESUMES_DIR, `${id}.json`);
    const resumeData = await fs.readFile(filePath, 'utf8');
    const resume = JSON.parse(resumeData);

    // Update status and add review information
    resume.status = status;
    resume.managerNotes = managerNotes || resume.managerNotes;
    resume.reviewedAt = new Date().toISOString();
    resume.reviewedBy = reviewedBy || 'مدیر منابع انسانی';
    resume.updatedAt = new Date().toISOString();

    await fs.writeFile(filePath, JSON.stringify(resume, null, 2));
    await updateStats();

    res.json({ message: 'وضعیت رزومه به‌روزرسانی شد', resume });
  } catch (error) {
    console.error('خطا در به‌روزرسانی وضعیت رزومه:', error);
    res.status(500).json({ error: 'خطا در به‌روزرسانی وضعیت رزومه' });
  }
});

// Export resume data (for admin)
app.get('/api/admin/resumes/:id/export', async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = path.join(RESUMES_DIR, `${id}.json`);
    const resumeData = await fs.readFile(filePath, 'utf8');
    const resume = JSON.parse(resumeData);

    // Return JSON data with proper headers for download
    res.setHeader('Content-Disposition', `attachment; filename="resume-${id}.json"`);
    res.setHeader('Content-Type', 'application/json');
    res.json(resume);
  } catch (error) {
    console.error('خطا در دانلود رزومه:', error);
    res.status(404).json({ error: 'رزومه پیدا نشد' });
  }
});

// Search resumes (public searchable ones)
app.get('/api/resumes/search', async (req, res) => {
  try {
    const { category, location, skills, experience, page = 1, limit = 10 } = req.query;

    const files = await fs.readdir(RESUMES_DIR);
    const resumes = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(RESUMES_DIR, file);
        const resumeData = await fs.readFile(filePath, 'utf8');
        const resume = JSON.parse(resumeData);

        if (resume.data.isSearchable) {
          // Apply filters
          let matches = true;

          if (category && resume.data.jobPreferences?.jobCategory !== category) {
            matches = false;
          }

          if (location && resume.data.personal?.province !== location) {
            matches = false;
          }

          if (skills && resume.data.skills) {
            const resumeSkills = resume.data.skills.map(s => s.skill.toLowerCase());
            const searchSkills = skills.toLowerCase().split(',');
            const hasMatchingSkill = searchSkills.some(skill =>
              resumeSkills.some(resumeSkill => resumeSkill.includes(skill.trim()))
            );
            if (!hasMatchingSkill) {
              matches = false;
            }
          }

          if (matches) {
            // Remove sensitive data for search results
            resumes.push({
              id: resume.id,
              jobTitle: resume.data.personal?.jobTitle,
              province: resume.data.personal?.province,
              workStatus: resume.data.personal?.workStatus,
              skills: resume.data.skills?.map(s => s.skill),
              experience: resume.data.workExperience?.length || 0,
              education: resume.data.education?.[0]?.degree,
              lastUpdated: resume.updatedAt,
              quality: calculateResumeQuality(resume.data),
            });
          }
        }
      }
    }

    // Sort by quality and last updated
    resumes.sort((a, b) => {
      if (b.quality !== a.quality) {
        return b.quality - a.quality;
      }
      return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedResumes = resumes.slice(startIndex, startIndex + limit);

    res.json({
      success: true,
      resumes: paginatedResumes,
      total: resumes.length,
      page: parseInt(page),
      totalPages: Math.ceil(resumes.length / limit),
    });
  } catch (error) {
    console.error('Error searching resumes:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در جستجو',
    });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت آمار',
    });
  }
});

// Calculate resume quality score
function calculateResumeQuality(resumeData) {
  let quality = 0;

  if (resumeData.personal?.jobTitle) {
    quality += 10;
  }
  if (resumeData.personal?.phone) {
    quality += 10;
  }
  if (resumeData.personal?.province) {
    quality += 5;
  }
  if (resumeData.about) {
    quality += 15;
  }
  if (resumeData.skills?.length > 0) {
    quality += 15;
  }
  if (resumeData.workExperience?.length > 0) {
    quality += 20;
  }
  if (resumeData.education?.length > 0) {
    quality += 15;
  }
  if (resumeData.languages?.length > 0) {
    quality += 10;
  }

  // Add retired parent section scoring (5 points if any field is filled)
  if (
    resumeData.retiredParent &&
    (resumeData.retiredParent.parentName ||
      resumeData.retiredParent.retirementNumber ||
      resumeData.retiredParent.retiredMobile ||
      resumeData.retiredParent.workPlace ||
      resumeData.retiredParent.retirementYear ||
      resumeData.retiredParent.retirementType)
  ) {
    quality += 5;
  }

  return Math.min(quality, 100);
}

// Update statistics
async function updateStats() {
  try {
    const files = await fs.readdir(RESUMES_DIR);
    const stats = {
      totalResumes: 0,
      activeResumes: 0,
      searchableResumes: 0,
      categoriesCount: {},
      averageQuality: 0,
      lastUpdated: new Date().toISOString(),
    };

    let totalQuality = 0;

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(RESUMES_DIR, file);
        const resumeData = await fs.readFile(filePath, 'utf8');
        const resume = JSON.parse(resumeData);

        stats.totalResumes++;

        if (resume.status === 'pending') {
          stats.activeResumes++;
        }

        if (resume.data.isSearchable) {
          stats.searchableResumes++;
        }

        // Count by category
        const category = resume.data.jobPreferences?.jobCategory || 'نامشخص';
        stats.categoriesCount[category] = (stats.categoriesCount[category] || 0) + 1;

        // Add to quality calculation
        totalQuality += calculateResumeQuality(resume.data);
      }
    }

    stats.averageQuality =
      stats.totalResumes > 0 ? Math.round(totalQuality / stats.totalResumes) : 0;

    await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.error('Error updating stats:', error);
    throw error;
  }
}

async function getStats() {
  try {
    const statsData = await fs.readFile(STATS_FILE, 'utf8');
    return JSON.parse(statsData);
  } catch (error) {
    return await updateStats();
  }
}

// Initialize app
async function initializeApp() {
  await initializeDirectories();
  await initializeStats();

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Resume Management API running on port ${PORT}`);
    console.log(`📊 API Endpoints:`);
    console.log(`   POST /api/resumes - Save resume`);
    console.log(`   GET /api/resumes/:id - Get resume`);
    console.log(`   PUT /api/resumes/:id - Update resume`);
    console.log(`   DELETE /api/resumes/:id - Delete resume`);
    console.log(`   GET /api/resumes - Get all resumes (ADMIN)`);
    console.log(`   PATCH /api/resumes/:id/status - Update status (ADMIN)`);
    console.log(`   GET /api/resumes/:id/export - Export resume (ADMIN)`);
    console.log(`   GET /api/resumes/search - Search resumes`);
    console.log(`   GET /api/stats - Get statistics`);
  });
}

// Error handling
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'خطای داخلی سرور',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'آدرس درخواستی یافت نشد',
  });
});

// Start the application
initializeApp().catch(console.error);

export default app;
