import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import ClientNetworkBackground from '../components/ClientNetworkBackground';
import TopographicalBackground from '../components/common/TopographicalBackground';
import { clients } from '../data/clients';
import '../styles/Clients.css';

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.client-logo-card');
    
    // Set initial state
    gsap.set(cards, { opacity: 0, x: -50 });

    ScrollTrigger.batch(cards, {
      start: 'top 85%',
      onEnter: (batch) => 
        gsap.to(batch, { 
          opacity: 1, 
          x: 0, 
          stagger: 0.03, 
          duration: 0.4, 
          ease: 'power3.out',
          overwrite: true
        }),
      onLeaveBack: (batch) => 
        gsap.to(batch, { 
          opacity: 0, 
          x: -50, 
          duration: 0.2,
          overwrite: true
        })
    });
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="clients-hero">
        <ClientNetworkBackground />
        <div className="container">
          <div className="clients-hero-header">
            <div>
              <SectionHeading as="h1" highlight="TRUST">
                BRANDS THAT TRUST US.
              </SectionHeading>
              <p className="clients-hero-text">
                We are proud to have partnered with some of the industry's leading companies, delivering top-tier solutions across various sectors.
              </p>
            </div>
            <div className="clients-hero-right">
              <p className="clients-hero-right-text">
                Proven Track Record<br />
                <span className="clients-hero-right-highlight">Excellence</span><br />
                Delivered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section 
        ref={sectionRef}
        className="clients-section"
        onMouseMove={(e) => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
          sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
        }}
      >
        <TopographicalBackground className="clients-topo-container" />
        <div className="container">
          <div ref={gridRef} className="client-logos-grid">
            {clients.map((client) => (
              <div key={client.id} className="client-logo-card">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="client-logo-img"
                />
                <div className="client-logo-tooltip">{client.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
