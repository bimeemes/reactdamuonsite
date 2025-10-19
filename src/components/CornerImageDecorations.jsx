import React, { useState, useEffect } from 'react';
import '../styles/corner-decorations.css';

const CornerImageDecorations = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="corner-image-decorations">
      {/* Top Left Corner - Mining Image with Glow */}
      <div className="corner-image corner-image-tl">
        <div className="image-container">
          <img 
            src="/fc0510_25niceAftab-gir-images-1new.png" 
            alt="Mining Scene"
            className="corner-img img-floating"
          />
          <div className="image-overlay"></div>
          <div className="image-glow"></div>
        </div>
        <div className="decorative-frame frame-tl">
          <svg width="120" height="120" viewBox="0 0 120 120" className="frame-svg">
            <defs>
              <linearGradient id="frameGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(203, 109, 81, 0.8)" />
                <stop offset="100%" stopColor="rgba(212, 132, 90, 0.4)" />
              </linearGradient>
            </defs>
            <path d="M10,10 L110,10 L110,30 L30,30 L30,110 L10,110 Z" 
                  fill="none" 
                  stroke="url(#frameGradient1)" 
                  strokeWidth="2"
                  className="animated-frame" />
          </svg>
        </div>
      </div>

      {/* Top Right Corner - Already Damoun Logo with Particles */}
      <div className="corner-image corner-image-tr">
        <div className="image-container">
          <img 
            src="/src/assets/alreadydamoun.png" 
            alt="Already Damoun"
            className="corner-img img-rotating"
          />
          <div className="image-overlay"></div>
          <div className="particle-trail">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="trail-particle" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </div>
        <div className="decorative-frame frame-tr">
          <svg width="120" height="120" viewBox="0 0 120 120" className="frame-svg">
            <defs>
              <radialGradient id="frameGradient2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(203, 109, 81, 0.6)" />
                <stop offset="100%" stopColor="rgba(184, 93, 71, 0.8)" />
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="50" 
                    fill="none" 
                    stroke="url(#frameGradient2)" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animated-circle" />
          </svg>
        </div>
      </div>

      {/* Bottom Left Corner - Tehran Image with Ripple Effect */}
      <div className="corner-image corner-image-bl">
        <div className="image-container">
          <img 
            src="/src/assets/Tehran.jpg" 
            alt="Tehran"
            className="corner-img img-ripple"
          />
          <div className="image-overlay"></div>
          <div className="ripple-effect">
            <div className="ripple ripple-1"></div>
            <div className="ripple ripple-2"></div>
            <div className="ripple ripple-3"></div>
          </div>
        </div>
        <div className="decorative-frame frame-bl">
          <svg width="100" height="100" viewBox="0 0 100 100" className="frame-svg">
            <defs>
              <linearGradient id="frameGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(212, 132, 90, 0.7)" />
                <stop offset="100%" stopColor="rgba(203, 109, 81, 0.5)" />
              </linearGradient>
            </defs>
            <polygon points="10,90 90,90 90,10 50,10 10,50" 
                     fill="none" 
                     stroke="url(#frameGradient3)" 
                     strokeWidth="2"
                     className="animated-polygon" />
          </svg>
        </div>
      </div>

      {/* Bottom Right Corner - Copper Mine with Magnetic Effect */}
      <div className="corner-image corner-image-br">
        <div className="image-container">
          <img 
            src="/src/assets/Sarcheshmeh.jpeg" 
            alt="Sarcheshmeh Mine"
            className="corner-img img-magnetic"
            style={{
              transform: `translate(${(mousePosition.x - window.innerWidth) * 0.01}px, ${(mousePosition.y - window.innerHeight) * 0.01}px)`
            }}
          />
          <div className="image-overlay"></div>
          <div className="magnetic-field">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="magnetic-line" 
                style={{ 
                  transform: `rotate(${i * 60}deg)`,
                  animationDelay: `${i * 0.3}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="decorative-frame frame-br">
          <svg width="110" height="110" viewBox="0 0 110 110" className="frame-svg">
            <defs>
              <linearGradient id="frameGradient4" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(184, 93, 71, 0.8)" />
                <stop offset="50%" stopColor="rgba(203, 109, 81, 0.6)" />
                <stop offset="100%" stopColor="rgba(212, 132, 90, 0.4)" />
              </linearGradient>
            </defs>
            <path d="M20,90 L90,90 L90,20 L80,20 L80,80 L20,80 Z M100,10 L100,100 L10,100" 
                  fill="none" 
                  stroke="url(#frameGradient4)" 
                  strokeWidth="2"
                  className="animated-corner-frame" />
          </svg>
        </div>
      </div>

      {/* Floating Accent Images */}
      <div className="floating-accents">
        <div className="accent-image accent-1">
          <img 
            src="/src/assets/rafsenjan.jpeg" 
            alt="Rafsenjan"
            className="accent-img"
          />
        </div>
        <div className="accent-image accent-2">
          <img 
            src="/src/assets/sungoon.jpeg" 
            alt="Sungoon"
            className="accent-img"
          />
        </div>
      </div>

      {/* Image Connection Lines */}
      <div className="image-connections">
        <svg className="connection-svg" width="100%" height="100%">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(203, 109, 81, 0.3)" />
              <stop offset="50%" stopColor="rgba(212, 132, 90, 0.1)" />
              <stop offset="100%" stopColor="rgba(184, 93, 71, 0.3)" />
            </linearGradient>
          </defs>
          <path 
            d="M 100,100 Q 300,200 500,150 T 800,300" 
            stroke="url(#connectionGradient)" 
            strokeWidth="1" 
            fill="none"
            strokeDasharray="3,3"
            className="connection-line"
          />
        </svg>
      </div>
    </div>
  );
};

export default CornerImageDecorations;