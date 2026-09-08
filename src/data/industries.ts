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
    slug: 'hotels',
    title: 'Hotels',
    description: 'Safety and comfort for every guest.',
    longDescription: 'Integrated infrastructure services that enhance guest experience while ensuring safety and operational efficiency across hotels and resorts.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    services: ['Surveillance', 'Access Control', 'Fire Safety', 'Network Infrastructure'],
  },
  {
    slug: 'industries',
    title: 'Industries',
    description: 'Built for performance and protection.',
    longDescription: 'Robust infrastructure and safety systems engineered for demanding industrial environments, from manufacturing facilities to processing plants.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    services: ['Electrical', 'Fire Safety', 'Surveillance', 'Network Infrastructure'],
  },
  {
    slug: 'financial-institutions',
    title: 'Financial Institutions',
    description: 'Trusted infrastructure for financial strength.',
    longDescription: 'Specialized security and technology services for financial institutions including insurance companies, investment firms, and fintech organizations.',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1000&q=80',
    services: ['Surveillance', 'Access Control', 'Network Infrastructure', 'Electrical'],
  },
  {
    slug: 'ecommerce-software',
    title: 'E-commerce & Software Companies',
    description: 'Building secure digital environments.',
    longDescription: 'End-to-end technology and security infrastructure for e-commerce and software companies that prioritize high-availability and safety.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    services: ['IT Infrastructure', 'Security', 'Electrical', 'Fire Safety'],
  },
  {
    slug: 'banks',
    title: 'Banks',
    description: 'Secure infrastructure for banking growth.',
    longDescription: 'Comprehensive security and technology services designed to meet the stringent requirements of the banking sector, from branch security to data center infrastructure.',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1000&q=80',
    services: ['Video Surveillance', 'Access Control', 'Network Infrastructure', 'Fire Safety'],
  },
  {
    slug: 'retail',
    title: 'Retail',
    description: 'Protecting retail environments seamlessly.',
    longDescription: 'Advanced security and loss prevention systems designed for retail stores, shopping malls, and commercial environments.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    services: ['Surveillance', 'Loss Prevention', 'Fire Safety', 'Electrical'],
  },
];

export const getIndustryBySlug = (slug: string): Industry | undefined => {
  return industries.find((i) => i.slug === slug);
};

