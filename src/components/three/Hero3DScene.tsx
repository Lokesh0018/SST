import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import InfrastructureCoreGlobe from './InfrastructureCoreGlobe';
import OrbitalObjects from './OrbitalObjects';

interface Hero3DSceneProps {
  activeService: string | null;
  setActiveService: (service: string | null) => void;
}

export default function Hero3DScene({ activeService, setActiveService }: Hero3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Returns true if any part of the 3D scene container is in the viewport
  const isInView = useInView(containerRef, { margin: "0px 0px 200px 0px" });

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        frameloop={isInView ? 'always' : 'never'}
        camera={{ position: [0, 0.4, 6.6], fov: 40 }}
        dpr={[1, 1.5]} // Limit pixel ratio to 1.5 to save huge amounts of GPU power on Retina/4K displays
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.1, powerPreference: 'high-performance' }}
      >
      {/* Warm ambient fill — not too bright */}
      <ambientLight intensity={0.55} color="#F7F0E0" />
      
      {/* Main key light — warm, from upper-right */}
      <directionalLight position={[6, 6, 5]} intensity={1.6} color="#FFF8F0" castShadow />
      
      {/* Fill light — softer, from left */}
      <directionalLight position={[-5, 2, -3]} intensity={0.4} color="#ffffff" />
      
      {/* Orange accent rim lights — positioned BEHIND the globe */}
      <pointLight position={[2, 1, -3]} intensity={0.8} color="#F4511E" distance={10} decay={2} />
      <pointLight position={[-2, -1, -3]} intensity={0.5} color="#F4511E" distance={8} decay={2} />

      <Suspense fallback={null}>
        <group position={[0, -0.15, 0]}>
          <InfrastructureCoreGlobe />
          <OrbitalObjects activeService={activeService} setActiveService={setActiveService} />
        </group>
        
        <Environment preset="city" />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.7} mipmapBlur intensity={0.4} radius={0.5} />
        </EffectComposer>
      </Suspense>
    </Canvas>
    </div>
  );
}
