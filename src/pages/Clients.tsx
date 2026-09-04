import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { clients } from '../data/clients';

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.client-card');
    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-40 pb-16" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <SectionHeading as="h1" highlight="INDUSTRIES.">
                TRUSTED ACROSS INDUSTRIES.
              </SectionHeading>
              <p className="mt-6 text-base text-charcoal/60 leading-relaxed max-w-lg">
                Proud to work with leading organizations across banking, hospitality, industrial, and corporate sectors.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-charcoal/30 leading-relaxed">
                Partnerships<br />That Build<br /><span className="text-orange">A Safer Tomorrow.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <p className="text-xs text-charcoal/40 uppercase tracking-widest mb-8">
            Portfolio includes demo/placeholder entries for presentation purposes
          </p>
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clients.map((client, i) => (
              <div
                key={i}
                className="client-card group p-8 rounded-xl bg-cream/40 border border-cream-dark/20 flex flex-col items-center justify-center text-center
                  hover:border-orange/30 hover:shadow-[0_4px_20px_rgba(241,90,36,0.08)] hover:scale-[1.02] transition-all duration-300 cursor-default"
              >
                {/* Logo placeholder */}
                <div className="w-16 h-16 rounded-full bg-cream-dark/30 flex items-center justify-center mb-3 group-hover:bg-orange/10 transition-colors duration-300">
                  <span className="text-lg font-extrabold text-charcoal/30 group-hover:text-orange transition-colors duration-300">
                    {client.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-charcoal/60 group-hover:text-charcoal transition-colors duration-300">
                  {client.name}
                </h3>
                <span className="text-[10px] font-medium uppercase tracking-widest text-charcoal/30 mt-1">
                  {client.industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
