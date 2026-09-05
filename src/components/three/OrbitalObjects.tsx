import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Cylinder, Line, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface OrbitalObjectsProps {
  activeService: string | null;
  setActiveService: (service: string | null) => void;
}

const serviceConfig = [
  // 1: Top Right (1:30)
  { id: 'TURNKEY', type: 'building', pos: [1.3, 1.15, 0.5] as [number, number, number], scale: 1.1, ringIdx: 0, anchor: [0.5, 0.5, 0.7] as [number, number, number], hitbox: [0.4, 0.6, 0.4] as [number, number, number] },
  // 2: Top (12:00)
  { id: 'INTRUSION', type: 'sensor', pos: [0.0, 1.6, 0.5] as [number, number, number], scale: 0.9, ringIdx: 1, anchor: [0.0, 0.7, 0.7] as [number, number, number], hitbox: [0.3, 0.4, 0.3] as [number, number, number] },
  // 3: Top Left (10:30)
  { id: 'ACCESS', type: 'access', pos: [-1.3, 1.15, 0.6] as [number, number, number], scale: 0.95, ringIdx: 1, anchor: [-0.5, 0.5, 0.7] as [number, number, number], hitbox: [0.4, 0.5, 0.2] as [number, number, number] },
  // 4: Left (9:00)
  { id: 'INFRASTRUCTURE', type: 'server', pos: [-1.9, -0.15, 0.4] as [number, number, number], scale: 1.1, ringIdx: 0, anchor: [-0.8, -0.1, 0.6] as [number, number, number], hitbox: [0.6, 0.9, 0.5] as [number, number, number] },
  // 5: Bottom Left (7:30)
  { id: 'LOGISTICS', type: 'vehicle', pos: [-1.3, -1.3, 0.4] as [number, number, number], scale: 0.95, ringIdx: 1, anchor: [-0.5, -0.5, 0.6] as [number, number, number], hitbox: [0.6, 0.4, 0.4] as [number, number, number] },
  // 6: Bottom (6:00)
  { id: 'ELECTRICAL', type: 'electrical', pos: [0.0, -1.75, 0.3] as [number, number, number], scale: 0.95, ringIdx: 2, anchor: [0.0, -0.7, 0.6] as [number, number, number], hitbox: [0.4, 0.5, 0.3] as [number, number, number] },
  // 7: Bottom Right (4:30)
  { id: 'SAFETY', type: 'fire', pos: [1.3, -1.3, 0.3] as [number, number, number], scale: 1.0, ringIdx: 0, anchor: [0.5, -0.5, 0.6] as [number, number, number], hitbox: [0.4, 0.6, 0.4] as [number, number, number] },
  // 8: Right (3:00)
  { id: 'SECURITY', type: 'cctv', pos: [1.9, -0.15, 0.3] as [number, number, number], scale: 1.0, ringIdx: 1, anchor: [0.8, -0.1, 0.6] as [number, number, number], hitbox: [0.4, 0.4, 0.6] as [number, number, number] },
];

const ORBITAL_RINGS = [
  { rotation: [0.1, 0, 0] as [number, number, number], radius: 1.4 },
  { rotation: [1.2, 0.4, 0] as [number, number, number], radius: 1.5 },
  { rotation: [-0.4, -0.5, 0.2] as [number, number, number], radius: 1.45 },
];

export default function OrbitalObjects({ activeService, setActiveService }: OrbitalObjectsProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // We removed the generic parallax here in favor of the CameraParallax in Hero3DScene
    // which automatically provides depth-based parallax for everything based on Z-position.
  });

  return (
    <group ref={groupRef}>


      {serviceConfig.map((cfg) => {
        const isActive = activeService === cfg.id;
        const anyActive = activeService !== null;
        return (
          <OrbitalItem
            key={cfg.id}
            cfg={cfg}
            isActive={isActive}
            isMuted={anyActive && !isActive}
            setActiveService={setActiveService}
          />
        );
      })}
    </group>
  );
}

/* ───────── Individual Orbital Item ───────── */

