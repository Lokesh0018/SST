import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import { getFeaturedProjects } from '../../data/projects';
import '../../styles/HomeProjects.css';

gsap.registerPlugin(ScrollTrigger);

export default function HomeProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredProjects = getFeaturedProjects();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.project-card');
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
        <div className="home-projects-header">
          <SectionHeading
            highlight="REAL-WORLD"
            subtitle="A selection of our projects across industries."
          >
            ENGINEERED FOR REAL-WORLD ENVIRONMENTS.
          </SectionHeading>

          <Link
            to="/projects"
            className="home-projects-link"
          >
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="home-projects-grid">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="project-card home-projects-card"
            >
              {/* Image */}
              <div className="home-projects-card-img-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="home-projects-card-img"
                />
              </div>

              {/* Content */}
              <div className="home-projects-card-content">
                <div className="home-projects-card-meta">
                  <span className="home-projects-card-tag">
                    {project.industry}
                  </span>
                </div>
                <h3 className="home-projects-card-title">
                  {project.title}
                </h3>
                <div className="home-projects-card-location">
                  <span className="home-projects-card-location-inner">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.location}
                  </span>
                </div>
                <div className="home-projects-card-services">
                  {project.services.slice(0, 3).map((service) => (
                    <span key={service} className="home-projects-card-service">
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
