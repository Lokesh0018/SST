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
    <section className="relative w-full min-h-[100vh] lg:h-[100vh] overflow-hidden bg-[#FFFDF8] pt-24 lg:pt-0 flex flex-col justify-center">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Extremely subtle grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(216,207,190,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(216,207,190,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Premium atmospheric radial gradient behind the globe on the right side */}
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none"
             style={{
               background: 'radial-gradient(circle at 75% 50%, rgba(240,239,234, 0.6) 0%, transparent 55%)'
             }}
        />
      </div>

      <div className="container relative z-10 flex-grow lg:flex-grow-0 flex flex-col lg:flex-row items-center w-full max-w-[1600px] mx-auto px-6 lg:px-12 h-full">
        
        {/* LEFT COLUMN: Typography */}
        <div className="w-full lg:w-[45%] relative z-20 pointer-events-auto shrink-0 flex flex-col justify-center pt-8 lg:pt-0">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5F5C55] mb-6 flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4511E]" />
            INTEGRATED INFRASTRUCTURE & SECURITY
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-[2.75rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-extrabold uppercase leading-[1.05] tracking-tight text-[#1C1C1B]"
          >
            ONE PARTNER.<br />
            COMPLETE<br />
            <span className="text-[#F4511E]">INFRASTRUCTURE.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 lg:mt-8 text-sm md:text-base text-[#5F5C55] leading-[1.8] font-medium max-w-[480px]"
          >
            Security, technology, electrical, fire safety, logistics and turnkey solutions — engineered and delivered as one integrated system.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            {/* Primary CTA */}
            <Link to="/solutions" className="group flex items-center justify-center gap-4 bg-[#F4511E] text-[#1C1C1B] font-extrabold uppercase tracking-[0.2em] text-[10px] px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#D94116] shadow-[0_4px_20px_rgba(244,81,30,0.15)] hover:shadow-[0_6px_25px_rgba(244,81,30,0.25)] hover:-translate-y-0.5">
              Explore Solutions
              <span className="w-3 h-[1px] bg-[#1C1C1B] transition-all duration-300 group-hover:w-5 group-hover:translate-x-1 relative">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-r border-t border-[#1C1C1B] rotate-45" />
              </span>
            </Link>
            
            {/* Secondary CTA */}
            <Link to="/about" className="group flex items-center justify-center gap-4 bg-transparent text-[#1C1C1B] font-extrabold uppercase tracking-[0.2em] text-[10px] px-8 py-4 rounded-full transition-all duration-300 border border-[#D8CFBE] hover:border-[#1C1C1B] hover:bg-[#1C1C1B]/5 hover:-translate-y-0.5">
              Watch Our Story
              <span className="w-3 h-[1px] bg-[#1C1C1B] transition-all duration-300 group-hover:w-5 group-hover:translate-x-1 relative">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-r border-t border-[#1C1C1B] rotate-45" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D Scene + Ecosystem Panel */}
        <div className="w-full lg:w-[55%] h-[500px] lg:h-full relative shrink-0 mt-8 lg:mt-0 flex items-center justify-center lg:justify-end">
          
          {/* 3D Canvas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute inset-0 z-0 flex items-center justify-center"
          >
            <div className="w-full h-full relative">
              <Hero3DScene 
                activeService={activeService} 
                setActiveService={setActiveService}
              />
            </div>
          </motion.div>


        </div>
      </div>

      {/* Bottom Indicators - Absolute positioned to bottom of 100vh */}
      <div className="absolute bottom-0 left-0 w-full pb-8 z-20 pointer-events-none">
        <div className="container max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-3 text-[9px] font-bold text-[#1C1C1B]/60 uppercase tracking-[0.2em]">
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>↓</motion.div>
            SCROLL TO EXPLORE
          </div>
          
          <div className="hidden lg:flex items-center gap-4 text-[10px] font-bold text-[#1C1C1B] uppercase tracking-[0.2em] ml-auto">
            <span className="w-24 text-right">{activeService ? `0${services.findIndex(s => s.id === activeService) + 1} ${activeService}` : '01 SECURITY'}</span>
            <div className="w-32 h-[1px] bg-[#D8CFBE] relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#F4511E]"
                initial={{ width: '16%' }}
                animate={{ width: activeService ? `${((services.findIndex(s => s.id === activeService) + 1) / services.length) * 100}%` : '16%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-[#5F5C55]">06</span>
          </div>
        </div>
      </div>
    </section>
  );
}
