import React from 'react';

const PACK = {
  navy: '#071421',
  steel: '#3D5162',
  shellShade: '#D8E1E9',
};

function AssetGradients() {
  return (
    <defs>
      <linearGradient id="pk-shell" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="62%" stopColor="#EFF4F8" />
        <stop offset="100%" stopColor="#CFDAE4" />
      </linearGradient>
      <linearGradient id="pk-shell-v" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#DCE5EC" />
        <stop offset="58%" stopColor="#FBFDFE" />
        <stop offset="100%" stopColor="#FFF3E9" />
      </linearGradient>
    </defs>
  );
}

function TurbineTower({ s = 1 }: { s?: number }) {
  return (
    <g>
      {/* Concrete Pad Foundation */}
      <ellipse cx="0" cy={0} rx={22 * s} ry={6 * s} fill="rgba(255,253,248,0.2)" />
      {/* Contact Shadow */}
      <ellipse cx="0" cy={0} rx={16 * s} ry={4 * s} fill="rgba(7,20,33,0.25)" filter="blur(1px)" />
      <ellipse cx="0" cy={0} rx={10 * s} ry={2 * s} fill="rgba(7,20,33,0.35)" />
      
      {/* Tower */}
      <path d={`M${-5.5 * s} 0 L${5.5 * s} 0 L${2.6 * s} ${-212 * s} L${-2.6 * s} ${-212 * s} Z`} fill="url(#pk-shell-v)" />
      <rect x={-8 * s} y={-219 * s} width={17 * s} height={8 * s} rx={3 * s} fill="url(#pk-shell)" />
      <ellipse cx="0" cy="0" rx={9 * s} ry={2.4 * s} fill={PACK.navy} opacity="0.12" />
    </g>
  );
}

function TurbineBlades({ s = 1 }: { s?: number }) {
  return (
    <g>
      {[0, 120, 240].map((a) => (
        <path
          key={a}
          d={`M${-2.8 * s} 0 C${-3.4 * s} ${-36 * s} ${-2.2 * s} ${-60 * s} ${-0.9 * s} ${-78 * s}
              L${0.9 * s} ${-78 * s} C${2.6 * s} ${-58 * s} ${3.4 * s} ${-32 * s} ${2.8 * s} 0 Z`}
          fill="url(#pk-shell-v)"
          transform={`rotate(${a})`}
        />
      ))}
      <circle cx="0" cy="0" r={4.4 * s} fill={PACK.shellShade} />
      <circle cx="0" cy="0" r={2 * s} fill={PACK.steel} />
    </g>
  );
}

interface WindmillProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Windmill({ className = '', style }: WindmillProps) {
  // Increased scale for larger windmills
  const s = 1.2;
  return (
    <div className={`windmill-container ${className}`.trim()} style={{ ...style, lineHeight: 0 }}>
      <svg width={240} height={390} viewBox="-120 -380 240 390" style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg">
        <AssetGradients />
        <g transform="translate(0, 10)">
          <TurbineTower s={s} />
          {/* Use native SVG animation for reliable spinning around the nacelle hub */}
          <g>
            <animateTransform 
              attributeName="transform" 
              type="rotate" 
              from={`0 0 ${-215 * s}`} 
              to={`360 0 ${-215 * s}`} 
              dur="12s" 
              repeatCount="indefinite" 
            />
            <g transform={`translate(0, ${-215 * s})`}>
              <TurbineBlades s={s} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
