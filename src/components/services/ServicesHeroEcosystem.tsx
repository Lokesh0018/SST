import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/ServicesHeroEcosystem.css';

interface PinNode {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  xPercent: number; // percentage along the landscape
  yPercent: number;
}

const PINS: PinNode[] = [
  {
    id: 'security',
    title: 'Security',
    subtitle: 'Protect People & Assets',
    category: 'Security & Surveillance',
    xPercent: 12.5,
    yPercent: 32
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    subtitle: 'Build for Scale',
    category: 'Infrastructure & Turnkey',
    xPercent: 33.5,
    yPercent: 24
  },
  {
    id: 'networks',
    title: 'Networks',
    subtitle: 'Keep You Connected',
    category: 'Networks & Connectivity',
    xPercent: 49.5,
    yPercent: 18
  },
  {
    id: 'software',
    title: 'Software & AI',
    subtitle: 'Turn Data Into Decisions',
    category: 'Software & Digital Solutions',
    xPercent: 67.5,
    yPercent: 28
  },
  {
    id: 'logistics',
    title: 'Logistics',
    subtitle: 'Move Everything Forward',
    category: 'Logistics & Supply Chain',
    xPercent: 86.5,
    yPercent: 34
  }
];

interface ServicesHeroEcosystemProps {
  onSelectCategory?: (categoryName: string) => void;
  onExploreClick?: () => void;
  onApproachClick?: () => void;
}

export default function ServicesHeroEcosystem({
  onSelectCategory,
  onExploreClick,
  onApproachClick
}: ServicesHeroEcosystemProps) {
  const [activePin, setActivePin] = useState<string | null>(null);

  const handlePinClick = (pin: PinNode) => {
    setActivePin(activePin === pin.id ? null : pin.id);
    if (onSelectCategory) {
      onSelectCategory(pin.category);
    }
  };

  return (
    <div className="services-hero-clean">
      <div className="services-hero-inner">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: HEADLINE, SUBTEXT, BUTTONS & STATS           */}
        {/* ========================================================= */}
        <div className="services-hero-content">
          
          {/* Badge */}
          <div className="hero-badge-tag">
            <span className="hero-badge-dash" />
            <span className="hero-badge-name">SERVICES</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-headline">
            REAL SOLUTIONS<br />
            FOR <span className="text-orange-glow">REAL ENVIRONMENTS.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description">
            24 integrated services. One trusted partner for infrastructure, security, networks, software and more.
          </p>

          {/* Buttons */}
          <div className="hero-cta-group">
            <button 
              onClick={onExploreClick}
              className="btn-explore-orange"
              aria-label="Explore Services"
            >
              <span>Explore Services</span>
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button 
              onClick={onApproachClick}
              className="btn-approach-white"
              aria-label="Our Approach"
            >
              <span className="btn-approach-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="2" width="18" height="18">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </span>
              <span>Our Approach</span>
            </button>
          </div>

          {/* Bottom Stats Row */}
          <div className="hero-metrics-row">
            {/* Stat 1 */}
            <div className="hero-metric-item">
              <div className="metric-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="1.8" width="24" height="24">
                  <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="metric-info">
                <span className="metric-num">24</span>
                <span className="metric-txt">Services</span>
              </div>
            </div>

            <div className="metric-sep" />

            {/* Stat 2 */}
            <div className="hero-metric-item">
              <div className="metric-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="1.8" width="24" height="24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="metric-info">
                <span className="metric-num">8+</span>
                <span className="metric-txt">Industries</span>
              </div>
            </div>

            <div className="metric-sep" />

            {/* Stat 3 */}
            <div className="hero-metric-item">
              <div className="metric-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="1.8" width="24" height="24">
                  <circle cx="7" cy="12" r="4" />
                  <circle cx="17" cy="12" r="4" />
                  <line x1="11" y1="12" x2="13" y2="12" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="metric-info">
                <span className="metric-num">End-to-End</span>
                <span className="metric-txt">Integration</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: FULL-BLEED PANORAMIC ECOSYSTEM SCENE        */}
        {/* ========================================================= */}
        <div className="services-hero-visual-pane">
          <div className="panorama-canvas-wrap">
            
            {/* Panoramic Landscape Backdrop using service-hero.png */}
            <img 
              src="/images/services/service-hero.png" 
              alt="SST Integrated Ecosystem Panorama" 
              className="panorama-full-image"
            />

            {/* Micro-Animations: Telecom Radar Ring */}
            <div className="telecom-radar-beacon">
              <span className="beacon-ring ring-1" />
              <span className="beacon-ring ring-2" />
            </div>

            {/* Interactive Pins Overlay */}
            <div className="panorama-pins-container">
              {PINS.map((pin) => {
                const isActive = activePin === pin.id;

                return (
                  <div 
                    key={pin.id}
                    className={`clean-hero-pin pin-node-${pin.id} ${isActive ? 'active-pin' : ''}`}
                    style={{ 
                      left: `${pin.xPercent}%`, 
                      top: `${pin.yPercent}%` 
                    }}
                    onClick={() => handlePinClick(pin)}
                    title={`Click to filter ${pin.title} services`}
                  >
                    {/* Header Label Row */}
                    <div className="pin-text-group">
                      <div className="pin-heading-line">
                        <span className="pin-orange-dot" />
                        <span className="pin-domain-title">{pin.title}</span>
                      </div>
                      <span className="pin-domain-sub">{pin.subtitle}</span>
                    </div>

                    {/* Vertical Connector Line dropping down */}
                    <div className="pin-stem-group">
                      <div className="pin-stem-bar" />
                      <div className="pin-stem-anchor" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom-Right Watermark */}
            <div className="panorama-watermark">
              <span className="wm-line-1">INTEGRATED TODAY</span>
              <span className="wm-line-2">FOR A SMARTER TOMORROW</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
