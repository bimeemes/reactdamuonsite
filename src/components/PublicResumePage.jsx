import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import resumeAPI from '../services/resumeAPI';

const PublicResumePage = () => {
  const { resumeId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  const loadResume = async () => {
    try {
      setLoading(true);
      const resumeData = await resumeAPI.loadResume(resumeId);
      setResume(resumeData);
    } catch (err) {
      setError('رزومه یافت نشد');
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#f5f5f5',
        }}
        dir='rtl'
      >
        <div
          style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid #f66e20',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p style={{ color: '#666', fontSize: '1.1rem' }}>در حال بارگذاری رزومه...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#f5f5f5',
        }}
        dir='rtl'
      >
        <div
          style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            textAlign: 'center',
            maxWidth: '500px',
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
          <h2 style={{ color: '#f66e20', marginBottom: '1rem' }}>رزومه یافت نشد</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            متأسفانه رزومه مورد نظر یافت نشد یا ممکن است حذف شده باشد.
          </p>
          <button
            onClick={() => (window.location.href = '/')}
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
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    );
  }

  if (!resume) {
    return null;
  }

  const { data: resumeData, photo: profilePhoto } = resume;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
        padding: '2rem 0',
      }}
      dir='rtl'
    >
      {/* Header */}
      <div
        style={{
          background: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <img
              src='/images/logo.png'
              alt='دامون'
              style={{ height: '40px' }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span
              style={{
                display: 'none',
                color: '#f66e20',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              دامون
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => window.print()}
              style={{
                background: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
               چاپ
            </button>
            <button
              onClick={() => (window.location.href = '/resume-builder')}
              style={{
                background: '#f66e20',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
               ساخت رزومه
            </button>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '12px',
          padding: '3rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'start',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '3px solid #f66e20',
          }}
        >
          {/* Photo */}
          {profilePhoto && (
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                backgroundImage: `url(${profilePhoto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '4px solid #f66e20',
                flexShrink: 0,
              }}
            />
          )}

          {/* Basic Info */}
          <div style={{ flex: 1 }}>
            <h1
              style={{
                color: '#f66e20',
                fontSize: '2.5rem',
                margin: '0 0 1rem 0',
                fontWeight: 'bold',
              }}
            >
              {resumeData.personal?.jobTitle || 'بدون عنوان شغلی'}
            </h1>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.8rem',
                color: '#555',
                fontSize: '1.1rem',
              }}
            >
              {resumeData.personal?.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#f66e20' }}>📧</span>
                  {resumeData.personal.email}
                </div>
              )}
              {resumeData.personal?.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#f66e20' }}>📱</span>
                  {resumeData.personal.phone}
                </div>
              )}
              {resumeData.personal?.province && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#f66e20' }}>📍</span>
                  {resumeData.personal.province}
                </div>
              )}
              {resumeData.personal?.workStatus && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#f66e20' }}>💼</span>
                  {resumeData.personal.workStatus}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        {resumeData.about && (
          <div style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                color: '#f66e20',
                borderBottom: '2px solid #f66e20',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
                fontSize: '1.4rem',
              }}
            >
               درباره‌ی من
            </h3>
            <p style={{ lineHeight: '1.8', color: '#333', fontSize: '1rem' }}>{resumeData.about}</p>
          </div>
        )}

        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                color: '#f66e20',
                borderBottom: '2px solid #f66e20',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
                fontSize: '1.4rem',
              }}
            >
               مهارت‌ها
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
                    padding: '0.8rem',
                    background: '#f9f9f9',
                    borderRadius: '8px',
                    border: '1px solid #eee',
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#333' }}>{skill.skill}</span>
                  <span style={{ color: '#f66e20', fontSize: '1.2rem' }}>
                    {renderStars(skill.level)}
                  </span>
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
                borderBottom: '2px solid #f66e20',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
                fontSize: '1.4rem',
              }}
            >
               سوابق شغلی
            </h3>
            {resumeData.workExperience.map((work, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  border: '1px solid #eee',
                  borderRadius: '10px',
                  background: '#fafafa',
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
                    <h4 style={{ margin: '0', color: '#333', fontSize: '1.2rem' }}>
                      {work.position}
                    </h4>
                    <div style={{ color: '#f66e20', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {work.company}
                    </div>
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9rem', textAlign: 'left' }}>
                    {work.startDate} - {work.current ? 'تاکنون' : work.endDate}
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
                borderBottom: '2px solid #f66e20',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
                fontSize: '1.4rem',
              }}
            >
              🎓 تحصیلات
            </h3>
            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '1rem',
                  padding: '1.5rem',
                  border: '1px solid #eee',
                  borderRadius: '10px',
                  background: '#fafafa',
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}
                >
                  <div>
                    <h4 style={{ margin: '0', color: '#333', fontSize: '1.2rem' }}>
                      {edu.degree} {edu.field}
                    </h4>
                    <div style={{ color: '#f66e20', fontSize: '1.1rem' }}>{edu.university}</div>
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
                borderBottom: '2px solid #f66e20',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
                fontSize: '1.4rem',
              }}
            >
               زبان‌ها
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
                    padding: '0.8rem',
                    background: '#f9f9f9',
                    borderRadius: '8px',
                    border: '1px solid #eee',
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#333' }}>{lang.language}</span>
                  <span style={{ color: '#f66e20', fontSize: '1.2rem' }}>
                    {renderStars(lang.level)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '1rem',
            borderTop: '2px solid #eee',
            textAlign: 'center',
            color: '#666',
            fontSize: '0.9rem',
          }}
        >
          <p style={{ margin: '0.5rem 0' }}>
            این رزومه با استفاده از سیستم ساخت رزومه شرکت بیمه دامون تهیه شده است.
          </p>
          <p style={{ margin: '0.5rem 0', fontWeight: 'bold', color: '#f66e20' }}>
            damuon.com/resume/{resumeData.uniqueUrl}
          </p>
          <p style={{ margin: '0.5rem 0', fontSize: '0.8rem' }}>
            آخرین بروزرسانی: {new Date(resume.updatedAt).toLocaleDateString('fa-IR')}
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #f66e20, #ff8a50)',
          color: 'white',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 30px rgba(246, 110, 32, 0.3)',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>
          آیا شما هم به دنبال کار در دامون هستید؟
        </h3>
        <p style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem' }}>
          رزومه خود را بسازید و در فرصت‌های شغلی دامون شرکت کنید
        </p>
        <button
          onClick={() => (window.location.href = '/resume-builder')}
          style={{
            background: 'white',
            color: '#f66e20',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
           ساخت رزومه رایگان
        </button>
      </div>
    </div>
  );
};

export default PublicResumePage;
