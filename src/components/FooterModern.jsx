import React from 'react';
import './FooterModern.css';

const FooterModern = () => (
  <footer className='footer-modern' dir='rtl'>
    <div className='footer-modern-content'>
      <div className='footer-modern-section company'>
        <h3>شرکت بیمه مس</h3>
        <p style={{ color: '#b8c1ec' }}>
          ارائه دهنده خدمات بیمه‌ای با بیش از ۲۰ سال سابقه درخشان در صنعت بیمه کشور
        </p>
      </div>
      <div className='footer-modern-section links'>
        <h4>لینک‌های مفید</h4>
        <ul>
          <li>
            <a href='/'>خانه</a>
          </li>
          <li>
            <a href='/guide'>راهنمای بیمه گزاران</a>
          </li>
          <li>
            <a href='/systems'>سامانه‌ها</a>
          </li>
          <li>
            <a href='/about'>معرفی شرکت</a>
          </li>
          <li>
            <a href='/contact'>تماس با ما</a>
          </li>
          <li>
            <a href='/news'>اخبار</a>
          </li>
          <li>
            <a href='/blog'>بلاگ</a>
          </li>
        </ul>
      </div>
      <div className='footer-modern-section contact'>
        <h4>تماس با ما</h4>
        <p>تلفن: 57389000-021</p>
        <p>ایمیل: bimeemes@gmail.com</p>
        <div className='footer-modern-socials'>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Instagram'
          >
            <svg
              width='22'
              height='22'
              fill='none'
              stroke='#eebf63'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <rect x='2' y='2' width='20' height='20' rx='5' />
              <circle cx='12' cy='12' r='5' />
              <circle cx='18' cy='6' r='1.2' />
            </svg>
          </a>
          <a href='https://t.me' target='_blank' rel='noopener noreferrer' aria-label='Telegram'>
            <svg
              width='22'
              height='22'
              fill='none'
              stroke='#eebf63'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path d='M22 4L12 20l-4-7-7-2z' />
              <path d='M22 4L11 14' />
            </svg>
          </a>
          <a href='mailto:bimeemes@gmail.com' aria-label='Email'>
            <svg
              width='22'
              height='22'
              fill='none'
              stroke='#eebf63'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <rect x='2' y='4' width='20' height='16' rx='2' />
              <path d='M22 4L12 14 2 4' />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div className='footer-modern-bottom'>
      <span>
        © {new Date().getFullYear()} شرکت کارگزاری رسمی مستقیم برخط آتیه اندیشان دامون. کلیه حقوق
        محفوظ است.
      </span>
    </div>
  </footer>
);

export default FooterModern;
