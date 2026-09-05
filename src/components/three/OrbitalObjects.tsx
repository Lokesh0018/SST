import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Cylinder, Line, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface OrbitalObjectsProps {
  activeService: string | null;
}

/*
 * ORBITAL COMPOSITION — "Infrastructure Solar System"
 *
 * Objects arranged in deliberate orbital positions around the globe.
 * Foreground items sit in front of / slightly overlapping globe edge.
 * Background items are smaller and behind.
 * All objects stay WELL inside the canvas bounds — no cropping.
 *
 *              ELECTRICAL (0.7)
 *                  ●
 *                /
 *    SERVER ●   ◉ CORE   ● CCTV (fg)
 *              \       /
 *  ACCESS ●     -------    ● SWITCH
 *                \
 *        FIRE ●    ● LOGISTICS
 */
const serviceConfig = [
  // Orbit 1: Equatorial (Security, Access) - Radius ~1.4
  { id: 'SECURITY',   type: 'cctv',       pos: [1.25, 0.05, 0.6] as [number,number,number],    scale: 1.0, ringIdx: 0 },
  { id: 'ACCESS',     type: 'access',     pos: [-1.25, -0.2, 0.6] as [number,number,number],   scale: 1.0, ringIdx: 0 },
  
  // Orbit 2: Steep / Polar (Server, Logistics) - Radius ~1.5
  { id: 'INFRASTRUCTURE', type: 'server', pos: [-0.95, 1.1, 0.35] as [number,number,number],   scale: 1.05, ringIdx: 1 },
  { id: 'LOGISTICS',  type: 'vehicle',    pos: [0.65, -1.25, -0.4] as [number,number,number],  scale: 1.1, ringIdx: 1 },
  
  // Orbit 3: Angled (Network, Electrical, Fire) - Radius ~1.45
  { id: 'TURNKEY',    type: 'switch',     pos: [1.1, -0.65, -0.1] as [number,number,number],   scale: 1.0, ringIdx: 2 },
  { id: 'ELECTRICAL', type: 'electrical', pos: [0.75, 1.05, -0.45] as [number,number,number],  scale: 1.0, ringIdx: 2 },
  { id: 'SAFETY',     type: 'fire',       pos: [-0.65, -1.1, 0.6] as [number,number,number],   scale: 0.95, ringIdx: 2 },
];

const ORBITAL_RINGS = [
  { rotation: [0.1, 0, 0] as [number,number,number], radius: 1.4 },       // Equatorial
  { rotation: [1.2, 0.4, 0] as [number,number,number], radius: 1.5 },     // Steep
  { rotation: [-0.4, -0.5, 0.2] as [number,number,number], radius: 1.45 }, // Angled
];

export default function OrbitalObjects({ activeService }: OrbitalObjectsProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Parallax interaction only
      const tx = state.pointer.x * 0.15;
      const ty = state.pointer.y * 0.1;

      groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-ty - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Orbital Rings (Thinner, lower opacity) */}
      {ORBITAL_RINGS.map((ring, idx) => (
        <group key={`ring-${idx}`} rotation={ring.rotation}>
          <Ring args={[ring.radius, ring.radius + 0.002, 128]}>
            <meshBasicMaterial color="#FF8A24" transparent opacity={0.08} side={THREE.DoubleSide} />
          </Ring>
          <Ring args={[ring.radius - 0.015, ring.radius - 0.014, 128]}>
            <meshBasicMaterial color="#FF8A24" transparent opacity={0.03} side={THREE.DoubleSide} />
          </Ring>
        </group>
      ))}

      {serviceConfig.map((cfg) => {
        const isActive = activeService === cfg.id;
        const isTurnkey = activeService === 'TURNKEY';
        const anyActive = activeService !== null;
        return (
          <OrbitalItem
            key={cfg.id}
            cfg={cfg}
            isActive={isActive || isTurnkey}
            isMuted={anyActive && !isActive && !isTurnkey}
          />
        );
      })}
    </group>
  );
}

/* ───────── Individual Orbital Item ───────── */

