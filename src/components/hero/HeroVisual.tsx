import { useEffect, useMemo, useRef } from 'react';
import { NETWORK_NODES, ROUTES } from './globeData';
import { WORLD_RINGS, INDIA_RINGS, type LonLat } from './worldGeo';
import { HERO_SERVICES, type HeroService } from './heroServices';

/* ------------------------------------------------------------------ *
 * Geometry constants — everything lives in a 1000 x 1000 design space *
 * ------------------------------------------------------------------ */
const VB = 1000;
const CX = 500;
const CY = 500;
const R = 280;

const ORBIT_TILT = -12; // degrees
/**
 * Three orbital shells. `ox` pushes each shell's centre to the right of the
 * globe, so the network fans out over the bay rather than back across the
 * headline — and the shells stop reading as one concentric menu.
 */
const ORBITS = [
  { rx: 424, ry: 336, ox: 58, duration: 168, dir: 1 },
  { rx: 378, ry: 302, ox: 40, duration: 214, dir: -1 },
  { rx: 330, ry: 268, ox: 26, duration: 132, dir: 1 },
];

const GLOBE_PERIOD = 34; // seconds per full rotation
const MERIDIANS = 12;
const PARALLELS = [-60, -30, 0, 30, 60];

const DEG = Math.PI / 180;
const TILT_COS = Math.cos(ORBIT_TILT * DEG);
const TILT_SIN = Math.sin(ORBIT_TILT * DEG);

/* ---------------------------- helpers ----------------------------- */

