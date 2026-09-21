import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import '../../styles/RubiksCube.css';

interface LogoItem {
  name: string;
  logo: string;
  category?: string;
}

interface RubiksCubeProps {
  logos: LogoItem[];
}

export default function RubiksCube({ logos }: RubiksCubeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;
    let isTwisting = false;
    let twistTimeoutId: ReturnType<typeof setTimeout>;

    // Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(4.8, 3.8, 6.2);
    camera.lookAt(0, -0.05, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainLight.position.set(6, 8, 7);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xdce7ff, 1.0);
    fillLight.position.set(-6, -4, -5);
    scene.add(fillLight);

    const topLight = new THREE.DirectionalLight(0xfff8ee, 0.8);
    topLight.position.set(0, 7, 0);
    scene.add(topLight);

    // Cube Hierarchy
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const cubeGroup = new THREE.Group();
    worldGroup.add(cubeGroup);

    const pivotGroup = new THREE.Group();
    cubeGroup.add(pivotGroup);

    // Subtle floating shadow underneath
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
      gradient.addColorStop(0, 'rgba(10, 17, 40, 0.28)');
      gradient.addColorStop(0.4, 'rgba(10, 17, 40, 0.12)');
      gradient.addColorStop(1, 'rgba(10, 17, 40, 0)');
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.0;
    worldGroup.add(shadowMesh);

    // Prepare 54 logos
    const validLogos = logos.filter(l => l.logo && l.logo.trim() !== '');
    const logoPool = validLogos.length > 0 ? validLogos : [{ name: 'SST', logo: '/images/logo/LOGO.png' }];
    const faceLogos: LogoItem[] = [];
    for (let i = 0; i < 54; i++) {
      faceLogos.push(logoPool[i % logoPool.length]);
    }

    // Helper: generate sticker texture from logo URL
    const texturesToDispose: THREE.Texture[] = [shadowTexture];
    const materialsToDispose: THREE.Material[] = [shadowMat];
    const geometriesToDispose: THREE.BufferGeometry[] = [shadowGeo];

    const createStickerTexture = (logoItem: LogoItem) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      // Background rounded card
      const drawBackground = () => {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        const r = 24;
        const pad = 8;
        const w = 256 - pad * 2;
        const h = 256 - pad * 2;
        ctx.roundRect(pad, pad, w, h, r);
        ctx.fill();

        // Subtle border
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Glossy highlight reflection
        const gloss = ctx.createLinearGradient(0, 0, 256, 256);
        gloss.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        gloss.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
        gloss.addColorStop(1, 'rgba(240, 244, 248, 0.2)');
        ctx.fillStyle = gloss;
        ctx.beginPath();
        ctx.roundRect(pad, pad, w, h, r);
        ctx.fill();
      };

      drawBackground();

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace; // Fixes washed out/light colors
      texturesToDispose.push(texture);

      // Load logo image
      if (logoItem.logo) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = logoItem.logo;
        img.onload = () => {
          if (isDisposed) return;
          ctx.clearRect(0, 0, 256, 256);
          drawBackground();

          // Fit image neatly inside canvas with padding
          const maxDim = 170;
          let dw = img.naturalWidth || maxDim;
          let dh = img.naturalHeight || maxDim;
          const ratio = Math.min(maxDim / dw, maxDim / dh);
          dw = dw * ratio;
          dh = dh * ratio;
          const dx = (256 - dw) / 2;
          const dy = (256 - dh) / 2;

          ctx.drawImage(img, dx, dy, dw, dh);
          texture.needsUpdate = true;
        };
        img.onerror = () => {
          // Fallback text if logo fails to load
          if (isDisposed) return;
          ctx.clearRect(0, 0, 256, 256);
          drawBackground();
          ctx.fillStyle = '#0a1128';
          ctx.font = 'bold 24px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(logoItem.name.slice(0, 10), 128, 128);
          texture.needsUpdate = true;
        };
      }

      return texture;
    };

    // Black plastic chassis material for internal faces
    const blackPlasticMat = new THREE.MeshStandardMaterial({
      color: 0x0c101a,
      roughness: 0.35,
      metalness: 0.15
    });
    materialsToDispose.push(blackPlasticMat);

    // Cubies parameters
    const CUBIE_SIZE = 0.94;
    const SPACING = 1.0;
    const cubieGeo = new THREE.BoxGeometry(CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE);
    geometriesToDispose.push(cubieGeo);

    // Sticker plane geometry
    const STICKER_SIZE = 0.88;
    const stickerGeo = new THREE.PlaneGeometry(STICKER_SIZE, STICKER_SIZE);
    geometriesToDispose.push(stickerGeo);

    const cubies: THREE.Group[] = [];
    let logoIdx = 0;

    // Build 26 cubies (skip core 0,0,0)
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;

          const cubie = new THREE.Group();
          cubie.position.set(x * SPACING, y * SPACING, z * SPACING);

          // Black body mesh
          const bodyMesh = new THREE.Mesh(cubieGeo, blackPlasticMat);
          cubie.add(bodyMesh);

          // Helper to add sticker on a specific side
          const addSticker = (side: 'front' | 'back' | 'top' | 'bottom' | 'right' | 'left', logo: LogoItem) => {
            const tex = createStickerTexture(logo);
            const stickerMat = new THREE.MeshStandardMaterial({
              map: tex,
              roughness: 0.25,
              metalness: 0.05,
              polygonOffset: true,
              polygonOffsetFactor: -1,
              polygonOffsetUnits: -1
            });
            materialsToDispose.push(stickerMat);

            const sticker = new THREE.Mesh(stickerGeo, stickerMat);
            const offset = CUBIE_SIZE / 2 + 0.002;

            if (side === 'front') {
              sticker.position.z = offset;
            } else if (side === 'back') {
              sticker.position.z = -offset;
              sticker.rotation.y = Math.PI;
            } else if (side === 'top') {
              sticker.position.y = offset;
              sticker.rotation.x = -Math.PI / 2;
            } else if (side === 'bottom') {
              sticker.position.y = -offset;
              sticker.rotation.x = Math.PI / 2;
            } else if (side === 'right') {
              sticker.position.x = offset;
              sticker.rotation.y = Math.PI / 2;
            } else if (side === 'left') {
              sticker.position.x = -offset;
              sticker.rotation.y = -Math.PI / 2;
            }

            cubie.add(sticker);
          };

          // Attach stickers only to outward facing surfaces
          if (z === 1) addSticker('front', faceLogos[logoIdx++ % faceLogos.length]);
          if (z === -1) addSticker('back', faceLogos[logoIdx++ % faceLogos.length]);
          if (y === 1) addSticker('top', faceLogos[logoIdx++ % faceLogos.length]);
          if (y === -1) addSticker('bottom', faceLogos[logoIdx++ % faceLogos.length]);
          if (x === 1) addSticker('right', faceLogos[logoIdx++ % faceLogos.length]);
          if (x === -1) addSticker('left', faceLogos[logoIdx++ % faceLogos.length]);

          cubeGroup.add(cubie);
          cubies.push(cubie);
        }
      }
    }

    // Set initial dynamic angle
    worldGroup.rotation.x = 0.28;
    worldGroup.rotation.y = -0.55;

    // TWIST ANIMATION LOGIC (Mathematical & Drift-Proof)
    const performRandomTwist = () => {
      if (isDisposed || isTwisting) return;
      isTwisting = true;

      const axes: ('x' | 'y' | 'z')[] = ['x', 'y', 'z'];
      const axis = axes[Math.floor(Math.random() * axes.length)];
      const layerValues = [-1, 0, 1];
      const layer = layerValues[Math.floor(Math.random() * layerValues.length)] * SPACING;
      const angleMultiplier = Math.random() > 0.5 ? 1 : -1;
      const targetAngle = (Math.PI / 2) * angleMultiplier;

      // Ensure transforms are updated
      cubeGroup.updateMatrixWorld(true);

      // Find all cubies in this slice
      const sliceCubies: THREE.Group[] = [];
      const tolerance = 0.25;

      cubies.forEach(cubie => {
        // Calculate cubie position relative to cubeGroup
        const localPos = cubie.position;
        if (Math.abs(localPos[axis] - layer) < tolerance) {
          sliceCubies.push(cubie);
        }
      });

      if (sliceCubies.length === 0) {
        isTwisting = false;
        scheduleNextTwist(400);
        return;
      }

      // Reset pivot
      pivotGroup.rotation.set(0, 0, 0);
      pivotGroup.position.set(0, 0, 0);
      pivotGroup.updateMatrixWorld(true);

      // Attach slice cubies to pivot
      sliceCubies.forEach(cubie => {
        pivotGroup.attach(cubie);
      });

      // Animate rotation of pivotGroup using GSAP
      const tweenObj = { rot: 0 };
      gsap.to(tweenObj, {
        rot: targetAngle,
        duration: 0.65,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (isDisposed) return;
          pivotGroup.rotation[axis] = tweenObj.rot;
        },
        onComplete: () => {
          if (isDisposed) return;
          pivotGroup.updateMatrixWorld(true);

          // Detach all cubies back to cubeGroup and snap exact coordinates
          const attachedChildren = [...pivotGroup.children];
          attachedChildren.forEach(child => {
            cubeGroup.attach(child);

            // Snap position to exact grid values (-1, 0, 1) * SPACING
            child.position.x = Math.round(child.position.x / SPACING) * SPACING;
            child.position.y = Math.round(child.position.y / SPACING) * SPACING;
            child.position.z = Math.round(child.position.z / SPACING) * SPACING;

            // Snap rotation to exact quarter turns
            child.rotation.x = Math.round(child.rotation.x / (Math.PI / 2)) * (Math.PI / 2);
            child.rotation.y = Math.round(child.rotation.y / (Math.PI / 2)) * (Math.PI / 2);
            child.rotation.z = Math.round(child.rotation.z / (Math.PI / 2)) * (Math.PI / 2);

            child.updateMatrix();
          });

          pivotGroup.rotation.set(0, 0, 0);
          pivotGroup.updateMatrixWorld(true);

          isTwisting = false;
          scheduleNextTwist(800 + Math.random() * 400);
        }
      });
    };

    const scheduleNextTwist = (delayMs: number) => {
      if (isDisposed) return;
      twistTimeoutId = setTimeout(() => {
        performRandomTwist();
      }, delayMs);
    };

    // Start twists after initial delay (wait for arrival animation)
    twistTimeoutId = setTimeout(() => {
      performRandomTwist();
    }, 3500);

    // Mouse interactive tilt & Arrival Spin
    let baseTargetRotX = 0.28;
    let baseTargetRotY = -0.55;
    
    // Arrival Spin state (fast spin that decays)
    const arrivalOffset = { x: Math.PI * 4, y: Math.PI * 12 };
    
    gsap.to(arrivalOffset, {
      x: 0,
      y: 0,
      duration: 3.5,
      ease: 'expo.out'
    });

    let targetRotX = baseTargetRotX + arrivalOffset.x;
    let targetRotY = baseTargetRotY + arrivalOffset.y;
    let currentRotX = targetRotX;
    let currentRotY = targetRotY;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      baseTargetRotY = -0.55 + nx * 0.6;
      baseTargetRotX = 0.28 + ny * 0.4;
      mouseActive = true;
    };

    const handleMouseEnter = () => {
      gsap.killTweensOf(arrivalOffset);
      arrivalOffset.x = Math.PI * 2;
      arrivalOffset.y = Math.PI * 6;
      gsap.to(arrivalOffset, {
        x: 0,
        y: 0,
        duration: 3,
        ease: 'expo.out'
      });
    };

    const handleMouseLeave = () => {
      mouseActive = false;
      // Reset base targets to idle position when mouse leaves
      baseTargetRotX = 0.28;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const nx = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * 2;
      baseTargetRotY = -0.55 + nx * 0.7;
      baseTargetRotX = 0.28 + ny * 0.4;
      mouseActive = true;
    };

    const handleTouchEnd = () => {
      mouseActive = false;
      baseTargetRotX = 0.28;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchstart', handleMouseEnter, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Render loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle auto-rotation when mouse is not active
      if (!mouseActive) {
        baseTargetRotY += delta * 0.25;
      }

      targetRotX = baseTargetRotX + arrivalOffset.x;
      targetRotY = baseTargetRotY + arrivalOffset.y;

      // Smooth camera / worldGroup easing
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      worldGroup.rotation.x = currentRotX;
      worldGroup.rotation.y = currentRotY;

      // Gentle floating bob
      worldGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.08;
      shadowMesh.scale.setScalar(1 + Math.sin(elapsedTime * 1.8) * 0.05);

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const handleResize = () => {
      if (!container || isDisposed) return;
      const newW = container.clientWidth || 360;
      const newH = container.clientHeight || 360;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      isDisposed = true;
      clearTimeout(twistTimeoutId);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchstart', handleMouseEnter);
      container.removeEventListener('touchend', handleTouchEnd);

      geometriesToDispose.forEach(g => g.dispose());
      materialsToDispose.forEach(m => m.dispose());
      texturesToDispose.forEach(t => t.dispose());

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [logos]);

  return (
    <div className="rubiks-cube-scene">
      <div ref={mountRef} className="rubiks-cube-three-container" />
    </div>
  );
}
