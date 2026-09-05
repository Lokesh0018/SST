import { useParams, Link, Navigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import ServiceVisual from '../components/common/ServiceVisual';
import { getServiceBySlug, services } from '../data/services';
import '../styles/ServiceDetail.css';

gsap.registerPlugin(ScrollTrigger);

const featureIcons = ['🔒', '🤖', '📱', '📈'];

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || '');
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

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  // Find adjacent services for navigation
  const currentIndex = services.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="service-detail-hero" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className="service-detail-breadcrumb" aria-label="Breadcrumb">
            <Link to="/services" className="service-detail-breadcrumb-link">Services</Link>
            <span>›</span>
            <span className="service-detail-breadcrumb-cat">{service.category}</span>
            <span>›</span>
            <span className="service-detail-breadcrumb-title">{service.title}</span>
          </nav>

          <div className="service-detail-grid">
            {/* Left - Content */}
            <div>
              <h1 className="service-detail-title">
                {service.title}
              </h1>

              <p className="service-detail-tagline">
                {service.tagline}
              </p>

              <p className="service-detail-desc">
                {service.heroDescription}
              </p>

              {/* Feature list */}
              <div ref={sectionRef} className="service-detail-features">
                {service.features.map((feature, i) => (
                  <div
                    key={i}
                    className="feature-card service-detail-feature-card"
                  >
                    <span className="service-detail-feature-icon">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <div>
                      <h4 className="service-detail-feature-title">{feature.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="service-detail-actions">
                <Button to="/contact" variant="primary" size="lg">
                  Request a Quote
                </Button>
                <Button variant="outline" size="lg">
                  Brochure
                </Button>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="service-detail-visual">
              <ServiceVisual category={service.category} title={service.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="service-detail-features-section">
        <div className="container">
          <h2 className="service-detail-section-title">Key Features</h2>
          <div className="service-detail-features-grid">
            {service.features.map((feature, i) => (
              <div key={i} className="service-detail-feature-box">
                <div className="service-detail-feature-box-icon">
                  {featureIcons[i % featureIcons.length]}
                </div>
                <h3 className="service-detail-feature-box-title">{feature.title}</h3>
                <p className="service-detail-feature-box-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="service-detail-benefits-grid">
            <div>
              <h2 className="service-detail-benefits-title">Benefits</h2>
              <ul className="service-detail-list">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="service-detail-list-item">
                    <span className="service-detail-list-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="service-detail-list-text">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="service-detail-benefits-title">Applications</h2>
              <ul className="service-detail-list">
                {service.applications.map((app, i) => (
                  <li key={i} className="service-detail-list-item">
                    <span className="service-detail-app-icon">
                      <span className="service-detail-app-icon-text">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="service-detail-list-text">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation between services */}
      <section className="service-detail-nav">
        <div className="container service-detail-nav-container">
          {prevService ? (
            <Link
              to={`/services/${prevService.slug}`}
              className="service-detail-nav-link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {prevService.shortTitle}
            </Link>
          ) : <div />}
          {nextService ? (
            <Link
              to={`/services/${nextService.slug}`}
              className="service-detail-nav-link"
            >
              {nextService.shortTitle}
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
