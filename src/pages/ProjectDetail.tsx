import { useParams, Link, Navigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import { getProjectBySlug, projects } from '../data/projects';
import '../styles/ProjectDetail.css';

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
      <section className="project-detail-hero">
        <div
          className="project-detail-hero-bg"
          style={{
            background: `linear-gradient(135deg, #C4B9A8 0%, #9B9282 40%, #5A321D 100%)`,
          }}
        >
          <div className="container project-detail-hero-container">
            <div>
              <span className="project-detail-industry">
                {project.industry}
              </span>
              <h1 className="project-detail-title">
                {project.title}
              </h1>
              <div className="project-detail-meta">
                <span className="project-detail-location">
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
      <section className="project-detail-stats">
        <div className="container">
          <div ref={statsRef} className="project-detail-stats-grid">
            {project.stats.map((stat, i) => (
              <div key={i} className="stat-item project-detail-stat">
                <div className="project-detail-stat-val">{stat.value}</div>
                <div className="project-detail-stat-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="project-detail-content">
        <div className="container">
          <div className="project-detail-content-grid">
            <div>
              <h2 className="project-detail-content-title">The Challenge</h2>
              <p className="project-detail-content-text">{project.challenge}</p>
            </div>
            <div>
              <h2 className="project-detail-content-title">Our Solution</h2>
              <p className="project-detail-content-text">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope & Services */}
      <section className="project-detail-scope" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="project-detail-scope-grid">
            <div>
              <h2 className="project-detail-scope-title">Project Scope</h2>
              <ul className="project-detail-list">
                {project.scope.map((item, i) => (
                  <li key={i} className="project-detail-list-item">
                    <span className="project-detail-list-icon">
                      <span className="project-detail-list-icon-text">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="project-detail-list-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="project-detail-scope-title">Results</h2>
              <ul className="project-detail-list">
                {project.results.map((result, i) => (
                  <li key={i} className="project-detail-result-item">
                    <span className="project-detail-result-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="project-detail-list-text">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="project-detail-cta">
        <div className="container project-detail-cta-container">
          <h2 className="project-detail-cta-title">Interested in a Similar Project?</h2>
          <p className="project-detail-cta-text">Let's discuss how we can deliver the same quality for your organization.</p>
          <Button to="/contact" variant="primary" size="lg">
            Start a Conversation
          </Button>
        </div>
      </section>

      {/* Navigation */}
      <section className="project-detail-nav">
        <div className="container project-detail-nav-container">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="project-detail-nav-link"
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
              className="project-detail-nav-link"
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
