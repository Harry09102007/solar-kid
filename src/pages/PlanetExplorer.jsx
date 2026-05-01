import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Starfield from '../components/Three/Starfield';
import PlanetCard from '../components/UI/PlanetCard';
import PlanetExplorer3D from '../components/Three/PlanetExplorer3D';

const planetsData = [
  { id: 'mercury', name: 'Mercury', texture: '/textures/mercury.jpg', color: '#888888', size: 0.8, distance: '57.9 million km', atmosphere: 'None' },
  { id: 'venus', name: 'Venus', texture: '/textures/venus.jpg', color: '#e3bb76', size: 1.2, distance: '108.2 million km', atmosphere: 'Thick (CO2)' },
  { id: 'earth', name: 'Earth', texture: '/textures/earth.jpg', color: '#2b82c9', size: 1.3, distance: '149.6 million km', atmosphere: 'Nitrogen & Oxygen' },
  { id: 'mars', name: 'Mars', texture: '/textures/mars.jpg', color: '#c1440e', size: 1.0, distance: '227.9 million km', atmosphere: 'Thin (CO2)' },
  { id: 'jupiter', name: 'Jupiter', texture: '/textures/jupiter.jpg', color: '#d39c7e', size: 3.5, distance: '778.6 million km', atmosphere: 'Hydrogen & Helium' },
  { id: 'saturn', name: 'Saturn', texture: '/textures/saturn.jpg', color: '#eaddb9', size: 3.0, distance: '1.43 billion km', atmosphere: 'Hydrogen & Helium', hasRings: true },
  { id: 'uranus', name: 'Uranus', texture: '/textures/uranus.jpg', color: '#4b70dd', size: 2.2, distance: '2.87 billion km', atmosphere: 'Ice & Gas' },
  { id: 'neptune', name: 'Neptune', texture: '/textures/neptune.jpg', color: '#274687', size: 2.1, distance: '4.50 billion km', atmosphere: 'Ice & Gas' },
];

const PlanetExplorer = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(planetsData[2]); // Default Earth

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
      {/* 3D View */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <color attach="background" args={['#020208']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 3, 5]} intensity={1.5} />
          <Starfield />
          <PlanetExplorer3D planet={selectedPlanet} />
          <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Info Panel */}
      <div style={{ width: '400px', padding: '100px 30px 40px', display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'rgba(5, 5, 15, 0.8)', borderLeft: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
        <h2 className="text-glow" style={{ fontSize: '2rem', color: '#fff', marginBottom: '20px' }}>
          Select a Planet
        </h2>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {planetsData.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPlanet(p)}
              style={{
                background: selectedPlanet.id === p.id ? 'rgba(100, 150, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${selectedPlanet.id === p.id ? '#fff' : 'transparent'}`,
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        <PlanetCard planet={selectedPlanet} />
      </div>
    </div>
  );
};

export default PlanetExplorer;
