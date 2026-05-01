import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useTexture } from "@react-three/drei";

const Planet = ({ texture, color, size, distance, speed, hasRings }) => {

  const orbitRef = useRef();
  const planetRef = useRef();

  // Load the texture image
  const planetTexture = texture ? useTexture(texture) : null;

  useFrame((state, delta) => {
    orbitRef.current.rotation.y += delta * speed;
    planetRef.current.rotation.y += delta * speed * 2;
  });

  return (
    <group ref={orbitRef}>
      <group position={[distance, 0, 0]}>
        
        <Sphere ref={planetRef} args={[size, 64, 64]}>
          <meshStandardMaterial
            map={planetTexture}
            color={planetTexture ? "white" : color}
            roughness={0.9}
            metalness={0.05}
          />
        </Sphere>

        {hasRings && (
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
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

      </group>
    </group>
  );
};

export default Planet;