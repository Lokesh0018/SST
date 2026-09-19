import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import { CardHoverEffect } from '../ui/CardHoverEffect';
import { Windmill } from '../ui/Windmill';
import SmartInfrastructureNetwork from '../ui/SmartInfrastructureNetwork';
import { industries } from '../../data/industries';
import '../../styles/HomeIndustries.css';

gsap.registerPlugin(ScrollTrigger);

const IndustriesBackground = () => (
  <div className="home-industries-bg" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
    {/* Smart Infrastructure Network between windmills */}
    <SmartInfrastructureNetwork />
    
    {/* Windmills in empty spaces */}
    <Windmill style={{ position: 'absolute', left: '2%', bottom: 0, opacity: 0.6 }} />
    <Windmill style={{ position: 'absolute', right: '2%', bottom: 0, opacity: 0.6 }} />
  </div>
);

export default function HomeIndustries() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set('.industry-card', { opacity: 0, y: 100, scale: 0.95 });

      ScrollTrigger.batch('.card-hover-item-wrapper', {
        start: 'top 95%',
        onEnter: (elements) => {
          gsap.to(elements.map(el => el.querySelector('.industry-card')), {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power3.out',
            clearProps: 'transform',
            overwrite: true
          });
        },
        onLeaveBack: (elements) => {
          gsap.to(elements.map(el => el.querySelector('.industry-card')), {
            opacity: 0,
            y: 100,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.in',
            overwrite: true
          });
        }
      });


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding home-industries-section">
      <IndustriesBackground />
      <div className="container">
        <div className="home-industries-header">
          <div className="home-industries-title-wrapper">
            <span className="home-services-section-label">03 / INDUSTRIES</span>
            <SectionHeading
              highlight="INDUSTRY."
              subtitle="Tailored infrastructure services for diverse environments."
            >
              SERVICES FOR EVERY INDUSTRY.
            </SectionHeading>
          </div>

          <div className="home-industries-header-right">
            <p className="home-industries-header-text">
              Different Industries.<br />
              <span className="home-industries-header-highlight">A Stronger Tomorrow.</span>
            </p>
            <Link
              to="/industries"
              className="home-services-link"
              style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', color: 'var(--color-orange)' }}
            >
              Explore All Industries
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.5rem' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <CardHoverEffect
          className="home-industries-grid"
          items={industries.map(ind => ({ ...ind, id: ind.slug, link: `/industries#${ind.slug}` }))}
          renderItem={(industry, isHovered) => (
            <div className="industry-card home-industries-card">
              {/* Photographic Background */}
              <img
                src={industry.image}
                alt={industry.title}
                className="home-industries-card-img"
              />

              {/* Dark Gradient Overlay for text readability */}
              <div
                className="home-industries-card-overlay"
                style={{
                  background: 'linear-gradient(180deg, rgba(23,22,19,0.1) 0%, rgba(23,22,19,0.7) 60%, rgba(23,22,19,0.95) 100%)',
                }}
              />

              {/* Content */}
              <div className="home-industries-card-content">
                <h3 className="home-industries-card-title">
                  {industry.title}
                </h3>
                <p className="home-industries-card-desc">
                  {industry.description}
                </p>
                <div className="home-industries-card-tags">
                  {industry.services.map((service: string, index: number) => (
                    <span key={index} className="home-industries-card-tag" style={{ '--tag-index': index } as React.CSSProperties}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Orange border glow on hover */}
              <div className="home-industries-card-border" />
            </div>
          )}
        />
      </div>
    </section>
  );
}
