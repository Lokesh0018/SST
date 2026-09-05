import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { clients } from '../data/clients';
import '../styles/Clients.css';

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
      <section className="clients-hero" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="clients-hero-header">
            <div>
              <SectionHeading as="h1" highlight="INDUSTRIES.">
                TRUSTED ACROSS INDUSTRIES.
              </SectionHeading>
              <p className="clients-hero-text">
                Proud to work with leading organizations across banking, hospitality, industrial, and corporate sectors.
              </p>
            </div>
            <div className="clients-hero-right">
              <p className="clients-hero-right-text">
                Partnerships<br />That Build<br /><span className="clients-hero-right-highlight">A Safer Tomorrow.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <p className="clients-note">
            Portfolio includes demo/placeholder entries for presentation purposes
          </p>
          <div ref={gridRef} className="clients-grid">
            {clients.map((client, i) => (
              <div
                key={i}
                className="client-card clients-card"
              >
                {/* Logo placeholder */}
                <div className="clients-card-logo">
                  <span className="clients-card-logo-text">
                    {client.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <h3 className="clients-card-title">
                  {client.name}
                </h3>
                <span className="clients-card-industry">
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
