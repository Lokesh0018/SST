import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
      className="relative aspect-square w-full rounded-2xl overflow-hidden bg-charcoal border border-orange/30 shadow-[0_12px_40px_rgba(23,22,19,0.25)] flex flex-col justify-between p-6 select-none group"
      style={{
        background: 'radial-gradient(circle at 50% 40%, #1A1916 0%, #0F0E0C 100%)',
      }}
    >
      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(241,90,36,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(241,90,36,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 flex items-center justify-between text-ivory/80 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange animate-ping" />
          <span className="text-orange font-bold uppercase tracking-wider">SYSTEM ACTIVE</span>
        </div>
        <div className="text-ivory/40 uppercase tracking-widest text-[10px]">
          SST-SYS-v4.2 // {category}
        </div>
      </div>

      {/* Center 3D / HUD Interactive Graphic */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <motion.div
          animate={{
            rotateX: (mousePos.y - 0.5) * -20,
            rotateY: (mousePos.x - 0.5) * 20,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative w-56 h-56 flex items-center justify-center"
        >
          {/* Outer rotating HUD ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-orange/40"
            style={{ transform: `rotate(${scanAngle}deg)` }}
          />

          {/* Inner pulse ring */}
          <div className="absolute inset-4 rounded-full border border-orange/20 animate-pulse" />

          {/* Center CCTV Lens / Infrastructure Icon */}
          <div className="relative w-36 h-36 rounded-full bg-charcoal-light/80 border-2 border-orange flex items-center justify-center shadow-[0_0_50px_rgba(241,90,36,0.4)]">
            {isCCTV ? (
              <div className="relative w-24 h-24 rounded-full bg-black flex items-center justify-center border-4 border-charcoal">
                {/* Lens reflections */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange via-orange-glow to-transparent opacity-80 animate-pulse flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-orange" />
                  </div>
                </div>
                {/* Aperture ring */}
                <div className="absolute inset-0 rounded-full border border-orange/50" />
              </div>
            ) : (
              <div className="text-orange text-5xl">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M12 6v12M6 12h12" />
                </svg>
              </div>
            )}

            {/* Target Reticle Crosshairs */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-orange" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-orange" />
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 h-0.5 w-3 bg-orange" />
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 h-0.5 w-3 bg-orange" />
          </div>

          {/* Radar Scanner Line */}
          <div
            className="absolute top-1/2 left-1/2 w-28 h-0.5 bg-gradient-to-r from-orange to-transparent origin-left"
            style={{ transform: `rotate(${scanAngle * 2}deg)` }}
          />
        </motion.div>

        {/* Live Metrics readout */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center w-full max-w-sm">
          <div className="p-2 rounded bg-charcoal-light/60 border border-orange/20 text-xs">
            <span className="block text-[10px] text-ivory/50 uppercase">Optics</span>
            <span className="font-bold text-orange font-mono">4K HDR</span>
          </div>
          <div className="p-2 rounded bg-charcoal-light/60 border border-orange/20 text-xs">
            <span className="block text-[10px] text-ivory/50 uppercase">Latency</span>
            <span className="font-bold text-orange font-mono">&lt; 12ms</span>
          </div>
          <div className="p-2 rounded bg-charcoal-light/60 border border-orange/20 text-xs">
            <span className="block text-[10px] text-ivory/50 uppercase">AI Analytics</span>
            <span className="font-bold text-orange font-mono">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Bottom HUD Tagline */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-ivory/60 border-t border-orange/20 pt-3">
        <span>MODE: REAL-TIME THREAT DETECTION</span>
        <span className="text-orange">IP67 CERTIFIED</span>
      </div>
    </div>
  );
}
