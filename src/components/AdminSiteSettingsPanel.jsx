import React, { useState } from 'react';
import './AdminSiteSettingsPanel.css';

const initialSettings = {
  siteName: 'بیمه دامون',
  logo: 'https://via.placeholder.com/120x80',
  primaryColor: '#ff9800',
  secondaryColor: '#2196f3',
  email: 'mail.damuon.com \n bimeemes@gmail.com',
  notifications: true,
  integrations: '',
};

export default function AdminSiteSettingsPanel() {
  const [settings, setSettings] = useState(initialSettings);
  const [logoPreview, setLogoPreview] = useState(settings.logo);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setSettings(s => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleLogoChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setSettings(s => ({ ...s, logo: ev.target.result }));
        setLogoPreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Simulate save
    alert('تنظیمات با موفقیت ذخیره شد.');
  };

  return (
    <div className='admin-site-settings-panel'>
      <h2>تنظیمات و برندینگ سایت</h2>
      <div className='settings-form'>
        <label>
          نام سایت:
          <input name='siteName' value={settings.siteName} onChange={handleChange} />
        </label>
        <label>
          لوگو:
          <input type='file' accept='image/*' onChange={handleLogoChange} />
        </label>
        {logoPreview && <img src={logoPreview} alt='لوگو' className='logo-preview' />}
        <label>
          رنگ اصلی:
          <input
            name='primaryColor'
            type='color'
            value={settings.primaryColor}
            onChange={handleChange}
          />
        </label>
        <label>
          رنگ ثانویه:
          <input
            name='secondaryColor'
            type='color'
            value={settings.secondaryColor}
            onChange={handleChange}
          />
        </label>
        <label>
          ایمیل:
          <input name='email' value={settings.email} onChange={handleChange} />
        </label>
        <label>
          اعلان‌ها:
          <input
            type='checkbox'
            name='notifications'
            checked={settings.notifications}
            onChange={handleChange}
          />{' '}
          فعال
        </label>
        <label>
          یکپارچه‌سازی‌ها:
          <input
            name='integrations'
            value={settings.integrations}
            onChange={handleChange}
            placeholder='مثال: Google Analytics'
          />
        </label>
        <button onClick={handleSave}>ذخیره تنظیمات</button>
      </div>
    </div>
  );
}
