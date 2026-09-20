import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useServiceContext } from '../../context/ServiceContext';
import './ServiceMapHero.css';


import { INDIA_COORD, services, mapNodes } from './heroData';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const CYCLE_INTERVAL = 5500;

// ===== Service Card Portal (positioned via DOM rects, clamped away from India & hero text) =====
interface ServiceCardProps {
  serviceData: typeof services[0];
  iconId: string;
  containerRef: React.RefObject<HTMLElement>;
  onClose: () => void;
}

const CARD_W = 268;
const CARD_H = 124;
// Approximate India "exclusion zone" in hero-section-relative px (rough bounding box)
// India appears in the right-center of the hero. These are hero-relative bounds.
const INDIA_EXCLUSION = { left: 680, right: 980, top: 200, bottom: 520 };
// Hero text column occupies roughly the left 42%
const TEXT_ZONE_RIGHT = 0.44; // fraction of hero width
// Bottom ticker height
const TICKER_H = 64;
// Top navbar clearance (relative to hero top)
const NAVBAR_H = 72;
// Right accent column clearance
const RIGHT_ACCENT_LEFT = 0.92;

function clampCard(
  iconCenterX: number,
  iconCenterY: number,
  containerW: number,
  containerH: number
): { left: number; top: number; originX: string; originY: string } {
  const textZoneRightPx = containerW * TEXT_ZONE_RIGHT;
  const rightAccentLeftPx = containerW * RIGHT_ACCENT_LEFT;

  // Preferred positions: try 4 directions away from icon center
  const candidates: { left: number; top: number; score: number }[] = [];

  const tryPos = (left: number, top: number) => {
    // Clamp within container
    left = Math.max(textZoneRightPx + 8, Math.min(left, rightAccentLeftPx - CARD_W - 8));
    top = Math.max(NAVBAR_H + 8, Math.min(top, containerH - TICKER_H - CARD_H - 8));

    // Check India exclusion overlap
    const overlapIndia =
      left < INDIA_EXCLUSION.right &&
      left + CARD_W > INDIA_EXCLUSION.left &&
      top < INDIA_EXCLUSION.bottom &&
      top + CARD_H > INDIA_EXCLUSION.top;

    // Distance from icon center (prefer cards near their icon)
    const dist = Math.hypot(left + CARD_W / 2 - iconCenterX, top + CARD_H / 2 - iconCenterY);

    // Score: penalise India overlap heavily
    const score = overlapIndia ? dist + 99999 : dist;
    candidates.push({ left, top, score });
  };

  // Try 8 positions around the icon
  tryPos(iconCenterX + 20, iconCenterY - CARD_H / 2);           // right
  tryPos(iconCenterX - CARD_W - 20, iconCenterY - CARD_H / 2); // left
  tryPos(iconCenterX - CARD_W / 2, iconCenterY - CARD_H - 20); // above
  tryPos(iconCenterX - CARD_W / 2, iconCenterY + 20);           // below
  tryPos(iconCenterX + 20, iconCenterY - CARD_H - 10);           // upper-right
  tryPos(iconCenterX - CARD_W - 20, iconCenterY - CARD_H - 10); // upper-left
  tryPos(iconCenterX + 20, iconCenterY + 10);                    // lower-right
  tryPos(iconCenterX - CARD_W - 20, iconCenterY + 10);          // lower-left

  candidates.sort((a, b) => a.score - b.score);
  const best = candidates[0];

  // Derive transform-origin for animation (so card grows toward icon)
  const originX = best.left > iconCenterX ? 'left' : 'right';
  const originY = best.top > iconCenterY ? 'top' : 'bottom';

  return { left: best.left, top: best.top, originX, originY };
}

