import React from 'react';

const PlanetCard = ({ planet }) => {
  if (!planet) return null;

  return (
    <div className="glass-panel" style={{
      padding: '24px',
      borderRadius: '24px',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      transition: 'all 0.3s'
    }}>
      <h3 style={{ fontSize: '2.5rem', margin: 0, color: planet.color }} className="text-glow">
        {planet.name}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '1.1rem' }}>
          <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Distance from Sun:</strong>
          <br />{planet.distance}
        </p>
        <p style={{ margin: 0, fontSize: '1.1rem' }}>
          <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Atmosphere:</strong>
          <br />{planet.atmosphere}
        </p>
        <p style={{ margin: 0, fontSize: '1.1rem' }}>
          <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Relative Size:</strong>
          <br />{planet.size}x Earth
        </p>
      </div>

      <div style={{ 
        marginTop: '10px', 
        padding: '12px', 
        background: 'rgba(255,255,255,0.05)', 
        borderRadius: '12px',
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.8)'
      }}>
        {planet.hasRings ? 'Fun Fact: Known for its extensive ring system!' : 'Fun Fact: A fascinating world to explore!'}
      </div>
    </div>
  );
};

export default PlanetCard;
