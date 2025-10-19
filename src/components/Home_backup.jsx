import React from 'react';
import {
  InsuranceProtectionAnimation,
  FloatingElementsAnimation,
  MoneyProtectionAnimation,
} from './ProfessionalAnimations';

// SMS Animation Component
function SMSAnimation({ style }) {
  return (
    <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: '100px',
          height: '60px',
          background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
          borderRadius: '12px',
          position: 'relative',
          animation: 'phoneFloat 2s ease-in-out infinite alternate',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '24px',
          }}
        >
          📱
        </div>
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '40px',
            height: '25px',
            background: 'linear-gradient(135deg, #FF9800, #FFC107)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'messageFloat 1.5s ease-in-out infinite',
          }}
        >
          <span style={{ color: 'white', fontSize: '12px' }}>SMS</span>
        </div>
      </div>
    </div>
  );
}

// Document Processing Animation Component
function DocumentProcessingAnimation({ style }) {
  return (
    <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: '80px',
          height: '100px',
          background: 'linear-gradient(135deg, #607d8b, #78909c)',
          borderRadius: '8px',
          position: 'relative',
          animation: 'documentFloat 2.5s ease-in-out infinite alternate',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '32px',
          }}
        >
          📄
        </div>
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            width: '30px',
            height: '30px',
            background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'checkFloat 1.8s ease-in-out infinite',
          }}
        >
          <span style={{ color: 'white', fontSize: '16px' }}>✓</span>
        </div>
      </div>
    </div>
  );
}

function StatSlider() {
  const cards = [
    { color: '#f66e20', label: 'تعداد بیمه شده ها در ماه', value: '100,000 نفر' },
    { color: '#607d8b', label: 'تعداد بیمه شده عمر و حادثه', value: '30,000 نفر' },
    { color: '#f66e20', label: 'تعداد فوتی ها سال 1403', value: '143' },
    { color: '#607d8b', label: 'تعداد بیمه گزاران', value: '173' },
    { color: '#f66e20', label: 'نسبت خسارت بیمه های درمان', value: '119%' },
  ];
  const sliderRef = React.useRef(null);
  // Mouse drag logic
  // Use refs for drag state to avoid lag
  const isDragging = React.useRef(false);
  const dragStartX = React.useRef(0);
  const scrollStartX = React.useRef(0);
  const handleMouseDown = e => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStartX.current = sliderRef.current.scrollLeft;
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
    sliderRef.current.style.transition = 'none';
  };
  const handleMouseMove = e => {
    if (!isDragging.current) {
      return;
    }
    const dx = dragStartX.current - e.clientX;
    sliderRef.current.scrollLeft = scrollStartX.current + dx * 4;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    sliderRef.current.style.transition = '';
  };
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  // Scroll left/right by card width
  function scrollLeft() {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  }
  function scrollRight() {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  }
  return (
    <div
      className='stat-slider'
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '900px',
        margin: '2rem auto',
        overflow: 'visible',
        userSelect: 'none',
      }}
    >
      <button
        className='slider-btn left'
        onClick={scrollLeft}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          background: 'linear-gradient(135deg, #fff 80%, #f66e20 120%)',
          border: 'none',
          borderRadius: '50%',
          width: '54px',
          height: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px #eee',
          cursor: 'pointer',
          transition: 'background 0.2s, box-shadow 0.2s',
          outline: 'none',
          borderWidth: 0,
        }}
        onMouseOver={e =>
          (e.currentTarget.style.background = 'linear-gradient(135deg, #f66e20 60%, #fff 120%)')
        }
        onMouseOut={e =>
          (e.currentTarget.style.background = 'linear-gradient(135deg, #fff 80%, #f66e20 120%)')
        }
      >
        <svg
          width='28'
          height='28'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#f66e20'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='15 18 9 12 15 6' />
        </svg>
      </button>
      <div
        ref={sliderRef}
        className='slider-track'
        style={{
          display: 'flex',
          gap: '2rem',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          padding: '0 70px',
          touchAction: 'pan-x',
          scrollbarWidth: 'none',
        }}
        onMouseDown={handleMouseDown}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              minWidth: '300px',
              maxWidth: '300px',
              height: '220px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <StatBox {...card} />
          </div>
        ))}
      </div>
      <button
        className='slider-btn right'
        onClick={scrollRight}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          background: 'linear-gradient(225deg, #fff 80%, #f66e20 120%)',
          border: 'none',
          borderRadius: '50%',
          width: '54px',
          height: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px #eee',
          cursor: 'pointer',
          transition: 'background 0.2s, box-shadow 0.2s',
          outline: 'none',
          borderWidth: 0,
        }}
        onMouseOver={e =>
          (e.currentTarget.style.background = 'linear-gradient(225deg, #f66e20 60%, #fff 120%)')
        }
        onMouseOut={e =>
          (e.currentTarget.style.background = 'linear-gradient(225deg, #fff 80%, #f66e20 120%)')
        }
      >
        <svg
          width='28'
          height='28'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#f66e20'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='9 6 15 12 9 18' />
        </svg>
      </button>
      <style>
        {`
        .slider-track::-webkit-scrollbar { display: none; }
      `}
      </style>
    </div>
  );
}

