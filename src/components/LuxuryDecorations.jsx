import React, { useState, useEffect } from 'react';
import '../styles/corner-decorations.css';

const LuxuryDecorations = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.01);
    }, 16); // 60fps updates
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="luxury-decorations">
      {/* Animated Persian Mandala */}
      <div className="persian-mandala-corner">
        <svg width="300" height="300" viewBox="0 0 300 300" className="mandala-svg">
          <defs>
            <radialGradient id="mandalaGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(203, 109, 81, 0.6)" />
              <stop offset="30%" stopColor="rgba(212, 132, 90, 0.4)" />
              <stop offset="60%" stopColor="rgba(184, 93, 71, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <g className="mandala-layer-1" style={{ transform: `rotate(${time * 10}deg)` }}>
            {[...Array(8)].map((_, i) => (
              <path
                key={i}
                d="M150,150 L170,130 L190,150 L170,170 Z"
                fill="url(#mandalaGradient)"
                transform={`rotate(${i * 45} 150 150)`}
                filter="url(#glow)"
              />
            ))}
          </g>
          
          <g className="mandala-layer-2" style={{ transform: `rotate(${-time * 5}deg)` }}>
            {[...Array(12)].map((_, i) => (
              <circle
                key={i}
                cx="150"
                cy="100"
                r="8"
                fill="rgba(203, 109, 81, 0.4)"
                transform={`rotate(${i * 30} 150 150)`}
              />
            ))}
          </g>
          
          <circle cx="150" cy="150" r="25" fill="none" stroke="rgba(203, 109, 81, 0.5)" strokeWidth="2" />
          <circle cx="150" cy="150" r="15" fill="rgba(212, 132, 90, 0.3)" />
        </svg>
      </div>

      {/* Particle System */}
      <div className="particle-system">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="luxury-particle"
            style={{
              left: `${10 + (i * 6)}%`,
              top: `${15 + Math.sin(time + i) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              transform: `scale(${0.5 + Math.sin(time * 2 + i) * 0.3})`,
            }}
          />
        ))}
      </div>

      {/* Corner Spirals */}
      <div className="corner-spiral corner-spiral-tl">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <path
            d="M100,100 Q120,80 140,100 Q120,120 100,100 Q80,80 60,100 Q80,120 100,100"
            fill="none"
            stroke="rgba(203, 109, 81, 0.4)"
            strokeWidth="3"
            className="spiral-path"
          />
          <path
            d="M100,100 Q130,70 160,100 Q130,130 100,100 Q70,70 40,100 Q70,130 100,100"
            fill="none"
            stroke="rgba(212, 132, 90, 0.3)"
            strokeWidth="2"
            className="spiral-path-2"
          />
        </svg>
      </div>

      <div className="corner-spiral corner-spiral-br">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <g className="rotating-spiral" style={{ transform: `rotate(${time * 15}deg)` }}>
            <path
              d="M90,90 Q110,70 130,90 Q110,110 90,90 Q70,70 50,90 Q70,110 90,90"
              fill="none"
              stroke="rgba(184, 93, 71, 0.5)"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      {/* Floating Ornaments */}
      <div className="floating-ornaments">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="ornament"
            style={{
              left: `${5 + (i * 12)}%`,
              top: `${60 + Math.cos(time + i * 0.5) * 15}%`,
              transform: `rotate(${time * 30 + i * 45}deg) scale(${0.8 + Math.sin(time * 3 + i) * 0.2})`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <polygon
                points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8"
                fill="rgba(203, 109, 81, 0.6)"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Dynamic Border Lines */}
      <div className="dynamic-borders">
        <div className="border-line border-top" style={{ width: `${50 + Math.sin(time) * 20}%` }} />
        <div className="border-line border-right" style={{ height: `${40 + Math.cos(time * 1.2) * 15}%` }} />
        <div className="border-line border-bottom" style={{ width: `${45 + Math.sin(time * 0.8) * 25}%` }} />
        <div className="border-line border-left" style={{ height: `${35 + Math.cos(time * 1.5) * 20}%` }} />
      </div>

      {/* Corner Burst Effects */}
      <div className="corner-burst corner-burst-tl">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="burst-ray"
            style={{
              transform: `rotate(${i * 30}deg) scaleY(${0.5 + Math.sin(time * 2 + i) * 0.5})`,
            }}
          />
        ))}
      </div>

      <div className="corner-burst corner-burst-br">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="burst-ray burst-ray-alt"
            style={{
              transform: `rotate(${i * 22.5}deg) scaleY(${0.3 + Math.cos(time * 1.5 + i) * 0.4})`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LuxuryDecorations;