import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import ServicesHeroIndustrial from '../components/services/ServicesHeroIndustrial';
import ServicesCategoryGrid from '../components/services/ServicesCategoryGrid';
import ServicesEcosystemMap from '../components/services/ServicesEcosystemMap';
import { services, categories } from '../data/services';
import type { Service } from '../data/services';
import '../styles/Services.css';

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Services');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const servicesGridRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);

  // Filtered featured services for carousel
  const featuredServices = useMemo(() => {
    return services.filter((s) => s.featured || [17, 3, 12, 15, 20].includes(s.id));
  }, []);

  const currentFeatured = featuredServices[featuredIndex] || featuredServices[0] || services[0];

  const handleNextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredServices.length);
  };

  const handlePrevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredServices.length) % featuredServices.length);
  };

  // Filter services by category and search query
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All Services' ||
        selectedCategory === 'All' ||
        service.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchQuery.trim() === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some((f) => f.title.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
    } else {
      setIsVideoModalOpen(true);
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

        {/* ========================================================= */}
        {/* 2. EXPLORE BY CATEGORY (Clean 6-Card Responsive Grid)     */}
        {/* ========================================================= */}
        <ServicesCategoryGrid 
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryClick}
        />

        {/* ========================================================= */}
        {/* 3. ONE ECOSYSTEM ARCHITECTURE MAP (Dark Navy Section)     */}
        {/* ========================================================= */}
        <div ref={ecosystemRef}>
          <ServicesEcosystemMap />
        </div>

        {/* ========================================================= */}
        {/* 3. FEATURED CAPABILITIES SECTION                           */}
        {/* ========================================================= */}
        <section className="services-featured-section">
          <div className="container">
            
            <div className="featured-header-row">
              <h2 className="services-section-title">FEATURED CAPABILITIES</h2>
              <div className="featured-nav-buttons">
                <button 
                  onClick={handlePrevFeatured} 
                  className="featured-nav-btn"
                  aria-label="Previous Featured Capability"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={handleNextFeatured} 
                  className="featured-nav-btn"
                  aria-label="Next Featured Capability"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentFeatured.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="featured-capability-showcase"
              >
                {/* Left: High-res server / infrastructure photography */}
                <div className="featured-showcase-visual">
                  <img 
                    src={currentFeatured.heroImage} 
                    alt={currentFeatured.title} 
                    className="featured-showcase-img"
                    loading="lazy"
                  />
                  <div className="featured-showcase-overlay" />
                </div>

                {/* Right: Capability Description & Bullet Highlights */}
                <div className="featured-showcase-content">
                  <div className="featured-tag-row">
                    <span className="featured-number">{currentFeatured.id < 10 ? `0${currentFeatured.id}` : currentFeatured.id}</span>
                    <span className="featured-domain-badge">{currentFeatured.category.toUpperCase()}</span>
                  </div>

                  <h3 className="featured-title">{currentFeatured.title}</h3>
                  <p className="featured-desc">{currentFeatured.description}</p>

                  <div className="featured-checklist">
                    {currentFeatured.features.map((feat, idx) => (
                      <div key={idx} className="featured-check-item">
                        <span className="featured-check-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </span>
                        <span className="featured-check-text">{feat.title}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    to={`/services/${currentFeatured.slug}`}
                    className="services-btn-primary featured-cta-btn"
                  >
                    <span>Explore Service</span>
                    <svg className="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </section>

        {/* ========================================================= */}
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

            {/* Service Cards Grid */}
            {filteredServices.length > 0 ? (
              <div className="services-cards-grid">
                {filteredServices.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="service-card-modern"
                  >
                    <div className="service-card-top">
                      <div className="service-card-icon">
                        {getServiceCardIcon(service.icon)}
                      </div>
                      <span className="service-card-number">
                        {service.id < 10 ? `0${service.id}` : service.id}
                      </span>
                    </div>

                    <div className="service-card-content">
                      <h3 className="service-card-title">{service.shortTitle}</h3>
                      <p className="service-card-category">{service.category}</p>
                    </div>

                    <div className="service-card-arrow-row">
                      <span className="service-card-arrow">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="services-empty-state">
                <p className="empty-text">No services found matching "{searchQuery}"</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Services');
                  }}
                  className="services-btn-secondary empty-reset-btn"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. FROM VISION TO OPERATION (Process Roadmap)              */}
        {/* ========================================================= */}
        <section className="services-process-section">
          <div className="process-bg-overlay" />
          
          <div className="container">
            <div className="process-header">
              <h2 className="process-title">FROM VISION TO OPERATION</h2>
              <p className="process-subtitle">
                A structured approach to deliver integrated solutions.
              </p>
            </div>

            <div className="process-timeline-container">
              <div className="process-timeline-line" />
              
              <div className="process-steps-grid">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.num} className="process-step-item">
                    <div className="process-step-node">
                      <div className="process-step-dot" />
                      <div className="process-step-ring" />
                    </div>

                    <div className="process-step-content">
                      <span className="process-step-num">{step.num}</span>
                      <h4 className="process-step-name">{step.title}</h4>
                      <p className="process-step-desc">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. OVERVIEW VIDEO MODAL                                    */}
        {/* ========================================================= */}
        <AnimatePresence>
          {isVideoModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="video-modal-backdrop"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="video-modal-container"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="video-modal-close"
                  onClick={() => setIsVideoModalOpen(false)}
                  aria-label="Close Overview Modal"
                >
                  &times;
                </button>

                <div className="video-modal-header">
                  <h3 className="video-modal-title">SST Integrated Ecosystem Overview</h3>
                  <p className="video-modal-subtitle">
                    Discover how our 24 services across physical infrastructure, security, networking, and software unite into a single powerhouse.
                  </p>
                </div>

                <div className="video-modal-screen">
                  <div className="video-placeholder-banner">
                    <div className="video-play-pulse">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                        <polygon points="6 3 20 12 6 21 6 3" />
                      </svg>
                    </div>
                    <p className="video-caption">Interactive Infrastructure Architecture Presentation</p>
                  </div>
                </div>

                <div className="video-modal-footer">
                  <Link 
                    to="/contact" 
                    className="services-btn-primary"
                    onClick={() => setIsVideoModalOpen(false)}
                  >
                    <span>Start a Project with Us</span>
                    <svg className="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}

// -------------------------------------------------------------
// HELPER DATA & ICONS
// -------------------------------------------------------------

const PROCESS_STEPS = [
  { num: '01', title: 'Discover', sub: 'Requirements' },
  { num: '02', title: 'Design', sub: 'Architecture' },
  { num: '03', title: 'Integrate', sub: 'Systems' },
  { num: '04', title: 'Implement', sub: 'Deployment' },
  { num: '05', title: 'Optimize', sub: 'Performance' },
  { num: '06', title: 'Support', sub: 'Ongoing Care' },
];

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
