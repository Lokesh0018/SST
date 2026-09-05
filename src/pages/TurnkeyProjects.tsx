import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import '../styles/TurnkeyProjects.css';

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
  { number: '01', title: 'Consult', description: 'Understanding your requirements, challenges, and objectives through detailed assessment.', icon: '💬' },
  { number: '02', title: 'Design', description: 'Engineering tailored services with detailed schematics, BOQs, and client plans.', icon: '📐' },
  { number: '03', title: 'Procure', description: 'Strategic sourcing of equipment and materials from trusted manufacturers and partners.', icon: '📦' },
  { number: '04', title: 'Install', description: 'Professional installation by certified technicians following industry best practices.', icon: '🔧' },
  { number: '05', title: 'Integrate', description: 'Seamless integration of all systems into a unified, interoperable infrastructure.', icon: '🔗' },
  { number: '06', title: 'Test', description: 'Rigorous testing, commissioning, and quality assurance across all deployed systems.', icon: '✅' },
  { number: '07', title: 'Handover', description: 'Complete documentation, training, and formal handover to your operations team.', icon: '🤝' },
  { number: '08', title: 'Support', description: 'Ongoing maintenance, monitoring, and technical support for long-term reliability.', icon: '🛡️' },
];

export default function TurnkeyProjects() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Animate timeline line
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }

    // Animate timeline items
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="turnkey-hero" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="turnkey-hero-layout">
            <div>
              <SectionHeading as="h1" highlight="IMPLEMENTATION.">
                FROM IDEA TO IMPLEMENTATION.
              </SectionHeading>
              <p className="turnkey-hero-text">
                End-to-end client execution with precision, expertise and reliability.
              </p>
            </div>
            <div className="turnkey-hero-right">
              <p className="turnkey-hero-right-text">
                Turnkey Services<br />
                <span className="turnkey-highlight">Real-World</span><br />
                Results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="turnkey-timeline-section">
        <div className="container">
          <div ref={timelineRef} className="turnkey-timeline">
            {/* Vertical line */}
            <div
              ref={lineRef}
              className="turnkey-timeline-line"
              style={{ transform: 'scaleY(0)' }}
            />

            {/* Timeline items */}
            <div className="turnkey-timeline-items">
              {timelineSteps.map((step, i) => (
                <div
                  key={step.number}
                  className={`timeline-item turnkey-timeline-item ${
                    i % 2 === 0 ? 'turnkey-timeline-item-even' : 'turnkey-timeline-item-odd'
                  }`}
                >
                  {/* Content */}
                  <div className="turnkey-timeline-content">
                    <span className="turnkey-timeline-icon">{step.icon}</span>
                    <span className="turnkey-timeline-number">{step.number}</span>
                    <h3 className="turnkey-timeline-title">{step.title}</h3>
                    <p className="turnkey-timeline-desc">{step.description}</p>
                  </div>

                  {/* Node */}
                  <div className="turnkey-timeline-node" />

                  {/* Spacer for alternating layout */}
                  <div className="turnkey-timeline-spacer" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="turnkey-timeline-cta">
            <Button to="/contact" variant="primary" size="lg" icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            }>
              Watch Our Process
            </Button>
          </div>
        </div>
      </section>

      {/* Client showcase */}
      <section className="turnkey-showcase">
        <div className="container">
          <div className="turnkey-showcase-card group">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1400&q=80"
              alt="Engineering Turnkey Infrastructure Client"
              className="turnkey-showcase-img"
            />
            <div className="turnkey-showcase-overlay" />
            <div className="turnkey-showcase-content">
              <div>
                <p className="turnkey-showcase-tag">Turnkey Infrastructure</p>
                <h3 className="turnkey-showcase-title">
                  Infrastructure That Creates<br /><span className="turnkey-highlight">Opportunity.</span>
                </h3>
              </div>
              <Button to="/contact" variant="primary" size="lg">
                Start Your Client
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
