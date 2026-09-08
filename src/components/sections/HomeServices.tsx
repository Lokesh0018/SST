import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import { services } from '../../data/services';
import { useServiceContext } from '../../context/ServiceContext';
import '../../styles/HomeServices.css';

import React from 'react';

gsap.registerPlugin(ScrollTrigger);

const serviceIcons: Record<string, React.JSX.Element> = {
  camera: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  lock: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  network: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="17" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="17" width="6" height="6" rx="1" />
      <path d="M6 4h11M4 7v10l8 3M20 7v10l-8 3" />
    </svg>
  ),
  zap: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  flame: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c-4.97 0-9-2.69-9-6 0-4 5-11 9-14 4 3 9 10 9 14 0 3.31-4.03 6-9 6z" />
      <path d="M12 22c-1.66 0-3-1.34-3-3 0-2 2-5 3-6 1 1 3 4 3 6 0 1.66-1.34 3-3 3z" />
    </svg>
  ),
  truck: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  wifi: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
  tool: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  briefcase: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  shield: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  server: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
};

const slugToId: Record<string, string> = {
  'turnkey-projects': 'TURNKEY',
  'video-surveillance': 'CCTV',
  'access-control': 'ACCESS',
  'switches-storage': 'INFRASTRUCTURE',
  'logistics': 'LOGISTICS',
  'fire-fighting': 'SAFETY',
  'electrical-electronics': 'ELECTRICAL',
  'intrusion-detection': 'INTRUSION',
  'hardware-tools': 'HARDWARE',
  'wireless-network': 'WIRELESS',
  'network-infrastructure': 'NETWORK',
};

// Helper to split titles into 2 lines where appropriate
const formatTitle = (title: string) => {
  const parts = title.split(' ');
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}<br />{parts[1]}
      </>
    );
  }
  if (parts.length > 2) {
    // Attempt intelligent split (first word on line 1, rest on line 2, etc.)
    return (
      <>
        {parts[0]}<br />{parts.slice(1).join(' ')}
      </>
    );
  }
  return title;
};

const ServicesBackground = () => (
  <div className="home-services-bg" aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      
      {/* BACKGROUND LAYER (Slowest, Faintest, Smallest) */}
      <g className="network-layer-bg" stroke="rgba(244, 81, 30, 0.05)" strokeWidth="0.5" fill="none">
        <path d="M-50,50 L250,150 L450,50 L650,200 L900,100 L1050,250" />
        <path d="M250,150 L450,250 L650,200" />
        <g fill="rgba(244, 81, 30, 0.1)">
          <circle cx="250" cy="150" r="2" />
          <circle cx="450" cy="50" r="2" />
          <circle cx="650" cy="200" r="2" />
          <circle cx="900" cy="100" r="2" />
          <circle cx="450" cy="250" r="2" />
        </g>
      </g>

      {/* MIDGROUND LAYER (Medium speed, Medium opacity) */}
      <g className="network-layer-mid" stroke="rgba(244, 81, 30, 0.1)" strokeWidth="1" fill="none">
        <path d="M-50,250 L150,350 L350,200 L550,400 L800,250 L1050,350" />
        <path d="M150,350 L350,400 L550,400" />
        <g fill="rgba(244, 81, 30, 0.2)">
          <circle cx="150" cy="350" r="3" />
          <circle cx="350" cy="200" r="3" />
          <circle cx="550" cy="400" r="3" />
          <circle cx="800" cy="250" r="3" />
          <circle cx="350" cy="400" r="3" />
        </g>
        <g fill="var(--color-orange)">
          <circle r="2">
            <animateMotion dur="15s" repeatCount="indefinite" path="M-50,250 L150,350 L350,200 L550,400 L800,250 L1050,350" />
          </circle>
        </g>
      </g>

      {/* FOREGROUND LAYER (Fastest, Brightest, Largest) */}
      <g className="network-layer-fg" stroke="rgba(244, 81, 30, 0.2)" strokeWidth="1.5" fill="none">
        <path d="M-50,450 L200,350 L400,500 L650,350 L900,450 L1050,300" />
        <path d="M200,350 L400,300 L650,350" />
        <path d="M400,300 L600,200" />
        <g fill="rgba(244, 81, 30, 0.35)">
          <circle cx="200" cy="350" r="4" />
          <circle cx="400" cy="500" r="5" />
          <circle cx="650" cy="350" r="4" />
          <circle cx="900" cy="450" r="5" />
          <circle cx="400" cy="300" r="4" />
          <circle cx="600" cy="200" r="3" />
        </g>
        <g fill="var(--color-orange)">
          <circle r="4">
            <animateMotion dur="10s" repeatCount="indefinite" path="M1050,300 L900,450 L650,350 L400,500 L200,350 L-50,450" />
          </circle>
          <circle r="3">
            <animateMotion dur="12s" repeatCount="indefinite" path="M-50,450 L200,350 L400,300 L600,200" />
          </circle>
        </g>
      </g>
      
    </svg>
  </div>
);

