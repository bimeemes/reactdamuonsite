import React, { useState, useEffect } from 'react';
import '../styles/corner-decorations.css';

const AdvancedCornerDecorations = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="advanced-corner-decorations">
      {/* Interactive Particles */}
      <div 
        className="interactive-particle particle-1"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />
      <div 
        className="interactive-particle particle-2"
        style={{
          transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * 0.08}px)`,
        }}
      />
      <div 
        className="interactive-particle particle-3"
        style={{
          transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * -0.06}px)`,
        }}
      />

      {/* Persian Pattern Corner */}
      <div className="persian-pattern-corner">
        <svg width="200" height="200" viewBox="0 0 200 200" className="persian-svg">
          <defs>
            <linearGradient id="copperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(203, 109, 81, 0.3)" />
              <stop offset="50%" stopColor="rgba(212, 132, 90, 0.2)" />
              <stop offset="100%" stopColor="rgba(184, 93, 71, 0.1)" />
            </linearGradient>
          </defs>
          
          {/* Persian Geometric Pattern */}
          <g className="rotating-pattern">
            <path d="M100,20 L120,40 L100,60 L80,40 Z" fill="url(#copperGradient)" />
            <path d="M140,60 L160,80 L140,100 L120,80 Z" fill="url(#copperGradient)" opacity="0.8" />
            <path d="M100,100 L120,120 L100,140 L80,120 Z" fill="url(#copperGradient)" opacity="0.6" />
            <path d="M60,60 L80,80 L60,100 L40,80 Z" fill="url(#copperGradient)" opacity="0.4" />
            <circle cx="100" cy="80" r="15" fill="none" stroke="rgba(203, 109, 81, 0.3)" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* Flowing Lines */}
      <div className="flowing-lines-container">
        <svg width="100%" height="100%" className="flowing-lines-svg">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="rgba(203, 109, 81, 0.4)" />
              <stop offset="70%" stopColor="rgba(212, 132, 90, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          <path 
            className="flowing-line line-1"
            d="M 0,50 Q 100,30 200,50 T 400,50" 
            stroke="url(#flowGradient)" 
            strokeWidth="2" 
            fill="none"
          />
          <path 
            className="flowing-line line-2"
            d="M 0,80 Q 150,60 300,80 T 600,80" 
            stroke="url(#flowGradient)" 
            strokeWidth="1.5" 
            fill="none"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  );
};

export default AdvancedCornerDecorations;