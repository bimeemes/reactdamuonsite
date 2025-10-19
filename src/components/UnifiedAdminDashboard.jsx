import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState({
    totalTestimonials: 28,
    pendingApproval: 5,
    monthlyGrowth: 23,
    averageRating: 4.6,
    invitationsSent: 67,
    responseRate: 34,
    conversionRate: 78,
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'pending', message: '3 نظر جدید در انتظار تایید', time: '10 دقیقه پیش' },
    { id: 2, type: 'success', message: 'حسن کریمی نظر 5 ستاره‌ای ثبت کرد', time: '1 ساعت پیش' },
    { id: 3, type: 'info', message: '15 دعوت‌نامه امروز ارسال شد', time: '2 ساعت پیش' },
  ]);

  const menuItems = [
    { key: 'overview', label: '📊 خلاصه عملکرد', icon: '📊' },
    { key: 'pending', label: '⏳ تایید نظرات', count: stats.pendingApproval },
    { key: 'testimonials', label: '✅ نظرات تایید شده', count: stats.totalTestimonials },
    { key: 'invitations', label: '📤 مدیریت دعوت‌ها' },
    { key: 'analytics', label: '📈 آمار و گزارش' },
    { key: 'settings', label: '⚙️ تنظیمات' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '280px',
          background: 'linear-gradient(180deg, #f66e20 0%, #e55100 100%)',
          color: 'white',
          padding: '0',
          boxShadow: '2px 0 15px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '2rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>🏆 پنل مدیریت</h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>سیستم نظرات دامون</p>
        </div>

        {/* Menu Items */}
        <nav style={{ padding: '1rem 0' }}>
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                border: 'none',
                background: activeSection === item.key ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                textAlign: 'right',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: activeSection === item.key ? 'bold' : 'normal',
              }}
              onMouseEnter={e => {
                if (activeSection !== item.key) {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseLeave={e => {
                if (activeSection !== item.key) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <span>{item.label}</span>
              {item.count && (
                <span
                  style={{
                    background: '#fff',
                    color: '#f66e20',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div
          style={{
            padding: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            marginTop: 'auto',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', opacity: 0.9 }}>اقدامات سریع</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              📤 ارسال دعوت گروهی
            </button>
            <button
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              📊 گزارش ماهانه
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        {/* Top Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            background: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <div>
            <h1 style={{ margin: 0, color: '#333', fontSize: '1.8rem' }}>
              {menuItems.find(item => item.key === activeSection)?.label || 'داشبورد'}
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
              {new Date().toLocaleDateString('fa-IR')} | آخرین بروزرسانی: همین الان
            </p>
          </div>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              style={{
                background: '#f66e20',
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '50%',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              🔔
              {notifications.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: '#f44336',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '0.7rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div>
            {/* Key Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #f66e20, #ff8a50)',
                  color: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ fontSize: '3rem', margin: 0 }}>{stats.totalTestimonials}</h3>
                <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>📝 کل نظرات</p>
                <small style={{ opacity: 0.8 }}>+{stats.monthlyGrowth}% این ماه</small>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                  color: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ fontSize: '3rem', margin: 0 }}>{stats.averageRating}</h3>
                <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>⭐ میانگین امتیاز</p>
                <small style={{ opacity: 0.8 }}>از 5 امتیاز</small>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, #2196F3, #42A5F5)',
                  color: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ fontSize: '3rem', margin: 0 }}>{stats.responseRate}%</h3>
                <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>📈 نرخ پاسخ</p>
                <small style={{ opacity: 0.8 }}>از {stats.invitationsSent} دعوت</small>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, #9C27B0, #BA68C8)',
                  color: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ fontSize: '3rem', margin: 0 }}>{stats.conversionRate}%</h3>
                <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>🎯 نرخ تبدیل</p>
                <small style={{ opacity: 0.8 }}>نظر به انتشار</small>
              </div>
            </div>

            {/* Recent Activity */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '2rem',
              }}
            >
              {/* Activity Feed */}
              <div
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}
              >
                <h3 style={{ color: '#f66e20', marginBottom: '1.5rem' }}>🔄 فعالیت‌های اخیر</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                        background: '#f9f9f9',
                        borderRadius: '8px',
                        borderRight: `4px solid ${
                          notification.type === 'pending'
                            ? '#FF9800'
                            : notification.type === 'success'
                              ? '#4CAF50'
                              : '#2196F3'
                        }`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: '1.5rem',
                          marginLeft: '1rem',
                        }}
                      >
                        {notification.type === 'pending'
                          ? '⏳'
                          : notification.type === 'success'
                            ? '✅'
                            : 'ℹ️'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{notification.message}</p>
                        <small style={{ color: '#666' }}>{notification.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}
              >
                <h3 style={{ color: '#f66e20', marginBottom: '1.5rem' }}>📊 آمار سریع</h3>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span>نظرات 5 ستاره</span>
                    <span style={{ fontWeight: 'bold' }}>68%</span>
                  </div>
                  <div
                    style={{
                      background: '#e0e0e0',
                      height: '8px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        background: '#4CAF50',
                        width: '68%',
                        height: '100%',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span>دعوت‌های موثر</span>
                    <span style={{ fontWeight: 'bold' }}>34%</span>
                  </div>
                  <div
                    style={{
                      background: '#e0e0e0',
                      height: '8px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        background: '#2196F3',
                        width: '34%',
                        height: '100%',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span>تایید خودکار</span>
                    <span style={{ fontWeight: 'bold' }}>78%</span>
                  </div>
                  <div
                    style={{
                      background: '#e0e0e0',
                      height: '8px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        background: '#f66e20',
                        width: '78%',
                        height: '100%',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other sections would be loaded here based on activeSection */}
        {activeSection !== 'overview' && (
          <div
            style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ color: '#f66e20' }}>
              {menuItems.find(item => item.key === activeSection)?.label}
            </h2>
            <p style={{ color: '#666' }}>این بخش در حال توسعه است و به زودی اضافه خواهد شد.</p>
            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => setActiveSection('overview')}
                style={{
                  background: '#f66e20',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                🏠 بازگشت به خلاصه عملکرد
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
