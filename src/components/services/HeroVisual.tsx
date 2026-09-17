import React from 'react';
import '../../styles/HeroVisual.css';

export default function HeroVisual() {
  return (
    <div className="hero-visual-wrapper">
      <div className="hero-isometric-scene">
        
        {/* Central Core */}
        <div className="iso-block core-block">
          <div className="iso-face top"></div>
          <div className="iso-face left"></div>
          <div className="iso-face right"></div>
          <div className="core-glow"></div>
        </div>

        {/* Orbiting / Floating Blocks */}
        <div className="iso-block floating-block block-1">
          <div className="iso-face top"><span className="iso-label">SECURITY</span></div>
          <div className="iso-face left"></div>
          <div className="iso-face right"></div>
        </div>

        <div className="iso-block floating-block block-2">
          <div className="iso-face top"><span className="iso-label">NETWORK</span></div>
          <div className="iso-face left"></div>
          <div className="iso-face right"></div>
        </div>

        <div className="iso-block floating-block block-3">
          <div className="iso-face top"><span className="iso-label">INFRA</span></div>
          <div className="iso-face left"></div>
          <div className="iso-face right"></div>
        </div>

        <div className="iso-block floating-block block-4">
          <div className="iso-face top"><span className="iso-label">SOFTWARE</span></div>
          <div className="iso-face left"></div>
          <div className="iso-face right"></div>
        </div>

        {/* Connecting Lines / Grid base */}
        <div className="iso-base-grid"></div>
      </div>
    </div>
  );
}
