import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

// Utility to convert Lat/Lng to 3D Sphere coordinates
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// --------------------------------------------------------
// DATA CONFIGURATION
// --------------------------------------------------------
const HUBS = [
  // Primary Infrastructure Hubs (Largest)
  { id: 'MUM', lat: 19.07, lng: 72.87, type: 'primary', size: 0.016 }, // Strongest Hub (India)
  { id: 'DXB', lat: 25.20, lng: 55.27, type: 'primary', size: 0.014 }, // Middle East
  { id: 'NYC', lat: 40.71, lng: -74.00, type: 'primary', size: 0.014 }, // North America
  { id: 'LON', lat: 51.50, lng: -0.12, type: 'primary', size: 0.014 }, // Europe
  { id: 'SIN', lat: 1.35, lng: 103.81, type: 'primary', size: 0.014 }, // Southeast Asia

  // Secondary Nodes (Smaller)
  { id: 'SF', lat: 37.77, lng: -122.41, type: 'secondary', size: 0.007 },
  { id: 'FRA', lat: 50.11, lng: 8.68, type: 'secondary', size: 0.007 },
  { id: 'TOK', lat: 35.67, lng: 139.65, type: 'secondary', size: 0.007 },
  { id: 'SYD', lat: -33.86, lng: 151.20, type: 'secondary', size: 0.007 },
  { id: 'GRU', lat: -23.55, lng: -46.63, type: 'secondary', size: 0.007 },
];

const ALL_NODES = HUBS; // Removed the scattered satellites

// Strategic surface network connections (very minimal)
const SURFACE_ARCS = [
  { sLat: 40.71, sLng: -74.00, eLat: 51.50, eLng: -0.12 }, // NYC - LON
  { sLat: 51.50, sLng: -0.12, eLat: 25.20, eLng: 55.27 },  // LON - DXB
  { sLat: 25.20, sLng: 55.27, eLat: 19.07, eLng: 72.87 },  // DXB - MUM
  { sLat: 19.07, sLng: 72.87, eLat: 1.35, eLng: 103.81 },  // MUM - SIN
];


// --------------------------------------------------------
// COMPONENTS
// --------------------------------------------------------

function NetworkNode({ lat, lng, size, type, radius }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);
  
  const pos = useMemo(() => latLngToVector3(lat, lng, radius), [lat, lng, radius]);
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // 1. Edge Dimming (Dot product with camera)
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);
    
    const camDir = state.camera.position.clone().normalize();
    const nodeDir = worldPos.clone().normalize();
    const dot = camDir.dot(nodeDir);
    
    // smoothstep creates a smooth fade as the node approaches the edge of the sphere
    const visibility = THREE.MathUtils.smoothstep(dot, 0.15, 0.5);
    
    // Hide completely if on the back
    groupRef.current.visible = dot > 0.05;

    // 2. Pulse effect for primary hubs
    let pulseScale = 1;
    if (type === 'primary') {
      pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2 + timeOffset) * 0.25;
    }
    
    groupRef.current.scale.setScalar(pulseScale * visibility);
    
    if (coreMat.current) coreMat.current.opacity = (type === 'primary' ? 0.9 : 0.5) * visibility;
    if (glowMat.current) glowMat.current.opacity = (type === 'primary' ? 0.35 : 0.1) * visibility;
  });

  return (
    <group ref={groupRef} position={pos}>
      <mesh>
        <sphereGeometry args={[size, 12, 12]} />
        <meshBasicMaterial ref={coreMat} color="#F4511E" transparent depthWrite={false} />
      </mesh>
      {type === 'primary' && (
        <mesh>
          <sphereGeometry args={[size * 2.8, 16, 16]} />
          <meshBasicMaterial ref={glowMat} color="#FFB08A" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      )}
    </group>
  );
}

function SurfaceArc({ sLat, sLng, eLat, eLng, radius }: any) {
  const pts = useMemo(() => {
    const start = latLngToVector3(sLat, sLng, radius);
    const end = latLngToVector3(eLat, eLng, radius);
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
    mid.normalize().multiplyScalar(radius + 0.04); // very subtle curve above surface
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(30);
  }, [sLat, sLng, eLat, eLng, radius]);

  return (
    <Line
      points={pts}
      color="#E8784E"
      lineWidth={1}
      transparent
      opacity={0.15}
    />
  );
}

