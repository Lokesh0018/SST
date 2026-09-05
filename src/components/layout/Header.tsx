import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mainNavigation } from '../../data/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (activeDropdown) setActiveDropdown(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFDF8]/90 backdrop-blur-md border-b border-[#D8CFBE]/30 shadow-[0_4px_30px_rgba(28,28,27,0.03)]'
            : 'bg-transparent'
        }`}
      >
        {/* Max width container, strict height, exact alignment */}
        <div className="container max-w-[1440px] mx-auto px-6 lg:px-12 h-[88px]">
          <nav className="flex items-center justify-between h-full w-full" aria-label="Main navigation">
            
            {/* Logo + Brand Line Area */}
            <div className="flex items-center">
              <Link to="/" className="relative z-10 flex items-center group" aria-label="SST Home">
                <SSTLogo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {/* Subtle brand detail line before navigation */}
              <div className="w-[1px] h-4 bg-[#F4511E]/40 mr-2" />

              {mainNavigation.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href + '/'));
                const hasChildren = item.children && item.children.length > 0;
                
                return (
                  <div 
                    key={item.href} 
                    className="relative flex items-center h-[88px]"
                    onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className="group flex items-center gap-1.5 py-2 relative"
                    >
                      <span className={`text-[12.5px] font-medium tracking-[0.18em] uppercase transition-colors duration-[250ms] ${
                        isActive || activeDropdown === item.label ? 'text-[#1C1C1B]' : 'text-[#5F5C55] group-hover:text-[#1C1C1B]'
                      }`}>
                        {item.label}
                      </span>
                      
                      {/* Thin Chevron */}
                      {hasChildren && (
                        <svg className={`w-2.5 h-2.5 text-[#5F5C55] transition-transform duration-[250ms] ${activeDropdown === item.label ? 'rotate-180 text-[#1C1C1B]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}

                      {/* Precise Active/Hover Indicator */}
                      <span className={`absolute -bottom-[2px] left-0 h-[2px] bg-[#F4511E] rounded-full transition-all duration-[250ms] ease-out-expo ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </Link>

                    {/* Premium Mega Menu Dropdown */}
                    <AnimatePresence>
                      {hasChildren && activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[320px] bg-[#FFFDF8] border border-[#D8CFBE]/50 shadow-[0_16px_40px_rgba(28,28,27,0.08)] rounded-[18px] p-6 flex flex-col gap-1 before:content-[''] before:absolute before:-top-6 before:left-0 before:w-full before:h-6"
                        >
                          {item.children!.map((child, idx) => (
                            <Link 
                              key={child.href} 
                              to={child.href} 
                              className="group/link flex items-center p-2.5 rounded-xl transition-colors duration-[250ms] hover:bg-[#F6F0E2]"
                            >
                              <div className="grid grid-cols-[20px_1fr] items-center gap-4 w-full">
                                <span className="text-[10px] font-bold font-mono text-[#5F5C55]/50 group-hover/link:text-[#F4511E] transition-colors duration-[250ms]">
                                  0{idx + 1}
                                </span>
                                <span className="text-[12px] font-bold tracking-widest uppercase text-[#5F5C55] group-hover/link:text-[#1C1C1B] group-hover/link:translate-x-[3px] transition-all duration-[250ms]">
                                  {child.label}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Side CTA & Mobile Menu */}
            <div className="flex items-center gap-6">
              <Link
                to="/contact"
                className="group hidden lg:inline-flex items-center justify-between w-[160px] h-[40px] px-5 bg-[#F4511E] border border-[#1C1C1B]/10 text-[#1C1C1B] text-[11.5px] font-semibold uppercase tracking-[0.14em] rounded-[7px] transition-all duration-[200ms] ease-out-expo hover:-translate-y-[1px] hover:bg-[#E24616] hover:shadow-[0_4px_12px_rgba(28,28,27,0.08)]"
              >
                <span>Request Demo</span>
                <svg className="w-4 h-4 text-[#1C1C1B] transition-transform duration-[200ms] ease-out-expo group-hover:translate-x-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Hamburger Button */}
              <button
                className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <span className={`w-5 h-[1.5px] transition-all duration-300 bg-[#1C1C1B] ${isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                <span className={`w-5 h-[1.5px] transition-all duration-300 bg-[#1C1C1B] ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-5 h-[1.5px] transition-all duration-300 bg-[#1C1C1B] ${isMobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
              </button>
            </div>
            
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-[#FFFDF8] flex flex-col items-center justify-center p-6"
          >
            <nav className="flex flex-col items-center gap-8 w-full max-w-md">
              {mainNavigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="w-full text-center"
                >
                  <Link
                    to={item.href}
                    className={`text-2xl font-extrabold uppercase tracking-widest transition-colors duration-300 ${
                      location.pathname === item.href ? 'text-[#F4511E]' : 'text-[#1C1C1B]'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  
                  {item.children && (
                    <div className="mt-4 flex flex-col gap-3">
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-[12px] font-bold tracking-widest uppercase text-[#5F5C55]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: mainNavigation.length * 0.05, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-between w-[140px] h-[40px] px-4 bg-[#F4511E] border border-[#1C1C1B]/10 text-[#1C1C1B] text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[7px] transition-all duration-[200ms] ease-out-expo hover:bg-[#E24616]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Request Demo</span>
                  <svg className="w-[14px] h-[14px] text-[#1C1C1B] transition-transform duration-[200ms] group-hover:translate-x-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Inline SSTLogo component scaled down by ~15%
// Original was 100x42, this is 85x36
function SSTLogo() {
  return (
    <svg width="85" height="36" viewBox="0 0 72 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 24C2 24 4 26 9 26C14 26 16 23 16 20.5C16 18 14.5 16.5 10 15C5.5 13.5 4 12.5 4 10.5C4 8.5 6 6 10 6C14 6 16 8 16 8"
        stroke="#171717"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 24C20 24 22 26 27 26C32 26 34 23 34 20.5C34 18 32.5 16.5 28 15C23.5 13.5 22 12.5 22 10.5C22 8.5 24 6 28 6C32 6 34 8 34 8"
        stroke="#171717"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M44 6L44 26"
        stroke="#F4511E"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 6L50 6"
        stroke="#F4511E"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
