import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';

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
      <section className="pt-44 lg:pt-48 pb-16" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-xl">
              <SectionHeading as="h1" highlight="RELIABILITY.">
                BUILT ON ENGINEERING. DRIVEN BY RELIABILITY.
              </SectionHeading>
              <p className="mt-6 text-base text-charcoal/60 leading-relaxed">
                Sri Satguru Traders (SST) is a registered partnership firm established in 2016, delivering integrated infrastructure and security solutions with a professional team of engineering and technology experts.
              </p>
              <div className="mt-8">
                <Button variant="outline" size="lg" icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                }>
                  Our Story
                </Button>
              </div>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-charcoal/30 leading-relaxed">
                People<br />Technology<br /><span className="text-orange">Progress</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Visual */}
      <section className="relative overflow-hidden">
        <div className="relative h-[360px] md:h-[500px] w-full">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Engineering Road to Future Infrastructure"
            className="w-full h-full object-cover"
          />
          {/* Orange light trail accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-80" />
          <div
            className="absolute bottom-0 left-0 right-0 h-3"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #F15A24 30%, #FF8A24 50%, #F15A24 70%, transparent 100%)',
              boxShadow: '0 0 20px #F15A24',
            }}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-ivory">
        <div className="container">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="stat text-center p-8 rounded-xl bg-cream/40 border border-cream-dark/20">
                <div className="text-2xl md:text-3xl font-extrabold text-charcoal tracking-tight">{stat.value}</div>
                <div className="text-xs font-medium uppercase tracking-widest text-charcoal/50 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-6">Our Story</h2>
              <p className="text-base text-charcoal/70 leading-relaxed mb-4">
                Founded in Visakhapatnam in 2016, SST began with a clear vision: to deliver infrastructure solutions that combine engineering precision with technological innovation.
              </p>
              <p className="text-base text-charcoal/70 leading-relaxed mb-4">
                Over the years, we have grown from a focused security solutions provider into a comprehensive infrastructure partner, serving clients across banking, hospitality, industrial, and corporate sectors.
              </p>
              <p className="text-base text-charcoal/70 leading-relaxed">
                Our approach is built on understanding each client's unique requirements and delivering solutions that are engineered for reliability, scalability, and long-term performance.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-6">Our Approach</h2>
              <p className="text-base text-charcoal/70 leading-relaxed mb-4">
                We believe that infrastructure should be invisible in its reliability and visible in its impact. Every project begins with deep consultation and ends with a system that operates seamlessly.
              </p>
              <p className="text-base text-charcoal/70 leading-relaxed">
                Our multidisciplinary team combines expertise in security, networking, electrical engineering, and fire safety to deliver integrated solutions that address the full spectrum of infrastructure needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-12">Our Values</h2>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div key={i} className="value-card p-6 rounded-xl bg-cream/30 border border-cream-dark/20 hover:border-orange/20 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange text-sm font-bold mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight mb-2">{value.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
