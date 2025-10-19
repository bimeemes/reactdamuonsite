import React, { useState, useRef, useEffect } from 'react';
import resumeAPI from '../services/resumeAPI';
import ResumePreview from './ResumePreview';
import MeditationAnimation from './MeditationAnimation';
import '../styles/ResumeBuilder.css';

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef(null);

  // Iran provinces and their cities mapping
  const provinceCities = {
    alborz: ['کرج', 'ساوجبلاغ', 'نظرآباد', 'اشتهارد', 'هشتگرد', 'طالقان', 'تنکابن کرج'],
    ardabil: ['اردبیل', 'پارس‌آباد', 'خلخال', 'مشگین‌شهر', 'گرمی', 'بیله‌سوار', 'نمین', 'نیر'],
    'azerbaijan-east': [
      'تبریز',
      'مراغه',
      'میانه',
      'شبستر',
      'مرند',
      'اهر',
      'بناب',
      'سراب',
      'هریس',
      'ملکان',
      'آذرشهر',
      'هشترود',
    ],
    'azerbaijan-west': [
      'ارومیه',
      'خوی',
      'مهاباد',
      'میاندوآب',
      'بوکان',
      'سلماس',
      'نقده',
      'تکاب',
      'شاهین‌دژ',
      'پیرانشهر',
      'چالدران',
    ],
    bushehr: [
      'بوشهر',
      'برازجان',
      'خورموج',
      'گناوه',
      'دیلم',
      'جم',
      'عسلویه',
      'کنگان',
      'دشتی',
      'تنگستان',
    ],
    'chaharmahal-bakhtiari': [
      'شهرکرد',
      'بروجن',
      'فارسان',
      'لردگان',
      'اردل',
      'کوهرنگ',
      'سامان',
      'فلارد',
    ],
    fars: [
      'شیراز',
      'مرودشت',
      'کازرون',
      'جهرم',
      'فسا',
      'آباده',
      'لارستان',
      'نی‌ریز',
      'سپیدان',
      'استهبان',
      'داراب',
      'فیروزآباد',
      'گراش',
      'خرم‌بید',
      'پاسارگاد',
    ],
    gilan: [
      'رشت',
      'انزلی',
      'لاهیجان',
      'آستارا',
      'تالش',
      'رودبار',
      'صومعه‌سرا',
      'فومن',
      'شفت',
      'ماسال',
      'رودسر',
      'لنگرود',
      'آستانه اشرفیه',
    ],
    golestan: [
      'گرگان',
      'علی‌آباد کتول',
      'آق‌قلا',
      'بندر گز',
      'ترکمن',
      'رامیان',
      'آزادشهر',
      'کردکوی',
      'بندر ترکمن',
      'مراوه‌تپه',
      'گمیش‌تپه',
    ],
    hamadan: [
      'همدان',
      'ملایر',
      'نهاوند',
      'تویسرکان',
      'اسدآباد',
      'رزن',
      'کبودرآهنگ',
      'بهار',
      'فامنین',
    ],
    hormozgan: [
      'بندرعباس',
      'بندر لنگه',
      'میناب',
      'قشم',
      'کیش',
      'جاسک',
      'رودان',
      'بستک',
      'حاجی‌آباد',
      'پارسیان',
      'سیریک',
    ],
    ilam: ['ایلام', 'دهلران', 'آبدانان', 'مهران', 'ایوان', 'ملکشاهی', 'شیروان و چرداول', 'دره‌شهر'],
    isfahan: [
      'اصفهان',
      'کاشان',
      'خمینی‌شهر',
      'نجف‌آباد',
      'شاهین‌شهر',
      'فولادشهر',
      'لنجان',
      'مبارکه',
      'خوانسار',
      'گلپایگان',
      'نطنز',
      'اردستان',
      'نائین',
      'تیران و کرون',
      'بویین و میاندشت',
      'سمیرم',
      'فریدن',
      'فریدونشهر',
      'دهاقان',
    ],
    kerman: [
      'کرمان',
      'رفسنجان',
      'سیرجان',
      'بم',
      'راور',
      'کوهبنان',
      'بافت',
      'کهنوج',
      'زرند',
      'بردسیر',
      'انار',
      'رابر',
      'فهرج',
      'عنبرآباد',
    ],
    kermanshah: [
      'کرمانشاه',
      'اسلام‌آباد غرب',
      'کنگاور',
      'سنقر',
      'صحنه',
      'هرسین',
      'گیلان غرب',
      'پاوه',
      'جوانرود',
      'قصر شیرین',
      'سرپل ذهاب',
      'روانسر',
      'ثلاث باباجانی',
      'دالاهو',
    ],
    'khorasan-north': [
      'بجنورد',
      'اسفراین',
      'شیروان',
      'آشخانه',
      'گرمه',
      'جاجرم',
      'فاروج',
      'مانه و سملقان',
    ],
    'khorasan-razavi': [
      'مشهد',
      'نیشابور',
      'سبزوار',
      'تربت حیدریه',
      'کاشمر',
      'گناباد',
      'تربت جام',
      'تایباد',
      'قوچان',
      'چناران',
      'درگز',
      'کلات',
      'خلیل‌آباد',
      'مه ولات',
      'فریمان',
      'رشتخوار',
      'بردسکن',
      'فیروزه',
    ],
    'khorasan-south': [
      'بیرجند',
      'قائن',
      'فردوس',
      'طبس',
      'نهبندان',
      'سرایان',
      'بشرویه',
      'زیرکوه',
      'خوسف',
      'درمیان',
      'سربیشه',
    ],
    khuzestan: [
      'اهواز',
      'آبادان',
      'خرمشهر',
      'دزفول',
      'اندیمشک',
      'بهبهان',
      'مسجد سلیمان',
      'شوشتر',
      'ایذه',
      'گتوند',
      'شوش',
      'رامهرمز',
      'باغ‌ملک',
      'هندیجان',
      'لالی',
      'هویزه',
    ],
    'kohgiluyeh-boyer-ahmad': [
      'یاسوج',
      'گچساران',
      'دوگنبدان',
      'سی‌سخت',
      'چرام',
      'بویراحمد',
      'بهمئی',
      'مارگون',
    ],
    kurdistan: [
      'سنندج',
      'سقز',
      'مریوان',
      'بانه',
      'قروه',
      'بیجار',
      'کامیاران',
      'دیواندره',
      'دهگلان',
      'سروآباد',
    ],
    lorestan: [
      'خرم‌آباد',
      'بروجرد',
      'دورود',
      'الیگودرز',
      'ازنا',
      'نورآباد',
      'پلدختر',
      'کوهدشت',
      'سلسله',
      'چگنی',
      'دلفان',
    ],
    markazi: [
      'اراک',
      'ساوه',
      'خمین',
      'محلات',
      'دلیجان',
      'تفرش',
      'شازند',
      'زرندیه',
      'کمیجان',
      'آشتیان',
      'فراهان',
    ],
    mazandaran: [
      'ساری',
      'بابل',
      'آمل',
      'قائم‌شهر',
      'بابلسر',
      'تنکابن',
      'نکا',
      'نوشهر',
      'چالوس',
      'رامسر',
      'نور',
      'فریدونکنار',
      'محمودآباد',
      'جویبار',
      'سوادکوه',
      'کلاردشت',
      'عباس‌آباد',
      'گلوگاه',
      'مینودشت',
      'بهشهر',
    ],
    qazvin: ['قزوین', 'الوند', 'تاکستان', 'بوئین‌زهرا', 'آبیک', 'البرز'],
    qom: ['قم'],
    semnan: ['سمنان', 'شاهرود', 'دامغان', 'گرمسار', 'سرخه', 'مهدی‌شهر', 'ایوانکی', 'آرادان'],
    'sistan-baluchestan': [
      'زاهدان',
      'زابل',
      'چابهار',
      'ایرانشهر',
      'سراوان',
      'خاش',
      'نیک‌شهر',
      'کنارک',
      'سرباز',
      'بمپور',
      'میرجاوه',
      'دلگان',
      'فنوج',
      'قصرقند',
      'راسک',
      'سیب و سوران',
    ],
    tehran: [
      'تهران',
      'ری',
      'شمیرانات',
      'ورامین',
      'پاکدشت',
      'شهریار',
      'رباط کریم',
      'بهارستان',
      'نظرآباد',
      'فیروزکوه',
      'ملارد',
      'قدس',
      'اسلام‌شهر',
      'پردیس',
      'دماوند',
    ],
    yazd: ['یزد', 'میبد', 'اردکان', 'ابرکوه', 'مهریز', 'بافق', 'تفت', 'صدوق', 'بهاباد', 'خاتم'],
    zanjan: ['زنجان', 'ابهر', 'خدابنده', 'خرمدره', 'طارم', 'ماهنشان', 'ایجرود', 'سلطانیه'],
  };

  // Handle province change and reset city
  const handleProvinceChange = provinceValue => {
    updateResumeData('personal', 'province', provinceValue);
    updateResumeData('personal', 'city', ''); // Reset city when province changes
  };

  const [resumeData, setResumeData] = useState({
    personal: {
      jobTitle: '',
      workStatus: '',
      email: 'bimeemes@gmail.com',
      phone: '',
      province: '',
      city: '',
      address: '',
      maritalStatus: '',
      birthYear: '',
      gender: '',
      militaryService: '',
    },
    retiredParent: {
      parentName: '',
      retirementNumber: '',
      retiredMobile: '',
      workPlace: '',
      retirementYear: '',
      retirementType: '', // تامین اجتماعی or کارمندی
    },
    about: '',
    skills: [],
    workExperience: [],
    education: [],
    languages: [],
    jobPreferences: {
      provinces: [],
      jobCategory: '',
      seniority: '',
      contractTypes: [],
      minSalary: 'توافقی',
      benefits: [],
    },
    attachedResume: null,
    isSearchable: true,
    uniqueUrl: `damoon-${Date.now()}`,
  });

  const [resumeQuality, setResumeQuality] = useState(25);

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = resumeAPI.loadFromLocalStorage();
    if (savedDraft) {
      // Ensure retiredParent section exists in saved data
      const updatedData = {
        ...savedDraft.data,
        retiredParent: {
          parentName: '',
          retirementNumber: '',
          retiredMobile: '',
          workPlace: '',
          retirementYear: '',
          retirementType: '',
          ...savedDraft.data.retiredParent,
        },
      };
      setResumeData(updatedData);
      setProfilePhoto(savedDraft.photo);
      setTimeout(() => {
        calculateResumeQuality();
      }, 100);
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const autoSave = setTimeout(() => {
      resumeAPI.saveToLocalStorage(resumeData, profilePhoto);
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [resumeData, profilePhoto]);

  const handlePhotoUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateResumeData = (section, field, value) => {
    try {
      setResumeData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
      setTimeout(() => {
        calculateResumeQuality();
      }, 0);
    } catch (error) {
      console.error('Error updating resume data:', error);
    }
  };

  const calculateResumeQuality = () => {
    const quality = resumeAPI.calculateCompletionPercentage(resumeData);
    setResumeQuality(quality);
  };

  // Save resume to server
  const saveResume = async () => {
    setIsLoading(true);
    setSaveStatus('در حال ذخیره...');

    try {
      const validation = resumeAPI.validateResumeData(resumeData);
      if (!validation.isValid) {
        setSaveStatus(`خطا: ${validation.errors.join('، ')}`);
        setIsLoading(false);
        return;
      }

      const result = await resumeAPI.saveResume(resumeData, profilePhoto);
      setSaveStatus('رزومه با موفقیت ذخیره شد');
      setShowSuccessModal(true);

      // Update unique URL if it was generated by server
      if (result.resumeId !== resumeData.uniqueUrl) {
        setResumeData(prev => ({ ...prev, uniqueUrl: result.resumeId }));
      }

      // Clear localStorage draft
      resumeAPI.clearLocalStorage();
    } catch (error) {
      setSaveStatus(`خطا در ذخیره: ${error.message}`);
    }

    setIsLoading(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Generate PDF
  const generatePDF = async () => {
    setIsLoading(true);
    setSaveStatus('در حال تولید PDF...');

    try {
      const result = await resumeAPI.generatePDF(resumeData, profilePhoto);
      setSaveStatus('PDF آماده دانلود است');
      // Here you would trigger the download
    } catch (error) {
      setSaveStatus(`خطا در تولید PDF: ${error.message}`);
    }

    setIsLoading(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Print Resume
  const printResume = () => {
    // Create a new window with print-friendly styles
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
            ${resumeData.personal?.province ? `<div><strong>استان:</strong> ${resumeData.personal.province}</div>` : ''}
            ${resumeData.personal?.address ? `<div><strong>آدرس:</strong> ${resumeData.personal.address}</div>` : ''}
            ${resumeData.personal?.maritalStatus ? `<div><strong>وضعیت تاهل:</strong> ${resumeData.personal.maritalStatus}</div>` : ''}
            ${resumeData.personal?.workStatus ? `<div><strong>وضعیت اشتغال:</strong> ${resumeData.personal.workStatus}</div>` : ''}
          </div>
        </div>
        
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

  const addWorkExperience = () => {
    setResumeData(prev => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          id: Date.now(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: '',
          field: '',
          university: '',
          startYear: '',
          endYear: '',
          current: false,
        },
      ],
    }));
  };

  const addLanguage = () => {
    setResumeData(prev => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          id: Date.now(),
          language: '',
          level: '',
        },
      ],
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: Date.now(),
          skill: '',
          level: '',
        },
      ],
    }));
  };

  const benefits = [
    'امکان ترفیع سمت',
    'بیمه',
    'دوره‌های آموزشی',
    'ساعت کاری منعطف',
    'سرویس رفت‌و‌آمد',
    'غذا به عهده شرکت',
  ];

  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: '2rem 0',
        fontFamily: 'Vazir, Arial, sans-serif',
      }}
      dir='rtl'
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '2rem',
          padding: '0 1rem',
        }}
      >
        {/* Sidebar - Resume Summary */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            height: 'fit-content',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: '2rem',
          }}
        >
          {/* Photo Upload */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              borderBottom: '1px solid #eee',
              paddingBottom: '1.5rem',
            }}
          >
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '3px dashed #f66e20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                cursor: 'pointer',
                backgroundImage: profilePhoto ? `url(${profilePhoto})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: profilePhoto ? 'transparent' : '#f66e20',
              }}
            >
              {!profilePhoto && '📷 آپلود عکس'}
            </div>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Basic Info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#333', marginBottom: '1rem' }}>اطلاعات کلی</h4>

            <div style={{ marginBottom: '0.8rem' }}>
              <strong>عنوان شغلی:</strong>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                {resumeData.personal.jobTitle || '+ ویرایش عنوان شغلی'}
              </div>
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <strong>وضعیت اشتغال:</strong>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                {resumeData.personal.workStatus || '+ ویرایش وضعیت اشتغال'}
              </div>
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <strong>آخرین شرکت:</strong>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                {resumeData.workExperience[0]?.company || '+ اضافه‌کردن سابقه‌کار'}
              </div>
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <strong>آخرین مدرک تحصیلی:</strong>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                {resumeData.education[0]?.degree || '+ اضافه‌کردن تحصیلات'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={saveResume}
              disabled={isLoading}
              style={{
                background: '#f66e20',
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? '⏳' : '💾'} ذخیره رزومه
            </button>

            <button
              onClick={() => setShowPreview(true)}
              style={{
                background: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              👁️ مشاهده رزومه
            </button>

            <button
              onClick={generatePDF}
              disabled={isLoading}
              style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? '⏳' : '📄'} دریافت PDF
            </button>

            <button
              onClick={printResume}
              style={{
                background: '#9C27B0',
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              🖨️ چاپ رزومه
            </button>
          </div>

          {/* Save Status */}
          {saveStatus && (
            <div
              style={{
                marginTop: '1rem',
                padding: '0.8rem',
                borderRadius: '6px',
                backgroundColor: saveStatus.includes('خطا') ? '#ffebee' : '#e8f5e8',
                color: saveStatus.includes('خطا') ? '#c62828' : '#2e7d32',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            >
              {saveStatus}
            </div>
          )}

          {/* Resume Quality */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#f9f9f9',
              borderRadius: '8px',
            }}
          >
            <h5 style={{ marginBottom: '0.5rem' }}>کیفیت رزومه‌ی شما</h5>
            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#eee',
                borderRadius: '4px',
                marginBottom: '0.5rem',
              }}
            >
              <div
                style={{
                  width: `${resumeQuality}%`,
                  height: '100%',
                  backgroundColor:
                    resumeQuality > 70 ? '#4CAF50' : resumeQuality > 40 ? '#FF9800' : '#f44336',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>{resumeQuality}% تکمیل شده</div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          {/* Section Navigation */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {[
                { key: 'personal', label: '👤 اطلاعات فردی', icon: '👤' },
                { key: 'education', label: '🎓 تحصیلات', icon: '🎓' },
                { key: 'work', label: '� سوابق شغلی', icon: '�' },
                { key: 'languages', label: '🌐 زبان‌ها', icon: '🌐' },
                { key: 'skills', label: '🔧 مهارت‌ها', icon: '🔧' },
                { key: 'about', label: '📝 درباره‌ی من', icon: '📝' },
                { key: 'preferences', label: '⚙️ ترجیحات شغلی', icon: '⚙️' },
                { key: 'retiredParent', label: '👴 فرزند بازنشسته', icon: '👴' },
              ].map(section => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  style={{
                    padding: '0.8rem 1.2rem',
                    border: 'none',
                    background: activeSection === section.key ? '#f66e20' : '#f0f0f0',
                    color: activeSection === section.key ? 'white' : '#333',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem',
                  }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              minHeight: '600px',
            }}
          >
            {/* Personal Information Section */}
            {activeSection === 'personal' && (
              <div>
                <h2
                  style={{
                    color: '#f66e20',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #f66e20',
                    paddingBottom: '0.5rem',
                  }}
                >
                  👤 اطلاعات فردی
                </h2>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      آدرس ایمیل
                    </label>
                    <input
                      type='email'
                      value={resumeData.personal.email}
                      onChange={e => updateResumeData('personal', 'email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      شماره موبایل
                    </label>
                    <input
                      type='tel'
                      placeholder='وارد کنید'
                      value={resumeData.personal.phone}
                      onChange={e => updateResumeData('personal', 'phone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      عنوان شغلی
                    </label>
                    <input
                      type='text'
                      placeholder='مثال: کارشناس بیمه'
                      value={resumeData.personal.jobTitle}
                      onChange={e => updateResumeData('personal', 'jobTitle', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      وضعیت اشتغال
                    </label>
                    <select
                      value={resumeData.personal.workStatus}
                      onChange={e => updateResumeData('personal', 'workStatus', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    >
                      <option value=''>مشخص کنید</option>
                      <option value='employed'>شاغل</option>
                      <option value='unemployed'>بیکار</option>
                      <option value='student'>دانشجو</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      استان محل سکونت
                    </label>
                    <select
                      value={resumeData.personal.province}
                      onChange={e => handleProvinceChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    >
                      <option value=''>مشخص کنید</option>
                      <option value='alborz'>البرز</option>
                      <option value='ardabil'>اردبیل</option>
                      <option value='azerbaijan-east'>آذربایجان شرقی</option>
                      <option value='azerbaijan-west'>آذربایجان غربی</option>
                      <option value='bushehr'>بوشهر</option>
                      <option value='chaharmahal-bakhtiari'>چهارمحال و بختیاری</option>
                      <option value='fars'>فارس</option>
                      <option value='gilan'>گیلان</option>
                      <option value='golestan'>گلستان</option>
                      <option value='hamadan'>همدان</option>
                      <option value='hormozgan'>هرمزگان</option>
                      <option value='ilam'>ایلام</option>
                      <option value='isfahan'>اصفهان</option>
                      <option value='kerman'>کرمان</option>
                      <option value='kermanshah'>کرمانشاه</option>
                      <option value='khorasan-north'>خراسان شمالی</option>
                      <option value='khorasan-razavi'>خراسان رضوی</option>
                      <option value='khorasan-south'>خراسان جنوبی</option>
                      <option value='khuzestan'>خوزستان</option>
                      <option value='kohgiluyeh-boyer-ahmad'>کهگیلویه و بویراحمد</option>
                      <option value='kurdistan'>کردستان</option>
                      <option value='lorestan'>لرستان</option>
                      <option value='markazi'>مرکزی</option>
                      <option value='mazandaran'>مازندران</option>
                      <option value='qazvin'>قزوین</option>
                      <option value='qom'>قم</option>
                      <option value='semnan'>سمنان</option>
                      <option value='sistan-baluchestan'>سیستان و بلوچستان</option>
                      <option value='tehran'>تهران</option>
                      <option value='yazd'>یزد</option>
                      <option value='zanjan'>زنجان</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      شهر محل سکونت
                    </label>
                    <select
                      value={resumeData.personal.city}
                      onChange={e => updateResumeData('personal', 'city', e.target.value)}
                      disabled={!resumeData.personal.province}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        backgroundColor: !resumeData.personal.province ? '#f5f5f5' : 'white',
                      }}
                    >
                      <option value=''>
                        {!resumeData.personal.province
                          ? 'ابتدا استان را انتخاب کنید'
                          : 'شهر خود را انتخاب کنید'}
                      </option>
                      {resumeData.personal.province &&
                        provinceCities[resumeData.personal.province]?.map(city => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      آدرس محل سکونت
                    </label>
                    <input
                      type='text'
                      placeholder='وارد کنید'
                      value={resumeData.personal.address}
                      onChange={e => updateResumeData('personal', 'address', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      وضعیت تاهل
                    </label>
                    <select
                      value={resumeData.personal.maritalStatus}
                      onChange={e => updateResumeData('personal', 'maritalStatus', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    >
                      <option value=''>مشخص کنید</option>
                      <option value='single'>مجرد</option>
                      <option value='married'>متاهل</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      سال تولد
                    </label>
                    <select
                      value={resumeData.personal.birthYear}
                      onChange={e => updateResumeData('personal', 'birthYear', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    >
                      <option value=''>مشخص کنید</option>
                      {Array.from({ length: 50 }, (_, i) => {
                        const year = 1400 - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      جنسیت
                    </label>
                    <select
                      value={resumeData.personal.gender}
                      onChange={e => updateResumeData('personal', 'gender', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    >
                      <option value=''>مشخص کنید</option>
                      <option value='male'>مرد</option>
                      <option value='female'>زن</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      وضعیت خدمت سربازی
                    </label>
                    <select
                      value={resumeData.personal.militaryService}
                      onChange={e =>
                        updateResumeData('personal', 'militaryService', e.target.value)
                      }
                      disabled={resumeData.personal.gender !== 'male'}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        backgroundColor:
                          resumeData.personal.gender !== 'male' ? '#f5f5f5' : 'white',
                      }}
                    >
                      <option value=''>
                        {resumeData.personal.gender !== 'male'
                          ? 'ابتدا جنسیت را مشخص کنید'
                          : 'مشخص کنید'}
                      </option>
                      <option value='completed'>پایان خدمت</option>
                      <option value='exempt'>معافیت</option>
                      <option value='ongoing'>در حال انجام</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Retired Parent Section */}
            {activeSection === 'retiredParent' && (
              <div>
                <h2
                  style={{
                    color: '#f66e20',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #f66e20',
                    paddingBottom: '0.5rem',
                  }}
                >
                  👴 فرزند بازنشسته
                </h2>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      نام پدر/مادر
                    </label>
                    <input
                      type='text'
                      placeholder='نام پدر یا مادر بازنشسته'
                      value={resumeData.retiredParent.parentName}
                      onChange={e =>
                        updateResumeData('retiredParent', 'parentName', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      شماره بازنشستگی
                    </label>
                    <input
                      type='text'
                      placeholder='شماره شناسنامه یا کد ملی بازنشسته'
                      value={resumeData.retiredParent.retirementNumber}
                      onChange={e =>
                        updateResumeData('retiredParent', 'retirementNumber', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      شماره موبایل بازنشسته
                    </label>
                    <input
                      type='tel'
                      placeholder='شماره تماس پدر/مادر بازنشسته'
                      value={resumeData.retiredParent.retiredMobile}
                      onChange={e =>
                        updateResumeData('retiredParent', 'retiredMobile', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      محل خدمت
                    </label>
                    <input
                      type='text'
                      placeholder='محل کار قبل از بازنشستگی'
                      value={resumeData.retiredParent.workPlace}
                      onChange={e => updateResumeData('retiredParent', 'workPlace', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      سال بازنشستگی
                    </label>
                    <select
                      value={resumeData.retiredParent.retirementYear}
                      onChange={e =>
                        updateResumeData('retiredParent', 'retirementYear', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    >
                      <option value=''>مشخص کنید</option>
                      {Array.from({ length: 50 }, (_, i) => {
                        const year = 1403 - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      نوع بازنشستگی
                    </label>
                    <select
                      value={resumeData.retiredParent.retirementType}
                      onChange={e =>
                        updateResumeData('retiredParent', 'retirementType', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    >
                      <option value=''>مشخص کنید</option>
                      <option value='social_security'>بازنشسته تامین اجتماعی</option>
                      <option value='civil_service'>بازنشسته کارمندی</option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    backgroundColor: '#f0f8ff',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#f66e20' }}>📋 اطلاعات مفید</h4>
                  <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    این بخش برای متقاضیانی است که والدین آن‌ها بازنشسته هستند و از مزایای بیمه‌ای
                    استفاده می‌کنند. تکمیل این اطلاعات برای برخی موقعیت‌های شغلی در بیمه دامون ضروری
                    است.
                  </p>
                </div>
              </div>
            )}

            {/* About Me Section */}
            {activeSection === 'about' && (
              <div>
                <h2
                  style={{
                    color: '#f66e20',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #f66e20',
                    paddingBottom: '0.5rem',
                  }}
                >
                  📝 درباره‌ی من
                </h2>

                <textarea
                  placeholder='متنی درباره‌ی ویژگی‌های شخصیتی و حرفه‌ای خود بنویسید.'
                  value={resumeData.about}
                  onChange={e => setResumeData(prev => ({ ...prev, about: e.target.value }))}
                  style={{
                    width: '100%',
                    height: '200px',
                    padding: '1rem',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical',
                  }}
                />

                <div style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
                  💡 نکته: این بخش به کارفرمایان کمک می‌کند تا شما را بهتر بشناسند.
                </div>
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div>
                <h2
                  style={{
                    color: '#f66e20',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #f66e20',
                    paddingBottom: '0.5rem',
                  }}
                >
                  🔧 مهارت‌های حرفه‌ای
                </h2>

                {resumeData.skills.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '3rem',
                      color: '#666',
                      background: '#f9f9f9',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                    }}
                  >
                    هنوز مهارت‌های حرفه‌ای خود را وارد نکرده‌اید.
                  </div>
                ) : (
                  <div style={{ marginBottom: '1rem' }}>
                    {resumeData.skills.map((skill, index) => (
                      <div
                        key={skill.id}
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          marginBottom: '1rem',
                          padding: '1rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                        }}
                      >
                        <input
                          type='text'
                          placeholder='مهارت'
                          value={skill.skill}
                          onChange={e => {
                            const newSkills = [...resumeData.skills];
                            newSkills[index].skill = e.target.value;
                            setResumeData(prev => ({ ...prev, skills: newSkills }));
                          }}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                          }}
                        />
                        <select
                          value={skill.level}
                          onChange={e => {
                            const newSkills = [...resumeData.skills];
                            newSkills[index].level = e.target.value;
                            setResumeData(prev => ({ ...prev, skills: newSkills }));
                          }}
                          style={{
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                          }}
                        >
                          <option value=''>سطح</option>
                          <option value='beginner'>مبتدی</option>
                          <option value='intermediate'>متوسط</option>
                          <option value='advanced'>پیشرفته</option>
                          <option value='expert'>خبره</option>
                        </select>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={addSkill}
                  style={{
                    background: '#f66e20',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ➕ افزودن مهارت
                </button>
              </div>
            )}

            {/* Work Experience Section */}
            {activeSection === 'work' && (
              <div>
                <h2
                  style={{
                    color: '#f66e20',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #f66e20',
                    paddingBottom: '0.5rem',
                  }}
                >
                  💼 سوابق شغلی
                </h2>

                {resumeData.workExperience.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '3rem',
                      color: '#666',
                      background: '#f9f9f9',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                    }}
                  >
                    شما هنوز سوابق‌کاری خود را درج نکرده‌اید.
                  </div>
                ) : (
                  <div style={{ marginBottom: '1rem' }}>
                    {resumeData.workExperience.map((work, index) => (
                      <div
                        key={work.id}
                        style={{
                          padding: '1.5rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          marginBottom: '1rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                            marginBottom: '1rem',
                          }}
                        >
                          <input
                            type='text'
                            placeholder='نام شرکت'
                            value={work.company}
                            onChange={e => {
                              const newWork = [...resumeData.workExperience];
                              newWork[index].company = e.target.value;
                              setResumeData(prev => ({ ...prev, workExperience: newWork }));
                            }}
                            style={{
                              padding: '0.8rem',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                            }}
                          />
                          <input
                            type='text'
                            placeholder='سمت شغلی'
                            value={work.position}
                            onChange={e => {
                              const newWork = [...resumeData.workExperience];
                              newWork[index].position = e.target.value;
                              setResumeData(prev => ({ ...prev, workExperience: newWork }));
                            }}
                            style={{
                              padding: '0.8rem',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                            }}
                          />
                        </div>
                        <textarea
                          placeholder='توضیحات کار'
                          value={work.description}
                          onChange={e => {
                            const newWork = [...resumeData.workExperience];
                            newWork[index].description = e.target.value;
                            setResumeData(prev => ({ ...prev, workExperience: newWork }));
                          }}
                          style={{
                            width: '100%',
                            height: '100px',
                            padding: '0.8rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            resize: 'vertical',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={addWorkExperience}
                  style={{
                    background: '#f66e20',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ➕ ایجاد سابقه‌کاری
                </button>
              </div>
            )}

            {/* Education Section */}
            {activeSection === 'education' && (
              <div>
                <h2
                  style={{
                    color: '#f66e20',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #f66e20',
                    paddingBottom: '0.5rem',
                  }}
                >
                  🎓 سوابق تحصیلی
                </h2>

                {resumeData.education.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '3rem',
                      color: '#666',
                      background: '#f9f9f9',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                    }}
                  >
                    شما هنوز سوابق تحصیلی اضافه نکرده‌اید.
                  </div>
                ) : (
                  <div style={{ marginBottom: '1rem' }}>
                    {resumeData.education.map((edu, index) => (
                      <div
                        key={edu.id}
                        style={{
                          padding: '1.5rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          marginBottom: '1rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                            marginBottom: '1rem',
                          }}
                        >
                          <input
                            type='text'
                            placeholder='مقطع تحصیلی'
                            value={edu.degree}
                            onChange={e => {
                              const newEdu = [...resumeData.education];
                              newEdu[index].degree = e.target.value;
                              setResumeData(prev => ({ ...prev, education: newEdu }));
                            }}
                            style={{
                              padding: '0.8rem',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                            }}
                          />
                          <input
                            type='text'
                            placeholder='رشته تحصیلی'
                            value={edu.field}
                            onChange={e => {
                              const newEdu = [...resumeData.education];
                              newEdu[index].field = e.target.value;
                              setResumeData(prev => ({ ...prev, education: newEdu }));
                            }}
                            style={{
                              padding: '0.8rem',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                            }}
                          />
                        </div>
                        <input
                          type='text'
                          placeholder='نام دانشگاه'
                          value={edu.university}
                          onChange={e => {
                            const newEdu = [...resumeData.education];
                            newEdu[index].university = e.target.value;
                            setResumeData(prev => ({ ...prev, education: newEdu }));
                          }}
                          style={{
                            width: '100%',
                            padding: '0.8rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={addEducation}
                  style={{
                    background: '#f66e20',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ➕ ایجاد سابقه تحصیلی
                </button>
              </div>
            )}

            {/* Languages Section */}
            {activeSection === 'languages' && (
              <div>
                <h2
                  style={{
                    color: '#f66e20',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #f66e20',
                    paddingBottom: '0.5rem',
                  }}
                >
                  🌐 زبان‌ها
                </h2>

                {resumeData.languages.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '3rem',
                      color: '#666',
                      background: '#f9f9f9',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                    }}
                  >
                    شما هنوز زبانی اضافه نکرده‌اید.
                  </div>
                ) : (
                  <div style={{ marginBottom: '1rem' }}>
                    {resumeData.languages.map((lang, index) => (
                      <div
                        key={lang.id}
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          marginBottom: '1rem',
                          padding: '1rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                        }}
                      >
                        <input
                          type='text'
                          placeholder='زبان'
                          value={lang.language}
                          onChange={e => {
                            const newLangs = [...resumeData.languages];
                            newLangs[index].language = e.target.value;
                            setResumeData(prev => ({ ...prev, languages: newLangs }));
                          }}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                          }}
                        />
                        <select
                          value={lang.level}
                          onChange={e => {
                            const newLangs = [...resumeData.languages];
                            newLangs[index].level = e.target.value;
                            setResumeData(prev => ({ ...prev, languages: newLangs }));
                          }}
                          style={{
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                          }}
                        >
                          <option value=''>سطح</option>
                          <option value='beginner'>مبتدی</option>
                          <option value='intermediate'>متوسط</option>
                          <option value='advanced'>پیشرفته</option>
                          <option value='native'>زبان مادری</option>
                        </select>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={addLanguage}
                  style={{
                    background: '#f66e20',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ➕ افزودن زبان
                </button>
              </div>
            )}

            {/* Job Preferences Section */}
            {activeSection === 'preferences' && (
              <div>
                <h2
                  style={{
                    color: '#f66e20',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #f66e20',
                    paddingBottom: '0.5rem',
                  }}
                >
                  ⚙️ ترجیحات شغلی
                </h2>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      دسته‌بندی شغلی و زمینه‌کاری
                    </label>
                    <select
                      value={resumeData.jobPreferences.jobCategory}
                      onChange={e =>
                        updateResumeData('jobPreferences', 'jobCategory', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    >
                      <option value=''>انتخاب کنید</option>
                      <option value='insurance'>بیمه</option>
                      <option value='finance'>مالی</option>
                      <option value='sales'>فروش</option>
                      <option value='marketing'>بازاریابی</option>
                      <option value='it'>فناوری اطلاعات</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      سطح ارشدیت در زمینه فعالیت
                    </label>
                    <select
                      value={resumeData.jobPreferences.seniority}
                      onChange={e =>
                        updateResumeData('jobPreferences', 'seniority', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    >
                      <option value=''>انتخاب کنید</option>
                      <option value='junior'>کارشناس</option>
                      <option value='mid'>کارشناس ارشد</option>
                      <option value='senior'>سرپرست</option>
                      <option value='manager'>مدیر</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      حداقل حقوق درخواستی
                    </label>
                    <input
                      type='text'
                      value={resumeData.jobPreferences.minSalary}
                      onChange={e =>
                        updateResumeData('jobPreferences', 'minSalary', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>
                      مزایای شغلی مورد نظر
                    </label>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '0.5rem',
                      }}
                    >
                      {benefits.map(benefit => (
                        <label
                          key={benefit}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <input
                            type='checkbox'
                            checked={resumeData.jobPreferences.benefits.includes(benefit)}
                            onChange={e => {
                              const newBenefits = e.target.checked
                                ? [...resumeData.jobPreferences.benefits, benefit]
                                : resumeData.jobPreferences.benefits.filter(b => b !== benefit);
                              updateResumeData('jobPreferences', 'benefits', newBenefits);
                            }}
                          />
                          <span>{benefit}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resume File Upload & Settings */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginTop: '1rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ color: '#f66e20', marginBottom: '1rem' }}>📎 رزومه‌ی ضمیمه</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              اگر فایل رزومه‌ی جداگانه دارید، می‌توانید آنرا به پروفایل خود ضمیمه کنید.
            </p>

            <input
              type='file'
              accept='.pdf,.doc,.docx'
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px dashed #f66e20',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}
            />
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '2rem' }}>
              فایل PDF یا WORD حداکثر حجم ۸ مگابایت
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}
              >
                <input
                  type='checkbox'
                  checked={resumeData.isSearchable}
                  onChange={e =>
                    setResumeData(prev => ({ ...prev, isSearchable: e.target.checked }))
                  }
                />
                قابل جستجو برای کارفرمایان
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                آدرس رزومه‌ی شما
              </label>
              <div
                style={{
                  background: '#f9f9f9',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                }}
              >
                damuon.com/resume/{resumeData.uniqueUrl}
              </div>
              <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                این آدرس یکتای رزومه‌ی شماست می‌توانید رزومه‌ی خود را با استفاده از این آدرس به
                اشتراک بگذارید.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview Modal */}
      {showPreview && (
        <ResumePreview
          resumeData={resumeData}
          profilePhoto={profilePhoto}
          onClose={() => setShowPreview(false)}
        />
      )}

      {/* Success Modal with Meditation Animation */}
      {showSuccessModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            fontFamily: 'Vazir, Arial, sans-serif',
          }}
          dir='rtl'
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '3rem',
              maxWidth: '500px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Meditation Animation */}
            <MeditationAnimation size={200} showText={false} style={{ marginBottom: '2rem' }} />

            {/* Success Message */}
            <h2
              style={{
                color: '#4CAF50',
                marginBottom: '1rem',
                fontSize: '1.8rem',
              }}
            >
              ✅ رزومه با موفقیت ذخیره شد
            </h2>

            <p
              style={{
                color: '#666',
                marginBottom: '2rem',
                lineHeight: '1.6',
              }}
            >
              رزومه‌ی شما با موفقیت در سیستم ثبت شد و برای بررسی ارسال گردید.
              <br />
              آرامش داشته باشید، به زودی با شما تماس خواهیم گرفت.
            </p>

            {/* Resume URL */}
            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '2rem',
                border: '2px dashed #4CAF50',
              }}
            >
              <p
                style={{
                  margin: '0 0 0.5rem 0',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                آدرس رزومه‌ی شما:
              </p>
              <p
                style={{
                  margin: 0,
                  color: '#4CAF50',
                  fontSize: '0.9rem',
                  wordBreak: 'break-all',
                }}
              >
                damuon.com/resume/{resumeData.uniqueUrl}
              </p>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={() => setShowPreview(true)}
                style={{
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                }}
              >
                👁️ مشاهده رزومه
              </button>

              <button
                onClick={() => setShowSuccessModal(false)}
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                }}
              >
                ✨ فوق‌العاده!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
