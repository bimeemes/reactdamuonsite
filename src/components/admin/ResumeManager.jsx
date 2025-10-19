import React, { useState, useEffect } from 'react';
import './ResumeManager.css';

const ResumeManager = () => {
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedResume, setSelectedResume] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [stats, setStats] = useState({});

  // Load resumes from API
  useEffect(() => {
    loadResumes();
    loadStats();
  }, []);

  // Filter resumes based on search and status
  useEffect(() => {
    let filtered = resumes;

    if (searchTerm) {
      filtered = filtered.filter(
        resume =>
          resume.personalInfo.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resume.personalInfo.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resume.personalInfo.phone?.includes(searchTerm) ||
          (resume.workExperience &&
            resume.workExperience.some(
              work =>
                work.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                work.company?.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(resume => resume.status === filterStatus);
    }

    setFilteredResumes(filtered);
  }, [resumes, searchTerm, filterStatus]);

  const loadResumes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/resumes');
      const data = await response.json();
      setResumes(data);
      setFilteredResumes(data);
    } catch (error) {
      console.error('خطا در بارگذاری رزومه‌ها:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('خطا در بارگذاری آمار:', error);
    }
  };

  const updateResumeStatus = async (resumeId, newStatus, notes = '') => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/resumes/${resumeId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          managerNotes: notes,
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'مدیر منابع انسانی',
        }),
      });

      if (response.ok) {
        loadResumes();
        loadStats();
      }
    } catch (error) {
      console.error('خطا در به‌روزرسانی وضعیت:', error);
    }
  };

  const exportResume = async resumeId => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/resumes/${resumeId}/export`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${resumeId}.json`;
      a.click();
    } catch (error) {
      console.error('خطا در دانلود رزومه:', error);
    }
  };

  const formatDate = dateString => {
    if (!dateString) {
      return 'نامشخص';
    }
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const getStatusBadge = status => {
    const statusMap = {
      pending: { label: 'در انتظار بررسی', className: 'status-pending' },
      reviewed: { label: 'بررسی شده', className: 'status-reviewed' },
      shortlisted: { label: 'انتخاب شده', className: 'status-shortlisted' },
      interviewed: { label: 'مصاحبه شده', className: 'status-interviewed' },
      hired: { label: 'استخدام شده', className: 'status-hired' },
      rejected: { label: 'رد شده', className: 'status-rejected' },
    };

    const statusInfo = statusMap[status] || { label: status, className: 'status-default' };
    return <span className={`status-badge ${statusInfo.className}`}>{statusInfo.label}</span>;
  };

  if (loading) {
    return (
      <div className='resume-manager'>
        <div className='loading'>در حال بارگذاری رزومه‌ها...</div>
      </div>
    );
  }

  return (
    <div className='resume-manager' dir='rtl'>
      <div className='manager-header'>
        <h1>مدیریت رزومه‌ها</h1>
        <div className='stats-grid'>
          <div className='stat-card'>
            <h3>{stats.totalResumes || 0}</h3>
            <p>کل رزومه‌ها</p>
          </div>
          <div className='stat-card'>
            <h3>{stats.activeResumes || 0}</h3>
            <p>در انتظار بررسی</p>
          </div>
          <div className='stat-card'>
            <h3>{filteredResumes.length}</h3>
            <p>رزومه‌های فیلتر شده</p>
          </div>
        </div>
      </div>

      <div className='manager-controls'>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='جستجو در نام، ایمیل، تلفن یا سمت...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='filter-bar'>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value='all'>همه وضعیت‌ها</option>
            <option value='pending'>در انتظار بررسی</option>
            <option value='reviewed'>بررسی شده</option>
            <option value='shortlisted'>انتخاب شده</option>
            <option value='interviewed'>مصاحبه شده</option>
            <option value='hired'>استخدام شده</option>
            <option value='rejected'>رد شده</option>
          </select>
        </div>
      </div>

      <div className='resumes-table'>
        <table>
          <thead>
            <tr>
              <th>نام</th>
              <th>ایمیل</th>
              <th>تلفن</th>
              <th>سمت مورد نظر</th>
              <th>تاریخ ارسال</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredResumes.map(resume => (
              <tr key={resume.id}>
                <td>{resume.personalInfo.fullName || 'نامشخص'}</td>
                <td>{resume.personalInfo.email || 'نامشخص'}</td>
                <td>{resume.personalInfo.phone || 'نامشخص'}</td>
                <td>{resume.jobPreferences?.preferredPosition || 'نامشخص'}</td>
                <td>{formatDate(resume.createdAt)}</td>
                <td>{getStatusBadge(resume.status || 'pending')}</td>
                <td>
                  <div className='action-buttons'>
                    <button
                      onClick={() => {
                        setSelectedResume(resume);
                        setShowDetails(true);
                      }}
                      className='btn-view'
                    >
                      مشاهده
                    </button>
                    <button onClick={() => exportResume(resume.id)} className='btn-download'>
                      دانلود
                    </button>
                    <select
                      onChange={e => {
                        if (e.target.value) {
                          updateResumeStatus(resume.id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className='status-select'
                    >
                      <option value=''>تغییر وضعیت</option>
                      <option value='reviewed'>بررسی شده</option>
                      <option value='shortlisted'>انتخاب شده</option>
                      <option value='interviewed'>مصاحبه شده</option>
                      <option value='hired'>استخدام شده</option>
                      <option value='rejected'>رد شده</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetails && selectedResume && (
        <div className='resume-modal'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>جزئیات رزومه: {selectedResume.personalInfo.fullName}</h2>
              <button onClick={() => setShowDetails(false)} className='close-btn'>
                ×
              </button>
            </div>

            <div className='modal-body'>
              <div className='resume-section'>
                <h3>اطلاعات شخصی</h3>
                <p>
                  <strong>نام:</strong> {selectedResume.personalInfo.fullName}
                </p>
                <p>
                  <strong>ایمیل:</strong> {selectedResume.personalInfo.email}
                </p>
                <p>
                  <strong>تلفن:</strong> {selectedResume.personalInfo.phone}
                </p>
                <p>
                  <strong>آدرس:</strong> {selectedResume.personalInfo.address}
                </p>
              </div>

              {selectedResume.workExperience && selectedResume.workExperience.length > 0 && (
                <div className='resume-section'>
                  <h3>سوابق کاری</h3>
                  {selectedResume.workExperience.map((work, index) => (
                    <div key={index} className='work-item'>
                      <p>
                        <strong>سمت:</strong> {work.position}
                      </p>
                      <p>
                        <strong>شرکت:</strong> {work.company}
                      </p>
                      <p>
                        <strong>مدت:</strong> {work.startDate} - {work.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {selectedResume.skills && selectedResume.skills.length > 0 && (
                <div className='resume-section'>
                  <h3>مهارت‌ها</h3>
                  <div className='skills-list'>
                    {selectedResume.skills.map((skill, index) => (
                      <span key={index} className='skill-tag'>
                        {skill.skill} ({skill.level})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className='modal-actions'>
                <button onClick={() => exportResume(selectedResume.id)} className='btn-primary'>
                  دانلود JSON
                </button>
                <a
                  href={`/resume/${selectedResume.id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-secondary'
                >
                  مشاهده عمومی
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeManager;
