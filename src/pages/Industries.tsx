import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { industries } from '../data/industries';
import '../styles/Industries.css';

gsap.registerPlugin(ScrollTrigger);

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.industry-detail-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="industries-hero" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
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
      <section ref={sectionRef} className="industries-section">
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
                <div
                  className="industries-card-overlay"
                />

                {/* Content */}
                <div className="industries-card-content">
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

                  {/* Arrow Action */}
                  <div className="industries-card-explore">
                    <span>Explore Services</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Orange border glow on hover */}
                <div className="industries-card-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
