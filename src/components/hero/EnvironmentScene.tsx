import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ASSETS } from './assets';
import { AssetGradients, Car, Cloud, Tender, Train, Truck, TurbineBlades, TurbineTower } from './assets/vectors';
import type { MotionState } from './HeroVisual';

gsap.registerPlugin(MotionPathPlugin);

/* ---------------------------------------------------------------------------
 * A 1920 x 1080 scene laid over the environment plate, which is a true 16:9
 * frame and so maps 1:1 onto these coordinates. Every route below was read off
 * that photograph: the train rides its elevated viaduct, traffic runs the
 * bridge deck onto the interchange, and the vessels sail its bay.
 *
 * Depth is explicit: BACKGROUND (sky, skyline) - MIDGROUND (rail, port,
 * energy, vessels) - DIGITAL (globe, network) - FOREGROUND (highway, traffic,
 * motes), each on its own parallax multiplier and its own clock.
 * ------------------------------------------------------------------------- */

const PATHS = {
  /** the elevated viaduct entering from the left, behind the bridge pylon */
  rail: 'M-140 478 C 160 506, 400 530, 720 558',
  /** the same viaduct, a little further back, for a second service */
  railFar: 'M-140 462 C 160 490, 400 514, 700 542',
  /** the bridge deck, running down onto the interchange — traffic approaches */
  roadOut: 'M300 622 C 700 712, 1080 804, 1560 952',
  /** the returning carriageway looping out of the interchange */
  roadIn: 'M1900 872 C 1690 926, 1470 986, 1220 1072',
  /** the slip road under the deck, carrying small background traffic */
  bridgeRoad: 'M980 690 C 1120 724, 1250 762, 1380 806',
  /** three lanes in the open bay beyond the terminal, near to far */
  shipMain: 'M1360 744 C 1530 734, 1700 723, 1890 712',
  shipSecond: 'M1470 676 C 1615 679, 1760 681, 1900 684',
  shipFar: 'M1560 626 C 1665 630, 1770 634, 1890 638',
  /** two departures crossing the sky, both right to left */
  flightNear: 'M2100 268 C 1520 318, 920 374, 220 444',
  flightFar: 'M2140 158 C 1620 184, 1120 216, 560 256',
} as const;

const ID = {
  rail: '#p-rail',
  railFar: '#p-rail-far',
  roadOut: '#p-road-out',
  roadIn: '#p-road-in',
  bridgeRoad: '#p-bridge',
  shipMain: '#p-ship-main',
  shipSecond: '#p-ship-second',
  shipFar: '#p-ship-far',
  flightNear: '#p-flight-near',
  flightFar: '#p-flight-far',
} as const;

/**
 * Parallax multipliers, in design units — the brief's background 1x,
 * midground 2x, globe 3x, network 3.5x, foreground 5x.
 */
const DEPTH: Record<string, number> = {
  plate: 6,
  cloudFar: 8,
  rail: 12,
  port: 12,
  energy: 12,
  sea: 12,
  air: 14,
  cloudMid: 16,
  road: 24,
  fore: 26,
};

/** Three machines at three depths, none of them in step. */
const TURBINES = [
  { x: 1618, y: 492, s: 0.2, spin: 14, fade: 0.44 },
  { x: 1702, y: 500, s: 0.26, spin: 11, fade: 0.56 },
  { x: 1806, y: 512, s: 0.32, spin: 8, fade: 0.66 },
];

/**
 * Where the digital network touches the physical world. Each anchor is a real
 * place in the plate, and each gets a data route back to the globe.
 */
const LINKS = [
  // `bow` is the sideways lift of the control point as a fraction of the
  // route's length; the sign steers the curve clear of the copy.
  { id: 'rail', x: 700, y: 556, speed: 0.19, bow: -0.3 },
  { id: 'port', x: 1120, y: 604, speed: 0.14, bow: -0.16 },
  { id: 'road', x: 1372, y: 878, speed: 0.23, bow: 0.12 },
  { id: 'energy', x: 1770, y: 430, speed: 0.11, bow: 0.2 },
];

interface Props {
  motion: React.RefObject<MotionState>;
  reducedMotion: boolean;
}

