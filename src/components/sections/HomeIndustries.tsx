import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import { industries } from '../../data/industries';

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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <SectionHeading
            highlight="INDUSTRY."
            subtitle="Tailored infrastructure solutions for diverse environments."
          >
            SOLUTIONS FOR EVERY INDUSTRY.
          </SectionHeading>

          <div className="hidden md:block text-right">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/40 leading-relaxed">
              Different Industries.<br />
              <span className="text-orange">A Stronger Tomorrow.</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((industry, i) => (
            <Link
              key={industry.slug}
              to="/industries"
              className="industry-card group relative h-[320px] lg:h-[380px] rounded-xl overflow-hidden cursor-pointer shadow-[0_4px_24px_rgba(23,22,19,0.06)]"
            >
              {/* Photographic Background */}
              <img
                src={industry.image}
                alt={industry.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay for text readability */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(180deg, rgba(23,22,19,0.1) 0%, rgba(23,22,19,0.7) 60%, rgba(23,22,19,0.95) 100%)',
                }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-ivory mb-1 group-hover:text-orange transition-colors duration-300">
                  {industry.title}
                </h3>
                <p className="text-xs text-ivory/80 leading-relaxed mb-3 line-clamp-2">
                  {industry.description}
                </p>
                <div className="flex items-center gap-2 text-orange text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span>Explore</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Orange border glow on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange/60 rounded-xl transition-colors duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
