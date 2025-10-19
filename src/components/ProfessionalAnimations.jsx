import React from 'react';

// Simple CSS-based animations that are clearly visible
export const InsuranceProtectionAnimation = ({ style, speed = 1 }) => {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4CAF50, #45a049)',
        borderRadius: '50%',
        animation: 'pulse 2s infinite, float 3s ease-in-out infinite alternate',
        boxShadow: '0 10px 30px rgba(76, 175, 80, 0.3)',
      }}
    >
      <div
        style={{
          fontSize: '4rem',
          color: 'white',
          animation: 'bounce 1.5s infinite',
        }}
      >
        🛡️
      </div>
      <style jsx>
        {`
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            100% {
              transform: translateY(-20px);
            }
          }

          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
};

export const SMSAnimation = ({ style, speed = 1 }) => {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #2196F3, #1976D2)',
        borderRadius: '20px',
        animation: 'slide 2s ease-in-out infinite alternate, glow 2s infinite',
        boxShadow: '0 10px 30px rgba(33, 150, 243, 0.3)',
      }}
    >
      <div
        style={{
          fontSize: '4rem',
          color: 'white',
          animation: 'wiggle 1s infinite',
        }}
      >
        📱
      </div>
      <style jsx>
        {`
          @keyframes slide {
            0% {
              transform: translateX(0px);
            }
            100% {
              transform: translateX(10px);
            }
          }

          @keyframes glow {
            0%,
            100% {
              box-shadow: 0 10px 30px rgba(33, 150, 243, 0.3);
            }
            50% {
              box-shadow: 0 10px 40px rgba(33, 150, 243, 0.6);
            }
          }

          @keyframes wiggle {
            0%,
            100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(-5deg);
            }
            75% {
              transform: rotate(5deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export const DocumentProcessingAnimation = ({ style, speed = 1 }) => {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF9800, #F57C00)',
        borderRadius: '15px',
        animation: 'rotate 4s linear infinite',
        boxShadow: '0 10px 30px rgba(255, 152, 0, 0.3)',
      }}
    >
      <div
        style={{
          fontSize: '4rem',
          color: 'white',
          animation: 'spin 2s linear infinite',
        }}
      >
        📄
      </div>
      <style jsx>
        {`
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes spin {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export const MoneyProtectionAnimation = ({ style, speed = 1 }) => {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFD700, #FFA000)',
        borderRadius: '50%',
        animation: 'coin-flip 3s ease-in-out infinite',
        boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)',
      }}
    >
      <div
        style={{
          fontSize: '4rem',
          color: 'white',
          animation: 'zoom 2s infinite',
        }}
      >
        💰
      </div>
      <style jsx>
        {`
          @keyframes coin-flip {
            0%,
            100% {
              transform: rotateY(0deg) scale(1);
            }
            50% {
              transform: rotateY(180deg) scale(1.1);
            }
          }

          @keyframes zoom {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }
        `}
      </style>
    </div>
  );
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
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
            background: `rgba(255, 152, 0, ${0.1 + i * 0.05})`,
            borderRadius: '50%',
            left: `${10 + i * 15}%`,
            top: `${10 + i * 20}%`,
            animation: `float-${i} ${3 + i}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      <style jsx>
        {`
          @keyframes float-0 {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            100% {
              transform: translateY(-30px) rotate(180deg);
            }
          }
          @keyframes float-1 {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            100% {
              transform: translateY(-25px) rotate(-180deg);
            }
          }
          @keyframes float-2 {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            100% {
              transform: translateY(-35px) rotate(90deg);
            }
          }
          @keyframes float-3 {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            100% {
              transform: translateY(-20px) rotate(-90deg);
            }
          }
          @keyframes float-4 {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            100% {
              transform: translateY(-40px) rotate(270deg);
            }
          }
          @keyframes float-5 {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            100% {
              transform: translateY(-15px) rotate(-270deg);
            }
          }
        `}
      </style>
    </div>
  );
};
