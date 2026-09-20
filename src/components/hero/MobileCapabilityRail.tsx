import React from 'react';
import { services } from './heroData';

export default function MobileCapabilityRail() {
  // Duplicate array for continuous seamless looping marquee
  const marqueeItems = [...services, ...services];

  return (
    <div className="mh-rail-container mh-anim-rail">
      <div className="mh-rail-marquee-wrapper">
        <div className="mh-rail-track">
          {marqueeItems.map((service, index) => (
            <div key={`${service.id}-${index}`} className="mh-rail-card">
              <svg className="mh-rail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={service.icon} />
              </svg>
              <span className="mh-rail-label">{service.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
