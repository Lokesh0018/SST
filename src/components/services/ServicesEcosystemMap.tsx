import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/ServicesEcosystemMap.css';

interface DomainNode {
  id: string;
  name: string;
  tag: string;
  metrics: string;
  points: string[];
  x: number; // percentage
  y: number;
}

const NODES: DomainNode[] = [
  {
    id: 'infra',
    name: 'Physical Infrastructure',
    tag: 'FOUNDATION',
    metrics: '99.999% Uptime',
    points: ['Turnkey Civil Engineering', 'Electrical Distribution Panels', 'Modular Tier III Data Centers'],
    x: 20,
    y: 30
  },
  {
    id: 'sec',
    name: 'Intelligent Security',
    tag: 'PROTECTION',
    metrics: '24/7 Monitoring',
    points: ['AI Video Surveillance', 'Biometric Access Control', 'Automated Fire Suppression'],
    x: 80,
    y: 30
  },
  {
    id: 'net',
    name: 'Mission Networks',
    tag: 'CONNECTIVITY',
    metrics: 'Sub-millisecond Latency',
    points: ['Enterprise Optical Fiber', '5G Industrial Wireless', 'Redundant SD-WAN Routing'],
    x: 50,
    y: 50
  },
  {
    id: 'soft',
    name: 'Software & AI',
    tag: 'INTELLIGENCE',
    metrics: 'Realtime Telemetry',
    points: ['Edge IoT Data Pipelines', 'Custom Enterprise Portals', 'Automated Predictive AI'],
    x: 22,
    y: 75
  },
  {
    id: 'log',
    name: 'Smart Logistics',
    tag: 'EXECUTION',
    metrics: 'Global Tracking',
    points: ['Warehouse Automation', 'GPS Fleet Telematics', 'Cold Chain Integrity Monitoring'],
    x: 78,
    y: 75
  }
];

export default function ServicesEcosystemMap() {
  const [activeNode, setActiveNode] = useState<string>('net');

  const currentNode = NODES.find((n) => n.id === activeNode) || NODES[2];

  return (
    <section className="ecosystem-map-section">
      <div className="ecosystem-map-glow-left" />
      <div className="ecosystem-map-glow-right" />
      <div className="ecosystem-map-grid-pattern" />

      <div className="ecosystem-map-container">
        
        {/* Section Header */}
        <div className="ecosystem-map-header">
          <div className="ecosystem-map-badge">
            <span className="badge-dot" />
            <span className="badge-text">SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="ecosystem-map-title">
            One Ecosystem.<br />
            <span className="text-orange-glow">Multiple Capabilities.</span>
          </h2>
          <p className="ecosystem-map-subtitle">
            SST integrates every layer of enterprise operations — physical assets, digital networks, security, intelligence, and supply chains into a resilient, synchronized engine.
          </p>
        </div>

        {/* Interactive Architecture Diagram */}
        <div className="ecosystem-interactive-canvas">
          
          {/* SVG Animated Connection Lines */}
          <svg className="ecosystem-svg-connections" viewBox="0 0 1000 600" preserveAspectRatio="none">
            {/* Background Static Mesh */}
            <line x1="200" y1="180" x2="500" y2="300" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1.5" />
            <line x1="800" y1="180" x2="500" y2="300" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1.5" />
            <line x1="220" y1="450" x2="500" y2="300" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1.5" />
            <line x1="780" y1="450" x2="500" y2="300" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1.5" />
            <line x1="200" y1="180" x2="800" y2="180" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="220" y1="450" x2="780" y2="450" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 4" />

            {/* Glowing Active Data Flow Lines */}
            <line x1="200" y1="180" x2="500" y2="300" stroke="rgba(255, 85, 0, 0.45)" strokeWidth="2" strokeDasharray="8 12" className="anim-flow-1" />
            <line x1="800" y1="180" x2="500" y2="300" stroke="rgba(255, 85, 0, 0.45)" strokeWidth="2" strokeDasharray="8 12" className="anim-flow-2" />
            <line x1="220" y1="450" x2="500" y2="300" stroke="rgba(255, 85, 0, 0.45)" strokeWidth="2" strokeDasharray="8 12" className="anim-flow-3" />
            <line x1="780" y1="450" x2="500" y2="300" stroke="rgba(255, 85, 0, 0.45)" strokeWidth="2" strokeDasharray="8 12" className="anim-flow-4" />
          </svg>

          {/* Central Hub */}
          <div className="ecosystem-center-core">
            <div className="core-ring core-ring-outer" />
            <div className="core-ring core-ring-inner" />
            <div className="core-nucleus">
              <span className="core-title">SST CORE</span>
              <span className="core-desc">SYNCHRONIZED ENGINE</span>
            </div>
          </div>

          {/* 5 Surrounding Nodes */}
          {NODES.map((node) => {
            const isSelected = activeNode === node.id;

            return (
              <div
                key={node.id}
                className={`ecosystem-node-pill node-${node.id} ${isSelected ? 'node-selected' : ''}`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`
                }}
                onClick={() => setActiveNode(node.id)}
              >
                <div className="node-pill-inner">
                  <div className="node-indicator-dot" />
                  <div className="node-label-group">
                    <span className="node-tag-badge">{node.tag}</span>
                    <h4 className="node-title-text">{node.name}</h4>
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Active Node Detail Card */}
        <div className="ecosystem-active-summary">
          <div className="summary-card-dark">
            <div className="summary-left">
              <div className="summary-domain-pill">{currentNode.tag} DOMAIN</div>
              <h3 className="summary-title">{currentNode.name}</h3>
              <span className="summary-metric-highlight">{currentNode.metrics}</span>
            </div>

            <div className="summary-divider-v" />

            <div className="summary-right">
              <span className="summary-subhead">Key Operational Capabilities:</span>
              <div className="summary-bullets">
                {currentNode.points.map((pt, pIdx) => (
                  <div key={pIdx} className="summary-bullet-item">
                    <svg viewBox="0 0 24 24" fill="#FF5500" width="14" height="14">
                      <circle cx="12" cy="12" r="6" />
                    </svg>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
