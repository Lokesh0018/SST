import { useParams, Link, Navigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import SolutionVisual from '../components/common/SolutionVisual';
import { getSolutionBySlug, solutions } from '../data/solutions';

gsap.registerPlugin(ScrollTrigger);

const featureIcons = ['🔒', '🤖', '📱', '📈'];

export default function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const solution = getSolutionBySlug(slug || '');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const features = sectionRef.current.querySelectorAll('.feature-card');
    gsap.fromTo(
      features,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: features[0],
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, [slug]);

  if (!solution) {
    return <Navigate to="/404" replace />;
  }

  // Find adjacent solutions for navigation
  const currentIndex = solutions.findIndex((s) => s.slug === slug);
  const prevSolution = currentIndex > 0 ? solutions[currentIndex - 1] : null;
  const nextSolution = currentIndex < solutions.length - 1 ? solutions[currentIndex + 1] : null;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-44 lg:pt-48 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-charcoal/50 mb-8" aria-label="Breadcrumb">
            <Link to="/solutions" className="hover:text-orange transition-colors">Solutions</Link>
            <span>›</span>
            <span className="text-charcoal/40">{solution.category}</span>
            <span>›</span>
            <span className="text-charcoal font-semibold">{solution.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-charcoal">
                {solution.title}
              </h1>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-orange">
                {solution.tagline}
              </p>

              <p className="mt-6 text-base text-charcoal/70 leading-relaxed max-w-lg">
                {solution.heroDescription}
              </p>

              {/* Feature list */}
              <div ref={sectionRef} className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {solution.features.map((feature, i) => (
                  <div
                    key={i}
                    className="feature-card flex items-start gap-3 p-4 rounded-lg bg-cream/70 border border-cream-dark/40 shadow-sm"
                  >
                    <span className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange text-sm font-bold flex-shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-tight text-charcoal">{feature.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <Button to="/contact" variant="primary" size="lg">
                  Request a Quote
                </Button>
                <Button variant="outline" size="lg">
                  Brochure
                </Button>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="w-full">
              <SolutionVisual category={solution.category} title={solution.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solution.features.map((feature, i) => (
              <div key={i} className="p-6 rounded-xl bg-cream/30 border border-cream-dark/20">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange text-xl mb-4">
                  {featureIcons[i % featureIcons.length]}
                </div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight mb-2">{feature.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Benefits</h2>
              <ul className="space-y-4">
                {solution.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-sm text-charcoal/70 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Applications</h2>
              <ul className="space-y-4">
                {solution.applications.map((app, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-charcoal/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-charcoal/40">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="text-sm text-charcoal/70 leading-relaxed">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation between solutions */}
      <section className="py-12 bg-ivory border-t border-cream-dark/20">
        <div className="container flex items-center justify-between">
          {prevSolution ? (
            <Link
              to={`/solutions/${prevSolution.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-charcoal/60 hover:text-orange transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {prevSolution.shortTitle}
            </Link>
          ) : <div />}
          {nextSolution ? (
            <Link
              to={`/solutions/${nextSolution.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-charcoal/60 hover:text-orange transition-colors"
            >
              {nextSolution.shortTitle}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </section>
    </PageTransition>
  );
}
