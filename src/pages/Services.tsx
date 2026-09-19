import React, { useState, useMemo, useRef, useEffect, useDeferredValue } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageTransition from '../components/common/PageTransition';
import ServicesHeroIndustrial from '../components/services/ServicesHeroIndustrial';
import { services, categories } from '../data/services';
import type { Service } from '../data/services';
import '../styles/Services.css';

const hexagonConfig = [
  // Top Row
  { top: '2%', left: '5%', size: 120, delay: 0.2, y: -15, rotate: 10, duration: 6 },
  { top: '8%', left: '35%', size: 90, delay: 1.5, y: -10, rotate: -5, duration: 5.5 },
  { top: '5%', right: '25%', size: 140, delay: 0.8, y: -20, rotate: 8, duration: 7 },
  { top: '3%', right: '3%', size: 110, delay: 2.1, y: -12, rotate: -12, duration: 6.2 },
  
  // Upper-Middle
  { top: '22%', left: '15%', size: 160, delay: 1.1, y: -18, rotate: -8, duration: 7.5 },
  { top: '28%', left: '60%', size: 100, delay: 0.5, y: -12, rotate: 15, duration: 5.8 },
  { top: '20%', right: '10%', size: 130, delay: 2.5, y: -15, rotate: 6, duration: 6.8 },
  
  // Middle
  { top: '45%', left: '8%', size: 100, delay: 1.8, y: -10, rotate: 12, duration: 5.2 },
  { top: '40%', left: '45%', size: 80, delay: 0.3, y: -8, rotate: -10, duration: 4.8 },
  { top: '50%', right: '35%', size: 150, delay: 1.4, y: -22, rotate: 5, duration: 8 },
  { top: '42%', right: '8%', size: 120, delay: 2.8, y: -14, rotate: -15, duration: 6.5 },
  
  // Lower-Middle
  { top: '65%', left: '25%', size: 140, delay: 0.9, y: -16, rotate: 9, duration: 7.2 },
  { top: '60%', left: '65%', size: 110, delay: 1.7, y: -12, rotate: -7, duration: 6 },
  { top: '70%', right: '15%', size: 90, delay: 2.2, y: -10, rotate: 14, duration: 5.5 },
  
  // Bottom
  { bottom: '5%', left: '5%', size: 130, delay: 0.6, y: -15, rotate: -11, duration: 6.8 },
  { bottom: '10%', left: '45%', size: 170, delay: 1.3, y: -25, rotate: 8, duration: 8.5 },
  { bottom: '8%', right: '30%', size: 100, delay: 2.6, y: -12, rotate: -9, duration: 5.9 },
  { bottom: '3%', right: '3%', size: 140, delay: 0.4, y: -18, rotate: 12, duration: 7.1 },
];

const renderHexagons = (colorPrefix: 'sst' | 'shm') => {
  const isSST = colorPrefix === 'sst';
  const baseColor = isSST ? '244, 81, 30' : '59, 130, 246';
  
  return hexagonConfig.map((config, index) => (
    <motion.div
      key={`hex-${colorPrefix}-${index}`}
      style={{ 
        position: 'absolute', 
        ...(config.top ? { top: config.top } : {}),
        ...(config.bottom ? { bottom: config.bottom } : {}),
        ...(config.left ? { left: config.left } : {}),
        ...(config.right ? { right: config.right } : {}),
        width: `${config.size}px`, 
        height: `${config.size}px`, 
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', 
        background: `linear-gradient(135deg, rgba(${baseColor}, 0.35) 0%, rgba(${baseColor}, 0.05) 100%)`, 
        zIndex: 0, 
        pointerEvents: 'none' 
      }}
      animate={{ y: [0, config.y, 0], rotate: [0, config.rotate, 0] }}
      transition={{ duration: config.duration, repeat: Infinity, ease: 'easeInOut', delay: config.delay }}
    />
  ));
};

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  { num: '01', title: 'DISCOVER', sub: 'Requirements', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>, details: ['Stakeholder Interviews', 'System Audits', 'Feasibility Study'] },
  { num: '02', title: 'DESIGN', sub: 'Architecture', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>, details: ['Blueprint Creation', 'Scalability Modeling', 'Tech Stack Selection'] },
  { num: '03', title: 'INTEGRATE', sub: 'Systems', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M6.5 6.5l4 4"/><path d="M17.5 6.5l-4 4"/><path d="M6.5 17.5l4-4"/><path d="M17.5 17.5l-4-4"/></svg>, details: ['API Connections', 'Data Migration', 'Third-party Sync'] },
  { num: '04', title: 'IMPLEMENT', sub: 'Deployment', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>, details: ['Staged Rollouts', 'CI/CD Pipelines', 'Zero-downtime Deploy'] },
  { num: '05', title: 'OPTIMIZE', sub: 'Performance', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, details: ['Load Balancing', 'Caching Strategies', 'Code Profiling'] },
  { num: '06', title: 'SUPPORT', sub: 'Ongoing Care', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, details: ['24/7 Monitoring', 'Security Patches', 'SLA Guarantee'] },
];