function StatBox({ color, icon, label, value }) {
  return (
    <div className='stat-box'>
      <div className='stat-icon' style={{ color }}>
        {icon}
      </div>
      <div
        style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#607d8b' }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 900, fontSize: '1.7rem', color }}>{value}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div
      className='home-hero'
      style={{
        minHeight: '100vh',
        padding: '3rem 1rem',
        fontFamily: 'Vazirmatn, Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: '2rem',
      }}
    >
      {/* Floating Background Animation */}
      <FloatingElementsAnimation />

      {/* Enhanced Hero Section */}
      <div
        style={{
          padding: '2.5rem 2rem',
          width: '100%',
          maxWidth: '1200px',
          marginBottom: '2rem',
          animation: 'fadeInGlass 1.2s',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Main Headlines with Animation */}
        <div
          style={{
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1
              style={{
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                color: '#2c3e50',
                marginBottom: '1rem',
                letterSpacing: '0.02em',
                textShadow: '0 2px 12px #fff3e0',
                lineHeight: '1.2',
              }}
            >
              کارگزاری آتیه اندیشان دامون
            </h1>
          </div>
          <div style={{ flexShrink: 0 }}>
            <InsuranceProtectionAnimation style={{ width: 200, height: 200 }} />
          </div>
        </div>
        <p
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#34495e',
            marginBottom: '1rem',
            fontWeight: 600,
            lineHeight: '1.6',
          }}
        >
          پیشرو در ارائه خدمات بیمه‌ای هوشمند و نوآورانه
        </p>
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#7f8c8d',
            marginBottom: '2.5rem',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto 2.5rem auto',
          }}
        >
          با بیش از دو دهه تجربه در صنعت بیمه، ما آماده ارائه بهترین خدمات بیمه‌ای از جمله بیمه
          درمان، عمر، حادثه و دارایی هستیم
        </p>

        {/* Call to Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        >
          <button
            style={{
              background: 'linear-gradient(135deg, #f66e20 0%, #f57f17 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(246, 110, 32, 0.4)',
              transition: 'all 0.3s ease',
              minWidth: '200px',
            }}
            onMouseOver={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 30px rgba(246, 110, 32, 0.5)';
            }}
            onMouseOut={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(246, 110, 32, 0.4)';
            }}
            onClick={() => {
              const systemsElement = document.querySelector(
                '#root-content > .snap-section:first-child'
              );
              if (systemsElement) {
                systemsElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            شروع خدمات آنلاین
          </button>
          <button
            style={{
              background: 'transparent',
              color: '#f66e20',
              border: '2px solid #f66e20',
              borderRadius: '50px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '200px',
            }}
            onMouseOver={e => {
              e.target.style.background = '#f66e20';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={e => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#f66e20';
              e.target.style.transform = 'translateY(0)';
            }}
            onClick={() => {
              const contactElement = document.querySelector('section[class*="contact"]');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            تماس با مشاوران
          </button>
        </div>

        {/* Key Benefits */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
            maxWidth: '900px',
            margin: '0 auto 3rem auto',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '15px',
              padding: '1.5rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '1px solid rgba(246, 110, 32, 0.2)',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={e => (e.target.style.transform = 'translateY(-5px)')}
            onMouseOut={e => (e.target.style.transform = 'translateY(0)')}
          >
            <h3 style={{ color: '#2c3e50', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              سرعت بالا
            </h3>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem', lineHeight: '1.5' }}>
              پردازش آنلاین و فوری درخواست‌های بیمه‌ای
            </p>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '15px',
              padding: '1.5rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '1px solid rgba(246, 110, 32, 0.2)',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={e => (e.target.style.transform = 'translateY(-5px)')}
            onMouseOut={e => (e.target.style.transform = 'translateY(0)')}
          >
            <h3 style={{ color: '#2c3e50', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              امنیت بالا
            </h3>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem', lineHeight: '1.5' }}>
              حفاظت کامل از اطلاعات شخصی و مالی شما
            </p>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '15px',
              padding: '1.5rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '1px solid rgba(246, 110, 32, 0.2)',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={e => (e.target.style.transform = 'translateY(-5px)')}
            onMouseOut={e => (e.target.style.transform = 'translateY(0)')}
          >
            <h3 style={{ color: '#2c3e50', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              تجربه 20+ ساله
            </h3>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem', lineHeight: '1.5' }}>
              دو دهه فعالیت موفق در صنعت بیمه
            </p>
          </div>
        </div>

        {/* SMS Service Section with Animation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '3rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(246, 110, 32, 0.1)',
            border: '1px solid rgba(246, 110, 32, 0.2)',
          }}
        >
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#2c3e50',
                marginBottom: '1rem',
              }}
            >
              سرویس پیامک هوشمند
            </h3>
            <p
              style={{
                fontSize: '1.1rem',
                color: '#7f8c8d',
                lineHeight: '1.6',
                marginBottom: '1rem',
              }}
            >
              دریافت کد تایید و اطلاعات بیمه‌ای از طریق پیامک سریع و امن
            </p>
            <ul style={{ color: '#34495e', fontSize: '1rem', lineHeight: '1.8' }}>
              <li>✓ ارسال فوری کد تایید</li>
              <li>✓ پیگیری وضعیت بیمه‌نامه</li>
              <li>✓ یادآوری سررسید</li>
              <li>✓ پشتیبانی 24 ساعته</li>
            </ul>
          </div>
          <div style={{ flexShrink: 0 }}>
            <SMSAnimation style={{ width: 200, height: 200 }} />
          </div>
        </div>

        {/* Document Processing Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '3rem',
            flexWrap: 'wrap-reverse',
            marginBottom: '3rem',
            padding: '2rem',
            background: 'rgba(96, 125, 139, 0.08)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(96, 125, 139, 0.1)',
            border: '1px solid rgba(96, 125, 139, 0.2)',
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <DocumentProcessingAnimation style={{ width: 200, height: 200 }} />
          </div>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#2c3e50',
                marginBottom: '1rem',
              }}
            >
              پردازش هوشمند اسناد
            </h3>
            <p
              style={{
                fontSize: '1.1rem',
                color: '#7f8c8d',
                lineHeight: '1.6',
                marginBottom: '1rem',
              }}
            >
              سیستم مدیریت اسناد پیشرفته برای پردازش سریع و دقیق درخواست‌ها
            </p>
            <ul style={{ color: '#34495e', fontSize: '1rem', lineHeight: '1.8' }}>
              <li>✓ پردازش خودکار اسناد</li>
              <li>✓ بررسی اعتبار مدارک</li>
              <li>✓ آرشیو دیجیتال امن</li>
              <li>✓ دسترسی آنلاین به سوابق</li>
            </ul>
          </div>
        </div>

        <StatSlider />

        {/* نقشه شعب دامون section moved to Contact.jsx */}
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;900&display=swap');
          
          .stat-box {
            background: rgba(255,255,255,0.45);
            border-radius: 20px;
            box-shadow: 0 2px 16px rgba(246, 110, 32, 0.2);
            padding: 2rem 1rem;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.18);
          }
          
          .stat-box:hover {
            transform: translateY(-6px) scale(1.04);
            box-shadow: 0 8px 32px rgba(246, 110, 32, 0.3);
          }
          
          .stat-icon {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            animation: bounce 1.2s infinite alternate;
          }
          
          @keyframes bounce {
            0% { transform: translateY(0); }
            100% { transform: translateY(-8px); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fadeInGlass {
            from { opacity: 0; transform: translateY(40px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          @keyframes phoneFloat {
            0% { transform: translateY(0) rotate(-2deg); }
            100% { transform: translateY(-10px) rotate(2deg); }
          }
          
          @keyframes messageFloat {
            0% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.1) translateY(-5px); }
            100% { transform: scale(1) translateY(0); }
          }
          
          @keyframes documentFloat {
            0% { transform: translateY(0) rotate(-1deg); }
            100% { transform: translateY(-8px) rotate(1deg); }
          }
          
          @keyframes checkFloat {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.2) rotate(180deg); }
            100% { transform: scale(1) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
