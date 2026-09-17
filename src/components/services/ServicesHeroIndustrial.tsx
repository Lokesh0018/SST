"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../../styles/ServicesHeroIndustrial.css';

interface ServicesHeroIndustrialProps {
  onExploreClick?: () => void;
  onIntegrateClick?: () => void;
  onSelectDomain?: (categoryName: string) => void;
}

const AtmosphericParticles = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, vx: number, vy: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor(window.innerWidth / 30), 40); // Scale by screen size, max 40
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.1 // slight upward drift
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="atmospheric-particles-canvas" />;
};

const NetworkTransmission = () => {
  const origin = { x: '74%', y: '40%' };
  
  const targets = [
    { x: '25%', y: '65%' },
    { x: '45%', y: '85%' },
    { x: '65%', y: '45%' },
    { x: '35%', y: '30%' },
    { x: '55%', y: '75%' }
  ];

  return (
    <div className="network-transmission-layer" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
      
      {/* Origin Pulsing Rings */}
      <div style={{ position: 'absolute', top: origin.y, left: origin.x, transform: 'translate(-50%, -50%)' }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '60px', height: '60px',
              marginLeft: '-30px', marginTop: '-30px',
              borderRadius: '50%',
              border: '1.5px solid rgba(255, 85, 0, 0.8)',
              boxShadow: '0 0 15px rgba(255, 85, 0, 0.4)'
            }}
          />
        ))}
        {/* Core dot */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '8px', height: '8px',
          marginLeft: '-4px', marginTop: '-4px',
          borderRadius: '50%',
          backgroundColor: '#FFF',
          boxShadow: '0 0 12px 4px #FF5500'
        }} />
      </div>

      {/* SVG Connecting Lines */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {targets.map((target, idx) => (
          <line 
            key={`line-${idx}`}
            x1={origin.x} y1={origin.y} 
            x2={target.x} y2={target.y} 
            stroke="rgba(255, 85, 0, 0.25)" 
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        ))}
      </svg>

      {/* Moving Packets and Target Pings */}
      {targets.map((target, idx) => {
        const duration = 2.5 + (idx * 0.3);
        const delay = idx * 0.6;
        
        return (
          <React.Fragment key={`anim-${idx}`}>
            {/* Packet */}
            <motion.div
              style={{
                position: 'absolute',
                width: '6px', height: '6px',
                borderRadius: '50%',
                backgroundColor: '#FFF',
                boxShadow: '0 0 10px 2px #FF5500',
                marginLeft: '-3px', marginTop: '-3px'
              }}
              initial={{ left: origin.x, top: origin.y, opacity: 0 }}
              animate={{ 
                left: [origin.x, target.x], 
                top: [origin.y, target.y],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
                times: [0, 0.1, 0.9, 1]
              }}
            />
            {/* Target Ping */}
            <motion.div
              style={{
                position: 'absolute',
                left: target.x, top: target.y,
                width: '24px', height: '24px',
                marginLeft: '-12px', marginTop: '-12px',
                borderRadius: '50%',
                border: '1.5px solid #FF5500'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5], opacity: [0, 0.6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: delay + duration - 0.5,
                ease: "easeOut"
              }}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default function ServicesHeroIndustrial({
  onExploreClick,
  onIntegrateClick
}: ServicesHeroIndustrialProps) {
  // Parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const bgY = useTransform(smoothY, [-1, 1], [-15, 15]);
  const shapesX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const shapesY = useTransform(smoothY, [-1, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Staggered text variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.2 // wait for background wipe
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className="industrial-hero-section" onMouseMove={handleMouseMove}>
      {/* Background Image Layer (Full bleed) */}
      <motion.div 
        className="industrial-hero-bg"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        style={{ x: bgX, y: bgY }}
      >
        <div className="industrial-bg-image" style={{ backgroundImage: "url('/services-bg.png')" }} />
        
        {/* Sky morphing gradient overlay */}
        <div className="industrial-sky-morph" />

        {/* Atmospheric Particles */}
        <AtmosphericParticles />

        {/* Signal Tower Networking Animation */}
        <NetworkTransmission />

        {/* Sky gradient for text readability */}
        <div className="industrial-sky-gradient" />

        {/* Floating Airplane */}
        <motion.div 
          className="animated-sky-plane"
          initial={{ x: '-20vw' }}
          animate={{ 
            x: ['-20vw', '30vw', '70vw', '120vw'],
            y: ['-5vh', '-20vh', '-10vh', '-30vh'],
            scale: [0.4, 0.8, 1.1, 0.5],
            opacity: [0, 1, 1, 0],
            rotate: [-10, 5, -12, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.35, 0.65, 1],
            opacity: { duration: 25, repeat: Infinity, times: [0, 0.1, 0.9, 1] }
          }}
          style={{ width: '120px', display: 'flex', alignItems: 'center' }}
        >
          <div className="vapor-trail" />
          <img src="/aeroplane.png" alt="Aeroplane" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.3))' }} />
        </motion.div>
      </motion.div>

      {/* Structural SVG Overlays for exact curved shapes */}
      <motion.div className="industrial-shapes-layer" style={{ x: shapesX, y: shapesY }}>
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="industrial-shapes-svg">
          {/* Left White Curved Shape */}
          <path 
            d="M0 0 L1150 0 C 800 450, 650 750, 1750 1080 L0 1080 Z" 
            fill="#FFFFFF" 
          />
          
          {/* Right White Curved Shape */}
          <path 
            d="M1920 400 C 1500 550, 1550 900, 1920 1080 Z" 
            fill="#FFFFFF" 
          />

          {/* Bottom Right Orange Polygons */}
          <motion.g
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: [500, 0, 0, 0], y: [0, 0, -15, 0], opacity: [0, 1, 1, 1] }}
            transition={{
              x: { duration: 1.2, ease: "easeOut", delay: 0.5 },
              y: { duration: 6, ease: "easeInOut", repeat: Infinity, delay: 1.7 },
              opacity: { duration: 1.2, delay: 0.5 }
            }}
          >
            <path 
              d="M1450 1080 L1920 750 L1920 1080 Z" 
              fill="#FF5500" 
            />
            <path 
              d="M1750 1080 L1920 850 L1920 1080 Z" 
              fill="#D94800" 
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* Content Layer */}
      <div className="industrial-hero-content-layer">
        {/* Left Content Area */}
        <motion.div 
          className="industrial-hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div className="industrial-eyebrow" variants={itemVariants}>
            <span className="industrial-eyebrow-text">OUR SERVICES</span>
            <span className="industrial-eyebrow-line" />
          </motion.div>

          {/* Headline */}
          <motion.h1 className="industrial-hero-headline" variants={itemVariants}>
            FROM COMPLEX<br />
            CHALLENGES TO<br />
            <span className="industrial-orange-accent">REAL SOLUTIONS</span>
          </motion.h1>

          {/* Description */}
          <motion.p className="industrial-hero-description" variants={itemVariants}>
            Integrated services across physical infrastructure, security, networks, enterprise systems, and logistics designed to keep your world moving.
          </motion.p>

          {/* Action CTAs */}
          <motion.div className="industrial-hero-ctas" variants={itemVariants}>
            <button 
              onClick={onExploreClick}
              className="btn-industrial-primary"
              aria-label="Explore Our Services"
            >
              <span>EXPLORE OUR SERVICES</span>
              <svg className="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button 
              onClick={onIntegrateClick}
              className="btn-industrial-secondary"
              aria-label="Our Approach"
            >
              <span>OUR APPROACH</span>
            </button>
          </motion.div>

          {/* Statistics Strip */}
          <motion.div className="industrial-stats-strip" variants={itemVariants}>
            <div className="industrial-stat-box">
              <div className="stat-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="industrial-stat-value">24+</span>
              <span className="industrial-stat-label">Capabilities</span>
            </div>
            
            <div className="industrial-stat-divider" />
            
            <div className="industrial-stat-box">
              <div className="stat-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21h18M5 21V7l8-4v18M13 3l8 4v14M9 11v2M9 15v2M17 11v2M17 15v2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="industrial-stat-value">8+</span>
              <span className="industrial-stat-label">Industries</span>
            </div>
            
            <div className="industrial-stat-divider" />
            
            <div className="industrial-stat-box">
              <div className="stat-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="industrial-stat-value">360°</span>
              <span className="industrial-stat-label">Integration</span>
            </div>
            
            <div className="industrial-stat-divider" />
            
            <div className="industrial-stat-box">
              <div className="stat-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="industrial-stat-value">1</span>
              <span className="industrial-stat-label">Technology Partner</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Edge Text List (positioned over the right white shape) */}
      <motion.div 
        className="right-edge-list"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <div className="edge-item">PEOPLE</div>
        <div className="edge-item">TECHNOLOGY</div>
        <div className="edge-item">INFRASTRUCTURE</div>
        <div className="edge-item">A STRONGER TOMORROW</div>
      </motion.div>

      {/* Bottom Right Orange Text (positioned over the orange polygon) */}
      <motion.div 
        className="bottom-right-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.4 }}
      >
        SOLUTIONS<br/>THAT MOVE<br/>THE WORLD
      </motion.div>

    </section>
  );
}