const ProcessSection = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // 1. Initial Reveal (independent triggers, safe because they trigger before the pin)
    gsap.fromTo('.process-eyebrow, .process-title, .process-subtitle', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );
    
    gsap.fromTo('.process-step-item', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } }
    );

    // 2. ONE MASTER SCROLL-SCRUBBING PIPELINE
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2500', // Slower, more deliberate scroll range
        scrub: true,
        pin: true,
      }
    });

    // 3. The line draws from 0 to 1000 (viewBox width) using a clip-path rectangle
    scrubTl.fromTo('.timeline-clip-rect', 
      { attr: { width: 0 } }, 
      { attr: { width: 1000 }, ease: 'none', duration: 1 },
      0
    );

    // Node activations based on master scrub progress
    const items = gsap.utils.toArray('.process-step-item');
    const timePerNode = 1 / (items.length - 1); // 0, 0.2, 0.4, 0.6, 0.8, 1.0

    items.forEach((item: any, i) => {
      const hitTime = i * timePerNode;
      const node = item.querySelector('.process-step-node');
      const icon = item.querySelector('.process-step-icon');
      const bgNum = item.querySelector('.process-bg-num');
      const glow = item.querySelector('.process-step-glow');
      
      scrubTl.to(node, {
        scale: 1.1,
        duration: 0.05
      }, hitTime);

      scrubTl.to(glow, {
        opacity: 1,
        duration: 0.05
      }, hitTime);
      
      scrubTl.to(icon, {
        opacity: 1,
        color: '#F4511E',
        duration: 0.05
      }, hitTime);

      scrubTl.to(bgNum, {
        color: 'rgba(244, 81, 30, 0.1)',
        duration: 0.05
      }, hitTime);
    });

  }, { scope: sectionRef, dependencies: [] });

  return (
    <section className="services-process-section" ref={sectionRef}>
      <div className="process-bg-overlay" />
      <div className="process-grid-overlay" />
      <div className="process-radial-glow" />
      
      {/* Parallax Elements */}
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="process-header">
          <p className="process-eyebrow">OUR DELIVERY FRAMEWORK</p>
          <h2 className="process-title">FROM REQUIREMENT TO REAL-WORLD IMPACT</h2>
          <p className="process-subtitle">
            One integrated process for complex infrastructure and technology systems.
          </p>
        </div>

        <div className="process-timeline-container">
          <svg className="curved-timeline-svg" viewBox="0 0 1000 200" preserveAspectRatio="none">
             <defs>
               <clipPath id="timeline-clip">
                 <rect className="timeline-clip-rect" x="0" y="0" width="0" height="200" />
               </clipPath>
             </defs>
             <path 
               className="curved-timeline-bg"
               d="M 0,20 C 100,20 100,180 200,180 C 300,180 300,20 400,20 C 500,20 500,180 600,180 C 700,180 700,20 800,20 C 900,20 900,180 1000,180"
               fill="none"
               stroke="rgba(255,255,255,0.1)"
               strokeWidth="3"
               vectorEffect="non-scaling-stroke"
             />
             <path 
               className="curved-timeline-fill"
               d="M 0,20 C 100,20 100,180 200,180 C 300,180 300,20 400,20 C 500,20 500,180 600,180 C 700,180 700,20 800,20 C 900,20 900,180 1000,180"
               fill="none"
               stroke="#F4511E"
               strokeWidth="3"
               vectorEffect="non-scaling-stroke"
               clipPath="url(#timeline-clip)"
             />
          </svg>
          
          <div className="process-wave-layout">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.num} className={`process-step-item ${index % 2 === 0 ? 'step-top' : 'step-bottom'}`}>
                {/* Giant Background Number */}
                <div className="process-bg-num">{step.num}</div>

                <div className="process-step-node">
                  <div className="process-step-glow" />
                  <div className="process-step-icon">{step.icon}</div>
                </div>
                
                <div className="process-step-content">
                  <h4 className="process-step-name">{step.title}</h4>
                  <p className="process-step-desc">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

