import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line, Billboard, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';

interface OrbitalObjectsProps {
  activeService: string | null;
  setActiveService: (service: string | null) => void;
}

export interface ServiceConfig {
  id: string;
  slug: string;
  index: string;
  image: string;
  label: string;
  taglines: string[];
  pos: [number, number, number];
  scale: number;
  anchor: [number, number, number];
  hitbox: [number, number, number];
  labelOffset: [number, number];
  labelAlign: 'left' | 'right';
  iconType: keyof typeof iconSvgs;
}

/* ───────────────────────────────────────────────
   SERVICE CONFIGURATION — positions refined to
   match the reference asymmetric radial layout.
   Each service has a product on a glowing platform.
   ─────────────────────────────────────────────── */
const serviceConfig: ServiceConfig[] = [
  // 1: Top center — ACCESS CONTROL
  {
    id: 'ACCESS',
    slug: 'access-control',
    index: '01',
    image: 'access_reader',
    label: 'ACCESS\nCONTROL',
    taglines: ['SMARTER ACCESS'],
    pos: [0.35, 1.55, 0.5],
    scale: 0.75, // Scaled down to not compete with globe
    anchor: [0.2, 0.7, 0.6],
    hitbox: [0.5, 0.6, 0.4],
    labelOffset: [0.45, -0.1], // Right/below
    labelAlign: 'left',
    iconType: 'lock',
  },
  // 2: Upper left — CCTV / VIDEO SURVEILLANCE
  {
    id: 'CCTV',
    slug: 'video-surveillance',
    index: '02',
    image: 'cctv_camera',
    label: 'CCTV / VIDEO\nSURVEILLANCE',
    taglines: ['OBSERVE', 'PREVENT', 'PROTECT'],
    pos: [-1.25, 0.9, 0.5],
    scale: 0.75,
    anchor: [-0.4, 0.45, 0.7],
    hitbox: [0.5, 0.6, 0.4],
    labelOffset: [-0.45, -0.2], // Below-left
    labelAlign: 'right',
    iconType: 'camera',
  },
  // 3: Far right — TURNKEY PROJECTS
  {
    id: 'TURNKEY',
    slug: 'turnkey-projects',
    index: '03',
    image: 'turnkey_building',
    label: 'TURNKEY\nPROJECTS',
    taglines: ['FROM VISION', 'TO REALITY'],
    pos: [1.45, 0.65, 0.3],
    scale: 0.75,
    anchor: [0.65, 0.35, 0.5],
    hitbox: [0.6, 0.7, 0.4],
    labelOffset: [0.45, 0.0], // Right
    labelAlign: 'left',
    iconType: 'gear',
  },
  // 4: Right-lower side — LOGISTICS
  {
    id: 'LOGISTICS',
    slug: 'logistics',
    index: '04',
    image: 'logistics_truck',
    label: 'LOGISTICS',
    taglines: ['ACROSS BORDERS', 'BEYOND LIMITS'],
    pos: [1.45, -0.55, 0.3],
    scale: 0.75,
    anchor: [0.65, -0.25, 0.5],
    hitbox: [0.5, 0.6, 0.4],
    labelOffset: [0.45, 0.0], // Right
    labelAlign: 'left',
    iconType: 'truck',
  },
  // 5: Bottom left — FIRE FIGHTING
  {
    id: 'SAFETY',
    slug: 'fire-fighting',
    index: '05',
    image: 'fire_safety',
    label: 'FIRE FIGHTING',
    taglines: ['PREPARE', 'PROTECT', 'PRESERVE'],
    pos: [-0.65, -1.3, 0.3],
    scale: 0.75,
    anchor: [-0.3, -0.6, 0.6],
    hitbox: [0.5, 0.6, 0.4],
    labelOffset: [0.4, -0.15], // Right/Below
    labelAlign: 'left',
    iconType: 'flame',
  },
  // 6: Bottom right — ELECTRICAL & ELECTRONICAL SOLUTIONS
  {
    id: 'ELECTRICAL',
    slug: 'electrical-electronics',
    index: '06',
    image: 'electrical_panel',
    label: 'ELECTRICAL &\nELECTRONICAL\nSOLUTIONS',
    taglines: ['POWERING', 'A SMARTER TOMORROW'],
    pos: [1.1, -1.3, 0.3],
    scale: 0.75,
    anchor: [0.45, -0.55, 0.5],
    hitbox: [0.5, 0.6, 0.4],
    labelOffset: [0.45, 0.0], // Right
    labelAlign: 'left',
    iconType: 'zap',
  },
  // 7: Left-lower side — SWITCHES & STORAGE
  {
    id: 'INFRASTRUCTURE',
    slug: 'switches-storage',
    index: '07',
    image: 'server_rack',
    label: 'SWITCHES\n& STORAGE',
    taglines: ['CONNECT', 'STORE', 'SCALE'],
    pos: [-1.4, -0.3, 0.4],
    scale: 0.75,
    anchor: [-0.6, -0.1, 0.6],
    hitbox: [0.5, 0.7, 0.4],
    labelOffset: [-0.45, -0.2], // Left/Below
    labelAlign: 'right',
    iconType: 'signal',
  },
];

