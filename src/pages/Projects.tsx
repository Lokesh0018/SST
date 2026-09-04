import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { projects, projectCategories, getProjectsByIndustry } from '../data/projects';

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
      <section className="pt-44 lg:pt-48 pb-16" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <SectionHeading as="h1" highlight="REAL-WORLD">
                ENGINEERED FOR REAL-WORLD ENVIRONMENTS.
              </SectionHeading>
              <p className="mt-6 text-base text-charcoal/60 leading-relaxed max-w-lg">
                A selection of our projects across industries.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-charcoal/30 leading-relaxed">
                Real Challenges<br />
                <span className="text-orange">Lasting</span><br />
                Solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section-padding bg-ivory">
        <div className="container">
          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border-2 transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-orange text-white border-orange'
                    : 'bg-transparent text-charcoal/60 border-cream-dark hover:border-orange/50 hover:text-orange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="project-listing-card group rounded-xl overflow-hidden bg-cream/30 border border-cream-dark/20 hover:border-orange/30 hover:shadow-[0_8px_30px_rgba(23,22,19,0.08)] transition-all duration-500"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange">
                    {project.industry}
                  </span>
                  <h3 className="text-lg font-extrabold uppercase tracking-tight mt-2 group-hover:text-orange transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-charcoal/50 mt-2">
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {project.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.services.slice(0, 3).map((service) => (
                      <span key={service} className="text-[10px] font-medium text-charcoal/40 bg-ivory px-2 py-0.5 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-charcoal/40">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
