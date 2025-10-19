import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Guide() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'چه مدارکی برای خرید آنلاین بیمه شخص ثالث لازم است؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'اسکن یا تصویر واضح از کارت ملی، سند یا کارت خودرو، بیمه‌نامه قبلی و گواهینامه معتبر راننده کافی است. بارگذاری صحیح این تصاویر باعث زمان تایید سریع‌تر می‌شود.',
        },
      },
      {
        '@type': 'Question',
        name: 'چقدر طول می‌کشد تا بیمه‌نامه صادر شود؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'پس از تکمیل فرم و ارسال مدارک، کارشناسان دامون حداکثر طی چند ساعت مدارک را بررسی و بیمه‌نامه را به صورت دیجیتال صادر می‌کنند. نسخه فیزیکی نیز بنا به درخواست ارسال می‌شود.',
        },
      },
      {
        '@type': 'Question',
        name: 'چگونه می‌توانم خسارت را آنلاین پیگیری کنم؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'از طریق سامانه خسارت دامون می‌توانید مدارک و مستندات حادثه را بارگذاری کرده و وضعیت پرونده را در هر مرحله مشاهده کنید. تیم پشتیبانی ۲۴ ساعته همراه شماست.',
        },
      },
    ],
  };

  return (
    <div
      className='insurance-guide'
      style={{
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Vazirmatn, Arial, sans-serif',
      }}
      dir='rtl'
    >
      <Helmet>
        <script type='application/ld+json'>{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      {/* Enhanced Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          مراحل ساده و سریع دریافت بیمه‌نامه از دامون
        </p>
      </div>

      {/* Step-by-step Guide */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}
      >
        {[
          {
            step: 1,
            title: 'ثبت‌نام و تکمیل اطلاعات',
            description: 'ثبت نام در سامانه و وارد کردن اطلاعات شخصی به صورت دقیق و کامل',
            icon: 'شخص',
            color: '#f66e20',
          },
          {
            step: 2,
            title: 'انتخاب نوع بیمه',
            description: 'انتخاب نوع بیمه مورد نیاز: شخص ثالث، بدنه، درمان، عمر، حادثه و...',
            icon: 'بیمه',
            color: '#616161',
          },
          {
            step: 3,
            title: 'بارگذاری مدارک',
            description: 'ارسال مدارک مورد نیاز: کارت ملی، گواهینامه، بیمه‌نامه قبلی و سایر مدارک',
            icon: 'مدارک',
            color: '#f66e20',
          },
          {
            step: 4,
            title: 'بررسی کارشناسان',
            description: 'بررسی و تایید اطلاعات و مدارک توسط تیم متخصص کارشناسان دامون',
            icon: 'بررسی',
            color: '#424242',
          },
          {
            step: 5,
            title: 'پرداخت حق بیمه',
            description: 'دریافت پیامک تایید، مشاهده قیمت نهایی و پرداخت آنلاین حق بیمه',
            icon: 'پرداخت',
            color: '#e55b0f',
          },
          {
            step: 6,
            title: ' دریافت بیمه‌نامه',
            description: 'صدور بیمه‌نامه و ارسال فوری به آدرس ثبت شده یا دریافت آنلاین',
            color: '#9e9e9e',
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: `2px solid ${item.color}20`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = item.color;
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = `${item.color}20`;
            }}
          >
            {/* Step Number */}
            <div
              style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: item.color,
                color: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              {item.step}
            </div>

            {/* Background Icon */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '3rem',
                opacity: '0.1',
                color: item.color,
              }}
            >
              {item.icon}
            </div>

            <div style={{ paddingTop: '1rem' }}>
              <h3
                style={{
                  color: item.color,
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: '#666',
                  lineHeight: '1.6',
                  fontSize: '1rem',
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Important Tips Section */}
      <div
        style={{
          padding: '2.5rem',
          margin: '3rem 0',
        }}
      >

        <h3
          style={{
            marginBottom: '2rem',
            color: '#212121',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          نکات طلایی برای بیمه‌گزاران
        </h3>

        {(() => {
          const importantTips = [
            {
              key: 'accuracy',
              title: 'دقت در وارد کردن اطلاعات',
              desc: 'هر فیلد با جزئیات کامل تکمیل شود، مسیر تایید کاملاً دیجیتال می‌ماند و بیمه‌نامه بدون وقفه صادر می‌شود.',
              highlight: true,
              tone: 'warm',
              badge: 'اولویت اصلی',
              note: 'از اطلاعات مندرج در کارت ملی و سند خودرو کپی کنید تا خطاهای تایپی صفر شود.',
            },
            {
              key: 'quality',
              title: 'کیفیت تصاویر ارسالی',
              desc: 'تصاویر واضح با پس‌زمینه خنثی، بررسی مدارک را آنی می‌کند و نیازی به مراجعه حضوری نمی‌ماند.',
              highlight: true,
              tone: 'cool',
              badge: 'بررسی سریع',
              note: 'نور طبیعی یا سفید، زاویه عمودی و حداقل وضوح ۱۰۸۰p را انتخاب کنید.',
            },
            {
              key: 'support',
              title: 'همراهی کارشناس دامون',
              desc: 'در هر قدم کافی است از پشتیبانی بخواهید فرم و مدارک شما را قبل از ارسال نهایی مرور کند.',
              highlight: false,
              tone: 'neutral',
            },
            {
              key: 'review',
              title: 'بازبینی بیمه‌نامه نهایی',
              desc: 'پس از دریافت نسخه دیجیتال، شماره شاسی و تاریخ اعتبار را کنترل کنید تا در صورت نیاز، اصلاح در همان روز انجام شود.',
              highlight: false,
              tone: 'neutral',
            },
          ];

          const palette = {
            warm: {
              gradient: 'linear-gradient(140deg, #CB6D51 0%, rgba(203, 109, 81, 0.85) 40%, rgba(165, 169, 172, 0.7) 100%)',
              foreground: '#ffffff',
              chip: 'rgba(255, 255, 255, 0.2)',
              stroke: 'rgba(203, 109, 81, 0.55)',
              shadow: {
                base: '0 20px 45px rgba(203, 109, 81, 0.35)',
                hover: '0 26px 60px rgba(203, 109, 81, 0.45)',
              },
            },
            cool: {
              gradient: 'linear-gradient(145deg, #a5a9ac 0%, rgba(165, 169, 172, 0.92) 45%, rgba(203, 109, 81, 0.35) 100%)',
              foreground: 'rgba(203, 109, 81, 0.95)',
              chip: 'rgba(203, 109, 81, 0.2)',
              stroke: 'rgba(165, 169, 172, 0.55)',
              shadow: {
                base: '0 18px 38px rgba(165, 169, 172, 0.28)',
                hover: '0 24px 52px rgba(165, 169, 172, 0.35)',
              },
            },
            neutral: {
              gradient: 'linear-gradient(145deg, rgba(165, 169, 172, 0.14) 0%, rgba(203, 109, 81, 0.12) 100%)',
              foreground: 'rgba(203, 109, 81, 0.9)',
              chip: 'rgba(165, 169, 172, 0.25)',
              stroke: 'rgba(165, 169, 172, 0.35)',
              shadow: {
                base: '0 12px 28px rgba(165, 169, 172, 0.22)',
                hover: '0 20px 36px rgba(203, 109, 81, 0.28)',
              },
            },
          };

          const featureTips = importantTips.filter(tip => tip.highlight);
          const secondaryTips = importantTips.filter(tip => !tip.highlight);

          return (
            <div
              style={{
                display: 'grid',
                gap: '2rem',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.8rem',
                }}
              >
                {featureTips.map(tip => {
                  const theme = palette[tip.tone];

                  return (
                    <div
                      key={tip.key}
                      style={{
                        position: 'relative',
                        padding: '2.2rem',
                        borderRadius: '28px',
                        background: theme.gradient,
                        color: theme.foreground,
                        boxShadow: theme.shadow.base,
                        border: `1px solid ${theme.stroke}`,
                        overflow: 'hidden',
                        transition: 'all 0.35s ease',
                        transform: 'translateY(0)',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = theme.shadow.hover;
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = theme.shadow.base;
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: '0',
                          background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 55%)',
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          marginBottom: '1.2rem',
                        }}
                      >
                        <span
                          style={{
                            background: theme.chip,
                            color: theme.foreground,
                            padding: '0.35rem 1rem',
                            borderRadius: '999px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                          }}
                        >
                          {tip.badge}
                        </span>
                      </div>
                      <h4
                        style={{
                          fontSize: '1.35rem',
                          marginBottom: '0.9rem',
                          fontWeight: 800,
                        }}
                      >
                        {tip.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '1rem',
                          lineHeight: '1.75',
                          marginBottom: '1.4rem',
                          color: theme.foreground,
                        }}
                      >
                        {tip.desc}
                      </p>
                      <div
                        style={{
                          padding: '1rem',
                          borderRadius: '18px',
                          background: 'rgba(255, 255, 255, 0.12)',
                          backdropFilter: 'blur(6px)',
                          color: theme.foreground,
                          fontSize: '0.95rem',
                          lineHeight: '1.6',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16)',
                        }}
                      >
                        {tip.note}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {secondaryTips.map(tip => {
                  const theme = palette[tip.tone];

                  return (
                    <div
                      key={tip.key}
                      style={{
                        padding: '1.6rem',
                        borderRadius: '22px',
                        background: theme.gradient,
                        color: theme.foreground,
                        border: `1px solid ${theme.stroke}`,
                        boxShadow: theme.shadow.base,
                        transition: 'all 0.3s ease',
                        transform: 'translateY(0)',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = theme.shadow.hover;
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = theme.shadow.base;
                      }}
                    >
                      <h5
                        style={{
                          fontSize: '1.15rem',
                          marginBottom: '0.6rem',
                          fontWeight: 700,
                          color: theme.foreground,
                        }}
                      >
                        {tip.title}
                      </h5>
                      <p
                        style={{
                          fontSize: '0.95rem',
                          lineHeight: '1.7',
                          color: theme.foreground,
                        }}
                      >
                        {tip.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>

    </div>
  );
}
