import { useRef, useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import Button from '../common/Button';

const InfrastructureGlobe = lazy(() => import('../three/InfrastructureGlobe'));

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !textRef.current) return;

    const elements = textRef.current.children;
    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)',
      }}
    >
      {/* Subtle grid pattern for architectural feel */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(23,22,19,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(23,22,19,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Radial glow for warmth */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 75% 50%, rgba(241,90,36,0.08) 0%, transparent 50%)',
        }}
      />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-24 pb-16 lg:pt-0 lg:pb-0">
        {/* Left - Text Content */}
        <div ref={textRef} className="max-w-xl">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange animate-ping" />
              Integrated Infrastructure & Security
            </p>
          </div>

          <div>
            <h1 className="text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] font-extrabold uppercase leading-[0.95] tracking-tight text-charcoal">
              Infrastructure<br />
              That Moves<br />
              <span className="text-orange">The World Forward.</span>
            </h1>
          </div>

          <div>
            <p className="mt-6 text-base md:text-lg text-charcoal/80 leading-relaxed max-w-md">
              Integrated solutions in security, technology, electrical,
              fire safety, logistics and turnkey projects — for a safer,
              smarter tomorrow.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Button to="/solutions" variant="primary" size="lg">
                Explore Solutions
              </Button>
              <Button
                variant="dark"
                size="lg"
                onClick={() => {
                  // Video modal or scrollTo
                }}
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                }
              >
                Watch Video
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mt-12 text-xs text-charcoal/50 uppercase tracking-widest">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
              Scroll to Explore
            </div>
          </div>
        </div>

        {/* Right - 3D Globe */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <Suspense fallback={<GlobeFallback />}>
            <InfrastructureGlobe />
          </Suspense>

          {/* Floating side text */}
          <div className="hidden lg:block absolute top-8 right-0 text-right">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/40 leading-relaxed">
              Connecting<br />
              People<br />
              Technology<br />
              Possibilities<br />
              <span className="text-orange">Worldwide</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobeFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Static globe fallback */}
        <div
          className="w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #EFE4CF, #E5D8C0 60%, #C4B9A8)',
            boxShadow: '0 0 60px rgba(241, 90, 36, 0.15), inset 0 0 40px rgba(241, 90, 36, 0.05)',
          }}
        />
        {/* Glowing ring */}
        <div
          className="absolute inset-[-20px] rounded-full border border-orange/20 animate-[pulse-glow_3s_ease-in-out_infinite]"
        />
      </div>
    </div>
  );
}
