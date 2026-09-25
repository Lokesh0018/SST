import React, { useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import { testimonials } from '../data/testimonials';
import IntegrationCardDemo from '../components/ui/integration-card';
const EcosystemNetwork = lazy(() => import('../components/EcosystemNetwork'));
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
  { year: '2016', title: 'ESTABLISHED', desc: 'SST was incorporated as a registered partnership firm in October 2016.', cx: 50, cy: 420, mcy: 100 },
  { year: '2017', title: 'GST REGISTRATION', desc: 'GST liability began from 1 July 2017, establishing formal tax registration.', cx: 200, cy: 395, mcy: 200 },
  { year: '2018', title: 'GST CERTIFICATE', desc: 'Registration certificate issued on 17 July 2018.', cx: 350, cy: 332, mcy: 300 },
  { year: '2019 / 2020', title: 'INFRASTRUCTURE EXPANSION', desc: 'Expanded capabilities to include CCTV, fire & life safety, access control, and turnkey projects.', cx: 500, cy: 250, mcy: 400 },
  { year: '2021 / 2022', title: 'BROADER TECHNOLOGY', desc: 'Services expanded across wireless technology, biometrics, GPS, and networking.', cx: 650, cy: 168, mcy: 500 },
  { year: '2023 / 2024', title: 'MULTI-INDUSTRY REACH', desc: 'Spanning banking, hospitality, industrial, corporate, retail, and technology sectors.', cx: 800, cy: 105, mcy: 600 },
  { year: '2025 / Present', title: 'INTEGRATED SOLUTIONS', desc: 'Focus on integrated security, technology infrastructure, turnkey projects and maintenance.', cx: 950, cy: 80, mcy: 700 }
];

const marqueeItems = [
  'TURNKEY PROJECTS', 'CCTV & SURVEILLANCE', 'FIRE ALARM SYSTEMS', 'ACCESS CONTROL', 'ATM INFRASTRUCTURE', 'PA SYSTEMS'
];

