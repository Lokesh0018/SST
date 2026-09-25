import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import { services as allServices } from '../../data/services';
import { useServiceContext } from '../../context/ServiceContext';
import '../../styles/HomeServices.css';

import React from 'react';
import { 
  Camera, Lock, Network, Zap, Flame, Truck, Wifi, Wrench, Briefcase, 
  Shield, Server, ShieldCheck, Monitor, Cpu, Smartphone, Activity,
  LockOpen, Cloud, Layers, Globe, GitMerge, Share2, Database, Layout,
  Home, Grid, Code, Building
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const serviceIcons: Record<string, React.JSX.Element> = {
  camera: <Camera size={32} strokeWidth={1} />,
  lock: <Lock size={32} strokeWidth={1} />,
  network: <Network size={32} strokeWidth={1} />,
  zap: <Zap size={32} strokeWidth={1} />,
  flame: <Flame size={32} strokeWidth={1} />,
  truck: <Truck size={32} strokeWidth={1} />,
  wifi: <Wifi size={32} strokeWidth={1} />,
  tool: <Wrench size={32} strokeWidth={1} />,
  wrench: <Wrench size={32} strokeWidth={1} />,
  briefcase: <Briefcase size={32} strokeWidth={1} />,
  shield: <Shield size={32} strokeWidth={1} />,
  server: <Server size={32} strokeWidth={1} />,
  'shield-check': <ShieldCheck size={32} strokeWidth={1} />,
  monitor: <Monitor size={32} strokeWidth={1} />,
  cpu: <Cpu size={32} strokeWidth={1} />,
  smartphone: <Smartphone size={32} strokeWidth={1} />,
  activity: <Activity size={32} strokeWidth={1} />,
  'lock-open': <LockOpen size={32} strokeWidth={1} />,
  cloud: <Cloud size={32} strokeWidth={1} />,
  layers: <Layers size={32} strokeWidth={1} />,
  globe: <Globe size={32} strokeWidth={1} />,
  'git-merge': <GitMerge size={32} strokeWidth={1} />,
  'share-2': <Share2 size={32} strokeWidth={1} />,
  database: <Database size={32} strokeWidth={1} />,
  layout: <Layout size={32} strokeWidth={1} />,
  home: <Home size={32} strokeWidth={1} />,
  grid: <Grid size={32} strokeWidth={1} />,
  code: <Code size={32} strokeWidth={1} />,
  building: <Building size={32} strokeWidth={1} />,
};

const slugToId: Record<string, string> = {
  'turnkey-projects': 'TURNKEY',
  'video-surveillance': 'CCTV',
  'access-control': 'ACCESS',
  'servers-storage': 'INFRASTRUCTURE', // Mapped to INFRASTRUCTURE since switches-storage was here before
  'switches-routing': 'INFRASTRUCTURE', // Added switches-routing as well to map to the same id
  'logistics-gps-solutions': 'LOGISTICS',
  'fire-fighting': 'SAFETY',
  'electrical-electronics': 'ELECTRICAL',
  'intrusion-detection': 'INTRUSION',
  'hardware-tools': 'HARDWARE',
  'wireless-technology': 'WIRELESS',
  'network-infrastructure': 'NETWORK',
};

// Filter services to only include the 11 main services for the home page
const services = allServices.filter(s => slugToId[s.slug]);

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
    {/* Ambient Glows */}
    <div className="ambient-orb orb-orange" style={{ opacity: 0.3 }}></div>
    <div className="ambient-orb orb-blue" style={{ opacity: 0.3 }}></div>
    
    <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      {/* Minimalistic Network Connections */}
      <g className="network-layer-mid" stroke="rgba(185, 70, 37, 0.05)" strokeWidth="1" fill="none">
        
        {/* Simple connecting lines */}
        <path d="M400,200 L600,200" />
        <path d="M300,100 L400,200" />
        <path d="M700,100 L600,200" />
        <path d="M600,200 L700,400" />
        <path d="M400,200 L300,400" />
        
        {/* Few visible nodes */}
        <g fill="rgba(185, 70, 37, 0.15)">
          <circle cx="400" cy="200" r="4" />
          <circle cx="600" cy="200" r="4" />
        </g>
      </g>
    </svg>
  </div>
);

