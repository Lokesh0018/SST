import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero3DScene from '../three/Hero3DScene';

const services = [
  { id: 'SECURITY', label: 'SECURITY' },
  { id: 'INFRASTRUCTURE', label: 'IT INFRASTRUCTURE' },
  { id: 'ELECTRICAL', label: 'ELECTRICAL' },
  { id: 'SAFETY', label: 'FIRE & SAFETY' },
  { id: 'LOGISTICS', label: 'LOGISTICS' },
  { id: 'TURNKEY', label: 'TURNKEY' }
];

export default function HeroSection() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen bg-ivory overflow-hidden flex flex-col pt-24">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft radial glow behind sphere */}
        <div 
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(241,90,36,0.06) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(23,22,19,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(23,22,19,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Faint technical lines (SVG background placeholder) */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100,100 L400,300 M300,50 L500,400' stroke='%23171613' stroke-width='1' fill='none'/%3E%3Ccircle cx='400' cy='300' r='10' stroke='%23171613' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover'
          }}
        />
      </div>

      <div className="container relative z-10 flex-grow flex flex-col lg:flex-row items-center w-full max-w-[1600px] mx-auto pb-16">
        
        {/* LEFT COLUMN: Typography (max-w 550px) */}
        <div className="w-full lg:w-[45%] relative z-20 pointer-events-auto shrink-0 flex flex-col justify-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/60 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            INTEGRATED INFRASTRUCTURE & SECURITY
          </p>

          <h1 className="text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-extrabold uppercase leading-[1.05] tracking-tight text-charcoal">
            ONE PARTNER.<br />
            COMPLETE<br />
            <span className="text-orange">INFRASTRUCTURE.</span>
          </h1>
          
          <p className="mt-8 text-base md:text-lg text-charcoal/70 leading-[1.8] font-medium max-w-[550px]">
            Security, technology, electrical, fire safety, logistics and turnkey solutions — engineered and delivered as one integrated system.
          </p>
          
          <div className="flex flex-wrap items-center gap-5 mt-10">
            {/* Primary Button — premium orange pill */}
            <Link 
              to="/solutions" 
              className="group inline-flex items-center justify-center px-10 py-4 bg-orange text-white text-sm font-bold uppercase tracking-wider rounded-full hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(241,90,36,0.3)] transition-all duration-300"
            >
              EXPLORE SOLUTIONS 
              <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </Link>
            
            {/* Secondary Button — outlined pill */}
            <button
              className="group inline-flex items-center justify-center px-10 py-4 bg-transparent border border-charcoal/25 text-charcoal text-sm font-bold uppercase tracking-wider rounded-full hover:-translate-y-[2px] hover:border-charcoal/40 hover:shadow-[0_8px_24px_rgba(23,22,19,0.06)] transition-all duration-300"
            >
              WATCH OUR STORY 
              <span className="ml-3 opacity-60 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300">→</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Scene + Service Selector */}
        <div className="w-full lg:w-[55%] h-[500px] lg:h-[700px] xl:h-[800px] relative shrink-0 mt-12 lg:mt-0">
          
          {/* 3D Canvas bounds strictly to this column */}
          <div className="absolute inset-0 z-0">
            <Hero3DScene 
              activeService={activeService} 
              setActiveService={setActiveService}
            />
          </div>

          {/* Minimal sleek Integrated Solutions Panel */}
          <div className="absolute top-[45%] right-0 lg:-right-8 xl:-right-12 -translate-y-1/2 z-10 pointer-events-auto">
            <div className="flex flex-col gap-4 text-right">
              <div className="flex items-center justify-end gap-3 mb-2 opacity-60">
                <div className="h-[1px] w-8 bg-charcoal/40" />
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-charcoal">Ecosystem</p>
              </div>
              
              {services.map((service, idx) => {
                const isActive = activeService === service.id;
                return (
                  <div 
                    key={service.id}
                    className="flex items-center justify-end gap-4 cursor-pointer group relative"
                    onMouseEnter={() => setActiveService(service.id)}
                    onMouseLeave={() => setActiveService(null)}
                  >
                    {/* Minimal Visual Connection */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeConnection"
                        className="absolute right-full mr-6 flex items-center"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-orange/60" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_10px_rgba(241,90,36,0.8)]" />
                      </motion.div>
                    )}

                    <span className={`text-[10px] font-bold tracking-[0.15em] transition-colors duration-300 ${isActive ? 'text-orange' : 'text-charcoal/20 group-hover:text-charcoal/40'}`}>
                      0{idx + 1}
                    </span>
                    <span className={`text-sm font-extrabold uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-charcoal translate-x-0' : 'text-charcoal/50 group-hover:text-charcoal/80 translate-x-2'}`}>
                      {service.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Indicators */}
      <div className="w-full pb-8 z-20 pointer-events-none mt-auto">
        <div className="container max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] font-bold text-charcoal/60 uppercase tracking-widest">
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>↓</motion.div>
            SCROLL TO EXPLORE
          </div>
          
          <div className="flex items-center gap-3 text-[10px] font-bold text-charcoal uppercase tracking-widest">
            <span className="w-20 text-right">{activeService ? `0${services.findIndex(s => s.id === activeService) + 1} ${activeService}` : '01 SECURITY'}</span>
            <div className="w-16 md:w-32 h-[1px] bg-charcoal/20 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-orange"
                initial={{ width: '16%' }}
                animate={{ width: activeService ? `${((services.findIndex(s => s.id === activeService) + 1) / services.length) * 100}%` : '16%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-charcoal/40">06</span>
          </div>
        </div>
      </div>
    </section>
  );
}
