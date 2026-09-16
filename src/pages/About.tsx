import React, { useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import { testimonials } from '../data/testimonials';
const InfrastructureBackground = lazy(() => import('../components/InfrastructureBackground'));
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
  { year: '2011', title: 'FOUNDATION', desc: 'Founded with a focus on ferro alloy engineering', cx: 50, cy: 420, mcy: 100 },
  { year: '2014', title: 'FIRST MAJOR CONTRACT', desc: 'Secured major industrial contracts', cx: 275, cy: 367, mcy: 250 },
  { year: '2018 / 2019', title: 'EPC EXPANSION', desc: 'Expanded into turnkey EPC projects', cx: 500, cy: 250, mcy: 400 },
  { year: '2022', title: 'GLOBAL FOOTPRINT', desc: 'Established a global project footprint', cx: 725, cy: 133, mcy: 550 },
  { year: '2026', title: 'INDUSTRY LEADERSHIP', desc: 'Delivering ferro alloy engineering solutions across global markets', cx: 950, cy: 80, mcy: 700 }
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Hero Animation
    if (heroContentRef.current) {
      const elements = heroContentRef.current.querySelectorAll('.hero-animate');
      gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.2 }
      );

      // Floating animation for globe
      const globe = heroContentRef.current.querySelector('.globe-float');
      if (globe) {
        gsap.to(globe, {
          y: -15,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1
        });
      }
    }
    
    if (heroGridRef.current) {
      const cards = heroGridRef.current.querySelectorAll('.vertical-stat-item');
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.6 }
      );
    }

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

  });

  return (
    <>
      <PageTransition>
        <style>{`
        .combined-logo-container {
          z-index: 0 !important;
        }
      `}</style>
        {/* Unified Background System */}
        <Suspense fallback={null}><InfrastructureBackground /></Suspense>

        <div className="about-page-wrapper" style={{ overflow: 'hidden' }}>

          {/* 1. ABOUT HERO */}
          <section className="about-hero-section">
            <div className="container relative z-0">
              <div className="about-hero-container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
                
                {/* Split Top Section */}
                {/* Mockup V2 Layout */}
                <div className="about-hero-split" ref={heroContentRef} style={{ position: 'relative', alignItems: 'center' }}>
                  
                  {/* Left Column: Content */}
                  <div className="hero-split-left" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="hero-animate">
                      <span className="mockup-eyebrow">ABOUT OUR COMPANY</span>
                    </div>
                    
                    <h1 className="mockup-headline hero-animate">
                      <span className="mockup-headline-navy">SRI SADGURU</span>
                      <span className="mockup-headline-orange">TRADERS</span>
                    </h1>
                    
                    <h2 className="mockup-subheadline hero-animate">
                      A REGISTERED PARTNERSHIP FIRM INCORPORATED IN OCT-2016.
                    </h2>
                    
                    <div className="mockup-overview-block hero-animate">
                      <h3 className="mockup-overview-heading">OVERVIEW</h3>
                      <p className="mockup-overview-text">
                        Our company specializes in Handling Turnkey Projects, CCTV, FAS, PA system, Access Control System, Time and Attendance System, Banking Repair & Maintenance works, Interiors, ATM Infrastructure. There is a professional team of engineers and technology professionals working within our company. We are in the process of expanding the company in different verticals of business.
                      </p>
                    </div>

                    <div className="mockup-cta-group hero-animate">
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
                    
                    {/* Decorative Background SVG Curve */}
                    <svg className="bg-curve-element hero-animate" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M400 0 C400 220.914 220.914 400 0 400" stroke="#F4511E" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="4" fill="#F4511E" />
                      <circle cx="400" cy="0" r="4" fill="#F4511E" />
                    </svg>

                    <div className="dashboard-graphic-wrapper hero-animate globe-float">
                      
                      {/* Floating Badge */}
                      <div className="floating-badge">
                        <span className="floating-badge-top">INTEGRATED SOLUTIONS</span>
                        <span className="floating-badge-bottom">FOR A SAFER TOMORROW</span>
                      </div>

                      {/* Main Dark Dashboard */}
                      <div className={`dashboard-container theme-${activeTab.toLowerCase()}`}>
                        
                        {/* Visualizations Layer */}
                        <div className="dashboard-visuals">
                          {/* Security Visualization */}
                          <div className={`visual-layer ${activeTab === 'SECURITY' ? 'active' : ''}`}>
                            <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                              {/* Background Target Grid */}
                              <pattern id="sec-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.1)" />
                              </pattern>
                              <rect width="1000" height="600" fill="url(#sec-grid)" />

                              {/* Central scan area */}
                              <circle cx="500" cy="300" r="280" fill="none" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 12" />
                              <circle cx="500" cy="300" r="400" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                              <circle cx="500" cy="300" r="150" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                              
                              {/* Rotating scan beam */}
                              <g className="security-arc">
                                <path d="M500 300 L 220 300 A 280 280 0 0 1 500 20" fill="url(#beam-grad-sec)" opacity="0.6" />
                                <path d="M500 20 A 280 280 0 0 1 780 300" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 15" opacity="0.5" />
                                <line x1="500" y1="300" x2="500" y2="20" stroke="var(--accent)" strokeWidth="2" opacity="0.8" />
                              </g>
                              <defs>
                                <linearGradient id="beam-grad-sec" x1="0%" y1="100%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
                                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
                                </linearGradient>
                              </defs>

                              {/* Target Blips */}
                              <g className="blip-container">
                                <circle cx="350" cy="180" r="3" className="blip" style={{ animationDelay: '0.5s' }} />
                                <circle cx="680" cy="220" r="2.5" className="blip" style={{ animationDelay: '3s' }} />
                                <circle cx="450" cy="400" r="3.5" className="blip" style={{ animationDelay: '1.2s' }} />
                                <circle cx="580" cy="120" r="2" className="blip" style={{ animationDelay: '4.5s' }} />
                                <circle cx="320" cy="380" r="3" className="blip" style={{ animationDelay: '6s' }} />
                                <circle cx="720" cy="420" r="2.5" className="blip" style={{ animationDelay: '2.5s' }} />
                              </g>

                              {/* Perimeter CCTV Nodes */}
                              <g transform="translate(100, 100)">
                                <circle cx="0" cy="0" r="20" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1" />
                                <circle cx="0" cy="0" r="4" fill="var(--accent)" className="pulse-node" />
                                <circle cx="0" cy="0" r="1" fill="#fff" className="pulse-glow" style={{animationDelay: '0.2s'}} />
                                <path d="M 20 0 L 80 0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                              </g>
                              <g transform="translate(850, 150)">
                                <circle cx="0" cy="0" r="25" fill="none" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="1" />
                                <circle cx="0" cy="0" r="4" fill="var(--accent)" className="pulse-node" style={{animationDelay: '1s'}} />
                                <circle cx="0" cy="0" r="1" fill="#fff" className="pulse-glow" style={{animationDelay: '0.7s'}} />
                                <path d="M -25 0 L -80 0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                              </g>
                              <g transform="translate(150, 500)">
                                <circle cx="0" cy="0" r="18" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1" />
                                <circle cx="0" cy="0" r="4" fill="var(--accent)" className="pulse-node" style={{animationDelay: '0.5s'}} />
                                <path d="M 0 -18 L 0 -60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                              </g>
                              <g transform="translate(850, 480)">
                                <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                <circle cx="0" cy="0" r="5" fill="#fff" className="pulse-node" style={{animationDelay: '1.5s'}} />
                                <circle cx="0" cy="0" r="1" fill="var(--accent)" className="pulse-glow" style={{animationDelay: '1.2s'}} />
                                <path d="M 0 -22 L 0 -60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                              </g>

                              {/* Target crosshairs */}
                              <path d="M 480 300 L 520 300 M 500 280 L 500 320" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
                            </svg>
                          </div>

                          {/* Network Visualization */}
                          <div className={`visual-layer ${activeTab === 'NETWORK' ? 'active' : ''}`}>
                            <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                              {/* Background Hex Grid */}
                              <pattern id="hex-grid" width="50" height="86.6" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
                                <path d="M25 0 L50 14.43 L50 43.3 L25 57.73 L0 43.3 L0 14.43 Z" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                              </pattern>
                              <rect width="1000" height="600" fill="url(#hex-grid)" />

                              {/* Spider Web structure (Concentric rings connecting paths) */}
                              <g className="draw-path" style={{animationDuration: '8s', animationDirection: 'normal'}}>
                                <path d="M 400 200 L 600 200 L 750 350 L 600 450 L 400 450 L 300 350 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5 5" />
                                <path d="M 300 100 L 700 80 L 950 200 L 900 500 L 600 550 L 200 500 L 50 300 Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                <path d="M 50 50 L 950 50 L 950 550 L 50 550 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                              </g>
                              
                              {/* Spreading radial connections from center to nodes */}
                              <g className="draw-path" style={{animationDuration: '6s', animationDirection: 'normal'}}>
                                <path d="M 500 300 L 300 100" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />
                                <path d="M 500 300 L 700 80" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />
                                <path d="M 500 300 L 950 200" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />
                                <path d="M 500 300 L 900 500" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />
                                <path d="M 500 300 L 600 550" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />
                                <path d="M 500 300 L 200 500" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />
                                <path d="M 500 300 L 50 300" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />
                                <path d="M 500 300 L 50 50" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />
                              </g>

                              {/* Secondary connections spreading out further */}
                              <g className="draw-path" style={{animationDuration: '6s', animationDelay: '3s', animationDirection: 'normal'}}>
                                <path d="M 300 100 L 50 50 M 300 100 L 700 80 M 700 80 L 950 200 M 600 550 L 900 500 M 600 550 L 200 500 M 50 300 L 200 500 M 50 300 L 50 50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                              </g>

                              {/* Origin Node */}
                              <circle cx="500" cy="300" r="12" fill="var(--accent)" className="pulse-glow" />
                              <circle cx="500" cy="300" r="40" fill="none" stroke="var(--accent)" strokeWidth="1" className="safety-ring" style={{animationDuration: '3s'}} />
                              <circle cx="500" cy="300" r="80" fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1" className="safety-ring" style={{animationDuration: '3s', animationDelay: '1.5s'}} />
                              <circle cx="500" cy="300" r="140" fill="none" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="1" className="safety-ring" style={{animationDuration: '4s', animationDelay: '2s'}} />

                              {/* Target Nodes */}
                              <g className="pulse-glow">
                                <circle cx="300" cy="100" r="8" fill="var(--accent)" opacity="0.8" style={{animationDelay: '1s'}} />
                                <circle cx="700" cy="80" r="10" fill="#fff" opacity="0.8" style={{animationDelay: '1.2s'}} />
                                <circle cx="950" cy="200" r="7" fill="var(--accent)" opacity="0.7" style={{animationDelay: '1.4s'}} />
                                <circle cx="900" cy="500" r="9" fill="#fff" opacity="0.8" style={{animationDelay: '1.1s'}} />
                                <circle cx="600" cy="550" r="12" fill="var(--accent)" opacity="0.6" style={{animationDelay: '1.3s'}} />
                                <circle cx="200" cy="500" r="9" fill="#fff" opacity="0.7" style={{animationDelay: '1.5s'}} />
                                <circle cx="50" cy="300" r="7" fill="var(--accent)" opacity="0.8" style={{animationDelay: '1.1s'}} />
                                <circle cx="50" cy="50" r="8" fill="#fff" opacity="0.9" style={{animationDelay: '1.4s'}} />
                              </g>
                            </svg>
                          </div>

                          {/* Safety Visualization */}
                          <div className={`visual-layer ${activeTab === 'SAFETY' ? 'active' : ''}`}>
                            <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                              {/* Background Technical Grid & Boundaries */}
                              <pattern id="safe-grid-ortho" width="30" height="30" patternUnits="userSpaceOnUse">
                                <path d="M 30 0 L 0 0 L 0 30" fill="none" stroke="var(--grid-color)" strokeWidth="0.5" />
                              </pattern>
                              <rect width="1000" height="600" fill="url(#safe-grid-ortho)" />
                              
                              <path d="M 90 70 L 910 70 L 910 530 L 90 530 Z" fill="none" stroke="var(--grid-color)" strokeWidth="1" strokeDasharray="5 15" opacity="0.4" />
                              <path d="M 100 80 L 900 80 L 900 520 L 100 520 Z" fill="rgba(26, 34, 48, 0.05)" />

                              {/* Orthogonal Wiring Paths */}
                              <g fill="none" stroke="var(--grid-color)" strokeWidth="1.5" opacity="0.8">
                                <path id="path-smoke" d="M 120 100 L 520 100 L 520 320" />
                                <path id="path-heat" d="M 880 120 L 520 120 L 520 320" />
                                <path id="path-fire" d="M 850 480 L 850 320 L 520 320" />
                                <path id="path-manual" d="M 150 450 L 150 320 L 520 320" />
                                <path id="path-monitor" d="M 300 520 L 520 520 L 520 320" />
                                <path id="path-alarm" d="M 700 80 L 700 320 L 520 320" />
                              </g>

                              {/* Signal Particles (Data traveling) - 20s loop */}
                              <g>
                                {/* Cycle 1: Smoke Detect -> Center (2s-4s) */}
                                <circle cx="0" cy="0" r="3" fill="var(--signal-pulse)" opacity="0">
                                  <animateMotion dur="20s" repeatCount="indefinite" keyTimes="0; 0.1; 0.2; 1" keyPoints="0; 0; 1; 1" calcMode="linear">
                                    <mpath href="#path-smoke" />
                                  </animateMotion>
                                  <animate attributeName="opacity" values="0; 0; 1; 1; 0; 0" keyTimes="0; 0.09; 0.1; 0.2; 0.21; 1" dur="20s" repeatCount="indefinite" />
                                </circle>

                                {/* Cycle 1: Center -> Alarm (5s-7s) */}
                                <circle cx="0" cy="0" r="3" fill="var(--signal-pulse)" opacity="0">
                                  <animateMotion dur="20s" repeatCount="indefinite" keyTimes="0; 0.25; 0.35; 1" keyPoints="1; 1; 0; 0" calcMode="linear">
                                    <mpath href="#path-alarm" />
                                  </animateMotion>
                                  <animate attributeName="opacity" values="0; 0; 1; 1; 0; 0" keyTimes="0; 0.24; 0.25; 0.35; 0.36; 1" dur="20s" repeatCount="indefinite" />
                                </circle>

                                {/* Cycle 2: Fire Detect -> Center (10s-12s) */}
                                <circle cx="0" cy="0" r="3" fill="var(--signal-pulse)" opacity="0">
                                  <animateMotion dur="20s" repeatCount="indefinite" keyTimes="0; 0.5; 0.6; 1" keyPoints="0; 0; 1; 1" calcMode="linear">
                                    <mpath href="#path-fire" />
                                  </animateMotion>
                                  <animate attributeName="opacity" values="0; 0; 1; 1; 0; 0" keyTimes="0; 0.49; 0.5; 0.6; 0.61; 1" dur="20s" repeatCount="indefinite" />
                                </circle>

                                {/* Cycle 2: Center -> Manual/Monitor (13s-15s) */}
                                <circle cx="0" cy="0" r="3" fill="var(--signal-pulse)" opacity="0">
                                  <animateMotion dur="20s" repeatCount="indefinite" keyTimes="0; 0.65; 0.75; 1" keyPoints="1; 1; 0; 0" calcMode="linear">
                                    <mpath href="#path-manual" />
                                  </animateMotion>
                                  <animate attributeName="opacity" values="0; 0; 1; 1; 0; 0" keyTimes="0; 0.64; 0.65; 0.75; 0.76; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                                
                                {/* Ambient Data Flow */}
                                <circle cx="0" cy="0" r="2" fill="var(--accent)" opacity="0.4">
                                  <animateMotion dur="10s" repeatCount="indefinite" path="M 880 120 L 520 120 L 520 320" />
                                </circle>
                                <circle cx="0" cy="0" r="2" fill="var(--accent)" opacity="0.3">
                                  <animateMotion dur="12s" repeatCount="indefinite" path="M 300 520 L 520 520 L 520 320" />
                                </circle>
                              </g>

                              {/* Center Controller */}
                              <g transform="translate(520, 320)">
                                {/* Core glows during Verification 1 (4s-5s) and 2 (12s-13s) */}
                                <circle cx="0" cy="0" r="8" fill="var(--inactive-node)">
                                  <animate attributeName="fill" values="var(--inactive-node); var(--inactive-node); var(--accent); var(--accent); var(--inactive-node); var(--inactive-node); var(--accent); var(--accent); var(--inactive-node); var(--inactive-node)" keyTimes="0; 0.19; 0.2; 0.25; 0.26; 0.59; 0.6; 0.65; 0.66; 1" dur="20s" repeatCount="indefinite" />
                                  <animate attributeName="filter" values="none; none; drop-shadow(0 0 10px var(--accent)); drop-shadow(0 0 10px var(--accent)); none; none; drop-shadow(0 0 10px var(--accent)); drop-shadow(0 0 10px var(--accent)); none; none" keyTimes="0; 0.19; 0.2; 0.25; 0.26; 0.59; 0.6; 0.65; 0.66; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                                
                                <circle cx="0" cy="0" r="20" fill="none" stroke="var(--grid-color)" strokeWidth="1" />
                                <circle cx="0" cy="0" r="30" fill="none" stroke="var(--grid-color)" strokeWidth="0.5" strokeDasharray="2 4" />
                                
                                {/* Verification verification ripple */}
                                <circle cx="0" cy="0" r="8" fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0">
                                  <animate attributeName="r" values="8; 8; 50; 50; 8; 8; 50; 50; 8" keyTimes="0; 0.2; 0.25; 0.5; 0.6; 0.65; 1; 1; 1" dur="20s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0; 0; 0.6; 0; 0; 0.6; 0; 0; 0" keyTimes="0; 0.2; 0.22; 0.25; 0.6; 0.62; 0.65; 1; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                              </g>

                              {/* N1: Smoke Detection (Detects 0s-2s) */}
                              <g transform="translate(120, 100)">
                                <circle cx="0" cy="0" r="14" fill="var(--inactive-node)" fillOpacity="0.2" stroke="var(--inactive-node)" strokeWidth="1">
                                  <animate attributeName="stroke" values="var(--inactive-node); var(--inactive-node); var(--active-response); var(--active-response); var(--inactive-node); var(--inactive-node)" keyTimes="0; 0.02; 0.05; 0.2; 0.25; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                                {/* Smoke icon */}
                                <path d="M -4 4 Q -2 0 -4 -4 M 0 4 Q 2 0 0 -4 M 4 4 Q 6 0 4 -4" fill="none" stroke="var(--inactive-node)" strokeWidth="1.5">
                                  <animate attributeName="stroke" values="var(--inactive-node); var(--inactive-node); var(--active-response); var(--active-response); var(--inactive-node); var(--inactive-node)" keyTimes="0; 0.02; 0.05; 0.2; 0.25; 1" dur="20s" repeatCount="indefinite" />
                                </path>
                                {/* Expanding detection pulse */}
                                <circle cx="0" cy="0" r="14" fill="none" stroke="var(--active-response)" strokeWidth="1.5" opacity="0">
                                  <animate attributeName="r" values="14; 14; 40; 40; 14" keyTimes="0; 0.05; 0.2; 1; 1" dur="20s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0; 0; 0.8; 0; 0" keyTimes="0; 0.05; 0.08; 0.2; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                                {/* Breathing */}
                                <circle cx="0" cy="0" r="4" fill="#fff" opacity="0.2">
                                  <animate attributeName="opacity" values="0.1; 0.5; 0.1" dur="3s" repeatCount="indefinite" />
                                </circle>
                              </g>

                              {/* N2: Heat Sensor */}
                              <g transform="translate(880, 120)">
                                <circle cx="0" cy="0" r="14" fill="var(--inactive-node)" fillOpacity="0.2" stroke="var(--inactive-node)" strokeWidth="1" />
                                {/* Thermometer icon */}
                                <path d="M 0 -6 L 0 2 A 3 3 0 1 0 0 6 A 3 3 0 0 0 0 2" fill="none" stroke="var(--inactive-node)" strokeWidth="1.5" />
                                <circle cx="0" cy="4" r="1.5" fill="var(--inactive-node)" />
                                <circle cx="0" cy="0" r="3" fill="#fff" opacity="0.2">
                                  <animate attributeName="opacity" values="0.1; 0.4; 0.1" dur="5s" repeatCount="indefinite" />
                                </circle>
                              </g>

                              {/* N3: Fire Detection (Detects 10s-12s) */}
                              <g transform="translate(850, 480)">
                                <circle cx="0" cy="0" r="14" fill="var(--inactive-node)" fillOpacity="0.2" stroke="var(--inactive-node)" strokeWidth="1">
                                  <animate attributeName="stroke" values="var(--inactive-node); var(--inactive-node); var(--active-response); var(--active-response); var(--inactive-node); var(--inactive-node)" keyTimes="0; 0.49; 0.5; 0.6; 0.65; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                                {/* Flame icon */}
                                <path d="M 0 6 C 6 6 6 0 2 -4 C 4 -2 4 2 1 4 C 0 1 -2 -2 0 -6 C -4 -2 -6 2 -6 6 C -4 6 0 6 0 6 Z" fill="none" stroke="var(--inactive-node)" strokeWidth="1.5">
                                  <animate attributeName="stroke" values="var(--inactive-node); var(--inactive-node); var(--active-response); var(--active-response); var(--inactive-node); var(--inactive-node)" keyTimes="0; 0.49; 0.5; 0.6; 0.65; 1" dur="20s" repeatCount="indefinite" />
                                </path>
                                {/* Expanding detection pulse */}
                                <circle cx="0" cy="0" r="14" fill="none" stroke="var(--active-response)" strokeWidth="1.5" opacity="0">
                                  <animate attributeName="r" values="14; 14; 40; 40; 14" keyTimes="0; 0.5; 0.6; 1; 1" dur="20s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0; 0; 0.8; 0; 0" keyTimes="0; 0.5; 0.52; 0.6; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="0" cy="0" r="4" fill="#fff" opacity="0.2">
                                  <animate attributeName="opacity" values="0.2; 0.6; 0.2" dur="4s" repeatCount="indefinite" />
                                </circle>
                              </g>

                              {/* N4: Manual Alarm (Responds 13s-15s) */}
                              <g transform="translate(150, 450)">
                                <circle cx="0" cy="0" r="14" fill="var(--inactive-node)" fillOpacity="0.2" stroke="var(--inactive-node)" strokeWidth="1">
                                  <animate attributeName="stroke" values="var(--inactive-node); var(--inactive-node); var(--active-response); var(--active-response); var(--inactive-node); var(--inactive-node)" keyTimes="0; 0.74; 0.75; 0.85; 0.9; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                                {/* Pull-station icon */}
                                <rect x="-4" y="-4" width="8" height="8" fill="none" stroke="var(--inactive-node)" strokeWidth="1.5">
                                  <animate attributeName="stroke" values="var(--inactive-node); var(--inactive-node); var(--active-response); var(--active-response); var(--inactive-node); var(--inactive-node)" keyTimes="0; 0.74; 0.75; 0.85; 0.9; 1" dur="20s" repeatCount="indefinite" />
                                </rect>
                                <path d="M -2 -1 L 2 -1 M 0 -1 L 0 2" stroke="var(--inactive-node)" strokeWidth="1">
                                  <animate attributeName="stroke" values="var(--inactive-node); var(--inactive-node); var(--active-response); var(--active-response); var(--inactive-node); var(--inactive-node)" keyTimes="0; 0.74; 0.75; 0.85; 0.9; 1" dur="20s" repeatCount="indefinite" />
                                </path>
                                {/* Response illumination pulse */}
                                <circle cx="0" cy="0" r="14" fill="none" stroke="var(--active-response)" strokeWidth="2" opacity="0">
                                  <animate attributeName="r" values="14; 14; 35; 35; 14" keyTimes="0; 0.75; 0.85; 1; 1" dur="20s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0; 0; 0.8; 0; 0" keyTimes="0; 0.75; 0.77; 0.85; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="0" cy="0" r="3" fill="#fff" opacity="0.2">
                                  <animate attributeName="opacity" values="0.2; 0.5; 0.2" dur="4.5s" repeatCount="indefinite" />
                                </circle>
                              </g>

                              {/* N5: Safety Monitor */}
                              <g transform="translate(300, 520)">
                                <circle cx="0" cy="0" r="14" fill="var(--inactive-node)" fillOpacity="0.2" stroke="var(--inactive-node)" strokeWidth="1" />
                                {/* Monitor icon */}
                                <rect x="-5" y="-4" width="10" height="8" rx="1" fill="none" stroke="var(--inactive-node)" strokeWidth="1.5" />
                                <path d="M -3 6 L 3 6 M 0 4 L 0 6" stroke="var(--inactive-node)" strokeWidth="1.5" />
                                <circle cx="0" cy="0" r="3" fill="#fff" opacity="0.2">
                                  <animate attributeName="opacity" values="0.15; 0.45; 0.15" dur="3.5s" repeatCount="indefinite" />
                                </circle>
                              </g>

                              {/* N6: Alarm/Protection (Responds 5s-7s) */}
                              <g transform="translate(700, 80)">
                                <circle cx="0" cy="0" r="14" fill="var(--inactive-node)" fillOpacity="0.2" stroke="var(--inactive-node)" strokeWidth="1">
                                  <animate attributeName="stroke" values="var(--inactive-node); var(--inactive-node); var(--active-response); var(--active-response); var(--inactive-node); var(--inactive-node)" keyTimes="0; 0.34; 0.35; 0.45; 0.5; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                                {/* Bell/speaker icon */}
                                <path d="M -4 2 L 4 2 Q 4 -4 0 -4 Q -4 -4 -4 2 Z M -2 4 Q 0 6 2 4" fill="none" stroke="var(--inactive-node)" strokeWidth="1.5">
                                  <animate attributeName="stroke" values="var(--inactive-node); var(--inactive-node); var(--active-response); var(--active-response); var(--inactive-node); var(--inactive-node)" keyTimes="0; 0.34; 0.35; 0.45; 0.5; 1" dur="20s" repeatCount="indefinite" />
                                </path>
                                {/* Response illumination pulse */}
                                <circle cx="0" cy="0" r="14" fill="none" stroke="var(--active-response)" strokeWidth="2" opacity="0">
                                  <animate attributeName="r" values="14; 14; 35; 35; 14" keyTimes="0; 0.35; 0.45; 1; 1" dur="20s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0; 0; 0.8; 0; 0" keyTimes="0; 0.35; 0.37; 0.45; 1" dur="20s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="0" cy="0" r="3" fill="#fff" opacity="0.2">
                                  <animate attributeName="opacity" values="0.1; 0.4; 0.1" dur="4s" repeatCount="indefinite" />
                                </circle>
                              </g>
                            </svg>
                          </div>

                          {/* Infrastructure Visualization */}
                          <div className={`visual-layer ${activeTab === 'INFRASTRUCTURE' ? 'active' : ''}`}>
                            <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                              {/* Background Infrastructure Grid */}
                              <path d="M 0 100 L 1000 100 M 0 200 L 1000 200 M 0 300 L 1000 300 M 0 400 L 1000 400 M 0 500 L 1000 500" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                              <path d="M 200 0 L 200 600 M 400 0 L 400 600 M 600 0 L 600 600 M 800 0 L 800 600" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                              {/* Center-Left Server Stack */}
                              <g transform="translate(380, 150) scale(1.6)">
                                <path className="iso-grid draw-path" d="M0 0 L 100 -50 L 0 -100 L -100 -50 Z" fill="rgba(255,255,255,0.01)" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="1" style={{animationDuration: '5s'}} />
                                
                                {/* Base Block */}
                                <g className="float-block" style={{animationDelay: '0s'}}>
                                  <path className="iso-block-1" d="M -40 -30 L 0 -50 L 40 -30 L 0 -10 Z" fill="rgba(11, 15, 25, 0.9)" stroke="var(--accent)" strokeWidth="1" />
                                  <path className="iso-block-1" d="M -40 -30 L -40 10 L 0 30 L 0 -10 Z" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="1" />
                                  <path className="iso-block-1" d="M 40 -30 L 40 10 L 0 30 L 0 -10 Z" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
                                  <circle cx="-20" cy="-5" r="2" fill="#fff" className="pulse-glow" />
                                  <circle cx="20" cy="-5" r="2" fill="var(--accent)" className="pulse-glow" style={{animationDelay: '1s'}} />
                                </g>

                                {/* Middle Block */}
                                <g className="float-block" style={{animationDelay: '0.2s'}}>
                                  <path className="iso-block-1" d="M -30 -60 L 0 -75 L 30 -60 L 0 -45 Z" fill="rgba(11, 15, 25, 0.9)" stroke="var(--accent)" strokeWidth="1" />
                                  <path className="iso-block-1" d="M -30 -60 L -30 -20 L 0 -5 L 0 -45 Z" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1" />
                                  <path className="iso-block-1" d="M 30 -60 L 30 -20 L 0 -5 L 0 -45 Z" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
                                  <path d="M -20 -35 L -10 -30 L -10 -25" fill="none" stroke="#fff" strokeWidth="1" className="pulse-glow" />
                                </g>

                                {/* Top Floating Layer */}
                                <g className="float-block" style={{animationDelay: '0.4s'}}>
                                  <path className="iso-block-2" d="M -20 -90 L 20 -110 L 60 -90 L 20 -70 Z" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1" />
                                  <path d="M 20 -110 L 20 -70 M -20 -90 L 60 -90" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="1" />
                                </g>
                              </g>

                              {/* Center-Right Data Storage Block */}
                              <g transform="translate(620, 220) scale(1.6)">
                                <path className="iso-grid draw-path" d="M0 0 L 100 -50 L 0 -100 L -100 -50 Z" fill="rgba(255,255,255,0.01)" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="1" style={{animationDuration: '6s'}} />
                                
                                <g className="float-block" style={{animationDelay: '0.5s'}}>
                                  <path className="iso-block-1" d="M -60 -10 L 0 -40 L 60 -10 L 0 20 Z" fill="rgba(11, 15, 25, 0.9)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                                  <path className="iso-block-1" d="M -60 -10 L -60 40 L 0 70 L 0 20 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                  <path className="iso-block-1" d="M 60 -10 L 60 40 L 0 70 L 0 20 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                  
                                  {/* Glowing data core */}
                                  <path className="pulse-glow" d="M -15 -25 L 15 -40 L 45 -25 L 15 -10 Z" fill="var(--accent)" opacity="0.8" />
                                  <path className="pulse-glow" d="M -15 -25 L -15 15 L 15 30 L 15 -10 Z" fill="var(--accent)" opacity="0.6" style={{animationDelay: '0.5s'}} />
                                  <path className="pulse-glow" d="M 45 -25 L 45 15 L 15 30 L 15 -10 Z" fill="var(--accent)" opacity="0.4" style={{animationDelay: '1s'}} />
                                </g>
                              </g>
                              
                              {/* Extra Center-Background Block */}
                              <g transform="translate(500, 60) scale(1.2)">
                                <path className="iso-grid draw-path" d="M0 0 L 100 -50 L 0 -100 L -100 -50 Z" fill="rgba(255,255,255,0.01)" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="1" style={{animationDuration: '4s'}} />
                                <g className="float-block" style={{animationDelay: '0.3s'}}>
                                  <path className="iso-block-1" d="M -30 -20 L 0 -35 L 30 -20 L 0 -5 Z" fill="rgba(11, 15, 25, 0.9)" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1" />
                                  <path className="iso-block-1" d="M -30 -20 L -30 20 L 0 35 L 0 -5 Z" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1" />
                                  <path className="iso-block-1" d="M 30 -20 L 30 20 L 0 35 L 0 -5 Z" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1" />
                                </g>
                              </g>

                              {/* Connecting conduit */}
                              <path d="M 100 250 L 380 150 L 620 220 L 850 120" fill="none" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="3" strokeDasharray="15 15" className="net-path" style={{animationDuration: '10s'}} />
                              <path className="draw-path" d="M 100 250 L 380 150 L 620 220 L 850 120" fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="1" style={{animationDuration: '3s'}} />
                              <path className="draw-path" d="M 100 300 L 380 200 L 620 270 L 850 170" fill="none" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="1" style={{animationDuration: '5s'}} />
                            </svg>
                          </div>
                        </div>

                        <div className="dashboard-inner-box">
                          <div className="dashboard-inner-top">
                            <div>
                              <div className="dashboard-inner-heading">REGIONAL COMMAND CENTER</div>
                              <div className="dashboard-inner-title">SRI SADGURU <span>TRADERS</span></div>
                            </div>
                            <div className="dashboard-est-chip">
                              EST. OCT-2016
                            </div>
                          </div>
                          
                          <div className="dashboard-chips-grid">
                            <div className={`dashboard-chip dashboard-chip-animate ${activeTab === 'SECURITY' ? 'active' : ''}`} onClick={() => setActiveTab('SECURITY')}>SECURITY</div>
                            <div className={`dashboard-chip dashboard-chip-animate ${activeTab === 'NETWORK' ? 'active' : ''}`} onClick={() => setActiveTab('NETWORK')}>NETWORK</div>
                            <div className={`dashboard-chip dashboard-chip-animate ${activeTab === 'SAFETY' ? 'active' : ''}`} onClick={() => setActiveTab('SAFETY')}>SAFETY</div>
                            <div className={`dashboard-chip dashboard-chip-animate ${activeTab === 'INFRASTRUCTURE' ? 'active' : ''}`} onClick={() => setActiveTab('INFRASTRUCTURE')}>INFRASTRUCTURE</div>
                          </div>
                        </div>

                        <div className="dashboard-footer">
                          <div className="dashboard-footer-left">
                            OPERATIONAL DISPATCH: 24/7/365
                          </div>
                          <div className="dashboard-footer-right">
                            VISAKHAPATNAM (AP) &bull; HYDERABAD (TS)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NEW VERTICAL STATS/FACTS SECTION */}
          <section className="fact-cards-section">
            <div className="container relative z-10">
              <div className="vertical-stats-list" ref={heroGridRef}>
                
                <div className="vertical-stat-item hero-animate">
                  <div className="vertical-stat-number">01</div>
                  <h4 className="vertical-stat-title">OUR EXPERIENCE</h4>
                  <div className="vertical-stat-sub">ENGINEERING-LED TECHNOLOGY SOLUTIONS</div>
                </div>
                
                <div className="vertical-stat-item hero-animate">
                  <div className="vertical-stat-number">02</div>
                  <h4 className="vertical-stat-title">OUR CAPABILITY</h4>
                  <div className="vertical-stat-sub">INTEGRATED INFRASTRUCTURE & SECURITY SYSTEMS</div>
                </div>
                
                <div className="vertical-stat-item hero-animate">
                  <div className="vertical-stat-number">03</div>
                  <h4 className="vertical-stat-title">OUR APPROACH</h4>
                  <div className="vertical-stat-sub">DESIGN &bull; DEPLOY &bull; MAINTAIN &bull; SUPPORT</div>
                </div>
                
                <div className="vertical-stat-item hero-animate">
                  <div className="vertical-stat-number">2016</div>
                  <h4 className="vertical-stat-title">ESTABLISHED</h4>
                </div>
                
                <div className="vertical-stat-item hero-animate">
                  <div className="vertical-stat-number">360&deg;</div>
                  <h4 className="vertical-stat-title">INTEGRATED SOLUTIONS</h4>
                </div>
                
                <div className="vertical-stat-item hero-animate">
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
                      <circle key={`dot-${idx}`} cx={item.cx} cy={item.cy} r={item.year === '2026' ? 8 : 6} fill="#080d12" stroke={item.year === '2026' ? "#ffffff" : "#ff4b1f"} strokeWidth={item.year === '2026' ? 4 : 2} className="curved-svg-dot" />
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
                    const is2026 = item.year === '2026';
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
                      const xs = [40, 74, 150, 226, 260];
                      const waveX = xs[idx];
                      const waveY = 800 - item.mcy;
                      return (
                        <circle key={`dot-m-${idx}`} cx={waveX} cy={waveY} r={item.year === '2026' ? 8 : 6} fill="#080d12" stroke={item.year === '2026' ? "#ffffff" : "#ff4b1f"} strokeWidth={item.year === '2026' ? 4 : 2} className="curved-svg-dot" />
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
                    const is2026 = item.year === '2026';
                    const xs = [40, 74, 150, 226, 260];
                    const waveX = xs[idx];
                    const waveY = 800 - item.mcy;
                    const topPercent = (waveY / 800) * 100;
                    
                    const textStyle: React.CSSProperties = {
                      top: `${topPercent}%`,
                      position: 'absolute',
                      width: 'calc(100vw - 120px)',
                      maxWidth: '240px',
                    };

                    // Carefully position text to avoid intersecting the diagonal line
                    if (idx === 0) {
                      textStyle.left = `calc(${(waveX / 300) * 100}% + 25px)`;
                      textStyle.transform = 'translateY(-50%)';
                      textStyle.textAlign = 'left';
                    } else if (idx === 1) {
                      textStyle.left = `calc(${(waveX / 300) * 100}% + 25px)`;
                      textStyle.transform = 'translateY(-20%)';
                      textStyle.textAlign = 'left';
                    } else if (idx === 2) {
                      // 2018: Place on right side. Restrict max-width so the long text wraps.
                      textStyle.left = `calc(${(waveX / 300) * 100}% + 15px)`;
                      textStyle.transform = 'translateY(0%)';
                      textStyle.textAlign = 'left';
                      textStyle.maxWidth = 'calc(50vw - 30px)'; // Forces "EPC projects" to wrap
                    } else if (idx === 3) {
                      // 2022: Move further left (+45px) and shift completely above the dot (-110%)
                      textStyle.right = `calc(${((300 - waveX) / 300) * 100}% + 45px)`;
                      textStyle.transform = 'translateY(-110%)';
                      textStyle.textAlign = 'right';
                    } else if (idx === 4) {
                      textStyle.right = `calc(${((300 - waveX) / 300) * 100}% + 25px)`;
                      textStyle.transform = 'translateY(-50%)';
                      textStyle.textAlign = 'right';
                    }
                    
                    return (
                      <div key={`txt-m-${idx}`} className={`curved-timeline-text-node ${is2026 ? 'highlight-text-node' : ''}`} style={textStyle}>
                        <div className="curved-timeline-year">{item.year}</div>
                        <h3 className="curved-timeline-title">{item.title}</h3>
                        {item.desc && <p className="curved-timeline-desc">{item.desc}</p>}
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
                  <img src="/images/timely-deliver.png" alt="Timely Delivery" loading="lazy" className="people-bg-img" />
                  <div className="people-overlay"></div>
                  <div className="people-content">
                    <div className="people-content-inner">
                      <h3>TIMELY DELIVERY</h3>
                      <p>Structured execution that keeps projects moving.</p>
                    </div>
                  </div>
                </div>

                <div className="people-block">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="Professional Staff" loading="lazy" className="people-bg-img" />
                  <div className="people-overlay"></div>
                  <div className="people-content">
                    <div className="people-content-inner">
                      <h3>PROFESSIONAL STAFF</h3>
                      <p>Experienced engineers and technology professionals.</p>
                    </div>
                  </div>
                </div>

                <div className="people-block">
                  <img src="/images/tech-support.jpg" alt="Tech Support" loading="lazy" className="people-bg-img" />
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
                    <img src="https://i.pinimg.com/736x/0c/04/39/0c043902008fc7d73f7a75dbbbf02158.jpg" alt="Charvik, CEO" loading="lazy" className="ceo-img" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'; }} />
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* 8.5 TESTIMONIALS */}
          <section className="about-testimonials-section" style={{ padding: '8rem 0', backgroundColor: '#0b1219' }}>
            {/* Subtle Background pattern for dark theme */}
            <div className="timeline-bg-grid" style={{ opacity: 0.5 }}></div>

            <div className="container relative z-10">
              <div className="text-center" style={{ marginBottom: '3rem' }}>
                <span className="about-eyebrow">OUR TESTIMONIALS</span>
                <h2 className="why-headline" style={{ color: 'white' }}>WHAT OUR CLIENTS <span className="text-orange">SAY.</span></h2>
              </div>
            </div>

            <div className="testimonial-marquee-container relative z-10">
              <div className="testimonial-marquee-track">
                {/* Duplicate the array to create a seamless infinite loop */}
                {[...testimonials, ...testimonials].map((testimonial, idx) => (
                  <div key={`${testimonial.id}-${idx}`} className="testimonial-card-glass">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#F4511E" opacity="0.2" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <svg key={i} className="testimonial-star" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    <p className="testimonial-text">{testimonial.text}</p>

                    <div className="testimonial-author">
                      <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                      <div>
                        <div className="testimonial-name">{testimonial.name}</div>
                        <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>Verified Client</div>
                      </div>
                    </div>
                  </div>
                ))}
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