const leadershipData = [
  { name: 'Leadership Name', role: 'Founder & Managing Director', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80' },
  { name: 'Leadership Name', role: 'Chief Technology Officer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Leadership Name', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80' }
];

const heroFeatures = [
  {
    title: "Regulatory Compliance",
    desc: "Keeping up with changing technology standards and codes to help maintain regulatory compliance.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  },
  {
    title: "Certifications & Training",
    desc: "Maintaining certifications and training employees and end users on the latest security technologies.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
  },
  {
    title: "IP-Based Framework",
    desc: "Creating a seamless physical security framework for environments from enterprise to Smart Home.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
  },
  {
    title: "Complex Deployments",
    desc: "Taking on multisite installations with tight deadlines while minimizing costs, risks, and on-site labor.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 17 22 12"></polyline></svg>
  },
  {
    title: "Diversifying Business",
    desc: "Security-adjacent product lines such as professional audio/video, wireless, and connected lighting systems.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"></path><path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path></svg>
  },
  {
    title: "Geographic Reach",
    desc: "Maintaining access to inventory and identifying qualified subcontractors to partner with you.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
  }
];

export default function About() {
  const storyTextRef = useRef<HTMLDivElement>(null);
  const capsRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);
  const avmRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const ceoRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const storyImageColRef = useRef<HTMLDivElement>(null);
  const capsCenterRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroGridRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'SECURITY' | 'NETWORK' | 'SAFETY' | 'INFRASTRUCTURE'>('SECURITY');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCert, setActiveCert] = useState<1 | 2>(1);
  const certGstRef = useRef<HTMLDivElement>(null);
  const certUdyamRef = useRef<HTMLDivElement>(null);
  const prevCertRef = useRef<1 | 2>(1);
  const certTlRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  useGSAP(() => {
    if (!certGstRef.current || !certUdyamRef.current) return;
    
    const frontState = { x: 0, y: 0, z: 0, scale: 1, rotateY: 0, rotateX: 0, opacity: 1, zIndex: 3 };
    const backState = { x: 18, y: 14, z: -30, scale: 0.97, rotateY: -5, rotateX: 2, opacity: 0.8, zIndex: 1 };
    const passingState = { x: -70, y: 15, z: -10, scale: 0.98, rotateY: -2, rotateX: 1 };

    const isGSTFront = activeCert === 1;
    const frontEl = isGSTFront ? certGstRef.current : certUdyamRef.current;
    const backEl = isGSTFront ? certUdyamRef.current : certGstRef.current;

    if (prevCertRef.current === activeCert) {
      // Initial set
      gsap.set(frontEl, frontState);
      gsap.set(backEl, backState);
    } else {
      // Run animation
      if (certTlRef.current) certTlRef.current.kill();
      
      const tl = gsap.timeline();
      certTlRef.current = tl;

      const movingBackEl = backEl; // The one that WAS front
      const movingFrontEl = frontEl; // The one that WAS back

      tl.to(movingBackEl, {
        ...passingState,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(movingBackEl, { zIndex: 1 });
          gsap.set(movingFrontEl, { zIndex: 3 });
        }
      })
      .to(movingBackEl, {
        ...backState,
        duration: 0.35,
        ease: 'power2.inOut'
      })
      .to(movingFrontEl, {
        ...frontState,
        duration: 0.4,
        ease: 'power2.inOut'
      }, "-=0.4");
    }
    prevCertRef.current = activeCert;
  }, { dependencies: [activeCert] });

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Hero animations removed to rely on Framer Motion PageTransition and prevent route-change disappearing bugs

    // Dashboard chips animation
    if (heroContentRef.current) {
      const chips = heroContentRef.current.querySelectorAll('.dashboard-chip-animate');
      if (chips.length > 0) {
        gsap.fromTo(chips,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)', delay: 1.2 }
        );
      }
    }

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

      if (logoContainerRef.current && capsCenterRef.current) {        // 2nd ScrollTrigger: Story to Caps Center
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
    const animateTimeline = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      const nodes = ref.current.querySelectorAll('.curved-timeline-text-node');
      const path = ref.current.querySelector('.curved-timeline-path');
      const svgDots = ref.current.querySelectorAll('.curved-svg-dot');

      if (path) {
        // Add a buffer to the calculated length.
        // Some browsers slightly undercalculate getTotalLength(), causing a small gap at the end of the stroke.
        const length = (path as SVGPathElement).getTotalLength() + 50;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
      }

      gsap.fromTo(svgDots,
        { scale: 0, opacity: 0, transformOrigin: 'center' },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.3,
          ease: 'back.out(1.5)',
          delay: 0.2,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.to(nodes, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.3,
        ease: 'power3.out',
        delay: 0.4,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      const logoGlow = ref.current.querySelector('.travelling-logo-glow');
      if (logoGlow) {
        gsap.to(logoGlow, {
          opacity: 1,
          duration: 1,
          delay: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    };

    animateTimeline(timelineRef);
    animateTimeline(mobileTimelineRef);

    // Stats Counter Animation
    if (timelineRef.current) {
      const stats = timelineRef.current.parentElement?.querySelectorAll('.stat-num-value');
      if (stats) {
        stats.forEach((stat) => {
          const target = parseFloat(stat.getAttribute('data-target') || '0');
          gsap.fromTo(stat,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                toggleActions: "restart none none reset"
              }
            }
          );
        });
      }
    }

    // CEO Message Animation
    if (ceoRef.current) {
      const elements = ceoRef.current.children;
      gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', scrollTrigger: { trigger: ceoRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }

    // Digital Compliance Dossier Animations
    if (!prefersReducedMotion) {
      gsap.to('.cert-doc-1', { y: '-=8', duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.cert-doc-2', { y: '-=5', duration: 3.5, delay: 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.cert-doc-3', { y: '-=3', duration: 4.5, delay: 1, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }

  }, { dependencies: [] });

  return (
    <>
      <PageTransition>
        <style>{`
        .combined-logo-container {
          z-index: 0 !important;
        }
      `}</style>
        {/* Unified Background System */}

        <div className="about-page-wrapper" style={{ overflow: 'hidden' }}>

          {/* 1. ABOUT HERO */}
          <section className="about-hero-section">
            {/* Ambient Tech Glows */}
            <div className="about-hero-glow-blob orange"></div>
            <div className="about-hero-glow-blob blue"></div>
            
            <div className="container relative z-10">
              <div className="about-hero-container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
                
                {/* Split Top Section */}
                {/* Mockup V2 Layout */}
                <div className="about-hero-split" ref={heroContentRef} style={{ position: 'relative', alignItems: 'center' }}>
                  
                  {/* Left Column: Content */}
                  <div className="hero-split-left" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="">
                      <span className="mockup-eyebrow">ABOUT OUR COMPANY</span>
                    </div>
                    
                    <h1 className="mockup-headline ">
                      <span className="mockup-headline-navy">SRI SADGURU</span>
                      <span className="mockup-headline-orange">TRADERS</span>
                    </h1>
                    
                    <h2 className="mockup-subheadline ">
                      A REGISTERED PARTNERSHIP FIRM INCORPORATED IN OCT-2016.
                    </h2>
                    
                    <div className="mockup-overview-block ">
                      <h3 className="mockup-overview-heading">OVERVIEW</h3>
                      <p className="mockup-overview-text">
                        Our company specializes in Handling Turnkey Projects, CCTV, FAS, PA system, Access Control System, Time and Attendance System, Banking Repair & Maintenance works, Interiors, ATM Infrastructure. There is a professional team of engineers and technology professionals working within our company. We are in the process of expanding the company in different verticals of business.
                      </p>
                    </div>

                    <div className="mockup-cta-group ">
                      <a href="/contact" className="btn btn-primary">
                        Start a Project &rarr;
                      </a>
                      <a href="/services" className="btn-outline-secondary">
                        Our Services
                      </a>
                    </div>
                  </div>
                  
                  {/* Right Column: Custom UI Dashboard */}
                  <div className="hero-split-right" style={{ position: 'relative', zIndex: 2 }}>
                    <IntegrationCardDemo />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NEW VERTICAL STATS/FACTS SECTION */}
          <section className="fact-cards-section">
            <div className="container relative z-10">
              <div className="vertical-stats-list" ref={heroGridRef}>
                
                <div className="vertical-stat-item ">
                  <div className="vertical-stat-number">01</div>
                  <h4 className="vertical-stat-title">OUR EXPERIENCE</h4>
                  <div className="vertical-stat-sub">ENGINEERING-LED TECHNOLOGY SOLUTIONS</div>
                </div>
                
                <div className="vertical-stat-item ">
                  <div className="vertical-stat-number">02</div>
                  <h4 className="vertical-stat-title">OUR CAPABILITY</h4>
                  <div className="vertical-stat-sub">INTEGRATED INFRASTRUCTURE & SECURITY SYSTEMS</div>
                </div>
                
                <div className="vertical-stat-item ">
                  <div className="vertical-stat-number">03</div>
                  <h4 className="vertical-stat-title">OUR APPROACH</h4>
                  <div className="vertical-stat-sub">DESIGN &bull; DEPLOY &bull; MAINTAIN &bull; SUPPORT</div>
                </div>
                
                <div className="vertical-stat-item ">
                  <div className="vertical-stat-number">2016</div>
                  <h4 className="vertical-stat-title">ESTABLISHED</h4>
                </div>
                
                <div className="vertical-stat-item ">
                  <div className="vertical-stat-number">360&deg;</div>
                  <h4 className="vertical-stat-title">INTEGRATED SOLUTIONS</h4>
                </div>
                
                <div className="vertical-stat-item ">
                  <div className="vertical-stat-number">END-TO-END</div>
                  <h4 className="vertical-stat-title">PROJECT SUPPORT</h4>
                  <div className="vertical-stat-sub" style={{display: 'none'}}></div>
                </div>
                
              </div>
            </div>
          </section>

          {/* 2. COMPANY STORY */}
          <section className="about-story-section">
            <div className="container relative z-10">
              <span className="about-eyebrow">COMPANY STORY</span>
              <h2 className="why-headline">BUILT TO <br /><span className="text-orange">EVERY LAYER.</span></h2>

              <div className="story-split-grid mt-12">
                <div className="story-image-col" ref={storyImageColRef} style={{ minHeight: '400px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: '40px', paddingLeft: '40px' }}>
                  <div className="relative pointer-events-none" ref={logoContainerRef}>
                    <div ref={logoRef} className="relative z-20 flex items-center justify-center" style={{ width: '250px', height: '250px' }}>
                      <div className="logo-bg-mask absolute inset-0 rounded-full"></div>
                      <img src="/images/logo/LOGO.png" alt="SST Logo" className="relative z-10" style={{ width: '250px', height: '250px', maxWidth: '250px', maxHeight: '250px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))' }} />
                    </div>
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
          <section className="about-caps-section" style={{ position: 'relative' }}>
            <div ref={capsCenterRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10px', height: '10px', pointerEvents: 'none' }}></div>
            <div className="container relative z-10">
              <div className="caps-header">
                <span className="about-eyebrow">OUR CAPABILITIES</span>
                <h2 className="why-headline">ONE TEAM.<br /><span className="text-orange">MULTIPLE SYSTEMS.</span></h2>
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
                  <h2 className="why-headline">RELIABILITY IS<br /><span className="text-orange">THE FOUNDATION.</span></h2>
                  <p className="why-desc">
                    To meet customer's expectations on quality performance and reliability, we are committed to strive for excellence in all our ability to deliver solutions within the defined parameters as we help to maximize performance of our customers, while understanding their needs and achieving them. We are result-driven and focused towards ensuring safe working environment, constant improvement in all processes and complying with all legal requirements.
                  </p>
                  <div className="why-tags" style={{ marginBottom: '2rem' }}>
                    {['QUALITY', 'RELIABILITY', 'SAFETY', 'ENGINEERING', 'SUPPORT', 'DELIVERY'].map((tag, idx) => (
                      <span key={idx} className="why-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="avm-container" ref={avmRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                    <div className="avm-item">
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F4511E' }}>OUR AIM</h3>
                      <p style={{ fontSize: '1rem', fontWeight: 500 }}>WORLD CLASS SECURITY FOR YOUR NEEDS</p>
                    </div>
                    <div className="avm-item">
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F4511E' }}>OUR VISION</h3>
                      <p style={{ fontSize: '1rem', fontWeight: 500 }}>TO BE THE COMPANY YOU CAN TRUST</p>
                    </div>
                    <div className="avm-item">
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F4511E' }}>OUR MISSION</h3>
                      <p style={{ fontSize: '1rem', fontWeight: 500 }}>TO BE THE ONE-STOP SOLUTION</p>
                    </div>
                  </div>
                </div>
                <div className="why-visual-col">
                  <Suspense fallback={null}><EcosystemNetwork /></Suspense>
                </div>
              </div>
            </div>
          </section>

          {/* 5. TIMELINE / OUR JOURNEY */}
          <section className="about-timeline-section relative overflow-hidden">
            <div className="container relative z-10 timeline-container">
              <div className="text-center timeline-header">
                <h2 className="timeline-hero-headline">15 YEARS OF <span className="text-orange">ENGINEERING EXCELLENCE</span></h2>
                <p className="timeline-subtitle">Engineering expertise. Global impact. Built to last.</p>
              </div>

              <div className="timeline-container-responsive">
                {/* Desktop Timeline */}
                <div className="curved-timeline-wrapper desktop-timeline" ref={timelineRef}>
                  <svg className="curved-timeline-svg" viewBox="0 0 1000 500" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                        <stop offset="50%" stopColor="rgba(255, 75, 31, 0.5)" />
                        <stop offset="100%" stopColor="#ff4b1f" />
                      </linearGradient>
                      <filter id="lineGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* The continuous path */}
                    <path id="desktop-path" className="curved-timeline-path" d="M 50 420 C 350 420, 650 80, 950 80" stroke="url(#timelineGradient)" filter="url(#lineGlow)" fill="none" strokeWidth="2" />
                    
                    {/* The SVG Dots */}
                    {timelineData.map((item, idx) => (
                      <circle key={`dot-${idx}`} cx={item.cx} cy={item.cy} r={item.year === '2025 / Present' ? 8 : 6} fill="#080d12" stroke={item.year === '2025 / Present' ? "#ffffff" : "#ff4b1f"} strokeWidth={item.year === '2025 / Present' ? 4 : 2} className="curved-svg-dot" />
                    ))}

                    {/* The Travelling Logo */}
                    <g className="travelling-logo-glow" style={{ opacity: 0 }}>
                      <image href="/images/logo/LOGO.png" x="-18" y="-18" width="36" height="36" preserveAspectRatio="xMidYMid meet" />
                      <animateMotion dur="15s" repeatCount="indefinite">
                        <mpath href="#desktop-path" />
                      </animateMotion>
                    </g>
                  </svg>

                  {/* HTML Text Overlay */}
                  {timelineData.map((item, idx) => {
                    const is2026 = item.year === '2025 / Present';
                    const positionClass = idx % 2 === 0 ? 'text-above' : 'text-below';
                    
                    const leftPercent = (item.cx / 1000) * 100;
                    const topPercent = (item.cy / 500) * 100;

                    return (
                      <div key={`txt-${idx}`} className={`curved-timeline-text-node ${positionClass} ${is2026 ? 'highlight-text-node' : ''}`} style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}>
                        <div className="curved-timeline-year">{item.year}</div>
                        <h3 className="curved-timeline-title">{item.title}</h3>
                        {item.desc && <p className="curved-timeline-desc">{item.desc}</p>}
                      </div>
                    )
                  })}
                </div>

                {/* Mobile Timeline */}
                <div className="curved-timeline-wrapper mobile-timeline" ref={mobileTimelineRef}>
                  <svg className="curved-timeline-svg" viewBox="0 0 300 800" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="timelineGradientMobile" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                        <stop offset="50%" stopColor="rgba(255, 75, 31, 0.5)" />
                        <stop offset="100%" stopColor="#ff4b1f" />
                      </linearGradient>
                      <filter id="lineGlowMobile" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* The continuous path - single S-curve from bottom-left to top-right */}
                    <path id="mobile-path" className="curved-timeline-path" d="M 40 700 C 40 500, 260 300, 260 100" stroke="url(#timelineGradientMobile)" filter="url(#lineGlowMobile)" fill="none" strokeWidth="2" strokeLinecap="round" />
                    
                    {/* The SVG Dots */}
                    {timelineData.map((item, idx) => {
                      // X coordinates exactly tracking the new Bezier curve
                      const xs = [40, 56.3, 97, 150, 203, 243.7, 260];
                      const waveX = xs[idx];
                      const waveY = 800 - item.mcy;
                      return (
                        <circle key={`dot-m-${idx}`} cx={waveX} cy={waveY} r={item.year === '2025 / Present' ? 8 : 6} fill="#080d12" stroke={item.year === '2025 / Present' ? "#ffffff" : "#ff4b1f"} strokeWidth={item.year === '2025 / Present' ? 4 : 2} className="curved-svg-dot" />
                      );
                    })}

                    {/* The Travelling Logo */}
                    <g className="travelling-logo-glow" style={{ opacity: 0 }}>
                      <image href="/images/logo/LOGO.png" x="-18" y="-18" width="36" height="36" preserveAspectRatio="xMidYMid meet" />
                      <animateMotion dur="15s" repeatCount="indefinite">
                        <mpath href="#mobile-path" />
                      </animateMotion>
                    </g>
                  </svg>

                  {/* HTML Text Overlay */}
                  {timelineData.map((item, idx) => {
                    const is2026 = item.year === '2025 / Present';
                    const xs = [40, 56.3, 97, 150, 203, 243.7, 260];
                    const waveX = xs[idx];
                    const waveY = 800 - item.mcy;
                    const topPercent = (waveY / 800) * 100;
                    
                    const textStyle: React.CSSProperties = {
                      top: `${topPercent}%`,
                      position: 'absolute',
                      width: 'calc(100vw - 120px)',
                      maxWidth: '180px', // slightly smaller width since no description
                    };

                    // Without descriptions, we can place them a bit closer and cleaner
                    if (idx <= 3) {
                      textStyle.left = `calc(${(waveX / 300) * 100}% + 25px)`;
                      textStyle.transform = 'translateY(-50%)';
                      textStyle.textAlign = 'left';
                    } else {
                      textStyle.right = `calc(${((300 - waveX) / 300) * 100}% + 25px)`;
                      textStyle.transform = 'translateY(-50%)';
                      textStyle.textAlign = 'right';
                    }
                    
                    return (
                      <div key={`txt-m-${idx}`} className={`curved-timeline-text-node ${is2026 ? 'highlight-text-node' : ''}`} style={textStyle}>
                        <div className="curved-timeline-year">{item.year}</div>
                        <h3 className="curved-timeline-title">{item.title}</h3>
                        {/* Description hidden on mobile for cleaner look */}
                      </div>
                    )
                  })}
                </div>
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
              <h2 className="why-headline">BUILT BY PEOPLE.<br /><span className="text-orange">DELIVERED WITH PRECISION.</span></h2>

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

          {/* CERTIFICATIONS & REGISTRATIONS - DIGITAL COMPLIANCE DOSSIER */}
          <section className="about-certifications-section">
            <div className="cert-bg-glow"></div>
            <div className="cert-bg-glow-2"></div>
            <div className="cert-bg-circles"></div>
            
            <div className="container relative z-10">
              <span className="about-eyebrow">CERTIFICATIONS & REGISTRATIONS</span>
              <h2 className="why-headline">REGISTERED & <br /><span className="text-orange">RECOGNIZED.</span></h2>
              
              <div className="cert-split-grid">
                <div className="cert-text-col">
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>BUILT ON TRUST. BACKED BY COMPLIANCE.</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem', maxWidth: '600px', marginBottom: '2.5rem' }}>
                    Official business registrations that reflect our commitment to operating transparently and professionally.
                  </p>
                  
                  <div className="cert-verification-timeline">
                    <div className="cert-timeline-node">
                      <div className="cert-timeline-dot"></div>
                      REGISTERED
                    </div>
                    <div className="cert-timeline-arrow">&rarr;</div>
                    <div className="cert-timeline-node">
                      <div className="cert-timeline-dot"></div>
                      VERIFIED
                    </div>
                    <div className="cert-timeline-arrow">&rarr;</div>
                    <div className="cert-timeline-node active">
                      <div className="cert-timeline-dot"></div>
                      ACTIVE
                    </div>
                    <div className="cert-timeline-arrow">&rarr;</div>
                    <div className="cert-timeline-node">
                      <div className="cert-timeline-dot"></div>
                      COMPLIANT
                    </div>
                  </div>
                  
                  <div className="cert-links-container">
                    <a href="/certificates/GST.pdf" target="_blank" rel="noopener noreferrer" className="cert-link-card" 
                       onMouseEnter={(e) => {
                         setActiveCert(1);
                         gsap.to(e.currentTarget, { x: 5, duration: 0.3, ease: 'power2.out' });
                         gsap.to(e.currentTarget.querySelector('.cert-link-icon'), { scale: 1.1, duration: 0.3 });
                         gsap.to(e.currentTarget.querySelector('.cert-link-arrow-text'), { opacity: 1, x: 0, duration: 0.3 });
                       }}
                       onMouseLeave={(e) => {
                         gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: 'power2.out' });
                         gsap.to(e.currentTarget.querySelector('.cert-link-icon'), { scale: 1, duration: 0.3 });
                         gsap.to(e.currentTarget.querySelector('.cert-link-arrow-text'), { opacity: 0, x: -10, duration: 0.3 });
                       }}>
                      <div className="cert-card-number">01</div>
                      <div className="cert-link-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      </div>
                      <div className="cert-link-text">
                        <h4>GST Registration</h4>
                        <span className="cert-subtitle">Goods & Services Tax</span>
                        <div className="cert-card-status">VERIFIED &bull; ACTIVE</div>
                      </div>
                      <div className="cert-link-arrow">
                        <span className="cert-link-arrow-text">VIEW CERTIFICATE</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </a>
                    
                    <a href="/certificates/Udayam.pdf" target="_blank" rel="noopener noreferrer" className="cert-link-card"
                       onMouseEnter={(e) => {
                         setActiveCert(2);
                         gsap.to(e.currentTarget, { x: 5, duration: 0.3, ease: 'power2.out' });
                         gsap.to(e.currentTarget.querySelector('.cert-link-icon'), { scale: 1.1, duration: 0.3 });
                         gsap.to(e.currentTarget.querySelector('.cert-link-arrow-text'), { opacity: 1, x: 0, duration: 0.3 });
                       }}
                       onMouseLeave={(e) => {
                         gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: 'power2.out' });
                         gsap.to(e.currentTarget.querySelector('.cert-link-icon'), { scale: 1, duration: 0.3 });
                         gsap.to(e.currentTarget.querySelector('.cert-link-arrow-text'), { opacity: 0, x: -10, duration: 0.3 });
                       }}>
                      <div className="cert-card-number">02</div>
                      <div className="cert-link-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                      </div>
                      <div className="cert-link-text">
                        <h4>Udyam Registration</h4>
                        <span className="cert-subtitle">MSME</span>
                        <div className="cert-card-status">VERIFIED &bull; ACTIVE</div>
                      </div>
                      <div className="cert-link-arrow">
                        <span className="cert-link-arrow-text">VIEW CERTIFICATE</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="cert-visual-col">
                  <div className="cert-stats-bg">
                    <div className="cert-stats-num">02</div>
                    <div className="cert-stats-label">ACTIVE <span>CREDENTIALS</span></div>
                  </div>
                  
                  <div className="cert-docs-wrapper">
                    <div className="cert-doc-layer cert-doc-3"></div>
                    
                    {/* Udyam Certificate Layer */}
                    <div ref={certUdyamRef} className="cert-doc-layer cert-doc-content">
                      {activeCert === 2 && <div className="cert-scan-line"></div>}
                      
                      <div className="cert-doc-header">
                        <div className="cert-doc-title">CERTIFICATE<br/>REGISTRATION</div>
                        <div className="cert-doc-num">02</div>
                      </div>
                      
                      <div className="cert-doc-body">
                        <div className="cert-doc-h">UDYAM</div>
                        <div className="cert-abstract-lines">
                          <div className="cert-abstract-line w-3-4"></div>
                          <div className="cert-abstract-line w-full"></div>
                          <div className="cert-abstract-line w-1-2"></div>
                          <div className="cert-abstract-line w-full" style={{ marginTop: '0.5rem' }}></div>
                          <div className="cert-abstract-line w-3-4"></div>
                        </div>
                      </div>
                      
                      <div className="cert-doc-footer">
                        <div className="cert-doc-status">
                          <div className="cert-doc-status-item">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            VERIFIED
                          </div>
                          <div className="cert-doc-status-item" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            ACTIVE
                          </div>
                        </div>
                        {activeCert === 2 && <div className="cert-doc-seal"></div>}
                      </div>
                    </div>
                    
                    {/* GST Certificate Layer */}
                    <div ref={certGstRef} className="cert-doc-layer cert-doc-content">
                      {activeCert === 1 && <div className="cert-scan-line"></div>}
                      
                      <div className="cert-doc-header">
                        <div className="cert-doc-title">CERTIFICATE<br/>REGISTRATION</div>
                        <div className="cert-doc-num">01</div>
                      </div>
                      
                      <div className="cert-doc-body">
                        <div className="cert-doc-h">GST</div>
                        <div className="cert-abstract-lines">
                          <div className="cert-abstract-line w-full"></div>
                          <div className="cert-abstract-line w-3-4"></div>
                          <div className="cert-abstract-line w-1-2"></div>
                          <div className="cert-abstract-line w-full" style={{ marginTop: '0.5rem' }}></div>
                          <div className="cert-abstract-line w-3-4"></div>
                        </div>
                      </div>
                      
                      <div className="cert-doc-footer">
                        <div className="cert-doc-status">
                          <div className="cert-doc-status-item">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            VERIFIED
                          </div>
                          <div className="cert-doc-status-item" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            ACTIVE
                          </div>
                        </div>
                        {activeCert === 1 && <div className="cert-doc-seal"></div>}
                      </div>
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
                </div>

                <div className="cta-card-content">
                  <div className="cta-card-header">
                    <h2 className="cta-headline">
                      LET'S BUILD<br />
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
    </>
  );
}
