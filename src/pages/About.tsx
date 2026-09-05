import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import '../styles/About.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '2016', label: 'Established' },
  { value: 'Engineering', label: 'Driven' },
  { value: 'Multi-Sector', label: 'Solutions' },
  { value: 'Long-Term', label: 'Partnerships' },
];

const values = [
  { title: 'Reliability', description: 'Every system we deploy is built for long-term performance and dependability.' },
  { title: 'Engineering Excellence', description: 'Precision engineering and best practices drive every project we undertake.' },
  { title: 'Innovation', description: 'Continuously adopting modern technologies to deliver future-ready infrastructure.' },
  { title: 'Integrity', description: 'Transparent operations and honest partnerships form the foundation of our work.' },
  { title: 'Partnership', description: 'We build lasting relationships, working alongside our clients as trusted advisors.' },
];

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.querySelectorAll('.stat'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
        }
      );
    }

    if (valuesRef.current) {
      gsap.fromTo(
        valuesRef.current.querySelectorAll('.value-card'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 75%', once: true },
        }
      );
    }
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="about-hero" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="about-hero-header">
            <div className="about-hero-content">
              <SectionHeading as="h1" highlight="RELIABILITY.">
                BUILT ON ENGINEERING. DRIVEN BY RELIABILITY.
              </SectionHeading>
              <p className="about-hero-text">
                Sri Satguru Traders (SST) is a registered partnership firm established in 2016, delivering integrated infrastructure and security solutions with a professional team of engineering and technology experts.
              </p>
              <div className="about-hero-btn">
                <Button variant="outline" size="lg" icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                }>
                  Our Story
                </Button>
              </div>
            </div>
            <div className="about-hero-right">
              <p className="about-hero-right-text">
                People<br />Technology<br /><span className="about-hero-right-highlight">Progress</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Visual */}
      <section className="about-visual">
        <div className="about-visual-container">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Engineering Road to Future Infrastructure"
            className="about-visual-img"
          />
          {/* Orange light trail accent overlay */}
          <div className="about-visual-overlay" />
          <div
            className="about-visual-glow"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #F15A24 30%, #FF8A24 50%, #F15A24 70%, transparent 100%)',
              boxShadow: '0 0 20px #F15A24',
            }}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div ref={statsRef} className="about-stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat about-stat-card">
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="about-story-grid">
            <div>
              <h2 className="about-story-title">Our Story</h2>
              <p className="about-story-text">
                Founded in Visakhapatnam in 2016, SST began with a clear vision: to deliver infrastructure solutions that combine engineering precision with technological innovation.
              </p>
              <p className="about-story-text">
                Over the years, we have grown from a focused security solutions provider into a comprehensive infrastructure partner, serving clients across banking, hospitality, industrial, and corporate sectors.
              </p>
              <p className="about-story-text-last">
                Our approach is built on understanding each client's unique requirements and delivering solutions that are engineered for reliability, scalability, and long-term performance.
              </p>
            </div>
            <div>
              <h2 className="about-story-title">Our Approach</h2>
              <p className="about-story-text">
                We believe that infrastructure should be invisible in its reliability and visible in its impact. Every project begins with deep consultation and ends with a system that operates seamlessly.
              </p>
              <p className="about-story-text-last">
                Our multidisciplinary team combines expertise in security, networking, electrical engineering, and fire safety to deliver integrated solutions that address the full spectrum of infrastructure needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <h2 className="about-values-title">Our Values</h2>
          <div ref={valuesRef} className="about-values-grid">
            {values.map((value, i) => (
              <div key={i} className="value-card about-value-card">
                <div className="about-value-icon">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="about-value-title">{value.title}</h3>
                <p className="about-value-desc">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
