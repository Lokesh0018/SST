import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mainNavigation } from '../../data/navigation';
import '../../styles/Header.css';

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
        className={`header-root ${
          isScrolled
            ? 'header-scrolled'
            : 'header-transparent'
        }`}
      >
        <div className="header-container">
          <nav className="header-nav" aria-label="Main navigation">
            
            <div className="header-logo-container">
              <Link to="/" className="header-logo-link" aria-label="SST Home">
                <SSTLogo />
              </Link>
            </div>

            <div className="header-desktop-nav">
              <div className="header-nav-divider" />

              {mainNavigation.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href + '/'));
                const hasChildren = item.children && item.children.length > 0;
                
                return (
                  <div 
                    key={item.href} 
                    className="header-nav-item"
                    onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className="header-nav-link"
                    >
                      <span className={`header-nav-text ${
                        isActive || activeDropdown === item.label ? 'header-nav-text-active' : 'header-nav-text-inactive'
                      }`}>
                        {item.label}
                      </span>
                      
                      {hasChildren && (
                        <svg className={`header-nav-chevron ${activeDropdown === item.label ? 'header-nav-chevron-active' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}

                      <span className={`header-nav-indicator ${
                        isActive ? 'header-nav-indicator-active' : 'header-nav-indicator-inactive'
                      }`} />
                    </Link>

                    <AnimatePresence>
                      {hasChildren && activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="header-dropdown"
                        >
                          {item.children!.map((child, idx) => (
                            <Link 
                              key={child.href} 
                              to={child.href} 
                              className="header-dropdown-link"
                            >
                              <div className="header-dropdown-grid">
                                <span className="header-dropdown-number">
                                  0{idx + 1}
                                </span>
                                <span className="header-dropdown-text">
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

            <div className="header-actions">
              <Link
                to="/contact"
                className="header-cta-desktop"
              >
                START A PROJECT
                <span className="header-cta-arrow">
                  <span className="header-cta-arrow-head" />
                </span>
              </Link>

              <button
                className="header-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <span className={`header-menu-line ${isMobileMenuOpen ? 'line-1-open' : ''}`} />
                <span className={`header-menu-line ${isMobileMenuOpen ? 'line-2-open' : ''}`} />
                <span className={`header-menu-line ${isMobileMenuOpen ? 'line-3-open' : ''}`} />
              </button>
            </div>
            
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="header-mobile-menu"
          >
            <nav className="header-mobile-nav">
              {mainNavigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="header-mobile-item"
                >
                  <Link
                    to={item.href}
                    className={`header-mobile-link ${
                      location.pathname === item.href ? 'header-mobile-link-active' : 'header-mobile-link-inactive'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  
                  {item.children && (
                    <div className="header-mobile-dropdown">
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="header-mobile-dropdown-link"
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
                className="header-mobile-cta-wrapper"
              >
                <Link
                  to="/contact"
                  className="header-cta-mobile"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  START A PROJECT
                  <span className="header-cta-arrow">
                    <span className="header-cta-arrow-head" />
                  </span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SSTLogo() {
  return (
    <img src="/images/logo/SST Logo.png" alt="SST Logo" style={{ height: '75px', width: 'auto', maxHeight: '88px', objectFit: 'contain' }} />
  );
}
