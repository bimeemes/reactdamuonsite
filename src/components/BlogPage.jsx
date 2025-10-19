import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import fm from 'front-matter';
import './BlogPage.css';

const mdFiles = import.meta.glob('../blog-posts/*.md', { query: '?raw', import: 'default' });

function extractSummary(content) {
  // Return first non-empty paragraph after frontmatter
  const lines = content.split('\n').filter(l => l.trim());
  for (let i = 0; i < lines.length; ++i) {
    if (!lines[i].startsWith('---')) {
      return lines[i].slice(0, 120) + (lines[i].length > 120 ? '...' : '');
    }
  }
  return '';
}

const palette = {
  primary: '#CB6D51',
  secondary: '#a5a9ac',
  primaryGlass: 'rgba(203, 109, 81, 0.12)',
  secondaryGlass: 'rgba(165, 169, 172, 0.18)',
  dark: '#2f3031',
};

const quickInsights = [
  {
    title: 'رشد ۲۸٪ی بازدید بلاگ',
    detail: 'مقالات راهبردی بیمه شخص ثالث و خسارت آنلاین بیشترین بازدید را داشته‌اند.',
  },
  {
    title: 'میانگین مطالعه ۶ دقیقه',
    detail: 'کاربران برای مقالات دارای چک‌لیست و مثال‌های واقعی، زمان بیشتری صرف می‌کنند.',
  },
  {
    title: '۳۷٪ ذخیره هزینه خسارت',
    detail: 'پیروی از راهنمای خسارت آنلاین، پردازش پرونده را شفاف‌تر و اقتصادی‌تر کرده است.',
  },
];

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');

  useEffect(() => {
    (async () => {
      const loaded = await Promise.all(
        Object.entries(mdFiles).map(async ([path, loader]) => {
          const raw = await loader();
          // Use front-matter (no eval, safer)
          const parsed = fm(raw);
          const data = parsed.attributes;
          const content = parsed.body;
          const id = path.match(/(\\|\/)blog-posts(\\|\/)([\w-]+)\.md$/)[3];
          const tags = Array.isArray(data.tags)
            ? data.tags
            : typeof data.tags === 'string'
              ? data.tags.split(',').map(t => t.trim())
              : [];
          return {
            id,
            title: data.title,
            date: data.date,
            image: data.image,
            summary: extractSummary(content),
            tags,
            category: data.category || (tags.length > 0 ? tags[0] : 'سایر موضوعات'),
            featured: data.featured === true || data.featured === 'true',
            readTime: data.readTime || '۵ دقیقه مطالعه',
            author: data.author || 'تحریریه دامون',
            tagLine: data.tagLine || 'مقاله ویژه دامون',
          };
        })
      );
      // Sort by date descending
      loaded.sort((a, b) => (a.date < b.date ? 1 : -1));
      if (!loaded.some(post => post.featured) && loaded.length > 0) {
        // Mark the latest two posts as featured when none flagged
        loaded.slice(0, Math.min(2, loaded.length)).forEach(post => {
          post.featured = true;
        });
      }
      setPosts(loaded);
      // Collect all unique tags
      const tagSet = new Set();
      loaded.forEach(post => post.tags && post.tags.forEach(tag => tagSet.add(tag)));
      setAllTags(Array.from(tagSet));
    })();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(posts.map(post => post.category));
    return ['همه', ...Array.from(unique)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const searchLower = search.trim().toLowerCase();
    return posts.filter(post => {
      const matchesTag = selectedTag ? post.tags && post.tags.includes(selectedTag) : true;
      const matchesCategory =
        selectedCategory === 'همه' || post.category === selectedCategory;
      const matchesSearch =
        !searchLower ||
        post.title.toLowerCase().includes(searchLower) ||
        (post.summary && post.summary.toLowerCase().includes(searchLower)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchLower)));
      return matchesTag && matchesCategory && matchesSearch;
    });
  }, [posts, selectedTag, selectedCategory, search]);

  const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog` : 'https://damuon.com/blog';
  const siteOrigin = pageUrl.replace(/\/blog$/, '');

  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'بلاگ کارگزاری دامون',
    description:
      'مقالات تخصصی درباره بیمه شخص ثالث، بدنه، درمان، زندگی و تجربه‌های دیجیتال‌سازی خدمات بیمه‌ای.',
    url: pageUrl,
    inLanguage: 'fa-IR',
    blogPost: filteredPosts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      description: post.summary,
      url: `${siteOrigin}/blog/${post.id}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'خانه',
        item: siteOrigin || 'https://damuon.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'بلاگ',
        item: pageUrl,
      },
    ],
  };

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
      <Helmet>
        <title>بلاگ دامون | تحلیل‌ها و تجربه‌های آنلاین بیمه</title>
        <meta
          name='description'
          content='آخرین تحلیل‌ها، راهنمایی‌ها و تجربه‌های واقعی بیمه‌ای از تیم دامون. با جستجوی هوشمند و فیلترهای دقیق، محتوای مورد نیاز خود را پیدا کنید.'
        />
        <meta property='og:title' content='بلاگ دامون | تحلیل‌ها و تجربه‌های آنلاین بیمه' />
        <meta
          property='og:description'
          content='مقالات تخصصی درباره بیمه شخص ثالث، بدنه، درمان و خسارت آنلاین با نگاه دیتا محور دامون.'
        />
        <meta property='og:url' content={pageUrl} />
        <meta property='og:type' content='website' />
        <link rel='canonical' href={pageUrl} />
        <script type='application/ld+json'>{JSON.stringify(blogListJsonLd)}</script>
        <script type='application/ld+json'>{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
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
            در اینجا آخرین تجربه‌های دیجیتال‌سازی بیمه، راهکارهای کاهش زمان تایید، و چک‌لیست‌های دقیق
            برای خرید و تمدید بیمه‌نامه را پیدا می‌کنید.
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
              value={search}
              onChange={event => setSearch(event.target.value)}
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
        {allTags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              marginTop: '1.2rem',
            }}
          >
            <span
              onClick={() => setSelectedTag(null)}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '999px',
                cursor: 'pointer',
                background: selectedTag === null ? palette.primary : palette.primaryGlass,
                color: selectedTag === null ? '#fff' : palette.primary,
                fontWeight: selectedTag === null ? 700 : 500,
              }}
            >
              همه برچسب‌ها
            </span>
            {allTags.map(tag => {
              const active = selectedTag === tag;
              return (
                <span
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  style={{
                    padding: '0.45rem 1.1rem',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    background: active ? palette.primary : 'rgba(255,255,255,0.6)',
                    color: active ? '#fff' : palette.dark,
                    border: `1px solid ${palette.primary}33`,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}
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
                  <div style={{ marginTop: '1.6rem' }}>
                    <Link
                      to={`/blog/${post.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: palette.primary,
                        fontWeight: 700,
                        background: '#fff',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '12px',
                      }}
                    >
                      مطالعه کامل مقاله
                    </Link>
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
                  {post.tags && post.tags.slice(0, 2).map(tag => (
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
                <div>
                  <Link
                    to={`/blog/${post.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: palette.primary,
                      fontWeight: 700,
                    }}
                  >
                    ادامه مطلب
                  </Link>
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
};

export default BlogPage;
