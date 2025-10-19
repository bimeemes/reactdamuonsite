import React from 'react';
import { Helmet } from 'react-helmet-async';

const defaultOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://damuon.com';

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'کارگزاری رسمی بیمه مستقیم برخط آتیه اندیشان دامون',
  url: defaultOrigin,
  logo: `${defaultOrigin}/images/alreadydamoun.png`,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+98-21-1234-5678',
      contactType: 'customer service',
      areaServed: 'IR',
      availableLanguage: ['fa', 'en'],
    },
  ],
};

const searchActionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'کارگزاری دامون',
  url: defaultOrigin,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${defaultOrigin}/blog?query={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const SeoDefaults = () => (
  <Helmet>
    <html lang='fa' dir='rtl' />
    <title>کارگزاری دامون | خرید، تمدید و مدیریت آنلاین بیمه</title>
    <meta
      name='description'
      content='کارگزاری دامون با ارائه خدمات آنلاین بیمه، از خرید تا تمدید و خسارت، همراه شما است. پشتیبانی ۲۴ ساعته و راهکارهای تخصصی برای بیمه‌های شخص ثالث، بدنه، درمان و زندگی.'
    />
    <meta
      name='keywords'
      content='بیمه آنلاین, کارگزاری بیمه, بیمه شخص ثالث, بیمه بدنه, بیمه درمان, خسارت آنلاین, دامون'
    />
    <meta name='author' content='کارگزاری رسمی بیمه دامون' />
    <meta name='theme-color' content='#CB6D51' />
  <meta property='og:site_name' content='کارگزاری بیمه دامون' />
  <meta property='og:locale' content='fa_IR' />
  <meta property='og:locale:alternate' content='en_US' />
    <meta property='og:type' content='website' />
    <meta property='og:title' content='کارگزاری دامون | خدمات آنلاین بیمه' />
    <meta
      property='og:description'
      content='پوشش کامل خدمات بیمه‌ای به صورت آنلاین؛ از ثبت درخواست تا پیگیری خسارت با تیم متخصص دامون.'
    />
    <meta property='og:url' content={defaultOrigin} />
    <meta property='og:image' content={`${defaultOrigin}/images/alreadydamoun.png`} />
    <meta name='twitter:card' content='summary_large_image' />
  <meta name='twitter:site' content='@damoun_insurance' />
  <meta name='twitter:title' content='کارگزاری دامون' />
    <meta
      name='twitter:description'
      content='با دامون بیمه را آسان، سریع و آنلاین مدیریت کنید.'
    />
    <meta name='twitter:image' content={`${defaultOrigin}/images/alreadydamoun.png`} />
    <link rel='canonical' href={`${defaultOrigin}/`} />
    <link rel='alternate' hrefLang='fa' href={`${defaultOrigin}/`} />
    <script type='application/ld+json'>{JSON.stringify(siteJsonLd)}</script>
    <script type='application/ld+json'>{JSON.stringify(searchActionJsonLd)}</script>
  </Helmet>
);

export default SeoDefaults;