/** Insert intermediate vertices so coastlines stay smooth once projected. */
function densify(points: LonLat[], maxStep = 5): LonLat[] {
  const out: LonLat[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [lon1, lat1] = points[i];
    const [lon2, lat2] = points[i + 1];
    const steps = Math.max(
      1,
      Math.ceil(Math.max(Math.abs(lon2 - lon1), Math.abs(lat2 - lat1)) / maxStep)
    );
    for (let s = 0; s < steps; s++) {
      const k = s / steps;
      out.push([lon1 + (lon2 - lon1) * k, lat1 + (lat2 - lat1) * k]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

/** Pre-compute the unit sphere vector for every vertex; rotation is then cheap. */
function toVectors(points: LonLat[]): Float64Array {
  const v = new Float64Array(points.length * 3);
  for (let i = 0; i < points.length; i++) {
    const [lon, lat] = points[i];
    const la = lat * DEG;
    const lo = lon * DEG;
    v[i * 3] = Math.cos(la) * Math.sin(lo);
    v[i * 3 + 1] = -Math.sin(la);
    v[i * 3 + 2] = Math.cos(la) * Math.cos(lo);
  }
  return v;
}

/** Spherical interpolation between two nodes — used for the connection routes. */
function greatCircle(a: LonLat, b: LonLat, steps = 22): LonLat[] {
  const toVec = ([lon, lat]: LonLat) => {
    const la = lat * DEG;
    const lo = lon * DEG;
    return [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)];
  };
  const va = toVec(a);
  const vb = toVec(b);
  const dot = Math.min(1, Math.max(-1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
  const omega = Math.acos(dot);
  const out: LonLat[] = [];
  for (let i = 0; i <= steps; i++) {
    const k = i / steps;
    let x: number, y: number, z: number;
    if (omega < 1e-6) {
      [x, y, z] = va;
    } else {
      const s1 = Math.sin((1 - k) * omega) / Math.sin(omega);
      const s2 = Math.sin(k * omega) / Math.sin(omega);
      x = va[0] * s1 + vb[0] * s2;
      y = va[1] * s1 + vb[1] * s2;
      z = va[2] * s1 + vb[2] * s2;
    }
    const lat = Math.atan2(z, Math.hypot(x, y)) / DEG;
    const lon = Math.atan2(y, x) / DEG;
    out.push([lon, lat]);
  }
  return out;
}

/**
 * Project a pre-computed vector buffer under a longitude rotation and emit two
 * path strings: the hemisphere facing the viewer, and the one behind it.
 */
function projectPaths(vecs: Float64Array, sin: number, cos: number): [string, string] {
  let front = '';
  let back = '';
  let frontOpen = false;
  let backOpen = false;
  for (let i = 0; i < vecs.length; i += 3) {
    const vx = vecs[i];
    const vy = vecs[i + 1];
    const vz = vecs[i + 2];
    const x = CX + R * (vx * cos + vz * sin);
    const y = CY + R * vy;
    const z = vz * cos - vx * sin;
    const coords = x.toFixed(1) + ',' + y.toFixed(1);
    if (z >= 0) {
      front += (frontOpen ? 'L' : 'M') + coords;
      frontOpen = true;
      backOpen = false;
    } else {
      back += (backOpen ? 'L' : 'M') + coords;
      backOpen = true;
      frontOpen = false;
    }
  }
  return [front, back];
}

export interface MotionState {
  px: number;
  py: number;
  scroll: number;
  /** Globe centre and radius in client pixels, so the environment can wire
   *  its data routes to the real position at any viewport size. */
  globe: { x: number; y: number; r: number } | null;
}

interface Props {
  activeService: string | null;
  hoveredService: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  /** Shared, mutable pointer + scroll state written by the parent section. */
  motion: React.RefObject<MotionState>;
  reducedMotion: boolean;
}

export default function HeroVisual({
  activeService,
  hoveredService,
  onHover,
  onSelect,
  motion,
  reducedMotion,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const globeLayerRef = useRef<SVGGElement>(null);
  const orbitLayerRef = useRef<SVGGElement>(null);
  const nodeLayerRefs = useRef<HTMLDivElement[]>([]);

  const meridianRefs = useRef<SVGEllipseElement[]>([]);
  const landFrontRefs = useRef<SVGPathElement[]>([]);
  const landBackRefs = useRef<SVGPathElement[]>([]);
  const indiaFrontRef = useRef<SVGPathElement>(null);
  const indiaFillRef = useRef<SVGPathElement>(null);
  const routeRefs = useRef<SVGPathElement[]>([]);
  const nodeDotRefs = useRef<SVGCircleElement[]>([]);
  const nodeHaloRefs = useRef<SVGCircleElement[]>([]);
  const serviceRefs = useRef<HTMLButtonElement[]>([]);
  const linkRefs = useRef<SVGPathElement[]>([]);
  const particleRefs = useRef<SVGCircleElement[][]>([]);

  /* Static geometry, computed once. */
  const land = useMemo(() => WORLD_RINGS.map((ring) => toVectors(densify(ring, 4))), []);
  const india = useMemo(() => INDIA_RINGS.map((ring) => toVectors(densify(ring, 2))), []);
  const nodeVecs = useMemo(
    () => toVectors(NETWORK_NODES.map((n) => [n.lon, n.lat] as LonLat)),
    []
  );
  const routeVecs = useMemo(
    () =>
      ROUTES.map(([from, to]) => {
        const a = NETWORK_NODES.find((n) => n.id === from)!;
        const b = NETWORK_NODES.find((n) => n.id === to)!;
        return toVectors(greatCircle([a.lon, a.lat], [b.lon, b.lat]));
      }),
    []
  );

  /* The loop reads hover / active state through a ref so that state changes
     never interrupt or restart the animation. */
  const stateRef = useRef({ active: activeService, hovered: hoveredService });
  stateRef.current = { active: activeService, hovered: hoveredService };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    /* Label boxes are estimated from the text rather than measured, so the
       collision pass never forces a layout inside the animation frame. */
    const LABEL_W = HERO_SERVICES.map((s2) => 26 + s2.label.length * 6.4);
    type Candidate = { btn: HTMLButtonElement; svc: HeroService; x: number; y: number; near: number; side: string };
    const candidates: Candidate[] = [];
    const placed: { x0: number; y0: number; x1: number; y1: number }[] = [];
    const rank = (c: Candidate, active: string | null, hovered: string | null) =>
      (hovered === c.svc.id ? 100 : 0) + (active === c.svc.id ? 50 : 0) + c.near;

    let size = el.clientWidth || 1;
    const onResize = () => {
      size = el.clientWidth || 1;
    };
    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    // Smoothed parallax offsets.
    let sx = 0;
    let sy = 0;
    let frame = 0;
    let frameCount = 0;
    const start = performance.now();

    const render = (now: number) => {
      const time = reducedMotion ? 6 : (now - start) / 1000;
      const scale = size / VB;
      const m = motion.current ?? { px: 0, py: 0, scroll: 0 };

      sx += (m.px - sx) * 0.055;
      sy += (m.py - sy) * 0.055;

      /* ---------- globe rotation ---------- */
      const phase = (time / GLOBE_PERIOD) * Math.PI * 2;
      const cos = Math.cos(phase);
      const sin = Math.sin(phase);

      for (let i = 0; i < MERIDIANS; i++) {
        const meridian = meridianRefs.current[i];
        if (!meridian) continue;
        const lon = (i / MERIDIANS) * Math.PI * 2 + phase;
        meridian.setAttribute('rx', (Math.abs(Math.sin(lon)) * R).toFixed(1));
      }

      for (let i = 0; i < land.length; i++) {
        const [front, back] = projectPaths(land[i], sin, cos);
        landFrontRefs.current[i]?.setAttribute('d', front);
        landBackRefs.current[i]?.setAttribute('d', back);
      }

      let indiaPath = '';
      let indiaWhole = true;
      for (let i = 0; i < india.length; i++) {
        const [front] = projectPaths(india[i], sin, cos);
        if (front.length === 0 || front.indexOf('M', 1) !== -1) indiaWhole = false;
        indiaPath += front;
      }
      indiaFrontRef.current?.setAttribute('d', indiaPath);
      // Only fill India while its whole outline sits on the near hemisphere.
      indiaFillRef.current?.setAttribute('d', indiaWhole ? indiaPath + 'Z' : '');

      for (let i = 0; i < routeVecs.length; i++) {
        const [front] = projectPaths(routeVecs[i], sin, cos);
        routeRefs.current[i]?.setAttribute('d', front);
      }

      /* ---------- network points ---------- */
      for (let i = 0; i < NETWORK_NODES.length; i++) {
        const dot = nodeDotRefs.current[i];
        const halo = nodeHaloRefs.current[i];
        if (!dot) continue;
        const vx = nodeVecs[i * 3];
        const vy = nodeVecs[i * 3 + 1];
        const vz = nodeVecs[i * 3 + 2];
        const x = CX + R * (vx * cos + vz * sin);
        const y = CY + R * vy;
        const z = vz * cos - vx * sin;
        if (z <= 0.04) {
          dot.setAttribute('opacity', '0');
          if (halo) halo.setAttribute('opacity', '0');
          continue;
        }
        const node = NETWORK_NODES[i];
        const depth = Math.min(1, z * 1.8);
        dot.setAttribute('cx', x.toFixed(1));
        dot.setAttribute('cy', y.toFixed(1));
        dot.setAttribute('opacity', (depth * (node.primary ? 0.95 : 0.6)).toFixed(2));
        if (halo) {
          // Each point breathes on its own offset so the field never pulses in unison.
          const p = ((time * 0.45 + node.phase) % 3) / 3;
          halo.setAttribute('cx', x.toFixed(1));
          halo.setAttribute('cy', y.toFixed(1));
          halo.setAttribute('r', (2.5 + p * (node.primary ? 12 : 7)).toFixed(1));
          halo.setAttribute('opacity', ((1 - p) * 0.4 * depth).toFixed(3));
        }
      }

      /* ---------- orbital service nodes ---------- */
      const { active, hovered } = stateRef.current;
      for (let i = 0; i < HERO_SERVICES.length; i++) {
        const svc = HERO_SERVICES[i];
        const btn = serviceRefs.current[i];
        if (!btn) continue;
        const orbit = ORBITS[svc.orbit];
        const a = (svc.t + (orbit.dir * time) / orbit.duration) * Math.PI * 2;
        const ox = orbit.rx * Math.cos(a);
        const oy = orbit.ry * Math.sin(a);
        // Independent bob, unique period per node.
        const bob = Math.sin((time / svc.float) * Math.PI * 2 + i) * 7;
        const bobX = Math.cos((time / (svc.float * 1.37)) * Math.PI * 2 + i) * 5;
        const parallax = 0.5 + svc.orbit * 0.32; // outer nodes drift most with the pointer
        const x = CX + orbit.ox + ox * TILT_COS - oy * TILT_SIN + bobX + sx * 26 * parallax;
        const y = CY + ox * TILT_SIN + oy * TILT_COS + bob + sy * 20 * parallax;

        /* Depth: a node on the near side of its orbit comes forward and
           brightens, one on the far side recedes. This is what stops the ring
           reading as a circular menu. */
        const near = (Math.sin(a) + 1) / 2;
        const nodeScale = 0.78 + near * 0.4;
        btn.style.transform =
          'translate3d(' + (x * scale).toFixed(1) + 'px,' + (y * scale).toFixed(1) + 'px,0) scale(' +
          nodeScale.toFixed(3) + ')';
        btn.style.opacity = (0.5 + near * 0.5).toFixed(2);
        btn.style.zIndex = String(10 + Math.round(near * 10));

        const side = x < CX ? 'left' : 'right';
        if (btn.dataset.side !== side) btn.dataset.side = side;

        // Collected first, resolved together below — a label can only be
        // shown once it is known not to collide with anything already placed.
        candidates[i] = { btn, svc, x: x * scale, y: y * scale, near, side };

        /* Connection line from the node to the edge of the globe. */
        const dx = CX - x;
        const dy = CY - y;
        const dist = Math.hypot(dx, dy) || 1;
        const x2 = CX - (dx / dist) * (R + 6);
        const y2 = CY - (dy / dist) * (R + 6);
        linkRefs.current[i]?.setAttribute(
          'd',
          'M' + x.toFixed(1) + ',' + y.toFixed(1) + 'L' + x2.toFixed(1) + ',' + y2.toFixed(1)
        );

        /* Data particles travelling the line towards the core. */
        const isLive = active === svc.id || hovered === svc.id;
        const parts = particleRefs.current[i];
        if (parts) {
          for (let p = 0; p < parts.length; p++) {
            const prog = (time * (isLive ? 0.42 : 0.18) + p / parts.length + svc.t) % 1;
            const eased = prog * prog * (3 - 2 * prog);
            parts[p].setAttribute('cx', (x + (x2 - x) * eased).toFixed(1));
            parts[p].setAttribute('cy', (y + (y2 - y) * eased).toFixed(1));
            const fade = Math.sin(prog * Math.PI);
            parts[p].setAttribute('opacity', (fade * (isLive ? 0.95 : 0.28)).toFixed(2));
            parts[p].setAttribute('r', isLive ? '3.1' : '2.2');
          }
        }
      }

      /* ---------- labels: strongest claim first, no overlaps ---------- */
      placed.length = 0;
      const globeR = R * scale;
      const gx = CX * scale;
      const gy = CY * scale;
      const order = candidates
        .map((c, i) => i)
        .sort((a, b) => rank(candidates[b], active, hovered) - rank(candidates[a], active, hovered));

      for (const i of order) {
        const c = candidates[i];
        if (!c) continue;
        const w = LABEL_W[i];
        const x0 = c.side === 'left' ? c.x - 30 * scale - w : c.x + 30 * scale;
        const box = { x0, y0: c.y - 17, x1: x0 + w, y1: c.y + 17 };
        const forced = active === c.svc.id || hovered === c.svc.id;

        // Clear of the sphere, inside the visual column, above the foot UI,
        // and clear of every label already granted a place.
        const clearOfGlobe = Math.hypot((box.x0 + box.x1) / 2 - gx, c.y - gy) > globeR + 14;
        // The bottom band is reserved for the active-service pill.
        const inBounds = box.x0 > 6 && box.x1 < size - 6 && c.y > 26 && c.y < size - 58;
        const free = placed.every((p) => box.x0 > p.x1 || box.x1 < p.x0 || box.y0 > p.y1 || box.y1 < p.y0);
        const show = forced || (c.near > 0.4 && clearOfGlobe && inBounds && free);

        if (show) placed.push(box);
        c.btn.classList.toggle('is-labelled', show);
      }

      /* ---------- tell the environment where the globe is ---------- */
      if (motion.current && (frameCount % 12 === 0 || !motion.current.globe)) {
        const rect = el.getBoundingClientRect();
        motion.current.globe = {
          x: rect.left + (CX / VB) * rect.width,
          y: rect.top + (CY / VB) * rect.height,
          r: (R / VB) * rect.width,
        };
      }
      frameCount++;

      /* ---------- layered parallax + scroll response ---------- */
      const s = m.scroll;
      const gScale = 1 - s * 0.12;
      if (globeLayerRef.current) {
        globeLayerRef.current.setAttribute(
          'transform',
          'translate(' +
            (sx * 34 + CX * (1 - gScale)).toFixed(1) +
            ' ' +
            (sy * 26 - s * 60 + CY * (1 - gScale)).toFixed(1) +
            ') scale(' +
            gScale.toFixed(3) +
            ')'
        );
      }
      if (orbitLayerRef.current) {
        orbitLayerRef.current.setAttribute(
          'transform',
          'translate(' + (sx * 18).toFixed(1) + ' ' + (sy * 14 - s * 30).toFixed(1) + ')'
        );
      }
      for (const layer of nodeLayerRefs.current) {
        if (!layer) continue;
        layer.style.transform = 'translate3d(0,' + (-s * 30 * scale).toFixed(1) + 'px,0)';
        layer.style.opacity = String(Math.max(0, 1 - s * 1.4).toFixed(2));
      }

      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [land, india, nodeVecs, routeVecs, motion, reducedMotion]);

  const collect =
    <T,>(store: React.RefObject<T[]>, i: number) =>
    (node: T | null) => {
      if (node) store.current[i] = node;
    };

  return (
    <div className="hero-vis" ref={rootRef}>
      <svg className="hero-vis-svg" viewBox={'0 0 ' + VB + ' ' + VB} aria-hidden="true">
        <defs>
          <radialGradient id="sst-globe-shade" cx="36%" cy="30%" r="78%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="62%" stopColor="#7C93A6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#071421" stopOpacity="0.45" />
          </radialGradient>
          <radialGradient id="sst-globe-veil" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#071421" stopOpacity="0.2" />
            <stop offset="48%" stopColor="#071421" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#071421" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sst-globe-limb" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="#F4511E" stopOpacity="0" />
            <stop offset="100%" stopColor="#F4511E" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* ---------- orbital paths ---------- */}
        <g ref={orbitLayerRef} className="hero-orbits">
          {ORBITS.map((o, i) => (
            <ellipse
              key={i}
              cx={CX}
              cy={CY}
              rx={o.rx}
              ry={o.ry}
              transform={'rotate(' + ORBIT_TILT + ' ' + CX + ' ' + CY + ')'}
              className={'hero-orbit hero-orbit-' + i}
            />
          ))}
        </g>

        {/* ---------- globe ---------- */}
        <g ref={globeLayerRef}>
          <circle cx={CX} cy={CY} r={R} className="hero-globe-body" fill="url(#sst-globe-shade)" />
          <circle cx={CX} cy={CY} r={R} fill="url(#sst-globe-limb)" />

          <g className="hero-graticule">
            {PARALLELS.map((lat) => {
              const y = CY - R * Math.sin(lat * DEG);
              const half = R * Math.cos(lat * DEG);
              return <line key={lat} x1={CX - half} y1={y} x2={CX + half} y2={y} />;
            })}
            {Array.from({ length: MERIDIANS }, (_, i) => (
              <ellipse key={i} ref={collect(meridianRefs, i)} cx={CX} cy={CY} rx={R} ry={R} />
            ))}
          </g>
          <circle cx={CX} cy={CY} r={R} className="hero-globe-edge" />

          <g className="hero-land-back">
            {WORLD_RINGS.map((_, i) => (
              <path key={i} ref={collect(landBackRefs, i)} />
            ))}
          </g>
          <g className="hero-land-front">
            {WORLD_RINGS.map((_, i) => (
              <path key={i} ref={collect(landFrontRefs, i)} />
            ))}
          </g>

          <path ref={indiaFillRef} className="hero-india-fill" />
          <path ref={indiaFrontRef} className="hero-india" />

          <g className="hero-routes">
            {ROUTES.map((r, i) => (
              <path key={r.join('-')} ref={collect(routeRefs, i)} />
            ))}
          </g>

          <g className="hero-geo-nodes">
            {NETWORK_NODES.map((n, i) => (
              <circle key={'halo-' + n.id} ref={collect(nodeHaloRefs, i)} r="3" className="hero-geo-halo" />
            ))}
            {NETWORK_NODES.map((n, i) => (
              <circle
                key={n.id}
                ref={collect(nodeDotRefs, i)}
                r={n.primary ? 4 : 2.6}
                className="hero-geo-dot"
              />
            ))}
          </g>
        </g>

        {/* ---------- service connections + data particles ---------- */}
        <g className="hero-links">
          {HERO_SERVICES.map((svc, i) => {
            const live = activeService === svc.id || hoveredService === svc.id;
            return (
              <g
                key={svc.id}
                className={'hero-link-group hero-link-orbit-' + svc.orbit + (live ? ' is-live' : '')}
              >
                <path ref={collect(linkRefs, i)} className="hero-link" />
                {[0, 1].map((p) => (
                  <circle
                    key={p}
                    ref={(node) => {
                      if (!node) return;
                      if (!particleRefs.current[i]) particleRefs.current[i] = [];
                      particleRefs.current[i][p] = node;
                    }}
                    r="2.2"
                    className="hero-particle"
                  />
                ))}
              </g>
            );
          })}
        </g>
      </svg>

      {/* ---------- service nodes (real DOM for crisp type + hit testing) ----------
           Split into two stacking layers: the inner shell sits behind the
           globe and the outer shells in front, so the network has genuine
           depth rather than a ring of buttons floating on top. */}
      {([2, 0] as const).map((backOrbit) => (
      <div
        key={backOrbit}
        className={'hero-nodes' + (backOrbit === 2 ? ' hero-nodes-back' : '')}
        ref={collect(nodeLayerRefs, backOrbit === 2 ? 0 : 1)}
      >
        {HERO_SERVICES.map((svc: HeroService, i) => {
          if ((svc.orbit === 2) !== (backOrbit === 2)) return null;
          const isActive = activeService === svc.id;
          const isHovered = hoveredService === svc.id;
          const dimmed = hoveredService !== null && !isHovered;
          return (
            <button
              key={svc.id}
              type="button"
              ref={collect(serviceRefs, i)}
              className={
                'hero-node hero-node-orbit-' +
                svc.orbit +
                (isActive ? ' is-active' : '') +
                (isHovered ? ' is-hovered' : '') +
                (dimmed ? ' is-dimmed' : '')
              }
              onMouseEnter={() => onHover(svc.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(svc.id)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(svc.id)}
              aria-label={svc.label}
            >
              <span className="hero-node-disc">
                <span className="hero-node-icon">{svc.icon}</span>
                <span className="hero-node-ring" aria-hidden="true" />
              </span>
              <span className="hero-node-meta">
                <span className="hero-node-index">{svc.index}</span>
                <span className="hero-node-label">{svc.label}</span>
              </span>
            </button>
          );
        })}
      </div>
      ))}
    </div>
  );
}
