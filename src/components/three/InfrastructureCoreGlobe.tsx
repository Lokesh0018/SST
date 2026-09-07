import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Html } from '@react-three/drei';
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
const GLOBAL_LOCATIONS = [
  // Primary Infrastructure Hub (HQ)
  { id: 'VIZAG', name: 'VISAKHAPATNAM\nINDIA\nPRIMARY LOCATION', lat: 17.69, lng: 83.29, type: 'hq', size: 0.02 },
  
  // Secondary Global Nodes
  { id: 'SIN', name: 'GLOBAL CONNECTION\nSOUTHEAST ASIA', lat: 1.35, lng: 103.82, type: 'global', size: 0.01 },
  { id: 'DXB', name: 'GLOBAL CONNECTION\nMIDDLE EAST', lat: 25.20, lng: 55.27, type: 'global', size: 0.01 },
  { id: 'LON', name: 'GLOBAL CONNECTION\nEUROPE', lat: 51.51, lng: -0.13, type: 'global', size: 0.01 },
  { id: 'FRA', name: 'GLOBAL CONNECTION\nCENTRAL EUROPE', lat: 50.11, lng: 8.68, type: 'global', size: 0.01 },
  { id: 'NYC', name: 'GLOBAL CONNECTION\nNORTH AMERICA', lat: 40.71, lng: -74.01, type: 'global', size: 0.01 },
  { id: 'NBO', name: 'GLOBAL CONNECTION\nAFRICA', lat: -1.29, lng: 36.82, type: 'global', size: 0.01 },
  { id: 'TOK', name: 'GLOBAL CONNECTION\nEAST ASIA', lat: 35.68, lng: 139.65, type: 'global', size: 0.01 },
  { id: 'SYD', name: 'GLOBAL CONNECTION\nAUSTRALIA', lat: -33.87, lng: 151.21, type: 'global', size: 0.01 },
];

const ALL_NODES = GLOBAL_LOCATIONS;

// Strategic surface network connections (all from Vizag to global destinations)
const SURFACE_ARCS = [
  { sLat: 17.69, sLng: 83.29, eLat: 1.35, eLng: 103.82, delay: 1.0 },    // Vizag to Singapore
  { sLat: 17.69, sLng: 83.29, eLat: 25.20, eLng: 55.27, delay: 1.1 },    // Vizag to Dubai
  { sLat: 17.69, sLng: 83.29, eLat: 51.51, eLng: -0.13, delay: 1.2 },    // Vizag to London
  { sLat: 17.69, sLng: 83.29, eLat: 50.11, eLng: 8.68, delay: 1.3 },     // Vizag to Frankfurt
  { sLat: 17.69, sLng: 83.29, eLat: 40.71, eLng: -74.01, delay: 1.4 },   // Vizag to New York
  { sLat: 17.69, sLng: 83.29, eLat: -1.29, eLng: 36.82, delay: 1.5 },    // Vizag to Nairobi
  { sLat: 17.69, sLng: 83.29, eLat: 35.68, eLng: 139.65, delay: 1.6 },   // Vizag to Tokyo
  { sLat: 17.69, sLng: 83.29, eLat: -33.87, eLng: 151.21, delay: 1.7 },  // Vizag to Sydney
];


// --------------------------------------------------------
// COMPONENTS
// --------------------------------------------------------

function NetworkNode({ lat, lng, size, type, radius, name }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);
  
  const pos = useMemo(() => latLngToVector3(lat, lng, radius), [lat, lng, radius]);
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Edge Dimming
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);
    const camDir = state.camera.position.clone().normalize();
    const nodeDir = worldPos.clone().normalize();
    const dot = camDir.dot(nodeDir);
    const visibility = THREE.MathUtils.smoothstep(dot, 0.15, 0.5);
    groupRef.current.visible = dot > 0.05;

    // Intro Animation Timeline
    const t = state.clock.elapsedTime;
    let introScale = 1;
    let introOpacity = 1;

    if (type === 'hq') {
      // HQ appears at 0.5s
      introScale = Math.min(1, Math.max(0, (t - 0.5) / 0.5));
      introOpacity = Math.min(1, Math.max(0, (t - 0.5) / 0.5));
    } else {
      // Projects appear at 1.5s
      introScale = Math.min(1, Math.max(0, (t - 1.5) / 0.5));
      introOpacity = Math.min(1, Math.max(0, (t - 1.5) / 0.5));
    }

    // Pulse effect
    let pulseScale = 1;
    if (type === 'hq') {
      pulseScale = 1 + Math.sin(t * 1.5 + timeOffset) * 0.15;
    } else {
      pulseScale = 1 + Math.sin(t * 0.8 + timeOffset) * 0.08;
    }
    
    // Combine scales
    const finalScale = pulseScale * introScale * visibility;
    groupRef.current.scale.setScalar(finalScale);
    
    if (coreMat.current) coreMat.current.opacity = (type === 'hq' ? 0.9 : 0.6) * visibility * introOpacity;
    if (glowMat.current) glowMat.current.opacity = (type === 'hq' ? 0.4 : 0.15) * visibility * introOpacity;
  });

  return (
    <group ref={groupRef} position={pos}>
      <mesh 
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[size, 12, 12]} />
        <meshBasicMaterial ref={coreMat} color="#F4511E" transparent depthWrite={false} />
      </mesh>
      
      {/* Glow layer for all nodes, slightly larger for HQ */}
      <mesh>
        <sphereGeometry args={[type === 'hq' ? size * 3.5 : size * 2.5, 16, 16]} />
        <meshBasicMaterial ref={glowMat} color="#FFB08A" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <Html distanceFactor={2.5} zIndexRange={[100, 0]}>
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(28, 28, 27, 0.8)',
          backdropFilter: 'blur(4px)',
          color: '#FFFDF8',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '9px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          border: '1px solid rgba(244, 81, 30, 0.3)',
          opacity: hovered ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease',
        }}>
          {name}
        </div>
      </Html>
    </group>
  );
}

