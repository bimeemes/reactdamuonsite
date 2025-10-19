import React, { useState, useEffect } from 'react';
import '../styles/corner-decorations.css';

const PremiumDecorations = () => {
  const [scroll, setScroll] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScroll(window.pageYOffset);
    const handleMouse = (e) => setMouse({ 
      x: (e.clientX / window.innerWidth) * 100, 
      y: (e.clientY / window.innerHeight) * 100 
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div className="premium-decorations">
      {/* Morphing Blobs */}
      <div className="morphing-blobs">
        <div 
          className="blob blob-1"
          style={{
            transform: `translate(${mouse.x * 0.1}px, ${mouse.y * 0.1}px) scale(${1 + Math.sin(Date.now() * 0.001) * 0.2})`,
          }}
        />
        <div 
          className="blob blob-2"
          style={{
            transform: `translate(${-mouse.x * 0.05}px, ${mouse.y * 0.08}px) scale(${1 + Math.cos(Date.now() * 0.0015) * 0.3})`,
          }}
        />
        <div 
          className="blob blob-3"
          style={{
            transform: `translate(${mouse.x * 0.03}px, ${-mouse.y * 0.06}px) scale(${1 + Math.sin(Date.now() * 0.0008) * 0.25})`,
          }}
        />
      </div>

      {/* Scroll-Reactive Elements */}
      <div className="scroll-elements">
        <div 
          className="scroll-indicator"
          style={{
            transform: `translateY(${scroll * 0.1}px) rotate(${scroll * 0.1}deg)`,
            opacity: Math.max(0.3, 1 - scroll * 0.001),
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path
              d="M50,10 L90,50 L50,90 L10,50 Z"
              fill="none"
              stroke="rgba(203, 109, 81, 0.6)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animated-stroke"
            />
          </svg>
        </div>
      </div>

      {/* Network Connections */}
      <div className="network-container">
        <svg width="100%" height="100%" className="network-svg">
          <defs>
            <linearGradient id="networkGradient">
              <stop offset="0%" stopColor="rgba(203, 109, 81, 0.6)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Dynamic connecting lines */}
          <g className="network-lines">
            <line
              x1="10%" y1="20%"
              x2={`${20 + mouse.x * 0.2}%`} y2={`${30 + mouse.y * 0.1}%`}
              stroke="url(#networkGradient)"
              strokeWidth="1"
              className="network-line"
            />
            <line
              x1="80%" y1="15%"
              x2={`${75 + mouse.x * 0.1}%`} y2={`${25 + mouse.y * 0.15}%`}
              stroke="url(#networkGradient)"
              strokeWidth="1"
              className="network-line"
            />
            <line
              x1="15%" y1="80%"
              x2={`${25 + mouse.x * 0.08}%`} y2={`${75 + mouse.y * 0.12}%`}
              stroke="url(#networkGradient)"
              strokeWidth="1"
              className="network-line"
            />
          </g>
          
          {/* Network nodes */}
          <circle cx="10%" cy="20%" r="3" fill="rgba(203, 109, 81, 0.8)" className="network-node" />
          <circle cx="80%" cy="15%" r="2" fill="rgba(212, 132, 90, 0.8)" className="network-node" />
          <circle cx="15%" cy="80%" r="2.5" fill="rgba(184, 93, 71, 0.8)" className="network-node" />
        </svg>
      </div>

      {/* Cascade Effects */}
      <div className="cascade-container">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="cascade-element"
            style={{
              left: `${85 + i * 1}%`,
              top: `${10 + i * 6}%`,
              animationDelay: `${i * 0.2}s`,
              transform: `translateX(${Math.sin(Date.now() * 0.001 + i) * 10}px)`,
            }}
          />
        ))}
      </div>

      {/* Ripple Effects */}
      <div className="ripple-container">
        <div className="ripple ripple-1" />
        <div className="ripple ripple-2" />
        <div className="ripple ripple-3" />
      </div>

      {/* Geometric Kaleidoscope */}
      <div className="kaleidoscope-corner">
        <svg width="250" height="250" viewBox="0 0 250 250" className="kaleidoscope-svg">
          <defs>
            <pattern id="kaleidoPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <polygon points="25,5 45,20 35,40 15,40 5,20" fill="rgba(203, 109, 81, 0.3)" />
              <circle cx="25" cy="25" r="8" fill="rgba(212, 132, 90, 0.4)" />
            </pattern>
          </defs>
          
          <g className="kaleidoscope-group" style={{ transform: `rotate(${Date.now() * 0.01}deg)` }}>
            <polygon points="125,25 200,75 175,150 75,150 50,75" fill="url(#kaleidoPattern)" opacity="0.6" />
            <polygon points="125,50 175,100 150,175 100,175 75,100" fill="url(#kaleidoPattern)" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* Energy Waves */}
      <div className="energy-waves">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="energy-wave"
            style={{
              animationDelay: `${i * 0.5}s`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PremiumDecorations;