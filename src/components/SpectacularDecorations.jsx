import React, { useState, useEffect, useRef } from 'react';
import '../styles/corner-decorations.css';

const SpectacularDecorations = () => {
  const [time, setTime] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.016);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Particle animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(203, 109, 81, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="spectacular-decorations">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="particle-canvas"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}
      />

      {/* 3D Rotating Cubes */}
      <div className="cube-container cube-tl">
        <div className="cube" style={{ transform: `rotateX(${time * 20}deg) rotateY(${time * 30}deg)` }}>
          <div className="cube-face cube-front"></div>
          <div className="cube-face cube-back"></div>
          <div className="cube-face cube-right"></div>
          <div className="cube-face cube-left"></div>
          <div className="cube-face cube-top"></div>
          <div className="cube-face cube-bottom"></div>
        </div>
      </div>

      <div className="cube-container cube-br">
        <div className="cube cube-small" style={{ transform: `rotateX(${-time * 25}deg) rotateY(${time * 20}deg)` }}>
          <div className="cube-face cube-front"></div>
          <div className="cube-face cube-back"></div>
          <div className="cube-face cube-right"></div>
          <div className="cube-face cube-left"></div>
          <div className="cube-face cube-top"></div>
          <div className="cube-face cube-bottom"></div>
        </div>
      </div>

      {/* Plasma Effects */}
      <div className="plasma-container">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="plasma-orb"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + Math.sin(time + i) * 15}%`,
              transform: `scale(${0.5 + Math.sin(time * 2 + i) * 0.3})`,
              opacity: 0.3 + Math.cos(time + i) * 0.2,
            }}
          />
        ))}
      </div>

      {/* DNA Helix */}
      <div className="dna-helix">
        <svg width="100" height="300" viewBox="0 0 100 300" className="dna-svg">
          {[...Array(20)].map((_, i) => (
            <g key={i}>
              <circle
                cx={50 + Math.sin(time + i * 0.5) * 20}
                cy={i * 15}
                r="3"
                fill="rgba(203, 109, 81, 0.6)"
              />
              <circle
                cx={50 - Math.sin(time + i * 0.5) * 20}
                cy={i * 15}
                r="3"
                fill="rgba(212, 132, 90, 0.6)"
              />
              <line
                x1={50 + Math.sin(time + i * 0.5) * 20}
                y1={i * 15}
                x2={50 - Math.sin(time + i * 0.5) * 20}
                y2={i * 15}
                stroke="rgba(184, 93, 71, 0.3)"
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Lightning Effects */}
      <div className="lightning-container">
        <svg width="100%" height="100%" className="lightning-svg">
          <defs>
            <filter id="lightning-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            d={`M 10,50 Q 30,${30 + Math.sin(time * 3) * 10} 50,50 T 90,${60 + Math.cos(time * 2) * 15}`}
            stroke="rgba(203, 109, 81, 0.8)"
            strokeWidth="2"
            fill="none"
            filter="url(#lightning-glow)"
            className="lightning-bolt"
            style={{ opacity: 0.3 + Math.sin(time * 4) * 0.3 }}
          />
        </svg>
      </div>

      {/* Holographic Grid */}
      <div className="holographic-grid">
        <svg width="400" height="400" viewBox="0 0 400 400" className="grid-svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(203, 109, 81, 0.2)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" 
                style={{ transform: `perspective(1000px) rotateX(${45 + Math.sin(time) * 5}deg)` }} />
        </svg>
      </div>

      {/* Quantum Particles */}
      <div className="quantum-field">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="quantum-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(${Math.sin(time + i) * 50}px, ${Math.cos(time * 1.5 + i) * 30}px)`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric Tunnels */}
      <div className="tunnel-effect tunnel-tl">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="tunnel-ring"
            style={{
              transform: `scale(${1 - i * 0.1}) translateZ(${-i * 20}px)`,
              opacity: 1 - i * 0.1,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Aurora Effect */}
      <div className="aurora-container">
        <div 
          className="aurora-wave aurora-1"
          style={{ transform: `translateY(${Math.sin(time) * 20}px) scaleY(${1 + Math.cos(time * 1.5) * 0.3})` }}
        />
        <div 
          className="aurora-wave aurora-2"
          style={{ transform: `translateY(${Math.cos(time * 1.2) * 25}px) scaleY(${1 + Math.sin(time * 0.8) * 0.4})` }}
        />
        <div 
          className="aurora-wave aurora-3"
          style={{ transform: `translateY(${Math.sin(time * 0.7) * 15}px) scaleY(${1 + Math.cos(time * 2) * 0.2})` }}
        />
      </div>
    </div>
  );
};

export default SpectacularDecorations;