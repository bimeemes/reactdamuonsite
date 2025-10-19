import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import fm from 'front-matter';
import { marked } from 'marked';
import './BlogPostPage.css';

const mdFiles = import.meta.glob('../blog-posts/*.md', { query: '?raw', import: 'default' });

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fileKey = Object.keys(mdFiles).find(k => k.endsWith(`/${id}.md`));
    if (!fileKey) {
      setNotFound(true);
      return;
    }
    mdFiles[fileKey]().then(raw => {
      // Use front-matter (no eval, safer)
      const parsed = fm(raw);
      const data = parsed.attributes;
      const content = parsed.body;
      // Extract summary: first 150 chars of plain text content
      const plainText = content.replace(/[#*_`>\-\[\]!\(\)]/g, '').replace(/\n+/g, ' ');
      const summary =
        data.summary || plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '');
      setPost({
        title: data.title,
        date: data.date,
        image: data.image,
        summary,
        content: marked.parse(content),
      });
    });
  }, [id]);

  if (notFound) {
    return <div className='blogpost-notfound'>پست مورد نظر یافت نشد.</div>;
  }
  if (!post) {
    return <div className='blogpost-notfound'>در حال بارگذاری...</div>;
  }

  // SEO meta tags
  const pageUrl = window.location.origin + `/blog/${id}`;
  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    image: post.image ? [post.image] : undefined,
    description: post.summary,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: 'دامون',
    },
    publisher: {
      '@type': 'Organization',
      name: 'دامون',
      logo: {
        '@type': 'ImageObject',
        url: window.location.origin + '/images/alreadydamoun.png',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'خانه',
        item: window.location.origin,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'بلاگ',
        item: window.location.origin + '/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  };
  return (
    <>
      <Helmet>
        <title>{post.title} | بلاگ دامون</title>
        <meta name='description' content={post.summary} />
        <meta property='og:title' content={post.title} />
        <meta property='og:description' content={post.summary} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={pageUrl} />
        {post.image && <meta property='og:image' content={post.image} />}
        {post.image && <meta property='og:image:alt' content={post.title} />}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={post.title} />
        <meta name='twitter:description' content={post.summary} />
        {post.image && <meta name='twitter:image' content={post.image} />}
        <link rel='canonical' href={pageUrl} />
        <script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
        <script type='application/ld+json'>{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <div className='blogpost-container' dir='rtl'>
        <Link to='/blog' className='blogpost-back'>
          ← بازگشت به بلاگ
        </Link>
        <h1 className='blogpost-title'>{post.title}</h1>
        <span className='blogpost-date'>{post.date}</span>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            loading='lazy'
            style={{ maxWidth: '100%', borderRadius: '1.2rem', margin: '1.5rem 0' }}
          />
        )}
        <div className='blogpost-content' dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </>
  );
};

export default BlogPostPage;
