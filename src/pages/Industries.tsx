import React, { useRef, useEffect, useState, useMemo, useDeferredValue } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import IndustriesHeroDynamic from '../components/industries/IndustriesHeroDynamic';
import { industries } from '../data/industries';
import { clients } from '../data/clients';
import { Building2, PieChart, Bike, ShoppingBag, ShoppingCart } from 'lucide-react';
import '../styles/Industries.css';

gsap.registerPlugin(ScrollTrigger);

const getInitials = (name: string) => {
  const parts = name.trim().replace(/[^a-zA-Z0-9 ]/g, '').split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    '#0F172A', // Slate 900
    '#F4511E', // Orange
    '#0EA5E9', // Sky Blue
    '#334155', // Slate 700
    '#10B981', // Emerald
    '#8B5CF6'  // Violet
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const getClientsForIndustry = (slug: string) => {
  const categoryMap: Record<string, string[]> = {
    'hospitality': ['Hospitality'],
    'manufacturing-industrial': ['Industries'],
    'financial-services': ['Financial', 'Banks'],
    'healthcare': ['Healthcare'],
    'retail-commercial': ['Retail'],
    'corporate-technology': ['Tech & E-Commerce', 'Technology Partners'],
  };
  const mappedCategories = categoryMap[slug] || [];
  return clients.filter(c => mappedCategories.includes(c.category) && c.name.trim() !== '' && Boolean(c.logo && c.logo.trim() !== ''));
};

const clientImagesMap: Record<string, string> = {
  // Hospitality Sector
  'amalapuram heights': 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/553775967.jpg?k=34bb2b7c806189f1cfd190f1abdc221f68c37051a86ddf12349d714a59ab31ff&o=',
  'taj hotels': 'https://hospitalitybizindia.com/wp-content/uploads/2024/11/CFD89F80-2E42-4343-88F5-91955905FA72.jpeg',
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
  'pilkington automotive india private limited': 'https://5.imimg.com/data5/SELLER/Default/2022/3/HQ/ED/BB/9379613/thermal-insulation-glass-250x250.PNG',

  // Financial Institutions
  'edelwise housing finance': 'https://media.assettype.com/outlookbusiness/import/uploadimage/library/16_9/16_9_5/edelweiss_1642032251.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
  'bajaj finance': 'https://content3.jdmagicbox.com/comp/kozhikode/v4/0495px495.x495.220601225250.t9v4/catalogue/bajaj-finance-limited-nadakkavu-kozhikode-finance-companies-14zd44zxi3.jpg',
  'shriram finance': 'https://content.jdmagicbox.com/comp/guntur/k9/9999px863.x863.110713205227.h2k9/catalogue/shriram-transport-finance-company-ltd-guntur--brodipet-guntur-finance-against-vehicles-hdsz1.jpg',
  'mahindra finance': 'https://images.jdmagicbox.com/v2/comp/gurgaon/v2/011pxx11.xx11.120406123848.c9v2/catalogue/mahindra-finance-gurgaon-sector-5-gurgaon-home-loans-8qhrlf.jpg',
  'muthoot fin corp': 'https://static.ambitionbox.com/api/v2/photo/S3lRa25CVGZmR0dyZWExWFY1c25sdz09',
  'iifl finance': 'https://images.moneycontrol.com/static-mcnews/2023/08/IIFL-Finance.jpg',

  // E-Commerce & Software Companies
  'mahathi software': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFTn2arQ1Sq_TlyB1nSiJwBFehxI6KySRy2jyH5AOydQ&s=10',
  'securius global': 'https://www.securuscctv.com/web/image/30137-fe7f1fb8/DSC_0588.webp',
  'se techie': 'https://tfipost.com/wp-content/uploads/2020/02/1-5-1024x680.jpg',
  'ss infotech': 'https://images.jdmagicbox.com/v2/comp/nagpur/y8/0712px712.x712.241010131958.y8y8/catalogue/ss-infotech-ramdaspeth-nagpur-mobile-application-developers-7bfi8zj3vd.jpg',
  'flipkart': 'https://www.retail-insight-network.com/wp-content/uploads/sites/18/2022/08/Flipkart-1.jpg',
  'lenskart': 'https://my-lkstore.lenskart.com/store_locator_image/LKST544/1.jpeg',
  'swiggy': 'https://static.ambitionbox.com/api/v2/photo/d2lSWUk1Y2UxZVhMODNkVjNFdWZUZz09',
  'v4u computer inc': 'https://content.jdmagicbox.com/v2/comp/kovilpatti/a3/9999p4632.4632.200513222020.b6a3/catalogue/v-4-u-tech-park-e-road-kovilpatti-computer-repair-and-services-h6b02b1fci.jpg',
  'delivery': 'https://images.jdmagicbox.com/v2/comp/kolkata/m7/033pxx33.xx33.220208090604.c3m7/catalogue/delhivery-courier-services-kolkata-7xj1dvdp7d.jpg',

  // Banks
  'hsbc': 'https://www.privatebankerinternational.com/wp-content/uploads/sites/5/2025/05/HSBCnew-shutterstock_1073418605.jpg',
  'hdfc': 'https://content3.jdmagicbox.com/comp/visakhapatnam/w6/0891px891.x891.240125165633.j7w6/catalogue/hdfc-bank-prahladapuram-visakhapatnam-r7omer2xds.jpg',
  'sbi': 'https://content.jdmagicbox.com/comp/visakhapatnam/95/0891p891std3001795/catalogue/state-bank-of-india-mvp-colony-visakhapatnam-banks-1d0nosi.jpg',
  'kotak mahindra bank': 'https://content3.jdmagicbox.com/v2/comp/hyderabad/g8/040pxx40.xx40.110221133736.r2g8/catalogue/kotak-mahindra-bank-as-rao-nagar-hyderabad-banks-vn6zn8xpql.jpg',
  'vijaya bank': 'https://content3.jdmagicbox.com/v2/comp/hyderabad/y7/040pxx40.xx40.001021184516.y3y7/catalogue/vijaya-bank-narayanguda-hyderabad-personal-loans-32jl2ga.jpg',
  'south indian bank': 'https://images.cnbctv18.com/uploads/2024/07/south-indian-bank1jpeg-2024-07-7b0f6b24f84ec1a4d7ec6d6be065d287.jpg',
  'hdfc ergo': 'https://content.jdmagicbox.com/comp/visakhapatnam/73/0891p891std2000473/catalogue/mahatma-gandhi-cancer-hospital-and-research-institute-mvp-colony-visakhapatnam-hospitals-zmify-250.jpg',
  'canara bank': 'https://images.jdmagicbox.com/v2/comp/visakhapatnam/c8/0891px891.x891.240129123224.e4c8/catalogue/canara-bank-dwaraka-nagar-visakhapatnam-visakhapatnam-banks-9kxtyw6rxx.jpg',
  'indusind bank': 'https://images.jdmagicbox.com/v2/comp/bangalore/k8/080pxx80.xx80.110607125505.w2k8/catalogue/indusind-bank-ltd-m-g-road-bangalore-banks-wrx5mdawpq.jpg',
  'federal bank': 'https://content.jdmagicbox.com/v2/comp/warangal/p4/9999px870.x870.241121190519.i4p4/catalogue/federal-bank-jpn-road-warangal-f5cc2xvx70.jpg',

  // Retail
  'varun motors pvt ltd': 'https://images.jdmagicbox.com/comp/vijayawada/p6/0866px866.x866.170426113136.d4p6/catalogue/varun-maruthi-ramavarappadu-vijayawada-car-dealers-maruti-suzuki-25smu7hv7a.jpg',
  'lifestyle': 'https://content3.jdmagicbox.com/v2/comp/visakhapatnam/m5/0891px891.x891.230309084328.n3m5/catalogue/lifestyle-stores-gajuwaka-visakhapatnam-readymade-garment-retailers-WoXQYyDcta.jpg',
  'max': 'https://content3.jdmagicbox.com/v2/comp/visakhapatnam/h1/0891px891.x891.200305210820.q5h1/catalogue/max-fashion-cbm-compound-visakhapatnam-readymade-garment-retailers-yd324vmkik.jpg',
  'splash': 'https://content.jdmagicbox.com/comp/visakhapatnam/i8/0891px891.x891.220710134842.z4i8/catalogue/-run15xcbp0.jpg',
  'spencer': 'https://lh3.googleusercontent.com/aF3DpFJuc2s-jtYp2sL2wGfaoV2vyGu0S4lPFZlHIbo3ZDaL6jsS--EjJNVDKeg1ItzKWJn4AT_kNRkTKPybccZyuzXUttOQWZ6ErHez=s750',
  'anr shopping mall': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ZtB2oTHZB0ljOKQfolY1bB7nwFhOL41NbgOPx-sCig&s=10',
  'blackberry': 'https://content.jdmagicbox.com/comp/karimnagar/l2/9999px878.x878.230904154536.f8l2/catalogue/blackberrys-cvrn-road-karimnagar-men-readymade-garment-wholesalers-tnh9i1w9rm.jpg',
  'reliance fresh': 'https://content.jdmagicbox.com/v2/comp/delhi/n4/011pxx11.xx11.150701160558.c1n4/catalogue/reliance-fresh-paschim-vihar-delhi-grocery-stores-uismq5.jpg'
};


const TRACK_RECORD_CLIENTS = [
  {
    name: 'Muthoot Finance',
    sub: 'BFSI Surveillance & AMC',
    icon: <Building2 size={40} strokeWidth={1.2} />
  },
  {
    name: 'Mahindra Finance',
    sub: 'Branch Security Refits',
    icon: <PieChart size={40} strokeWidth={1.2} />
  },
  {
    name: 'Swiggy',
    sub: 'Hub Automation & Dock Bays',
    icon: <Bike size={40} strokeWidth={1.2} />
  },
  {
    name: 'Lifestyle',
    sub: 'EAS & Footfall Analytics',
    icon: <ShoppingBag size={40} strokeWidth={1.2} />
  },
  {
    name: 'Reliance Fresh',
    sub: 'Central POS Surveillance',
    icon: <ShoppingCart size={40} strokeWidth={1.2} />
  }
];

const AnimatedCounter = ({ endValue, suffix = '', prefix = '', duration = 2, decimals = 0 }: { endValue: number, suffix?: string, prefix?: string, duration?: number, decimals?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!nodeRef.current) return;
    
    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: endValue,
      duration: duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: nodeRef.current,
        start: "top 85%",
        toggleActions: "restart none none reset"
      },
      onUpdate: () => {
        if (nodeRef.current) {
          const val = decimals > 0 ? obj.val.toFixed(decimals) : Math.floor(obj.val).toLocaleString('en-US');
          nodeRef.current.innerText = prefix + val + suffix;
        }
      }
    });
  }, { scope: nodeRef });

  return <span ref={nodeRef}>{prefix}0{suffix}</span>;
};

const TrackRecordSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.track-record-header > *', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'restart none none reset' } }
    );
    gsap.fromTo('.tr-bento-stats > .tr-stat-card',
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'restart none none reset' } }
    );
  }, { scope: sectionRef });

  return (
    <section className="track-record-section" ref={sectionRef}>
      <div className="tr-watermark">TRUSTED</div>
      <div className="container">
        <div className="track-record-header">
          <p className="tr-eyebrow">PROVEN TRACK RECORD</p>
          <h2 className="tr-title">Trusted by Industry Leaders Across South India</h2>
          <p className="tr-subtitle">
            Over 7 years of relentless execution in Andhra Pradesh, Telangana, Tamil Nadu, and pan-India turnkey deployments.
          </p>
        </div>

        <div className="tr-marquee-container">
          <div className="tr-marquee-content">
            {/* Double the array for seamless marquee looping */}
            {[...TRACK_RECORD_CLIENTS, ...TRACK_RECORD_CLIENTS].map((client, idx) => (
              <div key={idx} className="tr-client-card">
                <div className="tr-client-icon">{client.icon}</div>
                <h4 className="tr-client-name">{client.name}</h4>
                <p className="tr-client-sub">{client.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="tr-bento-stats">
          <div className="tr-stat-card">
            <h3 className="tr-stat-val text-orange">
              <AnimatedCounter endValue={10000} suffix="+" />
            </h3>
            <p className="tr-stat-label">CAMERAS & SENSORS DEPLOYED</p>
          </div>
          <div className="tr-stat-card">
            <h3 className="tr-stat-val text-green">
              <AnimatedCounter endValue={99.8} decimals={1} suffix="%" />
            </h3>
            <p className="tr-stat-label">SLA UPTIME MAINTAINED</p>
          </div>
          <div className="tr-stat-card">
            <h3 className="tr-stat-val text-white">
              <AnimatedCounter endValue={450} suffix="+" />
            </h3>
            <p className="tr-stat-label">TURNKEY SITES HANDLED</p>
          </div>
          <div className="tr-stat-card">
            <h3 className="tr-stat-val text-orange">
              <AnimatedCounter endValue={24} suffix=" / 7" duration={1.5} />
            </h3>
            <p className="tr-stat-label">DIRECT VIZAG DISPATCH DESK</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const getBentoClass = (index: number) => {
  if (index === 0) return 'featured-card';
  return 'supporting-card';
};

const MemoizedIndustryCard = React.memo(({ industry, index, onShowClients }: { industry: any, index: number, onShowClients: (ind: any) => void }) => {
  const industryNumber = String(index + 1).padStart(2, '0');
  const bentoClass = getBentoClass(index);
  const isFeatured = index === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={`rich-industry-card-wrapper ${bentoClass}`}
    >
      <div className={`rich-industry-card ${isFeatured ? 'featured' : ''}`}>
        <div className="ric-image-wrapper">
          <img src={industry.image} alt={industry.title} className="ric-image" loading="lazy" />
        </div>
        
        <div className="ric-content">
          <div className="ric-meta-row">
            <span className="ric-number">{industryNumber}</span>
          </div>
          
          <h3 className="ric-title">{industry.title}</h3>
          
          {isFeatured && <p className="ric-description">{industry.longDescription}</p>}
          <div className="ric-services">
            {industry.services.slice(0, isFeatured ? 10 : 3).map((service: string) => (
              <span key={service} className="ric-service-tag">{service}</span>
            ))}
            {!isFeatured && industry.services.length > 3 && (
              <span className="ric-service-tag">+{industry.services.length - 3} MORE</span>
            )}
          </div>
          
          <div className="ric-footer">
            <div className="ric-cta-row" onClick={() => onShowClients(industry)}>
              <span className="ric-cta-text">EXPLORE INDUSTRY</span>
              <svg className="ric-cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});



export default function Industries() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<any | null>(null);
  const [selectedClientImage, setSelectedClientImage] = useState<string | null>(null);
  
  const industriesGridRef = useRef<HTMLDivElement>(null);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const filteredIndustries = useMemo(() => {
    return industries.filter((industry) => {
      const query = deferredSearchQuery.toLowerCase();
      if (!query) return true;
      return (
        industry.title.toLowerCase().includes(query) ||
        industry.longDescription.toLowerCase().includes(query) ||
        industry.services.some(s => s.toLowerCase().includes(query))
      );
    });
  }, [deferredSearchQuery]);

  const scrollToIndustries = () => {
    if (industriesGridRef.current) {
      industriesGridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let ticking = false;
    const updateMouse = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', updateMouse, { passive: true });
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  useEffect(() => {
    if (selectedIndustry || selectedClientImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndustry, selectedClientImage]);

  return (
    <PageTransition>
      <div className="industries-page-root">
        {/* Dynamic Hero */}
        <IndustriesHeroDynamic onExploreClick={scrollToIndustries} />

        {/* Real-time Search & Rich Cards Grid */}
        <section className="industries-grid-section" ref={industriesGridRef}>
          <div className="container">
            <div className="industries-grid-header-row">
              <div className="industries-grid-title-area">
                <h2 className="industries-section-title">SECTORS WE SERVE</h2>
                <span className="industries-count-badge">({filteredIndustries.length} SECTORS)</span>
              </div>

              <div className="industries-search-wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input 
                  type="text"
                  placeholder="Search industries, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="industries-search-input"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="search-clear-btn">
                    &times;
                  </button>
                )}
              </div>
            </div>

            {filteredIndustries.length > 0 ? (
              <div className="rich-industries-grid">
                {filteredIndustries.map((ind, i) => (
                  <MemoizedIndustryCard 
                    key={ind.slug} 
                    industry={ind} 
                    index={i} 
                    onShowClients={(industry) => setSelectedIndustry(industry)} 
                  />
                ))}
              </div>
            ) : (
              <motion.div 
                className="industries-empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3>No sectors found</h3>
                <p>We couldn't find any industries matching "{searchQuery}".</p>
                <button className="btn-secondary" onClick={() => setSearchQuery('')}>Clear Search</button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Track Record Section */}
        <TrackRecordSection />

        {/* Partners Modal */}
        <AnimatePresence>
          {selectedIndustry && (
            <motion.div 
              className="partners-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndustry(null)}
            >
              <motion.div 
                className="partners-modal-content"
                initial={{ y: 20, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 15, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="partners-modal-header">
                  <h3>{selectedIndustry.title} Partners</h3>
                  <button className="partners-modal-close" onClick={() => setSelectedIndustry(null)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <div className="partners-modal-body">
                  <div className="partners-grid">
                    {getClientsForIndustry(selectedIndustry.slug).map((client, i) => {
                      const imageKey = client.name.toLowerCase().trim();
                      const clientImage = clientImagesMap[imageKey];
                      return (
                        <div 
                          key={client.id}
                          className="partner-item-wrapper animate-in"
                          style={{ animationDelay: `${i * 0.04}s` }}
                        >
                          <div 
                            className={`partner-item ${clientImage ? 'has-image' : ''}`}
                            onClick={() => {
                              if (clientImage) setSelectedClientImage(clientImage);
                            }}
                          >
                            <div className="partner-item-content">
                              <div 
                                className="partner-avatar"
                                style={{ backgroundColor: getAvatarColor(client.name) }}
                              >
                                {getInitials(client.name)}
                              </div>
                              <div 
                                className="partner-info"
                                title={`${client.name} - ${client.category} Partner`}
                              >
                                <span className="partner-item-text">{client.name}</span>
                                <span className="partner-item-sub">{client.category} Partner</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {getClientsForIndustry(selectedIndustry.slug).length === 0 && (
                     <p className="no-partners-msg">Our partner network is currently being updated for this sector.</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Client Image Modal */}
        <AnimatePresence>
          {selectedClientImage && (
            <motion.div 
              className="client-image-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClientImage(null)}
            >
              <motion.div 
                className="client-image-modal-content"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={e => e.stopPropagation()}
              >
                <button 
                  className="client-image-modal-close"
                  onClick={() => setSelectedClientImage(null)}
                >
                  &times;
                </button>
                <img src={selectedClientImage} alt="Client Location" className="client-image-modal-img" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
