import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Chair3D({ position = [0, 0, 0] }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Seat */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.6, -0.4]}>
        <boxGeometry args={[0.8, 0.9, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.6, 32]} />
        <meshStandardMaterial 
          color="#B8860B" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#B8860B"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Pole */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}