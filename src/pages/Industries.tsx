import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { industries } from '../data/industries';
import { clients } from '../data/clients';

const getClientsForIndustry = (slug: string) => {
  const categoryMap: Record<string, string> = {
    'hotels': 'Hospitality Sector',
    'industries': 'Industries',
    'financial-institutions': 'Financial Institutions',
    'ecommerce-software': 'E-Commerce & Software Companies',
    'banks': 'Banks',
    'retail': 'Retail',
  };
  const category = categoryMap[slug];
  return clients.filter(c => c.category === category && c.name.trim() !== '');
};

const hospitalityImages: Record<string, string> = {
  'amalapuram heights': 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/553775967.jpg?k=34bb2b7c806189f1cfd190f1abdc221f68c37051a86ddf12349d714a59ab31ff&o=',
  'taj hotel': 'https://cdn.sanity.io/images/ocl5w36p/ihcl_prod/02d5266ba2e7a05097c8aa5c6f5533095f8b50fc-3840x1860.jpg',
  'taj hotels': 'https://cdn.sanity.io/images/ocl5w36p/ihcl_prod/02d5266ba2e7a05097c8aa5c6f5533095f8b50fc-3840x1860.jpg',
  'double tree by hilton': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvrshIXAj4bYq5Y-t9G5MUqMdgz_9FlZ0GNvtnI0CDTXF34IRHpVlmw0&s=10',
  'hayatt regency': 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/01/23/0953/Hyatt-Regency-Delhi-P312-Facade.jpg/Hyatt-Regency-Delhi-P312-Facade.4x3.jpg',
  'hyatt regency': 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/01/23/0953/Hyatt-Regency-Delhi-P312-Facade.jpg/Hyatt-Regency-Delhi-P312-Facade.4x3.jpg',
  'southern spice restaurant': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/bb/f5/de/inviting-exterior.jpg?w=1000&h=1000&s=1',
  'southern spice restaurants': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/bb/f5/de/inviting-exterior.jpg?w=1000&h=1000&s=1',
  'fair field by marriott': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/e9/a8/20/fairfield-by-marriott.jpg?w=900&h=500&s=1',
  'court yard by marriott': 'https://upload.wikimedia.org/wikipedia/commons/0/01/A_Courtyard_by_Marriott_hotel_in_downtown_Athens%2C_Georgia_03.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
  'courtyard by marriott': 'https://upload.wikimedia.org/wikipedia/commons/0/01/A_Courtyard_by_Marriott_hotel_in_downtown_Athens%2C_Georgia_03.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
  'four points by sheraton': 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/628159859.jpg?k=776a6fc777587dc8d4d854b31c4d14956cd32e2cb27ec1e07e5d9d4c22d8d869&o=',
  'novotel': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/97/13/5a/novotel-visakhapatnam.jpg?w=900&h=500&s=1'
};
import { partners } from '../data/partners';
import TopographicalBackground from '../components/common/TopographicalBackground';
import '../styles/Industries.css';

gsap.registerPlugin(ScrollTrigger);

import ArchitecturalSkyline from '../components/ArchitecturalSkyline';


export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedClientImage, setSelectedClientImage] = useState<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.industry-detail-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="industries-hero">
        <ArchitecturalSkyline />
        <div className="container">
          <div className="industries-hero-header">
            <div>
              <SectionHeading as="h1" highlight="INDUSTRY.">
                SERVICES FOR EVERY INDUSTRY.
              </SectionHeading>
              <p className="industries-hero-text">
                Tailored infrastructure services for diverse environments.
              </p>
            </div>
            <div className="industries-hero-right">
              <p className="industries-hero-right-text">
                Different Industries.<br />
                <span className="industries-hero-right-highlight">A Stronger</span><br />
                Tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Cards */}
      <section 
        ref={sectionRef} 
        className="industries-section"
        onMouseMove={(e) => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
          sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
        }}
      >
        <TopographicalBackground className="industries-topo-container" />
        
        <div className="container">
          <div className="industries-grid">
            {industries.map((industry) => (
              <div
                key={industry.slug}
                className="industry-detail-card industries-card"
              >
                <div className="industries-card-inner">
                  {/* FRONT OF CARD */}
                  <div className="industries-card-front">
                    {/* Photographic Background */}
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="industries-card-img"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="industries-card-overlay" />
                    
                    {/* Scanner Line */}
                    <div className="industries-card-scanner" />
                    
                    {/* Corner Crosshairs */}
                    <div className="industries-card-crosshair crosshair-tl" />
                    <div className="industries-card-crosshair crosshair-tr" />
                    <div className="industries-card-crosshair crosshair-bl" />
                    <div className="industries-card-crosshair crosshair-br" />

                    {/* Content */}
                    <div className="industries-card-content">
                      <div className="industries-card-glass">
                        <span className="industries-card-tag">
                          Industry Service
                        </span>

                        <h3 className="industries-card-title">
                          {industry.title}
                        </h3>

                        <p className="industries-card-desc">
                          {industry.longDescription}
                        </p>

                        {/* Services tags */}
                        <div className="industries-card-services">
                          {industry.services.map((service) => (
                            <span
                              key={service}
                              className="industries-card-service"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Orange border glow on hover */}
                    <div className="industries-card-glow" />
                  </div>

                  {/* BACK OF CARD */}
                  <div className="industries-card-back">
                    {/* Watermark Logo */}
                    <img 
                      src="/images/logo/SST L.png" 
                      alt="" 
                      className="industries-card-back-watermark" 
                    />
                    
                    <h3 className="industries-card-back-title">Our Partners</h3>
                    <ul className="industries-card-back-list">
                      {getClientsForIndustry(industry.slug).map((client, index) => {
                        const imageKey = client.name.toLowerCase().trim();
                        const clientImage = hospitalityImages[imageKey];
                        
                        return (
                          <li 
                            key={client.id}
                            style={{ 
                              animationDelay: `${index * 0.05}s`,
                              cursor: clientImage ? 'pointer' : 'default'
                            }}
                            onClick={() => {
                              if (clientImage) {
                                setSelectedClientImage(clientImage);
                              }
                            }}
                          >
                            {client.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Image Modal */}
      {selectedClientImage && (
        <div 
          className="client-image-modal-overlay"
          onClick={() => setSelectedClientImage(null)}
        >
          <div className="client-image-modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="client-image-modal-close"
              onClick={() => setSelectedClientImage(null)}
            >
              &times;
            </button>
            <img src={selectedClientImage} alt="Client Location" className="client-image-modal-img" />
          </div>
        </div>
      )}
    </PageTransition>
  );
}