function OrbitalItem({ cfg, isActive, isMuted }: {
  cfg: typeof serviceConfig[number];
  isActive: boolean;
  isMuted: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const particleRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const particleT = useRef(Math.random());
  const pulseT = useRef(-1); // -1 = inactive

  // ── Shared Materials ──
  const graphiteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3a3835', roughness: 0.4, metalness: 0.6, transparent: true, opacity: 1,
  }), []);
  const brushedMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#5a5855', roughness: 0.2, metalness: 0.85, transparent: true, opacity: 1,
  }), []);
  const creamMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#F5EBDD', roughness: 0.15, metalness: 0.05, transparent: true, opacity: 1,
  }), []);
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#e8e4dd', transmission: 0.8, roughness: 0.05, ior: 1.45, transparent: true, opacity: 1,
  }), []);
  const ledMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: isActive ? '#FF8A24' : '#F15A24',
    toneMapped: false, transparent: true,
    opacity: isMuted ? 0.12 : (isActive ? 1.0 : 0.6),
  }), [isActive, isMuted]);

  // ── Curved connection path: elegant arc from globe surface → object ──
  const curvePts = useMemo(() => {
    const end = new THREE.Vector3(...cfg.pos);
    const dir = end.clone().normalize();
    const start = dir.clone().multiplyScalar(0.86); // start at globe surface

    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
    // Lift midpoint perpendicular to the connection for a natural arc
    const up = new THREE.Vector3(0, 1, 0);
    const perp = new THREE.Vector3().crossVectors(dir, up).normalize();
    mid.add(perp.multiplyScalar(0.25));

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(30);
  }, [cfg.pos]);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      // Fast transition speed
      const targetOp = isMuted ? 0.3 : 1;
      graphiteMat.opacity = THREE.MathUtils.lerp(graphiteMat.opacity, targetOp, 0.15);
      brushedMat.opacity = THREE.MathUtils.lerp(brushedMat.opacity, targetOp, 0.15);
      creamMat.opacity = THREE.MathUtils.lerp(creamMat.opacity, targetOp, 0.15);

      // Scale — active items grow slightly more visibly
      const s = isActive ? cfg.scale * 1.25 : cfg.scale;
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.15);

      // Active items move slightly toward camera (z+0.25)
      const targetZ = isActive ? cfg.pos[2] + 0.25 : cfg.pos[2];
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.15);
    }

    // Data particle — travels along curve continuously, much faster
    if (particleRef.current) {
      particleT.current += delta * (isActive ? 1.2 : 0.6);
      if (particleT.current > 1) particleT.current = 0;
      const idx = Math.floor(particleT.current * (curvePts.length - 1));
      const pt = curvePts[Math.min(idx, curvePts.length - 1)];
      particleRef.current.position.copy(pt);
      particleRef.current.visible = !isMuted;
    }

    // Orange pulse — triggered on activation, travels from object → core
    if (pulseRef.current) {
      if (isActive && pulseT.current < 0) {
        pulseT.current = 1; // start pulse from object end
      }
      if (!isActive) {
        pulseT.current = -1;
        pulseRef.current.visible = false;
      }
      if (pulseT.current >= 0) {
        pulseT.current -= delta * 2.5; // very fast travel time (~400ms)
        if (pulseT.current < 0) {
          pulseT.current = 1; // loop
        }
        const idx = Math.floor(pulseT.current * (curvePts.length - 1));
        const pt = curvePts[Math.min(idx, curvePts.length - 1)];
        pulseRef.current.position.copy(pt);
        pulseRef.current.visible = true;
      }
    }
  });

  return (
    <group>
      {/* Curved connection line */}
      <Line
        points={curvePts}
        color="#F15A24"
        lineWidth={isActive ? 1.8 : 0.7}
        transparent
        opacity={isMuted ? 0.04 : (isActive ? 0.65 : 0.18)}
      />

      {/* Continuous data particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#FF8A24" toneMapped={false} transparent opacity={0.8} />
      </mesh>

      {/* Orange pulse (only when active) */}
      <mesh ref={pulseRef} visible={false}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial
          color="#FF8A24"
          toneMapped={false}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* The device model */}
      <group ref={meshRef} position={cfg.pos} scale={cfg.scale}>
        <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
          <DeviceModel
            type={cfg.type}
            isActive={isActive}
            mats={{ graphiteMat, brushedMat, creamMat, glassMat, ledMat }}
          />
        </Float>
      </group>
    </group>
  );
}

/* ───────── Procedural 3D Device Models ───────── */

