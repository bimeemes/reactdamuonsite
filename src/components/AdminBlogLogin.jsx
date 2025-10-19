import React, { useState } from 'react';
import './AdminBlogLogin.css';

const ADMIN_PASSWORD = 'damoon123'; // Change this to a secure password!

const AdminBlogLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('blogAdmin', 'true');
      onLogin();
    } else {
      setError('رمز عبور اشتباه است');
    }
  };

  return (
    <div className='admin-blog-login-container'>
      <form className='admin-blog-login-form' onSubmit={handleSubmit}>
        <h2>ورود مدیر بلاگ</h2>
        <input
          type='password'
          placeholder='رمز عبور'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>ورود</button>
        {error && <div className='admin-blog-login-error'>{error}</div>}
      </form>
    </div>
  );
};

export default AdminBlogLogin;
