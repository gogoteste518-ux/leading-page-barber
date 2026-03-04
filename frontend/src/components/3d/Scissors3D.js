import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Scissors3D({ position = [0, 0, 0] }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Blade 1 */}
      <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.1, 1.5, 0.05]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Blade 2 */}
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.1, 1.5, 0.05]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}