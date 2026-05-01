// src/components/Three/SolarSystem.jsx
import React from 'react';
import Sun from './Sun';
import Planet from './Planet';
import { OrbitControls } from '@react-three/drei';

// Planets with textures and optional rings
const planetsData = [
  { name: 'Mercury', texture: '/textures/mercury.jpg', size: 0.5, distance: 7, speed: 1.5 },
  { name: 'Venus', texture: '/textures/venus.jpg', size: 0.8, distance: 10, speed: 1.2 },
  { name: 'Earth', texture: '/textures/earth.jpg', size: 0.9, distance: 14, speed: 1.0 },
  { name: 'Mars', texture: '/textures/mars.jpg', size: 0.7, distance: 18, speed: 0.8 },
  { name: 'Jupiter', texture: '/textures/jupiter.jpg', size: 2.5, distance: 25, speed: 0.4 },
  { name: 'Saturn', texture: '/textures/saturn.jpg', size: 2.0, distance: 34, speed: 0.3, hasRings: true },
  { name: 'Uranus', texture: '/textures/uranus.jpg', size: 1.5, distance: 42, speed: 0.2 },
  { name: 'Neptune', texture: '/textures/neptune.jpg', size: 1.4, distance: 50, speed: 0.1 },
];

const SolarSystem = () => {
  return (
    <group>
      {/* Camera controls */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        maxDistance={150} 
        minDistance={10} 
        autoRotate={true}
        autoRotateSpeed={0.5}
      />

      {/* Sun in the center */}
      <Sun />

      {/* Map planets from data */}
      {planetsData.map((p, i) => (
        <Planet
          key={i}
          texture={p.texture}      // planet texture
          size={p.size}
          distance={p.distance}
          speed={p.speed}
          hasRings={p.hasRings}    // optional rings (for Saturn)
        />
      ))}
    </group>
  );
};

export default SolarSystem;