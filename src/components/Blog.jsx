import React, { useMemo, useState } from 'react';

const palette = {
  primary: '#CB6D51',
  secondary: '#a5a9ac',
  primaryGlass: 'rgba(203, 109, 81, 0.12)',
  secondaryGlass: 'rgba(165, 169, 172, 0.18)',
  dark: '#2f3031',
};

const posts = [
  {
    id: 1,
    title: 'راهنمای کامل بیمه شخص ثالث در سال ۱۴۰۴',
    summary:
      'چگونه با آماده‌سازی مدارک و انتخاب پوشش مناسب، نرخ نهایی بیمه شخص ثالث را بهینه کنیم.',
    category: 'آموزش بیمه',
    date: '۱۵ مهر ۱۴۰۴',
    readTime: '۷ دقیقه مطالعه',
    author: 'تیم تحریریه دامون',
    featured: true,
    tagLine: 'چک‌لیست دریافت سریع',
    tags: ['بیمه شخص ثالث', 'چک‌لیست مدارک'],
  },
  {
    id: 2,
    title: '۵ نکته طلایی برای دیجیتالی کردن درخواست خسارت',
    summary:
      'از ثبت اسناد تصویری تا پیگیری آنلاین، این نکات به شما کمک می‌کند خسارت را بدون مراجعه حضوری دریافت کنید.',
    category: 'خسارت آنلاین',
    date: '۲۷ شهریور ۱۴۰۴',
    readTime: '۵ دقیقه مطالعه',
    author: 'پگاه کرمی',
    featured: true,
    tagLine: 'فرآیند الکترونیک',
    tags: ['خسارت', 'فرآیند دیجیتال'],
  },
  {
    id: 3,
    title: 'چطور بیمه بدنه را با بودجه محدود تهیه کنیم؟',
    summary:
      'مقایسه پوشش‌های اصلی و اختیاری به همراه محاسبه سناریوی صرفه‌جویی برای خودروهای کارکرده.',
    category: 'تحلیل محصول',
    date: '۹ شهریور ۱۴۰۴',
    readTime: '۶ دقیقه مطالعه',
    author: 'امیرعلی شریفی',
    featured: false,
    tags: ['بیمه بدنه', 'برنامه‌ریزی مالی'],
  },
  {
    id: 4,
    title: 'بیمه درمان خانواده: پوشش‌های حیاتی که نباید فراموش کنید',
    summary:
      'بررسی پوشش زایمان، دندان‌پزشکی و بیماری‌های خاص با مثال‌های واقعی از پرونده‌های دامون.',
    category: 'سلامت و درمان',
    date: '۲۲ مرداد ۱۴۰۴',
    readTime: '۸ دقیقه مطالعه',
    author: 'تیم سلامت دامون',
    featured: false,
    tags: ['بیمه درمان', 'پوشش خانواده'],
  },
  {
    id: 5,
    title: 'چگونه بیمه زندگی را به استراتژی مالی خود اضافه کنیم؟',
    summary:
      'از سرمایه‌گذاری تا پوشش عمر؛ جدول مقایسه‌ای مزایا و زمان‌بندی پرداخت‌های هوشمند.',
    category: 'سرمایه‌گذاری بیمه‌ای',
    date: '۱۰ مرداد ۱۴۰۴',
    readTime: '۹ دقیقه مطالعه',
    author: 'مهسا نعمتی',
    featured: false,
    tags: ['بیمه زندگی', 'برنامه مالی'],
  },
  {
    id: 6,
    title: 'چک‌لیست آماده‌سازی برای تمدید بیمه‌نامه',
    summary:
      '۳ روز قبل از اتمام بیمه چه کارهایی انجام دهیم تا تمدید ما بدون وقفه ثبت شود؟',
    category: 'چک‌لیست کاربردی',
    date: '۲ مرداد ۱۴۰۴',
    readTime: '۴ دقیقه مطالعه',
    author: 'تیم تجربه مشتری',
    featured: false,
    tags: ['تمدید بیمه', 'چک‌لیست'],
  },
];

