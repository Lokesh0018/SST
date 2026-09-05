import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/ServiceVisual.css';

interface TurnkeyCinematicVisualProps {
  stage: number; // 0: Design, 1: Execution, 2: Testing, 3: Handover
}

export default function TurnkeyCinematicVisual({ stage }: TurnkeyCinematicVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Position of surrounding nodes
  const nodes = [
    { id: 'security', label: 'SECURITY', x: 25, y: 30, iconPath: 'M3 11h18v11H3z M7 11V7a5 5 0 0 1 10 0v4' },
    { id: 'network', label: 'NETWORK', x: 75, y: 30, iconPath: 'M2 2h20v8H2z M2 14h20v8H2z M6 6h.01 M6 18h.01' },
    { id: 'electrical', label: 'POWER', x: 25, y: 70, iconPath: 'M13 2L3 14h9l-1 8 10-12h-9z' },
    { id: 'fire', label: 'SAFETY', x: 75, y: 70, iconPath: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z' },
    { id: 'access', label: 'ACCESS', x: 50, y: 15, iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { id: 'cctv', label: 'SURVEILLANCE', x: 50, y: 85, iconPath: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  ];

  const centerNode = { x: 50, y: 50 };

  const statusText = stage === 3 ? 'PROJECT READY' : 'SYSTEM ACTIVE';
  const metricStages = ['DESIGN', 'EXECUTION', 'TESTING', 'HANDOVER'];

  return (
    <div
      ref={containerRef}
      className="service-visual-container group"
      style={{
        backgroundColor: '#0a0f14', // Deep technical blueprint blue/black
        borderRadius: '1.25rem',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Blueprint background grid */}
      <div
        className="service-visual-grid"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px', // Finer blueprint grid
        }}
      />

      <div className="service-visual-telemetry" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', right: '1.5rem', zIndex: 10 }}>
        <div className="service-visual-telemetry-left">
          <span className="service-visual-dot" style={{ backgroundColor: '#F4511E', boxShadow: stage === 3 ? '0 0 15px #F4511E' : '0 0 5px #F4511E' }} />
          <span className="service-visual-telemetry-text" style={{ color: '#fff', transition: 'all 0.3s' }}>
            {statusText}
          </span>
        </div>
        <div className="service-visual-version" style={{ color: 'rgba(255,255,255,0.7)' }}>
          SST-SYS-v4.2 // TURNKEY
        </div>
      </div>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
          
          {/* STAGE 1: Drawing connections & nodes */}
          <AnimatePresence>
            {stage >= 1 && nodes.map((node, i) => (
              <motion.g key={`node-group-${node.id}`} initial={{ opacity: 1 }} animate={{ opacity: stage === 3 ? 0 : 1 }} transition={{ duration: 0.5 }}>
                {/* Connecting lines from hub to nodes */}
                <motion.line
                  x1={centerNode.x}
                  y1={centerNode.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(244, 81, 30, 0.4)"
                  strokeWidth="0.2"
                  strokeDasharray="1, 1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeInOut' }}
                />

                {/* Node Box drawing */}
                <motion.rect
                  x={node.x - 5}
                  y={node.y - 5}
                  width="10"
                  height="10"
                  rx="1"
                  fill="rgba(10, 15, 20, 0.8)"
                  stroke="rgba(244, 81, 30, 0.6)"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
                />

                {/* Node inner icon drawing */}
                <g transform={`translate(${node.x - 2}, ${node.y - 2}) scale(0.16)`}>
                  <motion.path
                    d={node.iconPath}
                    fill="none"
                    stroke="#F4511E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: 'easeOut' }}
                  />
                </g>
              </motion.g>
            ))}
          </AnimatePresence>

          {/* STAGE 2: Testing / Pulses */}
          {stage === 2 && nodes.map((node, i) => (
            <motion.circle
              key={`pulse-${node.id}`}
              r="0.8"
              fill="#F4511E"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              <animateMotion
                dur="1.5s"
                repeatCount="indefinite"
                path={`M${node.x},${node.y} L${centerNode.x},${centerNode.y}`}
                begin={`${i * 0.2}s`}
              />
            </motion.circle>
          ))}

          {/* STAGE 0+: Central SST Hub Drawing */}
          {/* Technical blueprint hexagon for the hub */}
          <motion.path
            d="M 50 35 L 63 42.5 L 63 57.5 L 50 65 L 37 57.5 L 37 42.5 Z"
            fill={stage === 3 ? "rgba(244, 81, 30, 0.15)" : "rgba(10, 15, 20, 0.9)"}
            stroke="#F4511E"
            strokeWidth={stage === 3 ? "1.5" : "0.5"}
            initial={{ pathLength: 0, scale: 0.8, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              scale: stage === 3 ? 1.2 : 1, 
              opacity: 1 
            }}
            style={{ originX: "50px", originY: "50px" }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Inner details of the hub */}
          <motion.path
            d="M 50 35 L 50 65 M 37 42.5 L 63 57.5 M 37 57.5 L 63 42.5"
            stroke="rgba(244, 81, 30, 0.3)"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: stage === 3 ? 0 : 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          />

          {/* SST Text Drawing */}
          <motion.text
            x="50"
            y="52"
            textAnchor="middle"
            fill={stage === 3 ? "#F4511E" : "none"}
            stroke="#F4511E"
            strokeWidth="0.2"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
            initial={{ strokeDasharray: "0 100", opacity: 0 }}
            animate={{ strokeDasharray: "100 100", opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            SST
          </motion.text>
          
        </svg>
      </div>

      {/* Bottom Metrics - Sequential Stages */}
      <div 
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '1.5rem',
          right: '1.5rem',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', width: '100%' }}>
          {metricStages.map((metric, idx) => {
            const isActive = stage >= idx;
            const isCurrent = stage === idx;
            return (
              <div 
                key={idx}
                style={{ 
                  flex: 1,
                  background: isActive ? 'rgba(244, 81, 30, 0.15)' : 'rgba(255,255,255,0.02)', 
                  backdropFilter: 'blur(10px)', 
                  padding: '0.5rem', 
                  borderRadius: '0.25rem', 
                  border: `1px solid ${isCurrent ? '#F4511E' : isActive ? 'rgba(244, 81, 30, 0.3)' : 'rgba(255,255,255,0.05)'}`,
                  textAlign: 'center',
                  transition: 'all 0.5s ease',
                }}
              >
                <span style={{ 
                  display: 'block', 
                  fontSize: '0.65rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.3)', 
                  fontWeight: isActive ? 600 : 400
                }}>
                  {metric}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="service-visual-tagline">
          <span style={{ color: '#F4511E' }}>MODE: BLUEPRINT DRAFTING</span>
        </div>
      </div>
    </div>
  );
}
