import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import { industries } from '../../data/industries';
import '../../styles/HomeIndustries.css';

gsap.registerPlugin(ScrollTrigger);

const IndustriesBackground = () => (
  <div className="home-industries-bg" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
    <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      
      {/* BACKGROUND LAYER */}
      <g className="ind-layer-bg" stroke="rgba(28, 28, 27, 0.05)" strokeWidth="0.5" fill="none">
        <path d="M50,0 L50,600 M250,0 L250,600 M450,0 L450,600 M650,0 L650,600 M850,0 L850,600" />
        <path d="M0,50 L1000,50 M0,250 L1000,250 M0,450 L1000,450" />
      </g>

      {/* MIDGROUND LAYER (Structural Nodes) */}
      <g className="ind-layer-mid" stroke="rgba(28, 28, 27, 0.1)" strokeWidth="1" fill="none">
        <path d="M50,50 L250,250 L450,50 L650,250 L850,50" />
        <path d="M50,450 L250,250 L450,450 L650,250 L850,450" />
        <g fill="rgba(28, 28, 27, 0.2)">
          <circle cx="250" cy="250" r="3" />
          <circle cx="650" cy="250" r="3" />
        </g>
        <g fill="var(--color-orange)">
          <circle r="3">
            <animateMotion dur="15s" repeatCount="indefinite" path="M50,50 L250,250 L450,50 L650,250 L850,50" />
          </circle>
        </g>
      </g>

      {/* FOREGROUND LAYER (Diagonal accents) */}
      <g className="ind-layer-fg" stroke="rgba(28, 28, 27, 0.15)" strokeWidth="1.5" fill="none">
        <path d="M-50,300 L300,-50" />
        <path d="M700,650 L1050,300" />
      </g>

    </svg>
  </div>
);

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

    // --- Background Parallax Layering ---
    gsap.to('.ind-layer-bg', {
      y: -15,
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true }
    });
    gsap.to('.ind-layer-mid', {
      y: -40,
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true }
    });
    gsap.to('.ind-layer-fg', {
      y: -80,
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true }
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding home-industries-section">
      <IndustriesBackground />
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
