import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import { getFeaturedProjects } from '../../data/projects';

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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <SectionHeading
            highlight="REAL-WORLD"
            subtitle="A selection of our projects across industries."
          >
            ENGINEERED FOR REAL-WORLD ENVIRONMENTS.
          </SectionHeading>

          <Link
            to="/projects"
            className="text-sm font-semibold uppercase tracking-wider text-charcoal hover:text-orange transition-colors duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="project-card group relative rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(23,22,19,0.06)] bg-cream/40 border border-cream-dark/30 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(23,22,19,0.12)] hover:border-orange/30 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange bg-orange/10 px-3 py-1 rounded-full">
                    {project.industry}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight mb-2 group-hover:text-orange transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-charcoal/50">
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.location}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.services.slice(0, 3).map((service) => (
                    <span key={service} className="text-[10px] font-medium text-charcoal/50 bg-ivory border border-cream-dark/50 px-2 py-0.5 rounded">
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
