import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { industries } from '../data/industries';

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
      <section className="pt-44 lg:pt-48 pb-16" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <SectionHeading as="h1" highlight="INDUSTRY.">
                SOLUTIONS FOR EVERY INDUSTRY.
              </SectionHeading>
              <p className="mt-6 text-base text-charcoal/60 leading-relaxed max-w-lg">
                Tailored infrastructure solutions for diverse environments.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-charcoal/30 leading-relaxed">
                Different Industries.<br />
                <span className="text-orange">A Stronger</span><br />
                Tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Cards */}
      <section ref={sectionRef} className="section-padding bg-ivory">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <div
                key={industry.slug}
                className="industry-detail-card group relative h-[480px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(23,22,19,0.12)] border border-cream-dark/40"
              >
                {/* Photographic Background */}
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(180deg, rgba(23,22,19,0.1) 0%, rgba(23,22,19,0.6) 50%, rgba(23,22,19,0.95) 100%)',
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-orange mb-2">
                    Industry Solution
                  </span>

                  <h3 className="text-3xl font-extrabold uppercase tracking-tight text-ivory mb-3">
                    {industry.title}
                  </h3>

                  <p className="text-sm text-ivory/80 leading-relaxed mb-6">
                    {industry.longDescription}
                  </p>

                  {/* Services tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {industry.services.map((service) => (
                      <span
                        key={service}
                        className="text-[10px] font-bold uppercase tracking-wider text-ivory/70 bg-black/40 backdrop-blur-sm border border-ivory/20 px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Arrow Action */}
                  <div className="flex items-center gap-2 text-orange text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-all duration-300">
                    <span>Explore Solutions</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Orange border glow on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange/60 rounded-2xl transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