function SurfaceArc({ sLat, sLng, eLat, eLng, radius, delay = 0 }: any) {
  const [currentPts, setCurrentPts] = useState<THREE.Vector3[]>([]);
  const fullPts = useMemo(() => {
    const start = latLngToVector3(sLat, sLng, radius);
    const end = latLngToVector3(eLat, eLng, radius);
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
    mid.normalize().multiplyScalar(radius + 0.04);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(30);
  }, [sLat, sLng, eLat, eLng, radius]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const progress = Math.min(1, Math.max(0, (t - delay) / 0.8));
    if (progress > 0 && progress < 1) {
      const numPts = Math.max(2, Math.floor(progress * fullPts.length));
      setCurrentPts(fullPts.slice(0, numPts));
    } else if (progress === 1 && currentPts.length !== fullPts.length) {
      setCurrentPts(fullPts);
    }
  });

  if (currentPts.length < 2) return null;

  return (
    <Line
      points={currentPts}
      color="#E8784E"
      lineWidth={1.5}
      transparent
      opacity={0.4}
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
export default function InfrastructureCoreGlobe({ globeGroupRef }: { globeGroupRef?: React.RefObject<THREE.Group> }) {
  const internalRef = useRef<THREE.Group>(null);
  const groupRef = globeGroupRef || internalRef;
  const outerRef = useRef<THREE.Mesh>(null);
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);

  const globeRadius = 0.98; // ~20% increase
  const isDragging = useRef(false);
  const dragRotation = useRef({ x: 0.05, y: Math.PI * 1.12 }); // Perfectly matched to user reference image (India center-right)
  const mapMatRef = useRef<THREE.MeshBasicMaterial>(null);

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
    const t = state.clock.elapsedTime;
    
    // Entrance Animation: Globe Scale (0.0 - 0.3s)
    if (groupRef.current) {
      const scaleProgress = Math.min(1, Math.max(0, t / 0.3));
      const easeScale = 1 - (1 - scaleProgress) * (1 - scaleProgress);
      groupRef.current.scale.setScalar(0.94 + 0.06 * easeScale);
    }
    
    // Entrance Animation: Continents Reveal (0.2 - 0.7s)
    if (mapMatRef.current) {
      const mapProgress = Math.min(1, Math.max(0, (t - 0.2) / 0.5));
      mapMatRef.current.opacity = 0.7 * mapProgress;
    }

    if (groupRef.current) {
      const tx = (state.pointer.x * Math.PI) / 30;
      const ty = (state.pointer.y * Math.PI) / 30;
      
      const targetY = dragRotation.current.y + tx;
      const targetX = dragRotation.current.x - ty;

      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
    }
    if (outerRef.current) {
      // 1 full rotation every 40s = (2*PI)/40 = 0.157 rad/sec
      outerRef.current.rotation.y -= delta * 0.157;
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

        {/* Subtle Longitude/Latitude Wireframe Grid */}
        <Sphere args={[globeRadius + 0.002, 24, 24]}>
          <meshBasicMaterial 
            color="#D8CFBE" 
            wireframe 
            transparent 
            opacity={0.05} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Sphere>

        {/* Map layer (Continent mask) */}
        {earthTexture && (
          <Sphere args={[globeRadius + 0.006, 64, 64]}>
            <meshBasicMaterial 
              ref={mapMatRef}
              map={earthTexture}
              color="#686560" 
              transparent
              opacity={0} // Starts at 0, animated in useFrame
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </Sphere>
        )}

        {/* Hierarchical Network Nodes */}
        {ALL_NODES.map((node, i) => (
          <NetworkNode 
            key={`node-${i}`} 
            name={node.name}
            lat={node.lat} 
            lng={node.lng} 
            size={node.size} 
            type={node.type} 
            radius={globeRadius + 0.01} 
          />
        ))}

        {/* Atmospheric Rim (Soft glow around edge) */}
        <Sphere args={[globeRadius + 0.04, 32, 32]}>
          <meshBasicMaterial
            color="#FFFDF8"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </Sphere>

        {/* Outer Glass Layer */}
        <Sphere ref={outerRef} args={[globeRadius + 0.05, 32, 32]}>
          <primitive object={glassMaterial} attach="material" />
        </Sphere>

        {/* Soft internal orange glow */}
        <Sphere args={[globeRadius + 0.03, 32, 32]}>
          <meshBasicMaterial
            color="#F15A24"
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Global Connection Arcs */}
        {SURFACE_ARCS.map((arc, i) => (
          <SurfaceArc 
            key={`arc-${i}`} 
            sLat={arc.sLat} 
            sLng={arc.sLng} 
            eLat={arc.eLat} 
            eLng={arc.eLng} 
            radius={globeRadius + 0.015} 
          />
        ))}
      </group>
    </>
  );
}
