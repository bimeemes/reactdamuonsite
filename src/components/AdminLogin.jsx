import React, { useState } from 'react';
import './AdminLogin.css';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simulate backend password check
  const handleLogin = e => {
    e.preventDefault();
    // Replace with backend call
    if (password === 'Admin@123') {
      setError('');
      onLogin();
      // Optionally, set session/cookie here
      sessionStorage.setItem('adminLoggedIn', 'true');
    } else {
      setError('رمز عبور اشتباه است.');
    }
  };

  return (
    <div className='admin-login-page'>
      <form className='admin-login-form' onSubmit={handleLogin}>
        <h2>ورود مدیر سایت</h2>
        <input
          type='password'
          placeholder='رمز عبور'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>ورود</button>
        {error && <span className='login-error'>{error}</span>}
      </form>
    </div>
  );
}
