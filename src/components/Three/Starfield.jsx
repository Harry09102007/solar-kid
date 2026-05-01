import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const Starfield = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.05;
      groupRef.current.rotation.x -= delta * 0.02; // A slight tilt rotation for immersion
    }
  });

  return (
    <group ref={groupRef}>
      <Stars 
        radius={100} 
        depth={50} 
        count={7000} 
        factor={5} 
        saturation={0.5} 
        fade 
        speed={1} 
      />
    </group>
  );
};

export default Starfield;
