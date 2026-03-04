import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';

export default function Scissors3D({ position = [0, 0, 0] }) {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  const metalMaterial = new MeshStandardMaterial({
    color: '#ccff00',
    metalness: 0.9,
    roughness: 0.1,
    emissive: '#ccff00',
    emissiveIntensity: 0.2,
  });

  return (
    <group ref={group} position={position}>
      {/* Blade 1 */}
      <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.1, 1.5, 0.05]} />
        <primitive object={metalMaterial} attach="material" />
      </mesh>
      {/* Blade 2 */}
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.1, 1.5, 0.05]} />
        <primitive object={metalMaterial} attach="material" />
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#000000" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}