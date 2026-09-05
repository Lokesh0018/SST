import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero3DScene from '../three/Hero3DScene';
import '../../styles/HeroSection.css';

const services = [
  { id: 'TURNKEY', label: 'TURNKEY CLIENTS' },
  { id: 'INTRUSION', label: 'INTRUSION DETECTION' },
  { id: 'ACCESS', label: 'ACCESS CONTROL' },
  { id: 'INFRASTRUCTURE', label: 'SWITCHES SERVICES & STORAGE' },
  { id: 'LOGISTICS', label: 'LOGISTICS' },
  { id: 'ELECTRICAL', label: 'ELECTRONIC & ELECTRICAL' },
  { id: 'SAFETY', label: 'FIRE FIGHTING' },
  { id: 'SECURITY', label: 'SECURITY CAMERA' }
];

export default function HeroSection() {
  const [activeService, setActiveService] = useState<string | null>(null);

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

        {/* Premium atmospheric radial gradient behind the globe on the right side */}
        <div className="hero-bg-gradient"
             style={{
               background: 'radial-gradient(circle at 75% 50%, rgba(240,239,234, 0.6) 0%, transparent 55%)'
             }}
        />
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="hero-title"
          >
            ONE PARTNER.<br />
            COMPLETE<br />
            <span className="hero-title-highlight">INFRASTRUCTURE.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hero-description"
          >
            Security, technology, electrical, fire safety, logistics and turnkey services — engineered and delivered as one integrated system.
          </motion.p>
          
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
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="hero-visual-wrapper"
          >
            <div className="hero-visual-inner">
              <Hero3DScene 
                activeService={activeService} 
                setActiveService={setActiveService}
              />
            </div>
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
              {activeService 
                ? `0${services.findIndex(s => s.id === activeService) + 1} ${services.find(s => s.id === activeService)?.label}` 
                : `01 ${services[0].label}`}
            </span>
            <div className="hero-pagination-bar">
              <motion.div 
                className="hero-pagination-progress"
                initial={{ width: '12.5%' }}
                animate={{ width: activeService ? `${((services.findIndex(s => s.id === activeService) + 1) / services.length) * 100}%` : '12.5%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="hero-pagination-total">0{services.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
