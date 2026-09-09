import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import ClientNetworkBackground from '../components/ClientNetworkBackground';
import { clients } from '../data/clients';
import '../styles/Clients.css';

gsap.registerPlugin(ScrollTrigger);

const TopographicalBackground = () => (
  <div className="clients-topo-container">
    <svg className="clients-topo-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Upper Topography */}
      {Array.from({ length: 15 }).map((_, i) => (
        <path 
          key={`top-${i}`} 
          d={`M-10,${15 + i*1.5} C40,${35 - i*0.8} 70,${5 - i*1.5} 110,${25 + i*1.2}`} 
        />
      ))}
      {/* Middle Topography */}
      {Array.from({ length: 15 }).map((_, i) => (
        <path 
          key={`middle-${i}`} 
          d={`M-10,${45 + i*1.5} C40,${65 - i*0.8} 70,${35 - i*1.5} 110,${55 + i*1.2}`} 
        />
      ))}
      {/* Lower Topography */}
      {Array.from({ length: 15 }).map((_, i) => (
        <path 
          key={`bottom-${i}`} 
          d={`M-10,${75 + i*1.5} C40,${95 - i*0.8} 70,${65 - i*1.5} 110,${85 + i*1.2}`} 
        />
      ))}
    </svg>
  </div>
);

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
          stagger: 0.08, 
          duration: 0.8, 
          ease: 'power3.out',
          overwrite: true
        }),
      onLeaveBack: (batch) => 
        gsap.to(batch, { 
          opacity: 0, 
          x: -50, 
          duration: 0.4,
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
        <TopographicalBackground />
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
