import React from 'react';

const StatBox = ({ color, label, value }) => (
  <div className='stat-box' style={{ borderTop: `6px solid ${color}` }}>
    <div
      style={{
        fontWeight: 700,
        fontSize: '1.1rem',
        marginBottom: '0.5rem',
        color: '#424242',
      }}
    >
      {label}
    </div>
    <div style={{ fontWeight: 900, fontSize: '1.7rem', color }}>{value}</div>
  </div>
);

const StatSlider = () => {
  const cards = [
    { color: '#f66e20', label: 'تعداد بیمه شده ها در ماه', value: '100,000 نفر' },
    { color: '#616161', label: 'تعداد بیمه شده عمر و حادثه', value: '30,000 نفر' },
    { color: '#f66e20', label: 'تعداد فوتی ها سال 1403', value: '143' },
    { color: '#616161', label: 'تعداد بیمه گزاران', value: '173' },
    { color: '#f66e20', label: 'نسبت خسارت بیمه های درمان', value: '119%' },
  ];

  const sliderRef = React.useRef(null);
  const isDragging = React.useRef(false);
  const dragStartX = React.useRef(0);
  const scrollStartX = React.useRef(0);

  const handleMouseDown = e => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStartX.current = sliderRef.current.scrollLeft;
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
    sliderRef.current.style.transition = 'none';
  };

  const handleMouseMove = e => {
    if (!isDragging.current) {
      return;
    }
    const dx = dragStartX.current - e.clientX;
    sliderRef.current.scrollLeft = scrollStartX.current + dx * 4;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    if (sliderRef.current) {
      sliderRef.current.style.transition = '';
    }
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        padding: '2rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          cursor: isDragging.current ? 'grabbing' : 'grab',
          userSelect: 'none',
          transition: 'transform 0.2s',
          paddingBottom: '1rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          minWidth: '100%',
        }}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        className='stat-slider'
      >
        {cards.map(card => (
          <StatBox key={card.label} color={card.color} label={card.label} value={card.value} />
        ))}
      </div>
      <button
        onClick={scrollLeft}
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#f66e20e6',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
        onMouseOver={e => {
          e.target.style.background = '#e55b0f';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseOut={e => {
          e.target.style.background = 'rgba(246, 110, 32, 0.9)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
        aria-label='مشاهده آمار قبل'
      >
        ←
      </button>
      <button
        onClick={scrollRight}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(246, 110, 32, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
        onMouseOver={e => {
          e.target.style.background = '#e55b0f';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseOut={e => {
          e.target.style.background = 'rgba(246, 110, 32, 0.9)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
        aria-label='مشاهده آمار بعد'
      >
        →
      </button>

      <style>
        {`
          .stat-slider::-webkit-scrollbar {
            display: none;
          }

          .stat-box {
            background: rgba(255,255,255,0.45);
            border-radius: 20px;
            box-shadow: 0 2px 16px rgba(246, 110, 32, 0.2);
            padding: 2rem 1rem;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.18);
            min-width: 250px;
            flex-shrink: 0;
          }

          .stat-box:hover {
            transform: translateY(-6px) scale(1.04);
            box-shadow: 0 8px 32px rgba(246, 110, 32, 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default StatSlider;
