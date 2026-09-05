import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { clients, clientCategories, getClientsByIndustry } from '../data/clients';
import '../styles/Clients.css';

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredClients = getClientsByIndustry(activeCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.client-listing-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [activeCategory]);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="clients-hero" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="clients-hero-header">
            <div>
              <SectionHeading as="h1" highlight="REAL-WORLD">
                ENGINEERED FOR REAL-WORLD ENVIRONMENTS.
              </SectionHeading>
              <p className="clients-hero-text">
                A selection of our clients across industries.
              </p>
            </div>
            <div className="clients-hero-right">
              <p className="clients-hero-right-text">
                Real Challenges<br />
                <span className="clients-hero-right-highlight">Lasting</span><br />
                Services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="clients-section">
        <div className="container">
          {/* Category filters */}
          <div className="clients-filters">
            {clientCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`clients-filter-btn ${
                  activeCategory === cat
                    ? 'clients-filter-active'
                    : 'clients-filter-inactive'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Client grid */}
          <div ref={gridRef} className="clients-grid">
            {filteredClients.map((client) => (
              <Link
                key={client.slug}
                to={`/clients/${client.slug}`}
                className="client-listing-card clients-card"
              >
                {/* Image */}
                <div className="clients-card-img-container">
                  <img
                    src={client.image}
                    alt={client.title}
                    className="clients-card-img"
                  />
                  <div className="clients-card-overlay" />
                </div>

                {/* Content */}
                <div className="clients-card-content">
                  <span className="clients-card-industry">
                    {client.industry}
                  </span>
                  <h3 className="clients-card-title">
                    {client.title}
                  </h3>
                  <div className="clients-card-meta">
                    <span className="clients-card-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {client.location}
                    </span>
                  </div>
                  <div className="clients-card-services">
                    {client.services.slice(0, 3).map((service) => (
                      <span key={service} className="clients-card-service">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="clients-empty">
              <p className="clients-empty-text">No clients found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
