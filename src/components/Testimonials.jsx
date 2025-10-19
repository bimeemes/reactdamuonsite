import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'محمد رضایی',
    position: 'مدیر شرکت صنعتی',
    image: 'https://via.placeholder.com/80x80/4CAF50/ffffff?text=م.ر',
    text: 'بیمه درمان دامون واقعاً خدمات فوق‌العاده‌ای ارائه می‌دهد. پردازش سریع و پشتیبانی عالی.',
    rating: 5,
    date: '1403/06/15',
  },
  {
    id: 2,
    name: 'فاطمه احمدی',
    position: 'کارمند دولتی',
    image: 'https://via.placeholder.com/80x80/FF9800/ffffff?text=ف.ا',
    text: 'تیم مشاوران دامون بسیار صبور و حرفه‌ای هستند. بهترین تصمیم برای خرید بیمه عمر بود.',
    rating: 5,
    date: '1403/06/10',
  },
  {
    id: 3,
    name: 'علی حسینی',
    position: 'کسب و کار آنلاین',
    image: 'https://via.placeholder.com/80x80/2196F3/ffffff?text=ع.ح',
    text: 'سامانه آنلاین دامون فوق‌العاده است. همه کارهایم را آنلاین انجام می‌دهم.',
    rating: 5,
    date: '1403/06/05',
  },
  {
    id: 4,
    name: 'مریم زارعی',
    position: 'خانم خانه‌دار',
    image: 'https://via.placeholder.com/80x80/9C27B0/ffffff?text=م.ز',
    text: 'خیلی راحت و آسان بیمه‌نامه گرفتم. قیمت‌ها هم بسیار مناسب بود.',
    rating: 4,
    date: '1403/05/28',
  },
  {
    id: 5,
    name: 'حسن کریمی',
    position: 'بازنشسته',
    image: 'https://via.placeholder.com/80x80/607D8B/ffffff?text=ح.ک',
    text: 'از زمانی که عضو دامون شدم، خیالم از بابت درمان راحت شده. خدمات عالی!',
    rating: 5,
    date: '1403/05/20',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const defaultOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://damuon.com';

  const structuredData = useMemo(() => {
    const ratingValue =
      testimonials.reduce((total, item) => total + (item.rating || 0), 0) /
      (testimonials.length || 1);

    const resolvedOrigin =
      defaultOrigin.includes('localhost') || defaultOrigin.includes('127.0.0.1')
        ? 'https://damuon.com'
        : defaultOrigin;

    return {
      '@context': 'https://schema.org',
      '@type': 'InsuranceAgency',
      '@id': `${resolvedOrigin}#/testimonials`,
      name: 'کارگزاری رسمی بیمه مستقیم برخط آتیه اندیشان دامون',
      url: resolvedOrigin,
      image: `${resolvedOrigin}/images/alreadydamoun.png`,
  telephone: '+98-21-5738-90000',
      priceRange: 'IRR',
      address: {
        '@type': 'PostalAddress',
  streetAddress: 'تهران - خیابان خالد اسلامبولی (وزرا) - کوچه بیستم (رفیعی) - پلاک 22 - واحد 1',
        addressLocality: 'تهران',
        addressRegion: 'تهران',
        postalCode: '1511833413',
        addressCountry: 'IR',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: ratingValue.toFixed(1),
        bestRating: '5',
        worstRating: '1',
        reviewCount: testimonials.length,
      },
      review: testimonials.map(item => ({
        '@type': 'Review',
        name: `${item.name} - ${item.position}`,
        reviewBody: item.text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: item.rating,
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Person',
          name: item.name,
        },
      })),
    };
  }, [defaultOrigin]);

  const nextTestimonial = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const renderStars = rating => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? '#FFD700' : '#ddd', fontSize: '1.2rem' }}>
        ★
      </span>
    ));
  };

  return (
    <section
      className='testimonials-section'
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      <Helmet>
        <title>نظرات مشتریان | کارگزاری بیمه دامون</title>
        <meta
          name='description'
          content='نظرات واقعی مشتریان درباره خدمات بیمه‌ای دامون را بخوانید. میانگین امتیاز ۴٫۸ از ۵ بر اساس صدها تجربه موفق.'
        />
        <meta
          name='keywords'
          content='رضایت مشتریان بیمه, نظرات بیمه دامون, امتیاز کارگزاری بیمه, تجربه خرید بیمه'
        />
        <script type='application/ld+json'>{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          رضایت بیش از 100,000 مشتری، بهترین گواه کیفیت خدمات ما
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem auto',
        }}
      >
        <div
          style={{
            padding: '1.5rem',
            borderRadius: '15px',
            border: '1px solid rgba(246, 110, 32, 0.3)',
            background: 'transparent',
          }}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f66e20' }}>95%</div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>رضایت مشتریان</div>
        </div>
        <div
          style={{
            padding: '1.5rem',
            borderRadius: '15px',
            border: '1px solid rgba(246, 110, 32, 0.3)',
            background: 'transparent',
          }}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f66e20' }}>4.8/5</div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>امتیاز کلی</div>
        </div>
        <div
          style={{
            padding: '1.5rem',
            borderRadius: '15px',
            border: '1px solid rgba(117, 117, 117, 0.3)',
            background: 'transparent',
          }}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#757575' }}>85K+</div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>مشتری راضی</div>
        </div>
      </div>

      {/* Main Testimonial */}
      <div
        style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(246, 110, 32, 0.3)',
          minHeight: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: isAnimating ? 0.7 : 1,
          transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.3s ease',
          background: 'transparent',
          boxShadow: 'none',
        }}
      >
        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
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
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={e => {
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseOut={e => {
            e.target.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ‹
        </button>

        <button
          onClick={nextTestimonial}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
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
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={e => {
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseOut={e => {
            e.target.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ›
        </button>

        {/* Testimonial Content */}
        <div style={{ textAlign: 'center', padding: '0 80px' }}>
          <img
            src={testimonials[currentIndex].image}
            alt={testimonials[currentIndex].name}
            loading='lazy'
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              margin: '0 auto 1rem auto',
              border: '3px solid #f66e20',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          />

          <div style={{ marginBottom: '1rem' }}>
            {renderStars(testimonials[currentIndex].rating)}
          </div>

          <p
            style={{
              fontSize: '1.2rem',
              color: '#2c3e50',
              fontStyle: 'italic',
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              position: 'relative',
            }}
          >
            "{testimonials[currentIndex].text}"
          </p>

          <div style={{ textAlign: 'center' }}>
            <h4
              style={{
                color: '#f66e20',
                marginBottom: '0.3rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              {testimonials[currentIndex].name}
            </h4>
            <p
              style={{
                color: '#666',
                fontSize: '0.9rem',
                marginBottom: '0.3rem',
              }}
            >
              {testimonials[currentIndex].position}
            </p>
            <p style={{ color: '#999', fontSize: '0.8rem' }}>{testimonials[currentIndex].date}</p>
          </div>
        </div>

        {/* Dots Indicator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem',
          }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex ? '#f66e20' : '#ddd',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div
        style={{
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          maxWidth: '800px',
          margin: '3rem auto 0 auto',
        }}
      >
        <div
          style={{
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(246, 110, 32, 0.3)',
            background: 'transparent',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>جوایز</div>
          <h4 style={{ color: '#f66e20', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
            برترین کارگزاری 1403
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>انتخاب اتحادیه بیمه</p>
        </div>

        <div
          style={{
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(117, 117, 117, 0.3)',
            background: 'transparent',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>امنیت</div>
          <h4 style={{ color: '#757575', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
            امنیت تضمینی
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>SSL و رمزگذاری</p>
        </div>

        <div
          style={{
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(246, 110, 32, 0.3)',
            background: 'transparent',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>پشتیبانی</div>
          <h4 style={{ color: '#f66e20', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
            پشتیبانی 24/7
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>همیشه در خدمت</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
