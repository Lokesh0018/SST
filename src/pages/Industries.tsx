import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { industries } from '../data/industries';
import { partners } from '../data/partners';
import TopographicalBackground from '../components/common/TopographicalBackground';
import '../styles/Industries.css';

gsap.registerPlugin(ScrollTrigger);

import ArchitecturalSkyline from '../components/ArchitecturalSkyline';


export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.industry-detail-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="industries-hero">
        <ArchitecturalSkyline />
        <div className="container">
          <div className="industries-hero-header">
            <div>
              <SectionHeading as="h1" highlight="INDUSTRY.">
                SERVICES FOR EVERY INDUSTRY.
              </SectionHeading>
              <p className="industries-hero-text">
                Tailored infrastructure services for diverse environments.
              </p>
            </div>
            <div className="industries-hero-right">
              <p className="industries-hero-right-text">
                Different Industries.<br />
                <span className="industries-hero-right-highlight">A Stronger</span><br />
                Tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Cards */}
      <section 
        ref={sectionRef} 
        className="industries-section"
        onMouseMove={(e) => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
          sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
        }}
      >
        <TopographicalBackground className="industries-topo-container" />
        
        <div className="container">
          <div className="industries-grid">
            {industries.map((industry) => (
              <div
                key={industry.slug}
                className="industry-detail-card industries-card"
              >
                {/* Photographic Background */}
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="industries-card-img"
                />

                {/* Dark Gradient Overlay */}
                <div className="industries-card-overlay" />
                
                {/* Scanner Line */}
                <div className="industries-card-scanner" />
                
                {/* Corner Crosshairs */}
                <div className="industries-card-crosshair crosshair-tl" />
                <div className="industries-card-crosshair crosshair-tr" />
                <div className="industries-card-crosshair crosshair-bl" />
                <div className="industries-card-crosshair crosshair-br" />

                {/* Content */}
                <div className="industries-card-content">
                  <div className="industries-card-glass">
                    <span className="industries-card-tag">
                      Industry Service
                    </span>

                    <h3 className="industries-card-title">
                      {industry.title}
                    </h3>

                    <p className="industries-card-desc">
                      {industry.longDescription}
                    </p>

                    {/* Services tags */}
                    <div className="industries-card-services">
                      {industry.services.map((service) => (
                        <span
                          key={service}
                          className="industries-card-service"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Orange border glow on hover */}
                <div className="industries-card-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section" style={{ padding: '6rem 0', backgroundColor: '#f9f9f9', position: 'relative' }}>
        <div className="container relative z-10">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="about-eyebrow" style={{ color: '#F4511E', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.875rem' }}>OUR PARTNERS</span>
            <h2 className="why-headline" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginTop: '0.5rem' }}>TECHNOLOGY <span className="text-orange" style={{ color: '#F4511E' }}>PARTNERS.</span></h2>
          </div>

          <div className="partners-category" style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#333', marginBottom: '2rem', textAlign: 'center' }}>Technology Alliance Partners</h3>
            <div className="partners-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2rem', justifyItems: 'center' }}>
              {partners.filter(p => p.type === 'Alliance').map(partner => (
                <div key={partner.id} className="partner-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', width: '100%', height: '100px' }}>
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontWeight: 600, color: '#555', textAlign: 'center' }}>{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="partners-category">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#333', marginBottom: '2rem', textAlign: 'center' }}>Technology Solutions Partners</h3>
            <div className="partners-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2rem', justifyItems: 'center' }}>
              {partners.filter(p => p.type === 'Solutions').map(partner => (
                <div key={partner.id} className="partner-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', width: '100%', height: '100px' }}>
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontWeight: 600, color: '#555', textAlign: 'center' }}>{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
