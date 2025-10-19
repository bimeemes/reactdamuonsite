import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner-container'>
      <div className='loading-spinner'>
        <div className='spinner-ring'></div>
      </div>
      <p className='loading-text'>در حال بارگذاری...</p>
    </div>
  );
};

export default LoadingSpinner;
