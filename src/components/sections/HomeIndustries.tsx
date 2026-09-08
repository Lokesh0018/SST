import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import { industries } from '../../data/industries';
import '../../styles/HomeIndustries.css';

gsap.registerPlugin(ScrollTrigger);

export default function HomeIndustries() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.industry-card');
    const cardsArray = Array.from(cards);
    cardsArray.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: (index % 3) * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding home-industries-section">
      <div className="container">
        <div className="home-industries-header">
          <SectionHeading
            highlight="INDUSTRY."
            subtitle="Tailored infrastructure services for diverse environments."
          >
            SERVICES FOR EVERY INDUSTRY.
          </SectionHeading>

          <div className="home-industries-header-right">
            <p className="home-industries-header-text">
              Different Industries.<br />
              <span className="home-industries-header-highlight">A Stronger Tomorrow.</span>
            </p>
            <Link
              to="/industries"
              className="home-services-link"
              style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}
            >
              Explore All Industries
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.5rem' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="home-industries-grid">
          {industries.map((industry, i) => (
            <div
              key={industry.slug}
              className="industry-card home-industries-card"
            >
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
              </div>

              {/* Orange border glow on hover */}
              <div className="home-industries-card-border" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
