import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Scissors3D from './Scissors3D';
import Razor3D from './Razor3D';
import Chair3D from './Chair3D';

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ccff00" />
        <pointLight position={[10, -10, 10]} intensity={0.5} color="#ff0099" />
        
        <Scissors3D position={[-2.5, 0, 0]} />
        <Razor3D position={[0, 0, 0]} />
        <Chair3D position={[2.5, 0, 0]} />
      </Canvas>
    </div>
  );
}