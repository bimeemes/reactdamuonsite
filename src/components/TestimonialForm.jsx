import React, { useState } from 'react';

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    rating: 5,
    testimonial: '',
    email: '',
    phone: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to your backend API with approval workflow
      const response = await fetch('/api/testimonials/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          source: 'website', // Mark as coming from website form
          status: 'pending', // Requires admin approval
          customerVerified: false, // Website submissions need verification
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        setFormData({
          name: '',
          profession: '',
          rating: 5,
          testimonial: '',
          email: '',
          phone: '',
          consent: false,
        });
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('خطا در ارسال نظر. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #4CAF50, #45a049)',
          color: 'white',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          margin: '2rem 0',
        }}
      >
        <h3>🙏 متشکریم!</h3>
        <p>نظر شما با موفقیت دریافت شد و پس از بررسی توسط تیم ما منتشر خواهد شد.</p>
        <div
          style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            📧 در صورت تایید نظر، از طریق ایمیل اطلاع‌رسانی خواهید شد
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
        padding: '2rem',
        borderRadius: '15px',
        margin: '2rem 0',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      }}
      dir='rtl'
    >
      <h3
        style={{
          color: '#f66e20',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontSize: '1.8rem',
        }}
      >
        📝 نظر شما برای ما مهم است
      </h3>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label htmlFor="testimonial-name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              نام و نام خانوادگی *
            </label>
            <input
              id="testimonial-name"
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid rgba(246, 110, 32, 0.3)',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
              placeholder='مثال: حسن کریمی'
            />
          </div>

          <div>
            <label htmlFor="testimonial-profession" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              شغل/سمت
            </label>
            <input
              id="testimonial-profession"
              type='text'
              name='profession'
              value={formData.profession}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid rgba(246, 110, 32, 0.3)',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
              placeholder='مثال: بازنشسته، مهندس، پزشک'
            />
          </div>
        </div>

        <div style={{ margin: '1rem 0' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            امتیاز شما ⭐
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type='button'
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  color: star <= formData.rating ? '#ffc107' : '#ddd',
                }}
              >
                ★
              </button>
            ))}
            <span style={{ marginRight: '1rem', color: '#666' }}>({formData.rating} از 5)</span>
          </div>
        </div>

        <div style={{ margin: '1rem 0' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            نظر شما *
          </label>
          <textarea
            name='testimonial'
            value={formData.testimonial}
            onChange={handleInputChange}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '2px solid rgba(246, 110, 32, 0.3)',
              borderRadius: '8px',
              fontSize: '1rem',
              resize: 'vertical',
            }}
            placeholder='لطفاً تجربه‌تان از خدمات ما را بنویسید...'
          />
        </div>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              ایمیل
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid rgba(246, 110, 32, 0.3)',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              تلفن همراه
            </label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid rgba(246, 110, 32, 0.3)',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
              placeholder='09xxxxxxxxx'
            />
          </div>
        </div>

        <div style={{ margin: '1.5rem 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type='checkbox'
              name='consent'
              checked={formData.consent}
              onChange={handleInputChange}
              required
            />
            <span style={{ fontSize: '0.9rem', color: '#666' }}>
              با انتشار نظر خود در وب‌سایت موافقم
            </span>
          </label>
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          style={{
            background: 'linear-gradient(135deg, #f66e20, #e55b0f)',
            color: 'white',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            width: '100%',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'در حال ارسال...' : '📤 ارسال نظر'}
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
