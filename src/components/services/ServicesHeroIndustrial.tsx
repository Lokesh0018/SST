import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import '../../styles/ServicesHeroIndustrial.css';

interface ServicesHeroIndustrialProps {
  onExploreClick: () => void;
  onIntegrateClick?: () => void;
  onSelectDomain?: (categoryName: string) => void;
}

import { 
  Video, Key, Flame, Network, Server, Wifi, Zap, Package, 
  CreditCard, ShieldAlert, Activity, Briefcase, Building, Cpu, 
  Scan, ShieldCheck, Cloud, Map, Speaker, Thermometer, 
  Car, Monitor, LineChart, Mic 
} from 'lucide-react';

const SST_SERVICES = [
  { id: 'cctv', name: 'CCTV & Surveillance', icon: Video, description: 'High-definition video monitoring and intelligent surveillance solutions.' },
  { id: 'access', name: 'Access Control', icon: Key, description: 'Secure entry systems, biometric readers, and restricted zone management.' },
  { id: 'fire', name: 'Fire Safety', icon: Flame, description: 'Advanced fire detection, alarm systems, and emergency suppression integration.' },
  { id: 'network', name: 'Network Infrastructure', icon: Network, description: 'Robust, enterprise-grade wired and wireless networking solutions.' },
  { id: 'server', name: 'Data Centers', icon: Server, description: 'Secure, climate-controlled environments for mission-critical IT infrastructure.' },
  { id: 'wireless', name: 'Wireless Systems', icon: Wifi, description: 'Campus-wide WiFi, point-to-point wireless, and mobile network extensions.' },
  { id: 'electrical', name: 'Electrical Engineering', icon: Zap, description: 'Industrial power distribution, backup generators, and UPS systems.' },
  { id: 'logistics', name: 'Logistics Tech', icon: Package, description: 'Automated tracking, warehousing, and supply chain technology solutions.' },
  { id: 'atm', name: 'ATM & Banking', icon: CreditCard, description: 'Secure transaction kiosks, ATM deployment, and banking infrastructure.' },
  { id: 'intrusion', name: 'Intrusion Detection', icon: ShieldAlert, description: 'Advanced alarm systems designed to instantly detect unauthorized entry.' },
  { id: 'safety', name: 'Workplace Safety', icon: Activity, description: 'Occupational health, environmental monitoring, and safety compliance systems.' },
  { id: 'turnkey', name: 'Turnkey Solutions', icon: Briefcase, description: 'End-to-end project management from initial design to final deployment.' },
  { id: 'bms', name: 'Building Management', icon: Building, description: 'Centralized control for facility lighting, HVAC, and power systems.' },
  { id: 'fiber', name: 'Fiber Optics', icon: Cpu, description: 'High-speed, long-distance fiber optic cabling and splicing services.' },
  { id: 'biometrics', name: 'Biometrics', icon: Scan, description: 'Fingerprint, iris, and facial recognition for high-security environments.' },
  { id: 'perimeter', name: 'Perimeter Security', icon: ShieldCheck, description: 'Physical barriers, fence sensors, and long-range threat detection.' },
  { id: 'cloud', name: 'Cloud Integration', icon: Cloud, description: 'Secure migration and management for hybrid and multi-cloud environments.' },
  { id: 'fleet', name: 'Fleet Management', icon: Map, description: 'GPS tracking, vehicle diagnostics, and logistical route optimization.' },
  { id: 'audio', name: 'PA Systems', icon: Speaker, description: 'Public address and mass notification audio systems for large facilities.' },
  { id: 'hvac', name: 'HVAC Control', icon: Thermometer, description: 'Climate control automation for optimal temperature and air quality.' },
  { id: 'parking', name: 'Smart Parking', icon: Car, description: 'Automated entry, space availability tracking, and parking management.' },
  { id: 'control', name: 'Control Rooms', icon: Monitor, description: 'State-of-the-art command centers for 24/7 monitoring and response.' },
  { id: 'analytics', name: 'Video Analytics', icon: LineChart, description: 'AI-driven object detection, facial recognition, and behavioral analysis.' },
  { id: 'intercom', name: 'Intercom Systems', icon: Mic, description: 'Two-way audio and video communication for secure checkpoints.' }
];