export default function EnvironmentScene({ motion, reducedMotion }: Props) {
  const rootRef = useRef<SVGSVGElement>(null);
  const layerRefs = useRef<Record<string, SVGGElement | null>>({});
  const linkRefs = useRef<SVGPathElement[]>([]);
  const linkDotRefs = useRef<SVGCircleElement[]>([]);
  const linkPulseRefs = useRef<SVGCircleElement[]>([]);
  const packetRefs = useRef<SVGCircleElement[]>([]);
  /** Control points of each data route, in scene units, recomputed on layout. */
  const linkGeom = useRef(LINKS.map(() => ({ x0: 0, y0: 0, cx: 0, cy: 0, x1: 0, y1: 0 })));

  const setLayer = (name: string) => (el: SVGGElement | null) => {
    layerRefs.current[name] = el;
  };
  const collect =
    <T,>(store: React.RefObject<T[]>, i: number) =>
    (el: T | null) => {
      if (el) store.current[i] = el;
    };

  /* ------------------------------------------------------------------ *
   * Everything that travels a route
   * ------------------------------------------------------------------ */
  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      /**
       * Send a thing along a route. `offset` staggers the loop so nothing ever
       * departs in convoy, and the scale pair sizes it for distance.
       */
      const ride = (
        name: string,
        path: string,
        duration: number,
        offset: number,
        scaleFrom: number,
        scaleTo: number,
        vars: gsap.TweenVars = {}
      ) => {
        const { motionPath, ...rest } = vars;
        const travel = gsap.to('.' + name, {
          motionPath: motionPath ?? { path, align: path, alignOrigin: [0.5, 1], autoRotate: true },
          duration,
          ease: 'none',
          repeat: -1,
          ...rest,
        });
        const size = gsap.fromTo(
          '.' + name + '-s',
          { scale: scaleFrom, transformOrigin: '50% 100%' },
          { scale: scaleTo, duration, ease: 'none', repeat: -1, ...rest }
        );
        travel.progress(offset);
        size.progress(offset);
        if (reducedMotion) {
          travel.pause();
          size.pause();
        }
      };

      /* --- foreground traffic: seven vehicles, no two alike --- */
      ride('v-truck-a', ID.roadOut, 34, 0.0, 1.22, 0.32);
      ride('v-car-a', ID.roadOut, 16, 0.42, 1.05, 0.28);
      ride('v-car-b', ID.roadOut, 13, 0.74, 1.0, 0.26);
      ride('v-truck-b', ID.roadIn, 30, 0.18, 0.3, 1.18);
      ride('v-car-c', ID.roadIn, 18, 0.55, 0.28, 1.02);
      ride('v-car-d', ID.roadIn, 11, 0.86, 0.26, 0.98);
      ride('v-car-e', ID.bridgeRoad, 23, 0.3, 0.46, 0.26);

      /* --- rail: a service crosses, then the line rests --- */
      ride('v-train', ID.rail, 30, 0.1, 0.58, 1.0, { repeatDelay: 11 });
      ride('v-train-far', ID.railFar, 46, 0.6, 0.3, 0.42, { repeatDelay: 18 });

      /* --- the bay: three vessels at three speeds --- */
      ride('v-ship', ID.shipMain, 104, 0.24, 0.92, 0.6);
      ride('v-ship-b', ID.shipSecond, 74, 0.62, 1.12, 0.78);
      ride('v-tender', ID.shipFar, 58, 0.4, 0.5, 0.36);

      /* --- the air: two departures, nose forward --- */
      ride('v-plane', ID.flightNear, 68, 0.2, 1.0, 0.56, {
        repeatDelay: 14,
        motionPath: { path: ID.flightNear, align: ID.flightNear, alignOrigin: [0.5, 0.5], autoRotate: true },
      });
      ride('v-plane-far', ID.flightFar, 96, 0.66, 0.42, 0.3, {
        repeatDelay: 22,
        motionPath: { path: ID.flightFar, align: ID.flightFar, alignOrigin: [0.5, 0.5], autoRotate: true },
      });

      if (reducedMotion) return;

      /* --- things that move in place --- */
      gsap.to('.v-ship-bob', { y: 2.4, rotation: 0.4, transformOrigin: '50% 100%', duration: 5.8, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('.v-ship-b-bob', { y: 3.1, rotation: -0.5, transformOrigin: '50% 100%', duration: 4.3, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('.v-tender-bob', { y: 2, rotation: 0.8, transformOrigin: '50% 100%', duration: 3.1, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }, scope);

    return () => ctx.revert();
  }, [reducedMotion]);

  /* ------------------------------------------------------------------ *
   * Parallax, and the data routes that tie the globe to the ground
   * ------------------------------------------------------------------ */
  useEffect(() => {
    const svg = rootRef.current;
    if (!svg) return;

    let sx = 0;
    let sy = 0;
    let lastGlobe = '';
    const start = performance.now();

    const tick = () => {
      const m = motion.current;
      if (!m) return;
      const time = reducedMotion ? 4 : (performance.now() - start) / 1000;

      if (!reducedMotion) {
        sx += (m.px - sx) * 0.045;
        sy += (m.py - sy) * 0.045;
        for (const name in DEPTH) {
          const layer = layerRefs.current[name];
          if (!layer) continue;
          const d = DEPTH[name];
          layer.setAttribute(
            'transform',
            'translate(' + (sx * -d).toFixed(1) + ' ' + (sy * -d * 0.4 + m.scroll * d * 1.6).toFixed(1) + ')'
          );
        }
      }

      /* --- anchor the data routes to wherever the globe actually is --- */
      const g = m.globe;
      if (!g) return;

      const key = g.x.toFixed(0) + ':' + g.y.toFixed(0) + ':' + g.r.toFixed(0);
      if (key !== lastGlobe) {
        const ctm = svg.getScreenCTM();
        if (ctm) {
          lastGlobe = key;
          // Client pixels -> scene units, so slice scaling is accounted for.
          const inv = ctm.inverse();
          const pt = svg.createSVGPoint();
          pt.x = g.x;
          pt.y = g.y;
          const c = pt.matrixTransform(inv);
          pt.x = g.x + g.r;
          const edge = pt.matrixTransform(inv);
          const radius = Math.abs(edge.x - c.x);

          LINKS.forEach((link, i) => {
            const dx = link.x - c.x;
            const dy = link.y - c.y;
            const len = Math.hypot(dx, dy) || 1;
            const geom = linkGeom.current[i];
            geom.x0 = c.x + (dx / len) * radius;
            geom.y0 = c.y + (dy / len) * radius;
            geom.x1 = link.x;
            geom.y1 = link.y;
            // Bow each route so they read as separate channels — and so none
            // of them sweeps across the headline.
            const bow = len * link.bow;
            geom.cx = (geom.x0 + geom.x1) / 2 - (dy / len) * bow;
            geom.cy = (geom.y0 + geom.y1) / 2 + (dx / len) * bow;
            linkRefs.current[i]?.setAttribute(
              'd',
              'M' + geom.x0.toFixed(1) + ',' + geom.y0.toFixed(1) +
                'Q' + geom.cx.toFixed(1) + ',' + geom.cy.toFixed(1) +
                ' ' + geom.x1.toFixed(1) + ',' + geom.y1.toFixed(1)
            );
            linkDotRefs.current[i]?.setAttribute('cx', String(link.x));
            linkDotRefs.current[i]?.setAttribute('cy', String(link.y));
            linkPulseRefs.current[i]?.setAttribute('cx', String(link.x));
            linkPulseRefs.current[i]?.setAttribute('cy', String(link.y));
          });
        }
      }

      /* --- data running out to the physical world --- */
      for (let i = 0; i < LINKS.length; i++) {
        const geom = linkGeom.current[i];
        const p = (time * LINKS[i].speed + i * 0.27) % 1;
        const u = 1 - p;
        const packet = packetRefs.current[i];
        if (packet) {
          packet.setAttribute('cx', (u * u * geom.x0 + 2 * u * p * geom.cx + p * p * geom.x1).toFixed(1));
          packet.setAttribute('cy', (u * u * geom.y0 + 2 * u * p * geom.cy + p * p * geom.y1).toFixed(1));
          packet.setAttribute('opacity', (Math.sin(p * Math.PI) * 0.9).toFixed(2));
        }
        const pulse = linkPulseRefs.current[i];
        if (pulse) {
          // The anchor answers as each packet lands.
          const hit = Math.max(0, 1 - Math.abs(p - 0.96) * 20);
          pulse.setAttribute('r', (4 + hit * 17).toFixed(1));
          pulse.setAttribute('opacity', (hit * 0.5).toFixed(3));
        }
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [motion, reducedMotion]);

  return (
    <div className="hero-env" aria-hidden="true">
      <svg ref={rootRef} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMax slice">
        <defs>
          <AssetGradients />

          {/* the skyline dissolves upward into the page instead of ending on a seam */}
          <linearGradient id="sst-plate-fade" x1="0" y1="0" x2="0" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="26%" stopColor="#9A9A9A" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <mask id="sst-plate-mask">
            <rect x="0" y="0" width="1920" height="1080" fill="url(#sst-plate-fade)" />
          </mask>

          {/* each vessel's own water is cut away; the plate's bay reads through */}
          <linearGradient id="sst-ship-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="88%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <mask id="sst-ship-mask">
            <rect x="-120" y="-70" width="240" height="112" fill="url(#sst-ship-fade)" />
          </mask>

          <path id="p-rail" d={PATHS.rail} fill="none" stroke="none" />
          <path id="p-rail-far" d={PATHS.railFar} fill="none" stroke="none" />
          <path id="p-road-out" d={PATHS.roadOut} fill="none" stroke="none" />
          <path id="p-road-in" d={PATHS.roadIn} fill="none" stroke="none" />
          <path id="p-bridge" d={PATHS.bridgeRoad} fill="none" stroke="none" />
          <path id="p-ship-main" d={PATHS.shipMain} fill="none" stroke="none" />
          <path id="p-ship-second" d={PATHS.shipSecond} fill="none" stroke="none" />
          <path id="p-ship-far" d={PATHS.shipFar} fill="none" stroke="none" />
          <path id="p-flight-near" d={PATHS.flightNear} fill="none" stroke="none" />
          <path id="p-flight-far" d={PATHS.flightFar} fill="none" stroke="none" />
        </defs>

        {/* ===================== BACKGROUND ===================== */}
        <g ref={setLayer('plate')}>
          <g className="sst-plate-drift">
            <image
              href={ASSETS.plate}
              x="0"
              y="0"
              width="1920"
              height="1080"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#sst-plate-mask)"
            />
          </g>
        </g>

        <g ref={setLayer('cloudFar')} className="sst-cloud-far">
          <g className="sst-drift-far">
            <g transform="translate(300 250) scale(0.86)">
              <Cloud variant={1} />
            </g>
            <g transform="translate(1310 214) scale(0.66)">
              <Cloud variant={2} />
            </g>
          </g>
        </g>

        {/* ===================== MIDGROUND ===================== */}
        <g ref={setLayer('rail')}>
          <g className="v-train-far">
            <g className="v-train-far-s">
              <g transform="scale(0.3)">
                <Train />
              </g>
            </g>
          </g>
          <g className="v-train">
            <g className="v-train-s">
              <g transform="scale(0.42)">
                <Train />
              </g>
            </g>
          </g>
        </g>

        <g ref={setLayer('energy')} className="sst-energy">
          {TURBINES.map((t) => {
            const hub = t.y - 212 * t.s;
            return (
              <g key={t.x} opacity={t.fade}>
                <g transform={`translate(${t.x} ${t.y})`}>
                  <TurbineTower s={t.s} />
                </g>
                {/* only the blades turn */}
                <g transform={`translate(${t.x} ${hub})`}>
                  <g className="sst-blades" style={{ transformOrigin: '0px 0px', animationDuration: t.spin + 's' }}>
                    <TurbineBlades s={t.s} />
                  </g>
                </g>
              </g>
            );
          })}
        </g>

        {/* --- the bay --- */}
        <g ref={setLayer('sea')}>
          <g className="sst-shimmer">
            {[690, 722, 758, 800, 846].map((y, i) => (
              <ellipse key={y} cx={1420 + i * 42} cy={y} rx={180 - i * 16} ry="2.4" style={{ animationDelay: -i * 1.9 + 's' }} />
            ))}
          </g>

          <g className="v-tender">
            <g className="v-tender-s">
              {/* making port: mirrored about the travel axis, not turned over */}
              <g className="v-tender-bob" transform="scale(1 -1)">
                <Tender />
              </g>
            </g>
          </g>

          <g className="v-ship-b">
            <g className="v-ship-b-s">
              <g className="v-ship-b-bob">
                <image href={ASSETS.ship} x="-86" y="-52" width="172" height="83" opacity="0.94" />
                <path className="sst-wake" d="M78 -4 C 140 0, 210 3, 286 3" />
              </g>
            </g>
          </g>

          <g className="v-ship">
            <g className="v-ship-s">
              <g className="v-ship-bob">
                <image href={ASSETS.ship} x="-112" y="-68" width="224" height="108" />
                <path className="sst-wake" d="M100 -6 C 176 0, 262 4, 356 4" />
              </g>
            </g>
          </g>
        </g>


        {/* ===================== AIR ===================== */}
        <g ref={setLayer('air')}>
          <path className="sst-contrail" d={PATHS.flightNear} />
          <g className="v-plane-far">
            <g className="v-plane-far-s">
              <image href={ASSETS.airplane} x="-52" y="-24" width="104" height="48" opacity="0.5" />
            </g>
          </g>
          <g className="v-plane">
            <g className="v-plane-s">
              <image href={ASSETS.airplane} x="-104" y="-48" width="208" height="97" />
            </g>
          </g>
        </g>

        <g ref={setLayer('cloudMid')} className="sst-cloud-mid">
          <g className="sst-drift-mid">
            <g transform="translate(860 322) scale(0.56)">
              <Cloud variant={3} />
            </g>
            <g transform="translate(1640 296) scale(0.4)">
              <Cloud variant={1} />
            </g>
          </g>
          <g className="sst-birds">
            {[0, 26, 52, 76, 104].map((x, i) => (
              <path key={x} d={`M${x} ${i % 2 ? 6 : 0} q5 -4 10 0 q5 -4 10 0`} style={{ animationDelay: -i * 0.4 + 's' }} />
            ))}
          </g>
        </g>

        {/* ===================== DIGITAL <-> PHYSICAL ===================== */}
        <g className="sst-links">
          {LINKS.map((link, i) => (
            <g key={link.id} className={'sst-link sst-link-' + link.id}>
              <path ref={collect(linkRefs, i)} className="sst-link-line" />
              <circle ref={collect(linkPulseRefs, i)} r="4" className="sst-link-pulse" />
              <circle ref={collect(linkDotRefs, i)} r="3.4" className="sst-link-dot" />
              <circle ref={collect(packetRefs, i)} r="3.4" className="sst-link-packet" />
            </g>
          ))}
        </g>

        {/* ===================== FOREGROUND ===================== */}
        <g ref={setLayer('road')}>
          {/* outbound carriageway */}
          <g className="v-truck-a">
            <g className="v-truck-a-s">
              <g transform="scale(0.6)">
                <Truck />
              </g>
            </g>
          </g>
          <g className="v-car-a">
            <g className="v-car-a-s">
              <g transform="scale(0.8)">
                <Car variant={0} tone="#EDF1F5" />
              </g>
            </g>
          </g>
          <g className="v-car-b">
            <g className="v-car-b-s">
              <g transform="scale(0.72)">
                <Car variant={2} tone="#C9D6E2" />
              </g>
            </g>
          </g>

          {/* inbound carriageway — mirrored about the travel axis */}
          <g className="v-truck-b">
            <g className="v-truck-b-s">
              {/* one flip: autoRotate turns it 180 to face left, this rights it */}
              <g transform="scale(0.6 -0.6)">
                <Truck />
              </g>
            </g>
          </g>
          <g className="v-car-c">
            <g className="v-car-c-s">
              <g transform="scale(0.8 -0.8)">
                <Car variant={3} tone="#DFE6EC" />
              </g>
            </g>
          </g>
          <g className="v-car-d">
            <g className="v-car-d-s">
              <g transform="scale(0.74 -0.74)">
                <Car variant={1} tone="#B9C7D4" />
              </g>
            </g>
          </g>

          {/* background traffic on the bridge approach */}
          <g className="v-car-e">
            <g className="v-car-e-s">
              <g transform="scale(0.5)">
                <Car variant={2} tone="#D4DEE7" />
              </g>
            </g>
          </g>
        </g>

        {/* --- drifting light --- */}
        <g ref={setLayer('fore')} className="sst-atmos">
          <rect x="-40" y="556" width="2000" height="210" className="sst-haze" />
          {[
            [380, 720], [660, 860], [980, 790], [1290, 910], [1540, 840], [820, 980], [1700, 960],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              className="sst-mote"
              style={{ animationDelay: -i * 3.6 + 's', animationDuration: 22 + i * 2.5 + 's' }}
            />
          ))}
        </g>
      </svg>

      {/* a scrim behind the copy only — the scene itself keeps its contrast */}
      <div className="hero-env-scrim" />
    </div>
  );
}
