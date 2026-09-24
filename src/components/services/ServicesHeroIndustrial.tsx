import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import '../../styles/ServicesHeroIndustrial.css';

interface ServicesHeroIndustrialProps {
  onExploreClick: () => void;
  onIntegrateClick?: () => void;
  onSelectDomain?: (categoryName: string) => void;
  onSelectService?: (serviceId: string) => void;
}

import { 
  Video, Key, Flame, Network, Server, Wifi, Zap,
  ShieldAlert, Activity, Briefcase, Building, Cpu, 
  ShieldCheck, Cloud, Shield, Layers, Globe, Smartphone,
  GitMerge, Share2, Database, Layout, Home, Truck
} from 'lucide-react';

const SST_SERVICES = [
  { id: 'intrusion-detection', name: 'Intrusion Detection', icon: ShieldAlert, description: 'Advanced Perimeter and Internal Protection.' },
  { id: 'access-control', name: 'Access Control', icon: Key, description: 'Controlling Access. Protecting Assets.' },
  { id: 'video-surveillance', name: 'Video Surveillance', icon: Video, description: 'Comprehensive Visual Intelligence.' },
  { id: 'fire-fighting', name: 'Fire Fighting', icon: Flame, description: 'Protecting Lives. Safeguarding Assets.' },
  { id: 'perimeter-security', name: 'Perimeter Security', icon: ShieldCheck, description: 'Defending Critical Physical Boundaries.' },
  { id: 'switches-storage', name: 'Switches & Storage', icon: Server, description: 'Robust IT Backbone and Data Management.' },
  { id: 'wireless-network', name: 'Wireless Technology', icon: Wifi, description: 'Seamless High-Density Connectivity Everywhere.' },
  { id: 'network-infrastructure', name: 'Network Infrastructure', icon: Network, description: 'The Foundation of Integrated Systems.' },
  { id: 'cyber-security', name: 'Cyber Security', icon: Shield, description: 'Next-Gen Perimeter Defense & Threat Hunting.' },
  { id: 'cloud-infrastructure', name: 'Cloud Infrastructure', icon: Cloud, description: 'Hybrid and Multi-Cloud Architectures.' },
  { id: 'enterprise-software', name: 'Enterprise Software', icon: Layers, description: 'Tailored Architectures for Complex Workflows.' },
  { id: 'web-applications', name: 'Web Applications', icon: Globe, description: 'Modern, Fast, and Interactive Web Portals.' },
  { id: 'mobile-applications', name: 'Mobile Applications', icon: Smartphone, description: 'Native iOS & Android Experiences.' },
  { id: 'ai-solutions', name: 'AI Solutions', icon: Cpu, description: 'Intelligent Automation and Predictive AI.' },
  { id: 'erp-crm-integration', name: 'ERP & CRM Systems', icon: GitMerge, description: 'Synchronize Enterprise Data Flows.' },
  { id: 'api-cloud-services', name: 'API & Cloud Services', icon: Share2, description: 'High-Throughput Distributed Interfaces.' },
  { id: 'iot-automation', name: 'IoT & Automation', icon: Activity, description: 'Bridging Physical Devices and Cloud Logic.' },
  { id: 'data-engineering', name: 'Data Engineering', icon: Database, description: 'Turning Raw Streams into Actionable Power.' },
  { id: 'digital-product-design', name: 'Product Design', icon: Layout, description: 'World-Class User Experiences.' },
  { id: 'turnkey-projects', name: 'Turnkey Projects', icon: Briefcase, description: 'End-to-End Infrastructure Execution.' },
  { id: 'electrical-electronics', name: 'Electrical & Electronics', icon: Zap, description: 'Powering Infrastructure with Precision.' },
  { id: 'data-center-buildouts', name: 'Data Center Buildouts', icon: Building, description: 'Tier-Rated Precision Facilities.' },
  { id: 'smart-building-automation', name: 'Building Automation', icon: Home, description: 'Intelligent, Energy-Efficient Facilities.' },
  { id: 'logistics', name: 'Logistics & Supply Chain', icon: Truck, description: 'Streamlining Operations. Delivering Efficiency.' }
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
  onIntegrateClick,
  onSelectService
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
                  onClick={() => onSelectService?.(service.id)}
                  style={{ cursor: onSelectService ? 'pointer' : 'default' }}
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
          <button className="btn-industrial-primary hero-btn-hover" onClick={onExploreClick}>
            EXPLORE OUR SERVICES 
            <span className="header-cta-arrow">
              <span className="header-cta-arrow-head" />
            </span>
          </button>
          
          <button className="btn-industrial-secondary hero-btn-hover" onClick={onIntegrateClick || onExploreClick}>
            OUR APPROACH 
            <span className="header-cta-arrow">
              <span className="header-cta-arrow-head" />
            </span>
          </button>
        </motion.div>
      </motion.div>

    </section>
  );
}
