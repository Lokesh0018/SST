import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/SolutionVisual.css';

interface SolutionVisualProps {
  category: string;
  title: string;
}

export default function SolutionVisual({ category, title }: SolutionVisualProps) {
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

  const isCCTV = title.toLowerCase().includes('surveillance') || category.toLowerCase().includes('security');

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="solution-visual-container group"
      style={{
        background: 'radial-gradient(circle at 50% 40%, #1A1916 0%, #0F0E0C 100%)',
      }}
    >
      {/* Background blueprint grid */}
      <div
        className="solution-visual-grid"
        style={{
          backgroundImage: `
            linear-gradient(rgba(241,90,36,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(241,90,36,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Telemetry Overlay */}
      <div className="solution-visual-telemetry">
        <div className="solution-visual-telemetry-left">
          <span className="solution-visual-dot" />
          <span className="solution-visual-telemetry-text">SYSTEM ACTIVE</span>
        </div>
        <div className="solution-visual-version">
          SST-SYS-v4.2 // {category}
        </div>
      </div>

      {/* Center 3D / HUD Interactive Graphic */}
      <div className="solution-visual-hud-container">
        <motion.div
          animate={{
            rotateX: (mousePos.y - 0.5) * -20,
            rotateY: (mousePos.x - 0.5) * 20,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="solution-visual-hud-inner"
        >
          {/* Outer rotating HUD ring */}
          <div
            className="solution-visual-hud-ring"
            style={{ transform: `rotate(${scanAngle}deg)` }}
          />

          {/* Inner pulse ring */}
          <div className="solution-visual-pulse-ring" />

          {/* Center CCTV Lens / Infrastructure Icon */}
          <div className="solution-visual-cctv-base">
            {isCCTV ? (
              <div className="solution-visual-cctv-inner">
                {/* Lens reflections */}
                <div className="solution-visual-lens-reflection">
                  <div className="solution-visual-lens-center">
                    <div className="solution-visual-lens-dot" />
                  </div>
                </div>
                {/* Aperture ring */}
                <div className="solution-visual-aperture" />
              </div>
            ) : (
              <div className="solution-visual-icon-alt">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M12 6v12M6 12h12" />
                </svg>
              </div>
            )}

            {/* Target Reticle Crosshairs */}
            <div className="solution-visual-reticle-top" />
            <div className="solution-visual-reticle-bottom" />
            <div className="solution-visual-reticle-left" />
            <div className="solution-visual-reticle-right" />
          </div>

          {/* Radar Scanner Line */}
          <div
            className="solution-visual-radar"
            style={{ transform: `rotate(${scanAngle * 2}deg)` }}
          />
        </motion.div>

        {/* Live Metrics readout */}
        <div className="solution-visual-metrics-grid">
          <div className="solution-visual-metric-card">
            <span className="solution-visual-metric-label">Optics</span>
            <span className="solution-visual-metric-value">4K HDR</span>
          </div>
          <div className="solution-visual-metric-card">
            <span className="solution-visual-metric-label">Latency</span>
            <span className="solution-visual-metric-value">&lt; 12ms</span>
          </div>
          <div className="solution-visual-metric-card">
            <span className="solution-visual-metric-label">AI Analytics</span>
            <span className="solution-visual-metric-value">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Bottom HUD Tagline */}
      <div className="solution-visual-tagline">
        <span>MODE: REAL-TIME THREAT DETECTION</span>
        <span className="solution-visual-tagline-highlight">IP67 CERTIFIED</span>
      </div>
    </div>
  );
}