function OrbitalItem({ cfg, isActive, isMuted, setActiveService }: {
  cfg: typeof serviceConfig[number];
  isActive: boolean;
  isMuted: boolean;
  setActiveService: (id: string | null) => void;
}) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const particleRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const particleT = useRef(Math.random());
  const pulseT = useRef(-1); // -1 = inactive

  // ── Shared Materials ──
  const graphiteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#171717', roughness: 0.4, metalness: 0.6, transparent: true, opacity: 1,
  }), []);
  const brushedMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#292929', roughness: 0.2, metalness: 0.85, transparent: true, opacity: 1,
  }), []);
  const creamMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#F7F0DF', roughness: 0.15, metalness: 0.05, transparent: true, opacity: 1,
  }), []);
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#E8DDC8', transmission: 0.8, roughness: 0.05, ior: 1.45, transparent: true, opacity: 1,
  }), []);
  const ledMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: isActive ? '#F4511E' : '#C93F18',
    toneMapped: false, transparent: true,
    opacity: isMuted ? 0.12 : (isActive ? 1.0 : 0.6),
  }), [isActive, isMuted]);

  const modelEaseRef = useRef(0);
  const lineEaseRef = useRef(0);

  // ── Curved connection path: elegant arc from globe surface → object ──
  const curvePts = useMemo(() => {
    const end = new THREE.Vector3(...cfg.pos);
    const anchor = new THREE.Vector3(...(cfg.anchor || cfg.pos)).normalize();
    const start = anchor.clone().multiplyScalar(0.98); // Exact surface of globe (radius 0.98)

    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);

    // Lift midpoint perpendicular to the connection for a natural arc, pointing away from the globe
    const dir = new THREE.Vector3().subVectors(end, start).normalize();
    const tangent = new THREE.Vector3().crossVectors(dir, start);
    const outwardPerp = new THREE.Vector3().crossVectors(tangent, dir).normalize();
    mid.add(outwardPerp.multiplyScalar(0.25));

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(40);
  }, [cfg.pos, cfg.anchor]);

  useFrame((_state, delta) => {
    const t = _state.clock.elapsedTime;

    // Model entry (0.4s - 1.1s)
    const modelProgress = Math.min(1, Math.max(0, (t - 0.4) / 0.7));
    const modelEase = 1 - Math.pow(1 - modelProgress, 4);
    modelEaseRef.current = modelEase;

    // Line entry (0.7s - 1.3s)
    const lineProgress = Math.min(1, Math.max(0, (t - 0.7) / 0.6));
    const lineEase = 1 - Math.pow(1 - lineProgress, 3);
    lineEaseRef.current = lineEase;

    if (outerRef.current) {
      const startPos = new THREE.Vector3(...cfg.anchor).normalize().multiplyScalar(0.6);
      const endPos = new THREE.Vector3(...cfg.pos);
      outerRef.current.position.lerpVectors(startPos, endPos, modelEase);
    }

    if (innerRef.current) {
      // Fast transition speed for hover
      const targetOp = (isMuted ? 0.4 : 1) * modelEase;
      graphiteMat.opacity = THREE.MathUtils.lerp(graphiteMat.opacity, targetOp, 0.15);
      brushedMat.opacity = THREE.MathUtils.lerp(brushedMat.opacity, targetOp, 0.15);
      creamMat.opacity = THREE.MathUtils.lerp(creamMat.opacity, targetOp, 0.15);

      // Scale — active items grow slightly (1.08x) + entry scale
      const s = (isActive ? cfg.scale * 1.08 : cfg.scale) * modelEase;
      innerRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.15);

      // Position animation on entry + hover depth (local Z)
      const targetLocalZ = isActive ? 0.25 : 0;
      innerRef.current.position.z = THREE.MathUtils.lerp(innerRef.current.position.z, targetLocalZ, 0.15);
    }

    // Data particle — travels along curve continuously
    if (particleRef.current) {
      particleT.current += delta * (isActive ? 1.0 : 0.4);
      if (particleT.current > 1) particleT.current = 0;
      const idx = Math.floor(particleT.current * (curvePts.length - 1));
      const pt = curvePts[Math.min(idx, curvePts.length - 1)];
      particleRef.current.position.copy(pt);
      particleRef.current.visible = !isMuted && lineEase > 0.8;
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

  const drawCount = Math.max(2, Math.floor(lineEaseRef.current * curvePts.length));
  const currentPts = curvePts.slice(0, drawCount);

  return (
    <group>
      {/* Anchor Node on Globe Surface */}
      <mesh position={new THREE.Vector3(...cfg.anchor).normalize().multiplyScalar(0.98)}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial
          color={isActive ? "#FFB08A" : "#F4511E"}
          transparent
          opacity={lineEaseRef.current * (isActive ? 1.0 : 0.6)}
          depthWrite={false}
        />
      </mesh>

      {/* Curved connection line (Draws dynamically) */}
      <Line
        points={currentPts}
        color="#F4511E"
        lineWidth={isActive ? 2.0 : 0.8}
        transparent
        opacity={(isMuted ? 0.04 : (isActive ? 0.75 : 0.25)) * modelEaseRef.current}
      />

      {/* Continuous data particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#FF9B65" toneMapped={false} transparent opacity={0.8} />
      </mesh>

      {/* Orange pulse (only when active) */}
      <mesh ref={pulseRef} visible={false}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial
          color="#FF9B65"
          toneMapped={false}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Stable Outer Group for Entry Animation & Hitbox */}
      <group ref={outerRef}>

        {/* Invisible Hitbox (Does not scale or move on hover, only follows outerRef base position) */}
        <mesh
          scale={cfg.scale}
          onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; setActiveService(cfg.id); }}
          onPointerLeave={() => { document.body.style.cursor = 'auto'; setActiveService(null); }}
        >
          {/* Custom tighter bounding box per-model for perfect hover accuracy */}
          <boxGeometry args={cfg.hitbox || [0.5, 0.5, 0.5]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* The visual device model (Scales and translates locally on hover) */}
        <group ref={innerRef}>
          <Float
            speed={0.4 + (Math.random() * 0.3)} // Extremely slow, randomized speed
            rotationIntensity={0.02}
            floatIntensity={0.05}
            floatingRange={[-0.05, 0.05]}
          >
            <DeviceModel
              type={cfg.type}
              isActive={isActive}
              mats={{ graphiteMat, brushedMat, creamMat, glassMat, ledMat }}
            />
          </Float>
        </group>
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
  const animRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (animRef.current) {
      animRef.current.rotation.y -= delta * 0.8;
    }
  });

  switch (type) {
    /* ── Turnkey Projects (Building with Construction) ── */
    case 'building':
      return (
        <group>
          <RoundedBox args={[0.26, 0.46, 0.26]} radius={0.015} position={[0, 0.1, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          <RoundedBox args={[0.31, 0.26, 0.31]} radius={0.015} position={[-0.05, -0.05, -0.05]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh key={`h-${i}`} position={[-0.206, -0.15 + i * 0.06, -0.05]}>
              <boxGeometry args={[0.005, 0.005, 0.3]} />
              <primitive object={graphiteMat} attach="material" />
            </mesh>
          ))}
          <RoundedBox args={[0.27, 0.44, 0.27]} radius={0.01} position={[0, 0.1, 0]}>
            <primitive object={glassMat} attach="material" />
          </RoundedBox>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={`hm-${i}`} position={[0, -0.1 + i * 0.08, 0.136]}>
              <boxGeometry args={[0.26, 0.008, 0.01]} />
              <primitive object={graphiteMat} attach="material" />
            </mesh>
          ))}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh key={`v-${i}`} position={[-0.08 + i * 0.08, 0.1, 0.136]}>
              <boxGeometry args={[0.01, 0.44, 0.008]} />
              <primitive object={graphiteMat} attach="material" />
            </mesh>
          ))}
          <RoundedBox args={[0.09, 0.05, 0.09]} radius={0.005} position={[0, 0.35, 0]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>

          {/* Animated Radar/Dish on Roof */}
          <group position={[0, 0.38, 0]} ref={animRef}>
            <Cylinder args={[0.01, 0.01, 0.04, 8]} position={[0, 0.02, 0]}>
              <primitive object={graphiteMat} attach="material" />
            </Cylinder>
            <mesh position={[0, 0.04, 0.02]} rotation={[0.4, 0, 0]}>
              <sphereGeometry args={[0.03, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
              <primitive object={creamMat} attach="material" />
            </mesh>
            <mesh position={[0, 0.04, 0.03]}>
              <sphereGeometry args={[0.006, 8, 8]} />
              <primitive object={ledMat} attach="material" />
            </mesh>
          </group>

          {/* TOWER CRANE (Construction Element) attached to the side */}
          <group position={[0.16, 0.2, 0.16]}>
            {/* Mast */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.02, 0.5, 0.02]} />
              <primitive object={brushedMat} attach="material" />
            </mesh>
            {/* Jib (Long Arm) */}
            <group position={[-0.1, 0.24, 0]} rotation={[0, -0.4, 0]}>
              <mesh>
                <boxGeometry args={[0.3, 0.015, 0.015]} />
                <primitive object={brushedMat} attach="material" />
              </mesh>
              {/* Cable dropping down */}
              <mesh position={[-0.13, -0.15, 0]}>
                <cylinderGeometry args={[0.002, 0.002, 0.3, 4]} />
                <primitive object={graphiteMat} attach="material" />
              </mesh>
              {/* Hook/Payload */}
              <mesh position={[-0.13, -0.3, 0]}>
                <boxGeometry args={[0.03, 0.03, 0.03]} />
                <primitive object={ledMat} attach="material" />
              </mesh>
            </group>
            {/* Counter-jib (Short Arm) */}
            <group position={[0.06, 0.24, 0]} rotation={[0, -0.4, 0]}>
              <mesh>
                <boxGeometry args={[0.1, 0.015, 0.015]} />
                <primitive object={brushedMat} attach="material" />
              </mesh>
              {/* Counterweight */}
              <mesh position={[0.04, -0.015, 0]}>
                <boxGeometry args={[0.03, 0.02, 0.02]} />
                <primitive object={graphiteMat} attach="material" />
              </mesh>
            </group>
            {/* Top Apex (Tower Peak) */}
            <mesh position={[0, 0.28, 0]}>
              <coneGeometry args={[0.01, 0.06, 4]} />
              <primitive object={ledMat} attach="material" />
            </mesh>
            {/* Suspension cables */}
            <mesh position={[-0.05, 0.27, 0]} rotation={[0, -0.4, 0.3]}>
              <cylinderGeometry args={[0.002, 0.002, 0.12, 4]} />
              <primitive object={graphiteMat} attach="material" />
            </mesh>
            <mesh position={[0.03, 0.27, 0]} rotation={[0, -0.4, -0.4]}>
              <cylinderGeometry args={[0.002, 0.002, 0.08, 4]} />
              <primitive object={graphiteMat} attach="material" />
            </mesh>
          </group>
        </group>
      );

    /* ── Intrusion Detection (PIR Sensor) ── */
    case 'sensor':
      return (
        <group>
          <RoundedBox args={[0.16, 0.22, 0.06]} radius={0.01} position={[0, 0, -0.09]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
          <mesh position={[0, 0, -0.05]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <primitive object={graphiteMat} attach="material" />
          </mesh>
          <RoundedBox args={[0.19, 0.36, 0.12]} radius={0.03} position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>
          <mesh position={[0, -0.12, 0.05]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.195, 0.01, 0.125]} />
            <primitive object={graphiteMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.02, 0.06]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[0.07, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
            <primitive object={glassMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.05, 0.03]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.04, 0.06, 0.02]} />
            <primitive object={graphiteMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.15, 0.06]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[0.012, 12, 12]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          {isActive && (
            <mesh position={[0, -0.15, 0.22]} rotation={[Math.PI / 2.5, 0, 0]} raycast={() => null}>
              <coneGeometry args={[0.3, 0.5, 32]} />
              <meshBasicMaterial color="#F15A24" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          )}
        </group>
      );

    /* ── CCTV Camera ── */
    case 'cctv':
      return (
        <group rotation={[0, -0.4, 0]}>
          {/* Wall mount bracket */}
          <RoundedBox args={[0.08, 0.25, 0.04]} radius={0.01} position={[0, 0.15, -0.3]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
          {/* Arm extending forward */}
          <Cylinder args={[0.025, 0.025, 0.12, 16]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.15, -0.22]}>
            <primitive object={graphiteMat} attach="material" />
          </Cylinder>
          {/* Articulation joint */}
          <mesh position={[0, 0.15, -0.14]}>
            <sphereGeometry args={[0.04, 24, 24]} />
            <primitive object={graphiteMat} attach="material" />
          </mesh>
          {/* Arm extending down into camera */}
          <Cylinder args={[0.025, 0.025, 0.1, 16]} position={[0, 0.1, -0.14]}>
            <primitive object={graphiteMat} attach="material" />
          </Cylinder>

          {/* Main camera body */}
          <RoundedBox args={[0.24, 0.22, 0.44]} radius={0.03} position={[0, 0, 0]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>

          {/* Sun shield / visor */}
          <RoundedBox args={[0.26, 0.03, 0.52]} radius={0.01} position={[0, 0.13, 0.04]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>

          {/* Side detailing */}
          <mesh position={[-0.125, 0, 0]}>
            <boxGeometry args={[0.01, 0.14, 0.25]} />
            <primitive object={brushedMat} attach="material" />
          </mesh>
          <mesh position={[0.125, 0, 0]}>
            <boxGeometry args={[0.01, 0.14, 0.25]} />
            <primitive object={brushedMat} attach="material" />
          </mesh>

          <mesh position={[-0.13, 0, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <primitive object={graphiteMat} attach="material" />
          </mesh>
          <mesh position={[0.13, 0, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <primitive object={graphiteMat} attach="material" />
          </mesh>

          {/* Underbelly detail (heat sink) */}
          <RoundedBox args={[0.2, 0.06, 0.36]} radius={0.01} position={[0, -0.1, 0.02]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={`sink-${i}`} position={[0, -0.13, -0.1 + i * 0.04]}>
              <boxGeometry args={[0.16, 0.02, 0.015]} />
              <primitive object={brushedMat} attach="material" />
            </mesh>
          ))}

          {/* Lens housing assembly */}
          <Cylinder args={[0.1, 0.1, 0.06, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.24]}>
            <primitive object={graphiteMat} attach="material" />
          </Cylinder>
          <Cylinder args={[0.085, 0.085, 0.04, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.29]}>
            <primitive object={brushedMat} attach="material" />
          </Cylinder>
          <Cylinder args={[0.065, 0.065, 0.02, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.32]}>
            <primitive object={glassMat} attach="material" />
          </Cylinder>

          {/* Main camera lens inner eye */}
          <mesh position={[0, 0, 0.325]}>
            <sphereGeometry args={[0.035, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <primitive object={ledMat} attach="material" />
          </mesh>

          {/* IR LED array around lens */}
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            const r = 0.065;
            return (
              <mesh key={`ir-${i}`} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0.305]}>
                <sphereGeometry args={[0.006, 8, 8]} />
                <primitive object={ledMat} attach="material" />
              </mesh>
            );
          })}

          {/* Active status light */}
          <mesh position={[0.08, 0.07, 0.27]}>
            <sphereGeometry args={[0.012, 12, 12]} />
            <primitive object={ledMat} attach="material" />
          </mesh>

          {/* Twin antennas for a wireless / enterprise look */}
          <group position={[-0.09, 0.1, -0.16]} rotation={[0.5, 0, 0.3]}>
            <Cylinder args={[0.008, 0.012, 0.2, 8]} position={[0, 0.1, 0]}>
              <primitive object={graphiteMat} attach="material" />
            </Cylinder>
            <mesh position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <primitive object={brushedMat} attach="material" />
            </mesh>
          </group>
          <group position={[0.09, 0.1, -0.16]} rotation={[0.5, 0, -0.3]}>
            <Cylinder args={[0.008, 0.012, 0.2, 8]} position={[0, 0.1, 0]}>
              <primitive object={graphiteMat} attach="material" />
            </Cylinder>
            <mesh position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <primitive object={brushedMat} attach="material" />
            </mesh>
          </group>
        </group>
      );

    /* ── Access Control Reader ── */
    case 'access':
      return (
        <group>
          <RoundedBox args={[0.3, 0.46, 0.04]} radius={0.01} position={[0, 0, -0.02]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
          <RoundedBox args={[0.26, 0.42, 0.07]} radius={0.03} position={[0, 0, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          <RoundedBox args={[0.24, 0.4, 0.01]} radius={0.025} position={[0, 0, 0.035]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>
          <RoundedBox args={[0.18, 0.16, 0.01]} radius={0.015} position={[0, 0.09, 0.04]}>
            <primitive object={glassMat} attach="material" />
          </RoundedBox>
          <mesh position={[-0.04, 0.12, 0.046]}>
            <boxGeometry args={[0.06, 0.02, 0.001]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          <mesh position={[-0.04, 0.08, 0.046]}>
            <boxGeometry args={[0.04, 0.01, 0.001]} />
            <primitive object={creamMat} attach="material" />
          </mesh>
          <Cylinder args={[0.06, 0.06, 0.01, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0.04]}>
            <primitive object={brushedMat} attach="material" />
          </Cylinder>
          <Cylinder args={[0.04, 0.04, 0.012, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0.042]}>
            <primitive object={glassMat} attach="material" />
          </Cylinder>
          {isActive && (
            <mesh position={[0, 0.09, 0.045]}>
              <planeGeometry args={[0.16, 0.006]} />
              <primitive object={ledMat} attach="material" />
            </mesh>
          )}
          <mesh position={[0.08, 0.18, 0.04]}>
            <sphereGeometry args={[0.01, 12, 12]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          {Array.from({ length: 9 }).map((_, i) => (
            <mesh key={`acc-${i}`} position={[-0.05 + (i % 3) * 0.05, -0.05 - Math.floor(i / 3) * 0.05, 0.042]}>
              <sphereGeometry args={[0.005, 8, 8]} />
              <primitive object={graphiteMat} attach="material" />
            </mesh>
          ))}
        </group>
      );

    /* ── Fire Fighting (Extinguisher + Sprinkler) ── */
    case 'fire':
      return (
        <group>
          <Cylinder args={[0.13, 0.13, 0.42, 32]} position={[-0.12, 0, 0]}>
            <primitive object={creamMat} attach="material" />
          </Cylinder>
          <mesh position={[-0.12, 0.21, 0]}>
            <sphereGeometry args={[0.13, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <primitive object={creamMat} attach="material" />
          </mesh>
          <mesh position={[-0.12, -0.21, 0]}>
            <sphereGeometry args={[0.13, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
            <primitive object={creamMat} attach="material" />
          </mesh>
          <Cylinder args={[0.135, 0.135, 0.04, 32]} position={[-0.12, -0.21, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </Cylinder>
          <Cylinder args={[0.035, 0.045, 0.08, 24]} position={[-0.12, 0.34, 0]}>
            <primitive object={brushedMat} attach="material" />
          </Cylinder>
          <RoundedBox args={[0.18, 0.025, 0.025]} radius={0.005} position={[-0.06, 0.39, 0]} rotation={[0, 0, 0.2]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          <RoundedBox args={[0.16, 0.02, 0.02]} radius={0.005} position={[-0.07, 0.35, 0]} rotation={[0, 0, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          <Cylinder args={[0.03, 0.03, 0.02, 16]} position={[-0.12, 0.36, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <primitive object={brushedMat} attach="material" />
          </Cylinder>
          <Cylinder args={[0.025, 0.025, 0.022, 16]} position={[-0.12, 0.36, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <primitive object={glassMat} attach="material" />
          </Cylinder>
          <Cylinder args={[0.132, 0.132, 0.18, 32]} position={[-0.12, 0.05, 0]}>
            <primitive object={ledMat} attach="material" />
          </Cylinder>
          <Cylinder args={[0.015, 0.015, 0.35, 12]} position={[-0.02, 0.05, 0.08]}>
            <primitive object={graphiteMat} attach="material" />
          </Cylinder>
          <Cylinder args={[0.02, 0.02, 0.08, 16]} position={[-0.02, -0.15, 0.08]}>
            <primitive object={graphiteMat} attach="material" />
          </Cylinder>

          <group position={[0.18, 0.22, 0.12]}>
            <Cylinder args={[0.05, 0.03, 0.06, 24]} position={[0, 0, 0]}>
              <primitive object={brushedMat} attach="material" />
            </Cylinder>
            <mesh position={[0, -0.05, 0]}>
              <torusGeometry args={[0.035, 0.012, 12, 24]} />
              <primitive object={brushedMat} attach="material" />
            </mesh>
            <Cylinder args={[0.01, 0.01, 0.05, 8]} position={[0, -0.02, 0]}>
              <primitive object={glassMat} attach="material" />
            </Cylinder>
            <mesh position={[0, -0.02, 0]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <primitive object={ledMat} attach="material" />
            </mesh>
            {isActive && (
              <mesh position={[0, -0.2, 0]}>
                <coneGeometry args={[0.2, 0.35, 32]} />
                <meshBasicMaterial color="#E8DDC8" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
              </mesh>
            )}
          </group>
        </group>
      );

    /* ── Electrical Control Component ── */
    case 'electrical':
      return (
        <group>
          <RoundedBox args={[0.28, 0.38, 0.02]} radius={0.005} position={[0, 0, -0.06]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
          <RoundedBox args={[0.26, 0.36, 0.13]} radius={0.015} position={[0, 0, 0]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>
          <RoundedBox args={[0.23, 0.33, 0.01]} radius={0.01} position={[0, 0, 0.065]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          {Array.from({ length: 4 }).map((_, i) => (
            <group key={`cb1-${i}`} position={[-0.07 + i * 0.046, 0.08, 0.07]}>
              <RoundedBox args={[0.035, 0.045, 0.015]} radius={0.004}>
                <primitive object={creamMat} attach="material" />
              </RoundedBox>
              <mesh position={[0, 0.01, 0.005]}>
                <boxGeometry args={[0.015, 0.02, 0.01]} />
                <primitive object={brushedMat} attach="material" />
              </mesh>
            </group>
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <group key={`cb2-${i}`} position={[-0.07 + i * 0.046, 0.01, 0.07]}>
              <RoundedBox args={[0.035, 0.045, 0.015]} radius={0.004}>
                <primitive object={creamMat} attach="material" />
              </RoundedBox>
              <mesh position={[0, 0.01, 0.005]}>
                <boxGeometry args={[0.015, 0.02, 0.01]} />
                <primitive object={brushedMat} attach="material" />
              </mesh>
            </group>
          ))}
          <RoundedBox args={[0.06, 0.08, 0.02]} radius={0.005} position={[0, 0.22, 0.07]}>
            <primitive object={brushedMat} attach="material" />
          </RoundedBox>
          <RoundedBox args={[0.14, 0.08, 0.01]} radius={0.005} position={[0, -0.08, 0.07]}>
            <primitive object={glassMat} attach="material" />
          </RoundedBox>
          {isActive && (
            <mesh position={[0, -0.08, 0.076]}>
              <planeGeometry args={[0.1, 0.04]} />
              <primitive object={ledMat} attach="material" />
            </mesh>
          )}
          <mesh position={[-0.08, -0.15, 0.07]}>
            <sphereGeometry args={[0.012, 12, 12]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.15, 0.07]}>
            <sphereGeometry args={[0.012, 12, 12]} />
            <primitive object={graphiteMat} attach="material" />
          </mesh>
          <mesh position={[0.08, -0.15, 0.07]}>
            <sphereGeometry args={[0.012, 12, 12]} />
            <primitive object={graphiteMat} attach="material" />
          </mesh>
        </group>
      );

    /* ── Network Switch + Storage/Server ── */
    case 'server':
      return (
        <group>
          <RoundedBox args={[0.48, 0.8, 0.38]} radius={0.02} position={[0, 0, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={`vent-${i}`} position={[0.24, 0.2 - i * 0.08, 0]}>
              <boxGeometry args={[0.005, 0.02, 0.25]} />
              <primitive object={brushedMat} attach="material" />
            </mesh>
          ))}
          <mesh position={[-0.22, 0, 0.185]}>
            <boxGeometry args={[0.02, 0.76, 0.005]} />
            <primitive object={brushedMat} attach="material" />
          </mesh>
          <mesh position={[0.22, 0, 0.185]}>
            <boxGeometry args={[0.02, 0.76, 0.005]} />
            <primitive object={brushedMat} attach="material" />
          </mesh>

          <group position={[0, 0.28, 0.17]}>
            <RoundedBox args={[0.42, 0.08, 0.06]} radius={0.005}>
              <primitive object={brushedMat} attach="material" />
            </RoundedBox>
            <mesh position={[-0.18, 0, 0.03]}>
              <boxGeometry args={[0.02, 0.04, 0.005]} />
              <primitive object={graphiteMat} attach="material" />
            </mesh>
            {Array.from({ length: 8 }).map((_, i) => (
              <group key={`rj45-${i}`}>
                <mesh position={[-0.12 + i * 0.04, 0, 0.03]}>
                  <boxGeometry args={[0.025, 0.03, 0.005]} />
                  <primitive object={graphiteMat} attach="material" />
                </mesh>
                <mesh position={[-0.12 + i * 0.04, 0.02, 0.035]}>
                  <sphereGeometry args={[0.003, 8, 8]} />
                  <primitive object={ledMat} attach="material" />
                </mesh>
              </group>
            ))}
          </group>

          <group position={[0, 0.12, 0.17]}>
            <RoundedBox args={[0.42, 0.2, 0.06]} radius={0.005}>
              <primitive object={graphiteMat} attach="material" />
            </RoundedBox>
            {Array.from({ length: 12 }).map((_, i) => (
              <group key={`hdd-${i}`} position={[-0.16 + (i % 6) * 0.065, 0.04 - Math.floor(i / 6) * 0.08, 0.03]}>
                <RoundedBox args={[0.05, 0.06, 0.01]} radius={0.005}>
                  <primitive object={creamMat} attach="material" />
                </RoundedBox>
                <mesh position={[0.015, 0, 0.005]}>
                  <sphereGeometry args={[0.004, 8, 8]} />
                  <primitive object={ledMat} attach="material" />
                </mesh>
              </group>
            ))}
          </group>

          <group position={[0, -0.06, 0.17]}>
            <RoundedBox args={[0.42, 0.12, 0.06]} radius={0.005}>
              <primitive object={brushedMat} attach="material" />
            </RoundedBox>
            <mesh position={[-0.15, 0, 0.03]}>
              <boxGeometry args={[0.06, 0.08, 0.005]} />
              <primitive object={graphiteMat} attach="material" />
            </mesh>
            <mesh position={[0.15, 0, 0.03]}>
              <sphereGeometry args={[0.01, 12, 12]} />
              <primitive object={ledMat} attach="material" />
            </mesh>
          </group>

          <group position={[0, -0.25, 0.17]}>
            <RoundedBox args={[0.42, 0.18, 0.06]} radius={0.005}>
              <primitive object={graphiteMat} attach="material" />
            </RoundedBox>
            <mesh position={[-0.15, 0, 0.03]}>
              <boxGeometry args={[0.08, 0.06, 0.01]} />
              <primitive object={glassMat} attach="material" />
            </mesh>
            <mesh position={[0.15, 0, 0.03]}>
              <sphereGeometry args={[0.015, 12, 12]} />
              <primitive object={ledMat} attach="material" />
            </mesh>
          </group>
        </group>
      );

    /* ── Logistics Vehicle ── */
    case 'vehicle':
      return (
        <group>
          <RoundedBox args={[0.48, 0.26, 0.26]} radius={0.025} position={[-0.08, 0.05, 0]}>
            <primitive object={creamMat} attach="material" />
          </RoundedBox>
          <mesh position={[-0.08, 0.18, 0]}>
            <boxGeometry args={[0.46, 0.01, 0.24]} />
            <primitive object={brushedMat} attach="material" />
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`corr-${i}`} position={[-0.26 + i * 0.05, 0.05, 0.13]}>
              <boxGeometry args={[0.02, 0.24, 0.005]} />
              <primitive object={brushedMat} attach="material" />
            </mesh>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`corr2-${i}`} position={[-0.26 + i * 0.05, 0.05, -0.13]}>
              <boxGeometry args={[0.02, 0.24, 0.005]} />
              <primitive object={brushedMat} attach="material" />
            </mesh>
          ))}
          <RoundedBox args={[0.18, 0.22, 0.24]} radius={0.03} position={[0.26, 0.03, 0]}>
            <primitive object={graphiteMat} attach="material" />
          </RoundedBox>
          <RoundedBox args={[0.02, 0.12, 0.2]} radius={0.01} position={[0.34, 0.06, 0]} rotation={[0, 0, -0.1]}>
            <primitive object={glassMat} attach="material" />
          </RoundedBox>
          <mesh position={[0.28, 0.08, 0.12]}>
            <boxGeometry args={[0.08, 0.08, 0.01]} />
            <primitive object={glassMat} attach="material" />
          </mesh>
          <mesh position={[0.28, 0.08, -0.12]}>
            <boxGeometry args={[0.08, 0.08, 0.01]} />
            <primitive object={glassMat} attach="material" />
          </mesh>
          <mesh position={[0.35, -0.04, 0.08]}>
            <sphereGeometry args={[0.015, 12, 12]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          <mesh position={[0.35, -0.04, -0.08]}>
            <sphereGeometry args={[0.015, 12, 12]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          {[[-0.2, -0.09], [0.24, -0.09]].map(([wx, wy], outerIdx) =>
            [-0.12, 0.12].map((wz, i) => (
              <group key={`wheel-${outerIdx}-${i}`} position={[wx, wy, wz]}>
                <Cylinder args={[0.06, 0.06, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]}>
                  <primitive object={graphiteMat} attach="material" />
                </Cylinder>
                <Cylinder args={[0.03, 0.03, 0.045, 16]} rotation={[Math.PI / 2, 0, 0]}>
                  <primitive object={brushedMat} attach="material" />
                </Cylinder>
              </group>
            ))
          )}
          <mesh position={[-0.32, -0.04, 0.1]}>
            <sphereGeometry args={[0.012, 12, 12]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          <mesh position={[-0.32, -0.04, -0.1]}>
            <sphereGeometry args={[0.012, 12, 12]} />
            <primitive object={ledMat} attach="material" />
          </mesh>
          <RoundedBox args={[0.12, 0.06, 0.005]} radius={0.005} position={[-0.08, 0.12, 0.135]}>
            <meshBasicMaterial color="#F15A24" transparent opacity={0.6} />
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
