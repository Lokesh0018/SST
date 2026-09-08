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
  <div className="home-services-bg">
    {/* CSS handles the grid and radial glow. SVG handles arcs and nodes. */}
    <svg className="services-bg-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* Orbital Arcs */}
      <g className="orbital-arcs">
        <circle cx="80%" cy="20%" r="40%" fill="none" stroke="rgba(20, 20, 20, 0.03)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="80%" cy="20%" r="60%" fill="none" stroke="rgba(20, 20, 20, 0.025)" strokeWidth="1" />
        <circle cx="20%" cy="90%" r="50%" fill="none" stroke="rgba(20, 20, 20, 0.035)" strokeWidth="1" />
      </g>
      
      {/* Network Connectors */}
      <g className="network-lines">
        <path d="M 25% 30% L 35% 45% L 60% 35% L 75% 65%" fill="none" stroke="rgba(20, 20, 20, 0.03)" strokeWidth="1" />
        <path d="M 10% 70% L 20% 85% L 45% 75%" fill="none" stroke="rgba(20, 20, 20, 0.03)" strokeWidth="1" />
      </g>
      
      {/* Network Nodes (Orange) */}
      <g className="network-nodes">
        <circle cx="25%" cy="30%" r="2" fill="rgba(241, 90, 36, 0.6)" className="node-pulse" />
        <circle cx="35%" cy="45%" r="1.5" fill="rgba(241, 90, 36, 0.8)" />
        <circle cx="60%" cy="35%" r="2" fill="rgba(241, 90, 36, 0.5)" className="node-pulse" style={{ animationDelay: '1s' }}/>
        <circle cx="75%" cy="65%" r="1.5" fill="rgba(241, 90, 36, 0.7)" />
        <circle cx="85%" cy="40%" r="2" fill="rgba(241, 90, 36, 0.4)" />
        
        <circle cx="10%" cy="70%" r="2" fill="rgba(241, 90, 36, 0.5)" />
        <circle cx="20%" cy="85%" r="1.5" fill="rgba(241, 90, 36, 0.6)" className="node-pulse" style={{ animationDelay: '2s' }} />
        <circle cx="45%" cy="75%" r="2" fill="rgba(241, 90, 36, 0.8)" />
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
    const ctx = gsap.context(() => {
      // Fade in section
      gsap.fromTo(containerRef.current, 
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Stagger cards
      gsap.fromTo('.home-services-card', 
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.home-services-grid',
            start: 'top 80%',
          },
        }
      );
      
      // Animate background elements
      gsap.to('.orbital-arcs', {
        rotation: 360,
        transformOrigin: '80% 20%',
        duration: 200,
        ease: 'none',
        repeat: -1,
      });
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
                {/* 1. Number and Top-Right Arrow */}
                <div className="card-top-row">
                  <span className="card-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="card-top-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </span>
                </div>

                {/* 2. Large Icon */}
                <div className="home-services-card-icon">
                  {serviceIcons[service.icon]}
                </div>

                {/* 3. Title */}
                <h3 className="home-services-card-title">
                  {formatTitle(service.shortTitle)}
                </h3>

                {/* 4. Description */}
                <p className="home-services-card-desc">
                  {service.description}
                </p>

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
