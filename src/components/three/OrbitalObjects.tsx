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
}

const baseServices = [
  { id: 'ACCESS', slug: 'access-control', label: 'ACCESS\nCONTROL', tags: ['SMARTER ACCESS'], img: 'access_reader' },
  { id: 'CCTV', slug: 'video-surveillance', label: 'CCTV / VIDEO\nSURVEILLANCE', tags: ['OBSERVE', 'PREVENT', 'PROTECT'], img: 'cctv_camera' },
  { id: 'TURNKEY', slug: 'turnkey-projects', label: 'TURNKEY\nPROJECTS', tags: ['FROM VISION', 'TO REALITY'], img: 'turnkey_building' },
  { id: 'LOGISTICS', slug: 'logistics', label: 'LOGISTICS', tags: ['ACROSS BORDERS', 'BEYOND LIMITS'], img: 'logistics_truck' },
  { id: 'SAFETY', slug: 'fire-fighting', label: 'FIRE FIGHTING', tags: ['PREPARE', 'PROTECT', 'PRESERVE'], img: 'fire_safety' },
  { id: 'ELECTRICAL', slug: 'electrical-electronics', label: 'ELECTRICAL &\nELECTRONICS', tags: ['POWERING', 'A SMARTER TOMORROW'], img: 'electrical_panel' },
  { id: 'INFRASTRUCTURE', slug: 'switches-storage', label: 'SWITCHES\n& STORAGE', tags: ['CONNECT', 'STORE', 'SCALE'], img: 'server_rack' },
  { id: 'INTRUSION', slug: 'intrusion-detection', label: 'INTRUSION\nDETECTION', tags: ['ADVANCED', 'PROTECTION'], img: 'intrusion_sensor' },
  { id: 'HARDWARE', slug: 'hardware-tools', label: 'HARDWARE\n& TOOLS', tags: ['PRECISION', 'EQUIPMENT'], img: 'hardware_tools' },
  { id: 'WIRELESS', slug: 'wireless-network', label: 'WIRELESS\nTECH', tags: ['SEAMLESS', 'CONNECTIVITY'], img: 'wireless_network' },
  { id: 'NETWORK', slug: 'network-infrastructure', label: 'NETWORK\nINFRASTRUCTURE', tags: ['CORE', 'BACKBONE'], img: 'network_infrastructure' },
];

const serviceConfig: ServiceConfig[] = baseServices.map((service, i) => {
  const angle = (i / baseServices.length) * Math.PI * 2 - (Math.PI / 2); // Start at top
  const radius = 1.45; // Increased radius to push items further out
  const isRightSide = Math.cos(angle) >= 0;

  // Calculate a dynamic label offset that pushes text outward radially
  const offsetRadius = 0.55; 
  const labelOffsetX = Math.cos(angle) * offsetRadius;
  const labelOffsetY = -Math.sin(angle) * offsetRadius;

  return {
    id: service.id,
    slug: service.slug,
    index: String(i + 1).padStart(2, '0'),
    image: service.img,
    label: service.label,
    taglines: service.tags,
    pos: [Math.cos(angle) * radius, -Math.sin(angle) * radius, 0.4], 
    scale: 0.6, // Kept small to fit 11 items easily
    anchor: [Math.cos(angle) * 0.5, -Math.sin(angle) * 0.5, 0.6],
    hitbox: [0.5, 0.6, 0.4],
    labelOffset: [labelOffsetX, labelOffsetY],
    labelAlign: isRightSide ? 'left' : 'right',
  };
});

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
          opacity: isActive ? 1 : 0.6 // Slightly fade out inactive text to reduce clutter
        }}
        distanceFactor={4.5}
      >
        <div
          className="service-label-content"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            transform: cfg.labelAlign === 'right' ? 'translateX(-100%) translateY(-50%)' : 'translateY(-50%)',
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
            marginBottom: '4px',
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
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: isActive ? '#202020' : '#77736F',
                lineHeight: '1.3',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: 1,
                transform: `scale(${isActive ? 1.05 : 1}) translateY(${isActive ? '-2px' : '0'})`,
                transformOrigin: cfg.labelAlign === 'right' ? 'right center' : 'left center'
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
                fontSize: '8px',
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