function DeviceModel({ type, isActive, mats }: {
  type: string;
  isActive: boolean;
  mats: Record<string, THREE.Material>;
}) {
  const { graphiteMat, brushedMat, creamMat, glassMat, ledMat } = mats;

  switch (type) {
    /* ── CCTV Camera ── */
    case 'cctv':
      return (
        <group rotation={[0, -0.4, 0]}>
          {/* Mounting bracket */}
          <RoundedBox args={[0.1, 0.25, 0.1]} radius={0.01} position={[0, 0.22, -0.05]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
          {/* Joint ball */}
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <primitive object={graphiteMat} attach="material" />
          </mesh>
          {/* Camera body — professional surveillance shape */}
          <RoundedBox args={[0.28, 0.2, 0.45]} radius={0.05} position={[0, 0, 0]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>
          {/* Dark underside */}
          <RoundedBox args={[0.26, 0.08, 0.43]} radius={0.03} position={[0, -0.06, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          {/* Lens barrel */}
          <Cylinder args={[0.09, 0.11, 0.16, 24]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.26]}>
            <primitive object={brushedMat} attach="material" />
          </Cylinder>
          {/* Glass lens cap */}
          <Cylinder args={[0.08, 0.08, 0.03, 24]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.35]}>
            <primitive object={glassMat} attach="material" />
          </Cylinder>
          {/* Lens iris glow */}
          <mesh position={[0, 0, 0.37]}>
            <circleGeometry args={[0.045, 24]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          {/* Status LED */}
          <mesh position={[0.1, 0.04, 0.2]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          {/* IR sensor array (subtle detail) */}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh key={i} position={[(-0.06 + i * 0.06), 0.08, 0.22]}>
              <sphereGeometry args={[0.008, 6, 6]} />
              <primitive object={graphiteMat} attach="material" />
            </mesh>
          ))}
        </group>
      );

    /* ── Server / Rack Unit ── */
    case 'server':
      return (
        <group>
          {/* Main chassis */}
          <RoundedBox args={[0.45, 0.65, 0.35]} radius={0.02} position={[0, 0, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          {/* Front panel bezel */}
          <RoundedBox args={[0.43, 0.63, 0.01]} radius={0.01} position={[0, 0, 0.18]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
          {/* Drive bays with handles */}
          {Array.from({ length: 4 }).map((_, i) => (
            <group key={i}>
              <RoundedBox args={[0.36, 0.08, 0.01]} radius={0.005} position={[0, 0.2 - i * 0.13, 0.19]}>
                <primitive object={graphiteMat} attach="material" />
              </RoundedBox>
              <RoundedBox args={[0.05, 0.03, 0.008]} radius={0.003} position={[0.13, 0.2 - i * 0.13, 0.2]}>
                <primitive object={creamMat} attach="material" />
              </RoundedBox>
              <mesh position={[-0.15, 0.2 - i * 0.13, 0.2]}>
                <sphereGeometry args={[0.006, 6, 6]} />
                <primitive object={ledMat} attach="material" />
              </mesh>
            </group>
          ))}
          {/* Power button */}
          <mesh position={[0.18, -0.26, 0.19]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          {/* Ventilation grille (top) */}
          <RoundedBox args={[0.3, 0.005, 0.25]} radius={0.002} position={[0, 0.326, 0]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
        </group>
      );

    /* ── Access Control Reader ── */
    case 'access':
      return (
        <group>
          {/* Wall mount plate */}
          <RoundedBox args={[0.28, 0.44, 0.03]} radius={0.01} position={[0, 0, -0.02]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
          {/* Main housing */}
          <RoundedBox args={[0.24, 0.4, 0.06]} radius={0.03} position={[0, 0, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          {/* Front face */}
          <RoundedBox args={[0.22, 0.38, 0.005]} radius={0.025} position={[0, 0, 0.03]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>
          {/* Display screen */}
          <RoundedBox args={[0.16, 0.14, 0.005]} radius={0.015} position={[0, 0.08, 0.035]}>
            <primitive object={glassMat} attach="material" />
          </RoundedBox>
          {/* Fingerprint sensor */}
          <Cylinder args={[0.05, 0.05, 0.008, 20]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0.035]}>
            <primitive object={brushedMat} attach="material" />
          </Cylinder>
          {/* Scanner glow line */}
          {isActive && (
            <mesh position={[0, 0.08, 0.04]}>
              <planeGeometry args={[0.14, 0.004]} />
              <primitive object={ledMat} attach="material" />
            </mesh>
          )}
          {/* Status LED */}
          <mesh position={[0.07, 0.17, 0.035]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
        </group>
      );

    /* ── Network Switch ── */
    case 'switch':
      return (
        <group>
          {/* Chassis */}
          <RoundedBox args={[0.5, 0.08, 0.28]} radius={0.01} position={[0, 0, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          {/* Top panel */}
          <RoundedBox args={[0.48, 0.003, 0.26]} radius={0.005} position={[0, 0.042, 0]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
          {/* Front face */}
          <RoundedBox args={[0.48, 0.06, 0.005]} radius={0.004} position={[0, 0, 0.14]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>
          {/* RJ45 Ports */}
          {Array.from({ length: 6 }).map((_, i) => (
            <group key={i}>
              <mesh position={[-0.16 + i * 0.06, 0, 0.145]}>
                <boxGeometry args={[0.032, 0.028, 0.008]} />
                <primitive object={graphiteMat} attach="material" />
              </mesh>
              <mesh position={[-0.16 + i * 0.06, 0.02, 0.145]}>
                <sphereGeometry args={[0.003, 6, 6]} />
                <primitive object={ledMat} attach="material" />
              </mesh>
            </group>
          ))}
          {/* SFP ports */}
          <mesh position={[0.2, 0, 0.145]}>
            <boxGeometry args={[0.04, 0.02, 0.008]} />
            <primitive object={brushedMat} attach="material" />
          </mesh>
        </group>
      );

    /* ── Fire Alarm ── */
    case 'fire':
      return (
        <group>
          {/* Base plate */}
          <Cylinder args={[0.18, 0.18, 0.03, 32]} rotation={[Math.PI / 2, 0, 0]}>
            <primitive object={creamMat} attach="material" />
          </Cylinder>
          {/* Dome */}
          <mesh position={[0, 0, 0.025]}>
            <sphereGeometry args={[0.12, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <primitive object={brushedMat} attach="material" />
          </mesh>
          {/* Central sensor */}
          <Cylinder args={[0.04, 0.06, 0.025, 16]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.04]}>
            <primitive object={graphiteMat} attach="material" />
          </Cylinder>
          {/* Alert LED */}
          <mesh position={[0, 0.06, 0.04]}>
            <sphereGeometry args={[0.012, 10, 10]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          {/* Strobe ring */}
          <Ring args={[0.14, 0.16, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.016]}>
            <meshBasicMaterial color="#F15A24" transparent opacity={isActive ? 0.3 : 0.05} side={THREE.DoubleSide} />
          </Ring>
        </group>
      );

    /* ── Electrical Control Component ── */
    case 'electrical':
      return (
        <group>
          {/* Main enclosure */}
          <RoundedBox args={[0.25, 0.35, 0.12]} radius={0.015} position={[0, 0, 0]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
          {/* Front panel */}
          <RoundedBox args={[0.22, 0.32, 0.005]} radius={0.01} position={[0, 0, 0.06]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          {/* Circuit breaker toggles */}
          {Array.from({ length: 3 }).map((_, i) => (
            <RoundedBox key={i} args={[0.06, 0.035, 0.012]} radius={0.004} position={[-0.05 + i * 0.05, 0.08, 0.07]}>
              <primitive object={creamMat} attach="material" />
            </RoundedBox>
          ))}
          {/* Meter display */}
          <RoundedBox args={[0.12, 0.06, 0.005]} radius={0.005} position={[0, -0.04, 0.065]}>
            <primitive object={glassMat} attach="material" />
          </RoundedBox>
          {/* Power indicator */}
          <mesh position={[0, -0.12, 0.065]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          {/* Energy pulse when active */}
          {isActive && (
            <mesh position={[0, -0.04, 0.07]}>
              <planeGeometry args={[0.1, 0.003]} />
              <primitive object={ledMat} attach="material" />
            </mesh>
          )}
        </group>
      );

    /* ── Logistics Vehicle ── */
    case 'vehicle':
      return (
        <group>
          {/* Cargo container */}
          <RoundedBox args={[0.45, 0.24, 0.24]} radius={0.025} position={[-0.06, 0.04, 0]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>
          {/* Cab */}
          <RoundedBox args={[0.16, 0.2, 0.22]} radius={0.03} position={[0.24, 0.02, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          {/* Windshield */}
          <RoundedBox args={[0.015, 0.1, 0.18]} radius={0.008} position={[0.29, 0.05, 0]}>
            <primitive object={glassMat} attach="material" />
          </RoundedBox>
          {/* Wheels */}
          {[[-0.16, -0.08], [0.22, -0.08]].map(([wx, wy]) =>
            [-0.1, 0.1].map((wz, i) => (
              <Cylinder key={`${wx}-${wz}-${i}`} args={[0.05, 0.05, 0.03, 12]} rotation={[Math.PI / 2, 0, 0]} position={[wx, wy, wz]}>
                <primitive object={graphiteMat} attach="material" />
              </Cylinder>
            ))
          )}
          {/* Tail lights */}
          <mesh position={[-0.28, 0.08, 0.08]}>
            <sphereGeometry args={[0.01, 6, 6]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          <mesh position={[-0.28, 0.08, -0.08]}>
            <sphereGeometry args={[0.01, 6, 6]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          {/* SST logo placeholder on cargo */}
          <RoundedBox args={[0.08, 0.04, 0.005]} radius={0.003} position={[-0.06, 0.1, 0.125]}>
            <meshBasicMaterial color="#F15A24" transparent opacity={0.4} />
          </RoundedBox>
        </group>
      );

    default:
      return (
        <RoundedBox args={[0.2, 0.2, 0.2]}>
          <primitive object={graphiteMat} attach="material" />
        </RoundedBox>
      );
  }
}
