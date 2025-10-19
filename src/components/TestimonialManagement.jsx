import React, { useState, useEffect } from 'react';

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [pendingTestimonials, setPendingTestimonials] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [customers, setCustomers] = useState([]);

  // Load data on component mount
  useEffect(() => {
    loadPendingTestimonials();
    loadApprovedTestimonials();
    loadCustomers();
  }, []);

  const loadPendingTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials/pending');
      const data = await response.json();
      if (data.success) {
        setPendingTestimonials(data.testimonials);
      }
    } catch (error) {
      console.error('Error loading pending testimonials:', error);
    }
  };

  const loadApprovedTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.testimonials);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const loadCustomers = async () => {
    // Load customer list for manual invitations
    const mockCustomers = [
      {
        id: 1,
        name: 'احمد محمدی',
        email: 'ahmad@example.com',
        phone: '09121234567',
        lastClaim: '1403/03/15',
      },
      {
        id: 2,
        name: 'فاطمه احمدی',
        email: 'fateme@example.com',
        phone: '09121234568',
        lastClaim: '1403/04/20',
      },
      {
        id: 3,
        name: 'علی رضایی',
        email: 'ali@example.com',
        phone: '09121234569',
        lastClaim: '1403/05/10',
      },
    ];
    setCustomers(mockCustomers);
  };

  const approveTestimonial = async id => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}/approve`, {
        method: 'PUT',
      });
      const data = await response.json();
      if (data.success) {
        alert('نظر تایید شد');
        loadPendingTestimonials();
        loadApprovedTestimonials();
      }
    } catch (error) {
      console.error('Error approving testimonial:', error);
    }
  };

  const rejectTestimonial = async id => {
    if (confirm('آیا از رد این نظر مطمئن هستید؟')) {
      // Implementation for rejection
      console.log('Rejecting testimonial:', id);
    }
  };

  const sendTestimonialInvite = async customer => {
    try {
      const response = await fetch('/api/admin/testimonials/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: customer.id,
          email: customer.email,
          phone: customer.phone,
          name: customer.name,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`دعوت‌نامه برای ${customer.name} ارسال شد`);
        setShowInviteModal(false);
      }
    } catch (error) {
      console.error('Error sending invite:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }} dir='rtl'>
      <h2 style={{ color: '#f66e20', marginBottom: '2rem', fontSize: '2rem' }}>
        📝 مدیریت نظرات مشتریان
      </h2>

      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #eee',
          paddingBottom: '1rem',
        }}
      >
        <button
          onClick={() => setActiveTab('pending')}
          style={{
            padding: '0.8rem 1.5rem',
            border: 'none',
            background: activeTab === 'pending' ? '#f66e20' : '#f0f0f0',
            color: activeTab === 'pending' ? 'white' : '#333',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ⏳ در انتظار تایید ({pendingTestimonials.length})
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          style={{
            padding: '0.8rem 1.5rem',
            border: 'none',
            background: activeTab === 'approved' ? '#f66e20' : '#f0f0f0',
            color: activeTab === 'approved' ? 'white' : '#333',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ✅ تایید شده ({testimonials.length})
        </button>

        <button
          onClick={() => setActiveTab('invite')}
          style={{
            padding: '0.8rem 1.5rem',
            border: 'none',
            background: activeTab === 'invite' ? '#f66e20' : '#f0f0f0',
            color: activeTab === 'invite' ? 'white' : '#333',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📤 دعوت از مشتریان
        </button>
      </div>

      {/* Pending Testimonials Tab */}
      {activeTab === 'pending' && (
        <div>
          <h3 style={{ marginBottom: '1.5rem' }}>نظرات در انتظار تایید</h3>
          {pendingTestimonials.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#666',
                background: '#f9f9f9',
                borderRadius: '12px',
              }}
            >
              هیچ نظر جدیدی در انتظار تایید نیست
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {pendingTestimonials.map(testimonial => (
                <div
                  key={testimonial.id}
                  style={{
                    background: '#fff',
                    border: '2px solid #ffd54f',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: '#f66e20', marginBottom: '0.5rem' }}>
                        {testimonial.name}
                        {testimonial.profession && (
                          <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: 'normal' }}>
                            {' - '}
                            {testimonial.profession}
                          </span>
                        )}
                      </h4>

                      <div style={{ marginBottom: '1rem' }}>
                        {'★'.repeat(testimonial.rating)}{' '}
                        <span style={{ color: '#666' }}>({testimonial.rating}/5)</span>
                      </div>

                      <p
                        style={{
                          lineHeight: '1.6',
                          marginBottom: '1rem',
                          padding: '1rem',
                          background: '#f9f9f9',
                          borderRadius: '8px',
                        }}
                      >
                        "{testimonial.testimonial}"
                      </p>

                      <div style={{ color: '#666', fontSize: '0.9rem' }}>
                        📅 {testimonial.submittedAt}
                        {testimonial.email && <span> | 📧 {testimonial.email}</span>}
                        {testimonial.phone && <span> | 📱 {testimonial.phone}</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginRight: '1rem' }}>
                      <button
                        onClick={() => approveTestimonial(testimonial.id)}
                        style={{
                          background: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        ✅ تایید
                      </button>

                      <button
                        onClick={() => rejectTestimonial(testimonial.id)}
                        style={{
                          background: '#f44336',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        ❌ رد
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Approved Testimonials Tab */}
      {activeTab === 'approved' && (
        <div>
          <h3 style={{ marginBottom: '1.5rem' }}>نظرات تایید شده</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {testimonials.map(testimonial => (
              <div
                key={testimonial.id}
                style={{
                  background: '#fff',
                  border: '2px solid #4CAF50',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}
              >
                <h4 style={{ color: '#f66e20' }}>{testimonial.name}</h4>
                <div>{'★'.repeat(testimonial.rating)}</div>
                <p style={{ margin: '1rem 0' }}>"{testimonial.testimonial}"</p>
                <small style={{ color: '#666' }}>منتشر شده: {testimonial.submittedAt}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Invitation Tab */}
      {activeTab === 'invite' && (
        <div>
          <h3 style={{ marginBottom: '1.5rem' }}>دعوت از مشتریان برای ثبت نظر</h3>

          <div
            style={{
              background: '#e3f2fd',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
            }}
          >
            💡 <strong>نکته:</strong> بهترین زمان برای دعوت، 1-2 هفته پس از تسویه خسارت یا فعال‌سازی
            بیمه است.
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {customers.map(customer => (
              <div
                key={customer.id}
                style={{
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h4>{customer.name}</h4>
                  <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>
                    📧 {customer.email} | 📱 {customer.phone}
                    <br />
                    آخرین خسارت: {customer.lastClaim}
                  </p>
                </div>

                <button
                  onClick={() => sendTestimonialInvite(customer)}
                  style={{
                    background: '#f66e20',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  📤 ارسال دعوت‌نامه
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialManagement;
