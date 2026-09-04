import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
  { number: '01', title: 'Consult', description: 'Understanding your requirements, challenges, and objectives through detailed assessment.', icon: '💬' },
  { number: '02', title: 'Design', description: 'Engineering tailored solutions with detailed schematics, BOQs, and project plans.', icon: '📐' },
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
      <section className="pt-44 lg:pt-48 pb-16" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <SectionHeading as="h1" highlight="IMPLEMENTATION.">
                FROM IDEA TO IMPLEMENTATION.
              </SectionHeading>
              <p className="mt-6 text-base text-charcoal/60 leading-relaxed max-w-lg">
                End-to-end project execution with precision, expertise and reliability.
              </p>
            </div>
            <div className="text-right hidden lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-charcoal/30 leading-relaxed">
                Turnkey Solutions<br />
                <span className="text-orange">Real-World</span><br />
                Results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div
              ref={lineRef}
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-orange origin-top"
              style={{ transform: 'scaleY(0)' }}
            />

            {/* Timeline items */}
            <div className="space-y-12">
              {timelineSteps.map((step, i) => (
                <div
                  key={step.number}
                  className={`timeline-item relative flex items-start gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'} pl-20 md:pl-0`}>
                    <span className="text-3xl mb-2 block">{step.icon}</span>
                    <span className="text-xs font-bold text-orange tracking-widest">{step.number}</span>
                    <h3 className="text-xl font-extrabold uppercase tracking-tight mt-1">{step.title}</h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed mt-2">{step.description}</p>
                  </div>

                  {/* Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange border-4 border-ivory shadow-[0_0_15px_rgba(241,90,36,0.3)] z-10" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
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

      {/* Project showcase */}
      <section className="py-20 bg-ivory">
        <div className="container">
          <div className="relative h-[350px] md:h-[480px] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(23,22,19,0.15)] border border-cream-dark/40 group">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1400&q=80"
              alt="Engineering Turnkey Infrastructure Project"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange mb-2">Turnkey Infrastructure</p>
                <h3 className="text-3xl md:text-4xl font-extrabold uppercase text-ivory leading-tight">
                  Infrastructure That Creates<br /><span className="text-orange">Opportunity.</span>
                </h3>
              </div>
              <Button to="/contact" variant="primary" size="lg">
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