/* ───────── Service Icon SVGs ───────── */
const iconSvgs: Record<string, JSX.Element> = {
  lock: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  camera: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  gear: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  signal: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 20V4" />
    </svg>
  ),
  truck: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  flame: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c-4.97 0-9-2.69-9-6 0-4 5-11 9-14 4 3 9 10 9 14 0 3.31-4.03 6-9 6z" />
    </svg>
  ),
  zap: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

export default function OrbitalObjects({ activeService, setActiveService }: OrbitalObjectsProps) {
  const groupRef = useRef<THREE.Group>(null);

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

function OrbitalItem({  cfg,
  isActive,
  isMuted,
  setActiveService
}: {
  cfg: ServiceConfig;
  isActive: boolean;
  isMuted: boolean;
  setActiveService: (id: string | null) => void;
}) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const particleGroupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const navigate = useNavigate();
  const particleT = useRef(Math.random());
  const pulseT = useRef(-1);

  const modelEaseRef = useRef(0);
  const lineEaseRef = useRef(0);

  // ── Curved connection path ──
  const curvePts = useMemo(() => {
    const end = new THREE.Vector3(...cfg.pos);
    const anchor = new THREE.Vector3(...cfg.anchor).normalize();
    const start = anchor.clone().multiplyScalar(0.98);

    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
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
      // Scale — active items grow slightly (1.15x)
      const s = (isActive ? cfg.scale * 1.15 : cfg.scale) * modelEase;
      innerRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);

      const targetLocalZ = isActive ? 0.25 : 0;
      innerRef.current.position.z = THREE.MathUtils.lerp(innerRef.current.position.z, targetLocalZ, 0.12);
    }

    // Data particle trail
    if (particleGroupRef.current) {
      particleT.current += delta * (isActive ? 0.8 : 0.3);
      if (particleT.current > 1) particleT.current = 0;

      particleGroupRef.current.children.forEach((child, i) => {
        let pt_t = particleT.current - (i * 0.05);
        if (pt_t < 0) pt_t += 1;
        const idx = Math.floor(pt_t * (curvePts.length - 1));
        const pt = curvePts[Math.min(idx, curvePts.length - 1)];
        child.position.copy(pt);
        const scale = 1 - (i * 0.2);
        child.scale.setScalar(scale);
      });
      particleGroupRef.current.visible = !isMuted && lineEase > 0.8;
    }

    // Orange pulse along connection line
    if (pulseRef.current) {
      if (isActive && pulseT.current < 0) {
        pulseT.current = 1;
      }
      if (!isActive) {
        pulseT.current = -1;
        pulseRef.current.visible = false;
      }
      if (pulseT.current >= 0) {
        pulseT.current -= delta * 2.0;
        if (pulseT.current < 0) {
          pulseT.current = 1;
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
      {/* Anchor Node on Globe Surface — orange glowing point */}
      <mesh position={new THREE.Vector3(...cfg.anchor).normalize().multiplyScalar(0.98)}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial
          color={isActive ? "#FFB08A" : "#F4511E"}
          transparent
          opacity={lineEaseRef.current * (isActive ? 1.0 : 0.85)}
          depthWrite={false}
        />
      </mesh>
      {/* Glow halo around anchor point */}
      <mesh position={new THREE.Vector3(...cfg.anchor).normalize().multiplyScalar(0.98)}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial
          color="#FF8A50"
          transparent
          opacity={lineEaseRef.current * (isActive ? 0.45 : 0.18)}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Curved connection line — thin elegant line */}
      <Line
        points={currentPts}
        color={isActive ? "#FF6A3D" : "#C9A99A"}
        lineWidth={isActive ? 1.8 : 1.0}
        transparent
        opacity={(isActive ? 0.8 : 0.25) * modelEaseRef.current}
      />

      {/* Continuous data particle trail */}
      <group ref={particleGroupRef}>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={`trail-${i}`}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial
              color={i === 0 ? "#FFFFFF" : "#FF9B65"}
              toneMapped={false}
              transparent
              opacity={1 - (i * 0.25)}
            />
          </mesh>
        ))}
      </group>

      {/* Orange pulse (only when active) */}
      <mesh ref={pulseRef} visible={false}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial
          color="#FF9B65"
          toneMapped={false}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Stable Outer Group for Entry Animation & Hitbox */}
      <group ref={outerRef}>

        {/* Invisible Hitbox */}
        <mesh
          scale={cfg.scale}
          onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; setActiveService(cfg.id); }}
          onPointerLeave={() => { document.body.style.cursor = 'auto'; }}
          onClick={(e) => { e.stopPropagation(); navigate(`/services/${cfg.slug}`); }}
        >
          <boxGeometry args={cfg.hitbox} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* The visual product on platform */}
        <group ref={innerRef}>
          <Float
            speed={0.4 + (Math.random() * 0.3)}
            rotationIntensity={0.02}
            floatIntensity={0.04}
            floatingRange={[-0.04, 0.04]}
          >
            <ProductOnPlatform
              cfg={cfg}
              isActive={isActive}
              opacity={1}
            />
          </Float>
        </group>
      </group>
    </group>
  );
}

