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
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
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
    <section ref={sectionRef} className="section-padding" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
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
          </div>
        </div>

        <div className="home-industries-grid">
          {industries.map((industry, i) => (
            <Link
              key={industry.slug}
              to="/industries"
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
                <div className="home-industries-card-explore">
                  <span>Explore</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Orange border glow on hover */}
              <div className="home-industries-card-border" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
