import React from 'react';
import TestimonialForm from './TestimonialForm';

const Contact = () => {
  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)',
      }}
      dir='rtl'
    >
      {/* Existing Contact Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
          padding: '2rem',
          borderRadius: '15px',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            color: '#f66e20',
            marginBottom: '1.5rem',
            fontSize: '2.5rem',
          }}
        >
          📞 تماس با ما
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ color: '#f66e20', marginBottom: '1rem' }}>📍 آدرس</h3>
            <p>تهران، خیابان ولیعصر، پلاک 123</p>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ color: '#f66e20', marginBottom: '1rem' }}>☎️ تلفن</h3>
            <p>021-12345678</p>
            <p>09123456789</p>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ color: '#f66e20', marginBottom: '1rem' }}>📧 ایمیل</h3>
            <p>info@damoun.com</p>
            <p>support@damoun.com</p>
          </div>
        </div>
      </div>

      {/* NEW: Integrated Testimonial Form */}
      <TestimonialForm />

      {/* Call to Action for Testimonials */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f66e20, #e55b0f)',
          color: 'white',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>💬 صدای شما مهم است!</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          اگر از خدمات ما استفاده کرده‌اید، تجربه‌تان را با دیگران به اشتراک بگذارید. نظرات شما به
          بهبود کیفیت خدماتمان کمک می‌کند.
        </p>
      </div>
    </div>
  );
};

export default Contact;
