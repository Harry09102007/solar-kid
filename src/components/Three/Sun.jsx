import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Sun = () => {
  const sunRef = useRef();

  useFrame((state, delta) => {
    sunRef.current.rotation.y += delta * 0.2;
  });

  // Create a realistic smooth gradient texture for the sun's glow
  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    const center = 256;
    
    // Create a smooth radial gradient
    const gradient = context.createRadialGradient(center, center, 0, center, center, center);
    
    // Core of the sun (white/yellow)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    // Edge of the physical sun surface matches this boundary
    gradient.addColorStop(0.2, 'rgba(255, 240, 180, 1)');
    // Intense fiery corona
    gradient.addColorStop(0.25, 'rgba(255, 140, 0, 0.9)');
    // Smooth transition to deeper red/orange rays
    gradient.addColorStop(0.45, 'rgba(220, 60, 0, 0.5)');
    // Very soft expansive outer glow
    gradient.addColorStop(0.7, 'rgba(150, 20, 0, 0.1)');
    // Fade out to perfectly transparent
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 512);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <group>
      {/* Primary light illuminating the solar system */}
      <pointLight position={[0, 0, 0]} intensity={12} distance={300} decay={1.5} color="#fff1cc" />
      {/* Warm inner light for the near area */}
      <pointLight position={[0, 0, 0]} intensity={8} distance={50} decay={2} color="#ff9e00" />

      {/* Actual Sun Sphere (gives 3D depth and rotation) */}
      <Sphere ref={sunRef} args={[4, 64, 64]}>
        <meshBasicMaterial color="#fffae6" />
      </Sphere>
      
      {/* Volumetric smooth glow using a sprite */}
      <sprite scale={[30, 30, 1]}>
        <spriteMaterial 
          map={glowTexture} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent={true}
        />
      </sprite>
    </group>
  );
};

export default Sun;
