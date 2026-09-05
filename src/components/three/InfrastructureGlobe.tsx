import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const earthVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const earthFragmentShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float time;

// Simplex 3D Noise function
float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i + vec3(0,0,0)), 
                       hash(i + vec3(1,0,0)),f.x),
                   mix(hash(i + vec3(0,1,0)), 
                       hash(i + vec3(1,1,0)),f.x),f.y),
               mix(mix(hash(i + vec3(0,0,1)), 
                       hash(i + vec3(1,0,1)),f.x),
                   mix(hash(i + vec3(0,1,1)), 
                       hash(i + vec3(1,1,1)),f.x),f.y),f.z);
}

float fbm(vec3 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p = p * 2.02;
    f += 0.2500 * noise(p); p = p * 2.03;
    f += 0.1250 * noise(p); p = p * 2.01;
    f += 0.0625 * noise(p);
    return f;
}

void main() {
  // Convert UV to 3D point on sphere for seamless noise
  float phi = vUv.y * 3.1415926535;
  float theta = vUv.x * 3.1415926535 * 2.0;
  vec3 p = vec3(sin(phi)*cos(theta), cos(phi), sin(phi)*sin(theta));
  
  // Continent noise
  float n = fbm(p * 3.0);
  float n2 = fbm(p * 5.0 + time * 0.015); // Clouds
  
  // Continents vs Ocean threshold
  float land = smoothstep(0.48, 0.55, n);
  
  // Colors (Cinematic Dark Earth)
  vec3 oceanColor = vec3(0.06, 0.07, 0.09); // Dark blueish charcoal
  vec3 landColor = vec3(0.12, 0.13, 0.15); // Slightly lighter charcoal
  vec3 cityColor = vec3(0.95, 0.35, 0.14); // Orange #F15A24
  
  vec3 color = mix(oceanColor, landColor, land);
  
  // Add city lights on land edges
  float lights = smoothstep(0.48, 0.58, n) * smoothstep(0.58, 0.48, n) * fbm(p * 20.0);
  lights = pow(lights, 1.5) * 8.0;
  
  // Pulse city lights
  float pulse = 0.8 + 0.2 * sin(time * 1.5 + p.x * 15.0 + p.y * 10.0);
  color += cityColor * lights * land * pulse;
  
  // Clouds
  float cloud = smoothstep(0.4, 0.8, n2) * 0.15;
  color += vec3(0.8, 0.8, 0.9) * cloud;
  
  // Atmosphere / Fresnel (Rim light)
  vec3 viewDir = normalize(-vPosition);
  float fresnel = 1.0 - dot(viewDir, vNormal);
  fresnel = smoothstep(0.3, 1.0, fresnel);
  
  vec3 atmosColor = vec3(0.95, 0.35, 0.14); // Warm orange atmosphere
  color += atmosColor * pow(fresnel, 2.5) * 0.8;
  
  gl_FragColor = vec4(color, 1.0);
}
`;

// Generate arc curve between two points on sphere
function createArcCurve(p1: THREE.Vector3, p2: THREE.Vector3, radius: number): THREE.CubicBezierCurve3 {
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(radius * 1.35);
  
  const cp1 = new THREE.Vector3().lerpVectors(p1, mid, 0.33);
  cp1.normalize().multiplyScalar(radius * 1.15);
  
  const cp2 = new THREE.Vector3().lerpVectors(p2, mid, 0.33);
  cp2.normalize().multiplyScalar(radius * 1.15);
  
  return new THREE.CubicBezierCurve3(p1, cp1, cp2, p2);
}

const icons = {
  camera: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  lock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  network: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="17" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="17" width="6" height="6" rx="1" />
      <path d="M6 4h11M4 7v10l8 3M20 7v10l-8 3" />
    </svg>
  ),
  zap: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  flame: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c-4.97 0-9-2.69-9-6 0-4 5-11 9-14 4 3 9 10 9 14 0 3.31-4.03 6-9 6z" />
      <path d="M12 22c-1.66 0-3-1.34-3-3 0-2 2-5 3-6 1 1 3 4 3 6 0 1.66-1.34 3-3 3z" />
    </svg>
  ),
  truck: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  building: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="22" />
      <line x1="15" y1="22" x2="15" y2="22" />
      <line x1="9" y1="6" x2="9" y2="6" />
      <line x1="15" y1="6" x2="15" y2="6" />
      <line x1="9" y1="10" x2="9" y2="10" />
      <line x1="15" y1="10" x2="15" y2="10" />
      <line x1="9" y1="14" x2="9" y2="14" />
      <line x1="15" y1="14" x2="15" y2="14" />
      <line x1="9" y1="18" x2="9" y2="18" />
      <line x1="15" y1="18" x2="15" y2="18" />
    </svg>
  )
};

const floatingIconsConfig = [
  { id: 'camera', pos: [2.5, 1.2, 0.5] as [number, number, number] },
  { id: 'lock', pos: [-2.2, -1.5, 1.2] as [number, number, number] },
  { id: 'zap', pos: [1.8, -2.0, 0.8] as [number, number, number] },
  { id: 'network', pos: [-1.8, 1.8, 1.5] as [number, number, number] },
  { id: 'flame', pos: [2.8, -0.2, -0.5] as [number, number, number] },
  { id: 'truck', pos: [-2.5, 0.5, -1.5] as [number, number, number] },
  { id: 'settings', pos: [0.5, 2.8, -0.8] as [number, number, number] },
  { id: 'building', pos: [-0.5, -2.8, -0.5] as [number, number, number] },
];

function FloatingIcon({ id, pos }: { id: string, pos: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const randomOffset = useMemo(() => Math.random() * 100, []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime + randomOffset) * 0.15;
    }
  });

  return (
    <group position={pos} ref={ref}>
      <Html center className="pointer-events-none">
        <div className="flex items-center justify-center w-12 h-12 bg-[#F7F0E0] rounded-full shadow-[0_8px_30px_rgba(23,22,19,0.2)] border border-[#F15A24]/40 text-[#171613] transition-transform duration-300">
          {icons[id as keyof typeof icons]}
        </div>
      </Html>
    </group>
  );
}

function OrbitalPath({ radius, tiltX, tiltY, speed, color = "#F15A24" }: { radius: number, tiltX: number, tiltY: number, speed: number, color?: string }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });
  
  return (
    <group rotation={[tiltX, tiltY, 0]}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.004, 8, 128]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#FF8A24" />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#FF8A24" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

function CinematicEarth({ radius }: { radius: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const globeRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (globeRef.current) {
      // Slow constant rotation
      globeRef.current.rotation.y += 0.001;
      
      // Mouse parallax
      globeRef.current.rotation.x = THREE.MathUtils.lerp(
        globeRef.current.rotation.x,
        mouseRef.current.y * 0.1,
        0.02
      );
      globeRef.current.rotation.y += mouseRef.current.x * 0.001;
    }
  });

  const uniforms = useMemo(() => ({
    time: { value: 0 }
  }), []);

  // Network Nodes
  const cityNodes = useMemo(() => {
    const cities = [
      { lat: 40.7, lng: -74.0 },  // New York
      { lat: 51.5, lng: -0.1 },   // London
      { lat: 48.8, lng: 2.35 },   // Paris
      { lat: 25.2, lng: 55.3 },   // Dubai
      { lat: 19.1, lng: 72.9 },   // Mumbai
      { lat: 1.3, lng: 103.8 },   // Singapore
      { lat: 35.7, lng: 139.7 },  // Tokyo
      { lat: -33.9, lng: 151.2 }, // Sydney
      { lat: 22.3, lng: 114.1 },  // Hong Kong
      { lat: 37.7, lng: -122.4 }, // SF
      { lat: -23.5, lng: -46.6 }, // Sao Paulo
      { lat: -1.2, lng: 36.8 },   // Nairobi
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
  }, [radius]);

  // Node pulses
  const NodeGroup = ({ pos, index }: { pos: THREE.Vector3, index: number }) => {
    const pulseRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
      if (pulseRef.current) {
        const s = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.5;
        pulseRef.current.scale.set(s, s, s);
      }
    });

    return (
      <group position={pos}>
        <mesh>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#FF8A24" />
        </mesh>
        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#F15A24" transparent opacity={0.3} />
        </mesh>
      </group>
    );
  };

  // Arcs between nodes
  const arcs = useMemo(() => {
    const connections: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], 
      [5, 6], [6, 7], [8, 6], [9, 0], [10, 0], [11, 3]
    ];
    return connections.map(([a, b]) => {
      const curve = createArcCurve(cityNodes[a], cityNodes[b], radius);
      const points = curve.getPoints(40);
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, [cityNodes, radius]);

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <shaderMaterial 
          ref={materialRef}
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={uniforms}
          transparent={false}
        />
      </mesh>

      {cityNodes.map((pos, i) => (
        <NodeGroup key={i} pos={pos} index={i} />
      ))}

      {arcs.map((geometry, i) => (
        <line key={i}>
          <bufferGeometry attach="geometry" {...geometry} />
          <lineBasicMaterial
            color="#F15A24"
            transparent
            opacity={0.4}
            linewidth={2}
          />
        </line>
      ))}
    </group>
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
  const radius = 2.2; // Slightly larger for 55-65% screen presence

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
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        
        {/* The main cinematic earth */}
        <CinematicEarth radius={radius} />
        
        {/* Orbital Arcs */}
        <OrbitalPath radius={radius * 1.2} tiltX={Math.PI / 6} tiltY={0} speed={0.2} />
        <OrbitalPath radius={radius * 1.4} tiltX={-Math.PI / 8} tiltY={Math.PI / 4} speed={-0.15} color="#FF8A24" />
        <OrbitalPath radius={radius * 1.6} tiltX={Math.PI / 3} tiltY={-Math.PI / 6} speed={0.1} />
        <OrbitalPath radius={radius * 1.1} tiltX={-Math.PI / 4} tiltY={-Math.PI / 3} speed={-0.25} />
        <OrbitalPath radius={radius * 1.8} tiltX={Math.PI / 2} tiltY={Math.PI / 8} speed={0.08} color="#FF8A24" />

        {/* Floating Icons */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          {floatingIconsConfig.map(icon => (
            <FloatingIcon key={icon.id} {...icon} />
          ))}
        </Float>

        <CameraRig />
      </Canvas>
    </div>
  );
}
