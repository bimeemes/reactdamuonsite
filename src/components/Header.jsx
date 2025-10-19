import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/alreadydamoun.png';
import logo2 from '../assets/alreadydamoun2.png';
import wordmark from '../assets/damuon-wordmark.svg';

const Header = ({ navItems, handleNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scrolled state for subtle styling tweaks
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = ref => {
    handleNavClick(ref);
    setMobileMenuOpen(false); // Close menu after navigation
  };

  // Find home ref
  const homeRef = navItems && navItems.length > 0 ? navItems[0].ref : null;

  return (
    <header
      className={`main-header header-visible${isScrolled ? ' scrolled' : ''}`}
      dir='rtl'
    >
      <div className='header-top'>
        <div className='logo-container'>
          <button className='logo-link' onClick={() => handleNavClick(homeRef)} aria-label='خانه'>
            <span className='logo-img-wrapper'>
              <img src={logo} alt='Company Logo' className='logo-img logo-img-main' />
              <img src={logo2} alt='Company Logo Hover' className='logo-img logo-img-hover' />
            </span>
            <img
              src={wordmark}
              alt=''
              aria-hidden='true'
              draggable='false'
              className='logo-wordmark'
            />
          </button>
        </div>

        {/* Hamburger Menu Button */}
        <button className='hamburger-menu' onClick={toggleMobileMenu} aria-label='منو'>
          <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`} />
          <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`} />
          <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`} />
        </button>

        {/* Desktop Navigation */}
        <nav className='nav-bar desktop-nav'>
          {navItems &&
            navItems.map(({ ref, label, isExternal, href }) =>
              label === 'بلاگ' ? (
                <a key={label} className='nav-link' href='/blog'>
                  بلاگ
                </a>
              ) : isExternal ? (
                <a key={label} className='nav-link nav-link-resume' href={href}>
                  <span className='resume-icon'></span>
                  {label}
                </a>
              ) : (
                <button key={label} className='nav-link' onClick={() => handleNavClick(ref)}>
                  {label}
                </button>
              )
            )}
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
        <nav className='mobile-nav-bar'>
          {navItems &&
            navItems.map(({ ref, label, isExternal, href }) =>
              label === 'بلاگ' ? (
                <a
                  key={label}
                  className='mobile-nav-link'
                  href='/blog'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  بلاگ
                </a>
              ) : isExternal ? (
                <a
                  key={label}
                  className='mobile-nav-link mobile-nav-link-resume'
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className='resume-icon' aria-hidden='true'></span>
                  {label}
                </a>
              ) : (
                <button
                  key={label}
                  className='mobile-nav-link'
                  onClick={() => handleMobileNavClick(ref)}
                >
                  {label}
                </button>
              )
            )}
        </nav>
      </div>

    </header>
  );
};

export default Header;
