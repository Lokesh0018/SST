import { useParams, Link, Navigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import SolutionVisual from '../components/common/SolutionVisual';
import { getSolutionBySlug, solutions } from '../data/solutions';
import '../styles/SolutionDetail.css';

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
      <section className="solution-detail-hero" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className="solution-detail-breadcrumb" aria-label="Breadcrumb">
            <Link to="/solutions" className="solution-detail-breadcrumb-link">Solutions</Link>
            <span>›</span>
            <span className="solution-detail-breadcrumb-cat">{solution.category}</span>
            <span>›</span>
            <span className="solution-detail-breadcrumb-title">{solution.title}</span>
          </nav>

          <div className="solution-detail-grid">
            {/* Left - Content */}
            <div>
              <h1 className="solution-detail-title">
                {solution.title}
              </h1>

              <p className="solution-detail-tagline">
                {solution.tagline}
              </p>

              <p className="solution-detail-desc">
                {solution.heroDescription}
              </p>

              {/* Feature list */}
              <div ref={sectionRef} className="solution-detail-features">
                {solution.features.map((feature, i) => (
                  <div
                    key={i}
                    className="feature-card solution-detail-feature-card"
                  >
                    <span className="solution-detail-feature-icon">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <div>
                      <h4 className="solution-detail-feature-title">{feature.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="solution-detail-actions">
                <Button to="/contact" variant="primary" size="lg">
                  Request a Quote
                </Button>
                <Button variant="outline" size="lg">
                  Brochure
                </Button>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="solution-detail-visual">
              <SolutionVisual category={solution.category} title={solution.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="solution-detail-features-section">
        <div className="container">
          <h2 className="solution-detail-section-title">Key Features</h2>
          <div className="solution-detail-features-grid">
            {solution.features.map((feature, i) => (
              <div key={i} className="solution-detail-feature-box">
                <div className="solution-detail-feature-box-icon">
                  {featureIcons[i % featureIcons.length]}
                </div>
                <h3 className="solution-detail-feature-box-title">{feature.title}</h3>
                <p className="solution-detail-feature-box-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="solution-detail-benefits-grid">
            <div>
              <h2 className="solution-detail-benefits-title">Benefits</h2>
              <ul className="solution-detail-list">
                {solution.benefits.map((benefit, i) => (
                  <li key={i} className="solution-detail-list-item">
                    <span className="solution-detail-list-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="solution-detail-list-text">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="solution-detail-benefits-title">Applications</h2>
              <ul className="solution-detail-list">
                {solution.applications.map((app, i) => (
                  <li key={i} className="solution-detail-list-item">
                    <span className="solution-detail-app-icon">
                      <span className="solution-detail-app-icon-text">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="solution-detail-list-text">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation between solutions */}
      <section className="solution-detail-nav">
        <div className="container solution-detail-nav-container">
          {prevSolution ? (
            <Link
              to={`/solutions/${prevSolution.slug}`}
              className="solution-detail-nav-link"
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
              className="solution-detail-nav-link"
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
