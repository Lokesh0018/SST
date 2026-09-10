import { useParams, Link, Navigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import NetworkBackground from '../components/common/NetworkBackground';
import { getServiceBySlug, services } from '../data/services';
import '../styles/ServiceDetail.css';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.fromTo('.sd-hero-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo('.sd-hero-meta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo('.sd-hero-image-container',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      // Accordion Animations
      const accordionItems = gsap.utils.toArray('.sd-accordion-item');
      accordionItems.forEach((item: any) => {
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Benefits Animations
      gsap.fromTo('.sd-benefit-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.sd-benefits-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [slug]);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const currentIndex = services.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <PageTransition>
      <div ref={containerRef} className="sd-page-wrapper">
        
        {/* HERO SECTION */}
        <section className="sd-hero">
          <div className="sd-hero-bg">
            <NetworkBackground />
          </div>
          
          <div className="container sd-hero-container">
            {/* Breadcrumb */}
            <nav className="sd-breadcrumb sd-hero-meta" aria-label="Breadcrumb">
              <Link to="/services" className="sd-breadcrumb-link">Services</Link>
              <span className="sd-breadcrumb-sep">/</span>
              <span className="sd-breadcrumb-current">{service.title}</span>
            </nav>

            <div className="sd-hero-content">
              <div className="sd-hero-text-col">
                <h1 className="sd-hero-title">
                  {service.title.split(' ').map((word, i, arr) => (
                    <span key={i} className={i === arr.length - 1 ? 'text-highlight-orange' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                
                <div className="sd-hero-meta">
                  <p className="sd-tagline">{service.tagline}</p>
                  <p className="sd-description">{service.heroDescription}</p>
                  
                  <div className="sd-actions">
                    <Button to="/contact" variant="primary" size="lg">
                      Start Project
                    </Button>
                  </div>
                </div>
              </div>

              <div className="sd-hero-image-container">
                <div className="sd-hero-image-wrapper">
                  {['turnkey-projects', 'intrusion-detection', 'access-control', 'switches-storage', 'logistics', 'electrical-electronics', 'fire-fighting', 'video-surveillance', 'wireless-network', 'hardware-tools', 'network-infrastructure'].includes(service.slug) ? (
                    <video 
                      src={`/videos/services/${service.slug === 'turnkey-projects' ? 'turnkey' : service.slug === 'switches-storage' ? 'switches&storages' : service.slug === 'electrical-electronics' ? 'electrical&electronics' : service.slug === 'wireless-network' ? 'wireless technology' : service.slug === 'hardware-tools' ? 'hardware&tools' : service.slug === 'network-infrastructure' ? 'network&infrastructure' : service.slug}.mp4`} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="sd-hero-image" 
                    />
                  ) : (
                    <img src={service.heroImage} alt={service.title} className="sd-hero-image" />
                  )}
                  <div className="premium-visual-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="sd-features-section">
          <div className="container">
            <div className="sd-section-header">
              <h2 className="sd-section-title">Core Features</h2>
              <div className="sd-section-line"></div>
            </div>

            <div className="sd-accordion">
              {service.features.map((feature, i) => {
                const isActive = activeFeature === i;
                return (
                  <div 
                    key={i} 
                    className={`sd-accordion-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveFeature(isActive ? null : i)}
                  >
                    <div className="sd-accordion-header">
                      <div className="sd-accordion-title-group">
                        <span className="sd-accordion-number">
                          {i + 1 < 10 ? `0${i + 1}` : i + 1}
                        </span>
                        <h3 className="sd-accordion-title">{feature.title}</h3>
                      </div>
                      <div className="sd-accordion-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                    <div className="sd-accordion-body-wrapper">
                      <div className="sd-accordion-body">
                        <p className="sd-accordion-desc">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BENEFITS & APPLICATIONS */}
        <section className="sd-benefits-section bg-cream">
          <div className="container">
            <div className="sd-benefits-grid">
              
              {/* Benefits */}
              <div className="sd-benefits-col">
                <h3 className="sd-sub-title">System Benefits</h3>
                <ul className="sd-benefits-list">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="sd-benefit-item">
                      <div className="sd-benefit-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="sd-benefit-text">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applications */}
              <div className="sd-applications-col">
                <h3 className="sd-sub-title">Ideal Applications</h3>
                <ul className="sd-applications-list">
                  {service.applications.map((app, i) => (
                    <li key={i} className="sd-app-item sd-benefit-item">
                      <div className="sd-app-number">
                        {i + 1 < 10 ? `0${i + 1}` : i + 1}
                      </div>
                      <span className="sd-app-text">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>

            {/* NAVIGATION (Moved into Benefits Section) */}
            <div className="sd-nav-container">
              {prevService ? (
                <Link to={`/services/${prevService.slug}`} className="sd-nav-link sd-nav-prev">
                  <div className="sd-nav-arrow-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="sd-nav-text-group">
                    <span className="sd-nav-label">Previous Service</span>
                    <span className="sd-nav-service-name">{prevService.shortTitle}</span>
                  </div>
                </Link>
              ) : <div />}
              
              {nextService ? (
                <Link to={`/services/${nextService.slug}`} className="sd-nav-link sd-nav-next">
                  <div className="sd-nav-text-group">
                    <span className="sd-nav-label">Next Service</span>
                    <span className="sd-nav-service-name">{nextService.shortTitle}</span>
                  </div>
                  <div className="sd-nav-arrow-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
