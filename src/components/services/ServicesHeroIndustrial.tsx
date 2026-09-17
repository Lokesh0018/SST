import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import '../../styles/ServicesHeroIndustrial.css';

interface ServicesHeroIndustrialProps {
  onExploreClick: () => void;
  onIntegrateClick?: () => void; // Optional if not used
}

import { 
  Video, Key, Flame, Network, Server, Wifi, Zap, Package, 
  CreditCard, ShieldAlert, Activity, Briefcase, Building, Cpu, 
  Scan, ShieldCheck, Cloud, Map, Speaker, Thermometer, 
  Car, Monitor, LineChart, Mic 
} from 'lucide-react';

const SST_SERVICES = [
  { id: 'cctv', name: 'CCTV & Surveillance', icon: Video },
  { id: 'access', name: 'Access Control', icon: Key },
  { id: 'fire', name: 'Fire Safety', icon: Flame },
  { id: 'network', name: 'Network Infrastructure', icon: Network },
  { id: 'server', name: 'Data Centers', icon: Server },
  { id: 'wireless', name: 'Wireless Systems', icon: Wifi },
  { id: 'electrical', name: 'Electrical Engineering', icon: Zap },
  { id: 'logistics', name: 'Logistics Tech', icon: Package },
  { id: 'atm', name: 'ATM & Banking', icon: CreditCard },
  { id: 'intrusion', name: 'Intrusion Detection', icon: ShieldAlert },
  { id: 'safety', name: 'Workplace Safety', icon: Activity },
  { id: 'turnkey', name: 'Turnkey Solutions', icon: Briefcase },
  { id: 'bms', name: 'Building Management', icon: Building },
  { id: 'fiber', name: 'Fiber Optics', icon: Cpu },
  { id: 'biometrics', name: 'Biometrics', icon: Scan },
  { id: 'perimeter', name: 'Perimeter Security', icon: ShieldCheck },
  { id: 'cloud', name: 'Cloud Integration', icon: Cloud },
  { id: 'fleet', name: 'Fleet Management', icon: Map },
  { id: 'audio', name: 'PA Systems', icon: Speaker },
  { id: 'hvac', name: 'HVAC Control', icon: Thermometer },
  { id: 'parking', name: 'Smart Parking', icon: Car },
  { id: 'control', name: 'Control Rooms', icon: Monitor },
  { id: 'analytics', name: 'Video Analytics', icon: LineChart },
  { id: 'intercom', name: 'Intercom Systems', icon: Mic }
];

// Asymmetrical distribution, heavier on the right side
const nodePositions = [
  { ...SST_SERVICES[0], x: 65, y: 15, size: 65, depth: 'foreground', parallaxMultiplier: -1.2, floatDuration: 3.5, delay: 0 },
  { ...SST_SERVICES[1], x: 80, y: 35, size: 55, depth: 'midground', parallaxMultiplier: -0.8, floatDuration: 4.2, delay: 0.2 },
  { ...SST_SERVICES[2], x: 90, y: 65, size: 45, depth: 'background', parallaxMultiplier: -0.4, floatDuration: 5.5, delay: 0.4 },
  { ...SST_SERVICES[3], x: 70, y: 75, size: 75, depth: 'foreground', parallaxMultiplier: -1.5, floatDuration: 3.8, delay: 0.1 },
  { ...SST_SERVICES[4], x: 50, y: 85, size: 50, depth: 'midground', parallaxMultiplier: -0.7, floatDuration: 4.5, delay: 0.3 },
  { ...SST_SERVICES[5], x: 85, y: 10, size: 40, depth: 'background', parallaxMultiplier: -0.3, floatDuration: 6.0, delay: 0.5 },
  { ...SST_SERVICES[6], x: 45, y: 12, size: 60, depth: 'midground', parallaxMultiplier: -0.9, floatDuration: 4.0, delay: 0.15 },
  { ...SST_SERVICES[7], x: 10, y: 75, size: 45, depth: 'background', parallaxMultiplier: -0.5, floatDuration: 5.2, delay: 0.45 },
  { ...SST_SERVICES[8], x: 75, y: 55, size: 45, depth: 'background', parallaxMultiplier: -0.3, floatDuration: 5.2, delay: 0.85 },
  { ...SST_SERVICES[9], x: 95, y: 45, size: 35, depth: 'background', parallaxMultiplier: -0.2, floatDuration: 6.5, delay: 0.6 },
  { ...SST_SERVICES[10], x: 60, y: 40, size: 40, depth: 'midground', parallaxMultiplier: -0.6, floatDuration: 4.8, delay: 0.35 },
  { ...SST_SERVICES[11], x: 30, y: 80, size: 55, depth: 'midground', parallaxMultiplier: -0.8, floatDuration: 4.1, delay: 0.25 },
  { ...SST_SERVICES[12], x: 95, y: 25, size: 35, depth: 'background', parallaxMultiplier: -0.3, floatDuration: 5.8, delay: 0.7 },
  { ...SST_SERVICES[13], x: 55, y: 5, size: 40, depth: 'midground', parallaxMultiplier: -0.7, floatDuration: 4.6, delay: 0.2 },
  { ...SST_SERVICES[14], x: 5, y: 15, size: 45, depth: 'background', parallaxMultiplier: -0.4, floatDuration: 5.1, delay: 0.5 },
  { ...SST_SERVICES[15], x: 55, y: 25, size: 85, depth: 'foreground', parallaxMultiplier: -1.6, floatDuration: 3.4, delay: 0.1 },
  { ...SST_SERVICES[16], x: 85, y: 90, size: 50, depth: 'midground', parallaxMultiplier: -0.8, floatDuration: 4.4, delay: 0.3 },
  { ...SST_SERVICES[17], x: 98, y: 55, size: 30, depth: 'background', parallaxMultiplier: -0.1, floatDuration: 7.0, delay: 0.9 },
  { ...SST_SERVICES[18], x: 82, y: 50, size: 45, depth: 'midground', parallaxMultiplier: -0.6, floatDuration: 4.9, delay: 0.4 },
  { ...SST_SERVICES[19], x: 15, y: 90, size: 42, depth: 'background', parallaxMultiplier: -0.5, floatDuration: 5.3, delay: 0.6 },
  { ...SST_SERVICES[20], x: 60, y: 95, size: 35, depth: 'background', parallaxMultiplier: -0.3, floatDuration: 5.7, delay: 0.75 },
  { ...SST_SERVICES[21], x: 72, y: 28, size: 48, depth: 'midground', parallaxMultiplier: -0.7, floatDuration: 4.3, delay: 0.25 },
  { ...SST_SERVICES[22], x: 2, y: 60, size: 32, depth: 'background', parallaxMultiplier: -0.2, floatDuration: 6.1, delay: 0.85 },
  { ...SST_SERVICES[23], x: 30, y: 5, size: 40, depth: 'midground', parallaxMultiplier: -0.5, floatDuration: 5.0, delay: 0.45 }
];

