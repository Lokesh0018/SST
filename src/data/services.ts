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
    slug: 'turnkey-projects',
    title: 'Turnkey Projects',
    shortTitle: 'Turnkey Projects',
    category: 'Infrastructure',
    tagline: 'End-to-End Infrastructure Execution.',
    description: 'Complete end-to-end execution of large-scale infrastructure projects, managed seamlessly from design to deployment.',
    heroDescription: 'Our turnkey services handle every aspect of your infrastructure deployment, integrating security, network, and electrical systems into one comprehensive, ready-to-use solution.',
    icon: 'briefcase',
    features: [
      { title: 'Project Management', description: 'Dedicated coordination of all phases from planning to handover.' },
      { title: 'Integrated Design', description: 'Holistic system design ensuring all components work seamlessly together.' },
      { title: 'Quality Assurance', description: 'Rigorous testing and compliance checks at every milestone.' },
    ],
    benefits: [
      'Single point of contact for entire projects',
      'Accelerated deployment timelines',
      'Reduced risk and overhead',
    ],
    applications: [
      'New corporate campus builds',
      'Large-scale facility renovations',
      'Government infrastructure projects',
    ],
    gallery: [],
  },
  {
    slug: 'intrusion-detection',
    title: 'Intrusion Detection',
    shortTitle: 'Intrusion Detection',
    category: 'Security',
    tagline: 'Advanced Perimeter and Internal Protection.',
    description: 'State-of-the-art surveillance and detection systems to identify and respond to unauthorized access instantly.',
    heroDescription: 'From intelligent perimeter monitoring to advanced AI-driven motion analytics, our intrusion detection systems provide comprehensive, round-the-clock protection for your critical assets.',
    icon: 'shield',
    features: [
      { title: 'Perimeter Defense', description: 'Advanced sensors and cameras designed to secure facility boundaries.' },
      { title: 'AI Video Analytics', description: 'Intelligent monitoring for real-time threat identification.' },
      { title: 'Automated Alerts', description: 'Instant notifications to security teams upon unauthorized movement.' },
    ],
    benefits: [
      'Proactive threat mitigation',
      'Reduced false alarms with AI filtering',
      '24/7 continuous monitoring',
    ],
    applications: [
      'High-security data centers',
      'Corporate headquarters',
      'Industrial manufacturing plants',
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
      { title: 'Cloud Management', description: 'Centralized platform for managing access rights across multiple locations.' },
    ],
    benefits: [
      'Enhanced physical security across all entry points',
      'Detailed audit trails and compliance reporting',
      'Reduced unauthorized access incidents',
    ],
    applications: [
      'Corporate headquarters',
      'Data centers',
      'Healthcare facilities',
    ],
    gallery: [],
  },
  {
    slug: 'switches-storage',
    title: 'Switches & Storage',
    shortTitle: 'Switches & Storage',
    category: 'Technology',
    tagline: 'Robust IT Backbone and Data Management.',
    description: 'Enterprise-grade networking and secure data storage solutions designed for performance and reliability.',
    heroDescription: 'We provide high-performance network switching and scalable storage infrastructure, ensuring your organization’s data flows securely and is protected against loss.',
    icon: 'server',
    features: [
      { title: 'Core Switching', description: 'High-bandwidth, low-latency network switches for critical operations.' },
      { title: 'Scalable Storage', description: 'SAN and NAS solutions tailored for growing data requirements.' },
      { title: 'Data Redundancy', description: 'Automated backup and disaster recovery architectures.' },
    ],
    benefits: [
      'High-speed, reliable data transmission',
      'Secure, scalable data archiving',
      'Minimized downtime during network surges',
    ],
    applications: [
      'Enterprise data centers',
      'Financial trading floors',
      'Healthcare record management',
    ],
    gallery: [],
  },
  {
    slug: 'logistics',
    title: 'Logistics',
    shortTitle: 'Logistics',
    category: 'Operations',
    tagline: 'Streamlining Operations. Delivering Efficiency.',
    description: 'End-to-end logistics and supply chain management for infrastructure deployments of any scale.',
    heroDescription: 'Our logistics services ensure seamless procurement, asset tracking, and precise on-site delivery, keeping your infrastructure projects on time and within budget.',
    icon: 'truck',
    features: [
      { title: 'Procurement Strategy', description: 'Efficient sourcing and vendor management for necessary equipment.' },
      { title: 'Asset Tracking', description: 'Real-time visibility into inventory and delivery schedules.' },
      { title: 'Site Coordination', description: 'Synchronized delivery and staging to match deployment timelines.' },
    ],
    benefits: [
      'Optimized supply chain costs',
      'Predictable project timelines',
      'Reduced on-site delays',
    ],
    applications: [
      'Multi-site corporate rollouts',
      'Large-scale facility buildouts',
      'Technology deployment programs',
    ],
    gallery: [],
  },
  {
    slug: 'electrical-electronics',
    title: 'Electrical & Electronics',
    shortTitle: 'Electrical & Electronics',
    category: 'Infrastructure',
    tagline: 'Powering Infrastructure with Precision.',
    description: 'Comprehensive electrical and electronic systems engineered for safety, efficiency, and long-term reliability.',
    heroDescription: 'Our engineering services encompass reliable power distribution, UPS systems, and specialized electronic installations designed for continuous, resilient operations.',
    icon: 'zap',
    features: [
      { title: 'Power Distribution', description: 'Complete electrical distribution, including panels and switchgear.' },
      { title: 'Backup Power (UPS)', description: 'Uninterruptible power supply systems for critical environments.' },
      { title: 'Energy Management', description: 'Smart monitoring and load balancing to optimize energy consumption.' },
    ],
    benefits: [
      'Ensured power reliability for operations',
      'Reduced energy costs',
      'Compliance with strict safety standards',
    ],
    applications: [
      'Commercial office buildings',
      'Industrial manufacturing plants',
      'Mission-critical data centers',
    ],
    gallery: [],
  },
  {
    slug: 'fire-fighting',
    title: 'Fire Fighting',
    shortTitle: 'Fire Fighting',
    category: 'Safety',
    tagline: 'Protecting Lives. Safeguarding Assets.',
    description: 'Integrated fire detection and robust suppression systems designed for immediate response and ultimate safety.',
    heroDescription: 'From early-warning smoke detection to automated chemical and water suppression, we deliver life safety services that meet the highest international protection standards.',
    icon: 'flame',
    features: [
      { title: 'Advanced Detection', description: 'Addressable alarm systems with heat, smoke, and gas sensors.' },
      { title: 'Automated Suppression', description: 'Sprinkler and clean-agent gas systems tailored to facility needs.' },
      { title: 'Evacuation Systems', description: 'Emergency lighting, voice alarms, and clear guidance systems.' },
    ],
    benefits: [
      'Rapid response to fire incidents',
      'Minimized property damage and downtime',
      'Full compliance with safety regulations',
    ],
    applications: [
      'High-rise commercial properties',
      'Industrial and chemical facilities',
      'Hotels and large public venues',
    ],
    gallery: [],
  }
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug);
};
