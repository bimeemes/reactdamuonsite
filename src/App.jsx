import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
//import BlogAdmin from './components/BlogAdmin';
import Guide from './components/Guide';
import Systems from './components/Systems';
import About from './components/About';
import Contact from './components/Contact';
import News from './components/News';
import Blog from './components/Blog';
import BlogAdmin from './components/BlogAdmin';
import AdminBlogLogin from './components/AdminBlogLogin';
import Testimonials from './components/Testimonials';
import DecorationController from './components/DecorationController';
import './App.css';
import Header from './components/Header';
import FooterModern from './components/FooterModern';
import SeoDefaults from './components/SeoDefaults';
import { useLocation } from 'react-router-dom';

function App() {
  // Admin login state
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
      setAdminLoggedIn(true);
    }
  }, []);

  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
    sessionStorage.setItem('adminLoggedIn', 'true');
  };

  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Refs for each section
  const homeRef = React.useRef(null);
  const guideRef = React.useRef(null);
  const systemsRef = React.useRef(null);
  const aboutRef = React.useRef(null);
  const contactRef = React.useRef(null);
  const newsRef = React.useRef(null);
  const blogRef = React.useRef(null);
  const testimonialsRef = React.useRef(null);

  // Search functionality
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = query => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const searchableContent = [
      {
        title: 'سامانه‌های آنلاین',
        ref: systemsRef,
        keywords: ['سامانه', 'بیمس', 'عمر', 'حادثه', 'سیناد', 'آنلاین'],
      },
      { title: 'خانه', ref: homeRef, keywords: ['بیمه', 'خدمات', 'دامون', 'کارگزاری', 'حمایت'] },
      {
        title: 'راهنمای بیمه‌گذاران',
        ref: guideRef,
        keywords: ['راهنما', 'مراحل', 'ثبت‌نام', 'مدارک', 'پرداخت'],
      },
      {
        title: 'معرفی شرکت',
        ref: aboutRef,
        keywords: ['شرکت', 'درباره', 'تجربه', 'خدمات', 'آمار'],
      },
      { title: 'تماس با ما', ref: contactRef, keywords: ['تماس', 'آدرس', 'تلفن', 'پشتیبانی'] },
      { title: 'آخرین اخبار', ref: newsRef, keywords: ['اخبار', 'خبر', 'جدید', 'اعلام', 'تخفیف'] },
      {
        title: 'نظرات مشتریان',
        ref: testimonialsRef,
        keywords: ['نظرات', 'مشتری', 'تجربه', 'رضایت'],
      },
    ];

    const results = searchableContent.filter(
      item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
    );

    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const handleSearchResultClick = ref => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setShowSearchResults(false);
  };

  const navItems = [
    { ref: homeRef, label: 'خانه' },
    { ref: guideRef, label: 'راهنمای بیمه گزاران' },
    { ref: systemsRef, label: 'سامانه ها' },
    { ref: aboutRef, label: 'معرفی شرکت' },
    { ref: contactRef, label: 'تماس با ما' },
    { ref: newsRef, label: 'آخرین اخبار' },
    { ref: testimonialsRef, label: 'نظرات مشتریان' },
    { ref: blogRef, label: 'بلاگ' },
    { ref: null, label: 'ساخت رزومه', isExternal: true, href: '/resume-builder' },
  ];
  // Removed complaintNav, complaintRef

  // Navigation scrolls to section
  const handleNavClick = ref => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Blog admin panel auth state
  const [blogAdminLoggedIn, setBlogAdminLoggedIn] = useState(false);

  // Log out blog admin on tab close or navigation
  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.removeItem('blogAdmin');
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);
  const location = useLocation();

  // Blog admin panel route
  if (location.pathname === '/admin/blog') {
    // Only log in for this session; closing tab logs out
    if (!blogAdminLoggedIn && sessionStorage.getItem('blogAdmin') === 'true') {
      setBlogAdminLoggedIn(true);
    }
    const handleLogout = () => {
      sessionStorage.removeItem('blogAdmin');
      setBlogAdminLoggedIn(false);
    };
    return blogAdminLoggedIn ? (
      <BlogAdmin onLogout={handleLogout} />
    ) : (
      <AdminBlogLogin onLogin={() => setBlogAdminLoggedIn(true)} />
    );
  }

  // Show admin login before dashboard
  if (location.pathname === '/admin') {
    // Auto-logout on tab close/reload
    useEffect(() => {
      const handleUnload = () => {
        sessionStorage.removeItem('adminLoggedIn');
      };
      window.addEventListener('beforeunload', handleUnload);
      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      };
    }, []);

    const [adminTab, setAdminTab] = useState('dashboard');
    const handleAdminLogout = () => {
      sessionStorage.removeItem('adminLoggedIn');
      setAdminLoggedIn(false);
    };
    if (!adminLoggedIn) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.2rem 2rem 0 2rem',
          }}
        >
          <div>
            <button
              onClick={() => setAdminTab('dashboard')}
              style={{
                marginLeft: '1rem',
                fontWeight: adminTab === 'dashboard' ? 'bold' : 'normal',
              }}
            >
              داشبورد
            </button>
            <button
              onClick={() => setAdminTab('blog')}
              style={{ fontWeight: adminTab === 'blog' ? 'bold' : 'normal' }}
            >
              مدیریت بلاگ
            </button>
          </div>
          <button
            style={{
              background: '#e53935',
              color: '#fff',
              border: 'none',
              borderRadius: '0.7rem',
              padding: '0.5rem 1.2rem',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
            onClick={handleAdminLogout}
          >
            خروج
          </button>
        </div>
        <div>{adminTab === 'dashboard' ? <AdminDashboard /> : <BlogAdmin />}</div>
      </div>
    );
  }

  return (
    <div className='App'>
      <SeoDefaults />
      <DecorationController />
      <div className='animated-bg' />
      <Header navItems={navItems} handleNavClick={handleNavClick} onSearch={handleSearch} />

      {/* Search Results Overlay */}
      {showSearchResults && (
        <div className='search-results-overlay' onClick={() => setShowSearchResults(false)}>
          <div className='search-results-container' onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#ff9800', marginBottom: '1rem', textAlign: 'center' }}>
              نتایج جستجو
            </h3>
            <div className='search-results-list'>
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  className='search-result-item'
                  onClick={() => handleSearchResultClick(result.ref)}
                >
                  {result.title}
                </button>
              ))}
            </div>
            <button className='close-search-results' onClick={() => setShowSearchResults(false)}>
              بستن
            </button>
          </div>
        </div>
      )}

      {/* Removed complaint nav bar */}
      <div id='root-content'>
        <section ref={homeRef} className='snap-section' id='home-section'>
          <Home />
        </section>
        <section ref={systemsRef} className='snap-section' id='systems-section'>
          <Systems />
        </section>
        <section ref={guideRef} className='snap-section' id='guide-section'>
          <Guide />
        </section>
        <section ref={aboutRef} className='snap-section' id='about-section'>
          <About />
        </section>
        <section ref={contactRef} className='snap-section' id='contact-section'>
          <Contact />
        </section>
        <section ref={newsRef} className='snap-section' id='news-section'>
          <News />
        </section>
        <section ref={testimonialsRef} className='snap-section' id='testimonials-section'>
          <Testimonials />
        </section>
        {/* Blog section removed; now available at /blog */}
        {/* Removed Complaint section */}
      </div>
      <button className='scroll-top-btn' onClick={handleScrollTop} aria-label='Scroll to top'>
        <svg
          width='28'
          height='28'
          viewBox='0 0 28 28'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='14' cy='14' r='13' stroke='#f36e21' strokeWidth='2' fill='#fff' />
          <path d='M14 19V9' stroke='#f36e21' strokeWidth='2' strokeLinecap='round' />
          <path d='M9 14L14 9L19 14' stroke='#f36e21' strokeWidth='2' strokeLinecap='round' />
        </svg>
      </button>
      <FooterModern />
    </div>
  );
}

export default App;
