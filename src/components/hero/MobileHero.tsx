import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import '../../styles/MobileHero.css';

import MobileHeroContent from './MobileHeroContent';
import MobileInfrastructureMap from './MobileInfrastructureMap';
import MobileCapabilityRail from './MobileCapabilityRail';
import MobileServiceSheet from './MobileServiceSheet';

export default function MobileHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // 1. Entrance Animations
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.to('.mh-eyebrow', { opacity: 1, y: 0, duration: 0.5, delay: 0.15 })
        .to('.mh-title-line', { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, "-=0.3")
        .to('.mh-desc', { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to('.mh-cta', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .to('.mh-rail-container', { opacity: 1, duration: 0.5 }, "-=0.2");

      // 2. Continuous Network Line Animations (SVG Stroke Dashoffset only)
      const lines = gsap.utils.toArray('.mh-anim-network-line');
      lines.forEach((line: any, i) => {
        gsap.to(line, {
          strokeDashoffset: -100,
          duration: 5 + (i % 3) * 0.5,
          ease: 'none',
          repeat: -1,
        });
      });

    } else {
      // Reduced motion fallback
      gsap.set([
        '.mh-eyebrow', '.mh-title-line', '.mh-desc', '.mh-cta', 
        '.mh-rail-container'
      ], { opacity: 1, y: 0 });
    }
  }, { scope: containerRef });

  return (
    <section className="mobile-hero-section" ref={containerRef}>
      {/* 1. Map Layer: Subtle Full-Height Background extending behind upper content */}
      <div className="mh-map-background-layer">
        <MobileInfrastructureMap 
          activeNodeId={activeNodeId} 
          onNodeTap={setActiveNodeId} 
        />
        <div className="mh-map-gradient-overlay" />
      </div>

      {/* 2. Upper Hero Content Layer: Eyebrow, Heading, Description, CTA Buttons */}
      <div className="mh-hero-top-layer">
        <MobileHeroContent />
      </div>

      {/* 3. Lower Hero Space: Dedicated visual focal space for India + Surrounding Service Nodes */}
      <div className="mh-network-focus-space" />

      {/* 4. Bottom Capability Rail */}
      <div className="mh-hero-rail-layer">
        <MobileCapabilityRail />
      </div>

      {/* 5. Interactive Bottom Sheet for Service Details */}
      <MobileServiceSheet 
        activeNodeId={activeNodeId} 
        onClose={() => setActiveNodeId(null)} 
      />
    </section>
  );
}
