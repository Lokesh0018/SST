import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import NetworkBackground from '../components/common/NetworkBackground';
import { services } from '../data/services';
import '../styles/Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicePositions = services.map((_, i) => {
  const angle = (i * 360) / services.length - 90;
  const radius = 42;
  const radian = (angle * Math.PI) / 180;
  return {
    x: Number((50 + radius * Math.cos(radian)).toFixed(1)),
    y: Number((50 + radius * Math.sin(radian)).toFixed(1)),
  };
});

const getServiceIcon = (slug: string) => {
  switch (slug) {
    case 'turnkey-projects':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 22h20M12 2v20M4 22V10l8-8 8 8v12M8 18h8" />
        </svg>
      );
    case 'intrusion-detection':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v4l3 3" />
        </svg>
      );
    case 'access-control':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 00-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0012 2z" />
          <path d="M12 6a6 6 0 00-6 6 M12 10a2 2 0 100 4 2 2 0 000-4z" />
          <path d="M8 12a4 4 0 018 0" />
        </svg>
      );
    case 'switches-storage':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case 'logistics':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case 'electrical-electronics':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 'fire-fighting':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 21h10M9 21V7a3 3 0 016 0v14M12 7v7M9 10h6" />
          <path d="M12 2v2" />
          <path d="M15 4l-3-2-3 2" />
        </svg>
      );
    case 'video-surveillance':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case 'wireless-network':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      );
    case 'hardware-tools':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'network-infrastructure':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="16" y="16" width="6" height="6" rx="1" />
          <rect x="2" y="16" width="6" height="6" rx="1" />
          <rect x="9" y="2" width="6" height="6" rx="1" />
          <path d="M5 16v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
          <path d="M12 8v3" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverSST, setHoverSST] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Fast entrance animation
    gsap.fromTo(
      '.service-node',
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.5)',
        delay: 0.2,
      }
    );

    gsap.fromTo(
      '.services-hub-center-container',
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
      }
    );


    // Content sections reveal
    const sections = gsap.utils.toArray('.service-detail-section');
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <div className="services-layout">
            {/* Left - Heading */}
            <div className="services-left">
              <div className="services-indicator">11 CORE SERVICES</div>
              
              <h1 className="services-hero-headline">
                COMPLETE SERVICES.<br/>
                <span className="text-highlight-orange">ONE INTEGRATED</span><br/>
                SYSTEM.
              </h1>
              
              <p className="services-text">
                From security and access control to electrical systems, logistics and turnkey execution — SST connects every layer into one reliable infrastructure solution.
              </p>
              
              <div className="services-footer">
                <div className="services-nav-indicator">
                  <span className="services-nav-indicator-text">Scroll to explore</span>
                  <svg className="services-nav-indicator-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-7-7m7 7l7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right - Hub Diagram */}
            <div ref={sectionRef} className="services-right">
              {/* Desktop: circular hub layout */}
              <div className="services-hub">
                {/* Center SST node */}
                <div 
                  className={`services-hub-center-container ${hoveredIndex !== null ? 'hub-glow' : ''}`}
                  onMouseEnter={() => setHoverSST(true)}
                  onMouseLeave={() => setHoverSST(false)}
                >
                  <div className={`services-hub-center ${hoverSST ? 'hub-center-hovered' : ''}`}>
                    <div className={`hub-center-content hub-default-content ${hoverSST ? 'fade-out' : 'fade-in'}`}>
                      <span className="services-hub-center-title">SST</span>
                      <span className="services-hub-center-subtitle">CORE SYSTEM</span>
                      <div className="sst-center-pulse"></div>
                    </div>
                    <div className={`hub-center-content hub-hover-content ${hoverSST ? 'fade-in' : 'fade-out'}`}>
                      <span className="services-hub-center-title" style={{ fontSize: '2.5rem' }}>11</span>
                      <hr className="sst-divider" />
                      <span className="services-hub-center-subtitle">MAJOR SERVICES</span>
                    </div>
                  </div>
                </div>

                {/* SVG connection lines */}
                <svg className="services-hub-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  {servicePositions.map((pos, i) => (
                    <g key={i}>
                      <line
                        x1="50"
                        y1="50"
                        x2={pos.x}
                        y2={pos.y}
                        stroke={hoveredIndex === i ? '#F4511E' : '#D5D0C7'}
                        strokeWidth={hoveredIndex === i ? '0.6' : '0.2'}
                        className="connection-line"
                      />
                      {/* Data pulse animation */}
                      {hoveredIndex === i && (
                        <circle
                          r="1.2"
                          fill="#F4511E"
                          className="connection-pulse"
                        >
                          <animateMotion
                            dur="0.6s"
                            repeatCount="indefinite"
                            path={`M50,50 L${pos.x},${pos.y}`}
                          />
                        </circle>
                      )}
                    </g>
                  ))}
                </svg>

                {/* Service nodes */}
                {services.map((service, i) => (
                  <div
                    key={service.slug}
                    className="service-node"
                    style={{
                      left: `${servicePositions[i].x}%`,
                      top: `${servicePositions[i].y}%`,
                      zIndex: hoveredIndex === i ? 50 : 10,
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link 
                      to={`/services/${service.slug}`}
                      className={`services-hub-node-card ${
                      hoveredIndex === i
                        ? 'services-hub-node-card-active'
                        : hoveredIndex !== null
                        ? 'services-hub-node-card-faded'
                        : 'services-hub-node-card-inactive'
                    }`}>
                      {/* Default state */}
                      <div className="node-default-content">
                        <div className="node-icon-wrapper">
                          {getServiceIcon(service.slug)}
                        </div>
                        <div className="node-number">{i + 1 < 10 ? `0${i + 1}` : i + 1}</div>
                        <div className="services-hub-node-text">
                          {service.shortTitle}
                        </div>
                      </div>

                      {/* Hover state content */}
                      <div className="node-hover-content">
                        <div className="node-hover-header">
                          <span className="node-hover-number">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                          <h4 className="node-hover-title">{service.shortTitle}</h4>
                        </div>
                        <ul className="node-hover-list">
                          {service.features.slice(0, 3).map((feat, idx) => (
                            <li key={idx} className="node-hover-list-item">
                              <span className="node-hover-bullet">•</span>
                              {feat.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Alternating Service Sections */}
      <div className="services-list-container" ref={listRef}>
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <section key={service.slug} className={`service-detail-section ${isEven ? 'bg-cream' : 'bg-white'}`}>
              <NetworkBackground />
              <div className="container">
                <div className={`service-detail-layout ${isEven ? '' : 'reverse-layout'}`}>
                  
                  {/* Content Area */}
                  <div className="service-detail-content">
                    <div className="service-detail-giant-number parallax-number">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </div>
                    
                    <h2 className="service-detail-title">{service.title}</h2>
                    <div className="service-detail-accent"></div>
                    <p className="service-detail-desc">{service.heroDescription}</p>
                    
                    <div className="service-detail-capabilities">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="capability-item staggered-fade">
                          <h4 className="capability-title">{feature.title}</h4>
                          <p className="capability-desc">{feature.description}</p>
                        </div>
                      ))}
                    </div>

                    <Link to={`/services/${service.slug}`} className="service-detail-link group">
                      <span className="service-detail-link-text">Explore Details</span>
                      <span className="service-detail-link-arrow">→</span>
                    </Link>
                    
                    {/* Metrics Row */}
                    <div className="service-metrics-row">
                      {service.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="metric-item">
                          <span className="metric-dot"></span>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Area */}
                  <div className="service-detail-visual">
                    <div className="premium-visual-box">
                      <div className="premium-floating-label">
                        {service.category.toUpperCase()}
                      </div>
                      <img 
                        src={service.heroImage} 
                        alt={service.title} 
                        className="service-visual-bg-image parallax-image" 
                      />
                      <div className="premium-visual-overlay"></div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>
    </PageTransition>
  );
}
