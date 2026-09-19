import { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import { clients } from '../data/clients';
import { testimonials } from '../data/testimonials';
import { ArrowUpRight } from 'lucide-react';
import '../styles/Clients.css';
import '../styles/About.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.9 },
  show: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 20, delay: 0.4 } 
  }
};

export default function Clients() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const unique = new Set(clients.map(c => c.category));
    return ['All', ...Array.from(unique)];
  }, []);

  const filteredClients = useMemo(() => {
    if (activeCategory === 'All') return clients;
    return clients.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const allLogos = useMemo(() => clients.filter(c => c.logo), []);
  const cubeFaces = useMemo(() => {
    const rubiksLogos = Array.from({ length: 54 }, (_, i) => allLogos[i % allLogos.length]);
    return [
      { id: 'front', tiles: rubiksLogos.slice(0, 9) },
      { id: 'right', tiles: rubiksLogos.slice(9, 18) },
      { id: 'back', tiles: rubiksLogos.slice(18, 27) },
      { id: 'left', tiles: rubiksLogos.slice(27, 36) },
      { id: 'top', tiles: rubiksLogos.slice(36, 45) },
      { id: 'bottom', tiles: rubiksLogos.slice(45, 54) },
    ];
  }, [allLogos]);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="clients-hero-premium">
        <div className="container relative z-10 h-full flex flex-col justify-center">
          <div className="clients-hero-split">
            <motion.div 
              className="clients-hero-left"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.span variants={itemVariants} className="clients-hero-eyebrow">OUR CLIENTS · PARTNERSHIPS THAT MATTER</motion.span>
              <motion.h1 variants={itemVariants} className="clients-hero-heading">
                BUILDING  TRUST <br /> <span style={{ whiteSpace: 'nowrap' }}>POWERING <span className="text-orange">INDUSTRIES.</span></span>
              </motion.h1>
              <motion.p variants={itemVariants} className="clients-hero-description">
                We are proud to have partnered with some of the industry's leading companies, delivering top-tier solutions and infrastructure across various sectors globally.
              </motion.p>
              
              <motion.div variants={itemVariants} className="clients-hero-stats">
                <div className="stat-item">
                  <span className="stat-number">75+</span>
                  <span className="stat-label">CLIENTS</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">INDUSTRIES</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">PAN</span>
                  <span className="stat-label">INDIA REACH</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="clients-hero-right"
              variants={rightVariants}
              initial="hidden"
              animate="show"
            >
              <div className="rubiks-cube-wrapper">
                <div className="rubiks-cube-container">
                  {cubeFaces.map((face) => (
                    <div key={face.id} className={`cube-face ${face.id}`}>
                      {face.tiles.map((client, idx) => (
                        <div key={`${face.id}-${idx}`} className="cube-tile">
                          <img src={client.logo} alt={client.name} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="rubiks-cube-shadow"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="clients-grid-section">
        <div className="container relative z-10">
          
          <div className="clients-section-transition">
            <h2 className="clients-transition-heading">TRUSTED ACROSS INDUSTRIES</h2>
            <p className="clients-transition-text">From hospitality and banking to tech, retail and enterprise infrastructure.</p>
          </div>

          <div className="clients-filter-container">
            <div className="client-segmented-control">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`segmented-control-btn ${activeCategory === category ? 'active' : ''}`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeFilterBubble"
                      className="segmented-control-bubble"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="segmented-control-text">{category}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="premium-client-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredClients.map((client) => (
                <motion.div 
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  key={client.id} 
                  className="premium-client-card"
                >
                  <div className="premium-client-card-inner">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="premium-client-logo"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="font-bold text-center text-gray-800">{client.name}</div>
                    )}
                    <div className="premium-client-category">{client.category}</div>
                    
                    <div className="premium-client-hover-elements">
                      <div className="premium-client-orange-line"></div>
                      <div className="premium-client-arrow">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="about-testimonials-section" style={{ padding: '8rem 0', backgroundColor: '#0b1219' }}>
        <div className="timeline-bg-grid" style={{ opacity: 0.5 }}></div>
        <div className="container relative z-10">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="about-eyebrow">OUR TESTIMONIALS</span>
            <h2 className="why-headline" style={{ color: 'white' }}>WHAT OUR CLIENTS <span className="text-orange">SAY.</span></h2>
          </div>
        </div>

        <div className="testimonial-marquee-container relative z-10">
          <div className="testimonial-marquee-track">
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div key={`${testimonial.id}-${idx}`} className="testimonial-card-glass">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#F4511E" opacity="0.2" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <div className="testimonial-rating">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <svg key={i} className="testimonial-star" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="testimonial-text">{testimonial.text}</p>

                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>Verified Client</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
