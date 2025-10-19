import React, { useRef, useState } from 'react';
import './AdminBackupPanel.css';

export default function AdminBackupPanel() {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [backups, setBackups] = useState([
    { name: 'backup-2025-09-15.json', date: '2025-09-15' },
    { name: 'backup-2025-09-10.json', date: '2025-09-10' },
  ]);

  // Simulate export
  const handleExport = () => {
    setMessage('داده‌های سایت با موفقیت صادر شد.');
    // In real app, trigger file download
  };

  // Simulate import
  const handleImport = e => {
    const file = e.target.files[0];
    if (file) {
      setMessage(`فایل ${file.name} با موفقیت وارد شد.`);
      setBackups([{ name: file.name, date: new Date().toISOString().slice(0, 10) }, ...backups]);
    }
  };

  // Simulate restore
  const handleRestore = name => {
    setMessage(`نسخه ${name} با موفقیت بازیابی شد.`);
  };

  return (
    <div className='admin-backup-panel'>
      <h2>پشتیبان‌گیری و بازیابی</h2>
      <div className='backup-actions'>
        <button onClick={handleExport}>صدور داده‌ها</button>
        <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleImport} />
        <button onClick={() => fileInputRef.current.click()}>وارد کردن داده‌ها</button>
      </div>
      {message && <div className='backup-message'>{message}</div>}
      <div className='backup-list'>
        <h3>نسخه‌های پشتیبان</h3>
        <table className='backup-table'>
          <thead>
            <tr>
              <th>نام فایل</th>
              <th>تاریخ</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {backups.map((b, idx) => (
              <tr key={idx}>
                <td>{b.name}</td>
                <td>{b.date}</td>
                <td>
                  <button onClick={() => handleRestore(b.name)}>بازیابی</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
