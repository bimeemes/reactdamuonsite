import React from 'react';
import resumeAPI from '../services/resumeAPI';

const ResumePreview = ({ resumeData, profilePhoto, onClose }) => {
  const formatDate = date => {
    return date || 'تاکنون';
  };

  const renderStars = level => {
    const levels = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      expert: 4,
      native: 5,
    };
    const stars = levels[level] || 0;
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  // Generate PDF function using html2canvas for better Persian text support
  const generatePDF = async () => {
    try {
      // Import required libraries
      const { jsPDF } = await import('jspdf');
      const html2canvas = await import('html2canvas');

      // Create a temporary div with the resume content
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '794px'; // A4 width in pixels at 96 DPI
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.padding = '40px';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.direction = 'rtl';
      tempDiv.style.lineHeight = '1.6';

      // Build the HTML content
      tempDiv.innerHTML = `
        <div style="text-align: center; background: #f66e20; color: white; padding: 20px; margin: -40px -40px 30px -40px;">
          <h1 style="margin: 0; font-size: 24px;">${resumeData.personal?.fullName || 'نام کامل'}</h1>
          <h2 style="margin: 5px 0 0 0; font-size: 18px; font-weight: normal;">${resumeData.personal?.jobTitle || 'عنوان شغلی'}</h2>
        </div>
        
        ${
          resumeData.personal?.email || resumeData.personal?.phone || resumeData.personal?.province
            ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #f66e20; border-bottom: 2px solid #f66e20; padding-bottom: 5px; margin-bottom: 15px;">اطلاعات تماس</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            ${resumeData.personal?.email ? `<div><strong>ایمیل:</strong> ${resumeData.personal.email}</div>` : ''}
            ${resumeData.personal?.phone ? `<div><strong>تلفن:</strong> ${resumeData.personal.phone}</div>` : ''}
            ${resumeData.personal?.province ? `<div><strong>استان:</strong> ${resumeData.personal.province}${resumeData.personal?.city ? ` - ${resumeData.personal.city}` : ''}</div>` : ''}
            ${resumeData.personal?.address ? `<div><strong>آدرس:</strong> ${resumeData.personal.address}</div>` : ''}
            ${resumeData.personal?.maritalStatus ? `<div><strong>وضعیت تاهل:</strong> ${resumeData.personal.maritalStatus}</div>` : ''}
            ${resumeData.personal?.workStatus ? `<div><strong>وضعیت اشتغال:</strong> ${resumeData.personal.workStatus}</div>` : ''}
          </div>
        </div>
        `
            : ''
        }
        
        ${
          resumeData.retiredParent &&
          (resumeData.retiredParent.parentName ||
            resumeData.retiredParent.retirementNumber ||
            resumeData.retiredParent.retiredMobile ||
            resumeData.retiredParent.workPlace ||
            resumeData.retiredParent.retirementYear ||
            resumeData.retiredParent.retirementType)
            ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #f66e20; border-bottom: 2px solid #f66e20; padding-bottom: 5px; margin-bottom: 15px;">فرزند بازنشسته</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            ${resumeData.retiredParent.parentName ? `<div><strong>نام پدر/مادر:</strong> ${resumeData.retiredParent.parentName}</div>` : ''}
            ${resumeData.retiredParent.retirementNumber ? `<div><strong>شماره بازنشستگی:</strong> ${resumeData.retiredParent.retirementNumber}</div>` : ''}
            ${resumeData.retiredParent.retiredMobile ? `<div><strong>شماره موبایل بازنشسته:</strong> ${resumeData.retiredParent.retiredMobile}</div>` : ''}
            ${resumeData.retiredParent.workPlace ? `<div><strong>محل خدمت:</strong> ${resumeData.retiredParent.workPlace}</div>` : ''}
            ${resumeData.retiredParent.retirementYear ? `<div><strong>سال بازنشستگی:</strong> ${resumeData.retiredParent.retirementYear}</div>` : ''}
            ${resumeData.retiredParent.retirementType ? `<div><strong>نوع بازنشستگی:</strong> ${resumeData.retiredParent.retirementType === 'social_security' ? 'تامین اجتماعی' : 'کارمندی'}</div>` : ''}
          </div>
        </div>
        `
            : ''
        }
        
        ${
          resumeData.about
            ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #f66e20; border-bottom: 2px solid #f66e20; padding-bottom: 5px; margin-bottom: 15px;">درباره من</h3>
          <p style="line-height: 1.8;">${resumeData.about}</p>
        </div>
        `
            : ''
        }
        
        ${
          resumeData.workExperience && resumeData.workExperience.length > 0
            ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #f66e20; border-bottom: 2px solid #f66e20; padding-bottom: 5px; margin-bottom: 15px;">سوابق شغلی</h3>
          ${resumeData.workExperience
            .map(
              work => `
            <div style="margin-bottom: 15px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
              <div style="font-weight: bold; color: #333; margin-bottom: 5px;">${work.position}</div>
              <div style="color: #f66e20; margin-bottom: 5px; font-weight: bold;">${work.company}</div>
              ${work.startDate || work.endDate ? `<div style="color: #666; margin-bottom: 5px; font-size: 14px;">${work.startDate || ''} - ${work.current ? 'تاکنون' : work.endDate || ''}</div>` : ''}
              ${work.description ? `<div style="font-size: 14px; line-height: 1.5; color: #555;">${work.description}</div>` : ''}
            </div>
          `
            )
            .join('')}
        </div>
        `
            : ''
        }
        
        ${
          resumeData.education && resumeData.education.length > 0
            ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #f66e20; border-bottom: 2px solid #f66e20; padding-bottom: 5px; margin-bottom: 15px;">سوابق تحصیلی</h3>
          ${resumeData.education
            .map(
              edu => `
            <div style="margin-bottom: 15px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
              <div style="font-weight: bold; color: #333; margin-bottom: 5px;">${edu.degree} - ${edu.field}</div>
              <div style="color: #f66e20; margin-bottom: 5px;">${edu.university}</div>
              ${edu.graduationYear || edu.startYear || edu.endYear ? `<div style="color: #666; font-size: 14px;">${edu.startYear || ''} - ${edu.current ? 'تاکنون' : edu.endYear || edu.graduationYear || ''}</div>` : ''}
            </div>
          `
            )
            .join('')}
        </div>
        `
            : ''
        }
        
        ${
          resumeData.skills && resumeData.skills.length > 0
            ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #f66e20; border-bottom: 2px solid #f66e20; padding-bottom: 5px; margin-bottom: 15px;">مهارت‌ها</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
            ${resumeData.skills
              .map(
                skill => `
              <div style="padding: 8px 12px; background: #e8f4f8; border-radius: 15px; text-align: center; font-size: 14px;">
                ${skill.skill} (${skill.level})
              </div>
            `
              )
              .join('')}
          </div>
        </div>
        `
            : ''
        }
        
        ${
          resumeData.languages && resumeData.languages.length > 0
            ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #f66e20; border-bottom: 2px solid #f66e20; padding-bottom: 5px; margin-bottom: 15px;">زبان‌ها</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
            ${resumeData.languages
              .map(
                lang => `
              <div style="padding: 8px 12px; background: #e8f4f8; border-radius: 15px; text-align: center; font-size: 14px;">
                <strong>${lang.language}:</strong> ${lang.level}
              </div>
            `
              )
              .join('')}
          </div>
        </div>
        `
            : ''
        }
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
          این رزومه توسط سیستم رزومه‌ساز دموان تولید شده است<br>
          ${new Date().toLocaleDateString('fa-IR')} - damuon.com
        </div>
      `;

      // Add to document temporarily
      document.body.appendChild(tempDiv);

      // Convert to canvas
      const canvas = await html2canvas.default(tempDiv, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Create PDF
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Calculate image dimensions to fit page
      const imgWidth = pageWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      if (imgHeight <= pageHeight - 20) {
        // Fits on one page
        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      } else {
        // Split across multiple pages
        let remainingHeight = imgHeight;
        let yPosition = 0;
        let pageNumber = 0;

        while (remainingHeight > 0) {
          if (pageNumber > 0) {
            doc.addPage();
          }

          const currentPageHeight = Math.min(remainingHeight, pageHeight - 20);

          // Create a cropped canvas for this page
          const cropCanvas = document.createElement('canvas');
          const cropCtx = cropCanvas.getContext('2d');

          cropCanvas.width = canvas.width;
          cropCanvas.height = (currentPageHeight * canvas.width) / imgWidth;

          cropCtx.drawImage(
            canvas,
            0,
            (yPosition * canvas.width) / imgWidth,
            canvas.width,
            cropCanvas.height,
            0,
            0,
            canvas.width,
            cropCanvas.height
          );

          const cropImgData = cropCanvas.toDataURL('image/png');
          doc.addImage(cropImgData, 'PNG', 10, 10, imgWidth, currentPageHeight);

          remainingHeight -= currentPageHeight;
          yPosition += currentPageHeight;
          pageNumber++;
        }
      }

      // Download the PDF
      const fileName = `Resume_${resumeData.personal?.fullName?.replace(/[^\w\s]/gi, '') || 'Unknown'}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

      alert('PDF تولید و دانلود شد! متن فارسی به درستی حفظ شده است.');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert(`خطا در تولید PDF: ${error.message}`);
    }
  };

  // Print function
  const printResume = () => {
    const printWindow = window.open('', '_blank');

    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>رزومه - ${resumeData.personal?.fullName || 'نامشخص'}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Vazir', 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            direction: rtl;
            padding: 20mm;
          }
          
          .header {
            background: #f66e20;
            color: white;
            padding: 20px;
            margin: -20mm -20mm 20px -20mm;
            text-align: center;
          }
          
          .header h1 {
            font-size: 28px;
            margin-bottom: 5px;
          }
          
          .header h2 {
            font-size: 18px;
            font-weight: normal;
          }
          
          .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          
          .section-title {
            color: #f66e20;
            font-size: 18px;
            font-weight: bold;
            border-bottom: 2px solid #f66e20;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          
          .contact-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 20px;
          }
          
          .work-item, .education-item {
            margin-bottom: 15px;
            padding: 10px;
            background: #f9f9f9;
            border-radius: 5px;
          }
          
          .work-title, .education-title {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
          }
          
          .work-company, .education-university {
            color: #666;
            margin-bottom: 5px;
          }
          
          .work-description {
            font-size: 14px;
            line-height: 1.5;
          }
          
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
          }
          
          .skill-item {
            padding: 8px 12px;
            background: #e8f4f8;
            border-radius: 15px;
            text-align: center;
            font-size: 14px;
          }
          
          .languages-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
          }
          
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          
          @media print {
            body { margin: 0; padding: 15mm; }
            .header { margin: -15mm -15mm 20px -15mm; }
            .section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${resumeData.personal?.fullName || 'نام نامشخص'}</h1>
          <h2>${resumeData.personal?.jobTitle || 'عنوان شغلی'}</h2>
        </div>
        
        <div class="section">
          <div class="section-title">اطلاعات تماس</div>
          <div class="contact-info">
            ${resumeData.personal?.email ? `<div><strong>ایمیل:</strong> ${resumeData.personal.email}</div>` : ''}
            ${resumeData.personal?.phone ? `<div><strong>تلفن:</strong> ${resumeData.personal.phone}</div>` : ''}
            ${resumeData.personal?.province ? `<div><strong>استان:</strong> ${resumeData.personal.province}${resumeData.personal?.city ? ` - ${resumeData.personal.city}` : ''}</div>` : ''}
            ${resumeData.personal?.address ? `<div><strong>آدرس:</strong> ${resumeData.personal.address}</div>` : ''}
            ${resumeData.personal?.maritalStatus ? `<div><strong>وضعیت تاهل:</strong> ${resumeData.personal.maritalStatus}</div>` : ''}
            ${resumeData.personal?.workStatus ? `<div><strong>وضعیت اشتغال:</strong> ${resumeData.personal.workStatus}</div>` : ''}
          </div>
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
        <div class="section">
          <div class="section-title">فرزند بازنشسته</div>
          <div class="contact-info">
            ${resumeData.retiredParent.parentName ? `<div><strong>نام پدر/مادر:</strong> ${resumeData.retiredParent.parentName}</div>` : ''}
            ${resumeData.retiredParent.retirementNumber ? `<div><strong>شماره بازنشستگی:</strong> ${resumeData.retiredParent.retirementNumber}</div>` : ''}
            ${resumeData.retiredParent.retiredMobile ? `<div><strong>شماره موبایل بازنشسته:</strong> ${resumeData.retiredParent.retiredMobile}</div>` : ''}
            ${resumeData.retiredParent.workPlace ? `<div><strong>محل خدمت:</strong> ${resumeData.retiredParent.workPlace}</div>` : ''}
            ${resumeData.retiredParent.retirementYear ? `<div><strong>سال بازنشستگی:</strong> ${resumeData.retiredParent.retirementYear}</div>` : ''}
            ${resumeData.retiredParent.retirementType ? `<div><strong>نوع بازنشستگی:</strong> ${resumeData.retiredParent.retirementType === 'social_security' ? 'تامین اجتماعی' : 'کارمندی'}</div>` : ''}
          </div>
        </div>
        `
            : ''
        }
        
        ${
          resumeData.about
            ? `
        <div class="section">
          <div class="section-title">درباره من</div>
          <p>${resumeData.about}</p>
        </div>
        `
            : ''
        }
        
        ${
          resumeData.workExperience && resumeData.workExperience.length > 0
            ? `
        <div class="section">
          <div class="section-title">سوابق شغلی</div>
          ${resumeData.workExperience
            .map(
              work => `
            <div class="work-item">
              <div class="work-title">${work.position}</div>
              <div class="work-company">${work.company}</div>
              ${work.startDate || work.endDate ? `<div class="work-dates">${work.startDate || ''} - ${work.endDate || 'در حال حاضر'}</div>` : ''}
              ${work.description ? `<div class="work-description">${work.description}</div>` : ''}
            </div>
          `
            )
            .join('')}
        </div>
        `
            : ''
        }
        
        ${
          resumeData.education && resumeData.education.length > 0
            ? `
        <div class="section">
          <div class="section-title">سوابق تحصیلی</div>
          ${resumeData.education
            .map(
              edu => `
            <div class="education-item">
              <div class="education-title">${edu.degree} - ${edu.field}</div>
              <div class="education-university">${edu.university}</div>
              ${edu.graduationYear ? `<div>سال فارغ‌التحصیلی: ${edu.graduationYear}</div>` : ''}
            </div>
          `
            )
            .join('')}
        </div>
        `
            : ''
        }
        
        ${
          resumeData.skills && resumeData.skills.length > 0
            ? `
        <div class="section">
          <div class="section-title">مهارت‌ها</div>
          <div class="skills-grid">
            ${resumeData.skills
              .map(
                skill => `
              <div class="skill-item">${skill.skill} (${skill.level})</div>
            `
              )
              .join('')}
          </div>
        </div>
        `
            : ''
        }
        
        ${
          resumeData.languages && resumeData.languages.length > 0
            ? `
        <div class="section">
          <div class="section-title">زبان‌ها</div>
          <div class="languages-list">
            ${resumeData.languages
              .map(
                lang => `
              <div><strong>${lang.language}:</strong> ${lang.level}</div>
            `
              )
              .join('')}
          </div>
        </div>
        `
            : ''
        }
        
        <div class="footer">
          این رزومه توسط سیستم رزومه‌ساز دموان تولید شده است - ${new Date().toLocaleDateString('fa-IR')}
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem',
      }}
      dir='rtl'
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {/* Header Controls */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: '#f66e20',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <h2 style={{ margin: 0 }}>پیش‌نمایش رزومه</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={generatePDF}
              style={{
                background: 'white',
                color: '#f66e20',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              📄 PDF
            </button>
            <button
              onClick={printResume}
              style={{
                background: 'white',
                color: '#f66e20',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              🖨️ چاپ
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              ✕ بستن
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div style={{ padding: '2rem' }}>
          {/* Header Section */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'start',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid #f66e20',
            }}
          >
            {/* Photo */}
            {profilePhoto && (
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundImage: `url(${profilePhoto})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '3px solid #f66e20',
                }}
              />
            )}

            {/* Basic Info */}
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  color: '#f66e20',
                  fontSize: '2rem',
                  margin: '0 0 0.5rem 0',
                  fontWeight: 'bold',
                }}
              >
                {resumeData.personal?.jobTitle || 'عنوان شغلی'}
              </h1>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  color: '#666',
                }}
              >
                {resumeData.personal?.email && <div>📧 {resumeData.personal.email}</div>}
                {resumeData.personal?.phone && <div>📱 {resumeData.personal.phone}</div>}
                {resumeData.personal?.province && (
                  <div>
                    📍 {resumeData.personal.province}
                    {resumeData.personal?.city ? ` - ${resumeData.personal.city}` : ''}
                  </div>
                )}
                {resumeData.personal?.workStatus && <div>💼 {resumeData.personal.workStatus}</div>}
              </div>
            </div>
          </div>

          {/* Retired Parent Section */}
          {resumeData.retiredParent &&
            (resumeData.retiredParent.parentName ||
              resumeData.retiredParent.retirementNumber ||
              resumeData.retiredParent.retiredMobile ||
              resumeData.retiredParent.workPlace ||
              resumeData.retiredParent.retirementYear ||
              resumeData.retiredParent.retirementType) && (
              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    color: '#f66e20',
                    borderBottom: '1px solid #f66e20',
                    paddingBottom: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                   فرزند بازنشسته
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {resumeData.retiredParent.parentName && (
                    <div style={{ padding: '0.8rem', background: '#f9f9f9', borderRadius: '6px' }}>
                      <strong>نام پدر/مادر:</strong> {resumeData.retiredParent.parentName}
                    </div>
                  )}
                  {resumeData.retiredParent.retirementNumber && (
                    <div style={{ padding: '0.8rem', background: '#f9f9f9', borderRadius: '6px' }}>
                      <strong>شماره بازنشستگی:</strong> {resumeData.retiredParent.retirementNumber}
                    </div>
                  )}
                  {resumeData.retiredParent.retiredMobile && (
                    <div style={{ padding: '0.8rem', background: '#f9f9f9', borderRadius: '6px' }}>
                      <strong>شماره موبایل بازنشسته:</strong>{' '}
                      {resumeData.retiredParent.retiredMobile}
                    </div>
                  )}
                  {resumeData.retiredParent.workPlace && (
                    <div style={{ padding: '0.8rem', background: '#f9f9f9', borderRadius: '6px' }}>
                      <strong>محل خدمت:</strong> {resumeData.retiredParent.workPlace}
                    </div>
                  )}
                  {resumeData.retiredParent.retirementYear && (
                    <div style={{ padding: '0.8rem', background: '#f9f9f9', borderRadius: '6px' }}>
                      <strong>سال بازنشستگی:</strong> {resumeData.retiredParent.retirementYear}
                    </div>
                  )}
                  {resumeData.retiredParent.retirementType && (
                    <div style={{ padding: '0.8rem', background: '#f9f9f9', borderRadius: '6px' }}>
                      <strong>نوع بازنشستگی:</strong>{' '}
                      {resumeData.retiredParent.retirementType === 'social_security'
                        ? 'تامین اجتماعی'
                        : 'کارمندی'}
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* About Section */}
          {resumeData.about && (
            <div style={{ marginBottom: '2rem' }}>
              <h3
                style={{
                  color: '#f66e20',
                  borderBottom: '1px solid #f66e20',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                 درباره‌ی من
              </h3>
              <p style={{ lineHeight: '1.8', color: '#333' }}>{resumeData.about}</p>
            </div>
          )}

          {/* Skills Section */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3
                style={{
                  color: '#f66e20',
                  borderBottom: '1px solid #f66e20',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                 مهارت‌ها
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                }}
              >
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem',
                      background: '#f9f9f9',
                      borderRadius: '6px',
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>{skill.skill}</span>
                    <span style={{ color: '#f66e20' }}>{renderStars(skill.level)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience Section */}
          {resumeData.workExperience && resumeData.workExperience.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3
                style={{
                  color: '#f66e20',
                  borderBottom: '1px solid #f66e20',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                 سوابق شغلی
              </h3>
              {resumeData.workExperience.map((work, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <div>
                      <h4 style={{ margin: '0', color: '#333' }}>{work.position}</h4>
                      <div style={{ color: '#f66e20', fontWeight: 'bold' }}>{work.company}</div>
                    </div>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                      {formatDate(work.startDate)} -{' '}
                      {work.current ? 'تاکنون' : formatDate(work.endDate)}
                    </div>
                  </div>
                  {work.description && (
                    <p style={{ margin: '0.5rem 0 0 0', lineHeight: '1.6', color: '#666' }}>
                      {work.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3
                style={{
                  color: '#f66e20',
                  borderBottom: '1px solid #f66e20',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                 تحصیلات
              </h3>
              {resumeData.education.map((edu, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <h4 style={{ margin: '0', color: '#333' }}>
                        {edu.degree} {edu.field}
                      </h4>
                      <div style={{ color: '#f66e20' }}>{edu.university}</div>
                    </div>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                      {edu.startYear} - {edu.current ? 'تاکنون' : edu.endYear}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages Section */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3
                style={{
                  color: '#f66e20',
                  borderBottom: '1px solid #f66e20',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                 زبان‌ها
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem',
                }}
              >
                {resumeData.languages.map((lang, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem',
                      background: '#f9f9f9',
                      borderRadius: '6px',
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>{lang.language}</span>
                    <span style={{ color: '#f66e20' }}>{renderStars(lang.level)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Job Preferences */}
          {resumeData.jobPreferences && (
            <div style={{ marginBottom: '2rem' }}>
              <h3
                style={{
                  color: '#f66e20',
                  borderBottom: '1px solid #f66e20',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                 ترجیحات شغلی
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {resumeData.jobPreferences.jobCategory && (
                  <div>
                    <strong>زمینه‌کاری:</strong> {resumeData.jobPreferences.jobCategory}
                  </div>
                )}
                {resumeData.jobPreferences.seniority && (
                  <div>
                    <strong>سطح ارشدیت:</strong> {resumeData.jobPreferences.seniority}
                  </div>
                )}
                {resumeData.jobPreferences.minSalary && (
                  <div>
                    <strong>حقوق درخواستی:</strong> {resumeData.jobPreferences.minSalary}
                  </div>
                )}
                {resumeData.jobPreferences.benefits &&
                  resumeData.jobPreferences.benefits.length > 0 && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <strong>مزایای مورد نظر:</strong>{' '}
                      {resumeData.jobPreferences.benefits.join('، ')}
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: '2rem',
              paddingTop: '1rem',
              borderTop: '1px solid #eee',
              textAlign: 'center',
              color: '#666',
              fontSize: '0.9rem',
            }}
          >
            این رزومه با استفاده از سیستم ساخت رزومه شرکت بیمه دامون تهیه شده است.
            <br />
            damuon.com/resume/{resumeData.uniqueUrl}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