const FloatingServiceCard: React.FC<ServiceCardProps> = ({ serviceData, iconId, containerRef, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!cardRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Find the icon DOM node by data attribute
    const iconEl = container.querySelector(`[data-service-id="${iconId}"]`) as HTMLElement | null;
    let iconCenterX = containerRect.width / 2;
    let iconCenterY = containerRect.height / 2;

    if (iconEl) {
      const iconRect = iconEl.getBoundingClientRect();
      iconCenterX = iconRect.left - containerRect.left + iconRect.width / 2;
      iconCenterY = iconRect.top - containerRect.top + iconRect.height / 2;
    }

    const { left, top, originX, originY } = clampCard(iconCenterX, iconCenterY, containerRect.width, containerRect.height);

    // Set initial state
    gsap.set(cardRef.current, {
      left,
      top,
      scale: 0.6,
      opacity: 0,
      transformOrigin: `${originX} ${originY}`,
    });

    gsap.set(rowRefs.current, { opacity: 0, y: 8 });

    // Animate in
    const tl = gsap.timeline();
    tl.to(cardRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.45,
      ease: 'expo.out',
    });
    tl.to(rowRefs.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.06,
      ease: 'power2.out',
    }, '-=0.1');

    // Draw connector line
    if (lineRef.current && iconEl) {
      const cardCenterX = left + CARD_W / 2;
      const cardCenterY = top + CARD_H / 2;
      const dx = iconCenterX - cardCenterX;
      const dy = iconCenterY - cardCenterY;
      const angle = Math.atan2(dy, dx);
      const CARD_RADIUS = 12; // edge offset
      const ICON_RADIUS = 14;

      const startX = cardCenterX + Math.cos(angle) * (Math.sqrt((CARD_W / 2) ** 2 + (CARD_H / 2) ** 2) * 0.7);
      const startY = cardCenterY + Math.sin(angle) * (CARD_H / 2 + 2);
      const endX = iconCenterX - Math.cos(angle) * ICON_RADIUS;
      const endY = iconCenterY - Math.sin(angle) * ICON_RADIUS;

      lineRef.current.setAttribute('x1', String(startX));
      lineRef.current.setAttribute('y1', String(startY));
      lineRef.current.setAttribute('x2', String(endX));
      lineRef.current.setAttribute('y2', String(endY));

      const length = Math.hypot(endX - startX, endY - startY);
      gsap.fromTo(lineRef.current,
        { strokeDasharray: length, strokeDashoffset: length, opacity: 0 },
        { strokeDashoffset: 0, opacity: 0.6, duration: 0.5, delay: 0.15, ease: 'power2.out' }
      );
    }

    return () => {
      tl.kill();
    };
  }, [iconId, containerRef]);

  const handleClose = useCallback(() => {
    if (!cardRef.current) { onClose(); return; }
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(rowRefs.current, { opacity: 0, y: -6, duration: 0.15, stagger: 0.04, ease: 'power2.in' });
    tl.to(cardRef.current, { scale: 0.7, opacity: 0, duration: 0.3, ease: 'power3.in' }, '-=0.05');
    if (lineRef.current) tl.to(lineRef.current, { opacity: 0, duration: 0.2 }, '<');
  }, [onClose]);

  return (
    <>
      {/* SVG connector line overlay */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 48 }}
      >
        <line
          ref={lineRef}
          stroke="#F4511E"
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0}
        />
      </svg>

      {/* Card */}
      <div
        ref={cardRef}
        className="service-float-card"
        style={{
          position: 'absolute',
          width: CARD_W,
          zIndex: 49,
          pointerEvents: 'auto',
        }}
      >
        {/* Orange accent bar */}
        <div className="sfc-accent-bar" />

        {/* Close hit area */}
        <button className="sfc-close-btn" onClick={handleClose} aria-label="Close">✕</button>

        <div ref={el => { rowRefs.current[0] = el; }} className="sfc-row sfc-category">
          <div className="sfc-icon-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F4511E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d={serviceData.icon} />
            </svg>
          </div>
          <span className="sfc-cat-label">{serviceData.category}</span>
        </div>

        <div ref={el => { rowRefs.current[1] = el; }} className="sfc-row">
          <h4 className="sfc-title">{serviceData.label}</h4>
        </div>

        <div ref={el => { rowRefs.current[2] = el; }} className="sfc-row">
          <p className="sfc-desc">{serviceData.desc}</p>
        </div>

        <div ref={el => { rowRefs.current[3] = el; }} className="sfc-row sfc-footer">
          <Link to={`/services#${(serviceData as any).slug}`} className="sfc-explore-link">
            Explore <span className="sfc-arrow">→</span>
          </Link>
        </div>
      </div>
    </>
  );
};

