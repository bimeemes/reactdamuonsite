import React from 'react';
import { FloatingElementsAnimation } from './ProfessionalLottieAnimations';
import CosmicOrbit from './CosmicOrbit';

export default function Home() {
  return (
    <div
      className='home-hero'
      style={{
        padding: '1.5rem 1rem 2rem',
        fontFamily: 'Vazirmatn, Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        borderRadius: '2rem',
      }}
    >
      {/* Floating Background Animation */}
      <CosmicOrbit />
      <FloatingElementsAnimation />

      {/* Enhanced Hero Section */}
      <div
        style={{
          padding: '1.5rem',
          width: '100%',
          maxWidth: '1200px',
          marginBottom: '1rem',
          animation: 'fadeInGlass 1.2s',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {/* Call to Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <button
            style={{
              background: 'linear-gradient(135deg, #f66e20 0%, #e55b0f 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '200px',
              boxShadow: '0 4px 15px rgba(246, 110, 32, 0.3)',
            }}
            onMouseOver={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(246, 110, 32, 0.4)';
            }}
            onMouseOut={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(246, 110, 32, 0.3)';
            }}
            onClick={() => {
              const systemsElement = document.getElementById('systems-section');
              if (systemsElement) {
                systemsElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            شروع خدمات آنلاین
          </button>
          <button
            style={{
              background: 'transparent',
              color: '#f66e20',
              border: '2px solid #f66e20',
              borderRadius: '50px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '200px',
            }}
            onMouseOver={e => {
              e.target.style.background = '#f66e20';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={e => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#f66e20';
              e.target.style.transform = 'translateY(0)';
            }}
            onClick={() => {
              const contactElement = document.getElementById('contact-section');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            تماس با ما
          </button>
        </div>
        <style>
          {`
				@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;900&display=swap');
				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}
				@keyframes fadeInGlass {
					from { opacity: 0; transform: translateY(40px) scale(0.98); }
					to { opacity: 1; transform: translateY(0) scale(1); }
				}
			`}
        </style>
      </div>
    </div>
  );
}
