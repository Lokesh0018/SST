import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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

  useEffect(() => {
    if (!orbitGroupRef.current) return;

    // Rotate the entire orbit group slowly
    gsap.to(orbitGroupRef.current, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });

    // Counter-rotate the text elements so they stay upright
    const textElements = orbitGroupRef.current.querySelectorAll('.orbit-text');
    gsap.to(textElements, {
      rotation: -360,
      duration: 60,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });
  }, []);

  return (
    <svg 
      ref={containerRef}
      viewBox="0 0 500 500" 
      className="ecosystem-svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Orbit Rings */}
      <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(23, 23, 23, 0.05)" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="250" cy="250" r="100" fill="none" stroke="rgba(23, 23, 23, 0.05)" strokeWidth="1" />

      {/* Orbiting Group */}
      <g ref={orbitGroupRef}>
        {labels.map((label, index) => {
          const angle = (index / labels.length) * Math.PI * 2;
          const radius = 160;
          const x = 250 + Math.cos(angle) * radius;
          const y = 250 + Math.sin(angle) * radius;

          return (
            <g key={label} transform={`translate(${x}, ${y})`}>
              {/* Connection Line to Center */}
              <line x1={-Math.cos(angle) * radius} y1={-Math.sin(angle) * radius} x2="0" y2="0" stroke="rgba(23, 23, 23, 0.1)" strokeWidth="1" />
              
              <circle cx="0" cy="0" r="4" fill="#FF4B1F" filter="url(#glow)" />
              <g className="orbit-text">
                <rect x="-40" y="-12" width="80" height="24" rx="12" fill="white" stroke="rgba(23, 23, 23, 0.1)" strokeWidth="1" />
                <text x="0" y="4" textAnchor="middle" fontSize="9" fontWeight="600" fill="#171717" letterSpacing="0.05em">
                  {label}
                </text>
              </g>
            </g>
          );
        })}
      </g>

      {/* Center Node */}
      <g>
        <circle cx="250" cy="250" r="40" fill="white" stroke="rgba(23, 23, 23, 0.1)" strokeWidth="1" />
        <circle cx="250" cy="250" r="34" fill="#F9F7F1" />
        <text x="250" y="256" textAnchor="middle" fontSize="16" fontWeight="800" fill="#FF4B1F" letterSpacing="0.05em">
          SST
        </text>
      </g>
    </svg>
  );
}
