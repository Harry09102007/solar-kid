import React from 'react';
import { Canvas } from '@react-three/fiber';
import SolarSystem from '../components/Three/SolarSystem';
import Starfield from '../components/Three/Starfield';

const Home = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '20vh',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <h1 className="text-glow" style={{ fontSize: '4rem', color: '#fff', margin: 0 }}>
          Explore The Universe
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', marginTop: '10px' }}>
          An interactive journey through our solar system
        </p>
      </div>

      <Canvas camera={{ position: [0, 20, 35], fov: 45 }}>
        <color attach="background" args={['#020208']} />
        {/* Increased ambient light to make planets brighter and easily recognizable */}
        <ambientLight intensity={0.6} />
        {/* Added a weak directional light for volume and subtle highlights */}
        <directionalLight position={[10, 20, 10]} intensity={0.4} color="#e6f2ff" />
        <Starfield />
        <SolarSystem />
      </Canvas>
    </div>
  );
};

export default Home;
