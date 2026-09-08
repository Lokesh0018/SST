import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero3DScene from '../three/Hero3DScene';
import { useServiceContext } from '../../context/ServiceContext';
import '../../styles/HeroSection.css';

const services = [
  { id: 'TURNKEY', label: 'TURNKEY PROJECTS', desc: 'End-to-end execution of complex security and infrastructure deployments, delivered on time and at scale.' },
  { id: 'CCTV', label: 'CCTV / VIDEO SURVEILLANCE', desc: 'Advanced AI-powered monitoring systems for comprehensive perimeter and internal security.' },
  { id: 'ACCESS', label: 'ACCESS CONTROL', desc: 'Biometric and RFID-based access management to secure critical facilities and streamline entry.' },
  { id: 'INFRASTRUCTURE', label: 'SWITCHES & STORAGE', desc: 'High-availability networking hardware and secure data storage solutions for enterprise environments.' },
  { id: 'LOGISTICS', label: 'LOGISTICS', desc: 'Precision supply chain management ensuring critical hardware arrives exactly when and where needed.' },
  { id: 'SAFETY', label: 'FIRE FIGHTING', desc: 'State-of-the-art detection and suppression systems designed for rapid response and asset protection.' },
  { id: 'ELECTRICAL', label: 'ELECTRICAL & ELECTRONICS', desc: 'Robust power distribution and custom electronics integration for fail-safe operations.' },
  { id: 'INTRUSION', label: 'INTRUSION DETECTION', desc: 'Multi-layered sensor networks that identify and report breaches instantly.' },
  { id: 'HARDWARE', label: 'HARDWARE & TOOLS', desc: 'Industrial-grade equipment and specialized tools for rigorous infrastructure maintenance.' },
  { id: 'WIRELESS', label: 'WIRELESS TECH', desc: 'High-bandwidth, low-latency wireless communication networks for remote connectivity.' },
  { id: 'NETWORK', label: 'NETWORK INFRASTRUCTURE', desc: 'Scalable fiber and copper backbones providing the foundation for all integrated systems.' },
];

const CYCLE_INTERVAL = 5500; // 5.5 seconds

export default function HeroSection() {
  const { activeService, setActiveService, isUserInteracting, setIsUserInteracting } = useServiceContext();
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-cycling logic
  useEffect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      setActiveService((prev: string | null) => {
        const currentIndex = services.findIndex(s => s.id === prev);
        const nextIndex = (currentIndex + 1) % services.length;
        return services[nextIndex].id;
      });
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, [isUserInteracting]);

  // When user hovers a service node, pause auto-cycling temporarily
  const handleUserSetActive = useCallback((serviceId: string | null) => {
    if (serviceId) {
      setIsUserInteracting(true);
      setActiveService(serviceId);

      // Clear existing timeout
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }

      // Resume auto-cycling after 8 seconds of no interaction
      interactionTimeoutRef.current = setTimeout(() => {
        setIsUserInteracting(false);
      }, 8000);
    }
  }, []);

  const activeIndex = services.findIndex(s => s.id === activeService);

  return (
    <section className="hero-section">
      
      {/* Background Layer */}
      <div className="hero-bg-layer">
        {/* Extremely subtle grid */}
        <div
          className="hero-bg-grid"
          style={{
            backgroundImage: `
              linear-gradient(rgba(216,207,190,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(216,207,190,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Noise Texture Overlay */}
        <div className="hero-bg-noise" />

        {/* Premium atmospheric radial gradient behind the globe on the right side */}
        <div className="hero-bg-gradient" />
      </div>

      <div className="hero-container">
        
        {/* LEFT COLUMN: Typography */}
        <div className="hero-content-col">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-tagline"
          >
            <span className="hero-tagline-dot" />
            INTEGRATED INFRASTRUCTURE & SECURITY
          </motion.p>

          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.1 }
              }
            }}
            className="hero-title"
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} style={{ display: 'block' }}>ONE PARTNER.</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} style={{ display: 'block' }}>COMPLETE</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="hero-title-highlight" style={{ display: 'block' }}>INFRASTRUCTURE.</motion.span>
          </motion.h1>
          
          <div className="hero-description-container">
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeService}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="hero-description"
              >
                {services[activeIndex >= 0 ? activeIndex : 0].desc}
              </motion.p>
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hero-cta-group"
          >
            {/* Primary CTA */}
            <Link to="/services" className="group hero-cta-primary">
              Explore Services
              <span className="hero-cta-arrow">
                <span className="hero-cta-arrow-head" />
              </span>
            </Link>
            
            {/* Secondary CTA */}
            <Link to="/about" className="group hero-cta-secondary">
              Watch Our Story
              <span className="hero-cta-arrow">
                <span className="hero-cta-arrow-head" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D Scene + Ecosystem Panel */}
        <div className="hero-visual-col">
          
          {/* 3D Canvas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            transition={{ 
              opacity: { duration: 1.5, delay: 0.2, ease: "easeOut" },
              scale: { duration: 1.5, delay: 0.2, ease: "easeOut" },
              y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
            }}
            className="hero-visual-wrapper"
          >
            <div className="hero-visual-inner">
              <Hero3DScene 
                activeService={activeService} 
                setActiveService={handleUserSetActive}
              />
            </div>
          </motion.div>

          {/* Geographic Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="hero-geo-indicator"
          >
            <span className="hero-geo-title">BASED IN VISAKHAPATNAM</span>
            <span className="hero-geo-location">CONNECTED GLOBALLY</span>
          </motion.div>

        </div>
      </div>

      {/* Bottom Indicators - Absolute positioned to bottom of 100vh */}
      <div className="hero-bottom-indicators">
        <div className="hero-bottom-container">
          <div className="hero-scroll-indicator">
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>↓</motion.div>
            SCROLL TO EXPLORE
          </div>
          
          <div className="hero-pagination">
            <span className="hero-pagination-current">
              {`0${activeIndex + 1} ${services[activeIndex >= 0 ? activeIndex : 0].label}`}
            </span>
            <div className="hero-pagination-bar">
              <motion.div 
                className="hero-pagination-progress"
                animate={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="hero-pagination-total">0{services.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
