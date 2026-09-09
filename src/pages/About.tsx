import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import InfrastructureBackground from '../components/InfrastructureBackground';
import EcosystemNetwork from '../components/EcosystemNetwork';
import '../styles/About.css';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  'COMPLIANCE & STANDARDS',
  'SECURITY TECHNOLOGY',
  'IP-BASED INTEGRATION',
  'COMPLEX DEPLOYMENTS',
  'CONNECTED SYSTEMS',
  'SUPPLY & FIELD SUPPORT'
];

const strengths = [
  {
    title: 'Comprehensive Security Integration',
    desc: 'Seamlessly integrate intrusion detection, wireless technology, and video surveillance.'
  },
  {
    title: 'Advanced Intrusion Detection',
    desc: 'State-of-the-art sensors, alarms, and notification mechanisms to deter unauthorized access.'
  },
  {
    title: 'Wireless Flexibility',
    desc: 'Deploy robust wireless infrastructure for adaptable and scalable security networks.'
  },
  {
    title: 'Remote Monitoring & Management',
    desc: 'Monitor your premises in real-time from anywhere with enhanced situational awareness.'
  },
  {
    title: 'High-Definition Video Quality',
    desc: 'Clear, detailed footage ensuring accurate identification and analysis of events.'
  },
  {
    title: 'Intelligent Analytics',
    desc: 'Detect anomalies, track movements, and gain valuable insights for security operations.'
  }
];

