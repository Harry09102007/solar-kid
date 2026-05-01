import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';

const PlanetExplorer3D = ({ planet }) => {
  const planetRef = useRef();
  
  const textureMap = useTexture(planet?.texture || '/textures/earth.jpg');

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.5;
    }
  });

  if (!planet) return null;

  return (
    <group>
      <Sphere ref={planetRef} args={[2.5, 64, 64]}>
        <meshStandardMaterial 
          map={textureMap}
          color="white"
          roughness={0.7} 
          metalness={0.1} 
        />
      </Sphere>
      
      {planet.hasRings && (
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <ringGeometry args={[3.5, 5.5, 64]} />
          <meshStandardMaterial
            color="#eaddcf"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            roughness={0.5}
            metalness={0.4}
          />
        </mesh>
      )}

      {/* Atmospheric simple glow */}
      <Sphere args={[2.6, 64, 64]}>
        <meshBasicMaterial 
          color={planet.color} 
          transparent 
          opacity={0.15} 
          blending={2} // Additive blending
        />
      </Sphere>
    </group>
  );
};

export default PlanetExplorer3D;
