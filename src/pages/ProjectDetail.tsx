import { useParams, Link, Navigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import { getProjectBySlug, projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !statsRef.current) return;

    const statEls = statsRef.current.querySelectorAll('.stat-item');
    gsap.fromTo(
      statEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, [slug]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  // Adjacent projects
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-40 pb-0 overflow-hidden">
        <div
          className="h-[350px] md:h-[450px]"
          style={{
            background: `linear-gradient(135deg, #C4B9A8 0%, #9B9282 40%, #5A321D 100%)`,
          }}
        >
          <div className="container h-full flex items-end pb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ivory/60 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                {project.industry}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-ivory mt-4 leading-[1.05]">
                {project.title}
              </h1>
              <div className="flex items-center gap-4 mt-3 text-sm text-ivory/60">
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {project.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-ivory border-b border-cream-dark/20">
        <div className="container">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.stats.map((stat, i) => (
              <div key={i} className="stat-item text-center p-6 rounded-xl bg-cream/40 border border-cream-dark/20">
                <div className="text-3xl md:text-4xl font-extrabold text-orange tracking-tight">{stat.value}</div>
                <div className="text-xs font-medium uppercase tracking-widest text-charcoal/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-6">The Challenge</h2>
              <p className="text-base text-charcoal/70 leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-6">Our Solution</h2>
              <p className="text-base text-charcoal/70 leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope & Services */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-8">Project Scope</h2>
              <ul className="space-y-3">
                {project.scope.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-orange">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="text-sm text-charcoal/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-8">Results</h2>
              <ul className="space-y-3">
                {project.results.map((result, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-sm text-charcoal/70">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ivory">
        <div className="container text-center">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-4">Interested in a Similar Project?</h2>
          <p className="text-base text-charcoal/60 mb-8">Let's discuss how we can deliver the same quality for your organization.</p>
          <Button to="/contact" variant="primary" size="lg">
            Start a Conversation
          </Button>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-ivory border-t border-cream-dark/20">
        <div className="container flex items-center justify-between">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-charcoal/60 hover:text-orange transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Previous Project
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-charcoal/60 hover:text-orange transition-colors"
            >
              Next Project
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
