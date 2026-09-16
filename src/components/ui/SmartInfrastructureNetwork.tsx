import React from 'react';
import '../../styles/SmartInfrastructureNetwork.css';

export default function SmartInfrastructureNetwork({ className = '', style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <div className={`smart-infra-container ${className}`.trim()} style={style} aria-hidden="true">
      {/* Sky Transition Gradient - Blends the space below the cards into the atmosphere */}
      <div className="infra-sky-gradient" />
      
      <svg width="100%" height="100%" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        
        <defs>
          {/* Atmospheric Background Gradients */}
          <linearGradient id="horizon-mist" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(226, 232, 240, 0)" />
            <stop offset="70%" stopColor="rgba(184, 194, 204, 0.15)" />
            <stop offset="100%" stopColor="rgba(148, 163, 184, 0.4)" />
          </linearGradient>

          {/* Central Radial Bloom - Creates the subtle lighting behind the infrastructure */}
          <radialGradient id="center-bloom" cx="50%" cy="100%" r="70%" fx="50%" fy="100%">
            <stop offset="0%" stopColor="rgba(255, 253, 248, 0.15)" />
            <stop offset="60%" stopColor="rgba(226, 232, 240, 0.05)" />
            <stop offset="100%" stopColor="rgba(7, 20, 33, 0)" />
          </radialGradient>

          <linearGradient id="ground-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(148, 163, 184, 0.3)" />
            <stop offset="40%" stopColor="rgba(148, 163, 184, 0.15)" />
            <stop offset="100%" stopColor="rgba(148, 163, 184, 0.05)" />
          </linearGradient>

          {/* Soft Transition into Cream Section Below */}
          <linearGradient id="base-transition" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(251, 253, 254, 0)" />
            <stop offset="100%" stopColor="#FBFDFE" /> {/* SST Cream Color */}
          </linearGradient>

          {/* Architectural Surface Shading Materials */}
          <linearGradient id="mat-front-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(7, 20, 33, 0.04)" />
            <stop offset="100%" stopColor="rgba(7, 20, 33, 0.1)" />
          </linearGradient>
          
          <linearGradient id="mat-front-mid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(7, 20, 33, 0.08)" />
            <stop offset="100%" stopColor="rgba(7, 20, 33, 0.2)" />
          </linearGradient>
          
          <linearGradient id="mat-front-fg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(7, 20, 33, 0.15)" />
            <stop offset="100%" stopColor="rgba(7, 20, 33, 0.35)" />
          </linearGradient>

          <linearGradient id="mat-side" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(7, 20, 33, 0.03)" />
            <stop offset="100%" stopColor="rgba(7, 20, 33, 0.12)" />
          </linearGradient>
          
          <linearGradient id="mat-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 253, 248, 0.25)" />
            <stop offset="100%" stopColor="rgba(255, 253, 248, 0.1)" />
          </linearGradient>
          
          <linearGradient id="mat-glass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(148, 163, 184, 0.2)" />
            <stop offset="100%" stopColor="rgba(7, 20, 33, 0.1)" />
          </linearGradient>

          {/* Glowing Accents */}
          <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform="translate(0, 50)">
          
          {/* ==========================================
              LAYER 1: ATMOSPHERE & HORIZON MIST
              ========================================== */}
          <rect x="0" y="50" width="1200" height="200" fill="url(#horizon-mist)" className="infra-atmosphere" />
          
          {/* Central Radial Bloom */}
          <rect x="0" y="50" width="1200" height="200" fill="url(#center-bloom)" />

          {/* ==========================================
              LAYER 2: DISTANT SKYLINE (Background - 10-15% opacity)
              Extremely faint, low contrast office blocks and generic structures
              ========================================== */}
          <g className="infra-distant-skyline" fill="url(#mat-front-bg)">
            {/* Left Skyline Cluster */}
            <rect x="180" y="160" width="30" height="80" />
            <rect x="215" y="140" width="40" height="100" />
            <rect x="235" y="120" width="15" height="120" />
            <rect x="260" y="155" width="35" height="85" />
            
            {/* Center Skyline Cluster */}
            <rect x="520" y="175" width="20" height="65" />
            <rect x="545" y="150" width="45" height="90" />
            <rect x="575" y="130" width="25" height="110" />
            <rect x="610" y="165" width="35" height="75" />
            
            {/* Right Skyline Cluster */}
            <rect x="850" y="185" width="50" height="55" />
            <rect x="910" y="145" width="30" height="95" />
            <rect x="945" y="110" width="20" height="130" />
            <rect x="970" y="135" width="45" height="105" />
            <rect x="1020" y="170" width="35" height="70" />
          </g>

          {/* ==========================================
              LAYER 3: MIDGROUND INFRASTRUCTURE (20-30% opacity)
              Recognizable structures: Office, Retail, Telecom, Warehouse
              ========================================== */}
          <g className="infra-midground">
            
            {/* --- MIDGROUND LEFT: Office & Retail Commercial Building --- */}
            <g transform="translate(180, 240)">
              {/* Main Office Block */}
              <polygon points="0,0 0,-70 50,-80 50,0" fill="url(#mat-front-mid)" />
              <polygon points="50,0 50,-80 90,-70 90,0" fill="url(#mat-side)" />
              <polygon points="0,-70 40,-60 90,-70 50,-80" fill="url(#mat-top)" />
              {/* Glass Facade Grid (Front) */}
              <g stroke="rgba(255,253,248,0.1)" strokeWidth="0.5">
                <line x1="12" y1="-72" x2="12" y2="0" />
                <line x1="25" y1="-75" x2="25" y2="0" />
                <line x1="38" y1="-77" x2="38" y2="0" />
                <line x1="0" y1="-15" x2="50" y2="-17" />
                <line x1="0" y1="-30" x2="50" y2="-34" />
                <line x1="0" y1="-45" x2="50" y2="-51" />
                <line x1="0" y1="-60" x2="50" y2="-68" />
              </g>

              {/* Retail / Logistics Annex */}
              <polygon points="80,-10 80,-30 160,-25 160,0" fill="url(#mat-front-mid)" />
              <polygon points="80,-30 80,-30 160,-25 160,-25" fill="url(#mat-top)" />
              {/* Vertical structural columns */}
              <rect x="90" y="-20" width="5" height="20" fill="rgba(7,20,33,0.15)" />
              <rect x="110" y="-18" width="5" height="18" fill="rgba(7,20,33,0.15)" />
              <rect x="130" y="-16" width="5" height="16" fill="rgba(7,20,33,0.15)" />
              <rect x="150" y="-14" width="5" height="14" fill="rgba(7,20,33,0.15)" />
            </g>

            {/* --- MIDGROUND RIGHT: Telecom Tower & Warehouse --- */}
            <g transform="translate(850, 240)">
              {/* Telecom Tower (Detailed Lattice) */}
              <g transform="translate(100, -20)">
                <line x1="0" y1="0" x2="0" y2="-110" stroke="rgba(7,20,33,0.2)" strokeWidth="2" />
                <path d="M-10,0 L0,-25 L10,0 M-8,-25 L0,-50 L8,-25 M-6,-50 L0,-75 L6,-50 M-4,-75 L0,-100 L4,-75" fill="none" stroke="rgba(7,20,33,0.15)" strokeWidth="0.5" />
                <line x1="-10" y1="-12" x2="10" y2="-12" stroke="rgba(7,20,33,0.15)" />
                <line x1="-8" y1="-37" x2="8" y2="-37" stroke="rgba(7,20,33,0.15)" />
                <line x1="-6" y1="-62" x2="6" y2="-62" stroke="rgba(7,20,33,0.15)" />
                <line x1="-4" y1="-87" x2="4" y2="-87" stroke="rgba(7,20,33,0.15)" />
                {/* Antenna Array */}
                <line x1="-6" y1="-105" x2="6" y2="-105" stroke="rgba(7,20,33,0.3)" strokeWidth="1" />
                <line x1="-4" y1="-110" x2="-4" y2="-100" stroke="rgba(7,20,33,0.3)" strokeWidth="1" />
                <line x1="4" y1="-110" x2="4" y2="-100" stroke="rgba(7,20,33,0.3)" strokeWidth="1" />
                
                {/* Single Tiny Orange Aviation Light */}
                <circle cx="0" cy="-110" r="1.5" fill="var(--color-orange)" filter="url(#glow-orange)" className="infra-aviation-light" />
              </g>

              {/* Wide Warehouse / Electrical Control Facility */}
              <polygon points="0,0 0,-30 80,-40 80,0" fill="url(#mat-front-mid)" />
              <polygon points="80,0 80,-40 120,-30 120,0" fill="url(#mat-side)" />
              <polygon points="0,-30 40,-20 120,-30 80,-40" fill="url(#mat-top)" />
              
              {/* Horizontal Ventilation Bands */}
              <line x1="0" y1="-10" x2="80" y2="-13" stroke="rgba(7,20,33,0.1)" strokeWidth="2" />
              <line x1="0" y1="-20" x2="80" y2="-26" stroke="rgba(7,20,33,0.1)" strokeWidth="2" />
              
              {/* Rooftop HVAC Equipment */}
              <g transform="translate(20, -28)" fill="rgba(7,20,33,0.2)">
                <rect x="0" y="-8" width="12" height="8" />
                <rect x="15" y="-10" width="10" height="10" />
                <rect x="30" y="-12" width="15" height="12" />
              </g>
            </g>
          </g>

          {/* ==========================================
              LAYER 4: FOREGROUND PRIMARY FACILITY (35-45% opacity)
              Modern Data Center positioned to anchor the scene
              ========================================== */}
          <g className="infra-foreground" transform="translate(500, 240)">
            {/* Main Data Center Body */}
            <polygon points="-80,0 -80,-55 40,-65 40,0" fill="url(#mat-front-fg)" />
            <polygon points="40,0 40,-65 110,-55 110,0" fill="url(#mat-side)" />
            <polygon points="-80,-55 -10,-45 110,-55 40,-65" fill="url(#mat-top)" />
            
            {/* Vertical Louvers (Server cooling structure aesthetic) */}
            <g stroke="rgba(7,20,33,0.2)" strokeWidth="1">
              {Array.from({ length: 15 }).map((_, i) => (
                <line key={i} x1={-70 + i * 7} y1={-56 + i * -0.5} x2={-70 + i * 7} y2={-10} />
              ))}
            </g>

            {/* Glowing Accent Light on Data Center */}
            <rect x="25" y="-12" width="4" height="2" fill="var(--color-orange)" filter="url(#glow-orange)" opacity="0.6" className="infra-indicator-steady" />

            {/* Loading Bay Indent */}
            <polygon points="50,0 50,-15 80,-10 80,0" fill="rgba(7,20,33,0.25)" />
            <rect x="55" y="-10" width="10" height="10" fill="rgba(7,20,33,0.4)" />
            <rect x="70" y="-8" width="5" height="8" fill="rgba(7,20,33,0.4)" />
          </g>


          {/* ==========================================
              LAYER 5: GROUND PLANE & HORIZON
              ========================================== */}
          <g className="infra-ground">
            {/* Base Horizon Line */}
            <line x1="0" y1="240" x2="1200" y2="240" stroke="rgba(7, 20, 33, 0.15)" strokeWidth="1" />
            
            {/* Main Ground Plane */}
            <rect x="0" y="240" width="1200" height="60" fill="url(#ground-gradient)" />

            {/* Converging Perspective Depth Lines */}
            <g stroke="rgba(255, 253, 248, 0.03)" strokeWidth="0.5">
              {/* Horizontal Depth Lines */}
              <line x1="0" y1="245" x2="1200" y2="245" />
              <line x1="0" y1="255" x2="1200" y2="255" />
              <line x1="0" y1="275" x2="1200" y2="275" />
              
              {/* Converging Vanishing Point Lines (Vanishing point ~ cx=600, cy=240) */}
              <line x1="600" y1="240" x2="100" y2="300" />
              <line x1="600" y1="240" x2="300" y2="300" />
              <line x1="600" y1="240" x2="500" y2="300" />
              <line x1="600" y1="240" x2="700" y2="300" />
              <line x1="600" y1="240" x2="900" y2="300" />
              <line x1="600" y1="240" x2="1100" y2="300" />
            </g>
          </g>

          {/* Distant Logistics Vehicle */}
          <g className="infra-vehicle-layer">
            {/* Vehicle Body */}
            <rect x="1200" y="234" width="18" height="6" fill="rgba(7,20,33,0.3)" rx="2">
              <animate attributeName="x" values="1200;-50" dur="50s" repeatCount="indefinite" />
            </rect>
            {/* Vehicle Cab/Front */}
            <rect x="1200" y="235" width="4" height="5" fill="rgba(7,20,33,0.4)" rx="1">
              <animate attributeName="x" values="1196;-54" dur="50s" repeatCount="indefinite" />
            </rect>
            {/* Headlights */}
            <circle cx="1200" cy="237" r="1.5" fill="rgba(255,253,248,0.8)" filter="url(#glow-orange)">
               <animate attributeName="cx" values="1196;-54" dur="50s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* ==========================================
              LAYER 6: ATMOSPHERIC TRANSITION TO CREAM BASE
              ========================================== */}
          {/* This rectangle sits at the very bottom edge and fades from transparent to the exact cream color 
              of the section below it, creating a seamless hazy blend. */}
          <rect x="0" y="270" width="1200" height="30" fill="url(#base-transition)" />

        </g>
        
      </svg>
    </div>
  );
}
