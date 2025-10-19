import React from 'react';

// Simple CSS-based animations that are clearly visible
export const InsuranceProtectionAnimation = ({ style, speed = 1 }) => {
  return (
    <div style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #4CAF50, #45a049)',
      borderRadius: '50%',
      animation: 'pulse 2s infinite, float 3s ease-in-out infinite alternate',
      boxShadow: '0 10px 30px rgba(76, 175, 80, 0.3)',
    }}>
      <div style={{
        fontSize: '4rem',
        color: 'white',
        animation: 'bounce 1.5s infinite'
      }}>
        🛡️
      </div>
    </div>
  );
};

export const SMSAnimation = ({ style, speed = 1 }) => {
  return (
    <div style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2196F3, #1976D2)',
      borderRadius: '20px',
      animation: 'slide 2s ease-in-out infinite alternate, glow 2s infinite',
      boxShadow: '0 10px 30px rgba(33, 150, 243, 0.3)',
    }}>
      <div style={{
        fontSize: '4rem',
        color: 'white',
        animation: 'wiggle 1s infinite'
      }}>
        📱
      </div>
    </div>
  );
};

export const DocumentProcessingAnimation = ({ style, speed = 1 }) => {
  return (
    <div style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FF9800, #F57C00)',
      borderRadius: '15px',
      animation: 'rotate 4s linear infinite',
      boxShadow: '0 10px 30px rgba(255, 152, 0, 0.3)',
    }}>
      <div style={{
        fontSize: '4rem',
        color: 'white',
        animation: 'spin 2s linear infinite'
      }}>
        📄
      </div>
    </div>
  );
};

export const MoneyProtectionAnimation = ({ style, speed = 1 }) => {
  return (
    <div style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFD700, #FFA000)',
      borderRadius: '50%',
      animation: 'coin-flip 3s ease-in-out infinite',
      boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)',
    }}>
      <div style={{
        fontSize: '4rem',
        color: 'white',
        animation: 'zoom 2s infinite'
      }}>
        💰
      </div>
    </div>
  );
};

