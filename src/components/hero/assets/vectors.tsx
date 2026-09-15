/**
 * SST hero asset pack — independent web-ready vector assets.
 *
 * Each export below is one asset from the supplied inventory sheet, recreated
 * as a standalone SVG component rather than sliced out of the sheet. They are
 * never flattened together: every asset is its own element, drawn in its own
 * local coordinate space, and is positioned and animated independently by the
 * scene.
 *
 * Convention: origin (0,0) is the asset's ground-contact point, centred
 * horizontally; the body extends upward in -y. That lets a motion path drive
 * any asset with `alignOrigin: [0.5, 1]` and have it sit correctly on the path.
 *
 * Palette follows the sheet's brand block:
 *   orange #FF4B1F · deep navy #071421 · white #FFFFFF
 * with the sheet's cool blue-grey daylight and warm low-sun shading.
 */

import { ASSETS } from '../assets';

export const PACK = {
  orange: '#FF4B1F',
  orangeDeep: '#D63A12',
  navy: '#071421',
  steel: '#3D5162',
  steelLight: '#7C93A6',
  glass: '#2E4257',
  white: '#FFFFFF',
  shell: '#F3F6F9',
  shellShade: '#D8E1E9',
} as const;

/* ------------------------------------------------------------------ *
 * Shared lighting — one warm key from the right, one cool fill.
 * Mounted once by the scene; every asset references these ids.
 * ------------------------------------------------------------------ */
