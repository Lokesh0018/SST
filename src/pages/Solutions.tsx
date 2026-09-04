import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { solutions } from '../data/solutions';

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
      <section className="min-h-screen pt-44 lg:pt-48 pb-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left - Heading */}
            <div className="lg:w-1/3">
              <SectionHeading as="h1" highlight="ONE VISION.">
                COMPLETE SOLUTIONS UNDER ONE VISION.
              </SectionHeading>
              <p className="mt-6 text-base text-charcoal/70 leading-relaxed">
                Integrated systems. Smarter infrastructure. Greater possibilities.
              </p>
              <div className="mt-8">
                <Link
                  to="/solutions/video-surveillance"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-orange-dark hover:shadow-[0_0_25px_rgba(241,90,36,0.3)] transition-all duration-300"
                >
                  <span>Explore All Solutions</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="mt-16 pt-8 border-t border-cream-dark/40">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/40">
                  More Than Services
                </p>
                <p className="text-2xl font-extrabold uppercase mt-1 text-charcoal">
                  <span className="text-orange">A Stronger</span><br />Tomorrow.
                </p>
              </div>
            </div>

            {/* Right - Hub Diagram */}
            <div ref={sectionRef} className="lg:w-2/3 relative w-full">
              {/* Desktop: circular hub layout */}
              <div className="hidden md:block relative w-full aspect-square max-w-[620px] mx-auto">
                {/* Center SST node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-28 h-28 rounded-full bg-charcoal flex flex-col items-center justify-center border-4 border-orange shadow-[0_0_50px_rgba(241,90,36,0.4)] animate-pulse">
                    <span className="text-ivory text-2xl font-extrabold tracking-tight">SST</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-orange">CORE HUB</span>
                  </div>
                </div>

                {/* SVG connection lines with pulse animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
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
                    className="solution-node absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                    style={{
                      left: `${solutionPositions[i].x}%`,
                      top: `${solutionPositions[i].y}%`,
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className={`
                      w-24 h-24 rounded-full flex flex-col items-center justify-center text-center
                      border-2 transition-all duration-300 p-2 shadow-md
                      ${hoveredIndex === i
                        ? 'bg-orange text-ivory border-orange shadow-[0_0_35px_rgba(241,90,36,0.5)] scale-115'
                        : 'bg-cream border-cream-dark/60 text-charcoal hover:border-orange/60'
                      }
                    `}>
                      <span className="text-[10px] font-extrabold uppercase tracking-tight leading-tight">
                        {solutionPositions[i].label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile: vertical card list */}
              <div className="md:hidden space-y-4">
                {solutions.map((solution) => (
                  <Link
                    key={solution.slug}
                    to={`/solutions/${solution.slug}`}
                    className="block p-5 bg-cream/70 rounded-xl border border-cream-dark/40 hover:border-orange/40 transition-all duration-300 shadow-sm"
                  >
                    <h3 className="text-base font-extrabold uppercase tracking-tight text-charcoal">{solution.shortTitle}</h3>
                    <p className="text-sm text-charcoal/70 mt-1">{solution.description}</p>
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
