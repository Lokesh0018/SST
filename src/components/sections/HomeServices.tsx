import { useRef, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useTransform, useSpring, useMotionValue, useScroll, useMotionValueEvent } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import { services as allServices } from '../../data/services';
import { useServiceContext } from '../../context/ServiceContext';
import '../../styles/HomeServices.css';

import React from 'react';
import { 
  Camera, Lock, Network, Zap, Flame, Truck, Wifi, Wrench, Briefcase, 
  Shield, Server, ShieldCheck, Monitor, Cpu, Smartphone, Activity,
  LockOpen, Cloud, Layers, Globe, GitMerge, Share2, Database, Layout,
  Home, Grid, Code, Building
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const serviceIcons: Record<string, React.JSX.Element> = {
  camera: <Camera size={32} strokeWidth={1} />,
  lock: <Lock size={32} strokeWidth={1} />,
  network: <Network size={32} strokeWidth={1} />,
  zap: <Zap size={32} strokeWidth={1} />,
  flame: <Flame size={32} strokeWidth={1} />,
  truck: <Truck size={32} strokeWidth={1} />,
  wifi: <Wifi size={32} strokeWidth={1} />,
  tool: <Wrench size={32} strokeWidth={1} />,
  wrench: <Wrench size={32} strokeWidth={1} />,
  briefcase: <Briefcase size={32} strokeWidth={1} />,
  shield: <Shield size={32} strokeWidth={1} />,
  server: <Server size={32} strokeWidth={1} />,
  'shield-check': <ShieldCheck size={32} strokeWidth={1} />,
  monitor: <Monitor size={32} strokeWidth={1} />,
  cpu: <Cpu size={32} strokeWidth={1} />,
  smartphone: <Smartphone size={32} strokeWidth={1} />,
  activity: <Activity size={32} strokeWidth={1} />,
  'lock-open': <LockOpen size={32} strokeWidth={1} />,
  cloud: <Cloud size={32} strokeWidth={1} />,
  layers: <Layers size={32} strokeWidth={1} />,
  globe: <Globe size={32} strokeWidth={1} />,
  'git-merge': <GitMerge size={32} strokeWidth={1} />,
  'share-2': <Share2 size={32} strokeWidth={1} />,
  database: <Database size={32} strokeWidth={1} />,
  layout: <Layout size={32} strokeWidth={1} />,
  home: <Home size={32} strokeWidth={1} />,
  grid: <Grid size={32} strokeWidth={1} />,
  code: <Code size={32} strokeWidth={1} />,
  building: <Building size={32} strokeWidth={1} />,
};

const slugToId: Record<string, string> = {
  'turnkey-projects': 'TURNKEY',
  'video-surveillance': 'CCTV',
  'access-control': 'ACCESS',
  'servers-storage': 'INFRASTRUCTURE', 
  'switches-routing': 'INFRASTRUCTURE', 
  'logistics-gps-solutions': 'LOGISTICS',
  'fire-fighting': 'SAFETY',
  'electrical-electronics': 'ELECTRICAL',
  'intrusion-detection': 'INTRUSION',
  'hardware-tools': 'HARDWARE',
  'wireless-technology': 'WIRELESS',
  'network-infrastructure': 'NETWORK',
};

const services = allServices.filter(s => slugToId[s.slug]);
const TOTAL_IMAGES = services.length;

const formatTitle = (title: string) => {
  const parts = title.split(' ');
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}<br />{parts[1]}
      </>
    );
  }
  if (parts.length > 2) {
    return (
      <>
        {parts[0]}<br />{parts.slice(1).join(' ')}
      </>
    );
  }
  return title;
};

const ServicesBackground = () => (
  <div className="home-services-bg" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: -1, overflow: 'hidden' }}>
    <div className="ambient-orb orb-orange" style={{ opacity: 0.3 }}></div>
    <div className="ambient-orb orb-blue" style={{ opacity: 0.3 }}></div>
    
    <div className="radar-pulse-container">
      <div className="radar-ring"></div>
      <div className="radar-ring"></div>
      <div className="radar-ring"></div>
    </div>
  </div>
);

