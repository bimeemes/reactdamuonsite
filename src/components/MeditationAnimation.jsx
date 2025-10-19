import React, { useState, useEffect } from 'react';

const MeditationAnimation = ({
  size = 200,
  className = '',
  showText = true,
  text = '',
  style = {},
}) => {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load animation data from public folder
    fetch('/animations/mibinamet0.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading meditation animation:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div
        className={`meditation-loading ${className}`}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          color: 'white',
          fontFamily: 'Vazir, Arial, sans-serif',
          ...style,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧘‍♂️</div>
          <div style={{ fontSize: '12px' }}>در حال بارگیری...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`meditation-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        ...style,
      }}
    >
      {/* Lottie Animation */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {animationData && (
          <div
            ref={el => {
              if (el && animationData) {
                // Use vanilla Lottie to avoid import issues
                import('lottie-web')
                  .then(lottie => {
                    lottie.default.loadAnimation({
                      container: el,
                      renderer: 'svg',
                      loop: true,
                      autoplay: true,
                      animationData: animationData,
                    });
                  })
                  .catch(() => {
                    // Fallback if lottie-web is not available
                    el.innerHTML = `
                    <div style="
                      width: 100%; 
                      height: 100%; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      font-size: 48px;
                    ">🧘‍♂️</div>
                  `;
                  });
              }
            }}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>

      {/* Optional Text */}
      {showText && (
        <div
          style={{
            color: '#555',
            fontSize: '16px',
            fontWeight: '500',
            fontFamily: 'Vazir, Arial, sans-serif',
            textAlign: 'center',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default MeditationAnimation;
