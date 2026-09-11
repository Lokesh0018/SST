import { useRef, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import { Environment, ContactShadows, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import InfrastructureCoreGlobe from './InfrastructureCoreGlobe';
import OrbitalObjects from './OrbitalObjects';
import '../../styles/Hero3DScene.css';

interface Hero3DSceneProps {
  activeService: string | null;
  setActiveService: (service: string | null) => void;
}

function CameraParallax() {
  useFrame((state) => {
    // Very subtle camera movement to create genuine depth parallax
    const targetX = state.pointer.x * 0.3;
    const targetY = (state.pointer.y * 0.3) + 0.4;

    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    // Removing lookAt so the camera stays parallel and doesn't cause horizontal skew on vertical movement
  });
  return null;
}

function SceneContents({ activeService, setActiveService }: Hero3DSceneProps) {
  // Use window.innerWidth for responsive breakpoints instead of ThreeJS world units
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  // Desktop: shift globe slightly to the right (x=0.9). Tablet: moderate shift. Mobile: centered.
  const groupPos = isMobile ? [0, -0.1, 0] : (isTablet ? [0.4, -0.15, 0] : [0.9, -0.15, 0]);
  const groupScale = isMobile ? 0.75 : (isTablet ? 0.85 : 1);

  const globeGroupRef = useRef<THREE.Group>(null!);

  return (
    <group position={groupPos as [number, number, number]} scale={groupScale}>
      <InfrastructureCoreGlobe globeGroupRef={globeGroupRef} />
      <OrbitalObjects activeService={activeService} setActiveService={setActiveService} globeGroupRef={globeGroupRef} />
    </group>
  );
}

export default function Hero3DScene({ activeService, setActiveService }: Hero3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Returns true if any part of the 3D scene container is in the viewport
  const isInView = useInView(containerRef, { margin: "0px 0px 200px 0px" });

  return (
    <div ref={containerRef} className="hero-3d-scene">
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
          <SceneContents activeService={activeService} setActiveService={setActiveService} />
          <CameraParallax />

          <Environment resolution={256}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
              <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 2, 1]} />
              <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
            </group>
          </Environment>

          <EffectComposer>
            <Bloom luminanceThreshold={0.7} mipmapBlur intensity={0.4} radius={0.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
