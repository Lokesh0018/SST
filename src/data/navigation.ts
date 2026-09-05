export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Video Surveillance', href: '/services/video-surveillance' },
      { label: 'Access Control', href: '/services/access-control' },
      { label: 'Network Infrastructure', href: '/services/network-infrastructure' },
      { label: 'Electrical & Electronic', href: '/services/electrical' },
      { label: 'Fire & Safety', href: '/services/fire-safety' },
      { label: 'Logistics & Operations', href: '/services/logistics' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Clients', href: '/clients' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavigation = {
  services: [
    { label: 'Turnkey Projects', href: '/turnkey-projects' },
    { label: 'Intrusion Detection', href: '/services/intrusion-detection' },
    { label: 'Access Control', href: '/services/access-control' },
    { label: 'Switches & Storage', href: '/services/switches-storage' },
    { label: 'Logistics', href: '/services/logistics' },
    { label: 'Electrical & Electronics', href: '/services/electrical' },
    { label: 'Fire Fighting', href: '/services/fire-fighting' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Clients', href: '/clients' },
    { label: 'Industries', href: '/industries' },
    { label: 'Careers', href: '/careers' },
  ],
  connect: [
    { label: 'Contact', href: '/contact' },
    { label: 'Get a Quote', href: '/contact#quote' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
};