export const FloatingElementsAnimation = ({ style, speed = 1 }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
      ...style
    }}>
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
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-20px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slide {
          0% { transform: translateX(0px); }
          100% { transform: translateX(10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 10px 30px rgba(33, 150, 243, 0.3); }
          50% { box-shadow: 0 10px 40px rgba(33, 150, 243, 0.6); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        
        @keyframes coin-flip {
          0%, 100% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(180deg) scale(1.1); }
        }
        
        @keyframes zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes float-0 { 0% { transform: translateY(0px) rotate(0deg); } 100% { transform: translateY(-30px) rotate(180deg); } }
        @keyframes float-1 { 0% { transform: translateY(0px) rotate(0deg); } 100% { transform: translateY(-25px) rotate(-180deg); } }
        @keyframes float-2 { 0% { transform: translateY(0px) rotate(0deg); } 100% { transform: translateY(-35px) rotate(90deg); } }
        @keyframes float-3 { 0% { transform: translateY(0px) rotate(0deg); } 100% { transform: translateY(-20px) rotate(-90deg); } }
        @keyframes float-4 { 0% { transform: translateY(0px) rotate(0deg); } 100% { transform: translateY(-40px) rotate(270deg); } }
        @keyframes float-5 { 0% { transform: translateY(0px) rotate(0deg); } 100% { transform: translateY(-15px) rotate(-270deg); } }
      `}</style>
    </div>
  );
};
                          i: [[0, -30], [21, -21], [30, 0], [21, 21], [0, 30], [-21, 21], [-30, 0], [-21, -21]],
                          o: [[21, -21], [30, 0], [21, 21], [0, 30], [-21, 21], [-30, 0], [-21, -21], [0, -30]],
                          v: [[0, -80], [42, -58], [80, 0], [58, 42], [0, 80], [-42, 58], [-80, 0], [-58, -42]],
                          c: true
                        },
                        ix: 2
                      },
                      nm: "Shield Shape",
                      mn: "ADBE Vector Shape - Group",
                      hd: false
                    },
                    {
                      ty: "gf",
                      o: { a: 0, k: 100, ix: 10 },
                      r: 1,
                      bm: 0,
                      g: {
                        p: 3,
                        k: {
                          a: 0,
                          k: [0, 1, 0.6, 0, 0.5, 1, 0.7, 0.3, 1, 1, 0.8, 0.6],
                          ix: 9
                        }
                      },
                      s: { a: 0, k: [0, -80], ix: 5 },
                      e: { a: 0, k: [0, 80], ix: 6 },
                      t: 1,
                      nm: "Gradient Fill 1",
                      mn: "ADBE Vector Graphic - G-Fill",
                      hd: false
                    }
                  ],
                  nm: "Shield",
                  np: 2,
                  cix: 2,
                  bm: 0,
                  ix: 1,
                  mn: "ADBE Vector Group",
                  hd: false
                }
              ],
              ip: 0,
              op: 75,
              st: 0,
              bm: 0
            },
            {
              ddd: 0,
              ind: 2,
              ty: 4,
              nm: "Checkmark",
              sr: 1,
              ks: {
                o: { a: 1, k: [
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 30, s: [0] },
                  { t: 50, s: [100] }
                ], ix: 11 },
                r: { a: 0, k: 0, ix: 10 },
                p: { a: 0, k: [200, 200, 0], ix: 2 },
                a: { a: 0, k: [0, 0, 0], ix: 1 },
                s: { a: 0, k: [100, 100, 100], ix: 6 }
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      ind: 0,
                      ty: "sh",
                      ix: 1,
                      ks: {
                        a: 1,
                        k: [
                          { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 30, s: [{"i": [[0,0],[0,0],[0,0]], "o": [[0,0],[0,0],[0,0]], "v": [[-25,0],[-25,0],[-25,0]], "c": false}] },
                          { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 40, s: [{"i": [[0,0],[0,0],[0,0]], "o": [[0,0],[0,0],[0,0]], "v": [[-25,0],[-5,15],[-5,15]], "c": false}] },
                          { t: 50, s: [{"i": [[0,0],[0,0],[0,0]], "o": [[0,0],[0,0],[0,0]], "v": [[-25,0],[-5,15],[25,-25]], "c": false}] }
                        ],
                        ix: 2
                      },
                      nm: "Checkmark Path",
                      mn: "ADBE Vector Shape - Group",
                      hd: false
                    },
                    {
                      ty: "st",
                      c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                      o: { a: 0, k: 100, ix: 4 },
                      w: { a: 0, k: 6, ix: 5 },
                      lc: 2,
                      lj: 2,
                      bm: 0,
                      nm: "Stroke 1",
                      mn: "ADBE Vector Graphic - Stroke",
                      hd: false
                    }
                  ],
                  nm: "Checkmark",
                  np: 2,
                  cix: 2,
                  bm: 0,
                  ix: 1,
                  mn: "ADBE Vector Group",
                  hd: false
                }
              ],
              ip: 30,
              op: 75,
              st: 30,
              bm: 0
            }
          ],
          markers: []
        }}
        style={{ width: 150, height: 150, ...style }}
        loop={true}
        speed={speed}
      />
    </div>
  );
};

export const DocumentProcessingAnimation = ({ style, speed = 1 }) => {
  return (
    <div style={style}>
      <Lottie 
        animationData={{
          v: "5.9.0",
          fr: 30,
          ip: 0,
          op: 90,
          w: 400,
          h: 400,
          nm: "Document Processing",
          ddd: 0,
          assets: [],
          layers: [
            {
              ddd: 0,
              ind: 1,
              ty: 4,
              nm: "Document",
              sr: 1,
              ks: {
                o: { a: 0, k: 100, ix: 11 },
                r: { a: 0, k: 0, ix: 10 },
                p: { a: 1, k: [
                  { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [200, 250, 0] },
                  { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 45, s: [200, 200, 0] },
                  { t: 90, s: [200, 150, 0] }
                ], ix: 2 },
                a: { a: 0, k: [0, 0, 0], ix: 1 },
                s: { a: 0, k: [100, 100, 100], ix: 6 }
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      ind: 0,
                      ty: "rc",
                      d: 1,
                      s: { a: 0, k: [120, 160], ix: 2 },
                      p: { a: 0, k: [0, 0], ix: 3 },
                      r: { a: 0, k: 10, ix: 4 },
                      nm: "Rectangle",
                      mn: "ADBE Vector Shape - Rect",
                      hd: false
                    },
                    {
                      ty: "fl",
                      c: { a: 0, k: [1, 1, 1, 1], ix: 4 },
                      o: { a: 0, k: 100, ix: 5 },
                      r: 1,
                      bm: 0,
                      nm: "Fill 1",
                      mn: "ADBE Vector Graphic - Fill",
                      hd: false
                    },
                    {
                      ty: "st",
                      c: { a: 0, k: [0.8, 0.8, 0.8, 1], ix: 3 },
                      o: { a: 0, k: 100, ix: 4 },
                      w: { a: 0, k: 2, ix: 5 },
                      lc: 1,
                      lj: 1,
                      ml: 4,
                      bm: 0,
                      nm: "Stroke 1",
                      mn: "ADBE Vector Graphic - Stroke",
                      hd: false
                    }
                  ],
                  nm: "Document Shape",
                  np: 3,
                  cix: 2,
                  bm: 0,
                  ix: 1,
                  mn: "ADBE Vector Group",
                  hd: false
                }
              ],
              ip: 0,
              op: 90,
              st: 0,
              bm: 0
            }
          ],
          markers: []
        }}
        style={{ width: 120, height: 120, ...style }}
        loop={true}
        speed={speed}
      />
    </div>
  );
};

export const MoneyProtectionAnimation = ({ style, speed = 1 }) => {
  return (
    <div style={style}>
      <Lottie 
        animationData={{
          v: "5.9.0",
          fr: 25,
          ip: 0,
          op: 100,
          w: 400,
          h: 400,
          nm: "Money Protection",
          ddd: 0,
          assets: [],
          layers: [
            {
              ddd: 0,
              ind: 1,
              ty: 4,
              nm: "Coins",
              sr: 1,
              ks: {
                o: { a: 0, k: 100, ix: 11 },
                r: { a: 1, k: [
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] },
                  { t: 100, s: [360] }
                ], ix: 10 },
                p: { a: 0, k: [200, 200, 0], ix: 2 },
                a: { a: 0, k: [0, 0, 0], ix: 1 },
                s: { a: 1, k: [
                  { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [80, 80, 100] },
                  { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 50, s: [120, 120, 100] },
                  { t: 100, s: [100, 100, 100] }
                ], ix: 6 }
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      d: 1,
                      ty: "el",
                      s: { a: 0, k: [80, 80], ix: 2 },
                      p: { a: 0, k: [0, 0], ix: 3 },
                      nm: "Coin",
                      mn: "ADBE Vector Shape - Ellipse",
                      hd: false
                    },
                    {
                      ty: "gf",
                      o: { a: 0, k: 100, ix: 10 },
                      r: 1,
                      bm: 0,
                      g: {
                        p: 3,
                        k: {
                          a: 0,
                          k: [0, 1, 0.84, 0.2, 0.5, 1, 0.9, 0.4, 1, 1, 0.96, 0.6],
                          ix: 9
                        }
                      },
                      s: { a: 0, k: [-40, -40], ix: 5 },
                      e: { a: 0, k: [40, 40], ix: 6 },
                      t: 1,
                      nm: "Gold Gradient",
                      mn: "ADBE Vector Graphic - G-Fill",
                      hd: false
                    }
                  ],
                  nm: "Coin",
                  np: 2,
                  cix: 2,
                  bm: 0,
                  ix: 1,
                  mn: "ADBE Vector Group",
                  hd: false
                }
              ],
              ip: 0,
              op: 100,
              st: 0,
              bm: 0
            }
          ],
          markers: []
        }}
        style={{ width: 100, height: 100, ...style }}
        loop={true}
        speed={speed}
      />
    </div>
  );
};

export const SMSAnimation = ({ style, speed = 1 }) => {
  return (
    <div style={style}>
      <Lottie 
        animationData={{
          v: "5.9.0",
          fr: 30,
          ip: 0,
          op: 60,
          w: 300,
          h: 300,
          nm: "SMS Sending",
          ddd: 0,
          assets: [],
          layers: [
            {
              ddd: 0,
              ind: 1,
              ty: 4,
              nm: "Phone",
              sr: 1,
              ks: {
                o: { a: 0, k: 100, ix: 11 },
                r: { a: 1, k: [
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] },
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 20, s: [5] },
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 25, s: [-5] },
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 30, s: [0] }
                ], ix: 10 },
                p: { a: 0, k: [150, 150, 0], ix: 2 },
                a: { a: 0, k: [0, 0, 0], ix: 1 },
                s: { a: 0, k: [100, 100, 100], ix: 6 }
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      ind: 0,
                      ty: "rc",
                      d: 1,
                      s: { a: 0, k: [60, 100], ix: 2 },
                      p: { a: 0, k: [0, 0], ix: 3 },
                      r: { a: 0, k: 15, ix: 4 },
                      nm: "Phone Shape",
                      mn: "ADBE Vector Shape - Rect",
                      hd: false
                    },
                    {
                      ty: "fl",
                      c: { a: 0, k: [0.2, 0.2, 0.2, 1], ix: 4 },
                      o: { a: 0, k: 100, ix: 5 },
                      r: 1,
                      bm: 0,
                      nm: "Fill 1",
                      mn: "ADBE Vector Graphic - Fill",
                      hd: false
                    }
                  ],
                  nm: "Phone",
                  np: 2,
                  cix: 2,
                  bm: 0,
                  ix: 1,
                  mn: "ADBE Vector Group",
                  hd: false
                }
              ],
              ip: 0,
              op: 60,
              st: 0,
              bm: 0
            },
            {
              ddd: 0,
              ind: 2,
              ty: 4,
              nm: "SMS Bubble",
              sr: 1,
              ks: {
                o: { a: 1, k: [
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 20, s: [0] },
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 30, s: [100] },
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 50, s: [100] },
                  { t: 60, s: [0] }
                ], ix: 11 },
                r: { a: 0, k: 0, ix: 10 },
                p: { a: 1, k: [
                  { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 20, s: [150, 90, 0] },
                  { t: 40, s: [150, 70, 0] }
                ], ix: 2 },
                a: { a: 0, k: [0, 0, 0], ix: 1 },
                s: { a: 1, k: [
                  { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 20, s: [0, 0, 100] },
                  { t: 30, s: [100, 100, 100] }
                ], ix: 6 }
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      ind: 0,
                      ty: "rc",
                      d: 1,
                      s: { a: 0, k: [40, 25], ix: 2 },
                      p: { a: 0, k: [0, 0], ix: 3 },
                      r: { a: 0, k: 8, ix: 4 },
                      nm: "Message Bubble",
                      mn: "ADBE Vector Shape - Rect",
                      hd: false
                    },
                    {
                      ty: "fl",
                      c: { a: 0, k: [1, 0.6, 0, 1], ix: 4 },
                      o: { a: 0, k: 100, ix: 5 },
                      r: 1,
                      bm: 0,
                      nm: "Fill 1",
                      mn: "ADBE Vector Graphic - Fill",
                      hd: false
                    }
                  ],
                  nm: "Message",
                  np: 2,
                  cix: 2,
                  bm: 0,
                  ix: 1,
                  mn: "ADBE Vector Group",
                  hd: false
                }
              ],
              ip: 20,
              op: 60,
              st: 20,
              bm: 0
            }
          ],
          markers: []
        }}
        style={{ width: 80, height: 80, ...style }}
        loop={true}
        speed={speed}
      />
    </div>
  );
};

// Background decoration animation
export const FloatingElementsAnimation = ({ style }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: -1, ...style }}>
      <Lottie 
        animationData={{
          v: "5.9.0",
          fr: 20,
          ip: 0,
          op: 200,
          w: 1200,
          h: 800,
          nm: "Floating Elements",
          ddd: 0,
          assets: [],
          layers: [
            {
              ddd: 0,
              ind: 1,
              ty: 4,
              nm: "Element 1",
              sr: 1,
              ks: {
                o: { a: 1, k: [
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] },
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 20, s: [30] },
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 180, s: [30] },
                  { t: 200, s: [0] }
                ], ix: 11 },
                r: { a: 1, k: [
                  { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] },
                  { t: 200, s: [360] }
                ], ix: 10 },
                p: { a: 1, k: [
                  { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [100, 700, 0] },
                  { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 100, s: [600, 100, 0] },
                  { t: 200, s: [1100, 700, 0] }
                ], ix: 2 },
                a: { a: 0, k: [0, 0, 0], ix: 1 },
                s: { a: 1, k: [
                  { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [30, 30, 100] },
                  { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 100, s: [80, 80, 100] },
                  { t: 200, s: [30, 30, 100] }
                ], ix: 6 }
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      d: 1,
                      ty: "el",
                      s: { a: 0, k: [50, 50], ix: 2 },
                      p: { a: 0, k: [0, 0], ix: 3 },
                      nm: "Circle",
                      mn: "ADBE Vector Shape - Ellipse",
                      hd: false
                    },
                    {
                      ty: "fl",
                      c: { a: 0, k: [1, 0.6, 0, 0.3], ix: 4 },
                      o: { a: 0, k: 100, ix: 5 },
                      r: 1,
                      bm: 0,
                      nm: "Fill 1",
                      mn: "ADBE Vector Graphic - Fill",
                      hd: false
                    }
                  ],
                  nm: "Circle",
                  np: 2,
                  cix: 2,
                  bm: 0,
                  ix: 1,
                  mn: "ADBE Vector Group",
                  hd: false
                }
              ],
              ip: 0,
              op: 200,
              st: 0,
              bm: 0
            }
          ],
          markers: []
        }}
        style={{ width: '100%', height: '100%', opacity: 0.2 }}
        loop={true}
        speed={0.5}
      />
    </div>
  );
};