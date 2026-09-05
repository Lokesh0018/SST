import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import { getFeaturedClients } from '../../data/clients';
import '../../styles/HomeClients.css';

gsap.registerPlugin(ScrollTrigger);

export default function HomeClients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredClients = getFeaturedClients();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.client-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-ivory">
      <div className="container">
        <div className="home-clients-header">
          <SectionHeading
            highlight="REAL-WORLD"
            subtitle="A selection of our clients across industries."
          >
            ENGINEERED FOR REAL-WORLD ENVIRONMENTS.
          </SectionHeading>

          <Link
            to="/clients"
            className="home-clients-link"
          >
            View All Clients
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="home-clients-grid">
          {featuredClients.map((client) => (
            <Link
              key={client.slug}
              to={`/clients/${client.slug}`}
              className="client-card home-clients-card"
            >
              {/* Image */}
              <div className="home-clients-card-img-wrapper">
                <img
                  src={client.image}
                  alt={client.title}
                  className="home-clients-card-img"
                />
              </div>

              {/* Content */}
              <div className="home-clients-card-content">
                <div className="home-clients-card-meta">
                  <span className="home-clients-card-tag">
                    {client.industry}
                  </span>
                </div>
                <h3 className="home-clients-card-title">
                  {client.title}
                </h3>
                <div className="home-clients-card-location">
                  <span className="home-clients-card-location-inner">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {client.location}
                  </span>
                </div>
                <div className="home-clients-card-services">
                  {client.services.slice(0, 3).map((service) => (
                    <span key={service} className="home-clients-card-service">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
