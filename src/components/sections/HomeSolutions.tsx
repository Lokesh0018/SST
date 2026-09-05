import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import { solutions } from '../../data/solutions';
import '../../styles/HomeSolutions.css';

import React from 'react';

gsap.registerPlugin(ScrollTrigger);

const solutionIcons: Record<string, React.JSX.Element> = {
  camera: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  lock: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  network: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="17" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="17" width="6" height="6" rx="1" />
      <path d="M6 4h11M4 7v10l8 3M20 7v10l-8 3" />
    </svg>
  ),
  zap: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  flame: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c-4.97 0-9-2.69-9-6 0-4 5-11 9-14 4 3 9 10 9 14 0 3.31-4.03 6-9 6z" />
      <path d="M12 22c-1.66 0-3-1.34-3-3 0-2 2-5 3-6 1 1 3 4 3 6 0 1.66-1.34 3-3 3z" />
    </svg>
  ),
  truck: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
};

export default function HomeSolutions() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.solution-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-ivory">
      <div className="container">
        <div className="home-solutions-header">
          <SectionHeading
            highlight="ONE VISION."
            subtitle="Integrated systems. Smarter infrastructure. Greater possibilities."
          >
            COMPLETE SOLUTIONS UNDER ONE VISION.
          </SectionHeading>
          <Link
            to="/solutions"
            className="home-solutions-link"
          >
            Explore All Solutions
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="home-solutions-grid">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              to={`/solutions/${solution.slug}`}
              className="solution-card home-solutions-card"
            >
              {/* Icon */}
              <div className="home-solutions-card-icon">
                {solutionIcons[solution.icon]}
              </div>

              {/* Title */}
              <h3 className="home-solutions-card-title">
                {solution.shortTitle}
              </h3>

              {/* Description */}
              <p className="home-solutions-card-desc">
                {solution.description}
              </p>

              {/* Arrow */}
              <div className="home-solutions-card-action">
                <span className="home-solutions-card-action-text">Learn More</span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="home-solutions-card-action-icon"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* Orange glow on hover */}
              <div className="home-solutions-card-glow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
