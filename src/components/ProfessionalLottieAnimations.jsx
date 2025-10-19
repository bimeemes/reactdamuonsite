import React from 'react';
import Lottie from 'lottie-react';

// Professional Lottie Animations using actual animation data
// You can get these from https://lottiefiles.com/

export const InsuranceProtectionAnimation = ({ style, speed = 1 }) => {
  // Professional insurance/security animation
  // You can replace this URL with any Lottie animation from lottiefiles.com
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    // Fetch a professional security/shield animation
    fetch('https://lottie.host/4f8c15c8-9849-4f44-8649-00a515e89f5d/GtebCItkmv.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(() => {
        // Fallback to a simple professional CSS animation if Lottie fails
        setAnimationData('fallback');
      });
  }, []);

  if (animationData === 'fallback') {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '60%',
            height: '60%',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'white',
          }}
        >
          🔒
        </div>
      </div>
    );
  }

  if (!animationData) {
    return <div style={style}>Loading...</div>;
  }

  return <Lottie animationData={animationData} style={style} speed={speed} loop={true} />;
};

export const SMSAnimation = ({ style, speed = 1 }) => {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    // Professional messaging/communication animation
    fetch('https://lottie.host/87556d2c-f8e5-4fea-863a-9f8e63ccb6e4/Y8xEgHVdOw.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(() => setAnimationData('fallback'));
  }, []);

  if (animationData === 'fallback') {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            animation: 'float 3s ease-in-out infinite',
            fontSize: '2rem',
            color: 'white',
          }}
        >
          💬
        </div>
      </div>
    );
  }

  if (!animationData) {
    return <div style={style}>Loading...</div>;
  }

  return <Lottie animationData={animationData} style={style} speed={speed} loop={true} />;
};

export const DocumentProcessingAnimation = ({ style, speed = 1 }) => {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    // Use fallback animation instead of broken external URL
    setAnimationData('fallback');
  }, []);

  if (animationData === 'fallback') {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            animation: 'rotate 4s linear infinite',
            fontSize: '2rem',
            color: 'white',
          }}
        >
          📋
        </div>
      </div>
    );
  }

  if (!animationData) {
    return <div style={style}>Loading...</div>;
  }

  return <Lottie animationData={animationData} style={style} speed={speed} loop={true} />;
};

export const MoneyProtectionAnimation = ({ style, speed = 1 }) => {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    // Professional financial/money animation
    fetch('https://lottie.host/c9e57df8-c8ad-4f8b-b9b6-1b2e87e04c92/gZPy2jSmWR.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(() => setAnimationData('fallback'));
  }, []);

  if (animationData === 'fallback') {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '50%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            animation: 'zoom 2s infinite',
            fontSize: '2rem',
            color: 'white',
          }}
        >
          💎
        </div>
      </div>
    );
  }

  if (!animationData) {
    return <div style={style}>Loading...</div>;
  }

  return <Lottie animationData={animationData} style={style} speed={speed} loop={true} />;
};

export const FloatingElementsAnimation = ({ style, speed = 1 }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* More subtle and professional floating elements */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${30 + i * 15}px`,
            height: `${30 + i * 15}px`,
            background: `linear-gradient(135deg, rgba(102, 126, 234, ${0.05 + i * 0.02}), rgba(118, 75, 162, ${0.05 + i * 0.02}))`,
            borderRadius: '50%',
            left: `${15 + i * 20}%`,
            top: `${15 + i * 25}%`,
            animation: `professional-float-${i} ${4 + i * 2}s ease-in-out infinite alternate`,
            filter: 'blur(1px)',
          }}
        />
      ))}

      <style>
        {`
          @keyframes professional-float-0 {
            0% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.3;
            }
            100% {
              transform: translateY(-40px) translateX(20px) scale(1.1);
              opacity: 0.1;
            }
          }
          @keyframes professional-float-1 {
            0% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.2;
            }
            100% {
              transform: translateY(-30px) translateX(-15px) scale(0.9);
              opacity: 0.4;
            }
          }
          @keyframes professional-float-2 {
            0% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.25;
            }
            100% {
              transform: translateY(-50px) translateX(10px) scale(1.2);
              opacity: 0.1;
            }
          }
          @keyframes professional-float-3 {
            0% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.15;
            }
            100% {
              transform: translateY(-35px) translateX(-25px) scale(0.8);
              opacity: 0.3;
            }
          }

          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            100% {
              transform: translateY(-10px);
            }
          }
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes zoom {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </div>
  );
};

// Custom Animation Component that allows easy URL switching
export const CustomLottieAnimation = ({
  url,
  fallbackIcon = '⭐',
  style,
  speed = 1,
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}) => {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    if (url) {
      fetch(url)
        .then(response => response.json())
        .then(data => setAnimationData(data))
        .catch(() => setAnimationData('fallback'));
    }
  }, [url]);

  if (animationData === 'fallback' || !url) {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: gradient,
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            animation: 'pulse 2s infinite',
            fontSize: '2rem',
            color: 'white',
          }}
        >
          {fallbackIcon}
        </div>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: gradient,
          borderRadius: '20px',
          color: 'white',
        }}
      >
        Loading...
      </div>
    );
  }

  return <Lottie animationData={animationData} style={style} speed={speed} loop={true} />;
};
