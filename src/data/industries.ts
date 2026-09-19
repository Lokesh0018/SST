export interface Industry {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  services: string[];
}

export const industries: Industry[] = [
  {
    slug: 'hospitality',
    title: 'Hospitality',
    description: 'Premium integrated security and infrastructure for world-class hotels and resorts.',
    longDescription: 'Integrated infrastructure services that enhance guest experience while ensuring safety and operational efficiency across hotels, resorts, and hospitality venues.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    services: ['Surveillance', 'Access Control', 'Fire Safety', 'Network Infrastructure'],
  },
  {
    slug: 'manufacturing-industrial',
    title: 'Manufacturing & Industrial',
    description: 'Robust operational systems and surveillance for heavy industries and factories.',
    longDescription: 'Robust infrastructure and safety systems engineered for demanding industrial environments, from manufacturing facilities to processing plants.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    services: ['Electrical', 'Fire Safety', 'Surveillance', 'Network Infrastructure'],
  },
  {
    slug: 'financial-services',
    title: 'Financial Services & Banking',
    description: 'High-security environments, access control, and vault security.',
    longDescription: 'Specialized security and technology services for financial institutions including insurance companies, investment firms, and fintech organizations.',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1000&q=80',
    services: ['Surveillance', 'Access Control', 'Network Infrastructure', 'Electrical'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    description: 'Critical infrastructure, patient safety, and secure access systems.',
    longDescription: 'End-to-end technology and security infrastructure for healthcare facilities that prioritize high-availability, patient safety, and strict compliance.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    services: ['IT Infrastructure', 'Security', 'Electrical', 'Fire Safety'],
  },
  {
    slug: 'retail-commercial',
    title: 'Retail & Commercial',
    description: 'Loss prevention and smart facility management for large retail chains.',
    longDescription: 'Advanced security and loss prevention systems designed for retail stores, shopping malls, and commercial environments.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    services: ['Surveillance', 'Loss Prevention', 'Fire Safety', 'Electrical'],
  },
  {
    slug: 'corporate-technology',
    title: 'Corporate & Technology',
    description: 'Modern corporate office data infrastructure, networking, and access control.',
    longDescription: 'Comprehensive security and technology services designed to meet the stringent requirements of modern corporate and technology environments.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    services: ['Video Surveillance', 'Access Control', 'Network Infrastructure', 'Fire Safety'],
  },
];
