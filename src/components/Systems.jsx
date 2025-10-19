import React from 'react';
import './Systems.css';
import { CustomLottieAnimation } from './ProfessionalLottieAnimations';
import StatSlider from './StatSlider';
import bimmesLogo from '../assets/bimmesLogo.png';
import lifeAccidentLogo from '../assets/PbimmesLogo.png';
import sinadLogo from '../assets/1alborzimages.png';

// Image Slider Component
const ImageSlider = () => {
  const images = [
    {
      src: '/src/assets/alreadydamoun.png',
      alt: 'خدمات بیمه دامون',
      caption: 'کارگزاری آتیه اندیشان دامون',
    },
    {
      src: '/src/assets/Tehran.jpg',
      alt: 'خدمات تهران',
      caption: 'خدمات در سراسر کشور',
    },
    {
      src: '/src/assets/rafsenjan.jpeg',
      alt: 'خدمات رفسنجان',
      caption: 'پوشش سراسری خدمات',
    },
    {
      src: '/src/assets/Sarcheshmeh.jpeg',
      alt: 'خدمات سرچشمه',
      caption: 'حمایت در همه جا',
    },
    {
      src: '/src/assets/sungoon.jpeg',
      alt: 'خدمات سونگون',
      caption: 'بیمه برای همه',
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = index => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        borderRadius: '0',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      }}
    >
      {/* Main Image Display */}
      <div
        style={{
          position: 'relative',
          height: '500px',
          overflow: 'hidden',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              background: `url(${image.src}) center/cover no-repeat`,
              backgroundColor: '#f0f0f0',
            }}
          >
            {/* Caption Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                color: 'white',
                padding: '2rem 1rem 1rem',
                textAlign: 'center',
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: '1.3rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {image.caption}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '15px',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          color: '#333',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          zIndex: 2,
        }}
        onMouseOver={e => {
          e.target.style.background = '#f66e20';
          e.target.style.color = 'white';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseOut={e => {
          e.target.style.background = 'rgba(255, 255, 255, 0.9)';
          e.target.style.color = '#333';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '15px',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          color: '#333',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          zIndex: 2,
        }}
        onMouseOver={e => {
          e.target.style.background = '#f66e20';
          e.target.style.color = 'white';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseOut={e => {
          e.target.style.background = 'rgba(255, 255, 255, 0.9)';
          e.target.style.color = '#333';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        ❯
      </button>

      {/* Dot Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 2,
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? '25px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              background: index === currentIndex ? '#f66e20' : 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: isAutoPlaying ? 'rgba(246, 110, 32, 0.8)' : 'rgba(158, 158, 158, 0.8)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {isAutoPlaying ? 'خودکار' : 'دستی'}
      </div>
    </div>
  );
};

const systems = [
  {
    name: 'سامانه بیمـس',
    url: 'https://bimmes.ir',
    detail: 'پنل یکپارچه خدمات آنلاین کارگزاری دامون',
  },
  {
    name: 'سامانه عمر و حادثه',
    url: 'https://omr.bimmes.ir',
    detail: 'پشتیبانی هوشمند بیمه‌های عمر و حادثه',
  },
  {
    name: 'سامانه سیناد',
    url: 'https://sinad.ealborzins.ir',
    detail: 'دسترسی سریع به خدمات بیمه البرز',
  },
  {
    name: 'پرسشنامه تکمیلی',
    url: '/questionnaire',
    detail: 'فرم نظرسنجـی از تجربه شما',
  },
];

const systemLogos = [
  { src: bimmesLogo, alt: 'لوگوی سامانه بیمس' },
  { src: lifeAccidentLogo, alt: 'لوگوی سامانه عمر و حادثه' },
  { src: sinadLogo, alt: 'لوگوی سامانه سیناد' },
  null,
];

const Systems = () => {
  // Animation state for each card
  const [spinning, setSpinning] = React.useState([false, false, false, false]);

  const handleSpin = (idx, url) => {
    setSpinning(prev => prev.map((s, i) => (i === idx ? true : s)));
    setTimeout(() => {
      setSpinning(prev => prev.map((s, i) => (i === idx ? false : s)));
      // Open /questionnaire in a new tab for the form card
      if (url === '/questionnaire') {
        window.open(url, '_blank', 'noopener');
      } else if (url.startsWith('http')) {
        window.open(url, '_blank', 'noopener');
      } else if (url.startsWith('/')) {
        window.location.href = url;
      } else {
        window.location.hash = url;
      }
    }, 700);
  };

  return (
    <div className='systems-section'>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            width: '180px',
            height: '180px',
            position: 'relative',
          }}
        >
          <CustomLottieAnimation
            url='/animations/checkbime.json'
            style={{ width: '100%', height: '100%' }}
            fallbackIcon='🌀'
            gradient='linear-gradient(135deg, rgba(246, 110, 32, 0.6) 0%, rgba(117, 117, 117, 0.6) 100%)'
          />
        </div>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '800px',
            margin: 0,
            lineHeight: '1.6',
            textAlign: 'center',
          }}
        >
          دسترسی آسان و امن به تمامی خدمات بیمه‌ای<br></br> از طریق سامانه‌های پیشرفته ما
        </p>
      </div>

      <div
        className='systems-list'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {systems.map((sys, idx) => (
          <div
            key={sys.name}
            className={`system-card${idx === 2 ? ' system-sinad-card' : ''}${idx === 3 ? ' system-form-card' : ''}${spinning[idx] ? ' spinning' : ''}`}
            onClick={() => handleSpin(idx, sys.url)}
            tabIndex={0}
            role='button'
            aria-label={sys.name}
            style={{
              background:
                idx === 0
                  ? 'conic-gradient(from 0deg at 30% 30%, rgba(246, 110, 32, 0.3) 0deg, transparent 90deg, rgba(117, 117, 117, 0.2) 180deg, rgba(158, 158, 158, 0.1) 270deg, rgba(246, 110, 32, 0.25) 360deg)'
                  : idx === 1
                    ? 'conic-gradient(from 90deg at 70% 30%, rgba(117, 117, 117, 0.25) 0deg, rgba(246, 110, 32, 0.3) 90deg, rgba(158, 158, 158, 0.1) 180deg, transparent 270deg, rgba(229, 91, 15, 0.2) 360deg)'
                    : idx === 2
                      ? 'conic-gradient(from 180deg at 30% 70%, rgba(158, 158, 158, 0.2) 0deg, rgba(229, 91, 15, 0.25) 90deg, transparent 180deg, rgba(246, 110, 32, 0.3) 270deg, rgba(117, 117, 117, 0.15) 360deg)'
                      : 'conic-gradient(from 270deg at 70% 70%, transparent 0deg, rgba(158, 158, 158, 0.3) 90deg, rgba(246, 110, 32, 0.2) 180deg, rgba(117, 117, 117, 0.25) 270deg, rgba(229, 91, 15, 0.2) 360deg)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border:
                idx === 0
                  ? '2px solid rgba(246, 110, 32, 0.3)'
                  : idx === 1
                    ? '2px solid rgba(246, 110, 32, 0.3)'
                    : idx === 2
                      ? '2px solid rgba(246, 110, 32, 0.3)'
                      : '2px solid rgba(246, 110, 32, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(246, 110, 32, 0.25)';
              e.currentTarget.style.zIndex = '10';

              // Puzzle complementary patterns - each card completes the others
              if (idx === 0) {
                e.currentTarget.style.background =
                  'conic-gradient(from 180deg at 30% 30%, rgba(246, 110, 32, 0.8) 0deg, rgba(117, 117, 117, 0.6) 90deg, transparent 180deg, rgba(158, 158, 158, 0.4) 270deg, rgba(246, 110, 32, 0.7) 360deg)';
                e.currentTarget.style.borderColor = 'rgba(246, 110, 32, 0.8)';
              } else if (idx === 1) {
                e.currentTarget.style.background =
                  'conic-gradient(from 270deg at 70% 30%, rgba(158, 158, 158, 0.6) 0deg, rgba(246, 110, 32, 0.8) 90deg, rgba(117, 117, 117, 0.5) 180deg, rgba(229, 91, 15, 0.7) 270deg, transparent 360deg)';
                e.currentTarget.style.borderColor = 'rgba(246, 110, 32, 0.8)';
              } else if (idx === 2) {
                e.currentTarget.style.background =
                  'conic-gradient(from 0deg at 30% 70%, transparent 0deg, rgba(229, 91, 15, 0.7) 90deg, rgba(246, 110, 32, 0.8) 180deg, rgba(117, 117, 117, 0.6) 270deg, rgba(158, 158, 158, 0.4) 360deg)';
                e.currentTarget.style.borderColor = 'rgba(246, 110, 32, 0.8)';
              } else {
                e.currentTarget.style.background =
                  'conic-gradient(from 90deg at 70% 70%, rgba(117, 117, 117, 0.6) 0deg, transparent 90deg, rgba(246, 110, 32, 0.8) 180deg, rgba(158, 158, 158, 0.5) 270deg, rgba(229, 91, 15, 0.7) 360deg)';
                e.currentTarget.style.borderColor = 'rgba(246, 110, 32, 0.8)';
              }
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              e.currentTarget.style.zIndex = '1';

              // Return to puzzle base patterns
              if (idx === 0) {
                e.currentTarget.style.background =
                  'conic-gradient(from 0deg at 30% 30%, rgba(246, 110, 32, 0.3) 0deg, transparent 90deg, rgba(117, 117, 117, 0.2) 180deg, rgba(158, 158, 158, 0.1) 270deg, rgba(246, 110, 32, 0.25) 360deg)';
                e.currentTarget.style.borderColor = 'rgba(246, 110, 32, 0.3)';
              } else if (idx === 1) {
                e.currentTarget.style.background =
                  'conic-gradient(from 90deg at 70% 30%, rgba(117, 117, 117, 0.25) 0deg, rgba(246, 110, 32, 0.3) 90deg, rgba(158, 158, 158, 0.1) 180deg, transparent 270deg, rgba(229, 91, 15, 0.2) 360deg)';
                e.currentTarget.style.borderColor = 'rgba(246, 110, 32, 0.3)';
              } else if (idx === 2) {
                e.currentTarget.style.background =
                  'conic-gradient(from 180deg at 30% 70%, rgba(158, 158, 158, 0.2) 0deg, rgba(229, 91, 15, 0.25) 90deg, transparent 180deg, rgba(246, 110, 32, 0.3) 270deg, rgba(117, 117, 117, 0.15) 360deg)';
                e.currentTarget.style.borderColor = 'rgba(246, 110, 32, 0.3)';
              } else {
                e.currentTarget.style.background =
                  'conic-gradient(from 270deg at 70% 70%, transparent 0deg, rgba(158, 158, 158, 0.3) 90deg, rgba(246, 110, 32, 0.2) 180deg, rgba(117, 117, 117, 0.25) 270deg, rgba(229, 91, 15, 0.2) 360deg)';
                e.currentTarget.style.borderColor = 'rgba(246, 110, 32, 0.3)';
              }
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '1rem',
                width: '100%',
                color: '#263238',
              }}
            >
              {systemLogos[idx] && (
                <div
                  aria-hidden='true'
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background:
                      idx === 0
                        ? 'linear-gradient(145deg, rgba(246,110,32,0.25), rgba(117,117,117,0.35))'
                        : idx === 1
                          ? 'linear-gradient(145deg, rgba(117, 117, 117, 0.3), rgba(246, 110, 32, 0.35))'
                          : 'linear-gradient(145deg, rgba(158,158,158,0.25), rgba(246,110,32,0.4))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.9rem',
                    boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(255,255,255,0.45)',
                    backdropFilter: 'blur(8px)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={systemLogos[idx].src}
                    alt={systemLogos[idx].alt}
                    style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                  />
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                <div
                  className='system-name'
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    letterSpacing: '0.01em',
                    textShadow: '0 4px 16px rgba(255,255,255,0.35)',
                  }}
                >
                  {sys.name}
                </div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(55,71,79,0.8)',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {sys.detail}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '3rem auto 0',
        }}
      >
        <StatSlider />
      </div>

      {/* Image Slider Section */}
      <div
        style={{
          marginTop: '4rem',
          textAlign: 'center',
          background: 'transparent',
          padding: '0',
          borderRadius: '0',
          border: 'none',
          width: '100%',
        }}
      >
        <ImageSlider />
      </div>
    </div>
  );
};

export default Systems;
