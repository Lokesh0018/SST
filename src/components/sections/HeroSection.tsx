import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBackdrop from '../hero/HeroBackdrop';
import EnvironmentScene from '../hero/EnvironmentScene';
import HeroVisual, { type MotionState } from '../hero/HeroVisual';
import { HERO_SERVICES, SECONDARY_SERVICES } from '../hero/heroServices';
import { useServiceContext } from '../../context/ServiceContext';
import '../../styles/HeroSection.css';

const CYCLE_INTERVAL = 5000;
const RESUME_DELAY = 7000;

const ICON = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const STATS = [
  {
    value: '500+',
    label: 'Happy Clients',
    icon: (
      <svg viewBox="0 0 24 24" {...ICON}>
        <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" />
        <circle cx="10" cy="8" r="3.5" />
        <path d="M20 20v-1.5a3.5 3.5 0 0 0-2.6-3.4" />
        <path d="M15.5 4.6a3.5 3.5 0 0 1 0 6.8" />
      </svg>
    ),
  },
  {
    value: '12+',
    label: 'Industries Served',
    icon: (
      <svg viewBox="0 0 24 24" {...ICON}>
        <path d="M3 21V9l6-3v15" />
        <path d="M9 11h9a2 2 0 0 1 2 2v8" />
        <path d="M2 21h20" />
        <path d="M13 15h3M13 18h3" />
      </svg>
    ),
  },
  {
    value: '50+',
    label: 'Cities Across India',
    icon: (
      <svg viewBox="0 0 24 24" {...ICON}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    value: '100%',
    label: 'Commitment to Safety',
    icon: (
      <svg viewBox="0 0 24 24" {...ICON}>
        <path d="M12 3 20 6v6c0 4.2-3.2 7.6-8 9-4.8-1.4-8-4.8-8-9V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export default function HeroSection() {
  const { activeService, setActiveService, isUserInteracting, setIsUserInteracting } =
    useServiceContext();
  const [hovered, setHovered] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Shared mutable motion state — written by listeners, read inside rAF. */
  const motion = useRef<MotionState>({ px: 0, py: 0, scroll: 0, globe: null });

  /* ---------------- automatic service cycling ---------------- */
  useEffect(() => {
    if (isUserInteracting || reducedMotion) return;
    const id = setInterval(() => {
      setActiveService((prev) => {
        const i = HERO_SERVICES.findIndex((s) => s.id === prev);
        return HERO_SERVICES[(i + 1) % HERO_SERVICES.length].id;
      });
    }, CYCLE_INTERVAL);
    return () => clearInterval(id);
  }, [isUserInteracting, reducedMotion, setActiveService]);

  const pauseCycling = useCallback(() => {
    setIsUserInteracting(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsUserInteracting(false), RESUME_DELAY);
  }, [setIsUserInteracting]);

  const handleHover = useCallback(
    (id: string | null) => {
      setHovered(id);
      if (id) {
        setActiveService(id);
        pauseCycling();
      }
    },
    [pauseCycling, setActiveService]
  );

  const handleSelect = useCallback(
    (id: string) => {
      setActiveService(id);
      pauseCycling();
    },
    [pauseCycling, setActiveService]
  );

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  /* ---------------- pointer parallax + scroll response ---------------- */
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const onPointer = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      motion.current.px = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      motion.current.py = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const onLeave = () => {
      motion.current.px = 0;
      motion.current.py = 0;
    };
    const onScroll = () => {
      const h = section.offsetHeight || 1;
      motion.current.scroll = Math.max(0, Math.min(1, window.scrollY / h));
    };

    section.addEventListener('pointermove', onPointer, { passive: true });
    section.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Text tracks the pointer far more gently than the visualisation does.
    let tx = 0;
    let ty = 0;
    let frame = 0;
    const loop = () => {
      tx += (motion.current.px - tx) * 0.05;
      ty += (motion.current.py - ty) * 0.05;
      const s = motion.current.scroll;
      if (textLayerRef.current) {
        textLayerRef.current.style.transform =
          'translate3d(' + (tx * -8).toFixed(2) + 'px,' + (ty * -6 - s * 70).toFixed(2) + 'px,0)';
        textLayerRef.current.style.opacity = String(Math.max(0, 1 - s * 1.6).toFixed(2));
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      section.removeEventListener('pointermove', onPointer);
      section.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const activeMeta = HERO_SERVICES.find((s) => s.id === activeService) ?? HERO_SERVICES[0];

  return (
    <section
      className={'hero-section' + (reducedMotion ? ' is-static' : '')}
      ref={sectionRef}
      aria-label="SST — integrated infrastructure and security"
    >
      <HeroBackdrop />
      <EnvironmentScene motion={motion} reducedMotion={reducedMotion} />

      <div className="hero-grid">
        {/* ------------------------- LEFT ------------------------- */}
        <div className="hero-copy" ref={textLayerRef}>
          <p className="hero-eyebrow hero-enter" style={{ animationDelay: '.05s' }}>
            <span className="hero-eyebrow-bar" />
            Integrated Infrastructure &amp; Security
          </p>

          <h1 className="hero-title">
            <span className="hero-enter" style={{ animationDelay: '.14s' }}>Connecting</span>
            <span className="hero-enter" style={{ animationDelay: '.24s' }}>People, Places</span>
            <span className="hero-enter hero-title-accent" style={{ animationDelay: '.34s' }}>
              Safer Tomorrows
            </span>
          </h1>

          <p className="hero-lede hero-enter" style={{ animationDelay: '.46s' }}>
            End-to-end execution of security, infrastructure and technology solutions —
            delivered on time, at scale.
          </p>

          <div className="hero-actions hero-enter" style={{ animationDelay: '.56s' }}>
            <Link to="/services" className="hero-btn hero-btn-primary">
              <span>Explore Our Services</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/about" className="hero-btn hero-btn-ghost">
              <span className="hero-btn-play" aria-hidden="true">
                <svg viewBox="0 0 12 14"><path d="M11.5 7 .5 13.5V.5L11.5 7Z" fill="currentColor" /></svg>
              </span>
              <span>Watch Our Story</span>
            </Link>
          </div>

          <div className="hero-stats hero-enter" style={{ animationDelay: '.66s' }}>
            {STATS.map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <span className="hero-stat-icon" aria-hidden="true">{stat.icon}</span>
                <span className="hero-stat-text">
                  <span className="hero-stat-value">{stat.value}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------- RIGHT ------------------------- */}
        <div className="hero-visual">
          <HeroVisual
            activeService={activeService}
            hoveredService={hovered}
            onHover={handleHover}
            onSelect={handleSelect}
            motion={motion}
            reducedMotion={reducedMotion}
          />

          <div className="hero-readout" aria-live="polite">
            <span className="hero-readout-index">{activeMeta.index}</span>
            <span className="hero-readout-body">
              <span className="hero-readout-label">{activeMeta.label}</span>
              <span className="hero-readout-sub">Active across the SST network</span>
            </span>
          </div>
        </div>
      </div>

      {/* vertical index rail — mirrors the four orbital sectors */}
      <ol className="hero-rail" aria-hidden="true">
        {['01', '02', '03', '04'].map((n, i) => (
          <li
            key={n}
            className={
              Math.floor(HERO_SERVICES.findIndex((s) => s.id === activeService) / 2) === i
                ? 'is-active'
                : undefined
            }
          >
            {n}
          </li>
        ))}
      </ol>

      {/* ------------------------- BOTTOM ------------------------- */}
      <div className="hero-foot">
        <div className="hero-foot-tags" title={SECONDARY_SERVICES.join(' · ')}>
          <span>People</span>
          <span>Technology</span>
          <span>Safer Spaces</span>
        </div>

        <a className="hero-scroll" href="#home-services">
          <span className="hero-scroll-label">Scroll to explore</span>
          <span className="hero-scroll-rail" aria-hidden="true">
            <span className="hero-scroll-dot" />
          </span>
        </a>

        <div className="hero-foot-meta">
          <span className="hero-foot-pulse" aria-hidden="true" />
          Connected globally · Built for a safer tomorrow
        </div>
      </div>
    </section>
  );
}
