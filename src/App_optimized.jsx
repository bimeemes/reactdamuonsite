import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import FooterModern from './components/FooterModern';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Lazy loaded components for better performance
const Home = lazy(() => import('./components/Home'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const Guide = lazy(() => import('./components/Guide'));
const Systems = lazy(() => import('./components/Systems'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const News = lazy(() => import('./components/News'));
const Blog = lazy(() => import('./components/Blog'));
const BlogAdmin = lazy(() => import('./components/BlogAdmin'));
const AdminBlogLogin = lazy(() => import('./components/AdminBlogLogin'));
const Testimonials = lazy(() => import('./components/Testimonials'));

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
  const homeRef = useRef(null);
  const guideRef = useRef(null);
  const systemsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const newsRef = useRef(null);
  const blogRef = useRef(null);
  const testimonialsRef = useRef(null);

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

  // Navigation scrolls to section
  const handleNavClick = ref => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // URL routing logic
  const path = window.location.pathname;

  if (path === '/admin') {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        {adminLoggedIn ? <AdminDashboard /> : <AdminLogin onLogin={handleAdminLogin} />}
      </Suspense>
    );
  }

  if (path === '/blog-admin') {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <AdminBlogLogin />
      </Suspense>
    );
  }

  if (path === '/blog') {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <div className='App'>
          <Header navItems={navItems} handleNavClick={handleNavClick} onSearch={handleSearch} />
          <Blog />
          <FooterModern />
        </div>
      </Suspense>
    );
  }

  // Main App
  return (
    <div className='App'>
      <Header navItems={navItems} handleNavClick={handleNavClick} onSearch={handleSearch} />

      {/* Search Results */}
      {showSearchResults && (
        <div className='search-results-overlay'>
          <div className='search-results'>
            <h3>نتایج جستجو</h3>
            {searchResults.map((result, index) => (
              <div
                key={index}
                className='search-result-item'
                onClick={() => handleSearchResultClick(result.ref)}
              >
                {result.title}
              </div>
            ))}
            <button className='close-search' onClick={() => setShowSearchResults(false)}>
              بستن
            </button>
          </div>
        </div>
      )}

      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <section ref={homeRef} id='home'>
            <Home />
          </section>

          <section ref={guideRef} id='guide'>
            <Guide />
          </section>

          <section ref={systemsRef} id='systems'>
            <Systems />
          </section>

          <section ref={aboutRef} id='about'>
            <About />
          </section>

          <section ref={contactRef} id='contact'>
            <Contact />
          </section>

          <section ref={newsRef} id='news'>
            <News />
          </section>

          <section ref={testimonialsRef} id='testimonials'>
            <Testimonials />
          </section>

          <section ref={blogRef} id='blog'>
            <Blog />
          </section>
        </Suspense>
      </main>

      <FooterModern />

      {/* Scroll to top button */}
      <button className='scroll-to-top' onClick={handleScrollTop} aria-label='برو به بالا'>
        ↑
      </button>
    </div>
  );
}

export default App;
