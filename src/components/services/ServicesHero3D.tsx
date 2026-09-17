import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TierInfo {
  id: number;
  label: string;
  sub: string;
  color: string;
  yPos: number;
}

const TIERS: TierInfo[] = [
  { id: 4, label: 'INTELLIGENCE & SOFTWARE', sub: 'AI, Microservices, Cloud Apps', color: '#FF7043', yPos: 3.2 },
  { id: 3, label: 'CLOUD & COMPUTE', sub: 'Hybrid Cloud, Kubernetes, Storage', color: '#FF8A65', yPos: 1.6 },
  { id: 2, label: 'NETWORK & CONNECTIVITY', sub: 'Optical Fiber, 100G Fabrics, Wi-Fi 6', color: '#FFA726', yPos: 0.0 },
  { id: 1, label: 'SECURITY & SAFETY', sub: 'AI Surveillance, Access, Fire Safety', color: '#FF7043', yPos: -1.6 },
  { id: 0, label: 'PHYSICAL INFRASTRUCTURE', sub: 'Power, Turnkey, Electricals, Data Center', color: '#F4511E', yPos: -3.2 },
];

export default function ServicesHero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 560;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060c18, 0.04);

    // Camera (Orthographic-like perspective)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(9.5, 4.8, 11.5);
    camera.lookAt(0, -0.2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x2a3b5c, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffeedd, 3.2);
    mainLight.position.set(12, 20, 15);
    scene.add(mainLight);

    const orangeLight = new THREE.PointLight(0xf4511e, 4.5, 25);
    orangeLight.position.set(0, 0, 0);
    scene.add(orangeLight);

    const blueBacklight = new THREE.DirectionalLight(0x0288d1, 2.5);
    blueBacklight.position.set(-10, 8, -10);
    scene.add(blueBacklight);

    // Floor Grid with Glowing Amber Rings
    const gridHelper = new THREE.GridHelper(20, 24, 0xf4511e, 0x1e3a5f);
    gridHelper.position.y = -4.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.45;
    scene.add(gridHelper);

    // Floor Glow Plane
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x07111e,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -4.51;
    scene.add(floorMesh);

    // Floor Rings
    const ringGeo = new THREE.RingGeometry(3.5, 3.65, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf4511e, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
    const floorRing = new THREE.Mesh(ringGeo, ringMat);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = -4.49;
    scene.add(floorRing);

    // Create 5 Isometric Floating Tier Groups
    const tierGroups: THREE.Group[] = [];
    const slabMeshes: THREE.Mesh[] = [];
    const edgeLines: THREE.LineSegments[] = [];

    TIERS.forEach((tier, index) => {
      const group = new THREE.Group();
      group.position.y = tier.yPos;
      group.userData = { index, originalY: tier.yPos, tierId: tier.id };

      // Base Glass / Carbon Slab
      const slabGeo = new THREE.BoxGeometry(4.4, 0.35, 4.4);
      const slabMat = new THREE.MeshPhysicalMaterial({
        color: 0x0a1626,
        metalness: 0.2,
        roughness: 0.15,
        transmission: 0.65,
        thickness: 1.2,
        transparent: true,
        opacity: 0.88,
        reflectivity: 0.9,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      });
      const slabMesh = new THREE.Mesh(slabGeo, slabMat);
      slabMesh.castShadow = true;
      group.add(slabMesh);
      slabMeshes.push(slabMesh);

      // Glowing Neon Slab Edge
      const edges = new THREE.EdgesGeometry(slabGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: index === 0 ? 0xf4511e : 0xff7043,
        transparent: true,
        opacity: 0.75,
        linewidth: 2,
      });
      const edgeLine = new THREE.LineSegments(edges, edgeMat);
      group.add(edgeLine);
      edgeLines.push(edgeLine);

      // Internal Architectural / Tech Features inside each tier
      const innerGroup = new THREE.Group();
      
      if (index === 4) {
        // Intelligence & Software: Glowing AI neural core / floating cubes
        const coreGeo = new THREE.OctahedronGeometry(0.5, 0);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0xff7043,
          emissive: 0xf4511e,
          emissiveIntensity: 0.9,
          roughness: 0.2,
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreMesh.position.y = 0.55;
        innerGroup.add(coreMesh);

        // Satellites
        for (let s = 0; s < 4; s++) {
          const ang = (s * Math.PI) / 2;
          const satGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
          const satMat = new THREE.MeshBasicMaterial({ color: 0x4fc3f7 });
          const sat = new THREE.Mesh(satGeo, satMat);
          sat.position.set(Math.cos(ang) * 1.3, 0.45, Math.sin(ang) * 1.3);
          innerGroup.add(sat);
        }
      } else if (index === 3) {
        // Cloud & Compute: Miniature server rack pods & microchips
        for (let rx = -1.2; rx <= 1.2; rx += 0.8) {
          for (let rz = -1.2; rz <= 1.2; rz += 0.8) {
            const rackGeo = new THREE.BoxGeometry(0.45, 0.55, 0.45);
            const rackMat = new THREE.MeshStandardMaterial({
              color: 0x132238,
              metalness: 0.8,
              roughness: 0.3,
            });
            const rack = new THREE.Mesh(rackGeo, rackMat);
            rack.position.set(rx, 0.45, rz);

            // LED indicator strip
            const ledGeo = new THREE.BoxGeometry(0.35, 0.05, 0.02);
            const ledMat = new THREE.MeshBasicMaterial({ color: 0x00e676 });
            const led = new THREE.Mesh(ledGeo, ledMat);
            led.position.set(0, 0.15, 0.23);
            rack.add(led);

            innerGroup.add(rack);
          }
        }
      } else if (index === 2) {
        // Network & Connectivity: Glowing fiber conduits & router hubs
        const hubGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.3, 16);
        const hubMat = new THREE.MeshStandardMaterial({ color: 0x0f2b48, metalness: 0.7, roughness: 0.2 });
        const hub = new THREE.Mesh(hubGeo, hubMat);
        hub.position.y = 0.35;
        innerGroup.add(hub);

        // Radial fiber rays
        for (let f = 0; f < 8; f++) {
          const fang = (f * Math.PI) / 4;
          const fiberGeo = new THREE.BoxGeometry(0.04, 0.04, 1.4);
          const fiberMat = new THREE.MeshBasicMaterial({ color: 0xffab40 });
          const fiber = new THREE.Mesh(fiberGeo, fiberMat);
          fiber.position.set(Math.cos(fang) * 0.9, 0.25, Math.sin(fang) * 0.9);
          fiber.rotation.y = -fang;
          innerGroup.add(fiber);
        }
      } else if (index === 1) {
        // Security & Safety: Shield perimeter & camera pillars
        const barrierGeo = new THREE.RingGeometry(1.6, 1.7, 32);
        const barrierMat = new THREE.MeshBasicMaterial({ color: 0xf4511e, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
        const barrier = new THREE.Mesh(barrierGeo, barrierMat);
        barrier.rotation.x = -Math.PI / 2;
        barrier.position.y = 0.3;
        innerGroup.add(barrier);

        // Security Towers
        [-1.3, 1.3].forEach((tx) => {
          [-1.3, 1.3].forEach((tz) => {
            const towerGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.6, 8);
            const towerMat = new THREE.MeshStandardMaterial({ color: 0x22354d });
            const tower = new THREE.Mesh(towerGeo, towerMat);
            tower.position.set(tx, 0.45, tz);

            const eyeGeo = new THREE.SphereGeometry(0.1, 8, 8);
            const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff3d00 });
            const eye = new THREE.Mesh(eyeGeo, eyeMat);
            eye.position.set(0, 0.35, 0);
            tower.add(eye);

            innerGroup.add(tower);
          });
        });
      } else {
        // Physical Infrastructure: Heavy generators, transformers & building foundations
        for (let bx = -1.1; bx <= 1.1; bx += 1.1) {
          const blockGeo = new THREE.BoxGeometry(0.75, 0.5, 1.6);
          const blockMat = new THREE.MeshStandardMaterial({ color: 0x1c2b3e, roughness: 0.4 });
          const block = new THREE.Mesh(blockGeo, blockMat);
          block.position.set(bx, 0.4, 0);

          const ventGeo = new THREE.BoxGeometry(0.65, 0.08, 0.3);
          const ventMat = new THREE.MeshBasicMaterial({ color: 0xf4511e });
          const vent = new THREE.Mesh(ventGeo, ventMat);
          vent.position.set(0, 0.26, 0);
          block.add(vent);

          innerGroup.add(block);
        }
      }

      group.add(innerGroup);
      scene.add(group);
      tierGroups.push(group);
    });

    // Central Glowing Energy Conduit Beam
    const beamGeo = new THREE.CylinderGeometry(0.08, 0.08, 8.5, 16);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xff7043,
      transparent: true,
      opacity: 0.7,
    });
    const energyBeam = new THREE.Mesh(beamGeo, beamMat);
    energyBeam.position.y = 0;
    scene.add(energyBeam);

    // Floating Data Energy Packets rising along the central beam
    const particleCount = 40;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pSpeed = new Float32Array(particleCount);

    for (let p = 0; p < particleCount; p++) {
      pPos[p * 3] = (Math.random() - 0.5) * 3.5;
      pPos[p * 3 + 1] = (Math.random() - 0.5) * 8;
      pPos[p * 3 + 2] = (Math.random() - 0.5) * 3.5;
      pSpeed[p] = 0.02 + Math.random() * 0.03;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffab40,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse Parallax Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.45;
      targetRotationX = y * 0.25;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      camera.position.x = 9.5 * Math.cos(currentRotationY) + 11.5 * Math.sin(currentRotationY);
      camera.position.z = 11.5 * Math.cos(currentRotationY) - 9.5 * Math.sin(currentRotationY);
      camera.position.y = 4.8 + currentRotationX * 3;
      camera.lookAt(0, -0.2, 0);

      // Subtle breathing float for each tier
      tierGroups.forEach((tg, idx) => {
        const hoverOffset = activeTier === tg.userData.tierId ? 0.35 : 0;
        const floatDelta = Math.sin(elapsedTime * 1.5 + idx * 0.8) * 0.08;
        tg.position.y = THREE.MathUtils.lerp(
          tg.position.y,
          tg.userData.originalY + floatDelta + hoverOffset,
          0.1
        );

        // Highlight active tier
        const edge = edgeLines[idx];
        if (edge && edge.material instanceof THREE.LineBasicMaterial) {
          const isSelected = activeTier === tg.userData.tierId;
          edge.material.color.setHex(isSelected ? 0xffffff : 0xff7043);
          edge.material.opacity = isSelected ? 1 : 0.7;
        }
      });

      // Central beam pulse
      if (beamMat) {
        beamMat.opacity = 0.5 + Math.sin(elapsedTime * 3) * 0.25;
      }

      // Animate rising data particles
      const positions = pGeo.attributes.position.array as Float32Array;
      for (let p = 0; p < particleCount; p++) {
        positions[p * 3 + 1] += pSpeed[p];
        if (positions[p * 3 + 1] > 4.5) {
          positions[p * 3 + 1] = -4.2;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeTier]);

  return (
    <div 
      className="services-hero-3d-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveTier(null);
      }}
    >
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="services-hero-3d-canvas" />

      {/* Floating Tier Labels with Interactive Hover Connectors */}
      <div className="tier-callouts-container">
        {TIERS.map((tier) => {
          const isSelected = activeTier === tier.id;
          return (
            <div
              key={tier.id}
              className={`tier-callout-item ${isSelected ? 'tier-callout-active' : ''}`}
              onMouseEnter={() => setActiveTier(tier.id)}
              onMouseLeave={() => setActiveTier(null)}
            >
              <div className="tier-connector-line">
                <span className="tier-connector-dot" />
                <span className="tier-connector-dash" />
              </div>

              <div className="tier-callout-card">
                <div className="tier-callout-header">
                  <span className="tier-callout-tag">TIER 0{tier.id + 1}</span>
                  <h4 className="tier-callout-title">{tier.label}</h4>
                </div>
                <p className="tier-callout-sub">{tier.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
