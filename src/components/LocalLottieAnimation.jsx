import React from 'react';
import Lottie from 'lottie-react';

// Import your local animation JSON file
// Put your JSON file in src/assets/animations/ and import it like this:
// import animationData from '../assets/animations/your-animation.json';

export const LocalLottieAnimation = ({ animationData, style, speed = 1 }) => {
  if (!animationData) {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          color: 'white',
        }}
      >
        Animation Loading...
      </div>
    );
  }

  return <Lottie animationData={animationData} style={style} speed={speed} loop={true} />;
};

// Example usage:
// import myAnimation from '../assets/animations/my-animation.json';
// <LocalLottieAnimation animationData={myAnimation} style={{ width: 200, height: 200 }} />