// ===== Clean Map Icon (pure SVG, no foreignObject) =====
const MapPin: React.FC<{
  node: typeof mapNodes[0];
  isActive: boolean;
  serviceData: typeof services[0];
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}> = ({ node, isActive, serviceData, onSelect, onHover }) => (
  <Marker coordinates={node.coordinates as [number, number]}>
    <g
      data-service-id={node.id}
      className={`map-pin-node ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(node.id)}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Outer pulse ring — only when active */}
      {isActive && <circle r={20} fill="none" stroke="#F4511E" strokeWidth={1} className="pin-pulse-ring" />}
      {/* Ambient glow */}
      <circle r={16} fill={isActive ? 'rgba(244,81,30,0.12)' : 'rgba(30,37,48,0.08)'} className="pin-glow" />
      {/* Main circle */}
      <circle className="pin-main-circle" r={13} strokeWidth={1.5} />
      {/* Service icon */}
      <svg className="pin-icon" x="-7" y="-7" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={serviceData.icon} />
      </svg>
    </g>
  </Marker>
);

// ===== Main Component =====
export default function DesktopHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const { activeService, setActiveService, isUserInteracting } = useServiceContext();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isHubHovered, setIsHubHovered] = useState(false);

  // Click outside to close active card
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      // Do not close if clicking inside elements that control the card or the card itself
      if (
        target.closest('.map-pin-node') ||
        target.closest('.ticker-item') ||
        target.closest('.service-float-card')
      ) {
        return;
      }
      
      if (activeService) {
        setActiveService(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeService, setActiveService]);

  const activeIndex = services.findIndex(s => s.id === activeService);
  const activeServiceData = services[activeIndex >= 0 ? activeIndex : 0];

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (contentRef.current) {
      const tagline = contentRef.current.querySelector('.hero-tagline');
      const titleLines = contentRef.current.querySelectorAll('.hero-title-line');
      const desc = contentRef.current.querySelector('.hero-description-container');
      const cta = contentRef.current.querySelector('.hero-cta-group');

      // 1. Tagline
      tl.to(tagline, { autoAlpha: 1, y: 0, duration: 0.8 });
      
      // 2. Title lines (staggered)
      tl.to(titleLines, 
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'back.out(1.2)' },
        "-=0.5" // overlap with tagline
      );

      // 3. Description
      tl.to(desc, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.4");

      // 4. CTA
      tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6");
    }

    if (mapRef.current) {
      tl.fromTo('.map-grid',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.4"
      );

      const pins = mapRef.current.querySelectorAll('.map-pin-node');
      tl.fromTo(pins,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)' },
        "-=0.5"
      );
    }
  }, { scope: containerRef });

  return (
    <section className="service-map-hero" ref={containerRef}>
      {/* Background World Map */}
      <div className="map-background" ref={mapRef}>
        <div className="map-grid">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 155, center: [30, 20] }}
            style={{ width: "100%", height: "100%", opacity: 1 }}
          >
            {/* SVG Definitions for India gradient */}
            <defs>
              <linearGradient id="indiaGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF7043" />
                <stop offset="50%" stopColor="#F4511E" />
                <stop offset="100%" stopColor="#E64A19" />
              </linearGradient>
            </defs>

            {/* World Geography (excluding standard India) */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isIndia = geo.properties?.name === "India";
                  if (isIndia) return null; // Hide the 'cut' version of India

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#CBD5E1"
                      stroke="#ffffff"
                      strokeWidth={0.4}
                      style={{
                        default: {
                          outline: "none"
                        },
                        hover: {
                          outline: "none"
                        },
                        pressed: {
                          outline: "none"
                        }
                      } as any}
                    />
                  );
                })
              }
            </Geographies>

            {/* Official India Geography (Full Boundaries, State lines removed) */}
            <Geographies geography="/india-official-country.topo.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="url(#indiaGradient)"
                    stroke="#D84315"
                    strokeWidth={0.8}
                    style={{
                      default: {
                        outline: "none",
                        filter: "drop-shadow(0 0 8px rgba(244, 81, 30, 0.35))"
                      },
                      hover: {
                        outline: "none",
                        filter: "drop-shadow(0 0 8px rgba(244, 81, 30, 0.35))"
                      },
                      pressed: {
                        outline: "none",
                        filter: "drop-shadow(0 0 8px rgba(244, 81, 30, 0.35))"
                      }
                    } as any}
                  />
                ))
              }
            </Geographies>

            {/* Connection Lines from India */}
            {mapNodes.map((node) => {
              const isHovered = hoveredService === node.id || isHubHovered;
              const isActive = activeService === node.id;
              return (
                <g key={`line-group-${node.id}`}>
                  <Line
                    from={INDIA_COORD}
                    to={node.coordinates as [number, number]}
                    stroke={isHovered ? "#F4511E" : "#000000"}
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    className="connection-line-active"
                    style={{ opacity: isHovered ? 0.8 : 0.5, transition: 'stroke 0.3s ease, opacity 0.3s ease' }}
                  />
                  {isActive && (
                    <Line
                      from={INDIA_COORD}
                      to={node.coordinates as [number, number]}
                      stroke="#F4511E"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeDasharray="8 4"
                      className="connection-line-active"
                      style={{ strokeOpacity: 0.85 }}
                    />
                  )}
                </g>
              );
            })}

            {/* Global Service Pins */}
            {mapNodes.map((node) => {
              const serviceData = services.find(s => s.id === node.id);
              if (!serviceData) return null;
              return (
                <MapPin
                  key={node.id}
                  node={node}
                  isActive={activeService === node.id}
                  serviceData={serviceData}
                  onSelect={(id) => setActiveService(activeService === id ? null : id)}
                  onHover={setHoveredService}
                />
              );
            })}

            {/* India Center Pin — Pulsing Hub */}
            <Marker coordinates={INDIA_COORD}>
              <g 
                className={`india-center-node ${isHubHovered ? 'hub-hovered' : ''}`}
                onMouseEnter={() => setIsHubHovered(true)}
                onMouseLeave={() => setIsHubHovered(false)}
                style={{ cursor: 'pointer' }}
              >
                <circle r={16} fill="rgba(244, 81, 30, 0.08)" className="hub-glow-1" />
                <circle r={10} fill="rgba(244, 81, 30, 0.15)" className="hub-glow-2" />
                <circle r={6} fill="#F4511E" className="hub-core" />
                <circle r={2.5} fill="#ffffff" opacity={0.7} className="hub-core-inner" />
                
                {/* Tooltip */}
                <g style={{ opacity: isHubHovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>
                  <rect x="-70" y="-38" width="140" height="22" rx="11" fill="#1a202c" stroke="#F4511E" strokeWidth="1" />
                  <text x="0" y="-23" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" letterSpacing="0.1em">
                    SRI SADGURU TRADERS
                  </text>
                  <path d="M-4 -16 L4 -16 L0 -11 Z" fill="#1a202c" stroke="#F4511E" strokeWidth="1" />
                  <path d="M-3 -17 L3 -17" stroke="#1a202c" strokeWidth="2" />
                </g>
              </g>
            </Marker>
          </ComposableMap>
        </div>
      </div>

      {/* ===== Floating Service Card Layer ===== */}
      <AnimatePresence mode="wait">
        {activeService && activeServiceData && (
          <motion.div
            key={activeService}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}
          >
            <FloatingServiceCard
              serviceData={activeServiceData}
              iconId={activeService}
              containerRef={containerRef as React.RefObject<HTMLElement>}
              onClose={() => setActiveService(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Side Accents */}
      <div className="hero-right-accent hero-accent-top" style={{ right: '30px' }}>
        <div className="accent-line"></div>
        <span><span style={{ color: '#F4511E' }}>SAFER</span><br />SMARTER<br />STRONGER<br />TOGETHER</span>
      </div>

      {/* Legibility Gradient overlay */}
      <div className="hero-gradient-overlay" />

      {/* Hero Content Overlay */}
      <div className="hero-content-container" ref={contentRef}>
        <div className="hero-content-col" style={{ maxWidth: '750px', position: 'relative', zIndex: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', paddingTop: '3%', marginLeft: '-4%' }}>

          <motion.p
            className="hero-tagline hero-animate"
          >
            <span className="hero-tagline-dot" style={{ backgroundColor: '#F4511E' }} />
            INTEGRATED TECHNOLOGY • INFRASTRUCTURE • SECURITY
          </motion.p>

          <motion.h1
            className="hero-title"
            style={{ fontSize: '4.5rem', lineHeight: '1.1', marginTop: '1rem', marginBottom: '1.5rem', fontWeight: 800 }}
          >
            <span className="hero-title-line" style={{ display: 'block', color: '#1a202c' }}>ONE PARTNER.</span>
            <span className="hero-title-line" style={{ display: 'block', color: '#1a202c' }}>COMPLETE</span>
            <span className="hero-title-line hero-title-highlight" style={{ display: 'block', color: '#F4511E' }}>INFRASTRUCTURE.</span>
          </motion.h1>

          <div className="hero-description-container hero-animate" style={{ marginBottom: '2rem', maxWidth: '600px' }}>
            <p className="hero-description" style={{ color: '#4a5568', fontSize: '1.1rem', lineHeight: '1.6' }}>
              End-to-end technology, security and infrastructure solutions — from surveillance and networking to electrical systems, logistics and turnkey implementation.
            </p>
          </div>

          <motion.div
            className="hero-cta-group hero-animate"
            style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}
          >
            <Link to="/services" className="hero-cta-primary" style={{ backgroundColor: '#F4511E', color: 'white', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              EXPLORE SERVICES
              <span className="hero-cta-arrow" style={{ marginLeft: '4px' }}>
                <span className="hero-cta-arrow-head" />
              </span>
            </Link>

            <Link to="/contact" className="hero-cta-secondary" style={{ backgroundColor: 'transparent', color: '#1a202c', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #e2e8f0', textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              CONTACT US
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Service Ticker */}
      <div className="hero-bottom-ticker" ref={tickerRef}>
        <div className="ticker-track">
          {[...services, ...services].map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className={`ticker-item ${activeService === service.id ? 'active' : ''}`}
              onClick={() => setActiveService(service.id)}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ticker-icon">
                <path d={service.icon}></path>
              </svg>
              <span style={{ maxWidth: '120px', whiteSpace: 'normal', lineHeight: '1.2' }}>{service.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
