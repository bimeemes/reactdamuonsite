import React, { useState } from 'react';
import './AdminSecurityPanel.css';

const initialLogins = [
  { date: '2025-09-15', ip: '192.168.1.10', status: 'موفق' },
  { date: '2025-09-14', ip: '192.168.1.11', status: 'ناموفق' },
];

export default function AdminSecurityPanel() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loginHistory] = useState(initialLogins);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('لطفا همه فیلدها را پر کنید.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('رمز جدید و تکرار آن یکسان نیستند.');
      return;
    }
    // Simulate password change
    setMessage('رمز عبور با موفقیت تغییر یافت.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className='admin-security-panel'>
      <h2>مدیریت امنیت</h2>
      <div className='change-password-form'>
        <h3>تغییر رمز عبور</h3>
        <input
          type='password'
          placeholder='رمز فعلی'
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='رمز جدید'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='تکرار رمز جدید'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>تغییر رمز</button>
        {message && <span className='security-message'>{message}</span>}
      </div>
      <div className='login-history-section'>
        <h3>تاریخچه ورود</h3>
        <table className='login-history-table'>
          <thead>
            <tr>
              <th>تاریخ</th>
              <th>IP</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.map((log, idx) => (
              <tr key={idx}>
                <td>{log.date}</td>
                <td>{log.ip}</td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
