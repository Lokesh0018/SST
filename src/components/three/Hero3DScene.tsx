import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import InfrastructureCoreGlobe from './InfrastructureCoreGlobe';
import OrbitalObjects from './OrbitalObjects';

interface Hero3DSceneProps {
  activeService: string | null;
  setActiveService: (service: string | null) => void;
}

export default function Hero3DScene({ activeService, setActiveService }: Hero3DSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.8], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMappingExposure: 1.1 }}
    >
      {/* Warm ambient fill — not too bright */}
      <ambientLight intensity={0.55} color="#F7F0E0" />
      
      {/* Main key light — warm, from upper-right */}
      <directionalLight position={[6, 6, 5]} intensity={1.6} color="#FFF8F0" castShadow />
      
      {/* Fill light — softer, from left */}
      <directionalLight position={[-5, 2, -3]} intensity={0.4} color="#ffffff" />
      
      {/* Orange accent rim lights — positioned BEHIND the globe */}
      <pointLight position={[2, 1, -3]} intensity={0.8} color="#F15A24" distance={10} decay={2} />
      <pointLight position={[-2, -1, -3]} intensity={0.5} color="#F15A24" distance={8} decay={2} />

      <Suspense fallback={null}>
        <group position={[0, -0.15, 0]}>
          <InfrastructureCoreGlobe />
          <OrbitalObjects activeService={activeService} />
          
          {/* Soft contact shadows grounding the objects */}
          <ContactShadows 
            position={[0, -2.2, 0]} 
            opacity={0.12} 
            scale={14} 
            blur={2.5} 
            far={6} 
            color="#2A2722" 
          />
        </group>
        
        <Environment preset="city" />
        
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.7} mipmapBlur intensity={0.4} radius={0.5} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
