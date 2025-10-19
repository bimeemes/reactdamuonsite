import React, { useRef } from 'react';
import './News.css';

const newsItems = [
  {
    id: 1,
    title: ' اعلام سرویس‌های جدید بیمه درمان',
    date: '1403/06/30',
    summary:
      'بیمه درمان دامون با افزودن پوشش‌های جدید شامل فیزیوتراپی، کایروپراکتی و طب سوزنی، خدمات کاملی را به بیمه‌گذاران ارائه می‌دهد.',
    image: '/images/news-insurance-services.jpg',
    category: 'خدمات جدید',
    readTime: '3 دقیقه',
  },
  {
    id: 2,
    title: 'کاهش قیمت بیمه‌نامه‌های عمر و حادثه',
    date: '1403/06/25',
    summary:
      'در راستای حمایت از خانواده‌ها، نرخ‌های بیمه عمر و حادثه تا 20% کاهش یافت. این تخفیف ویژه تا پایان سال 1403 اعتبار دارد.',
    image: '/images/news-discount-special.jpg',
    category: 'تخفیفات',
    readTime: '2 دقیقه',
  },
  {
    id: 3,
    title: 'دامون به عنوان برترین کارگزاری سال انتخاب شد',
    date: '1403/06/20',
    summary:
      'در مراسم تقدیر از فعالان صنعت بیمه، شرکت کارگزاری دامون به عنوان برترین کارگزاری سال 1403 معرفی و تقدیر شد.',
    image: '/images/news-award-winner.jpg',
    category: 'افتخارات',
    readTime: '4 دقیقه',
  },
  {
    id: 4,
    title: 'راه‌اندازی اپلیکیشن موبایل دامون',
    date: '1403/06/15',
    summary:
      'اپلیکیشن جدید دامون با امکانات صدور آنلاین بیمه‌نامه، پیگیری خسارات و دریافت مشاوره، در دسترس کاربران قرار گرفت.',
    image: '/images/news-mobile-app.jpg',
    category: 'فناوری',
    readTime: '5 دقیقه',
  },
  {
    id: 5,
    title: 'افتتاح شعبه جدید در اصفهان',
    date: '1403/06/10',
    summary:
      'شعبه جدید دامون در اصفهان با ارائه کلیه خدمات بیمه‌ای و تیم مشاوران متخصص، آماده خدمت‌رسانی به همشهریان عزیز است.',
    image: '/images/news-new-branch.jpg',
    category: 'گسترش شبکه',
    readTime: '3 دقیقه',
  },
];

const News = () => {
  const sliderRef = useRef(null);
  // Drag-to-scroll logic
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
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
    sliderRef.current.scrollLeft = scrollStartX.current + dx * 2.5;
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
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  }
  function scrollRight() {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }
  // Scroll slider to a specific news item
  const scrollToNews = idx => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelectorAll('.news-card.horizontal')[idx];
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  };

  return (
    <section
      className='news-section'
      dir='rtl'
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        userSelect: 'none',
        padding: '2rem 1rem',
      }}
    >
      {/* Enhanced Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2
          className='news-title'
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#f66e20',
          }}
        >
          آخرین اخبار و رویدادها
        </h2>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          از جدیدترین خدمات، تخفیفات ویژه و دستاوردهای ما مطلع شوید
        </p>
      </div>

      <div
        className='news-row'
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '2rem',
          '@media (maxWidth: 768px)': {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        {/* Left: Enhanced Vertical card list */}
        <div
          className='news-list'
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {newsItems.slice(0, 3).map((item, idx) => {
            const accentColor =
              item.category === 'تخفیفات'
                ? '#f66e20'
                : item.category === 'افتخارات'
                  ? '#e55b0f'
                  : item.category === 'فناوری'
                    ? '#424242'
                    : '#616161';
            return (
              <div
                className='news-card vertical fade-in'
                key={item.id}
                tabIndex={0}
                onClick={() => scrollToNews(idx)}
                style={{
                  padding: '1rem',
                  border: '1px solid rgba(246, 110, 32, 0.2)',
                  borderRadius: '15px',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  background: 'transparent',
                  boxShadow: 'none',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
              <img
                src={item.image}
                alt={item.title}
                className='news-image'
                style={{
                  width: '80px',
                  height: '60px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div className='news-info' style={{ flex: 1 }}>
                <div
                  style={{
                    color: accentColor,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    display: 'inline-block',
                    marginBottom: '0.5rem',
                    border: `1px solid ${accentColor}`,
                    background: 'transparent',
                  }}
                >
                  {item.category}
                </div>
                <h3
                  style={{
                    fontSize: '0.9rem',
                    marginBottom: '0.3rem',
                    color: '#2c3e50',
                    lineHeight: '1.3',
                  }}
                >
                  {item.title.length > 50 ? item.title.substring(0, 50) + '...' : item.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem',
                    color: '#888',
                  }}
                >
                  <span>{item.date}</span>
                  <span> {item.readTime}</span>
                </div>
              </div>
            </div>
          );
        })}
        </div>

        {/* Right: Enhanced Horizontal slider with navigation */}
        <div className='news-slider' style={{ position: 'relative', minWidth: 0 }}>
          <button
            className='slider-arrow left'
            onClick={scrollLeft}
            aria-label='قبلی'
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              background: 'transparent',
              border: '1px solid #f66e20',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              outline: 'none',
            }}
            onMouseOver={e =>
              (e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)')
            }
            onMouseOut={e =>
              (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')
            }
          >
            <svg
              width='24'
              height='24'
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
            className='slider-inner'
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            style={{ padding: '0 60px' }}
          >
            {newsItems.map(item => (
              <div className='news-card horizontal fade-in' key={item.id}>
                <img src={item.image} alt={item.title} className='news-image' />
                <div className='news-info'>
                  <h3>{item.title}</h3>
                  <span className='news-date'>{item.date}</span>
                  <p>{item.summary}</p>
                  <button className='read-more'>مشاهده خبر</button>
                </div>
              </div>
            ))}
          </div>
          <button
            className='slider-arrow right'
            onClick={scrollRight}
            aria-label='بعدی'
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              background: 'transparent',
              border: '1px solid #f66e20',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              outline: 'none',
            }}
            onMouseOver={e =>
              (e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)')
            }
            onMouseOut={e =>
              (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')
            }
          >
            <svg
              width='24'
              height='24'
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
            .slider-inner::-webkit-scrollbar { display: none; }
          `}
          </style>
        </div>
      </div>
    </section>
  );
};

export default News;
