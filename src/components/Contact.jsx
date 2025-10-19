import React, { useMemo, useState } from 'react';
import './Contact.css';
import tehran from '../assets/Tehran.jpg';
import sungoon from '../assets/sungoon.jpeg';
import sarcheshmeh from '../assets/Sarcheshmeh.jpeg';
import rafsenjan from '../assets/rafsenjan.jpeg';
import { Helmet } from 'react-helmet-async';

const branches = [
  {
    id: 'tehran',
    name: 'شعبه تهران',
    description: 'دفتر مرکزی',
    image: tehran,
    address: 'تهران - خیابان خالد اسلامبولی (وزرا)، کوچه رفیعی(بیستم)، پلاک 22، واحد 1 و 2',
    phone: '57389000-021',
    position: 'top-right'
  },
  {
    id: 'sungoon',
    name: 'شعبه سونگون',
    description: 'آذربایجان شرقی',
    image: sungoon,
    address: 'تبریز - مجتمع مس سونگون - پشتیبانی معدن - جنب بانک تجارت',
    phone: '44540563-041',
    position: 'top-left'
  },
  {
    id: 'sarcheshmeh',
    name: 'شعبه سرچشمه',
    description: 'کرمان',
    image: sarcheshmeh,
    address: 'کرمان - شهر مس سرچشمه - بلوار امام خمینی - سه راه سرمایه گذاری',
    phone: '34312336-034',
    position: 'bottom-left'
  },
  {
    id: 'rafsenjan',
    name: 'شعبه رفسنجان',
    description: 'کرمان',
    image: rafsenjan,
    address: 'کرمان - شهر رفسنجان - میدان شهربانی - خیابان عدالت - بین کوچه پنجم و هفتم',
    phone: '09120043733',
    position: 'bottom-right'
  },
];

const extraContacts = [
  { label: 'شماره همراه بخش صدور کلیه رشته ها', value: '09208874574' },
  { label: 'شماره همراه بخش خسارت بیمه های درمان', value: '09939536707' },
  { label: 'پست الکترونیک', value: 'bimeemes@gmail.com' },
];

const branchPhonesIntl = {
  tehran: '+98-21-5738-90000',
  sungoon: '+98-41-4454-0563',
  sarcheshmeh: '+98-34-3431-2336',
  rafsenjan: '+98-912-004-3733',
};