/* ───────── Product on Glowing Platform ───────── */

function ProductOnPlatform({ cfg, isActive, opacity }: {
  cfg: ServiceConfig;
  isActive: boolean;
  opacity: number;
}) {
  const texture = useLoader(THREE.TextureLoader, `/images/services/${cfg.image}.png`);

  return (
    <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
      {/* ── Product Image — large, transparent background ── */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>

      {/* ── Service Label ── */}
      <Html
        position={[cfg.labelOffset[0], cfg.labelOffset[1], 0.1]}
        center={false}
        zIndexRange={[100, 0]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          transition: 'opacity 0.4s ease',
          opacity: opacity
        }}
        distanceFactor={4.5}
      >
        <div
          className="service-label-content"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            transform: cfg.labelAlign === 'right' ? 'translateX(-100%)' : 'none',
            textAlign: cfg.labelAlign === 'right' ? 'right' : 'left',
            padding: '4px',
            pointerEvents: 'none',
          }}
        >
          {/* Index */}
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: isActive ? '#F45124' : 'rgba(244, 81, 36, 0.5)',
            letterSpacing: '0.15em',
            marginBottom: '2px',
            transition: 'color 0.4s ease'
          }}>
            {cfg.index}
          </div>

          {/* Service Title */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            marginBottom: '6px'
          }}>
            {cfg.label.split('\n').map((line, i) => (
              <div key={i} style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: isActive ? '#202020' : '#77736F',
                lineHeight: '1.3',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: 1,
                transform: `scale(${isActive ? 1.05 : 1}) translateY(${isActive ? '-2px' : '0'})`,
              }}>
                {line}
              </div>
            ))}
          </div>

          {/* Divider Line */}
          <div style={{
            width: '24px',
            height: '1px',
            backgroundColor: isActive ? '#F45124' : 'rgba(119,115,111,0.3)',
            marginLeft: cfg.labelAlign === 'right' ? 'auto' : '0',
            marginBottom: '6px',
            transition: 'background-color 0.4s ease'
          }} />

          {/* Supporting Text */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
          }}>
            {cfg.taglines.map((tagline, i) => (
              <div key={i} style={{
                fontSize: '9px',
                fontWeight: 500,
                color: isActive ? '#77736F' : '#AAA39C',
                letterSpacing: '0.15em',
                lineHeight: '1.4',
                transition: 'color 0.4s ease'
              }}>
                {tagline}
              </div>
            ))}
          </div>
        </div>
      </Html>
    </Billboard>
  );
}