const HomeServices = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { setActiveService, isUserInteracting, setIsUserInteracting } = useServiceContext();

  const handleMouseEnter = (slug: string) => {
    setIsUserInteracting(true);
    // Find the matching ID mapping
    const slugToId: Record<string, string> = {
      'turnkey-projects': 'TURNKEY',
      'intrusion-detection': 'INTRUSION',
      'access-control': 'ACCESS',
      'switches-storage': 'INFRASTRUCTURE',
      'logistics': 'LOGISTICS',
      'electrical-electronics': 'ELECTRICAL',
      'fire-fighting': 'SAFETY',
      'video-surveillance': 'CCTV',
      'wireless-network': 'WIRELESS',
      'hardware-tools': 'HARDWARE',
      'network-infrastructure': 'NETWORK'
    };
    const id = slugToId[slug];
    if (id) {
      setActiveService(id);
    }
  };

  const handleMouseLeave = () => {
    setIsUserInteracting(false);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {

      if (prefersReducedMotion) {
        // Fallback simple fade
        gsap.fromTo(containerRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
        gsap.fromTo('.home-services-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.home-services-grid', start: 'top 80%' } });
        return;
      }

      // --- Background Parallax Layering ---
      gsap.to('.network-layer-bg', {
        y: -15,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true }
      });
      gsap.to('.network-layer-mid', {
        y: -45,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true }
      });
      gsap.to('.network-layer-fg', {
        y: -100,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true }
      });

      // --- 3D Card Sequence Animation ---
      const cards = gsap.utils.toArray('.home-services-card') as HTMLElement[];
      if (cards.length === 0) return;

      // Create one master scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.home-services-grid',
          start: "top 75%",
          end: "bottom 70%", // Spread the animation across the height of the grid
          scrub: 1.5, // Smooth scrubbing
        }
      });

      // Using stagger ensures they animate strictly one-by-one, regardless of their row layout
      tl.fromTo(cards, 
        {
          y: 150,
          opacity: 0,
          rotationX: 15,
          z: -60,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          z: 0,
          duration: 1,
          stagger: 0.5,
          ease: "power2.out"
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding home-services-section">
      <ServicesBackground />
      <div className="container" ref={containerRef}>
        <div className="home-services-header">
          <div className="home-services-title-wrapper">
            <span className="home-services-section-label">02 / SERVICES</span>
            <SectionHeading
              highlight="ONE VISION."
              subtitle="Integrated systems. Smarter infrastructure. Greater possibilities."
            >
              COMPLETE SERVICES UNDER ONE VISION.
            </SectionHeading>
          </div>

          <Link
            to="/services"
            className="home-services-link"
          >
            Explore All Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="home-services-grid">
          {services.map((service, index) => {
            const isFeatured = service.slug === 'turnkey-projects';

            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`service-card home-services-card motif-${service.slug} ${isFeatured ? 'featured' : ''}`}
                onMouseEnter={() => handleMouseEnter(service.slug)}
                onMouseLeave={handleMouseLeave}
              >
                {/* 0. Large Background Watermark */}
                <div className="card-watermark">
                  {serviceIcons[service.icon]}
                </div>

                {/* 1. Number and Top-Right Icon */}
                <div className="card-top-row">
                  <span className="card-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="home-services-card-icon">
                    {serviceIcons[service.icon]}
                  </span>
                </div>

                {/* 3. Title */}
                <h3 className="home-services-card-title">
                  {formatTitle(service.shortTitle)}
                </h3>

                {/* 4. Description */}
                <p className="home-services-card-desc">
                  {service.description}
                </p>

                {/* 4.5 Key Features (Fills empty vertical space) */}
                <ul className="home-services-card-features">
                  {service.features.map((feature, i) => (
                    <li key={i}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feature.title}
                    </li>
                  ))}
                </ul>

                {/* 5. Bottom System Line & CTA */}
                <div className="card-bottom-section">
                  <div className="card-divider" />

                  <div className="home-services-card-action">
                    <span className="card-category">{service.category}</span>
                    <div className="card-explore">
                      <span className="home-services-card-action-text">EXPLORE</span>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className="home-services-card-action-icon"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
