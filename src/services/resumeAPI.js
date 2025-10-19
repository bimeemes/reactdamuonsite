// Resume API Service for Frontend
class ResumeAPIService {
  constructor(baseURL = 'http://localhost:3001/api') {
    this.baseURL = baseURL;
  }

  // Save resume
  async saveResume(resumeData, profilePhoto) {
    try {
      const response = await fetch(`${this.baseURL}/resumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData,
          profilePhoto,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'خطا در ذخیره رزومه');
      }

      return result;
    } catch (error) {
      console.error('Error saving resume:', error);
      throw error;
    }
  }

  // Load resume by ID
  async loadResume(resumeId) {
    try {
      const response = await fetch(`${this.baseURL}/resumes/${resumeId}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'خطا در بارگذاری رزومه');
      }

      return result.resume;
    } catch (error) {
      console.error('Error loading resume:', error);
      throw error;
    }
  }

  // Update resume
  async updateResume(resumeId, resumeData, profilePhoto) {
    try {
      const response = await fetch(`${this.baseURL}/resumes/${resumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData,
          profilePhoto,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'خطا در بروزرسانی رزومه');
      }

      return result;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  }

  // Delete resume
  async deleteResume(resumeId) {
    try {
      const response = await fetch(`${this.baseURL}/resumes/${resumeId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'خطا در حذف رزومه');
      }

      return result;
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  }

  // Search resumes
  async searchResumes(filters = {}, page = 1, limit = 20) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      });

      const response = await fetch(`${this.baseURL}/resumes/search?${params}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'خطا در جستجوی رزومه‌ها');
      }

      return result;
    } catch (error) {
      console.error('Error searching resumes:', error);
      throw error;
    }
  }

  // Get statistics
  async getStats() {
    try {
      const response = await fetch(`${this.baseURL}/resumes/stats`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'خطا در دریافت آمار');
      }

      return result.stats;
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }

  // Generate PDF (client-side)
  async generatePDF(resumeData, profilePhoto) {
    try {
      // Dynamic import to avoid issues with SSR
      const jsPDF = (await import('jspdf')).default;

      // Create new PDF document (A4 size)
      const pdf = new jsPDF('p', 'mm', 'a4');

      // PDF dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      let yPosition = margin;

      // Add Persian font support
      pdf.addFont(
        'https://fonts.googleapis.com/css2?family=Vazir:wght@300;400;500;600;700&display=swap',
        'Vazir',
        'normal'
      );

      // Helper function to add text with word wrap
      const addText = (text, fontSize = 12, isBold = false, color = [0, 0, 0]) => {
        pdf.setFontSize(fontSize);
        pdf.setTextColor(color[0], color[1], color[2]);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');

        const lines = pdf.splitTextToSize(text, contentWidth);
        lines.forEach(line => {
          if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition, { align: 'right' });
          yPosition += fontSize * 0.5;
        });
        yPosition += 5;
      };

      // Header Section
      pdf.setFillColor(246, 110, 32); // Orange color
      pdf.rect(0, 0, pageWidth, 40, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text(resumeData.personal?.fullName || 'نام نامشخص', pageWidth - margin, 25, {
        align: 'right',
      });

      pdf.setFontSize(14);
      pdf.text(resumeData.personal?.jobTitle || 'عنوان شغلی', pageWidth - margin, 35, {
        align: 'right',
      });

      yPosition = 60;

      // Contact Information
      pdf.setTextColor(0, 0, 0);
      addText('اطلاعات تماس', 16, true, [246, 110, 32]);

      if (resumeData.personal?.email) {
        addText(`ایمیل: ${resumeData.personal.email}`, 12);
      }
      if (resumeData.personal?.phone) {
        addText(`تلفن: ${resumeData.personal.phone}`, 12);
      }
      if (resumeData.personal?.address) {
        addText(`آدرس: ${resumeData.personal.address}`, 12);
      }

      yPosition += 10;

      // About Me Section
      if (resumeData.about) {
        addText('درباره من', 16, true, [246, 110, 32]);
        addText(resumeData.about, 12);
        yPosition += 10;
      }

      // Work Experience
      if (resumeData.workExperience && resumeData.workExperience.length > 0) {
        addText('سوابق شغلی', 16, true, [246, 110, 32]);

        resumeData.workExperience.forEach(work => {
          addText(`${work.position} در ${work.company}`, 14, true);
          if (work.startDate || work.endDate) {
            addText(`${work.startDate || ''} - ${work.endDate || 'در حال حاضر'}`, 11);
          }
          if (work.description) {
            addText(work.description, 11);
          }
          yPosition += 5;
        });
        yPosition += 10;
      }

      // Education
      if (resumeData.education && resumeData.education.length > 0) {
        addText('سوابق تحصیلی', 16, true, [246, 110, 32]);

        resumeData.education.forEach(edu => {
          addText(`${edu.degree} - ${edu.field}`, 14, true);
          addText(edu.university, 12);
          if (edu.graduationYear) {
            addText(`سال فارغ‌التحصیلی: ${edu.graduationYear}`, 11);
          }
          yPosition += 5;
        });
        yPosition += 10;
      }

      // Skills
      if (resumeData.skills && resumeData.skills.length > 0) {
        addText('مهارت‌ها', 16, true, [246, 110, 32]);

        const skillsText = resumeData.skills
          .map(skill => `${skill.skill} (${skill.level})`)
          .join(' • ');
        addText(skillsText, 12);
        yPosition += 10;
      }

      // Languages
      if (resumeData.languages && resumeData.languages.length > 0) {
        addText('زبان‌ها', 16, true, [246, 110, 32]);

        resumeData.languages.forEach(lang => {
          addText(`${lang.language}: ${lang.level}`, 12);
        });
        yPosition += 10;
      }

      // Footer
      const footerY = pageHeight - 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      pdf.text('این رزومه توسط سیستم رزومه‌ساز دموان تولید شده است', pageWidth - margin, footerY, {
        align: 'right',
      });
      pdf.text(`تاریخ تولید: ${new Date().toLocaleDateString('fa-IR')}`, margin, footerY);

      // Generate filename
      const fileName = `resume-${resumeData.personal?.fullName || 'unnamed'}-${Date.now()}.pdf`;

      // Save the PDF
      pdf.save(fileName);

      return {
        success: true,
        message: 'PDF رزومه با موفقیت دانلود شد',
        fileName: fileName,
      };
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('خطا در تولید PDF: ' + error.message);
    }
  }

  // Save to localStorage for offline functionality
  saveToLocalStorage(resumeData, profilePhoto) {
    try {
      const resumeStorage = {
        data: resumeData,
        photo: profilePhoto,
        savedAt: new Date().toISOString(),
      };

      localStorage.setItem('damoon_resume_draft', JSON.stringify(resumeStorage));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  // Load from localStorage
  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('damoon_resume_draft');
      if (saved) {
        return JSON.parse(saved);
      }
      return null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  }

  // Clear localStorage
  clearLocalStorage() {
    try {
      localStorage.removeItem('damoon_resume_draft');
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Validate resume data
  validateResumeData(resumeData) {
    const errors = [];

    // Personal info validation
    if (!resumeData.personal?.email) {
      errors.push('آدرس ایمیل الزامی است');
    }

    if (!resumeData.personal?.jobTitle) {
      errors.push('عنوان شغلی الزامی است');
    }

    if (!resumeData.personal?.phone) {
      errors.push('شماره موبایل الزامی است');
    }

    // Email format validation
    if (resumeData.personal?.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(resumeData.personal.email)) {
        errors.push('فرمت ایمیل صحیح نیست');
      }
    }

    // Phone format validation
    if (resumeData.personal?.phone) {
      const phoneRegex = /^09\d{9}$/;
      if (!phoneRegex.test(resumeData.personal.phone.replace(/\s/g, ''))) {
        errors.push('فرمت شماره موبایل صحیح نیست');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Calculate completion percentage
  calculateCompletionPercentage(resumeData) {
    let completed = 0;
    let total = 0;

    // Personal information (35%)
    const personalFields = ['email', 'phone', 'jobTitle', 'province', 'address'];
    personalFields.forEach(field => {
      total += 7;
      if (resumeData.personal?.[field]) {
        completed += 7;
      }
    });

    // Retired parent section (5%)
    total += 5;
    if (
      resumeData.retiredParent &&
      (resumeData.retiredParent.parentName ||
        resumeData.retiredParent.retirementNumber ||
        resumeData.retiredParent.retiredMobile ||
        resumeData.retiredParent.workPlace ||
        resumeData.retiredParent.retirementYear ||
        resumeData.retiredParent.retirementType)
    ) {
      completed += 5;
    }

    // About section (15%)
    total += 15;
    if (resumeData.about && resumeData.about.length > 50) {
      completed += 15;
    }

    // Skills (15%)
    total += 15;
    if (resumeData.skills && resumeData.skills.length > 0) {
      completed += 15;
    }

    // Work experience (20%)
    total += 20;
    if (resumeData.workExperience && resumeData.workExperience.length > 0) {
      completed += 20;
    }

    // Education (10%)
    total += 10;
    if (resumeData.education && resumeData.education.length > 0) {
      completed += 10;
    }

    return Math.round((completed / total) * 100);
  }

  // Get quality suggestions
  getQualitySuggestions(resumeData) {
    const suggestions = [];

    if (!resumeData.personal?.jobTitle) {
      suggestions.push('عنوان شغلی خود را وارد کنید');
    }

    if (!resumeData.about || resumeData.about.length < 50) {
      suggestions.push('توضیحات بیشتری درباره خود بنویسید');
    }

    if (!resumeData.skills || resumeData.skills.length === 0) {
      suggestions.push('مهارت‌های حرفه‌ای خود را اضافه کنید');
    }

    if (!resumeData.workExperience || resumeData.workExperience.length === 0) {
      suggestions.push('سوابق شغلی خود را درج کنید');
    }

    if (!resumeData.education || resumeData.education.length === 0) {
      suggestions.push('مدارک تحصیلی خود را اضافه کنید');
    }

    if (!resumeData.languages || resumeData.languages.length === 0) {
      suggestions.push('زبان‌هایی که می‌دانید را اضافه کنید');
    }

    return suggestions;
  }
}

// Create singleton instance
const resumeAPI = new ResumeAPIService();

export default resumeAPI;
