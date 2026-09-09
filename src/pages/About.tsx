import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import InfrastructureBackground from '../components/InfrastructureBackground';
import EcosystemNetwork from '../components/EcosystemNetwork';
import PieBurst from '../components/PieBurst';
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

const timelineData = [
  { year: '2016', title: 'Founded', desc: 'Sri Sadguru Traders (SST) was incorporated, laying the foundation for our infrastructure journey.' },
  { year: '2018', title: 'Turnkey Projects', desc: 'Expanded our operational capacity to handle end-to-end Turnkey Projects across multiple verticals.' },
  { year: '2020', title: 'Advanced Security Integration', desc: 'Scaled our expertise in CCTV, Access Control, and FAS, becoming a trusted technology partner.' },
  { year: '2024', title: 'Complete Infrastructure Execution', desc: 'Delivering comprehensive solutions spanning ATM infrastructure, networking, and critical deployments.' }
];

const marqueeItems = [
  'TURNKEY PROJECTS', 'CCTV & SURVEILLANCE', 'FIRE ALARM SYSTEMS', 'ACCESS CONTROL', 'ATM INFRASTRUCTURE', 'PA SYSTEMS'
];

const leadershipData = [
  { name: 'Leadership Name', role: 'Founder & Managing Director', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80' },
  { name: 'Leadership Name', role: 'Chief Technology Officer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Leadership Name', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80' }
];

export default function About() {
  const storyImgRef = useRef<HTMLImageElement>(null);
  const storyTextRef = useRef<HTMLDivElement>(null);
  const capsRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);
  const avmRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ceoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Story Animation
    if (storyImgRef.current && storyTextRef.current) {
      gsap.fromTo(storyImgRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: storyImgRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(storyTextRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: storyTextRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }

    // Capabilities Animation
    if (capsRef.current) {
      const cards = capsRef.current.querySelectorAll('.cap-card');
      gsap.set(cards, { opacity: 0, y: 20 });
      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' }),
        onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 20 }),
      });
    }

    // Strengths Animation
    if (strengthsRef.current) {
      const items = strengthsRef.current.querySelectorAll('.strength-item');
      gsap.set(items, { opacity: 0, y: 20 });
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }),
        onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 20 }),
      });
    }

    // People Blocks Animation
    if (peopleRef.current) {
      const blocks = peopleRef.current.querySelectorAll('.people-block');
      blocks.forEach((block) => {
        gsap.fromTo(block,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none reverse' } }
        );
      });
    }

    // Timeline Animation
    if (timelineRef.current) {
      const lineProgress = timelineRef.current.querySelector('.timeline-line-progress');
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      
      gsap.to(lineProgress, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      });

      items.forEach((item) => {
        const node = item.querySelector('.timeline-node-container');
        const content = item.querySelector('.timeline-content');
        const conn = item.querySelector('.timeline-conn-line');

        // Setup initial states
        gsap.set(content, { opacity: 0, x: item.classList.contains('left') ? -40 : 40 });
        if (node) gsap.set(node, { scale: 0.5, opacity: 0 });
        if (conn) gsap.set(conn, { scaleX: 0, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top center+=10%',
            toggleActions: 'play none none reverse'
          }
        });

        if (node) {
          tl.to(node, { scale: 1.3, opacity: 1, duration: 0.4, ease: 'back.out(2)' })
            .to(node, { scale: 1, duration: 0.2 });
        }
        if (conn) {
          tl.to(conn, { scaleX: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, "-=0.3");
        }
        if (content) {
          tl.to(content, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, "-=0.3");
        }
      });
    }

    // CEO Message Animation
    if (ceoRef.current) {
      const elements = ceoRef.current.children;
      gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', scrollTrigger: { trigger: ceoRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
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
                <PieBurst />
              </div>
            </div>
          </div>
        </section>

        {/* 2. COMPANY STORY */}
        <section className="about-story-section">
          <div className="container relative z-10">
            <span className="about-eyebrow">COMPANY STORY</span>
            <h2 className="why-headline">BUILT TO <br/><span className="text-orange">EVERY LAYER.</span></h2>
            
            <div className="story-split-grid mt-12">
              <div className="story-image-col">
                <div className="story-img-wrapper" ref={storyImgRef as any}>
                  <img src="https://i.pinimg.com/736x/26/9d/fa/269dfacea2dffa78b299da7ee976593a.jpg" alt="SST Engineering Infrastructure" className="story-img" />
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
              <span className="about-eyebrow">OUR CAPABILITIES</span>
              <h2 className="why-headline">ONE TEAM.<br/><span className="text-orange">MULTIPLE SYSTEMS.</span></h2>
              <p>We help customers navigate changing technology standards, complex deployments and evolving infrastructure requirements.</p>
            </div>
            
            <div className="caps-grid" ref={capsRef}>
              {capabilities.map((cap, idx) => (
                <div key={idx} className="cap-card">
                  <div className="cap-watermark">{(idx + 1).toString().padStart(2, '0')}</div>
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
                <div className="why-tags">
                  {['QUALITY', 'RELIABILITY', 'SAFETY', 'ENGINEERING', 'SUPPORT', 'DELIVERY'].map((tag, idx) => (
                    <span key={idx} className="why-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="why-visual-col">
                <EcosystemNetwork />
              </div>
            </div>
          </div>
        </section>

        {/* 5. TIMELINE / OUR JOURNEY */}
        <section className="about-timeline-section relative overflow-hidden">
          {/* Background Aurora */}
          <div className="timeline-aurora-bg">
             <div className="aurora-blob a-left"></div>
             <div className="aurora-blob a-right"></div>
          </div>
          {/* Technical Dot Grid overlay */}
          <div className="timeline-bg-grid"></div>
          
          <div className="container relative z-10">
            <div className="text-center">
              <span className="about-eyebrow">OUR JOURNEY</span>
              <h2 className="why-headline">MILESTONES OF<br/><span className="text-orange">GROWTH.</span></h2>
            </div>
            <div className="timeline-container" ref={timelineRef}>
              <div className="timeline-line-bg"></div>
              <div className="timeline-line-progress"></div>
              
              {timelineData.map((item, idx) => (
                <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                  {/* Central Node */}
                  <div className="timeline-node-container">
                    <div className="timeline-node-glow"></div>
                    <div className="timeline-node"></div>
                  </div>
                  
                  {/* Connection Line */}
                  <div className="timeline-conn-wrapper">
                    <div className="timeline-conn-line"></div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="timeline-content relative z-10">
                    <div className="timeline-watermark">{item.year}</div>
                    <div className="timeline-year">{item.year}</div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PARTNER MARQUEE (SERVICES TICKER) */}
        <section className="about-marquee-section">
          <div className="marquee-track">
            {/* Double the array for seamless infinite scroll */}
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="marquee-item">
                {item}
                <div className="marquee-dot"></div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. OUR PEOPLE / DELIVERY */}
        <section className="about-people-section">
          <div className="container relative z-10">
            <span className="about-eyebrow">OUR PEOPLE</span>
            <h2 className="why-headline">BUILT BY PEOPLE.<br/><span className="text-orange">DELIVERED WITH PRECISION.</span></h2>

            <div className="people-blocks mt-12" ref={peopleRef}>
              
              <div className="people-block">
                <img src="/images/timely-deliver.png" alt="Timely Delivery" className="people-bg-img" />
                <div className="people-overlay"></div>
                <div className="people-content">
                  <div className="people-content-inner">
                    <h3>TIMELY DELIVERY</h3>
                    <p>Structured execution that keeps projects moving.</p>
                  </div>
                </div>
              </div>

              <div className="people-block">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="Professional Staff" className="people-bg-img" />
                <div className="people-overlay"></div>
                <div className="people-content">
                  <div className="people-content-inner">
                    <h3>PROFESSIONAL STAFF</h3>
                    <p>Experienced engineers and technology professionals.</p>
                  </div>
                </div>
              </div>

              <div className="people-block">
                <img src="/images/tech-support.jpg" alt="Tech Support" className="people-bg-img" />
                <div className="people-overlay"></div>
                <div className="people-content">
                  <div className="people-content-inner">
                    <h3>24/7 TECH SUPPORT</h3>
                    <p>Continued support beyond project completion.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 8. CEO MESSAGE */}
        <section className="about-ceo-section">
          <div className="container relative z-10">
            <div className="ceo-grid" ref={ceoRef}>
              <div className="ceo-text-col">
                <span className="about-eyebrow">MESSAGE FROM OUR CEO</span>
                <h2 className="why-headline">
                  “We build robust infrastructure that secures and empowers your business.”
                </h2>
                <p className="ceo-desc">
                  At SST, we believe that reliability is the foundation of every successful enterprise. Our goal is to provide end-to-end turnkey solutions that seamlessly integrate technology, security, and infrastructure, allowing our clients to focus on what they do best.
                </p>
                <div className="ceo-signature">
                  <span className="ceo-name">Charvik</span>
                  <span className="ceo-title">CEO</span>
                </div>
              </div>
              <div className="ceo-image-col">
                <div className="ceo-img-wrapper">
                  <img src="/images/ceo.png" alt="Charvik, CEO" className="ceo-img" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'; }} />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 9. FINAL CTA */}
        <section className="about-cta-section">
          <div className="container relative z-10">
            <div className="cta-orange-card">
              {/* Subtle Background Elements */}
              <div className="cta-card-bg-elements">
                <div className="cta-card-dots"></div>
                <div className="cta-watermark">SST</div>
                <div className="cta-geo-line"></div>
              </div>

              <div className="cta-card-content">
                <div className="cta-card-header">
                  <h2 className="cta-headline">
                    LET'S BUILD<br/>
                    WHAT'S NEXT.
                  </h2>
                  <div className="cta-actions">
                    <Button variant="primary" to="/contact" className="cta-btn-minimal">START A PROJECT &rarr;</Button>
                  </div>
                </div>
                
                <div className="cta-card-body">
                  <p className="cta-desc">
                    From security systems to complete infrastructure execution, SST is ready to help deliver your next project.
                  </p>
                  <div className="cta-contact-minimal">
                    +91 9494 139 156 &nbsp;&middot;&nbsp; info@sstco.in
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
