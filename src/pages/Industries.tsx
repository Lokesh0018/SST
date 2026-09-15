import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { industries } from '../data/industries';
import { clients } from '../data/clients';

const getClientsForIndustry = (slug: string) => {
  const categoryMap: Record<string, string> = {
    'hotels': 'Hospitality Sector',
    'industries': 'Industries',
    'financial-institutions': 'Financial Institutions',
    'ecommerce-software': 'E-Commerce & Software Companies',
    'banks': 'Banks',
    'retail': 'Retail',
  };
  const category = categoryMap[slug];
  return clients.filter(c => c.category === category && c.name.trim() !== '');
};
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
                <div className="industries-card-inner">
                  {/* FRONT OF CARD */}
                  <div className="industries-card-front">
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

                  {/* BACK OF CARD */}
                  <div className="industries-card-back">
                    {/* Watermark Logo */}
                    <img 
                      src="/images/logo/SST L.png" 
                      alt="" 
                      className="industries-card-back-watermark" 
                    />
                    
                    <h3 className="industries-card-back-title">Our Partners</h3>
                    <ul className="industries-card-back-list">
                      {getClientsForIndustry(industry.slug).map((client, index) => (
                        <li 
                          key={client.id}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {client.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
