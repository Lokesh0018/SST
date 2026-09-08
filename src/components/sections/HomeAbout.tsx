import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/HomeAbout.css';

gsap.registerPlugin(ScrollTrigger);

export default function HomeAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const networkBgRef = useRef<HTMLDivElement>(null);
  
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !leftRef.current || !rightRef.current) {
      if (leftRef.current) gsap.set(leftRef.current.children, { opacity: 1, y: 0 });
      if (rightRef.current) gsap.set(rightRef.current.querySelectorAll('.home-about-stat-item'), { opacity: 1, x: 0, y: 0 });
      return;
    }

    // Main Reveal Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%', // Trigger slightly earlier
        // We handle entrance explicitly, and we don't want toggleActions to reverse the transforms
        onEnter: () => tl.play(),
      }
    });

    // Parallax Effects
    gsap.to(leftRef.current, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(rightRef.current, {
      y: -60, // Faster scroll for the stats stack to create depth
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    const easeCurve = "cubic-bezier(0.22, 1, 0.36, 1)";
    const duration = 0.6; // Faster base duration

    // 1. Left Content Sequence (Start almost immediately!)
    tl.fromTo(
      leftRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: duration, stagger: 0.1, ease: easeCurve }
    )
    // 4. Capabilities Stack Sequence
    .fromTo(
      rightRef.current.querySelectorAll('.home-about-stat-item'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: duration, stagger: 0.1, ease: easeCurve },
      "-=0.4"
    );

  }, []);

  return (
    <section ref={sectionRef} className="home-about-section">
      
      <div ref={networkBgRef} className="home-about-network-bg" aria-hidden="true">
        <img src="/images/about bg.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div className="home-about-grid">
        
        {/* LEFT: Content & Positioning */}
        <div ref={leftRef} className="home-about-left">
          <span className="home-about-eyebrow">ABOUT SST</span>
          
          <h2 className="home-about-headline">
            BUILT FOR THE INFRASTRUCTURE BEHIND <span className="highlight-orange">REAL-WORLD</span> OPERATIONS.
          </h2>
          
          <p className="home-about-description">
            SST delivers integrated technology, security, electrical, fire protection and turnkey infrastructure solutions for demanding commercial environments.
          </p>
          
          <Link to="/about" className="home-about-cta">
            DISCOVER SST
            <svg
              className="home-about-cta-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* RIGHT: Capabilities Stack */}
        <div ref={rightRef} className="home-about-right">
          
          <div className="home-about-stats-stack">
            <div className="home-about-stat-item" onMouseEnter={() => setHoveredCard(0)} onMouseLeave={() => setHoveredCard(null)}>
              <div className="stat-node"></div>
              <div className="stat-connection-line"></div>
              <div className="stat-content">
                <span className="stat-value">2016</span>
                <span className="stat-label">ESTABLISHED</span>
              </div>
            </div>
            <div className="home-about-stat-item" onMouseEnter={() => setHoveredCard(1)} onMouseLeave={() => setHoveredCard(null)}>
              <div className="stat-node"></div>
              <div className="stat-connection-line"></div>
              <div className="stat-content">
                <span className="stat-value">TURNKEY</span>
                <span className="stat-label">DELIVERY</span>
              </div>
            </div>
            <div className="home-about-stat-item" onMouseEnter={() => setHoveredCard(2)} onMouseLeave={() => setHoveredCard(null)}>
              <div className="stat-node"></div>
              <div className="stat-connection-line"></div>
              <div className="stat-content">
                <span className="stat-value">MULTI-INDUSTRY</span>
                <span className="stat-label">EXPERIENCE</span>
              </div>
            </div>
            <div className="home-about-stat-item" onMouseEnter={() => setHoveredCard(3)} onMouseLeave={() => setHoveredCard(null)}>
              <div className="stat-node"></div>
              <div className="stat-connection-line"></div>
              <div className="stat-content">
                <span className="stat-value">END-TO-END</span>
                <span className="stat-label">EXECUTION</span>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
