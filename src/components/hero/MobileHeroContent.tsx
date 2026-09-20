import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileHeroContent() {
  return (
    <div className="mh-content-container">
      <p className="mh-eyebrow mh-anim-item">
        <span className="mh-eyebrow-dot" />
        INTEGRATED TECHNOLOGY • INFRASTRUCTURE • SECURITY
      </p>

      <h1 className="mh-title">
        <span className="mh-title-line">ONE PARTNER.</span>
        <span className="mh-title-line">COMPLETE</span>
        <span className="mh-title-line mh-title-highlight">INFRASTRUCTURE.</span>
      </h1>

      <p className="mh-desc mh-anim-item">
        End-to-end technology, security and infrastructure solutions — from surveillance and networking to electrical systems, logistics and turnkey implementation.
      </p>

      <div className="mh-cta-group mh-anim-item">
        <Link to="/services" className="mh-cta mh-cta-primary">
          EXPLORE SERVICES
          <span className="mh-cta-icon">→</span>
        </Link>
        <Link to="/contact" className="mh-cta mh-cta-secondary">
          CONTACT US
          <span className="mh-cta-icon">→</span>
        </Link>
      </div>
    </div>
  );
}