const Contact = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);

  const defaultOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://damuon.com';

  const structuredData = useMemo(() => {
    const resolvedOrigin =
      defaultOrigin.includes('localhost') || defaultOrigin.includes('127.0.0.1')
        ? 'https://damuon.com'
        : defaultOrigin;

    return {
      '@context': 'https://schema.org',
      '@type': 'InsuranceAgency',
      '@id': `${resolvedOrigin}#/contact`,
      name: 'کارگزاری رسمی بیمه مستقیم برخط آتیه اندیشان دامون',
      url: `${resolvedOrigin}/#contact`,
      image: `${resolvedOrigin}/images/alreadydamoun.png`,
      telephone: '+98-21-5738-90000',
      email: 'bimeemes@gmail.com',
      priceRange: 'IRR',
      address: {
        '@type': 'PostalAddress',
        streetAddress:
          'تهران - خیابان خالد اسلامبولی (وزرا) - کوچه بیستم (رفیعی) - پلاک 22 - واحد 1',
        addressLocality: 'تهران',
        addressRegion: 'تهران',
        postalCode: '1514734631',
        addressCountry: 'IR',
      },
      areaServed: 'IR',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: '+98-921-008-75474',
          areaServed: 'IR',
          availableLanguage: ['fa'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'claims',
          telephone: '+98-993-953-6707',
          areaServed: 'IR',
          availableLanguage: ['fa'],
        },
      ],
      department: branches.map(branch => ({
        '@type': 'InsuranceAgency',
        name: branch.name,
        description: branch.description,
        parentOrganization: 'کارگزاری رسمی بیمه مستقیم برخط آتیه اندیشان دامون',
        url: `${resolvedOrigin}/#${branch.id}`,
        telephone:
          branchPhonesIntl[branch.id] ||
          (branch.phone
            ? `+98-${branch.phone.replace(/[^0-9]/g, '').replace(/^0/, '')}`
            : undefined),
        address: {
          '@type': 'PostalAddress',
          streetAddress: branch.address,
          addressCountry: 'IR',
        },
      })),
    };
  }, [defaultOrigin]);

  return (
    <div className='contact-container' dir='rtl'>
      <Helmet>
        <title>تماس با کارگزاری بیمه دامون | شعب و راه‌های ارتباطی</title>
        <meta
          name='description'
          content='اطلاعات تماس و آدرس شعب کارگزاری بیمه دامون در سراسر کشور. دفتر مرکزی تهران و شعب سونگون، سرچشمه و رفسنجان با شماره‌های پشتیبانی و صدور بیمه.'
        />
        <meta
          name='keywords'
          content='تماس بیمه دامون, شعب بیمه مس, شماره تماس کارگزاری بیمه, آدرس کارگزاری دامون'
        />
        <script type='application/ld+json'>{JSON.stringify(structuredData)}</script>
      </Helmet>
      
      {/* Simple Corner Circles */}
      <div 
        className="corner-circle top-right"
        onMouseEnter={() => setSelectedBranch(branches[0])}
        onMouseLeave={() => setSelectedBranch(null)}
      >
        <img src={tehran} alt="شعبه تهران" />
      </div>
      
      <div 
        className="corner-circle top-left"
        onMouseEnter={() => setSelectedBranch(branches[1])}
        onMouseLeave={() => setSelectedBranch(null)}
      >
        <img src={sungoon} alt="شعبه سونگون" />
      </div>
      
      <div 
        className="corner-circle bottom-left"
        onMouseEnter={() => setSelectedBranch(branches[2])}
        onMouseLeave={() => setSelectedBranch(null)}
      >
        <img src={sarcheshmeh} alt="شعبه سرچشمه" />
      </div>
      
      <div 
        className="corner-circle bottom-right"
        onMouseEnter={() => setSelectedBranch(branches[3])}
        onMouseLeave={() => setSelectedBranch(null)}
      >
        <img src={rafsenjan} alt="شعبه رفسنجان" />
      </div>

      {/* Central Content */}
      <div className='central-content'>
        <div className='main-title'>
          <p>شعـب بیمـس </p>
        </div>

        {/* Branch Information Display */}
        <div className='branch-info-display'>
          {selectedBranch ? (
            <div className='selected-branch-info'>
              <h2>{selectedBranch.name}</h2>
              <h3>{selectedBranch.description}</h3>
              <div className='branch-details'>
                <div className='detail-item'>
                  <span className='detail-icon'>📍</span>
                  <p>{selectedBranch.address}</p>
                </div>
                <div className='detail-item'>
                  <span className='detail-icon'>📞</span>
                  <p>{selectedBranch.phone}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className='default-info'>
              <p>برای مشاهده اطلاعات هر شعبه، موس را روی گوشه‌های صفحه حرکت دهید</p>
              <div className='corner-indicators'>
                <div className='indicator top-right'>تهران</div>
                <div className='indicator top-left'>سونگون</div>
                <div className='indicator bottom-left'>سرچشمه</div>
                <div className='indicator bottom-right'>رفسنجان</div>
              </div>
            </div>
          )}
        </div>

        {/* Extra Contacts */}
        <div className='extra-contacts-section'>
          <h3>اطلاعات تماس اضافی</h3>
          <div className='extra-contacts-grid'>
            {extraContacts.map((contact, index) => (
              <div key={index} className='extra-contact-card'>
                <strong>{contact.label}</strong>
                <span>{contact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
