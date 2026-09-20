import { useEffect, useRef } from 'react';
import '../../styles/IndustriesHeroBackground.css';

interface DotPoint {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  isEdge: boolean;
  isWater: boolean;
}

interface Ripple {
  cx: number;
  cy: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
}

export default function IndustriesHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotationAngle = 0;
    const tiltAngle = 0.22; // ~12 degrees axial tilt
    const baseSphereRadius = 180;

    let points: DotPoint[] = [];
    const WORLD_MASK_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAAAAADm7SDXAAAEQUlEQVR42u1c25KDIAzNYfz/Xz77YK0XAgQSte7Iw05ntoYccg+xIu9617tqC4PPUaHAEMpXAaGAu+d5wjGJiBBnAZkpU2SBgkwKddLs2pAi6AADkwzKHPUAUSjFiQVGewAFMyPzh92DdAs7+zaLlKiThglFbcsSEoyiYIuSKiZYvRO4CILKs/TgwObTwZdoNKnS15jBETvXf/DgqGA8RYPFU2ogWtoLtq1WFtMQIbg+tNU6WwzRNJ8L92A3ENkBWbwcu49iI2RadIqHfY9bOnB8ThadMLg+sNct7HmGplVcaDjYrmkZBxSTB87b0ojlfrOmYeTMjM3g/RArhI9UIXlcAxu2fxSBMfbuHV8MiF1IOWjxNruhBUn7lLdxopWe9VuDCoRox2tR0iyYgBAiATAKOKrmiWpGSFMY51f7GGXpUIGkhpPtLbPUf1KElCDrmEnNHMKaEtl8fVu1eH41CM9ZL8kKrfE8BoaqKclXrzATsZkEYovz5PfnTa6QqTQwbPgYrBDprC+5z59Zzf1tODheIfoq/m3kwZo4jrgAOFihv97/JPoQIYRjPgxr0qFHhSRyUd8MQsJDCIzR8lG3861d4PHK3wyx5OoxHLbRG/XhiS5otbnSqIWhN58QetIUhrRMlUwFUQxEdRIx2Hsnog6SMUBSHxlEKQQ628HNbyVHnuaRB7dIAAFwzf3IpsyPsVClX8lWhR6gWoIsDNBbbtV228kHCFOt3fYzBCDcD0GxRMCoBR1AgG8wWI+UrspR/yJ2GbKxZ9Elkc+R5X9dMQSoeUiedqtrN3oaGuh54gKp9Y8lrGUa1is0BNWeKjI5zJSN7MlQ65DVixWULmCi6hFw7lZJxom7attLYVPmu6tuy62Nw95hVDgaOxze/AMN19Cvf8TqoQ0ZmSOsMaLURH1YBObMMgXhGPRkMFyBHEJwNBAGiLaR5nT1W8K6KCQZn3lzuVdjK4JNErgYfUm4bec18gpIdDPA7IvRFfyJ493l3k9DopEgzs+VB4cQZyNXTfoBi2ms/XCApwVEE0GGn8WqXim42j9XULNrVJOjSa5b9I1g1suT5BgsQuAFbV/XIHw4hA4TQV/gaXg8puBGiPnbiM3skEQeMAmeqyCPH6ZI1cKFXuK4Z4oMXT2zlNFhLD3yFQMFSbqUKZynhOmWw8VvCdc4JOt4Y0G5rS/tOD3BLrhtCBciOUIEcunbO3rOdXdAHBVpdu2E+LO5YdGXwfI2GIeOHfFI1VLf8bnBa0XjYD5SPqJa+BVsD1WtcCD4L0D4L4BA3vWud73reYv/BAb9FFg8nHlE5DMowuqcBc4ejOlt6PKMZm1oRcLWDyyMjB1hDEj+wwJgyOxZ/7V6Bgc9F6uFOR7c6wbKo3yMSbh4aY011X70ZBADby4a2fcmLQoGxHvYh9dA9cmE68WACLUA7+9D6L3UB6Yd4Nt8+K31B0l0kqU95IyVAAAAAElFTkSuQmCC";

    const img = new Image();
    img.src = WORLD_MASK_B64;
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 200;
      offscreen.height = 100;
      const oCtx = offscreen.getContext('2d');
      if (!oCtx) return;
      oCtx.drawImage(img, 0, 0, 200, 100);
      const imgData = oCtx.getImageData(0, 0, 200, 100).data;

      const numPoints = 8000;
      const goldenRatio = (1 + Math.sqrt(5)) / 2;

      for (let i = 0; i < numPoints; i++) {
        const theta = (2 * Math.PI * i) / goldenRatio;
        const phi = Math.acos(1 - (2 * (i + 0.5)) / numPoints);

        const x = baseSphereRadius * Math.cos(theta) * Math.sin(phi);
        const y = baseSphereRadius * Math.cos(phi);
        const z = baseSphereRadius * Math.sin(theta) * Math.sin(phi);

        // Spherical to equirectangular UV
        const phiAngle = phi; // 0 to PI
        let thetaAngle = theta % (2 * Math.PI); // 0 to 2PI
        if (thetaAngle < 0) thetaAngle += 2 * Math.PI;

        const u = thetaAngle / (2 * Math.PI);
        const v = phiAngle / Math.PI;

        const px = Math.min(199, Math.floor(u * 200));
        const py = Math.min(99, Math.floor(v * 100));
        
        const idx = (py * 200 + px) * 4;
        
        // If it's land (white in our mask), keep it as land
        if (imgData[idx] > 128) {
          // Detect if it's on the edge of the landmass
          let isEdge = false;
          if (px > 0 && imgData[(py * 200 + (px - 1)) * 4] <= 128) isEdge = true;
          if (px < 199 && imgData[(py * 200 + (px + 1)) * 4] <= 128) isEdge = true;
          if (py > 0 && imgData[((py - 1) * 200 + px) * 4] <= 128) isEdge = true;
          if (py < 99 && imgData[((py + 1) * 200 + px) * 4] <= 128) isEdge = true;

          const baseRadius = isEdge ? 1.4 + Math.random() * 0.4 : 0.8 + Math.random() * 0.4;
          points.push({ x, y, z, baseRadius, isEdge, isWater: false });
        } else {
          // It's water
          // Keep water dots slightly smaller and sparser (e.g., skip 50% of them)
          if (Math.random() > 0.5) {
            points.push({ x, y, z, baseRadius: 0.6 + Math.random() * 0.3, isEdge: false, isWater: true });
          }
        }
      }
    };

    // Interactive cursor state & ripple waves
    const mouse = { x: -9999, y: -9999, active: false };
    const lastSpawnPos = { x: -9999, y: -9999 };
    const ripples: Ripple[] = [];

    let currentWaveX = 0;
    let currentWaveY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.x = x;
      mouse.y = y;
      mouse.active = true;

      // When cursor moves, spawn a ripple wave
      const distFromLast = Math.hypot(x - lastSpawnPos.x, y - lastSpawnPos.y);
      if (distFromLast > 16 && ripples.length < 9) {
        ripples.push({
          cx: x,
          cy: y,
          radius: 0,
          maxRadius: 240,
          speed: 4.8,
          strength: Math.min(1.0, 0.4 + distFromLast / 30)
        });
        lastSpawnPos.x = x;
        lastSpawnPos.y = y;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      if (!canvas || !ctx) return;
      time += 0.02;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const currentRadius = Math.min(width, height) * 0.32;
      const scale = currentRadius / baseSphereRadius;

      // Slow passive rotation
      rotationAngle += 0.0018;

      const cosY = Math.cos(rotationAngle);
      const sinY = Math.sin(rotationAngle);
      const cosX = Math.cos(tiltAngle);
      const sinX = Math.sin(tiltAngle);

      // Update active ripple waves
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed;
        rip.strength *= 0.965;
        if (rip.strength < 0.03 || rip.radius > rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // Subtle parallax on the wave ribbon
      if (waveRef.current) {
        const targetX = mouse.active ? (mouse.x / width - 0.5) * -40 : 0;
        const targetY = mouse.active ? (mouse.y / height - 0.5) * -40 : 0;
        currentWaveX += (targetX - currentWaveX) * 0.05;
        currentWaveY += (targetY - currentWaveY) * 0.05;
        waveRef.current.style.transform = `translate(${currentWaveX}px, ${currentWaveY}px)`;
      }

      // 1. Project all dots into 3D space
      const projectedDots = [];
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // 3D rotation on Y axis
        const x1 = pt.x * cosY - pt.z * sinY;
        const z1 = pt.x * sinY + pt.z * cosY;

        // 3D tilt on X axis
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        // Depth ratio maps -baseSphereRadius to +baseSphereRadius into 0 to 1
        const depthRatio = (z2 + baseSphereRadius) / (2 * baseSphereRadius);
        
        projectedDots.push({
          pt, x1, y2, z2, depthRatio
        });
      }

      // 2. Sort by Z depth (Painter's algorithm)
      projectedDots.sort((a, b) => a.z2 - b.z2);

      // 3. Render dots from back to front
      for (let i = 0; i < projectedDots.length; i++) {
        const { pt, x1, y2, z2, depthRatio } = projectedDots[i];
        
        // Initial un-displaced screen coords
        const rawScreenX = cx + x1 * scale;
        const rawScreenY = cy - y2 * scale;

        // Depth of field (bokeh): back dots are larger but extremely faint and blurred visually
        // Front dots are sharp and smaller
        const isBack = z2 < 0;

        // Compute ripple displacement from cursor and expanding ripples
        let rippleDisplacement = 0;
        let rippleGlow = 0;

        // ONLY apply ripple effects to the front side of the globe
        if (!isBack) {
          // Direct cursor hover wave field
          if (mouse.active) {
            const distToMouse = Math.hypot(rawScreenX - mouse.x, rawScreenY - mouse.y);
            if (distToMouse < 160) {
              const prox = 1 - distToMouse / 160;
              const wave = Math.sin(distToMouse * 0.1 - time * 6) * prox;
              rippleDisplacement += wave * 11;
              rippleGlow += Math.max(0, wave) * prox * 1.1;
            }
          }

          // Expanding ripple rings from mouse movement
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const distToRip = Math.hypot(rawScreenX - rip.cx, rawScreenY - rip.cy);
            const ringDelta = Math.abs(distToRip - rip.radius);
            if (ringDelta < 40) {
              const wave = Math.cos((ringDelta / 40) * (Math.PI / 2)) * rip.strength;
              rippleDisplacement += wave * 8;
              rippleGlow += wave * 1.2;
            }
          }
        }

        // Apply 3D outward normal displacement from ripple
        const totalScale = scale * (1 + rippleDisplacement / currentRadius);
        const screenX = cx + x1 * totalScale;
        const screenY = cy - y2 * totalScale;
        
        let baseAlpha;
        let dotRadius;
        
        if (isBack) {
          // Fade out in the back, but keep it visible for 3D effect. DepthRatio < 0.5
          baseAlpha = Math.max(0.15, 0.45 * Math.pow(depthRatio * 2, 1.2));
          dotRadius = pt.baseRadius * 1.5; // Simulate out-of-focus blur by making it wider
        } else {
          // Front hemisphere
          const frontDepth = (depthRatio - 0.5) * 2; // 0 to 1
          baseAlpha = 0.4 + Math.pow(frontDepth, 0.75) * 0.6;
          dotRadius = Math.max(0.5, (pt.baseRadius + rippleGlow * 0.8) * Math.pow(frontDepth + 0.1, 0.4));
        }

        const activeAlpha = Math.min(0.8, baseAlpha + rippleGlow * 0.18);

        // Color: soft subtle warm glow on ripple, gentle cool slate at rest
        if (rippleGlow > 0.08 && !isBack) {
          // Soft, extremely subtle warm ripple dot
          const subtleAlpha = Math.min(0.25, 0.08 + rippleGlow * 0.15);
          ctx.fillStyle = `rgba(244, 115, 75, ${subtleAlpha})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, dotRadius * 1.05, 0, Math.PI * 2);
          ctx.fill();
        } else {
          let fillStyle;
          if (pt.isWater) {
            // Blue dots for water (reduced opacity)
            fillStyle = `rgba(59, 130, 246, ${Math.min(0.25, activeAlpha * 0.3)})`;
          } else {
            // Light gray dots for the globe landmass, with slightly darker edges for structure
            fillStyle = pt.isEdge 
              ? `rgba(156, 163, 175, ${Math.min(0.8, activeAlpha * 1.2)})` 
              : `rgba(209, 213, 219, ${activeAlpha})`;
          }
          ctx.fillStyle = fillStyle;
          ctx.beginPath();
          ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="industries-hero-bg-layer" aria-hidden="true">
      {/* Pure Dotted World Globe with Dynamic Cursor Ripple */}
      <div className="hero-bg-globe-wrapper">
        <canvas ref={canvasRef} className="hero-bg-globe-canvas" />
      </div>

      {/* 1. LEFT BACKGROUND: Micro-grid, coordinates, faint orange traces */}
      <svg
        className="hero-bg-overlay left-grid"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMinYMin slice"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <pattern id="micro-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            {/* 10x10 tiny grid */}
            <path d="M 10 0 L 10 40 M 20 0 L 20 40 M 30 0 L 30 40 M 0 10 L 40 10 M 0 20 L 40 20 M 0 30 L 40 30" fill="none" stroke="rgba(16, 24, 45, 0.05)" strokeWidth="0.5" />
            
            {/* Main 40x40 grid */}
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(16, 24, 45, 0.18)" strokeWidth="0.5" />
            
            {/* Intersecting center dashed crosshairs */}
            <path d="M 20 5 L 20 35 M 5 20 L 35 20" fill="none" stroke="rgba(16, 24, 45, 0.15)" strokeWidth="1" strokeDasharray="2 4" />
            
            {/* Dots */}
            <circle cx="0" cy="0" r="1.5" fill="rgba(16, 24, 45, 0.3)" />
            <circle cx="20" cy="20" r="1.2" fill="rgba(16, 24, 45, 0.25)" />
            <circle cx="20" cy="0" r="0.8" fill="rgba(16, 24, 45, 0.15)" />
            <circle cx="0" cy="20" r="0.8" fill="rgba(16, 24, 45, 0.15)" />
          </pattern>
          <linearGradient id="fade-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="55%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="mask-left">
            <rect width="1000" height="1000" fill="url(#fade-right)" />
          </mask>
        </defs>
        
        <g mask="url(#mask-left)">
          <rect width="1000" height="1000" fill="url(#micro-grid)" />
          
          {/* Faint orange circuit traces */}
          <path d="M 50 0 L 50 300 L 150 400 L 150 1000" fill="none" stroke="rgba(244, 81, 30, 0.15)" strokeWidth="1" />
          <path d="M 0 150 L 80 150 L 120 190" fill="none" stroke="rgba(244, 81, 30, 0.12)" strokeWidth="0.5" />
          <path d="M 120 190 L 120 200" fill="none" stroke="rgba(244, 81, 30, 0.2)" strokeWidth="2" />
          <circle cx="150" cy="400" r="3" fill="none" stroke="rgba(244, 81, 30, 0.15)" strokeWidth="1" />

          {/* Coordinate markers */}
          <g stroke="rgba(16, 24, 45, 0.15)" strokeWidth="0.5" fill="none" fontSize="8" fontFamily="monospace">
            <path d="M 200 80 L 220 80 M 210 70 L 210 90" />
            <text x="225" y="83" fill="rgba(16, 24, 45, 0.2)" stroke="none">SYS.01</text>
            
            <path d="M 80 500 L 100 500 M 90 490 L 90 510" />
            <text x="105" y="503" fill="rgba(16, 24, 45, 0.2)" stroke="none">LAT.88</text>

            <path d="M 300 300 L 310 300 M 300 300 L 300 310" strokeWidth="1" />
          </g>
        </g>
      </svg>

      {/* 2. RIGHT BACKGROUND: Micro-grid, coordinates, faint orange traces (Mirrored) */}
      <svg
        className="hero-bg-overlay right-grid"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMaxYMin slice"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <pattern id="micro-grid-right" width="40" height="40" patternUnits="userSpaceOnUse">
            {/* 10x10 tiny grid */}
            <path d="M 10 0 L 10 40 M 20 0 L 20 40 M 30 0 L 30 40 M 0 10 L 40 10 M 0 20 L 40 20 M 0 30 L 40 30" fill="none" stroke="rgba(16, 24, 45, 0.05)" strokeWidth="0.5" />
            
            {/* Main 40x40 grid */}
            <path d="M 0 0 L 40 0 40 40" fill="none" stroke="rgba(16, 24, 45, 0.18)" strokeWidth="0.5" />
            
            {/* Intersecting center dashed crosshairs */}
            <path d="M 20 5 L 20 35 M 5 20 L 35 20" fill="none" stroke="rgba(16, 24, 45, 0.15)" strokeWidth="1" strokeDasharray="2 4" />
            
            {/* Dots */}
            <circle cx="40" cy="0" r="1.5" fill="rgba(16, 24, 45, 0.3)" />
            <circle cx="20" cy="20" r="1.2" fill="rgba(16, 24, 45, 0.25)" />
            <circle cx="20" cy="0" r="0.8" fill="rgba(16, 24, 45, 0.15)" />
            <circle cx="40" cy="20" r="0.8" fill="rgba(16, 24, 45, 0.15)" />
          </pattern>
          <linearGradient id="fade-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="45%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="mask-right">
            <rect width="1000" height="1000" fill="url(#fade-left)" />
          </mask>
        </defs>
        
        <g mask="url(#mask-right)">
          <rect width="1000" height="1000" fill="url(#micro-grid-right)" />
          
          {/* Faint orange circuit traces (mirrored) */}
          <path d="M 950 0 L 950 300 L 850 400 L 850 1000" fill="none" stroke="rgba(244, 81, 30, 0.15)" strokeWidth="1" />
          <path d="M 1000 150 L 920 150 L 880 190" fill="none" stroke="rgba(244, 81, 30, 0.12)" strokeWidth="0.5" />
          <path d="M 880 190 L 880 200" fill="none" stroke="rgba(244, 81, 30, 0.2)" strokeWidth="2" />
          <circle cx="850" cy="400" r="3" fill="none" stroke="rgba(244, 81, 30, 0.15)" strokeWidth="1" />

          {/* Coordinate markers */}
          <g stroke="rgba(16, 24, 45, 0.15)" strokeWidth="0.5" fill="none" fontSize="8" fontFamily="monospace" textAnchor="end">
            <path d="M 800 80 L 780 80 M 790 70 L 790 90" />
            <text x="775" y="83" fill="rgba(16, 24, 45, 0.2)" stroke="none">NET.55</text>
            
            <path d="M 920 500 L 900 500 M 910 490 L 910 510" />
            <text x="895" y="503" fill="rgba(16, 24, 45, 0.2)" stroke="none">LNG.42</text>

            <path d="M 700 300 L 690 300 M 700 300 L 700 310" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
}
