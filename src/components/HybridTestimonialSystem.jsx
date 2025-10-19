import React, { useState, useEffect } from 'react';

const HybridTestimonialSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    pendingReviews: 3,
    approvedReviews: 12,
    invitationsSent: 45,
    responseRate: 27,
  });

  const [pendingTestimonials, setPendingTestimonials] = useState([
    {
      id: 1,
      name: 'حسن کریمی',
      rating: 5,
      testimonial:
        'خدمات عالی و تسویه سریع خسارت. بعد از حادثه، تیم دامون خیلی سریع رسیدند و همه کارها رو انجام دادند.',
      source: 'invitation', // 'invitation' or 'website'
      submittedAt: '1403/06/15',
      email: 'hassan@example.com',
      phone: '09121234560',
      profession: 'مهندس',
      customerVerified: true,
    },
    {
      id: 2,
      name: 'مریم احمدی',
      rating: 4,
      testimonial: 'بیمه خوبی هست ولی پروسه کمی طولانی بود. در کل راضی هستم.',
      source: 'website',
      submittedAt: '1403/06/18',
      email: 'maryam@example.com',
      customerVerified: false,
    },
    {
      id: 3,
      name: 'علی رضایی',
      rating: 5,
      testimonial: 'واقعاً عالی! تو کمتر از 24 ساعت خسارت من پرداخت شد. پیشنهاد می‌کنم.',
      source: 'invitation',
      submittedAt: '1403/06/20',
      email: 'ali@example.com',
      phone: '09121234569',
      customerVerified: true,
    },
  ]);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'احمد محمدی',
      email: 'ahmad@example.com',
      phone: '09121234567',
      lastClaim: '1403/03/15',
      claimAmount: '5,000,000 تومان',
      satisfaction: 'high',
      invitationSent: false,
    },
    {
      id: 2,
      name: 'فاطمه نوری',
      email: 'fateme@example.com',
      phone: '09121234568',
      lastClaim: '1403/04/20',
      claimAmount: '12,000,000 تومان',
      satisfaction: 'high',
      invitationSent: true,
      invitationDate: '1403/05/01',
    },
  ]);

  const approveTestimonial = async id => {
    try {
      // API call to approve
      alert('نظر تایید شد و منتشر خواهد شد');
      setPendingTestimonials(prev => prev.filter(t => t.id !== id));
      setStats(prev => ({
        ...prev,
        pendingReviews: prev.pendingReviews - 1,
        approvedReviews: prev.approvedReviews + 1,
      }));
    } catch (error) {
      console.error('Error approving testimonial:', error);
    }
  };

  const sendInvitation = async customer => {
    try {
      // API call to send invitation
      alert(`دعوت‌نامه برای ${customer.name} ارسال شد`);
      setCustomers(prev =>
        prev.map(c =>
          c.id === customer.id
            ? { ...c, invitationSent: true, invitationDate: new Date().toLocaleDateString('fa-IR') }
            : c
        )
      );
      setStats(prev => ({
        ...prev,
        invitationsSent: prev.invitationsSent + 1,
      }));
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }} dir='rtl'>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#f66e20', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          🏆 سیستم هیبریدی مدیریت نظرات
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          ترکیب دعوت مشتریان + فرم وب‌سایت با کنترل کیفیت
        </p>
      </div>

      {/* Stats Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #f66e20, #ff8a50)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '2rem', margin: '0' }}>{stats.pendingReviews}</h3>
          <p style={{ margin: '0.5rem 0 0 0' }}>⏳ در انتظار تایید</p>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '2rem', margin: '0' }}>{stats.approvedReviews}</h3>
          <p style={{ margin: '0.5rem 0 0 0' }}>✅ تایید شده</p>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #2196F3, #42A5F5)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '2rem', margin: '0' }}>{stats.invitationsSent}</h3>
          <p style={{ margin: '0.5rem 0 0 0' }}>📤 دعوت‌نامه ارسالی</p>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #9C27B0, #BA68C8)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '2rem', margin: '0' }}>{stats.responseRate}%</h3>
          <p style={{ margin: '0.5rem 0 0 0' }}>📊 نرخ پاسخ</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #eee',
          paddingBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {[
          { key: 'overview', label: '📊 خلاصه عملکرد', icon: '📊' },
          { key: 'pending', label: '⏳ تایید نظرات', icon: '⏳' },
          { key: 'invite', label: '📤 دعوت مشتریان', icon: '📤' },
          { key: 'settings', label: '⚙️ تنظیمات', icon: '⚙️' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '0.8rem 1.5rem',
              border: 'none',
              background: activeTab === tab.key ? '#f66e20' : '#f0f0f0',
              color: activeTab === tab.key ? 'white' : '#333',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: '#f66e20' }}>📈 خلاصه عملکرد سیستم</h3>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Success Metrics */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #4CAF50',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <h4 style={{ color: '#4CAF50', marginBottom: '1rem' }}>🎯 مزایای سیستم هیبریدی</h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem',
                }}
              >
                <div>
                  <strong>✅ کیفیت بالا:</strong> همه نظرات قبل از انتشار بررسی می‌شوند
                </div>
                <div>
                  <strong>🎯 مشتریان واقعی:</strong> دعوت مستقیم از مشتریان راضی
                </div>
                <div>
                  <strong>📈 حجم بیشتر:</strong> دو کانال جمع‌آوری نظر
                </div>
                <div>
                  <strong>🛡️ امنیت:</strong> جلوگیری از نظرات جعلی
                </div>
              </div>
            </div>

            {/* Process Flow */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #2196F3',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <h4 style={{ color: '#2196F3', marginBottom: '1rem' }}>🔄 فرآیند کاری</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <div
                  style={{
                    background: '#e3f2fd',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    minWidth: '150px',
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>👥</div>
                  <div>
                    <strong>1. شناسایی مشتریان راضی</strong>
                  </div>
                </div>

                <div style={{ fontSize: '1.5rem', color: '#2196F3' }}>→</div>

                <div
                  style={{
                    background: '#fff3e0',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    minWidth: '150px',
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>📧</div>
                  <div>
                    <strong>2. ارسال دعوت‌نامه</strong>
                  </div>
                </div>

                <div style={{ fontSize: '1.5rem', color: '#2196F3' }}>→</div>

                <div
                  style={{
                    background: '#f3e5f5',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    minWidth: '150px',
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>📝</div>
                  <div>
                    <strong>3. ثبت نظر</strong>
                  </div>
                </div>

                <div style={{ fontSize: '1.5rem', color: '#2196F3' }}>→</div>

                <div
                  style={{
                    background: '#e8f5e8',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    minWidth: '150px',
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>✅</div>
                  <div>
                    <strong>4. تایید و انتشار</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #f66e20',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <h4 style={{ color: '#f66e20', marginBottom: '1rem' }}>🚀 اقدامات سریع</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  style={{
                    background: '#f66e20',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  📤 ارسال دعوت‌نامه گروهی
                </button>

                <button
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ⏳ بررسی نظرات در انتظار
                </button>

                <button
                  style={{
                    background: '#2196F3',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  📊 گزارش عملکرد
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pending Testimonials Tab */}
      {activeTab === 'pending' && (
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: '#f66e20' }}>⏳ نظرات در انتظار تایید</h3>

          <div style={{ marginBottom: '1rem', color: '#666' }}>
            💡 <strong>نکته:</strong> نظرات دریافتی از دو مسیر "دعوت مشتریان" و "فرم وب‌سایت" در
            اینجا نمایش داده می‌شوند.
          </div>

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
                    border: `2px solid ${testimonial.source === 'invitation' ? '#4CAF50' : '#ffd54f'}`,
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
                      {/* Source Badge */}
                      <div style={{ marginBottom: '1rem' }}>
                        <span
                          style={{
                            background: testimonial.source === 'invitation' ? '#4CAF50' : '#FF9800',
                            color: 'white',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                          }}
                        >
                          {testimonial.source === 'invitation' ? '📧 دعوت مشتری' : '🌐 فرم وب‌سایت'}
                        </span>

                        {testimonial.customerVerified && (
                          <span
                            style={{
                              background: '#2196F3',
                              color: 'white',
                              padding: '0.3rem 0.8rem',
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              marginRight: '0.5rem',
                            }}
                          >
                            ✅ مشتری تایید شده
                          </span>
                        )}
                      </div>

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
                        {'★'.repeat(testimonial.rating)}
                        {'☆'.repeat(5 - testimonial.rating)}{' '}
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
                        onClick={() => console.log('Reject', testimonial.id)}
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

      {/* Customer Invitation Tab */}
      {activeTab === 'invite' && (
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: '#f66e20' }}>📤 دعوت از مشتریان</h3>

          <div
            style={{
              background: '#e3f2fd',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
            }}
          >
            💡 <strong>بهترین زمان دعوت:</strong> 1-2 هفته پس از تسویه موفق خسارت یا فعال‌سازی بیمه
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {customers.map(customer => (
              <div
                key={customer.id}
                style={{
                  background: '#fff',
                  border: `2px solid ${customer.invitationSent ? '#4CAF50' : '#ddd'}`,
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4>{customer.name}</h4>
                  <p style={{ color: '#666', margin: '0.5rem 0' }}>
                    📧 {customer.email} | 📱 {customer.phone}
                    <br />
                    💰 خسارت: {customer.claimAmount} | تاریخ: {customer.lastClaim}
                    <br />
                    {customer.satisfaction === 'high' && (
                      <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>😊 رضایت بالا</span>
                    )}
                  </p>

                  {customer.invitationSent && (
                    <div
                      style={{
                        background: '#e8f5e8',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        marginTop: '0.5rem',
                      }}
                    >
                      ✅ دعوت‌نامه ارسال شده در تاریخ {customer.invitationDate}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => sendInvitation(customer)}
                  disabled={customer.invitationSent}
                  style={{
                    background: customer.invitationSent ? '#ccc' : '#f66e20',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    cursor: customer.invitationSent ? 'not-allowed' : 'pointer',
                  }}
                >
                  {customer.invitationSent ? '✅ ارسال شده' : '📤 ارسال دعوت‌نامه'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: '#f66e20' }}>⚙️ تنظیمات سیستم</h3>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Email Settings */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #2196F3',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <h4 style={{ color: '#2196F3', marginBottom: '1rem' }}>📧 تنظیمات ایمیل</h4>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <label>
                  <strong>متن دعوت‌نامه:</strong>
                  <textarea
                    style={{
                      width: '100%',
                      height: '100px',
                      margin: '0.5rem 0',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                    }}
                    defaultValue='سلام {نام} عزیز، امیدواریم از خدمات ما راضی بوده‌اید...'
                  />
                </label>

                <label>
                  <strong>زمان ارسال پیگیری:</strong>
                  <select
                    style={{
                      padding: '0.5rem',
                      marginRight: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                    }}
                  >
                    <option value='3'>3 روز بعد</option>
                    <option value='7'>1 هفته بعد</option>
                    <option value='14'>2 هفته بعد</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Approval Settings */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #4CAF50',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <h4 style={{ color: '#4CAF50', marginBottom: '1rem' }}>✅ تنظیمات تایید</h4>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type='checkbox' defaultChecked />
                  <span>تایید خودکار نظرات 5 ستاره از مشتریان دعوت شده</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type='checkbox' defaultChecked />
                  <span>ارسال تشکر به مشتری پس از تایید نظر</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type='checkbox' />
                  <span>نمایش نظرات کمتر از 4 ستاره فقط در پنل مدیریت</span>
                </label>
              </div>
            </div>

            {/* Integration Settings */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #f66e20',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <h4 style={{ color: '#f66e20', marginBottom: '1rem' }}>🔗 تنظیمات اتصال</h4>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <label>
                  <strong>لینک فرم عمومی:</strong>
                  <input
                    type='text'
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      margin: '0.5rem 0',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                    }}
                    defaultValue='https://damuon.com/testimonial'
                    readOnly
                  />
                </label>

                <label>
                  <strong>API Key:</strong>
                  <input
                    type='password'
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      margin: '0.5rem 0',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                    }}
                    defaultValue='damoon_api_key_2024'
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HybridTestimonialSystem;
