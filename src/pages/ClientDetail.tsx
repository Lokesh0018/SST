import { useParams, Link, Navigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import { getClientBySlug, clients } from '../data/clients';
import '../styles/ClientDetail.css';

gsap.registerPlugin(ScrollTrigger);

export default function ClientDetail() {
  const { slug } = useParams<{ slug: string }>();
  const client = getClientBySlug(slug || '');
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

  if (!client) {
    return <Navigate to="/404" replace />;
  }

  // Adjacent clients
  const currentIndex = clients.findIndex((p) => p.slug === slug);
  const prevClient = currentIndex > 0 ? clients[currentIndex - 1] : null;
  const nextClient = currentIndex < clients.length - 1 ? clients[currentIndex + 1] : null;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="client-detail-hero">
        <div
          className="client-detail-hero-bg"
          style={{
            background: `linear-gradient(135deg, #C4B9A8 0%, #9B9282 40%, #5A321D 100%)`,
          }}
        >
          <div className="container client-detail-hero-container">
            <div>
              <span className="client-detail-industry">
                {client.industry}
              </span>
              <h1 className="client-detail-title">
                {client.title}
              </h1>
              <div className="client-detail-meta">
                <span className="client-detail-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {client.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="client-detail-stats">
        <div className="container">
          <div ref={statsRef} className="client-detail-stats-grid">
            {client.stats.map((stat, i) => (
              <div key={i} className="stat-item client-detail-stat">
                <div className="client-detail-stat-val">{stat.value}</div>
                <div className="client-detail-stat-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Service */}
      <section className="client-detail-content">
        <div className="container">
          <div className="client-detail-content-grid">
            <div>
              <h2 className="client-detail-content-title">The Challenge</h2>
              <p className="client-detail-content-text">{client.challenge}</p>
            </div>
            <div>
              <h2 className="client-detail-content-title">Our Service</h2>
              <p className="client-detail-content-text">{client.service}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope & Services */}
      <section className="client-detail-scope" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="client-detail-scope-grid">
            <div>
              <h2 className="client-detail-scope-title">Client Scope</h2>
              <ul className="client-detail-list">
                {client.scope.map((item, i) => (
                  <li key={i} className="client-detail-list-item">
                    <span className="client-detail-list-icon">
                      <span className="client-detail-list-icon-text">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="client-detail-list-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="client-detail-scope-title">Results</h2>
              <ul className="client-detail-list">
                {client.results.map((result, i) => (
                  <li key={i} className="client-detail-result-item">
                    <span className="client-detail-result-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="client-detail-list-text">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="client-detail-cta">
        <div className="container client-detail-cta-container">
          <h2 className="client-detail-cta-title">Interested in a Similar Client?</h2>
          <p className="client-detail-cta-text">Let's discuss how we can deliver the same quality for your organization.</p>
          <Button to="/contact" variant="primary" size="lg">
            Start a Conversation
          </Button>
        </div>
      </section>

      {/* Navigation */}
      <section className="client-detail-nav">
        <div className="container client-detail-nav-container">
          {prevClient ? (
            <Link
              to={`/clients/${prevClient.slug}`}
              className="client-detail-nav-link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Previous Client
            </Link>
          ) : <div />}
          {nextClient ? (
            <Link
              to={`/clients/${nextClient.slug}`}
              className="client-detail-nav-link"
            >
              Next Client
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