function DynamicSpaceArc({ lat, lng, targetPos, radius, globeRef }: any) {
  const lineRef = useRef<THREE.Line>(null);
  const localStart = useMemo(() => latLngToVector3(lat, lng, radius), [lat, lng, radius]);
  const end = useMemo(() => new THREE.Vector3(...targetPos), [targetPos]);
  const pts = useMemo(() => Array.from({ length: 40 }, () => new THREE.Vector3()), []);

  useFrame(() => {
    if (!lineRef.current || !globeRef.current) return;
    
    // Transform the start point based on the globe's current rotation matrix
    const start = localStart.clone();
    start.applyMatrix4(globeRef.current.matrix);

    const mid = new THREE.Vector3().lerpVectors(start, end, 0.4);
    mid.y += Math.abs(start.x - end.x) * 0.2; // Add a dynamic curve based on distance
    
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const curvePoints = curve.getPoints(39);
    
    const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < 40; i++) {
      positions[i * 3] = curvePoints[i].x;
      positions[i * 3 + 1] = curvePoints[i].y;
      positions[i * 3 + 2] = curvePoints[i].z;
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <line ref={lineRef as any}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(pts.length * 3), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#E8784E" transparent opacity={0.25} />
    </line>
  );
}


// --------------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------------
export default function InfrastructureCoreGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);

  const globeRadius = 0.82;
  const isDragging = useRef(false);
  const dragRotation = useRef({ x: 0.25, y: Math.PI * 0.85 });

  useEffect(() => {
    new THREE.TextureLoader().load('/earth-map.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setEarthTexture(tex);
    });
  }, []);

  const coreMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#171717', // Deep Graphite
    roughness: 0.8,
    metalness: 0.4,
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#292929', // Graphite Gray
    metalness: 0.2,
    roughness: 0.12,
    transmission: 0.55,
    ior: 1.35,
    transparent: true,
    opacity: 0.35,
    side: THREE.FrontSide,
    depthWrite: false,
  }), []);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    isDragging.current = false;
    if (e.target.hasPointerCapture(e.pointerId)) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: any) => {
    if (isDragging.current) {
      dragRotation.current.y += e.movementX * 0.008;
      dragRotation.current.x += e.movementY * 0.008;
      dragRotation.current.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, dragRotation.current.x));
    }
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      const tx = (state.pointer.x * Math.PI) / 30;
      const ty = (state.pointer.y * Math.PI) / 30;
      
      const targetY = dragRotation.current.y + tx;
      const targetX = dragRotation.current.x - ty;

      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.015;
    }
  });

  return (
    <>

      {/* The Globe itself */}
      <group ref={groupRef}>
        
        {/* Invisible interaction layer */}
        <mesh 
          onPointerDown={handlePointerDown} 
          onPointerUp={handlePointerUp}
          onPointerOver={() => { document.body.style.cursor = 'grab' }}
          onPointerOut={(e: any) => { 
            document.body.style.cursor = 'auto';
            handlePointerUp(e); 
          }} 
          onPointerMove={(e: any) => {
            if (isDragging.current) document.body.style.cursor = 'grabbing';
            handlePointerMove(e);
          }}
        >
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshBasicMaterial visible={false} />
        </mesh>

        {/* Inner Graphite Core */}
        <Sphere args={[globeRadius, 32, 32]}>
          <primitive object={coreMaterial} attach="material" />
        </Sphere>

        {/* Map layer (Continent mask) */}
        {earthTexture && (
          <Sphere args={[globeRadius + 0.005, 32, 32]}>
            <meshBasicMaterial 
              map={earthTexture}
              color="#686560" // Lighter graphite for clearly visible continents
              transparent
              opacity={0.65}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </Sphere>
        )}

        {/* Hierarchical Network Nodes */}
        {ALL_NODES.map((node) => (
          <NetworkNode 
            key={node.id} 
            lat={node.lat} 
            lng={node.lng} 
            size={node.size} 
            type={node.type} 
            radius={globeRadius + 0.01} 
          />
        ))}

        {/* Minimal Surface Network Routes */}
        {SURFACE_ARCS.map((arc, idx) => (
          <SurfaceArc 
            key={`surface-arc-${idx}`} 
            sLat={arc.sLat} 
            sLng={arc.sLng} 
            eLat={arc.eLat} 
            eLng={arc.eLng} 
            radius={globeRadius + 0.01} 
          />
        ))}

        {/* Outer Glass Layer */}
        <Sphere ref={outerRef} args={[0.86, 32, 32]}>
          <primitive object={glassMaterial} attach="material" />
        </Sphere>

        {/* Soft internal orange glow */}
        <Sphere args={[0.84, 32, 32]}>
          <meshBasicMaterial
            color="#F15A24"
            transparent
            opacity={0.03}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>
    </>
  );
}
