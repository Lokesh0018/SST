/**
 * Ambient technical backdrop for the hero: a very fine engineering grid,
 * large low-opacity geometry, technical tick markings and drifting motes.
 * Everything animates with CSS transforms only — no per-frame JS.
 */
const MOTES = [
  { x: 12, y: 24, d: 26, delay: 0 },
  { x: 31, y: 68, d: 34, delay: -8 },
  { x: 58, y: 18, d: 30, delay: -14 },
  { x: 74, y: 78, d: 38, delay: -4 },
  { x: 88, y: 40, d: 28, delay: -19 },
  { x: 46, y: 88, d: 33, delay: -11 },
  { x: 66, y: 55, d: 41, delay: -23 },
  { x: 21, y: 46, d: 36, delay: -16 },
];

export default function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      {/* ambient light that slowly traverses the composition */}
      <div className="hero-ambient hero-ambient-a" />
      <div className="hero-ambient hero-ambient-b" />

      <svg className="hero-grid-svg" preserveAspectRatio="none">
        <defs>
          <pattern id="sst-grid-fine" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#1C1C1B" strokeOpacity="0.045" strokeWidth="1" />
          </pattern>
          <pattern id="sst-grid-coarse" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M200 0H0V200" fill="none" stroke="#1C1C1B" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
          <linearGradient id="sst-grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.2" />
          </linearGradient>
          <mask id="sst-grid-mask">
            <rect x="-10%" y="-10%" width="120%" height="120%" fill="url(#sst-grid-fade)" />
          </mask>
        </defs>
        <g mask="url(#sst-grid-mask)">
          <rect className="hero-grid-drift" x="-20%" y="-20%" width="140%" height="140%" fill="url(#sst-grid-fine)" />
          <rect x="-20%" y="-20%" width="140%" height="140%" fill="url(#sst-grid-coarse)" />
        </g>
      </svg>

      {/* large, barely-there radial geometry */}
      <svg className="hero-geo-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <g className="hero-geo-rings">
          <circle cx="500" cy="500" r="470" />
          <circle cx="500" cy="500" r="360" />
          <circle cx="500" cy="500" r="250" />
        </g>
        <g className="hero-geo-ticks">
          {Array.from({ length: 72 }, (_, i) => {
            const a = (i / 72) * Math.PI * 2;
            const long = i % 6 === 0;
            const r1 = long ? 452 : 462;
            return (
              <line
                key={i}
                x1={500 + Math.cos(a) * r1}
                y1={500 + Math.sin(a) * r1}
                x2={500 + Math.cos(a) * 470}
                y2={500 + Math.sin(a) * 470}
                strokeOpacity={long ? 0.22 : 0.1}
              />
            );
          })}
        </g>
      </svg>

      {/* drifting motes */}
      <div className="hero-motes">
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="hero-mote"
            style={{
              left: m.x + '%',
              top: m.y + '%',
              animationDuration: m.d + 's',
              animationDelay: m.delay + 's',
            }}
          />
        ))}
      </div>

      {/* a satellite tracking a long dashed trajectory across the upper field */}
      <svg className="hero-sat-svg" viewBox="0 0 1200 420" preserveAspectRatio="xMaxYMin slice">
        <path
          className="hero-sat-track"
          d="M1190 20 C 980 96, 812 150, 604 196 C 404 240, 232 262, 20 268"
          fill="none"
        />
        <g className="hero-sat">
          <g transform="rotate(-24)">
            <rect x="-4" y="-5" width="8" height="10" rx="1.5" />
            <rect x="-17" y="-3.4" width="11" height="6.8" rx="1" className="hero-sat-panel" />
            <rect x="6" y="-3.4" width="11" height="6.8" rx="1" className="hero-sat-panel" />
            <path d="M0 -5 v-5" />
          </g>
        </g>
      </svg>

      <div className="hero-hairline hero-hairline-top" />
      <div className="hero-hairline hero-hairline-bottom" />
    </div>
  );
}
