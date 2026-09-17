import React from 'react';
import '../../styles/ServicesCategoryGrid.css';

export interface CategoryDomain {
  id: string;
  name: string;
  filterCategory: string; // for mapping to 24 services filter
  description: string;
  count: string;
  icon: 'shield' | 'building' | 'network' | 'cpu' | 'truck' | 'safety';
}

const CATEGORY_DOMAINS: CategoryDomain[] = [
  {
    id: 'security',
    name: 'Security',
    filterCategory: 'Security & Surveillance',
    description: 'Mission-critical CCTV, biometric access control, perimeter defense & AI surveillance.',
    count: '5 Services',
    icon: 'shield'
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    filterCategory: 'Infrastructure & Turnkey',
    description: 'Turnkey civil works, electrical switchgear, high-efficiency data centers & HVAC.',
    count: '4 Services',
    icon: 'building'
  },
  {
    id: 'networks',
    name: 'Networks & IT',
    filterCategory: 'Networks & Connectivity',
    description: 'Structured optical fiber, enterprise Wi-Fi 6, 5G wireless & SD-WAN routing.',
    count: '4 Services',
    icon: 'network'
  },
  {
    id: 'technology',
    name: 'Technology',
    filterCategory: 'Software & Digital Solutions',
    description: 'Custom cloud applications, IoT telemetry platforms, AI automation & enterprise ERP.',
    count: '4 Services',
    icon: 'cpu'
  },
  {
    id: 'logistics',
    name: 'Logistics',
    filterCategory: 'Logistics & Supply Chain',
    description: 'Automated warehouse systems, fleet GPS telematics, cold chain & smart dispatch.',
    count: '4 Services',
    icon: 'truck'
  },
  {
    id: 'safety',
    name: 'Safety',
    filterCategory: 'Security & Surveillance',
    description: 'Automated fire suppression, gas detection, occupational hazard control & emergency response.',
    count: '3 Services',
    icon: 'safety'
  }
];

interface ServicesCategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export default function ServicesCategoryGrid({
  selectedCategory,
  onSelectCategory
}: ServicesCategoryGridProps) {
  return (
    <section className="category-domains-section">
      <div className="category-domains-container">
        
        {/* Section Header */}
        <div className="category-domains-header">
          <div className="category-domains-badge">
            <span className="badge-dash" />
            <span className="badge-label">CAPABILITIES</span>
          </div>
          <h2 className="category-domains-title">Explore by Domain</h2>
          <p className="category-domains-subtitle">
            Six foundational pillars engineered to integrate seamlessly into complex industrial and commercial environments.
          </p>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="category-cards-grid-enterprise">
          {CATEGORY_DOMAINS.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.filterCategory.toLowerCase();

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.filterCategory)}
                className={`category-domain-card ${isActive ? 'card-active' : ''}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectCategory(cat.filterCategory);
                  }
                }}
              >
                {/* Card Top: Icon & Count */}
                <div className="domain-card-header">
                  <div className="domain-icon-wrapper">
                    {renderDomainIcon(cat.icon)}
                  </div>
                  <span className="domain-count-badge">{cat.count}</span>
                </div>

                {/* Card Body */}
                <div className="domain-card-body">
                  <h3 className="domain-card-title">{cat.name}</h3>
                  <p className="domain-card-desc">{cat.description}</p>
                </div>

                {/* Card Footer: Action Arrow */}
                <div className="domain-card-footer">
                  <span className="domain-view-text">Explore Capabilities</span>
                  <div className="domain-arrow-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function renderDomainIcon(icon: CategoryDomain['icon']) {
  switch (icon) {
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="domain-svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'building':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="domain-svg">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" strokeLinecap="round"/>
          <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" strokeLinecap="round"/>
          <line x1="10" y1="6" x2="14" y2="6" strokeLinecap="round"/>
          <line x1="10" y1="10" x2="14" y2="10" strokeLinecap="round"/>
        </svg>
      );
    case 'network':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="domain-svg">
          <rect x="2" y="2" width="6" height="6" rx="1.5" strokeLinecap="round"/>
          <rect x="16" y="16" width="6" height="6" rx="1.5" strokeLinecap="round"/>
          <rect x="2" y="16" width="6" height="6" rx="1.5" strokeLinecap="round"/>
          <path d="M5 8v5a3 3 0 0 0 3 3h8" strokeLinecap="round"/>
          <path d="M19 16V8a3 3 0 0 0-3-3" strokeLinecap="round"/>
        </svg>
      );
    case 'cpu':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="domain-svg">
          <rect x="4" y="4" width="16" height="16" rx="2" strokeLinecap="round"/>
          <rect x="9" y="9" width="6" height="6" strokeLinecap="round"/>
          <line x1="9" y1="1" x2="9" y2="4" strokeLinecap="round"/>
          <line x1="15" y1="1" x2="15" y2="4" strokeLinecap="round"/>
          <line x1="9" y1="20" x2="9" y2="23" strokeLinecap="round"/>
          <line x1="15" y1="20" x2="15" y2="23" strokeLinecap="round"/>
          <line x1="20" y1="9" x2="23" y2="9" strokeLinecap="round"/>
          <line x1="20" y1="15" x2="23" y2="15" strokeLinecap="round"/>
          <line x1="1" y1="9" x2="4" y2="9" strokeLinecap="round"/>
          <line x1="1" y1="15" x2="4" y2="15" strokeLinecap="round"/>
        </svg>
      );
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="domain-svg">
          <rect x="1" y="3" width="15" height="13" rx="1" strokeLinecap="round"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      );
    case 'safety':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="domain-svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="8" x2="12" y2="13" strokeLinecap="round"/>
          <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeWidth="2.5"/>
        </svg>
      );
  }
}
