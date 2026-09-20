import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from './heroData';
import { gsap } from 'gsap';

interface MobileServiceSheetProps {
  activeNodeId: string | null;
  onClose: () => void;
}

export default function MobileServiceSheet({ activeNodeId, onClose }: MobileServiceSheetProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  
  const serviceData = services.find(s => s.id === activeNodeId);

  useEffect(() => {
    if (activeNodeId && sheetRef.current && overlayRef.current) {
      document.body.style.overflow = 'hidden';
      
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      
      gsap.fromTo(sheetRef.current,
        { y: '100%' },
        { y: '0%', duration: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeNodeId]);

  const handleClose = () => {
    if (sheetRef.current && overlayRef.current) {
      gsap.to(sheetRef.current, { y: '100%', duration: 0.3, ease: 'power3.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onClose });
    } else {
      onClose();
    }
  };

  if (!activeNodeId || !serviceData) return null;

  return (
    <div className="mh-sheet-overlay" ref={overlayRef} onClick={handleClose}>
      <div 
        className="mh-sheet-content" 
        ref={sheetRef} 
        onClick={e => e.stopPropagation()} /* Prevent clicks from closing overlay */
      >
        <div className="mh-sheet-header">
          <h3 className="mh-sheet-title">{serviceData.label}</h3>
          <button className="mh-sheet-close" onClick={handleClose} aria-label="Close">✕</button>
        </div>
        <p className="mh-sheet-desc">
          {serviceData.desc}
        </p>
        <Link to={`/services#${(serviceData as any).slug}`} className="mh-sheet-cta" onClick={handleClose}>
          VIEW SERVICE →
        </Link>
      </div>
    </div>
  );
}
