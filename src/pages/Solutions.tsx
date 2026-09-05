import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { solutions } from '../data/solutions';
import '../styles/Solutions.css';

gsap.registerPlugin(ScrollTrigger);

const solutionPositions = [
  { x: 50, y: 15, label: 'Security &\nSurveillance' },
  { x: 85, y: 30, label: 'IT\nInfrastructure' },
  { x: 85, y: 65, label: 'Electrical\n& Electronic' },
  { x: 50, y: 85, label: 'Turnkey\nProjects' },
  { x: 15, y: 65, label: 'Fire &\nSafety' },
  { x: 15, y: 30, label: 'Logistics\n& Operations' },
];

export default function Solutions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      '.solution-node',
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        delay: 0.5,
      }
    );
  }, []);

  return (
    <PageTransition>
      <section className="solutions-hero" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="solutions-layout">
            {/* Left - Heading */}
            <div className="solutions-left">
              <SectionHeading as="h1" highlight="ONE VISION.">
                COMPLETE SOLUTIONS UNDER ONE VISION.
              </SectionHeading>
              <p className="solutions-text">
                Integrated systems. Smarter infrastructure. Greater possibilities.
              </p>
              <div className="solutions-actions">
                <Link
                  to="/solutions/video-surveillance"
                  className="solutions-btn"
                >
                  <span>Explore All Solutions</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="solutions-footer">
                <p className="solutions-footer-tag">
                  More Than Services
                </p>
                <p className="solutions-footer-title">
                  <span className="text-orange">A Stronger</span><br />Tomorrow.
                </p>
              </div>
            </div>

            {/* Right - Hub Diagram */}
            <div ref={sectionRef} className="solutions-right">
              {/* Desktop: circular hub layout */}
              <div className="solutions-hub">
                {/* Center SST node */}
                <div className="solutions-hub-center-container">
                  <div className="solutions-hub-center">
                    <span className="solutions-hub-center-title">SST</span>
                    <span className="solutions-hub-center-subtitle">CORE HUB</span>
                  </div>
                </div>

                {/* SVG connection lines with pulse animation */}
                <svg className="solutions-hub-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  {solutionPositions.map((pos, i) => (
                    <g key={i}>
                      <line
                        x1="50"
                        y1="50"
                        x2={pos.x}
                        y2={pos.y}
                        stroke={hoveredIndex === i ? '#F15A24' : '#C4B9A8'}
                        strokeWidth={hoveredIndex === i ? '0.6' : '0.3'}
                        strokeDasharray="2 2"
                        className="transition-all duration-300"
                      />
                      {/* Pulse circle traveling */}
                      <circle
                        r="1"
                        fill="#F15A24"
                        className="animate-[ping_3s_ease-in-out_infinite]"
                        style={{
                          cx: `${50 + (pos.x - 50) * 0.6}%`,
                          cy: `${50 + (pos.y - 50) * 0.6}%`,
                        }}
                      />
                    </g>
                  ))}
                </svg>

                {/* Solution nodes */}
                {solutions.map((solution, i) => (
                  <Link
                    key={solution.slug}
                    to={`/solutions/${solution.slug}`}
                    className="solution-node group"
                    style={{
                      left: `${solutionPositions[i].x}%`,
                      top: `${solutionPositions[i].y}%`,
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className={`solutions-hub-node-inner ${
                      hoveredIndex === i
                        ? 'solutions-hub-node-inner-active'
                        : 'solutions-hub-node-inner-inactive'
                    }`}>
                      <span className="solutions-hub-node-text">
                        {solutionPositions[i].label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile: vertical card list */}
              <div className="solutions-mobile">
                {solutions.map((solution) => (
                  <Link
                    key={solution.slug}
                    to={`/solutions/${solution.slug}`}
                    className="solutions-mobile-card group"
                  >
                    <h3 className="solutions-mobile-card-title">{solution.shortTitle}</h3>
                    <p className="solutions-mobile-card-desc">{solution.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