export function AssetGradients() {
  return (
    <>
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
      <linearGradient id="pk-hull" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#16283A" />
        <stop offset="70%" stopColor="#0B1B29" />
        <stop offset="100%" stopColor="#071421" />
      </linearGradient>
      <linearGradient id="pk-steel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8FA5B6" />
        <stop offset="100%" stopColor="#5A7186" />
      </linearGradient>
      <linearGradient id="pk-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#24456B" />
        <stop offset="55%" stopColor="#153050" />
        <stop offset="100%" stopColor="#1E3C60" />
      </linearGradient>
      <linearGradient id="pk-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D3DEE8" />
      </linearGradient>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * TRANSPORT
 * ------------------------------------------------------------------ */

export function Train() {
  return (
    <g>
      <image href={ASSETS.train} x={-150} y={-46} width={300} height={46} preserveAspectRatio="xMidYMax meet" />
    </g>
  );
}

export function Truck() {
  return (
    <g>
      <image href={ASSETS.truck} x={-58} y={-44} width={116} height={44} preserveAspectRatio="xMidYMax meet" />
    </g>
  );
}

export function CargoShip() {
  return (
    <g>
      <image href={ASSETS.ship} x={-105} y={-58} width={210} height={58} preserveAspectRatio="xMidYMax meet" />
    </g>
  );
}

export function Airplane() {
  return (
    <g>
      <image href={ASSETS.airplane} x={-46} y={-19} width={92} height={38} preserveAspectRatio="xMidYMax meet" />
    </g>
  );
}


/**
 * A road car, ~44 x 18, facing +x. Four body shapes keep the traffic from
 * reading as one vehicle duplicated down the carriageway.
 */
export function Car({ variant = 0, tone = '#E8EDF2' }: { variant?: 0 | 1 | 2 | 3; tone?: string }) {
  const roofs = [
    'M-13 -10 L-6 -17 L7 -17 L13 -10 Z',          // saloon
    'M-14 -11 L-9 -18 L10 -18 L14 -12 L14 -11 Z', // estate
    'M-12 -12 L-7 -19 L6 -19 L12 -12 Z',          // hatch
    'M-15 -10 L-7 -16 L11 -16 L15 -10 Z',         // crossover
  ];
  return (
    <g>
      <ellipse cx="0" cy="1" rx="19" ry="2.6" fill={PACK.navy} opacity="0.16" />
      <path d={roofs[variant]} fill={tone} />
      <path d={roofs[variant]} fill="url(#pk-shell)" opacity="0.35" />
      <rect x={-18} y={-10} width="36" height="8" rx="3" fill={tone} />
      <rect x={-18} y={-10} width="36" height="8" rx="3" fill="url(#pk-shell)" opacity="0.4" />
      <path d={roofs[variant]} fill={PACK.glass} opacity="0.55" transform="scale(0.72 0.62) translate(0 -6)" />
      <rect x={15} y={-8} width="3.4" height="2.4" rx="1.2" fill="#FFE9C8" />
      <rect x={-18.4} y={-8} width="3" height="2.2" rx="1.1" fill="#C2402A" />
      <circle cx={-10} cy={-1.4} r="3.4" fill={PACK.navy} />
      <circle cx={11} cy={-1.4} r="3.4" fill={PACK.navy} />
    </g>
  );
}

/** A small harbour vessel, ~64 x 20, facing +x — the bay is never empty. */
export function Tender() {
  return (
    <g>
      <path d="M-30 0 L28 0 L22 -8 L-30 -8 Z" fill="url(#pk-hull)" />
      <rect x={-18} y={-16} width="22" height="8" rx="1.5" fill="url(#pk-shell)" />
      <rect x={-15} y={-14} width="16" height="3" fill={PACK.glass} opacity="0.8" />
      <rect x={-30} y={-9} width="58" height="1.6" fill={PACK.orange} opacity="0.7" />
    </g>
  );
}

/* ------------------------------------------------------------------ *
 * ENERGY
 * ------------------------------------------------------------------ */

/** wind-turbine.png — tower + nacelle only; blades are a separate asset. */
export function TurbineTower({ s = 1 }: { s?: number }) {
  return (
    <g>
      <path d={`M${-5.5 * s} 0 L${5.5 * s} 0 L${2.6 * s} ${-212 * s} L${-2.6 * s} ${-212 * s} Z`} fill="url(#pk-shell-v)" />
      <rect x={-8 * s} y={-219 * s} width={17 * s} height={8 * s} rx={3 * s} fill="url(#pk-shell)" />
      <ellipse cx="0" cy="0" rx={9 * s} ry={2.4 * s} fill={PACK.navy} opacity="0.12" />
    </g>
  );
}

/** wind-turbine-blades.png — rotor alone, so only the blades ever turn. */
export function TurbineBlades({ s = 1 }: { s?: number }) {
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

/** solar-panels.png — tilted PV array on its frame. */
export function SolarArray() {
  return (
    <g>
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const x = col * 92 + row * 26;
          const y = row * 54;
          return (
            <g key={`${row}-${col}`}>
              <path d={`M${x} ${y} l72 -22 l14 26 l-72 22 Z`} fill="url(#pk-panel)" />
              <path d={`M${x + 24} ${y - 7} l14 26 M${x + 48} ${y - 15} l14 26`} stroke="#4C7CB0" strokeWidth="1" opacity="0.5" />
              <path d={`M${x} ${y} l72 -22`} stroke="#8FB4D8" strokeWidth="1.2" opacity="0.7" />
              <rect x={x + 30} y={y + 4} width="3" height="12" fill={PACK.steel} opacity="0.7" />
            </g>
          );
        })
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ *
 * FIXED INFRASTRUCTURE
 * ------------------------------------------------------------------ */

export function Warehouse() {
  return (
    <g>
      <image href={ASSETS.campus} x={0} y={0} width={236} height={150} preserveAspectRatio="xMidYMax meet" />
    </g>
  );
}

export function ContainerCrane() {
  return (
    <g>
      <image href={ASSETS.crane} x={-20} y={0} width={160} height={200} preserveAspectRatio="xMidYMax meet" />
    </g>
  );
}

export function CommsTower() {
  return (
    <g>
      <image href={ASSETS.tower} x={0} y={0} width={80} height={220} preserveAspectRatio="xMidYMax meet" />
    </g>
  );
}

export function Substation() {
  return (
    <g>
      <image href={ASSETS.substation} x={0} y={0} width={150} height={120} preserveAspectRatio="xMidYMax meet" />
    </g>
  );
}

/* ------------------------------------------------------------------ *
 * ATMOSPHERE
 * ------------------------------------------------------------------ */

/** cloud-01/02/03.png — three soft cumulus forms, each its own asset. */
export function Cloud({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const forms = {
    1: [
      [0, 0, 150, 30], [-54, -16, 78, 34], [42, -24, 96, 42], [-6, -30, 66, 34],
    ],
    2: [
      [0, 0, 132, 26], [-44, -14, 66, 28], [38, -18, 82, 34],
    ],
    3: [
      [0, 0, 170, 32], [-58, -18, 86, 34], [46, -26, 104, 46], [-2, -34, 58, 30],
    ],
  } as const;
  return (
    <g fill="url(#pk-cloud)">
      {forms[variant].map(([cx, cy, rx, ry], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />
      ))}
    </g>
  );
}

/** birds.png — a loose skein, drawn small and dark. */
export function Birds() {
  const marks: [number, number, number][] = [
    [0, 0, 1], [26, -12, 0.8], [48, 6, 0.9], [74, -6, 0.7], [96, 10, 0.85], [124, -2, 0.75],
  ];
  return (
    <g stroke={PACK.navy} strokeWidth="1.4" fill="none" opacity="0.45" strokeLinecap="round">
      {marks.map(([x, y, s], i) => (
        <path key={i} d={`M${x} ${y} q${5 * s} ${-4 * s} ${10 * s} 0 q${5 * s} ${-4 * s} ${10 * s} 0`} />
      ))}
    </g>
  );
}