const quickInsights = [
  {
    title: 'میزان رضایت ۹۲ درصدی کاربران جدید',
    detail: 'کاربران پس از بارگذاری دیجیتال مدارک، تجربه رضایت‌بخش‌تری گزارش کرده‌اند.',
  },
  {
    title: 'میانگین زمان تایید: ۴ ساعت',
    detail: 'با ارسال دقیق اطلاعات، تیم کارشناسی دامون در کمترین زمان پاسخ می‌دهد.',
  },
  {
    title: '۳۷٪ صرفه‌جویی در هزینه خسارت',
    detail: 'کاربرانی که راهنمای خسارت آنلاین را دنبال کردند، کاهش هزینه قابل‌توجهی داشتند.',
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    const unique = new Set(posts.map(post => post.category));
    return ['همه', ...Array.from(unique)];
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory =
        selectedCategory === 'همه' || post.category === selectedCategory;
      const matchesSearch =
        !searchTerm.trim() ||
        post.title.includes(searchTerm) ||
        post.summary.includes(searchTerm) ||
        post.tags.some(tag => tag.includes(searchTerm));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const featuredPosts = useMemo(
    () => filteredPosts.filter(post => post.featured),
    [filteredPosts],
  );

  const regularPosts = useMemo(
    () => filteredPosts.filter(post => !post.featured),
    [filteredPosts],
  );

  return (
    <div
      style={{
        padding: '4rem 2rem',
        maxWidth: '1180px',
        margin: '0 auto',
        fontFamily: 'Vazirmatn, Arial, sans-serif',
      }}
      dir='rtl'
    >
      <section
        style={{
          background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
          borderRadius: '28px',
          padding: '3.5rem 3rem',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0%, transparent 55%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.18)',
              padding: '0.5rem 1.2rem',
              borderRadius: '999px',
              fontSize: '0.95rem',
              marginBottom: '1.5rem',
            }}
          >
            <span role='img' aria-label='spark'>✨</span>
            تازه‌ترین تحلیل‌های بیمه‌ای دامون
          </span>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '1.2rem', fontWeight: 800 }}>
            بلاگ دامون: یادگیری، تحلیل و تجربه‌های واقعی بیمه‌ای
          </h1>
          <p style={{ maxWidth: '720px', lineHeight: '1.8', fontSize: '1.05rem' }}>
            در اینجا آخرین تجربه‌های دیجیتال‌سازی بیمه، راهکارهای کاهش زمان تایید،
            و چک‌لیست‌های دقیق برای خرید و تمدید بیمه‌نامه را پیدا می‌کنید.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {categories.map(category => {
              const isActive = category === selectedCategory;
              return (
                <button
                  key={category}
                  type='button'
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '0.65rem 1.4rem',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: 'pointer',
                    background: isActive ? palette.primary : palette.secondaryGlass,
                    color: isActive ? '#fff' : palette.dark,
                    fontWeight: isActive ? 700 : 500,
                    transition: 'all 0.25s ease',
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: palette.secondaryGlass,
              padding: '0.6rem 1rem',
              borderRadius: '16px',
            }}
          >
            <span role='img' aria-label='search' style={{ fontSize: '1.2rem' }}>
              🔎
            </span>
            <input
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              type='text'
              placeholder='جستجو در عنوان، خلاصه یا برچسب‌ها'
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.95rem',
                minWidth: '240px',
              }}
            />
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.8rem',
            }}
          >
            {featuredPosts.map(post => (
              <article
                key={post.id}
                style={{
                  background: palette.primaryGlass,
                  borderRadius: '26px',
                  padding: '2.2rem',
                  border: `1px solid ${palette.primary}44`,
                  boxShadow: '0 18px 40px rgba(203, 109, 81, 0.22)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '0',
                    background:
                      'linear-gradient(135deg, rgba(203,109,81,0.32) 0%, rgba(203,109,81,0) 60%)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span
                    style={{
                      padding: '0.35rem 0.9rem',
                      background: '#fff',
                      color: palette.primary,
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      marginBottom: '1.2rem',
                    }}
                  >
                    <span role='img' aria-label='flag'>🚀</span>
                    {post.tagLine}
                  </span>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      marginBottom: '1rem',
                      color: palette.dark,
                      fontWeight: 800,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p style={{ color: palette.dark, lineHeight: '1.8', marginBottom: '1.4rem' }}>
                    {post.summary}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.8rem',
                      color: palette.dark,
                      fontSize: '0.88rem',
                    }}
                  >
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginBottom: '3rem' }}>
        <header style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', color: palette.dark, fontWeight: 800 }}>
            آخرین به‌روزرسانی‌ها
          </h3>
          <p style={{ color: palette.secondary, marginTop: '0.4rem', fontSize: '0.95rem' }}>
            مرتباً این بخش را بررسی کنید؛ هر هفته تحلیل تازه‌ای منتشر می‌کنیم.
          </p>
        </header>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.6rem',
          }}
        >
          {regularPosts.length === 0 ? (
            <div
              style={{
                gridColumn: '1 / -1',
                background: palette.secondaryGlass,
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                color: palette.dark,
              }}
            >
              هنوز مقاله‌ای مطابق فیلتر شما منتشر نشده است. فیلتر را تغییر دهید یا به‌زودی دوباره سر بزنید.
            </div>
          ) : (
            regularPosts.map(post => (
              <article
                key={post.id}
                style={{
                  background: '#fff',
                  borderRadius: '22px',
                  padding: '1.8rem',
                  boxShadow: '0 12px 28px rgba(165, 169, 172, 0.24)',
                  border: `1px solid ${palette.secondary}33`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: palette.secondaryGlass,
                      color: palette.dark,
                      padding: '0.3rem 0.8rem',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                    }}
                  >
                    {post.category}
                  </span>
                  {post.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      style={{
                        background: palette.primaryGlass,
                        color: palette.primary,
                        padding: '0.3rem 0.8rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: palette.dark }}>
                  {post.title}
                </h4>
                <p style={{ color: '#4b4d4f', lineHeight: '1.7', flexGrow: 1 }}>{post.summary}</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: palette.secondary,
                    fontSize: '0.85rem',
                  }}
                >
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section
        style={{
          background: '#fff',
          borderRadius: '26px',
          padding: '2.5rem',
          boxShadow: '0 16px 38px rgba(165, 169, 172, 0.25)',
          marginBottom: '3rem',
        }}
      >
        <h3 style={{ fontSize: '1.35rem', color: palette.dark, marginBottom: '1.5rem', fontWeight: 800 }}>
          دیده‌بان داده‌های دامون
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.4rem',
          }}
        >
          {quickInsights.map(insight => (
            <div
              key={insight.title}
              style={{
                background: palette.secondaryGlass,
                borderRadius: '20px',
                padding: '1.6rem',
                border: `1px solid ${palette.secondary}33`,
                backdropFilter: 'blur(4px)',
                color: palette.dark,
              }}
            >
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                {insight.title}
              </h4>
              <p style={{ lineHeight: '1.6', color: '#4b4d4f' }}>{insight.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: palette.primary,
          borderRadius: '26px',
          padding: '2.8rem 2.2rem',
          color: '#fff',
          textAlign: 'center',
          boxShadow: '0 20px 45px rgba(203, 109, 81, 0.3)',
        }}
      >
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
          هر هفته یک بینش تازه دریافت کنید
        </h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
          با عضویت در خبرنامه، خلاصه مهم‌ترین مقالات و چک‌لیست‌های کاربردی را در ایمیل دریافت کنید.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.8rem',
            justifyContent: 'center',
          }}
        >
          <input
            type='email'
            placeholder='ایمیل خود را وارد کنید'
            style={{
              padding: '0.9rem 1.2rem',
              borderRadius: '14px',
              border: 'none',
              minWidth: '260px',
              fontSize: '0.95rem',
            }}
          />
          <button
            type='button'
            style={{
              padding: '0.9rem 1.6rem',
              borderRadius: '14px',
              background: '#fff',
              color: palette.primary,
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            عضویت سریع
          </button>
        </div>
      </section>
    </div>
  );
}
