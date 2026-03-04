import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Razor3D({ position = [0, 0, 0] }) {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
      group.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.7) * 0.15;
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Blade */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.02]} />
        <meshStandardMaterial 
          color="#ff0099" 
          metalness={0.95} 
          roughness={0.05}
          emissive="#ff0099"
          emissiveIntensity={0.3}
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
          color="#ff0099" 
          metalness={0.95} 
          roughness={0.05}
          emissive="#ff0099"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}