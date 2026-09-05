import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { projects, projectCategories, getProjectsByIndustry } from '../data/projects';
import '../styles/Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = getProjectsByIndustry(activeCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.project-listing-card');
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
      <section className="projects-hero" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="projects-hero-header">
            <div>
              <SectionHeading as="h1" highlight="REAL-WORLD">
                ENGINEERED FOR REAL-WORLD ENVIRONMENTS.
              </SectionHeading>
              <p className="projects-hero-text">
                A selection of our projects across industries.
              </p>
            </div>
            <div className="projects-hero-right">
              <p className="projects-hero-right-text">
                Real Challenges<br />
                <span className="projects-hero-right-highlight">Lasting</span><br />
                Solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="projects-section">
        <div className="container">
          {/* Category filters */}
          <div className="projects-filters">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`projects-filter-btn ${
                  activeCategory === cat
                    ? 'projects-filter-active'
                    : 'projects-filter-inactive'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div ref={gridRef} className="projects-grid">
            {filteredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="project-listing-card projects-card"
              >
                {/* Image */}
                <div className="projects-card-img-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="projects-card-img"
                  />
                  <div className="projects-card-overlay" />
                </div>

                {/* Content */}
                <div className="projects-card-content">
                  <span className="projects-card-industry">
                    {project.industry}
                  </span>
                  <h3 className="projects-card-title">
                    {project.title}
                  </h3>
                  <div className="projects-card-meta">
                    <span className="projects-card-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {project.location}
                    </span>
                  </div>
                  <div className="projects-card-services">
                    {project.services.slice(0, 3).map((service) => (
                      <span key={service} className="projects-card-service">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="projects-empty">
              <p className="projects-empty-text">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