// Extracted component to avoid Rules of Hooks violation in loop
const ServiceNodeItem = ({ node, parallaxX, parallaxY, hoveredNode, setHoveredNode }: { node: any, parallaxX: any, parallaxY: any, hoveredNode: string | null, setHoveredNode: (id: string | null) => void }) => {
  const x = useTransform(parallaxX, (v: any) => v * node.parallaxMultiplier);
  const y = useTransform(parallaxY, (v: any) => v * node.parallaxMultiplier);

  const isHovered = hoveredNode === node.id;
  const isFaded = hoveredNode !== null && !isHovered;

  return (
    <motion.div
      className={`service-node node-${node.depth}`}
      onMouseEnter={() => setHoveredNode(node.id)}
      onMouseLeave={() => setHoveredNode(null)}
      style={{
        top: `${node.y}%`,
        left: `${node.x}%`,
        x,
        y,
        zIndex: isHovered ? 20 : 1
      }}
      initial={{ opacity: 0, scale: 0.2, y: 50 }}
      animate={{ 
        opacity: isFaded ? 0.15 : (node.depth === 'foreground' ? 1 : node.depth === 'midground' ? 0.75 : 0.45), 
        scale: isHovered ? 1.15 : (isFaded ? 0.9 : 1),
        y: 0
      }}
      transition={{ 
        type: "spring",
        stiffness: isHovered ? 300 : 120,
        damping: isHovered ? 20 : 14,
        delay: isHovered ? 0 : node.delay 
      }}
    >
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        animate={{
          y: ["-5%", "5%", "-5%"],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: node.floatDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div 
          className="service-node-circle"
          style={{ width: `${node.size}px`, height: `${node.size}px` }}
        >
          <node.icon style={{ width: '45%', height: '45%' }} strokeWidth={2} />
        </div>
        
        <div className="service-node-label">{node.name}</div>
      </motion.div>
    </motion.div>
  );
};

export default function ServicesHeroIndustrial({
  onExploreClick,
  onIntegrateClick
}: ServicesHeroIndustrialProps) {
  
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);

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
      
      {/* Background wireframe globe */}
      <svg className="bg-infrastructure-globe" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <circle cx="400" cy="400" r="390" fill="none" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="400" cy="400" r="300" fill="none" strokeWidth="1" />
        <circle cx="400" cy="400" r="200" fill="none" strokeWidth="1" strokeDasharray="2 4" />
        <ellipse cx="400" cy="400" rx="390" ry="150" fill="none" strokeWidth="0.5" />
        <ellipse cx="400" cy="400" rx="150" ry="390" fill="none" strokeWidth="0.5" />
        
        {/* Animated routes on the globe */}
        <motion.path 
          className="globe-orange-routes"
          d="M 100 400 Q 400 100 700 400" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          className="globe-orange-routes"
          d="M 250 150 Q 400 700 650 200" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </svg>

      <div className="ambient-glow-card" />

      {/* 3D Icons Layer */}
      <div className="gravity-icons-container">
        {nodePositions.map((node, index) => (
          <ServiceNodeItem 
            key={index}
            node={node}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
          />
        ))}
      </div>

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

        <motion.p className="industrial-hero-description" variants={itemVariants}>
          Integrated services across physical infrastructure, security, networks, enterprise systems, and logistics designed to keep your world moving.
        </motion.p>

        <motion.div className="industrial-hero-ctas" variants={itemVariants}>
          <button className="btn-industrial-primary" onClick={onExploreClick}>
            EXPLORE OUR SERVICES 
            <svg className="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          
          <button className="btn-industrial-secondary" onClick={onIntegrateClick || onExploreClick}>
            OUR APPROACH 
            <svg className="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </motion.div>
      </motion.div>

    </section>
  );
}