// Magnetic Button Wrapper
function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 }); // 0.2 determines strength of pull
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.button>
  );
}

// Group 24 services into honeycomb rows: 4, 5, 6, 5, 4
const rowCounts = [4, 5, 6, 5, 4];
let currentIndex = 0;
const honeycombRows = rowCounts.map(count => {
  const row = SST_SERVICES.slice(currentIndex, currentIndex + count);
  currentIndex += count;
  return row;
});

export default function ServicesHeroIndustrial({
  onExploreClick,
  onIntegrateClick
}: ServicesHeroIndustrialProps) {
  
  const [hoveredService, setHoveredService] = React.useState<string | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * SST_SERVICES.length);
        } while (nextIndex === prev);
        return nextIndex;
      });
    }, 1800); // Faster, random switching
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeServiceId = hoveredService || SST_SERVICES[activeIndex]?.id;

  // Parallax setup for interactivity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [-1, 1], [-25, 25]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35, filter: "blur(12px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section className="industrial-hero-section" onMouseMove={handleMouseMove}>
      


      <div className="ambient-glow-card" />

      {/* 3D Neomorphic Hexagon Honeycomb */}
      <motion.div 
        className="honeycomb-grid"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        >
          <div className="honeycomb-light-sweep" />
          
          {honeycombRows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="honeycomb-row">
              {row.map((service, colIndex) => (
                <motion.div 
                  key={service.id} 
                  className={`hexagon-wrapper ${service.id === activeServiceId ? 'is-active' : ''}`}
                  onMouseEnter={() => {
                    setHoveredService(service.id);
                    setIsAutoPlaying(false);
                  }}
                  onMouseLeave={() => {
                    setHoveredService(null);
                    setIsAutoPlaying(true);
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: rowIndex * 0.1 + colIndex * 0.05 + 0.3, 
                    type: "spring", 
                    stiffness: 120,
                    damping: 15
                  }}
                >
                  <div className="hexagon-inner">
                    <service.icon className="hexagon-icon" size={28} strokeWidth={1.5} />
                    <div className="hexagon-label">{service.name}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Editorial Text Content */}
      <motion.div 
        className="industrial-hero-content-layer"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="industrial-eyebrow" variants={itemVariants}>
          <div className="industrial-eyebrow-text">OUR SERVICES</div>
          <div className="industrial-eyebrow-line" />
        </motion.div>

        <motion.h1 className="industrial-hero-headline" variants={itemVariants}>
          <span>FROM COMPLEX</span>
          <span>CHALLENGES TO</span>
          <span className="industrial-orange-accent">REAL SOLUTIONS</span>
        </motion.h1>

        <motion.div className="industrial-hero-description" variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeServiceId || 'default'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {activeServiceId ? (
                <>
                  <strong style={{ color: '#FF5500', display: 'block', marginBottom: '4px' }}>
                    {SST_SERVICES.find(s => s.id === activeServiceId)?.name}
                  </strong>
                  {SST_SERVICES.find(s => s.id === activeServiceId)?.description}
                </>
              ) : (
                <>
                  Integrated services across physical infrastructure, security, networks, enterprise systems, and logistics designed to keep your world moving.
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div className="industrial-hero-ctas" variants={itemVariants}>
          <MagneticButton className="btn-industrial-primary" onClick={onExploreClick}>
            EXPLORE OUR SERVICES 
            <svg className="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </MagneticButton>
          
          <MagneticButton className="btn-industrial-secondary" onClick={onIntegrateClick || onExploreClick}>
            OUR APPROACH 
            <svg className="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </MagneticButton>
        </motion.div>
      </motion.div>

    </section>
  );
}
