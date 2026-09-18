import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Building2, Factory, Landmark, ShoppingCart, 
  BadgeDollarSign, Globe, Building, Briefcase, 
  Server, Plane, HeartPulse, Activity, ChevronRight
} from 'lucide-react';
import IndustriesHeroBackground from './IndustriesHeroBackground';
import '../../styles/IndustriesHeroDynamic.css';

interface IndustriesHeroDynamicProps {
  onExploreClick: () => void;
  onIntegrateClick?: () => void;
}

const INDUSTRY_DOMAINS = [
  { id: 'hospitality', name: 'Hospitality Sector', icon: Building, description: 'Premium integrated security and infrastructure for world-class hotels and resorts.' },
  { id: 'industries', name: 'Industries', icon: Factory, description: 'Robust operational systems and surveillance for heavy industries and factories.' },
  { id: 'finance', name: 'Financial Institutions', icon: Landmark, description: 'High-security environments, access control, and vault security for financial institutions.' },
  { id: 'ecommerce', name: 'E-Commerce & Software', icon: Globe, description: 'End-to-end technology and security infrastructure for e-commerce and software companies.' },
  { id: 'banks', name: 'Banks', icon: BadgeDollarSign, description: 'Comprehensive security and technology services designed to meet the stringent requirements of the banking sector.' },
  { id: 'retail', name: 'Retail', icon: ShoppingCart, description: 'Loss prevention and smart facility management for large retail chains and commercial environments.' }
];

const PATH_PERCENTAGES = [0.14, 0.28, 0.43, 0.58, 0.73, 0.88];

const ARC_POSITIONS = [
  { top: '10%', left: '18%' },
  { top: '26%', left: '38%' },
  { top: '42%', left: '49%' },
  { top: '58%', left: '49%' },
  { top: '74%', left: '38%' },
  { top: '90%', left: '18%' },
];

const MagneticNode = ({ domain, index, activeDomainId, setHoveredDomain, setIsAutoPlaying, point }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Magnetic effect removed per user request (no movement on hover)
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoveredDomain(null);
    setIsAutoPlaying(true);
  };

  return (
    <motion.div 
      className={`industry-arc-node-wrapper industry-node-${domain.id} ${domain.id === activeDomainId ? 'is-active' : ''}`}
      style={{ 
        '--auto-top': `${point.y}%`, 
        '--auto-left': `${point.x}%`,
        x: smoothX,
        y: smoothY
      } as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setHoveredDomain(domain.id);
        setIsAutoPlaying(false);
      }}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: index * 0.1 + 0.3, 
        type: "spring", 
        stiffness: 120,
        damping: 15
      }}
    >
      <div className="arc-node-dot" />
      <div className={`industry-pill-connector right industry-connector-${domain.id}`} />
      <div className={`industry-pill-card right industry-card-${domain.id}`}>
        <div className="industry-pill-icon">
          <domain.icon size={16} strokeWidth={2} />
        </div>
        <div className="industry-pill-label">{domain.name}</div>
      </div>
    </motion.div>
  );
};

const HUDTicker = () => {
  return (
    <div className="hero-hud-ticker">
      SYS.STATE: OPTIMAL | SEC.PROTO: ENGAGED
    </div>
  );
};

export default function IndustriesHeroDynamic({
  onExploreClick,
  onIntegrateClick
}: IndustriesHeroDynamicProps) {
  
  const [hoveredDomain, setHoveredDomain] = React.useState<string | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(true);
  const pathRef = React.useRef<SVGPathElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pathPoints, setPathPoints] = React.useState<{x: number, y: number}[]>([]);

  React.useEffect(() => {
    const calculatePoints = () => {
      if (!pathRef.current) return;
      const path = pathRef.current;
      const length = path.getTotalLength();
      if (length === 0) return;
      
      const points = PATH_PERCENTAGES.map(pct => {
        const point = path.getPointAtLength(length * pct);
        return { x: point.x, y: point.y };
      });
      setPathPoints(points);
    };

    // Calculate immediately
    calculatePoints();

    // Recalculate on resize
    const observer = new ResizeObserver(() => calculatePoints());
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * INDUSTRY_DOMAINS.length);
        } while (nextIndex === prev);
        return nextIndex;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeDomainId = hoveredDomain || INDUSTRY_DOMAINS[activeIndex]?.id;

  // Parallax setup for interactivity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-20, 20]);

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
    <section className="industries-dynamic-hero" onMouseMove={handleMouseMove}>
      {/* Pure Code Background Designs (3D Dotted Globe, Wave Ribbons, 3D Orbs, Constellations) */}
      <IndustriesHeroBackground />

      {/* Micro-Data HUD Ticker */}
      <HUDTicker />

      {/* Dynamic Arc Background */}
      <motion.div 
        className="industries-arc-container"
        ref={containerRef}
      >
        <svg className="arc-svg-line" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <mask id="arc-mask">
              <motion.rect 
                x="0" y="0" width="100" height="100" fill="white"
                initial={{ height: 0 }}
                animate={{ height: 100 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
            </mask>
          </defs>
          <path 
            ref={pathRef} 
            d="M0,0 Q100,50 0,100" 
            fill="none" 
            stroke="rgba(244, 81, 30, 0.5)" 
            strokeWidth="0.4" 
            vectorEffect="non-scaling-stroke" 
            mask="url(#arc-mask)"
          />
        </svg>

        {pathPoints.length > 0 && INDUSTRY_DOMAINS.map((domain, index) => {
          const point = pathPoints[index];
          return (
            <MagneticNode 
              key={domain.id}
              domain={domain}
              index={index}
              activeDomainId={activeDomainId}
              setHoveredDomain={setHoveredDomain}
              setIsAutoPlaying={setIsAutoPlaying}
              point={point}
            />
          );
        })}
      </motion.div>

      {/* Editorial Text Content */}
      <motion.div 
        className="industries-dynamic-content"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="industries-eyebrow" variants={itemVariants}>
          <div className="industries-eyebrow-text">SECTOR EXPERTISE</div>
          <div className="industries-eyebrow-line" />
        </motion.div>

        <motion.h1 className="industries-headline" variants={itemVariants}>
          <span>EMPOWERING</span>
          <span>DIVERSE</span>
          <span className="industries-orange-accent">INDUSTRIES</span>
        </motion.h1>

        <motion.div className="industries-description" variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomainId || 'default'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {activeDomainId ? (
                <>
                  <strong style={{ color: '#F4511E', display: 'block', marginBottom: '6px', fontSize: '1.1rem' }}>
                    {INDUSTRY_DOMAINS.find(s => s.id === activeDomainId)?.name}
                  </strong>
                  {INDUSTRY_DOMAINS.find(s => s.id === activeDomainId)?.description}
                </>
              ) : (
                <>
                  Tailored infrastructure, security, and networking solutions designed for the unique challenges of every major sector.
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div className="industries-stats-row" variants={itemVariants}>
          <div className="industries-stat">
            <span className="industries-stat-value">6+</span>
            <span className="industries-stat-label">INDUSTRIES</span>
          </div>
          <div className="industries-stat-divider" />
          <div className="industries-stat">
            <span className="industries-stat-value">24+</span>
            <span className="industries-stat-label">INTEGRATED SERVICES</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
