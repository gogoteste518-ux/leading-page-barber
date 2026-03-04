import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';

export default function Chair3D({ position = [0, 0, 0] }) {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.3;
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const cyanMaterial = new MeshStandardMaterial({
    color: '#00ffff',
    metalness: 0.8,
    roughness: 0.2,
    emissive: '#00ffff',
    emissiveIntensity: 0.2,
  });

  return (
    <group ref={group} position={position}>
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
        <primitive object={cyanMaterial} attach="material" />
      </mesh>
      {/* Pole */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
        <primitive object={cyanMaterial} attach="material" />
      </mesh>
    </group>
  );
}