export default function About() {
  const storyImgRef = useRef<HTMLImageElement>(null);
  const storyTextRef = useRef<HTMLDivElement>(null);
  const capsRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);
  const avmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Story Animation
    if (storyImgRef.current && storyTextRef.current) {
      gsap.fromTo(storyImgRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: storyImgRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(storyTextRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: storyTextRef.current, start: 'top 80%' } }
      );
    }

    // Capabilities Animation
    if (capsRef.current) {
      const cards = capsRef.current.querySelectorAll('.cap-card');
      gsap.set(cards, { opacity: 0, y: 20 });
      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' }),
      });
    }

    // Strengths Animation
    if (strengthsRef.current) {
      const items = strengthsRef.current.querySelectorAll('.strength-item');
      gsap.set(items, { opacity: 0, y: 20 });
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }),
      });
    }

    // People Blocks Animation
    if (peopleRef.current) {
      const blocks = peopleRef.current.querySelectorAll('.people-block');
      blocks.forEach((block) => {
        gsap.fromTo(block,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: block, start: 'top 85%' } }
        );
      });
    }

    // AVM Columns Animation
    if (avmRef.current) {
      const cols = avmRef.current.querySelectorAll('.avm-col');
      gsap.fromTo(cols,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: avmRef.current, start: 'top 80%' } }
      );
    }

  }, []);

  return (
    <PageTransition>
      {/* Unified Background System */}
      <InfrastructureBackground />

      <div className="about-page-wrapper">
        
        {/* 1. ABOUT HERO */}
        <section className="about-hero-section">
          <div className="container relative z-10">
            <div className="about-hero-grid">
              <div className="about-hero-left">
                <span className="about-eyebrow">ABOUT SST</span>
                <h1 className="about-headline">
                  ENGINEERED FOR<br />
                  <span className="text-orange">REAL-WORLD</span><br />
                  ENVIRONMENTS.
                </h1>
                <h2 className="about-subheadline">Welcome to Sri Sadguru Traders (SST)</h2>
                <p className="about-body">
                  SRI SADGURU TRADERS is a registered partnership firm incorporated in October 2016. We specialize in turnkey projects, CCTV, FAS, PA systems, access control, time and attendance systems, banking repair & maintenance, interiors and ATM infrastructure.
                </p>
              </div>
              <div className="about-hero-right">
                {/* Abstract background density naturally visible here */}
              </div>
            </div>
          </div>
        </section>

        {/* 2. COMPANY STORY */}
        <section className="about-story-section">
          <div className="container relative z-10">
            <SectionHeading as="h2" highlight="CONNECT">
              BUILT TO 
            </SectionHeading>
            <h2 className="about-section-headline" style={{marginTop: '-1rem'}}>EVERY LAYER.</h2>
            
            <div className="story-split-grid mt-12">
              <div className="story-image-col">
                <div className="story-img-wrapper" ref={storyImgRef as any}>
                  <img src="/images/about bg.png" alt="SST Engineering" className="story-img" />
                  <div className="story-img-brackets"></div>
                </div>
              </div>
              <div className="story-text-col" ref={storyTextRef}>
                <div className="story-marker-line"></div>
                <div className="story-text-content">
                  <p>SRI SADGURU TRADERS is a registered partnership firm incorporated in Oct-2016.</p>
                  <p>Our company specializes in handling turnkey projects, CCTV, FAS, PA systems, Access Control Systems, Time and Attendance Systems, Banking Repair & Maintenance works, Interiors and ATM Infrastructure.</p>
                  <p>There is a professional team of engineers and technology professionals working within our company. We are continuously expanding the company into different verticals of business.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT WE DO / OUR CAPABILITIES */}
        <section className="about-caps-section">
          <div className="container relative z-10">
            <div className="caps-header">
              <h2>ONE TEAM.<br/>MULTIPLE SYSTEMS.</h2>
              <p>We help customers navigate changing technology standards, complex deployments and evolving infrastructure requirements.</p>
            </div>
            
            <div className="caps-grid" ref={capsRef}>
              {capabilities.map((cap, idx) => (
                <div key={idx} className="cap-card">
                  <div className="cap-hover-line"></div>
                  <div className="cap-content">
                    <span className="cap-num">{(idx + 1).toString().padStart(2, '0')}</span>
                    <div className="cap-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                    </div>
                    <h3 className="cap-title">{cap}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. WHY CHOOSE SST */}
        <section className="about-why-section">
          <div className="container relative z-10">
            <div className="why-grid">
              <div className="why-text-col">
                <span className="about-eyebrow">WHY SST</span>
                <h2 className="why-headline">RELIABILITY IS<br/><span className="text-orange">THE FOUNDATION.</span></h2>
                <p className="why-desc">
                  To meet customer expectations for quality, performance and reliability, we continuously strive for excellence while delivering solutions within defined parameters.
                </p>
              </div>
              <div className="why-visual-col">
                <EcosystemNetwork />
              </div>
            </div>
          </div>
        </section>

        {/* 5. STRENGTHS / FEATURES */}
        <section className="about-strengths-section">
          <div className="container relative z-10">
            <div className="strengths-grid" ref={strengthsRef}>
              {strengths.map((s, idx) => (
                <div key={idx} className="strength-item">
                  <div className="strength-header">
                    <span className="strength-num">{(idx + 1).toString().padStart(2, '0')}</span>
                    <svg className="strength-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. OUR PEOPLE / DELIVERY */}
        <section className="about-people-section">
          <div className="container relative z-10">
            <SectionHeading as="h2" highlight="PEOPLE.">
              BUILT BY
            </SectionHeading>
            <h2 className="about-section-headline" style={{marginTop: '-1rem'}}>DELIVERED WITH PRECISION.</h2>

            <div className="people-blocks mt-12" ref={peopleRef}>
              <div className="people-block">
                <div className="people-visual">
                  <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" alt="Timely Delivery" />
                  <div className="people-brackets"></div>
                </div>
                <div className="people-content">
                  <h3>TIMELY DELIVERY</h3>
                  <p>Structured execution that keeps projects moving.</p>
                </div>
              </div>
              <div className="people-block">
                <div className="people-visual">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="Professional Staff" />
                  <div className="people-brackets"></div>
                </div>
                <div className="people-content">
                  <h3>PROFESSIONAL STAFF</h3>
                  <p>Experienced engineers and technology professionals.</p>
                </div>
              </div>
              <div className="people-block">
                <div className="people-visual">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" alt="Tech Support" />
                  <div className="people-brackets"></div>
                </div>
                <div className="people-content">
                  <h3>24/7 TECH SUPPORT</h3>
                  <p>Continued support beyond project completion.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. AIM / VISION / MISSION */}
        <section className="about-avm-section">
          <div className="container relative z-10">
            <div className="avm-columns" ref={avmRef}>
              <div className="avm-col">
                <div className="avm-bg-pattern"></div>
                <span className="avm-num">01</span>
                <div className="avm-line"></div>
                <h3>AIM</h3>
                <p>World-class security for your needs</p>
              </div>
              <div className="avm-col">
                <div className="avm-bg-pattern"></div>
                <span className="avm-num">02</span>
                <div className="avm-line"></div>
                <h3>VISION</h3>
                <p>To be the company you can trust</p>
              </div>
              <div className="avm-col">
                <div className="avm-bg-pattern"></div>
                <span className="avm-num">03</span>
                <div className="avm-line"></div>
                <h3>MISSION</h3>
                <p>To be the one-stop solution</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="about-cta-section">
          <div className="container relative z-10 text-center">
            <h2 className="cta-headline">
              LET'S BUILD<br/>
              <span className="text-orange">WHAT'S NEXT.</span>
            </h2>
            <p className="cta-desc">
              From security systems to complete infrastructure execution, SST is ready to help deliver your next project.
            </p>
            <div className="cta-actions">
              <Button variant="primary" size="lg">START A PROJECT &rarr;</Button>
            </div>
            <div className="cta-contact">
              <p>+91 9494 139 156</p>
              <p>info@sstco.in</p>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
