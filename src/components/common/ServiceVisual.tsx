import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TurnkeyCinematicVisual from './TurnkeyCinematicVisual';
import '../../styles/ServiceVisual.css';

interface ServiceVisualProps {
  category: string;
  title: string;
  slug?: string;
  turnkeyStage?: number;
}

export default function ServiceVisual({ category, title, slug, turnkeyStage = 0 }: ServiceVisualProps) {
  if (slug === 'turnkey-projects') {
    return <TurnkeyCinematicVisual stage={turnkeyStage} />;
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      setScanAngle((prev) => (prev + 1) % 360);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const isCCTV = slug === 'video-surveillance' || slug === 'intrusion-detection';

  let config = {
    color: '#F4511E',
    mode: 'SYSTEM OPTIMIZATION',
    metrics: [
      { label: 'STATUS', value: 'ONLINE' },
      { label: 'EFFICIENCY', value: '98.4%' },
      { label: 'LOAD', value: 'NOMINAL' },
    ],
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    )
  };

  if (category === 'Security') {
    config.mode = 'REAL-TIME THREAT DETECTION';
    config.metrics = [
      { label: 'Optics', value: '4K HDR' },
      { label: 'Latency', value: '< 12ms' },
      { label: 'AI Analytics', value: 'ACTIVE' },
    ];
    if (slug === 'access-control') {
      config.mode = 'BIOMETRIC AUTHENTICATION';
      config.metrics[0] = { label: 'Auth Rate', value: '99.9%' };
      config.icon = (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 00-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0012 2z" />
          <path d="M12 6a6 6 0 00-6 6 M12 10a2 2 0 100 4 2 2 0 000-4z" />
          <path d="M8 12a4 4 0 018 0" />
        </svg>
      );
    }
  } else if (category === 'Technology') {
    config.color = '#38bdf8';
    config.mode = 'DATA THROUGHPUT OPTIMIZATION';
    config.metrics = [
      { label: 'Bandwidth', value: '100 Gbps' },
      { label: 'Uptime', value: '99.999%' },
      { label: 'Packet Loss', value: '0%' },
    ];
    config.icon = (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    );
  } else if (category === 'Safety') {
    config.color = '#ef4444';
    config.mode = 'HAZARD MONITORING ACTIVE';
    config.metrics = [
      { label: 'Sensors', value: 'ARMED' },
      { label: 'Response', value: '< 3s' },
      { label: 'Suppression', value: 'READY' },
    ];
    config.icon = (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 21h10M9 21V7a3 3 0 016 0v14M12 7v7M9 10h6" />
        <path d="M12 2v2" />
        <path d="M15 4l-3-2-3 2" />
      </svg>
    );
  } else if (category === 'Operations' || category === 'Logistics') {
    config.color = '#facc15';
    config.mode = 'ASSET TRACKING & ROUTING';
    config.metrics = [
      { label: 'Assets', value: 'TRACKED' },
      { label: 'Efficiency', value: 'OPTIMIZED' },
      { label: 'Delivery', value: 'ON-TIME' },
    ];
    config.icon = (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    );
  }

  const cssVars = {
    '--theme-color': config.color,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="service-visual-container group"
      style={{
        background: 'radial-gradient(circle at 50% 40%, #1A1916 0%, #0F0E0C 100%)',
        ...cssVars
      }}
    >
      {/* Background blueprint grid */}
      <div
        className="service-visual-grid"
        style={{
          backgroundImage: `
            linear-gradient(${config.color}25 1px, transparent 1px),
            linear-gradient(90deg, ${config.color}25 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Telemetry Overlay */}
      <div className="service-visual-telemetry">
        <div className="service-visual-telemetry-left">
          <span className="service-visual-dot" style={{ backgroundColor: config.color, boxShadow: `0 0 10px ${config.color}` }} />
          <span className="service-visual-telemetry-text">SYSTEM ACTIVE</span>
        </div>
        <div className="service-visual-version">
          SST-SYS-v4.2 // {category}
        </div>
      </div>

      {/* Center 3D / HUD Interactive Graphic */}
      <div className="service-visual-hud-container">
        <motion.div
          animate={{
            rotateX: (mousePos.y - 0.5) * -20,
            rotateY: (mousePos.x - 0.5) * 20,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="service-visual-hud-inner"
        >
          {/* Outer rotating HUD ring */}
          <div
            className="service-visual-hud-ring"
            style={{
              transform: `rotate(${scanAngle}deg)`,
              borderColor: `${config.color}40`,
              borderTopColor: config.color,
            }}
          />

          {/* Inner pulse ring */}
          <div className="service-visual-pulse-ring" style={{ borderColor: `${config.color}30` }} />

          {/* Center CCTV Lens / Infrastructure Icon */}
          <div className="service-visual-cctv-base">
            {isCCTV ? (
              <div className="service-visual-cctv-inner">
                {/* Lens reflections */}
                <div className="service-visual-lens-reflection">
                  <div className="service-visual-lens-center">
                    <div className="service-visual-lens-dot" />
                  </div>
                </div>
                {/* Aperture ring */}
                <div className="service-visual-aperture" />
              </div>
            ) : (
              <div className="service-visual-icon-alt" style={{ color: config.color, opacity: 0.8 }}>
                {config.icon}
              </div>
            )}

            {/* Target Reticle Crosshairs */}
            <div className="service-visual-reticle-top" />
            <div className="service-visual-reticle-bottom" />
            <div className="service-visual-reticle-left" />
            <div className="service-visual-reticle-right" />
          </div>

          {/* Radar Scanner Line */}
          <div
            className="service-visual-radar"
            style={{ transform: `rotate(${scanAngle * 2}deg)` }}
          />
        </motion.div>

        {/* Live Metrics readout */}
        <div className="service-visual-metrics-grid">
          <div className="service-visual-metric-card">
            <span className="service-visual-metric-label">Optics</span>
            <span className="service-visual-metric-value">4K HDR</span>
          </div>
          <div className="service-visual-metric-card">
            <span className="service-visual-metric-label">Latency</span>
            <span className="service-visual-metric-value">&lt; 12ms</span>
          </div>
          <div className="service-visual-metric-card">
            <span className="service-visual-metric-label">AI Analytics</span>
            <span className="service-visual-metric-value">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Bottom HUD Tagline */}
      <div className="service-visual-tagline">
        <span>MODE: REAL-TIME THREAT DETECTION</span>
        <span className="service-visual-tagline-highlight">IP67 CERTIFIED</span>
      </div>
    </div>
  );
}