const HomeServices = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const { setActiveService, isUserInteracting, setIsUserInteracting } = useServiceContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : services.length - 1));
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => (prev < services.length - 1 ? prev + 1 : 0));
  };

  // Auto-play carousel
  useEffect(() => {
    if (isUserInteracting) return;
    const interval = setInterval(() => {
      scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [isUserInteracting, currentIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

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

      // --- Continuous Carousel Fade In ---
      gsap.fromTo(containerRef.current, 
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-services-section">
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

        <div className="home-services-carousel-wrapper">
          
          {/* Ecosystem Connection Line */}
          <div className="ecosystem-track" style={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            right: '5%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(15,23,42,0.15) 20%, rgba(15,23,42,0.15) 80%, transparent)',
            transform: 'translateY(-50%)',
            zIndex: 0
          }}>
            <div style={{ position: 'absolute', left: '20%', top: '50%', transform: 'translate(-50%, -50%)', width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(15,23,42,0.3)' }} />
            <div style={{ position: 'absolute', left: '80%', top: '50%', transform: 'translate(-50%, -50%)', width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(15,23,42,0.3)' }} />
          </div>

          <button 
            onClick={scrollPrev} 
            className="carousel-control-btn btn-prev" 
            aria-label="Previous service"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="home-services-coverflow">
            {services.map((service, index) => {
              const rawOffset = index - currentIndex;
              const length = services.length;
              let offset = rawOffset;
              
              // Infinite wrapping logic
              if (rawOffset > Math.floor(length / 2)) {
                offset = rawOffset - length;
              } else if (rawOffset < -Math.floor(length / 2)) {
                offset = rawOffset + length;
              }

              const isVisible = Math.abs(offset) <= 3;
              
              if (!isVisible && services.length > 5) return null;

              // Calculate responsive x-offset based on screen width (rough estimate)
              // We'll use a base pixel value that works well for standard card widths
              const xOffset = offset * (window.innerWidth < 768 ? 90 : 180);
              const zIndex = 10 - Math.abs(offset);
              const scale = offset === 0 ? 1 : 1 - Math.abs(offset) * 0.15;
              const opacity = Math.abs(offset) >= 3 ? 0 : 1 - Math.abs(offset) * 0.15;

              return (
                <motion.div
                  key={service.slug}
                  initial={false}
                  animate={{
                    x: xOffset,
                    scale: scale,
                    zIndex: zIndex,
                    opacity: opacity,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like ease
                  className="coverflow-card-container"
                  style={{ position: 'absolute' }}
                >
                  <Link
                    to={`/services#${service.slug}`}
                    onClick={(e) => {
                      if (offset !== 0) {
                        e.preventDefault();
                        setCurrentIndex(index);
                      }
                    }}
                    className={`service-card home-services-card motif-${service.slug} ${offset === 0 ? 'is-active' : ''}`}
                    onMouseEnter={() => { handleMouseEnter(service.slug); }}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    style={{ 
                      pointerEvents: opacity === 0 ? 'none' : 'auto',
                      backgroundImage: `linear-gradient(to bottom, rgba(8, 15, 31, 0.0) 0%, rgba(8, 15, 31, 0.6) 100%), url(${service.heroImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="card-content-wrapper" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '1.5rem' }}>
                      <div className="card-top-row" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <span className="home-services-card-icon">
                          {serviceIcons[service.icon]}
                        </span>
                      </div>

                      <div className="card-bottom-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                        <h3 className="home-services-card-title" style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                          {formatTitle(service.shortTitle)}
                        </h3>
                        <div className="card-explore" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F4511E' }}>
                          <span className="home-services-card-action-text" style={{ fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em' }}>EXPLORE</span>
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
              </motion.div>
              );
            })}
          </div>

          <button 
            onClick={scrollNext} 
            className="carousel-control-btn btn-next" 
            aria-label="Next service"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="home-services-pagination">
            <span className="pagination-text">
              {String(currentIndex + 1).padStart(2, '0')} / {services.length}
            </span>
            <div className="pagination-dots">
              {services.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentIndex(i)} 
                  className={`pagination-dot ${i === currentIndex ? 'active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
