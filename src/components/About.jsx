import React from 'react';
import MeditationAnimation from './MeditationAnimation';

const About = () => {
  return (
    <section
      className='about-section'
      dir='rtl'
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
        <MeditationAnimation size={260} showText={false} style={{ margin: '1rem' }} />
      </div>
    </section>
  );
};

export default About;
