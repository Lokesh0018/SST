import React, { useId, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../../styles/IntegrationCard.css";

import { 
  Building, Shield, Lock, Server, Truck, 
  Zap, Flame, Camera, Wifi, Wrench, Network 
} from "lucide-react";

interface IntegrationItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  path: string;
  delay: number;
}

const getIntegrations = (svgRadius: number): IntegrationItem[] => [
  {
    id: "turnkey",
    icon: Building,
    x: 100,
    y: 40,
    path: `M 260 205 V 75 Q 260 60 245 60 H ${100 + svgRadius}`,
    delay: 0.1,
  },
  {
    id: "intrusion",
    icon: Shield,
    x: 160,
    y: 90,
    path: `M 270 205 V 125 Q 270 110 255 110 H ${160 + svgRadius}`,
    delay: 0.2,
  },
  {
    id: "access",
    icon: Lock,
    x: 80,
    y: 185,
    path: `M 250 205 H ${80 + svgRadius}`,
    delay: 0.3,
  },
  {
    id: "servers",
    icon: Server,
    x: 160,
    y: 280,
    path: `M 270 205 V 285 Q 270 300 255 300 H ${160 + svgRadius}`,
    delay: 0.4,
  },
  {
    id: "logistics",
    icon: Truck,
    x: 100,
    y: 330,
    path: `M 260 205 V 335 Q 260 350 245 350 H ${100 + svgRadius}`,
    delay: 0.5,
  },
  {
    id: "electrical",
    icon: Zap,
    x: 420,
    y: 40,
    path: `M 304 205 V 75 Q 304 60 319 60 H ${460 - svgRadius}`,
    delay: 0.6,
  },
  {
    id: "fire",
    icon: Flame,
    x: 360,
    y: 90,
    path: `M 294 205 V 125 Q 294 110 309 110 H ${400 - svgRadius}`,
    delay: 0.7,
  },
  {
    id: "surveillance",
    icon: Camera,
    x: 440,
    y: 185,
    path: `M 314 205 H ${480 - svgRadius}`,
    delay: 0.8,
  },
  {
    id: "wireless",
    icon: Wifi,
    x: 360,
    y: 280,
    path: `M 294 205 V 285 Q 294 300 309 300 H ${400 - svgRadius}`,
    delay: 0.9,
  },
  {
    id: "hardware",
    icon: Wrench,
    x: 420,
    y: 330,
    path: `M 304 205 V 335 Q 304 350 319 350 H ${460 - svgRadius}`,
    delay: 1.0,
  },
  {
    id: "network",
    icon: Network,
    x: 260,
    y: 360,
    path: `M 282 205 V 360`,
    delay: 1.1,
  }
];

const AnimatedPath = ({ d, id }: { d: string; id: string }) => {
  return (
    <>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="integration-path-bg"
      />
      <motion.path
        d={d}
        stroke="var(--integration-primary)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="40 250"
        initial={{ strokeDashoffset: 290 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
      />
    </>
  );
};

function Integration() {
  const containerId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgRadius, setSvgRadius] = useState(24);

  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0) {
          // Dynamically read the icon width in case CSS scaled it down
          const iconWrapper = containerRef.current.querySelector('.integration-icon-wrapper');
          let pxRadius = 21;
          
          if (iconWrapper) {
            const iconRect = iconWrapper.getBoundingClientRect();
            pxRadius = (iconRect.width / 2) + 1; // +1 for the border
          } else {
            // Fallbacks before the icons render
            if (window.innerWidth <= 480) pxRadius = 13; // 1.5rem / 2 + 1
            else if (window.innerWidth <= 768) pxRadius = 17; // 2rem / 2 + 1
          }

          const svgUnits = pxRadius * (564 / rect.width);
          setSvgRadius(svgUnits);
        }
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const integrations = getIntegrations(svgRadius);

  return (
    <div className="integration-visual-container" ref={containerRef}>
      {/* SVG Lines */}
      <svg
        className="integration-svg-lines"
        viewBox="0 0 564 410"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {integrations.map((integration) => (
          <AnimatedPath
            key={integration.id}
            d={integration.path}
            id={`${containerId}-${integration.id}`}
          />
        ))}
      </svg>

      {/* Center Logo */}
      <div className="integration-center-logo">
        <div className="integration-center-logo-inner">
          <div className="integration-center-circle" />
        </div>
        <motion.div
          className="integration-center-pulse"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Peripheral Icons */}
      {integrations.map((integration) => {
        const Icon = integration.icon;
        return (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: integration.delay }}
            style={{
              left: `${(integration.x / 564) * 100}%`,
              top: `${(integration.y / 410) * 100}%`,
            }}
            className="integration-icon-wrapper"
          >
            <Icon className="integration-icon" />
          </motion.div>
        );
      })}
    </div>
  );
}

function VisualContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="integration-visual-wrapper">
      <div className="integration-visual-content">
        {children}
      </div>
    </div>
  );
}

const IntegrationCard = ({
  visual,
  title,
  description,
  url,
}: {
  visual: React.ReactNode;
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <div className="integration-card">
      <VisualContainer>{visual}</VisualContainer>
      <div className="integration-card-content">
        <div className="integration-card-text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <a href={url} className="integration-card-button">
          Learn more
        </a>
      </div>
    </div>
  );
};

export default function IntegrationCardDemo() {
  return (
    <div className="integration-card-demo">
      <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <VisualContainer>
          <Integration />
        </VisualContainer>
      </div>
    </div>
  );
}
