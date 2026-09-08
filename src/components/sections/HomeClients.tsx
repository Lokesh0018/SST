import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import '../../styles/HomeClients.css';

gsap.registerPlugin(ScrollTrigger);

const row1Logos = [
  'seagate.svg',
  'flipkart.svg',
  'sbi.svg',
  'HDFC.svg',
  'HSBC.svg',
  'Kotak.svg',
  'Federal-bank.svg',
  'Canara-Bank.svg',
  'Muthoot-Finance.svg',
  'Edelweiss.svg',
  'Mahindra_Finance.svg',
  'bajajfinserv.svg',
  'Swiggy.svg',
  'Lenskart.png',
  'lifestyle.png',
].map(name => `/images/logo/${name}`);

const row2Logos = [
  'max.svg',
  'reliance-fresh.svg',
  'Spencer\'s Retail Logo PNG.png',
  'Andhra Paper Limited.png',
  'four-points-by-sheraton.svg',
  'Courtyard.svg',
  'southern-spice.svg',
  'Blackberry.svg',
  'CommScope.svg',
  'Dahua_Technology.svg',
  'GEF.svg',
  'Greentech.png',
  'Ruckus.png',
  'Toshiba.svg',
  'uniview.svg',
].map(name => `/images/logo/${name}`);

const ClientLogo = ({ src }: { src: string }) => {
  return (
    <img 
      src={src} 
      alt="Client Logo" 
      className="home-clients-logo-img"
      loading="lazy"
    />
  );
};

export default function HomeClients() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.home-clients-logo-card'),
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
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
    <section ref={sectionRef} className="section-padding home-clients-section">
      {/* Subtle Technical Network Layer */}
      <div className="home-clients-network-bg" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="network-pattern" width="300" height="300" patternUnits="userSpaceOnUse">
            <path d="M 0,150 L 300,150 M 150,0 L 150,300" stroke="rgba(28, 28, 27, 0.03)" strokeWidth="1" />
            <circle cx="150" cy="150" r="2" fill="rgba(244, 81, 30, 0.3)" className="network-node pulse-slow" />
            <circle cx="50" cy="50" r="1.5" fill="rgba(244, 81, 30, 0.15)" className="network-node" />
            <circle cx="250" cy="250" r="1.5" fill="rgba(244, 81, 30, 0.15)" className="network-node pulse-fast" />
            <path d="M 50,50 L 150,150 L 250,250" stroke="rgba(28, 28, 27, 0.02)" strokeWidth="0.5" className="network-line" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#network-pattern)" />
        </svg>
      </div>

      <div className="container">
        <div className="home-clients-header">
          <div className="home-clients-title-group">
            <span className="home-clients-eyebrow">TRUSTED BY INDUSTRY LEADERS</span>
            <SectionHeading
              highlight="REAL-WORLD"
              subtitle="Trusted by teams building what’s next."
            >
              ENGINEERED FOR REAL-WORLD ENVIRONMENTS.
            </SectionHeading>
          </div>

          <div className="home-clients-cta-group">
            <span className="home-clients-count">30+ CLIENTS</span>
            <Link to="/clients" className="home-clients-cta">
              VIEW ALL CLIENTS
              <svg
                className="home-clients-cta-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Logo Marquee Wrapper */}
      <div className="home-clients-marquee-wrapper">
        
        {/* TRACK 1: Scrolls Left */}
        <div className="home-clients-marquee home-clients-marquee-left">
          <div className="home-clients-marquee-track track-1">
            <div className="home-clients-marquee-group">
              {row1Logos.map((src, i) => (
                <div key={`t1-g1-${i}`} className="home-clients-logo-card">
                  <ClientLogo src={src} />
                </div>
              ))}
            </div>
            <div className="home-clients-marquee-group">
              {row1Logos.map((src, i) => (
                <div key={`t1-g2-${i}`} className="home-clients-logo-card">
                  <ClientLogo src={src} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRACK 2: Scrolls Right */}
        <div className="home-clients-marquee home-clients-marquee-right">
          <div className="home-clients-marquee-track track-2">
            <div className="home-clients-marquee-group">
              {row2Logos.map((src, i) => (
                <div key={`t2-g1-${i}`} className="home-clients-logo-card">
                  <ClientLogo src={src} />
                </div>
              ))}
            </div>
            <div className="home-clients-marquee-group">
              {row2Logos.map((src, i) => (
                <div key={`t2-g2-${i}`} className="home-clients-logo-card">
                  <ClientLogo src={src} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Technical Divider */}
      <div className="container">
        <div className="home-clients-technical-divider">
          <div className="divider-line"></div>
          <div className="divider-node"></div>
          <div className="divider-line-short"></div>
        </div>
      </div>
    </section>
  );
}
