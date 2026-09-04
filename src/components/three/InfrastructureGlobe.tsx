import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate points on a sphere
function generateSpherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

// Generate arc curve between two points on sphere
function createArcCurve(p1: THREE.Vector3, p2: THREE.Vector3, radius: number): THREE.CubicBezierCurve3 {
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(radius * 1.3);
  
  const cp1 = new THREE.Vector3().lerpVectors(p1, mid, 0.33);
  cp1.normalize().multiplyScalar(radius * 1.15);
  
  const cp2 = new THREE.Vector3().lerpVectors(p2, mid, 0.33);
  cp2.normalize().multiplyScalar(radius * 1.15);
  
  return new THREE.CubicBezierCurve3(p1, cp1, cp2, p2);
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const radius = 2;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sphere wireframe points
  const spherePoints = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    return generateSpherePoints(isMobile ? 800 : 2000, radius);
  }, []);

  // City/network nodes
  const cityNodes = useMemo(() => {
    const cities = [
      { lat: 28.6, lng: 77.2 },   // Delhi
      { lat: 19.1, lng: 72.9 },   // Mumbai
      { lat: 17.7, lng: 83.3 },   // Visakhapatnam
      { lat: 51.5, lng: -0.1 },   // London
      { lat: 40.7, lng: -74.0 },  // New York
      { lat: 35.7, lng: 139.7 },  // Tokyo
      { lat: 1.3, lng: 103.8 },   // Singapore
      { lat: 25.2, lng: 55.3 },   // Dubai
      { lat: -33.9, lng: 151.2 }, // Sydney
      { lat: 13.1, lng: 80.3 },   // Chennai
    ];

    return cities.map(({ lat, lng }) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
    });
  }, []);

  // Arc connections
  const arcs = useMemo(() => {
    const connections: [number, number][] = [
      [0, 1], [0, 2], [1, 7], [2, 9], [3, 4], 
      [5, 6], [6, 7], [3, 7], [4, 8],
    ];
    return connections.map(([a, b]) => {
      const curve = createArcCurve(cityNodes[a], cityNodes[b], radius);
      const points = curve.getPoints(40);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return geometry;
    });
  }, [cityNodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Slow auto-rotation + mouse influence
    groupRef.current.rotation.y += 0.002;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseRef.current.y * 0.1,
      0.02
    );
    groupRef.current.rotation.y += mouseRef.current.x * 0.001;

    // Animate arcs
    arcs.forEach((geo) => {
      const dashOffset = geo.getAttribute('dashOffset');
      if (dashOffset) {
        // @ts-expect-error - custom attribute
        dashOffset.value = state.clock.elapsedTime * 0.5;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Sphere dot cloud */}
      <Points positions={spherePoints} stride={3}>
        <PointMaterial
          transparent
          color="#C4B9A8"
          size={0.015}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>

      {/* Globe wireframe */}
      <mesh>
        <sphereGeometry args={[radius * 0.99, 32, 32]} />
        <meshBasicMaterial
          color="#EFE4CF"
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>

      {/* City Nodes */}
      {cityNodes.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#F15A24" />
          </mesh>
          {/* Glow */}
          <mesh>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#F15A24" transparent opacity={0.15} />
          </mesh>
          {/* Outer glow */}
          <mesh>
            <sphereGeometry args={[0.14, 8, 8]} />
            <meshBasicMaterial color="#FF8A24" transparent opacity={0.05} />
          </mesh>
        </group>
      ))}

      {/* Arc Connections */}
      {arcs.map((geometry, i) => (
        <line key={i}>
          <bufferGeometry attach="geometry" {...geometry} />
          <lineBasicMaterial
            color="#F15A24"
            transparent
            opacity={0.3}
            linewidth={1}
          />
        </line>
      ))}

      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[radius * 1.4, 0.005, 8, 100]} />
        <meshBasicMaterial color="#F15A24" transparent opacity={0.2} />
      </mesh>

      {/* Second orbital ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[radius * 1.55, 0.003, 8, 100]} />
        <meshBasicMaterial color="#FF8A24" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const count = window.innerWidth < 768 ? 50 : 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#F15A24"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseRef.current.x * 0.5, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseRef.current.y * 0.3, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function InfrastructureGlobe() {
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglAvailable(false);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  if (!webglAvailable) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #EFE4CF, #E5D8C0 60%, #C4B9A8)',
            boxShadow: '0 0 60px rgba(241, 90, 36, 0.15)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />

        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <Globe />
        </Float>

        <FloatingParticles />
        <CameraRig />
      </Canvas>
    </div>
  );
}
