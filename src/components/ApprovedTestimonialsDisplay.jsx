import React, { useState, useEffect } from 'react';

const ApprovedTestimonialsDisplay = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, 5stars, 4stars, recent
  const [displayMode, setDisplayMode] = useState('grid'); // grid, carousel, list

  // Sample approved testimonials with quality indicators
  const sampleTestimonials = [
    {
      id: 1,
      name: 'حسن کریمی',
      profession: 'مهندس',
      rating: 5,
      testimonial:
        'خدمات عالی و تسویه سریع خسارت. بعد از حادثه، تیم دامون خیلی سریع رسیدند و همه کارها رو انجام دادند. واقعاً راضی هستم.',
      submittedAt: '1403/06/15',
      source: 'invitation',
      verified: true,
      helpful: 24,
      claimType: 'تصادف',
      processTime: '2 روز',
    },
    {
      id: 2,
      name: 'فاطمه احمدی',
      profession: 'پزشک',
      rating: 5,
      testimonial:
        'بیمه دامون واقعاً قابل اعتماده. وقتی خونم آتیش گرفت، خیلی سریع و بدون دردسر خسارتم رو پرداخت کردند.',
      submittedAt: '1403/06/10',
      source: 'invitation',
      verified: true,
      helpful: 18,
      claimType: 'آتش‌سوزی',
      processTime: '3 روز',
    },
    {
      id: 3,
      name: 'علی رضایی',
      profession: 'بازاری',
      rating: 4,
      testimonial: 'در کل راضی هستم ولی پروسه کمی طولانی بود. اما در نهایت همه چیز درست شد.',
      submittedAt: '1403/06/08',
      source: 'website',
      verified: false,
      helpful: 12,
      claimType: 'سرقت',
      processTime: '7 روز',
    },
    {
      id: 4,
      name: 'مریم نوری',
      profession: 'معلم',
      rating: 5,
      testimonial: 'فوق‌العاده! کارمندها خیلی مهربان و کمک‌کار بودند. پیشنهاد می‌کنم حتماً.',
      submittedAt: '1403/06/05',
      source: 'invitation',
      verified: true,
      helpful: 31,
      claimType: 'آسیب دیدگی',
      processTime: '1 روز',
    },
    {
      id: 5,
      name: 'امیر حسینی',
      profession: 'کارمند',
      rating: 5,
      testimonial: 'بهترین تجربه‌ای که از یک شرکت بیمه داشتم. سریع، دقیق و قابل اعتماد.',
      submittedAt: '1403/06/01',
      source: 'invitation',
      verified: true,
      helpful: 22,
      claimType: 'تصادف',
      processTime: '2 روز',
    },
  ];

  useEffect(() => {
    // Simulate API call to load approved testimonials
    setLoading(true);
    setTimeout(() => {
      setTestimonials(sampleTestimonials);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTestimonials = testimonials.filter(testimonial => {
    switch (filter) {
      case '5stars':
        return testimonial.rating === 5;
      case '4stars':
        return testimonial.rating === 4;
      case 'recent':
        return testimonial.submittedAt >= '1403/06/10';
      case 'verified':
        return testimonial.verified;
      default:
        return true;
    }
  });

  const averageRating =
    testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : 0;

  const totalHelpful = testimonials.reduce((sum, t) => sum + t.helpful, 0);

  if (loading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'linear-gradient(135deg, #f66e20, #ff8a50)',
          color: 'white',
          borderRadius: '15px',
          margin: '2rem 0',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <h3>در حال بارگذاری نظرات مشتریان...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0', background: '#f9f9f9' }} dir='rtl'>
      {/* Header Section */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #f66e20, #ff8a50)',
          color: 'white',
          padding: '3rem 2rem',
          borderRadius: '20px',
          margin: '0 1rem 3rem 1rem',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>🌟 نظرات مشتریان دامون</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, margin: '0 0 2rem 0' }}>
          تجربه واقعی مشتریان ما از خدمات بیمه دامون
        </p>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '3rem', margin: 0 }}>{testimonials.length}</h3>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>نظر مشتریان</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '3rem', margin: 0 }}>{averageRating}</h3>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>میانگین امتیاز</p>
            <div style={{ fontSize: '1.5rem' }}>
              {'★'.repeat(Math.floor(averageRating))}
              {'☆'.repeat(5 - Math.floor(averageRating))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '3rem', margin: 0 }}>{totalHelpful}</h3>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>مفید بوده</p>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          padding: '0 1rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: 'همه نظرات', count: testimonials.length },
            {
              key: '5stars',
              label: '5 ستاره',
              count: testimonials.filter(t => t.rating === 5).length,
            },
            {
              key: '4stars',
              label: '4 ستاره',
              count: testimonials.filter(t => t.rating === 4).length,
            },
            {
              key: 'verified',
              label: 'تایید شده',
              count: testimonials.filter(t => t.verified).length,
            },
            {
              key: 'recent',
              label: 'اخیر',
              count: testimonials.filter(t => t.submittedAt >= '1403/06/10').length,
            },
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              style={{
                padding: '0.8rem 1.2rem',
                border: 'none',
                background: filter === filterOption.key ? '#f66e20' : '#fff',
                color: filter === filterOption.key ? 'white' : '#333',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>

        {/* Display Mode */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setDisplayMode('grid')}
            style={{
              padding: '0.8rem',
              border: 'none',
              background: displayMode === 'grid' ? '#f66e20' : '#fff',
              color: displayMode === 'grid' ? 'white' : '#333',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            🔲
          </button>
          <button
            onClick={() => setDisplayMode('list')}
            style={{
              padding: '0.8rem',
              border: 'none',
              background: displayMode === 'list' ? '#f66e20' : '#fff',
              color: displayMode === 'list' ? 'white' : '#333',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            📋
          </button>
        </div>
      </div>

      {/* Testimonials Display */}
      <div
        style={{
          padding: '0 1rem',
          display: displayMode === 'grid' ? 'grid' : 'flex',
          gridTemplateColumns: displayMode === 'grid' ? 'repeat(auto-fit, minmax(350px, 1fr))' : '',
          flexDirection: displayMode === 'list' ? 'column' : '',
          gap: '1.5rem',
        }}
      >
        {filteredTestimonials.map(testimonial => (
          <div
            key={testimonial.id}
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: testimonial.rating === 5 ? '2px solid #FFD700' : '1px solid #eee',
              position: 'relative',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}
          >
            {/* Quality Badges */}
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              {testimonial.rating === 5 && (
                <span
                  style={{
                    background: '#FFD700',
                    color: '#333',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                  }}
                >
                  ⭐ برتر
                </span>
              )}

              {testimonial.verified && (
                <span
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                  }}
                >
                  ✅ تایید شده
                </span>
              )}

              {testimonial.source === 'invitation' && (
                <span
                  style={{
                    background: '#2196F3',
                    color: 'white',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                  }}
                >
                  📧 مشتری دعوت شده
                </span>
              )}
            </div>

            {/* Header */}
            <div style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
              <h4 style={{ color: '#f66e20', margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
                {testimonial.name}
                {testimonial.profession && (
                  <span style={{ color: '#666', fontSize: '1rem', fontWeight: 'normal' }}>
                    {' - '}
                    {testimonial.profession}
                  </span>
                )}
              </h4>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.5rem',
                }}
              >
                <div style={{ fontSize: '1.5rem' }}>
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>({testimonial.rating}/5)</span>
              </div>
            </div>

            {/* Testimonial Text */}
            <p
              style={{
                lineHeight: '1.8',
                color: '#333',
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                fontStyle: 'italic',
              }}
            >
              "{testimonial.testimonial}"
            </p>

            {/* Claim Details */}
            <div
              style={{
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  fontSize: '0.9rem',
                }}
              >
                <div>
                  <strong>نوع خسارت:</strong> {testimonial.claimType}
                </div>
                <div>
                  <strong>زمان پردازش:</strong> {testimonial.processTime}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.9rem',
                color: '#666',
                borderTop: '1px solid #eee',
                paddingTop: '1rem',
              }}
            >
              <span>📅 {testimonial.submittedAt}</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  👍 {testimonial.helpful} مفید بود
                </button>

                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                  }}
                >
                  📤 اشتراک‌گذاری
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div
        style={{
          textAlign: 'center',
          margin: '3rem 1rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #2196F3, #42A5F5)',
          color: 'white',
          borderRadius: '15px',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0' }}>🤝 تجربه شما چطور بوده؟</h3>
        <p style={{ margin: '0 0 1.5rem 0', opacity: 0.9 }}>
          نظر شما برای ما ارزشمند است و به بهبود خدماتمان کمک می‌کند
        </p>

        <button
          style={{
            background: 'white',
            color: '#2196F3',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}
        >
          📝 ثبت نظر من
        </button>
      </div>
    </div>
  );
};

export default ApprovedTestimonialsDisplay;
