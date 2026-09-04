export interface Project {
  slug: string;
  title: string;
  industry: string;
  location: string;
  image: string;
  services: string[];
  description: string;
  challenge: string;
  solution: string;
  scope: string[];
  results: string[];
  stats: { value: string; label: string }[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'central-bank-headquarters',
    title: 'Central Bank Headquarters',
    industry: 'Banking',
    location: 'Visakhapatnam, India',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1000&q=80',
    services: ['Video Surveillance', 'Access Control', 'Network Infrastructure'],
    description: 'Complete security and network infrastructure deployment for a major banking headquarters spanning multiple floors and secure zones.',
    challenge: 'The client required a comprehensive security overhaul with zero downtime during banking hours, covering high-security vaults, customer areas, and executive floors with integrated surveillance and access control.',
    solution: 'We deployed an integrated security ecosystem with 120+ IP cameras, biometric access control across 45 access points, and a redundant network backbone — all implemented during off-hours to ensure zero business disruption.',
    scope: ['Security System Design', 'IP Camera Installation', 'Access Control Deployment', 'Network Cabling', 'Server Room Setup', 'Training & Handover'],
    results: ['Zero security incidents post-deployment', 'Complete facility coverage with no blind spots', 'Reduced unauthorized access attempts', 'Full regulatory compliance achieved'],
    stats: [
      { value: '120+', label: 'Cameras' },
      { value: '24/7', label: 'Monitoring' },
      { value: '45', label: 'Access Points' },
      { value: '8', label: 'Months' },
    ],
    featured: true,
  },
  {
    slug: 'luxury-hotel-resort',
    title: 'Luxury Hotel & Resort',
    industry: 'Hospitality',
    location: 'Visakhapatnam, India',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    services: ['Surveillance', 'Access Control', 'Fire Safety', 'Electrical'],
    description: 'Integrated safety and infrastructure systems for a premium hospitality property with guest comfort and security as the primary objectives.',
    challenge: 'A luxury resort required discreet yet comprehensive security infrastructure that would not compromise the aesthetic experience for guests while ensuring fire safety compliance and efficient power management.',
    solution: 'Designed and deployed an aesthetically integrated security system with concealed cameras, smart room access, automated fire detection, and energy-efficient electrical systems throughout the property.',
    scope: ['Discreet Surveillance', 'Smart Room Access', 'Fire Detection System', 'Electrical Distribution', 'Emergency Systems'],
    results: ['Enhanced guest safety without visual intrusion', 'Fire safety compliance across all zones', 'Reduced energy consumption', 'Streamlined operations management'],
    stats: [
      { value: '80+', label: 'Cameras' },
      { value: '200+', label: 'Room Access' },
      { value: '6', label: 'Integrated Systems' },
      { value: '14', label: 'Months' },
    ],
    featured: true,
  },
  {
    slug: 'industrial-manufacturing-facility',
    title: 'Industrial Manufacturing Facility',
    industry: 'Industrial',
    location: 'Andhra Pradesh, India',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    services: ['Network Infrastructure', 'Electrical', 'Fire Safety', 'Surveillance'],
    description: 'End-to-end infrastructure setup for a large-scale manufacturing facility including network backbone, electrical distribution, and fire safety systems.',
    challenge: 'The manufacturing facility required ruggedized infrastructure that could withstand harsh industrial conditions while maintaining high reliability and ensuring worker safety across production zones.',
    solution: 'We engineered industrial-grade infrastructure with reinforced cabling, explosion-proof fixtures, comprehensive fire suppression, and environmental monitoring systems designed for continuous operation.',
    scope: ['Industrial Network Cabling', 'Power Distribution', 'Fire Suppression', 'Perimeter Security', 'Environmental Monitoring'],
    results: ['Zero unplanned downtime from infrastructure failures', 'Full compliance with industrial safety standards', 'Improved operational visibility', 'Reduced energy waste'],
    stats: [
      { value: '50K+', label: 'Sq. Ft. Covered' },
      { value: '99.9%', label: 'Uptime' },
      { value: '4', label: 'Safety Zones' },
      { value: '10', label: 'Months' },
    ],
    featured: true,
  },
  {
    slug: 'corporate-office-campus',
    title: 'Corporate Office Campus',
    industry: 'Corporate',
    location: 'Hyderabad, India',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    services: ['IT Infrastructure', 'Security', 'Electrical'],
    description: 'Modern IT and security infrastructure for a multi-building corporate campus supporting a dynamic workforce.',
    challenge: 'A growing technology company needed a future-ready campus infrastructure that could support rapid team expansion, hybrid work models, and stringent data security requirements.',
    solution: 'Deployed a unified campus network with high-density Wi-Fi, integrated physical security, smart building controls, and a scalable data center environment — all managed from a central operations dashboard.',
    scope: ['Campus Network Design', 'Wi-Fi Deployment', 'Security Systems', 'Smart Building Integration', 'Data Center Setup'],
    results: ['Seamless connectivity across campus', 'Centralized security management', 'Smart energy management', 'Future-ready scalable infrastructure'],
    stats: [
      { value: '3', label: 'Buildings' },
      { value: '500+', label: 'Endpoints' },
      { value: '12', label: 'Floors' },
      { value: '6', label: 'Months' },
    ],
    featured: false,
  },
  {
    slug: 'financial-data-center',
    title: 'Financial Data Center',
    industry: 'Infrastructure',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    services: ['Network Infrastructure', 'Electrical', 'Fire Safety', 'Access Control'],
    description: 'High-availability data center infrastructure for a financial services provider with stringent uptime and security requirements.',
    challenge: 'The financial institution required a Tier-III equivalent data center with redundant power, cooling, fire suppression, and physical security — all within a compressed timeline.',
    solution: 'Engineered and delivered a comprehensive data center solution with dual power feeds, precision cooling, gas-based fire suppression, multi-layer access control, and complete environmental monitoring.',
    scope: ['Data Center Design', 'Redundant Power Systems', 'Precision Cooling', 'Fire Suppression', 'Physical Security', 'Environmental Monitoring'],
    results: ['Achieved Tier-III availability targets', 'Zero data loss incidents', 'Full regulatory compliance', 'Optimized cooling efficiency'],
    stats: [
      { value: '99.99%', label: 'Uptime' },
      { value: '100+', label: 'Racks' },
      { value: '5', label: 'Redundancy Layers' },
      { value: '12', label: 'Months' },
    ],
    featured: false,
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured);
};

export const getProjectsByIndustry = (industry: string): Project[] => {
  if (industry === 'All') return projects;
  return projects.filter((p) => p.industry === industry);
};

export const projectCategories = ['All', 'Banking', 'Hospitality', 'Industrial', 'Corporate', 'Infrastructure'];
