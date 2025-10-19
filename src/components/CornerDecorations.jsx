import React from 'react';
import '../styles/corner-decorations.css';

const CornerDecorations = () => {
  return (
    <div className="corner-decorations">
      {/* Top Left Corner - Curved Wave */}
      <div className="corner-decoration-top-left"></div>
      
      {/* Top Right Corner - Arrow Lines */}
      <div className="corner-decoration-top-right">
        <div className="arrow-line arrow-line-1"></div>
        <div className="arrow-line arrow-line-2"></div>
        <div className="arrow-line arrow-line-3"></div>
      </div>
      
      {/* Bottom Left Corner - Geometric Shapes */}
      <div className="corner-decoration-bottom-left">
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="geometric-shape shape-3"></div>
      </div>
      
      {/* Bottom Right Corner - Wavy Lines */}
      <div className="corner-decoration-bottom-right">
        <div className="wavy-line"></div>
        <div className="wavy-line wavy-line-2"></div>
        <div className="wavy-line wavy-line-3"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="floating-element float-1"></div>
      <div className="floating-element float-2"></div>
      <div className="floating-element float-3"></div>
    </div>
  );
};

export default CornerDecorations;