const HomeServices = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { setActiveService, setIsUserInteracting } = useServiceContext();

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => observer.disconnect();
  }, []);

  // --- Scroll-Linked Animation (Replaces Wheel Hijacking & Timers) ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Snappy Rubber-Band Physics (Heavier mass, looser damping)
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 15, mass: 1.5 });

  // Map scroll progress to rotation:
  // From 0 to 0.75: Rotate the arc fully so the last card reaches the center.
  // From 0.75 to 1: Keep the rotation at 360 (paused) while the user keeps scrolling, holding the last card in the center before unpinning.
  const scrollRotate = useTransform(smoothProgress, [0, 0.75], [0, 360], { clamp: true });
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 80, damping: 12, mass: 1.2 });



  const [rotateValue, setRotateValue] = useState(0);

  useEffect(() => {
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    return () => {
      unsubscribeRotate();
    };
  }, [smoothScrollRotate]);

  const handleMouseEnter = (slug: string) => {
    setIsUserInteracting(true);
    const id = slugToId[slug];
    if (id) {
      setActiveService(id);
    }
  };

  const handleMouseLeave = () => {
    setIsUserInteracting(false);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section ref={sectionRef} className="home-services-section" style={{ minHeight: '350vh' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, overflow: 'hidden' }}>
        <ServicesBackground />
        
        {/* Header */}
        <div
            style={{ position: 'relative', zIndex: 10, flexShrink: 0, paddingTop: '10vh' }}
            className="container home-services-header"
        >
          <div className="home-services-title-wrapper">
            <span className="home-services-section-label">02 / SERVICES</span>
            <SectionHeading
              highlight="ONE VISION."
              subtitle="Integrated systems. Smarter infrastructure. Greater possibilities."
            >
              COMPLETE SERVICES UNDER ONE VISION.
            </SectionHeading>
          </div>
          <Link to="/services" className="home-services-link">
            Explore All Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Main Coverflow Container */}
        <div className="home-services-carousel-wrapper" style={{ flexGrow: 1, height: '100%' }}>
            
            <div className="home-services-coverflow" style={{ height: '100%' }}>
                {services.map((service, i) => {
                        const isMobile = containerSize.width < 768;
                        const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                        const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                        
                        // Pull the arc up so cards aren't cut off at the bottom
                        const arcApexY = isMobile ? -20 : -90;
                        const arcCenterY = arcApexY + arcRadius;

                        const step = isMobile ? 22 : 16;
                        const maxRotation = (TOTAL_IMAGES - 1) * step;
                        const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                        const boundedRotation = -scrollProgress * maxRotation;

                        const currentArcAngle = -90 + (i * step) + boundedRotation;
                        const arcRad = (currentArcAngle * Math.PI) / 180;
                        
                        // Focus Effect: Calculate distance from apex (-90 degrees)
                        const distanceFromApex = Math.abs(currentArcAngle + 90);
                        const apexScale = isMobile ? 0.9 : 1.15;
                        const sideScale = isMobile ? 0.65 : 0.8;
                        const dynamicScale = Math.max(sideScale, apexScale - (distanceFromApex / 40) * (apexScale - sideScale));
                        const dynamicOpacity = Math.max(0.2, 1 - (distanceFromApex / 50) * 0.8);
                        const dynamicZIndex = 100 - Math.floor(distanceFromApex);

                        let target = {
                            x: Math.cos(arcRad) * arcRadius,
                            y: Math.sin(arcRad) * arcRadius + arcCenterY,
                            rotation: currentArcAngle + 90,
                            scale: dynamicScale, 
                            opacity: dynamicOpacity,
                            zIndex: dynamicZIndex
                        };

                    // Fallback for targetZIndex if not set inside target
                    const targetZIndex = target.zIndex !== undefined ? target.zIndex : i;

                    return (
                        <motion.div
                            key={i}
                            animate={{
                                x: target.x,
                                y: target.y,
                                rotate: target.rotation,
                                scale: target.scale,
                                opacity: target.opacity,
                                zIndex: targetZIndex
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 40,
                                damping: 15,
                            }}
                            style={{ 
                                position: 'absolute',
                                transformStyle: "preserve-3d",
                                perspective: "1000px"
                            }}
                            className="coverflow-card-container"
                        >
                            <Link
                                to={`/services#${service.slug}`}
                                className={`service-card home-services-card motif-${service.slug}`}
                                onMouseEnter={() => { handleMouseEnter(service.slug); }}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleCardMouseMove}
                                style={{ 
                                    pointerEvents: target.opacity === 0 ? 'none' : 'auto',
                                    backgroundImage: `linear-gradient(to bottom, rgba(8, 15, 31, 0.0) 0%, rgba(8, 15, 31, 0.6) 100%), url(${service.heroImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="card-content-wrapper" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '1.5rem' }}>
                                    <div className="card-top-row" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <span className="home-services-card-icon">
                                            {serviceIcons[service.icon]}
                                        </span>
                                    </div>
                                    <div className="card-bottom-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                                        <h3 className="home-services-card-title" style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                                            {formatTitle(service.shortTitle)}
                                        </h3>
                                        <div className="card-explore" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F4511E' }}>
                                            <span className="home-services-card-action-text" style={{ fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em' }}>EXPLORE</span>
                                            <svg
                                                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                className="home-services-card-action-icon"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
