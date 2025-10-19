import React, { useState } from 'react';
import './AdminDashboard.css';
import AdminNewsPanel from './AdminNewsPanel';
import AdminBannerPanel from './AdminBannerPanel';
import AdminStaticPagesPanel from './AdminStaticPagesPanel';
import AdminFileManagerPanel from './AdminFileManagerPanel';
import AdminBranchPanel from './AdminBranchPanel';
import AdminFAQPanel from './AdminFAQPanel';
import AdminFeedbackPanel from './AdminFeedbackPanel';
import AdminSiteSettingsPanel from './AdminSiteSettingsPanel';
import AdminAnalyticsPanel from './AdminAnalyticsPanel';
import AdminBackupPanel from './AdminBackupPanel';
import AdminSecurityPanel from './AdminSecurityPanel';
import AdminQuestionnairePanel from './AdminQuestionnairePanel';
import ResumeManager from './admin/ResumeManager';

const panels = [
  { key: 'news', label: 'اخبار', component: <AdminNewsPanel /> },
  { key: 'banners', label: 'بنرها/اسلایدر', component: <AdminBannerPanel /> },
  { key: 'static', label: 'صفحات ثابت', component: <AdminStaticPagesPanel /> },
  { key: 'files', label: 'فایل‌ها/تصاویر', component: <AdminFileManagerPanel /> },
  { key: 'branches', label: 'شعب/تماس', component: <AdminBranchPanel /> },
  { key: 'faq', label: 'سوالات متداول', component: <AdminFAQPanel /> },
  { key: 'feedback', label: 'بازخورد/شکایات', component: <AdminFeedbackPanel /> },
  { key: 'questionnaire', label: 'پاسخ‌های پرسشنامه', component: <AdminQuestionnairePanel /> },
  { key: 'resumes', label: 'مدیریت رزومه‌ها', component: <ResumeManager /> },
  { key: 'settings', label: 'تنظیمات سایت', component: <AdminSiteSettingsPanel /> },
  { key: 'analytics', label: 'آمار', component: <AdminAnalyticsPanel /> },
  { key: 'backup', label: 'پشتیبان‌گیری', component: <AdminBackupPanel /> },
  { key: 'security', label: 'امنیت', component: <AdminSecurityPanel /> },
];

export default function AdminDashboard() {
  const [activePanel, setActivePanel] = useState('news');

  return (
    <div className='admin-dashboard'>
      <nav className='dashboard-nav'>
        {panels.map(panel => (
          <button
            key={panel.key}
            className={`dashboard-nav-btn${activePanel === panel.key ? ' active' : ''}`}
            onClick={() => setActivePanel(panel.key)}
          >
            {panel.label}
          </button>
        ))}
      </nav>
      <div className='dashboard-panel'>{panels.find(p => p.key === activePanel)?.component}</div>
    </div>
  );
}
