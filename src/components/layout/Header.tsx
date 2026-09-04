import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mainNavigation } from '../../data/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Escape key closes menu
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, handleKeyDown]);

  // Since the homepage is now light/warm, we don't need a dark header there.
  // We can just keep the header dark text for all pages, or only use dark header if a specific page requires it.
  const isDarkHeader = false;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-xl border-b border-cream-dark/60 shadow-[0_2px_20px_rgba(23,22,19,0.05)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-20" aria-label="Main navigation">
            {/* Logo */}
            <Link to="/" className="relative z-10 flex items-center gap-1" aria-label="SST Home">
              <SSTLogo isDark={isDarkHeader} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {mainNavigation.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href + '/'));
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-orange ${
                      isActive
                        ? 'text-orange'
                        : 'text-charcoal/80 hover:text-orange'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center px-5 py-2.5 bg-orange text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-orange-dark hover:shadow-[0_0_25px_rgba(241,90,36,0.3)] transition-all duration-300"
              >
                Get a Quote
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <span className={`w-6 h-[2px] transition-all duration-300 bg-charcoal ${isMobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
                <span className={`w-6 h-[2px] transition-all duration-300 bg-charcoal ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-[2px] transition-all duration-300 bg-charcoal ${isMobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
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
            className="fixed inset-0 z-[99] bg-ivory flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
              {mainNavigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.href}
                    className={`text-3xl md:text-4xl font-extrabold uppercase tracking-tight transition-colors duration-300 hover:text-orange ${
                      location.pathname === item.href ? 'text-orange' : 'text-charcoal'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: mainNavigation.length * 0.08, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center px-8 py-4 bg-orange text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-orange-dark transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get a Quote
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SSTLogo({ isDark }: { isDark: boolean }) {
  const strokeColor = isDark ? '#F7F0E0' : '#171613';
  return (
    <svg
      width="72"
      height="32"
      viewBox="0 0 72 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-300"
    >
      {/* S */}
      <path
        d="M2 24C2 24 4 26 9 26C14 26 16 23 16 20.5C16 18 14.5 16.5 10 15C5.5 13.5 4 12.5 4 10.5C4 8.5 6 6 10 6C14 6 16 8 16 8"
        stroke={strokeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* S (second) */}
      <path
        d="M20 24C20 24 22 26 27 26C32 26 34 23 34 20.5C34 18 32.5 16.5 28 15C23.5 13.5 22 12.5 22 10.5C22 8.5 24 6 28 6C32 6 34 8 34 8"
        stroke={strokeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* T */}
      <path
        d="M38 6H56M47 6V26"
        stroke={strokeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Orange accent on T */}
      <path
        d="M52 6L58 6L54 26"
        stroke="#F15A24"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
