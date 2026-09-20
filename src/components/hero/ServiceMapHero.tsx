import React, { useState, useEffect } from 'react';
import DesktopHero from './DesktopHero';
import MobileHero from './MobileHero';

export default function ServiceMapHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window matches mobile width (768px as standard breakpoint)
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    
    // Set initial value
    setIsMobile(mediaQuery.matches);
    
    // Handle changes
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    
    // Support older browsers that don't have addEventListener on MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return isMobile ? <MobileHero /> : <DesktopHero />;
}
