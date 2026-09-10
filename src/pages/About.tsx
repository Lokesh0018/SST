import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
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
  const storyTextRef = useRef<HTMLDivElement>(null);
  const capsRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);
  const avmRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ceoRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const storyImageColRef = useRef<HTMLDivElement>(null);
  const capsCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Story Animation
    if (storyTextRef.current) {
      gsap.fromTo(storyTextRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: storyTextRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }

    // Logo Animation (replacing PieBurst)
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.3, duration: 1.5, ease: 'power3.out' }
      );
      
      if (logoContainerRef.current && storyImageColRef.current) {
        gsap.fromTo(logoRef.current,
          { scale: 1.3, x: 0, y: 0 },
          {
            scrollTrigger: {
              trigger: ".about-story-section",
              start: "top bottom", 
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true
            },
            x: () => {
              if (!storyImageColRef.current || !logoContainerRef.current) return 0;
              const target = storyImageColRef.current.getBoundingClientRect();
              const source = logoContainerRef.current.getBoundingClientRect();
              return (target.left + target.width / 2) - (source.left + source.width / 2);
            },
            y: () => {
              if (!storyImageColRef.current || !logoContainerRef.current) return 0;
              const target = storyImageColRef.current.getBoundingClientRect();
              const source = logoContainerRef.current.getBoundingClientRect();
              return (target.top + target.height / 2) - (source.top + source.height / 2);
            },
            scale: 1,
            ease: "power1.inOut",
            immediateRender: false
          }
        );

        // 2nd ScrollTrigger: Story to Caps Center
        gsap.to(logoRef.current, {
          scrollTrigger: {
            trigger: ".about-story-section",
            start: "center center", 
            endTrigger: ".about-caps-section",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true
          },
          x: () => {
            if (!capsCenterRef.current || !logoContainerRef.current) return 0;
            const target = capsCenterRef.current.getBoundingClientRect();
            const source = logoContainerRef.current.getBoundingClientRect();
            return (target.left + target.width / 2) - (source.left + source.width / 2);
          },
          y: () => {
            if (!capsCenterRef.current || !logoContainerRef.current) return 0;
            const target = capsCenterRef.current.getBoundingClientRect();
            const source = logoContainerRef.current.getBoundingClientRect();
            return (target.top + target.height / 2) - (source.top + source.height / 2);
          },
          scale: 1.5,
          ease: "power1.inOut",
          immediateRender: false
        });

        // Fade out the logo images
        gsap.to(logoRef.current.querySelectorAll('img'), {
          scrollTrigger: {
            trigger: ".about-story-section",
            start: "center center", 
            endTrigger: ".about-caps-section",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true
          },
          opacity: 0.15,
          ease: "power1.inOut",
          immediateRender: false
        });

        // Fade in the blur mask to block background floating objects
        const mask = logoRef.current.querySelector('.logo-bg-mask');
        if (mask) {
          gsap.to(mask, {
            scrollTrigger: {
              trigger: ".about-story-section",
              start: "center center", 
              endTrigger: ".about-caps-section",
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true
            },
            opacity: 1,
            ease: "power1.inOut",
            immediateRender: false
          });
        }

        // 3rd ScrollTrigger: Keep it fixed in the center of the screen indefinitely
        ScrollTrigger.create({
          trigger: ".about-caps-section",
          start: "center center",
          end: "+=50000", // Keep it pinned forever so it never unpins at the bottom
          pin: logoRef.current,
          pinSpacing: false,
          pinType: "fixed"
        });

        // 4th ScrollTrigger: Fade out completely before the CTA section so it doesn't reach the footer
        gsap.to(logoRef.current, {
          scrollTrigger: {
            trigger: ".about-cta-section",
            start: "top bottom",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true
          },
          opacity: 0,
          ease: "power1.inOut",
          immediateRender: false
        });

        const services = logoRef.current.querySelector('.logo-services');
        if (services) {
          gsap.fromTo(services, 
            { rotation: 0 },
            {
              scrollTrigger: {
                trigger: ".about-story-section",
                start: "top bottom", 
                end: "center center", 
                scrub: 1
              },
              rotation: 360,
              ease: "none",
              immediateRender: false
            }
          );
        }
      }
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
    <>
      <PageTransition>
        <style>{`
        .combined-logo-container {
          z-index: 0 !important;
        }
      `}</style>
      {/* Unified Background System */}
      <InfrastructureBackground />

      <div className="about-page-wrapper" style={{ overflow: 'hidden' }}>
        
        {/* 1. ABOUT HERO */}
        <section className="about-hero-section">
          <div className="container relative z-0">
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
              <div className="about-hero-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} ref={logoContainerRef}>
                <div ref={logoRef} className="combined-logo-container" style={{ position: 'relative', width: '100%', maxWidth: '550px', aspectRatio: '1/1', zIndex: 0 }}>
                  <div className="logo-bg-mask" style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(250,250,250,0.95) 20%, rgba(250,250,250,0) 70%)', opacity: 0, zIndex: 0, pointerEvents: 'none' }}></div>
                  <img className="logo-services" src="/images/logo/services.png" alt="SST Services" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
                  <img className="logo-globe" src="/images/logo/globe.png" alt="SST Globe" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 2 }} />
                </div>
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
              <div className="story-image-col" ref={storyImageColRef} style={{ minHeight: '400px' }}>
                {/* Image removed, logo will animate here */}
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
        <section className="about-caps-section" style={{ position: 'relative' }}>
          <div ref={capsCenterRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10px', height: '10px', pointerEvents: 'none' }}></div>
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
        <section className="about-marquee-section" style={{ position: 'relative', zIndex: 20 }}>
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
          {/* Decorative Background Items */}
          <div className="ceo-bg-elements">
            <div className="ceo-bg-dots"></div>
            <div className="ceo-bg-circle"></div>
            <div className="ceo-watermark">SST</div>
          </div>
          <div className="container relative z-10">
            <div className="ceo-grid" ref={ceoRef}>
              <div className="ceo-text-col">
                <span className="about-eyebrow">MESSAGE FROM OUR MANAGING DIRECTOR</span>
                <h2 className="why-headline">
                  “We build robust infrastructure that secures and empowers your business.”
                </h2>
                <p className="ceo-desc">
                  At SST, we believe that reliability is the foundation of every successful enterprise. Our goal is to provide end-to-end turnkey solutions that seamlessly integrate technology, security, and infrastructure, allowing our clients to focus on what they do best.
                </p>
                <div className="ceo-signature">
                  <span className="ceo-name">Mahesh Varma Gottumukkala</span>
                  <span className="ceo-title">Managing Director at Sri Sadguru Traders</span>
                </div>
              </div>
              <div className="ceo-image-col">
                <div className="ceo-img-wrapper">
                  <img src="https://i.pinimg.com/736x/0c/04/39/0c043902008fc7d73f7a75dbbbf02158.jpg" alt="Charvik, CEO" className="ceo-img" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'; }} />
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

    {/* WhatsApp Floating Button */}
    <a 
      href="https://wa.me/919494139156" 
      target="_blank" 
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
      <span>Chat with us</span>
    </a>
  </>
  );
}
