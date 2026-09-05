export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  tagline: string;
  description: string;
  heroDescription: string;
  icon: string;
  features: { title: string; description: string }[];
  benefits: string[];
  applications: string[];
  gallery: string[];
}

export const services: Service[] = [
  {
    slug: 'video-surveillance',
    title: 'Video Surveillance',
    shortTitle: 'Security & Surveillance',
    category: 'Security',
    tagline: 'Intelligent Monitoring for a Safer Tomorrow.',
    description: 'High-performance surveillance systems designed for real-time visibility, threat detection and complete peace of mind.',
    heroDescription: 'From IP camera networks to AI-driven analytics, our surveillance services deliver round-the-clock monitoring, intelligent alerts, and scalable architecture for facilities of any size.',
    icon: 'camera',
    features: [
      { title: '24/7 Monitoring', description: 'Round-the-clock surveillance with real-time alerts and remote access capabilities across all connected devices.' },
      { title: 'AI-Powered Analytics', description: 'Intelligent video analytics for facial recognition, motion detection, people counting, and behavioral analysis.' },
      { title: 'Remote Access', description: 'Monitor your facilities from anywhere with secure mobile and web-based access to live and recorded footage.' },
      { title: 'Scalable Services', description: 'Modular architecture that grows with your needs — from single-site to enterprise multi-location deployments.' },
    ],
    benefits: [
      'Reduced security incidents through proactive monitoring',
      'Lower operational costs with automated surveillance',
      'Improved incident response time with real-time alerts',
      'Comprehensive evidence management and storage',
      'Integration with access control and alarm systems',
    ],
    applications: [
      'Banking & financial institutions',
      'Corporate offices & campuses',
      'Industrial facilities & warehouses',
      'Hospitality & retail environments',
      'Government & public infrastructure',
    ],
    gallery: [],
  },
  {
    slug: 'access-control',
    title: 'Access Control',
    shortTitle: 'Access Control',
    category: 'Security',
    tagline: 'Controlling Access. Protecting Assets.',
    description: 'Advanced access control systems that safeguard your facilities with intelligent authentication and monitoring.',
    heroDescription: 'Our access control services combine biometric authentication, smart card systems, and cloud-based management to provide enterprise-grade security for your physical and digital spaces.',
    icon: 'lock',
    features: [
      { title: 'Biometric Authentication', description: 'Fingerprint, facial recognition, and iris scanning for high-security environments.' },
      { title: 'Smart Card Systems', description: 'Proximity cards, smart cards, and mobile credentials for seamless access management.' },
      { title: 'Cloud Management', description: 'Centralized cloud-based platform for managing access rights across multiple locations.' },
      { title: 'Visitor Management', description: 'Automated visitor registration, badge printing, and tracking systems.' },
    ],
    benefits: [
      'Enhanced physical security across all entry points',
      'Detailed audit trails and compliance reporting',
      'Reduced unauthorized access incidents',
      'Streamlined visitor and employee management',
      'Integration with surveillance and alarm systems',
    ],
    applications: [
      'Corporate headquarters',
      'Data centers',
      'Healthcare facilities',
      'Educational institutions',
      'Government buildings',
    ],
    gallery: [],
  },
  {
    slug: 'network-infrastructure',
    title: 'Network Infrastructure',
    shortTitle: 'IT Infrastructure',
    category: 'Technology',
    tagline: 'Building the Backbone of Modern Business.',
    description: 'Enterprise-grade network infrastructure designed for performance, reliability, and security.',
    heroDescription: 'From structured cabling to wireless services and data center design, we build the networking foundation that keeps your organization connected and productive.',
    icon: 'network',
    features: [
      { title: 'Structured Cabling', description: 'Cat6/Cat6A/Fiber optic cabling with proper cable management and documentation.' },
      { title: 'Wireless Services', description: 'Enterprise Wi-Fi design, deployment, and optimization for complete coverage.' },
      { title: 'Network Security', description: 'Firewalls, VPN, intrusion detection, and network segmentation for protected communications.' },
      { title: 'Data Center Design', description: 'Server room design, rack configuration, cooling services, and power management.' },
    ],
    benefits: [
      'Reliable high-speed connectivity across facilities',
      'Reduced network downtime and improved performance',
      'Scalable infrastructure for future growth',
      'Comprehensive network security posture',
      'Proper documentation and maintenance protocols',
    ],
    applications: [
      'Enterprise offices',
      'Multi-site corporations',
      'Industrial operations',
      'Hospitality chains',
      'Financial institutions',
    ],
    gallery: [],
  },
  {
    slug: 'electrical',
    title: 'Electrical & Electronic',
    shortTitle: 'Electrical & Electronic',
    category: 'Infrastructure',
    tagline: 'Powering Infrastructure with Precision.',
    description: 'Comprehensive electrical and electronic systems engineered for safety, efficiency, and long-term reliability.',
    heroDescription: 'Our electrical engineering services encompass power distribution, UPS systems, energy management, and specialized electronic installations for critical infrastructure.',
    icon: 'zap',
    features: [
      { title: 'Power Distribution', description: 'Complete electrical distribution systems including panels, transformers, and switchgear.' },
      { title: 'UPS & Backup Power', description: 'Uninterruptible power supply systems and generator integration for critical facilities.' },
      { title: 'Energy Management', description: 'Smart energy monitoring, load balancing, and efficiency optimization services.' },
      { title: 'Lighting Systems', description: 'LED lighting design, automation, and energy-efficient illumination services.' },
    ],
    benefits: [
      'Ensured power reliability for critical operations',
      'Reduced energy costs through smart management',
      'Compliance with electrical safety standards',
      'Minimized downtime from power-related incidents',
      'Future-ready infrastructure for technology adoption',
    ],
    applications: [
      'Commercial buildings',
      'Industrial plants',
      'Data centers',
      'Healthcare facilities',
      'Retail establishments',
    ],
    gallery: [],
  },
  {
    slug: 'fire-safety',
    title: 'Fire & Safety',
    shortTitle: 'Fire & Safety',
    category: 'Safety',
    tagline: 'Protecting Lives. Safeguarding Assets.',
    description: 'Integrated fire detection, suppression, and safety systems designed to protect people and property.',
    heroDescription: 'From advanced fire detection to automated suppression and emergency evacuation systems, we deliver comprehensive fire safety services that meet the highest standards of protection.',
    icon: 'flame',
    features: [
      { title: 'Fire Detection', description: 'Addressable and conventional fire alarm systems with smoke, heat, and gas detection.' },
      { title: 'Suppression Systems', description: 'Sprinkler systems, gas suppression, and foam-based fire suppression for various environments.' },
      { title: 'Emergency Systems', description: 'PA systems, emergency lighting, evacuation guidance, and alarm notification systems.' },
      { title: 'Safety Compliance', description: 'Fire safety audits, compliance consulting, and regulatory documentation services.' },
    ],
    benefits: [
      'Early fire detection reducing property damage',
      'Compliance with local and international fire codes',
      'Integrated emergency response protocols',
      'Regular maintenance and testing schedules',
      'Life safety assurance for occupants',
    ],
    applications: [
      'High-rise buildings',
      'Industrial facilities',
      'Hotels and hospitality',
      'Hospitals and healthcare',
      'Educational institutions',
    ],
    gallery: [],
  },
  {
    slug: 'logistics',
    title: 'Logistics & Operations',
    shortTitle: 'Logistics & Operations',
    category: 'Operations',
    tagline: 'Streamlining Operations. Delivering Efficiency.',
    description: 'End-to-end logistics and operational support for infrastructure clients of any scale.',
    heroDescription: 'Our logistics and operations services ensure seamless procurement, supply chain management, and client coordination to deliver infrastructure services on time and within budget.',
    icon: 'truck',
    features: [
      { title: 'Procurement', description: 'Strategic sourcing, vendor management, and procurement services for infrastructure equipment.' },
      { title: 'Supply Chain', description: 'End-to-end supply chain coordination for multi-vendor, multi-site client deployments.' },
      { title: 'Client Coordination', description: 'On-site client management, scheduling, and resource allocation services.' },
      { title: 'Inventory Management', description: 'Asset tracking, warehouse management, and spare parts inventory systems.' },
    ],
    benefits: [
      'Reduced client delivery timelines',
      'Optimized procurement costs',
      'Streamlined multi-vendor coordination',
      'Transparent client tracking and reporting',
      'Reliable supply chain for critical components',
    ],
    applications: [
      'Large-scale infrastructure clients',
      'Multi-site corporate rollouts',
      'Industrial facility buildouts',
      'Government infrastructure programs',
      'Technology deployment programs',
    ],
    gallery: [],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug);
};
