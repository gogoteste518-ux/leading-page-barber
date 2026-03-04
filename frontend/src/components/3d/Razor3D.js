import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Razor3D({ position = [0, 0, 0] }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
      groupRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.7) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Blade */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.02]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.95} 
          roughness={0.05}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Handle */}
      <mesh position={[-0.5, -0.15, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Detail */}
      <mesh position={[-0.5, -0.15, 0.06]}>
        <boxGeometry args={[0.25, 0.35, 0.02]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}