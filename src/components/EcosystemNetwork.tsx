import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const labels = [
  "QUALITY",
  "RELIABILITY",
  "SAFETY",
  "ENGINEERING",
  "SUPPORT",
  "DELIVERY"
];

export default function EcosystemNetwork() {
  const containerRef = useRef<SVGSVGElement>(null);
  const orbitGroupRef = useRef<SVGGElement>(null);

  // Generate particles that will travel along the connection lines
  const particles = useMemo(() => {
    return labels.flatMap((_, index) => {
      // 3 particles per line for a steady flow
      return Array.from({ length: 3 }).map((_, i) => ({
        id: `particle-${index}-${i}`,
        lineIndex: index,
        delay: Math.random() * -4,
        duration: 2.5 + Math.random() * 1.5
      }));
    });
  }, []);

  useEffect(() => {
    if (!orbitGroupRef.current || !containerRef.current) return;

    // 0. Entrance Animation for the whole component (Safe for React Strict Mode)
    gsap.fromTo(containerRef.current, 
      { scale: 0.85, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%"
        }
      }
    );

    // 1. Smooth Rotation for the entire group
    const masterTl = gsap.timeline({ repeat: -1 });

    const orbitTween = gsap.to(orbitGroupRef.current, {
      rotation: 360,
      duration: 80,
      ease: "none",
      svgOrigin: "250 250"
    });

    // Counter-rotate the nodes so they stay upright
    const textElements = orbitGroupRef.current.querySelectorAll('.orbit-node');
    const textTween = gsap.to(textElements, {
      rotation: -360,
      duration: 80,
      ease: "none",
      transformOrigin: "50% 50%"
    });

    // Lock them perfectly in sync
    masterTl.add(orbitTween, 0).add(textTween, 0);

    // Ambient background rotation
    gsap.to('.aurora-group', {
      rotation: -360,
      duration: 120,
      repeat: -1,
      ease: "none",
      svgOrigin: "250 250"
    });

    // Flowing energy dashed lines
    gsap.to('.connection-line', {
      strokeDashoffset: -12, // Creates the flowing towards center effect
      duration: 1,
      repeat: -1,
      ease: "none"
    });

    // 2. Scroll-Driven Velocity
    let resetTimeout: ReturnType<typeof setTimeout>;
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const scrollVelocity = Math.abs(self.getVelocity());
        const targetSpeed = 1 + scrollVelocity / 300;
        
        // Speed up the master timeline in perfect sync
        gsap.to(masterTl, {
          timeScale: targetSpeed,
          duration: 0.2,
          overwrite: true
        });

        // Reset speed shortly after scrolling stops
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          gsap.to(masterTl, { timeScale: 1, duration: 1, overwrite: true });
        }, 150);
      }
    });

    // 3. Pulse the center rings
    gsap.to('.pulse-ring', {
      scale: 1.5,
      opacity: 0,
      duration: 4,
      repeat: -1,
      ease: "power2.out",
      stagger: 2,
      svgOrigin: "250 250"
    });

    // 4. Structured Data Particles Flow
    const centerDist = 45; // Edge of center node
    const nodeDist = 115;  // Inner edge of satellite nodes

    particles.forEach((p) => {
      const angle = (p.lineIndex / labels.length) * Math.PI * 2;
      
      const startX = 250 + Math.cos(angle) * nodeDist;
      const startY = 250 + Math.sin(angle) * nodeDist;
      
      const endX = 250 + Math.cos(angle) * centerDist;
      const endY = 250 + Math.sin(angle) * centerDist;

      // Initial position via GSAP transforms
      gsap.set(`#${p.id}`, { x: startX, y: startY, opacity: 0 });

      gsap.to(`#${p.id}`, {
        x: endX,
        y: endY,
        duration: p.duration,
        delay: p.delay,
        repeat: -1,
        ease: "none",
        keyframes: {
          "0%": { opacity: 0 },
          "15%": { opacity: 1 },
          "85%": { opacity: 1 },
          "100%": { opacity: 0 }
        }
      });
    });

  }, [particles]);

  return (
    <svg 
      ref={containerRef}
      viewBox="0 0 500 500" 
      className="ecosystem-svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="heavy-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="aurora-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8A66" />
          <stop offset="40%" stopColor="#FF4B1F" />
          <stop offset="100%" stopColor="#B32C0D" />
        </linearGradient>
      </defs>

      {/* Ambient Aurora Background */}
      <g className="aurora-group">
        <circle cx="180" cy="180" r="140" fill="rgba(255, 75, 31, 0.04)" filter="url(#aurora-blur)" />
        <circle cx="320" cy="320" r="140" fill="rgba(255, 120, 60, 0.03)" filter="url(#aurora-blur)" />
      </g>

      {/* Background Complex Rings */}
      <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(23, 23, 23, 0.03)" strokeWidth="1" />
      <circle cx="250" cy="250" r="190" fill="none" stroke="rgba(23, 23, 23, 0.05)" strokeWidth="2" strokeDasharray="2 8" />
      <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(255, 75, 31, 0.08)" strokeWidth="1" />
      <circle cx="250" cy="250" r="100" fill="none" stroke="rgba(23, 23, 23, 0.04)" strokeWidth="1" strokeDasharray="8 8" />

      {/* Orbiting Group containing Lines, Particles, and Nodes */}
      <g ref={orbitGroupRef}>
        
        {/* Render Connection Lines */}
        {labels.map((label, index) => {
          const angle = (index / labels.length) * Math.PI * 2;
          const centerDist = 42; 
          const nodeDist = 120;  
          
          const startX = 250 + Math.cos(angle) * centerDist;
          const startY = 250 + Math.sin(angle) * centerDist;
          
          const endX = 250 + Math.cos(angle) * nodeDist;
          const endY = 250 + Math.sin(angle) * nodeDist;

          return (
            <line 
              key={`line-${index}`}
              className="connection-line"
              x1={startX} y1={startY} 
              x2={endX} y2={endY} 
              stroke="rgba(255, 75, 31, 0.25)" 
              strokeWidth="1.5" 
              strokeDasharray="4 8" 
            />
          );
        })}

        {/* Render Particles */}
        {particles.map(p => (
          <circle 
            key={p.id}
            id={p.id}
            r={1.5} 
            fill="#FFFFFF"
            filter="url(#glow)"
            opacity="0.9"
          />
        ))}

        {/* Render HTML Nodes via foreignObject with Glassmorphism */}
        {labels.map((label, index) => {
          const angle = (index / labels.length) * Math.PI * 2;
          const radius = 160;
          const x = 250 + Math.cos(angle) * radius;
          const y = 250 + Math.sin(angle) * radius;

          return (
            <g key={label} transform={`translate(${x}, ${y})`} className="orbit-node">
              <foreignObject x="-60" y="-20" width="120" height="40" style={{ overflow: 'visible' }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 8px 32px rgba(30, 30, 30, 0.05), inset 0 0 12px rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Bouncy premium ease
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.12)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 75, 31, 0.15), inset 0 0 16px rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.border = '1px solid rgba(255, 75, 31, 0.4)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(30, 30, 30, 0.05), inset 0 0 12px rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
                  }}
                >
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: '#171717',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}>
                    {label}
                  </span>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </g>

      {/* Center Hub Node */}
      <g>
        <circle className="pulse-ring" cx="250" cy="250" r="38" fill="none" stroke="rgba(255, 75, 31, 0.4)" strokeWidth="2" />
        <circle className="pulse-ring" cx="250" cy="250" r="38" fill="none" stroke="rgba(255, 75, 31, 0.15)" strokeWidth="4" />
        <circle cx="250" cy="250" r="45" fill="none" stroke="rgba(255, 75, 31, 0.2)" strokeWidth="1" strokeDasharray="2 4" />
        
        {/* Glowing Core */}
        <circle cx="250" cy="250" r="34" fill="url(#centerGrad)" filter="url(#heavy-glow)" opacity="0.9" />
        <circle cx="250" cy="250" r="34" fill="url(#centerGrad)" />
        
        {/* Subtle Inner Highlight */}
        <circle cx="250" cy="250" r="33" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
        
        <text x="250" y="254" textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFFFFF" letterSpacing="0.1em">
          SST
        </text>
      </g>
    </svg>
  );
}
