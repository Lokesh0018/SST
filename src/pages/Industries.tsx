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

const clientImagesMap: Record<string, string> = {
  // Hospitality Sector
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
  'novotel': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/97/13/5a/novotel-visakhapatnam.jpg?w=900&h=500&s=1',

  // Industries Sector
  'andhra paper mill': 'https://images.jdmagicbox.com/v2/comp/rajahmundry/dc/9999px883.x883.1238062352u6r2s2.dc/catalogue/andhra-paper-ltd-sriram-nagar-rajahmundry-paper-manufacturers-8juHcH8Vdq.jpg',
  'gemini edible oils': 'https://www.gefindia.com/assets/img/gallery/Plant_3.jpg',
  'vizag foods pvt ltd': 'https://images.jdmagicbox.com/v2/comp/visakhapatnam/j5/0891px891.x891.180611081813.f5j5/catalogue/vizag-foods-pvt-ltd-madhurawada-visakhapatnam-animal-feed-supplement-manufacturers-8te9gt7itu.jpg',
  'hobell bellow.co': 'https://hobelbellows.com/assets/HBC-ReWMfdnD.jpg',
  'sail': 'https://www.sail.co.in/sites/default/files/2024-06/Chhattisgarh.jpg',
  'net matrix seeds': 'https://www.matrixpack.com/sites/default/files/styles/wide/public/2025-11/article-img.jpg?itok=1SjdWr-7',
  'vasanth chemicals': 'https://images.jdmagicbox.com/v2/comp/hyderabad/e5/040pxx40.xx40.000384194845.k1e5/catalogue/vasant-chemicals-pvt-ltd-begumpet-hyderabad-water-treatment-chemical-manufacturers-j5uvecjioe.jpg',
  'green tech pharma': 'https://www.pharmaceutical-technology.com/wp-content/uploads/sites/24/2018/08/pharma-manufacturing.jpg',
  'mandeo motors': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTa1NPYgJTNC15hmlU1TTuXv7snIz-Kex_YOzPUGhCkOB2v_dUz7I8m-V7&s=10',
  'laxmi samanvi fuels': 'https://images.jdmagicbox.com/comp/visakhapatnam/x1/0891px891.x891.001130367946.d8x1/catalogue/east-india-petroleum-ltd-visakhapatnam-airport-visakhapatnam-petroleum-product-dealers-1cz7trnxar-250.jpg',
  'adani wilmar': 'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/05/adaniwilmar-1651568400-1651587035.jpg',
  'victory ferro alloys': 'https://th-i.thgim.com/public/migration_catalog/article14049107.ece/alternates/LANDSCAPE_1200/24HYMRR10-ALLOYHY25FERROALLOYS_.jp.jpg',
  'aurora': 'https://pharmaoffer.com/media/cache/ctm/upload/picture/6724a02e66e06464668710.webp',
  'sri venkateswara ferro alloys': 'https://supershakti.in/storage/app/public/images/Ferro%20Alloys%20copy.png',
  'rs assosiates': 'https://static.wixstatic.com/media/d90647_b72dc2aee99b4cef81c0d12722111d16~mv2.jpg/v1/fit/w_2500,h_1330,al_c/d90647_b72dc2aee99b4cef81c0d12722111d16~mv2.jpg',
  'gmfc labs': 'https://images.jdmagicbox.com/v2/comp/visakhapatnam/w7/0891px891.x891.181205003544.r1w7/catalogue/gmfc-labs-pvt-ltd-atchutapuram-visakhapatnam-pharmaceutical-manufacturers-fw349i89en.jpg',
  'sneha pharma': 'https://snehaaorganics.com/wp-content/uploads/2024/08/ed.jpeg',
  'pilkington automotive india private limited': 'https://5.imimg.com/data5/SELLER/Default/2022/3/HQ/ED/BB/9379613/thermal-insulation-glass-250x250.PNG'
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
                        const clientImage = clientImagesMap[imageKey];
                        
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
