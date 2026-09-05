import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

// Utility to convert Lat/Lng to 3D Sphere coordinates
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  // The standard equirectangular map puts prime meridian at the center or edge.
  // We offset lng by 180 to match THREE.SphereGeometry's default UV mapping
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Generate an arc between two points
function createArc(startLat: number, startLng: number, endLat: number, endLng: number, radius: number, altitude: number) {
  const start = latLngToVector3(startLat, startLng, radius);
  const end = latLngToVector3(endLat, endLng, radius);
  
  const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
  // Push the midpoint out by the altitude to create a curve
  mid.normalize().multiplyScalar(radius + altitude);
  
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  return curve.getPoints(30);
}

const CITIES = [
  { lat: 40.71, lng: -74.00, size: 0.015, color: '#FF8A24' }, // NYC
  { lat: 37.77, lng: -122.41, size: 0.012, color: '#FF8A24' }, // SF
  { lat: -23.55, lng: -46.63, size: 0.012, color: '#FF8A24' }, // SP
  { lat: 51.50, lng: -0.12, size: 0.015, color: '#FF8A24' }, // London
  { lat: 48.85, lng: 2.35, size: 0.012, color: '#FF8A24' }, // Paris
  { lat: 25.20, lng: 55.27, size: 0.015, color: '#FF8A24' }, // Dubai
  { lat: 19.07, lng: 72.87, size: 0.012, color: '#FF8A24' }, // Mumbai
  { lat: 1.35, lng: 103.81, size: 0.012, color: '#FF8A24' }, // Singapore
  { lat: 35.67, lng: 139.65, size: 0.015, color: '#FF8A24' }, // Tokyo
  { lat: -33.86, lng: 151.20, size: 0.012, color: '#FF8A24' } // Sydney
];

const ARCS = [
  { startLat: 40.71, startLng: -74.00, endLat: 51.50, endLng: -0.12 },
  { startLat: 48.85, startLng: 2.35, endLat: 25.20, endLng: 55.27 },
  { startLat: 25.20, startLng: 55.27, endLat: 19.07, endLng: 72.87 },
  { startLat: 19.07, startLng: 72.87, endLat: 1.35, endLng: 103.81 },
  { startLat: 1.35, startLng: 103.81, endLat: -33.86, endLng: 151.20 },
  { startLat: 35.67, startLng: 139.65, endLat: 37.77, endLng: -122.41 },
  { startLat: -23.55, startLng: -46.63, endLat: 38.72, endLng: -9.13 }
];

export default function InfrastructureCoreGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);

  // Load the earth texture mask
  useEffect(() => {
    new THREE.TextureLoader().load('/earth-map.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setEarthTexture(tex);
    });
  }, []);

  // Dark graphite core — matte, warm, NOT shiny black
  const coreMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#302e2b',
    roughness: 0.7,
    metalness: 0.45,
  }), []);

  // Subtle smoked glass — visible but not dominant
  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#3d3a37',
    metalness: 0.2,
    roughness: 0.12,
    transmission: 0.55,
    ior: 1.35,
    transparent: true,
    opacity: 0.35,
    side: THREE.FrontSide,
    depthWrite: false,
  }), []);

  const ledMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#FF8A24',
    toneMapped: false,
    transparent: true,
    opacity: 0.8,
  }), []);

  const globeRadius = 0.82;

  const baseRotation = useRef(Math.PI * 1.5); // Initial rotation

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Very slow natural infinite rotation
      baseRotation.current += delta * 0.12;
      
      const tx = (state.pointer.x * Math.PI) / 20;
      const ty = (state.pointer.y * Math.PI) / 20;
      
      const targetY = baseRotation.current + tx;
      const targetX = -ty;

      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.015;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, Math.PI * 1.5, 0]}>
      {/* Inner Graphite Core */}
      <Sphere args={[globeRadius, 64, 64]}>
        <primitive object={coreMaterial} attach="material" />
      </Sphere>

      {/* Map layer (Continent mask) */}
      {earthTexture && (
        <Sphere args={[globeRadius + 0.005, 64, 64]}>
          <meshBasicMaterial 
            map={earthTexture}
            color="#5c5853" // slightly lighter than core
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Sphere>
      )}

      {/* City Nodes */}
      {CITIES.map((city, idx) => {
        const pos = latLngToVector3(city.lat, city.lng, globeRadius + 0.01);
        return (
          <group key={`city-${idx}`} position={pos}>
            <mesh>
              <sphereGeometry args={[city.size, 16, 16]} />
              <primitive object={ledMaterial} attach="material" />
            </mesh>
            {/* Subtle glow ring */}
            <mesh>
              <circleGeometry args={[city.size * 2.5, 16]} />
              <meshBasicMaterial color="#F15A24" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}

      {/* Connection Arcs */}
      {ARCS.map((arc, idx) => {
        const pts = createArc(arc.startLat, arc.startLng, arc.endLat, arc.endLng, globeRadius, 0.15);
        return (
          <Line
            key={`arc-${idx}`}
            points={pts}
            color="#F15A24"
            lineWidth={1.2}
            transparent
            opacity={0.35}
          />
        );
      })}

      {/* Outer Glass Layer */}
      <Sphere ref={outerRef} args={[0.86, 64, 64]}>
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

      {/* Soft atmospheric orange rim */}
      <Sphere args={[0.92, 32, 32]}>
        <meshBasicMaterial
          color="#F15A24"
          transparent
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}