const MemoizedServiceCard = React.memo(({ service, index, isSHM = false, onSelect }: { service: Service, index: number, isSHM?: boolean, onSelect: (s: Service) => void }) => {
  const serviceNumber = String(index + 1).padStart(2, '0');
  return (
    <motion.div
      key={service.slug}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.1,
        ease: "easeOut"
      }}
    >
      <div 
        className={`enterprise-service-card ${isSHM ? 'shm-card' : ''}`}
        onClick={() => onSelect(service)}
        style={{ cursor: 'pointer' }}
      >
        <div className="esc-image-wrapper">
          <img src={service.heroImage} alt={service.title} className="esc-image" />
          <div className="esc-image-overlay" />
        </div>
        <div className="esc-content">
          <div className="esc-meta-row">
            <span className="esc-category">{service.category.toUpperCase()}</span>
            <span className="esc-number">{serviceNumber}</span>
          </div>
          <div className="esc-title-row">
            <div className="esc-icon-wrapper">
              {getServiceCardIcon(service.icon)}
            </div>
            <h3 className="esc-title">{service.shortTitle}</h3>
          </div>
          <p className="esc-description">{service.tagline}</p>
          <hr className="esc-divider" />
          <div className="esc-key-solutions">
            <span className="esc-ks-label">KEY SOLUTIONS</span>
            <span className="esc-ks-value">
              {service.features?.slice(0, 3).map(f => f.title).join(' • ') || 'System Integration • Deployment • Support'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ServiceModal = ({ service, onClose }: { service: Service, onClose: () => void }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <AnimatePresence>
      <div className="service-modal-overlay" onClick={onClose}>
        <motion.div
          className="service-modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="service-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="service-modal-body-split">
            <div className="service-modal-left">
              <div className="service-modal-header">
                <span className="service-modal-category">{service.category}</span>
                <h2 className="service-modal-title">{service.title}</h2>
              </div>

              <p className="service-modal-desc">{service.description || service.tagline}</p>
              
              <div className="service-modal-grid">
                {service.benefits && service.benefits.length > 0 && (
                  <div className="service-modal-section">
                    <h4 className="service-modal-section-title">Key Benefits</h4>
                    <ul className="service-modal-list">
                      {service.benefits.map((b, i) => (
                        <li key={i}>
                          <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.features && service.features.length > 0 && (
                  <div className="service-modal-section">
                    <h4 className="service-modal-section-title">Capabilities</h4>
                    <ul className="service-modal-list">
                      {service.features.map((f, i) => (
                        <li key={i}>
                          <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          <div>
                            <strong>{f.title}</strong>
                            {f.description && <p>{f.description}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="service-modal-footer">
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  REQUEST A CONSULTATION &rarr;
                </Link>
              </div>
            </div>

            <div className="service-modal-right">
              <div className="service-modal-media">
                {service.video ? (
                  <video 
                    key={service.video}
                    className="service-modal-video" 
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src={service.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={service.heroImage} alt={service.title} className="service-modal-video" style={{ objectFit: 'cover' }} />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Services');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sstVisibleCount, setSstVisibleCount] = useState<number>(6);
  const [shmVisibleCount, setShmVisibleCount] = useState<number>(6);

  const servicesGridRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);

  // Global mouse tracking for fixed background glow effects with RAF optimization
  useEffect(() => {
    let ticking = false;
    const updateMouse = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', updateMouse, { passive: true });
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  // Refresh ScrollTrigger when layout changes (e.g., clicking Load More)
  useEffect(() => {
    // Timeout allows DOM to update and Framer Motion animations to finish before recalculating layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [sstVisibleCount, shmVisibleCount, selectedCategory, searchQuery]);

  const deferredSearchQuery = useDeferredValue(searchQuery);

  // Filter services by category and search query
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All Services' ||
        selectedCategory === 'All' ||
        service.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        deferredSearchQuery.trim() === '' ||
        service.title.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
        service.shortTitle.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
        service.features.some((f) => f.title.toLowerCase().includes(deferredSearchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, deferredSearchQuery]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (servicesGridRef.current) {
      servicesGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToServices = () => {
    if (servicesGridRef.current) {
      servicesGridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEcosystem = () => {
    if (ecosystemRef.current) {
      ecosystemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <div className="services-page-root">
        {/* ========================================================= */}
        {/* 1. INDUSTRIAL HERO SECTION (40% / 60% Living Canvas)      */}
        {/* ========================================================= */}
        <ServicesHeroIndustrial 
          onExploreClick={scrollToServices}
          onIntegrateClick={scrollToEcosystem}
          onSelectDomain={handleCategoryClick}
        />




        {/* 4. OUR 24 SERVICES GRID WITH REALTIME SEARCH & FILTER     */}
        {/* ========================================================= */}
        <section className="services-grid-section" ref={servicesGridRef}>
          <div className="container">
            
            <div className="services-grid-header-row">
              <div className="services-grid-title-area">
                <h2 className="services-section-title">
                  {selectedCategory === 'All Services' ? 'OUR 24 SERVICES' : `${selectedCategory.toUpperCase()} SERVICES`}
                </h2>
                <span className="services-count-badge">({filteredServices.length} AVAILABLE)</span>
              </div>

              {/* Search Bar with Instant Live Filter */}
              <div className="services-search-wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input 
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="services-search-input"
                  aria-label="Search services"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="search-clear-btn"
                    aria-label="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Service Cards Grid - Split into SST and SHM */}
            {filteredServices.length > 0 ? (
              <div className="services-sections-container">
                {(() => {
                  const sstServices = filteredServices.filter(s => s.company === 'SST' || s.company === 'COMMON');
                  const shmServices = filteredServices.filter(s => s.company === 'SHM');

                  return (
                    <>
                      {sstServices.length > 0 && (
                        <div className="services-company-section sst-section-bg" style={{ position: 'relative', overflow: 'hidden' }}>
                          {renderHexagons('sst')}
                          <div className="company-section-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                              <h3 className="company-section-title" style={{ transition: 'color 0.3s ease', color: '#0F172A' }} onMouseOver={(e) => e.currentTarget.style.color = '#F4511E'} onMouseOut={(e) => e.currentTarget.style.color = '#0F172A'}>
                                <span style={{ color: '#F4511E' }}>SST</span> — ENGINEERED FOR CONNECTED OPERATIONS.
                              </h3>
                            </Link>
                            <div className="company-section-line" style={{ background: 'linear-gradient(90deg, rgba(244,81,30,0.5) 0%, rgba(244,81,30,0) 100%)' }}></div>
                          </div>
                          <div className="services-cards-grid rich-cards" style={{ position: 'relative', zIndex: 1 }}>
                            {sstServices.slice(0, sstVisibleCount).map((s, i) => <MemoizedServiceCard key={s.slug} service={s} index={i} onSelect={setSelectedService} />)}
                          </div>
                          {sstServices.length > 6 && (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', position: 'relative', zIndex: 1 }}>
                              {sstVisibleCount < sstServices.length ? (
                                <button 
                                  onClick={() => setSstVisibleCount(sstServices.length)}
                                  className="load-more-btn"
                                  style={{ borderColor: 'rgba(244, 81, 30, 0.5)', color: '#F4511E' }}
                                >
                                  LOAD MORE SERVICES
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                  </svg>
                                </button>
                              ) : (
                                <button 
                                  onClick={() => setSstVisibleCount(6)}
                                  className="load-more-btn"
                                  style={{ borderColor: 'rgba(244, 81, 30, 0.5)', color: '#F4511E' }}
                                >
                                  SHOW LESS
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', transform: 'rotate(180deg)' }}>
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                  </svg>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {shmServices.length > 0 && (
                        <div className="services-company-section shm-section-bg" style={{ marginTop: '5rem', position: 'relative', overflow: 'hidden' }}>
                          {renderHexagons('shm')}
                          <div className="company-section-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                            <a href="https://shmtechnologies.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                              <h3 className="company-section-title" style={{ transition: 'color 0.3s ease', color: '#0F172A' }} onMouseOver={(e) => e.currentTarget.style.color = '#3B82F6'} onMouseOut={(e) => e.currentTarget.style.color = '#0F172A'}>
                                <span style={{ color: '#3B82F6' }}>SHM</span> — BUILT FOR SMARTER MOVEMENT.
                              </h3>
                            </a>
                            <div className="company-section-line" style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0) 100%)' }}></div>
                          </div>
                          <div className="services-cards-grid rich-cards" style={{ position: 'relative', zIndex: 1 }}>
                            {shmServices.slice(0, shmVisibleCount).map((s, i) => <MemoizedServiceCard key={s.slug} service={s} index={i} isSHM={true} onSelect={setSelectedService} />)}
                          </div>
                          {shmServices.length > 6 && (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', position: 'relative', zIndex: 1 }}>
                              {shmVisibleCount < shmServices.length ? (
                                <button 
                                  onClick={() => setShmVisibleCount(shmServices.length)}
                                  className="load-more-btn shm-load-more"
                                  style={{ borderColor: 'rgba(59, 130, 246, 0.5)', color: '#3B82F6' }}
                                >
                                  LOAD MORE SERVICES
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                  </svg>
                                </button>
                              ) : (
                                <button 
                                  onClick={() => setShmVisibleCount(6)}
                                  className="load-more-btn shm-load-more"
                                  style={{ borderColor: 'rgba(59, 130, 246, 0.5)', color: '#3B82F6' }}
                                >
                                  SHOW LESS
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', transform: 'rotate(180deg)' }}>
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                  </svg>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                    </>
                  );
                })()}
              </div>
            ) : (
              <motion.div 
                className="services-empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3>No services found</h3>
                <p>We couldn't find any services matching "{searchQuery}" in the {selectedCategory} category.</p>
                <button className="btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('All Services'); }}>
                  Clear Filters
                </button>
              </motion.div>
            )}

          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. ENGINEERING DELIVERY PIPELINE                           */}
        {/* ========================================================= */}
        <ProcessSection />

        {/* ========================================================= */}
        {/* 6. OVERVIEW VIDEO MODAL                                    */}
        {/* ========================================================= */}
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

// -------------------------------------------------------------
// HELPER DATA & ICONS
// -------------------------------------------------------------



function getCategoryIcon(iconName: string) {
  switch (iconName) {
    case 'grid':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'shield':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'network':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="2" width="6" height="6" rx="1" />
          <rect x="16" y="16" width="6" height="6" rx="1" />
          <rect x="2" y="16" width="6" height="6" rx="1" />
          <path d="M5 8v5a3 3 0 0 0 3 3h8" />
        </svg>
      );
    case 'code':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'building':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
        </svg>
      );
    case 'truck':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="1" y="3" width="15" height="13" rx="1" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    default:
      return null;
  }
}

function getServiceCardIcon(iconName: string) {
  switch (iconName) {
    case 'shield':
    case 'shield-check':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'lock':
    case 'lock-open':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'camera':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case 'flame':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
        </svg>
      );
    case 'server':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case 'wifi':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      );
    case 'network':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="16" y="16" width="6" height="6" rx="1" />
          <rect x="2" y="16" width="6" height="6" rx="1" />
          <rect x="9" y="2" width="6" height="6" rx="1" />
          <path d="M5 16v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
          <path d="M12 8v3" />
        </svg>
      );
    case 'cloud':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case 'layers':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'globe':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case 'smartphone':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case 'cpu':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="15" x2="23" y2="15" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="15" x2="4" y2="15" />
        </svg>
      );
    case 'git-merge':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6" />
          <path d="M6 9a9 9 0 0 0 9 9" />
        </svg>
      );
    case 'share-2':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case 'activity':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'database':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'layout':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'zap':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'home':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'truck':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="1" y="3" width="15" height="13" rx="1" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="20" rx="4" />
        </svg>
      );
  }
}
