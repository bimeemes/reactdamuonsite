import React, { useState, useEffect } from 'react';
import '../styles/BranchImages.css';

const BranchImages = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const branchData = [
    {
      id: 'sarcheshmeh',
      name: 'سرچشمه (کرمان)',
      image: '/src/assets/Sarcheshmeh.jpeg',
      description: 'شعبه خدمات معدنی و صنعتی',
      address: 'کرمان - شهر مس سرچشمه - بلوار امام خمینی - سه راه سرمایه گذاری',
      phone: '34312336-034',
      position: 'left',
      index: 0
    },
    {
      id: 'rafsenjan',
      name: 'رفسنجان (کرمان)',
      image: '/src/assets/rafsenjan.jpeg',
      description: 'مرکز خدمات کشاورزی و تجاری',
      address: 'کرمان - شهر رفسنجان - میدان شهربانی - خیابان عدالت - بین کوچه پنجم و هفتم',
      phone: '09120043733',
      position: 'left',
      index: 1
    },
    {
      id: 'tehran',
      name: 'تهران',
      image: '/src/assets/Tehran.jpg',
      description: 'دفتر مرکزی و مدیریت',
      address: 'تهران - خیابان خالد اسلامبولی (وزرا)، کوچه رفیعی(بیستم)، پلاک 22، واحد 1 و 2',
      phone: '57389000-021',
      position: 'right',
      index: 2
    },
    {
      id: 'sungoon',
      name: 'سونگون (آذربایجان شرقی)',
      image: '/src/assets/sungoon.jpeg',
      description: 'مرکز پشتیبانی عملیات معدنی',
      address: 'تبریز - مجتمع مس سونگون - پشتیبانی معدن - جنب بانک تجارت',
      phone: '44540563-041',
      position: 'right',
      index: 3
    }
  ];

  // Map each branch to a corner: TL, TR, BL, BR
  const corners = [
    { branch: branchData[0], className: 'half-circle top-left' },
    { branch: branchData[1], className: 'half-circle bottom-left' },
    { branch: branchData[2], className: 'half-circle top-right' },
    { branch: branchData[3], className: 'half-circle bottom-right' },
  ];

  return (
    <div className="branch-images-corners-container">
      {corners.map(({ branch, className }) => (
        <div key={branch.id} className={className} title={branch.name}>
          <div className="half-circle-image-wrapper">
            <img src={branch.image} alt={branch.name} className="half-circle-image" />
            <div className="half-circle-info">
              <div className="half-circle-name">{branch.name}</div>
              <div className="half-circle-desc">{branch.description}</div>
              <div className="half-circle-address">{branch.address}</div>
              <div className="half-circle-phone">{branch.phone}</div>
            </div>
          </div>
        </div>
      ))}
      {/* Central Logo/Title */}
      <div className="central-element">
        <div className="central-content">
          <h2 className="central-title">شعب دامون</h2>
          <p className="central-subtitle">در سراسر ایران</p>
          <div className="central-decoration">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle 
                cx="40" 
                cy="40" 
                r="35" 
                fill="none" 
                stroke="rgba(203, 109, 81, 0.6)" 
                strokeWidth="2"
                strokeDasharray="3,3"
                className="rotating-circle"
              />
              <circle 
                cx="40" 
                cy="40" 
                r="20" 
                fill="rgba(203, 109, 81, 0.1)" 
                stroke="rgba(203, 109, 81, 0.8)" 
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchImages;