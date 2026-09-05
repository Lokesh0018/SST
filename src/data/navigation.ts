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
    { label: 'Video Surveillance', href: '/services/video-surveillance' },
    { label: 'Access Control', href: '/services/access-control' },
    { label: 'Network Infrastructure', href: '/services/network-infrastructure' },
    { label: 'Electrical', href: '/services/electrical' },
    { label: 'Fire & Safety', href: '/services/fire-safety' },
    { label: 'Logistics', href: '/services/logistics' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Clients', href: '/clients' },
    { label: 'Clients', href: '/clients' },
    { label: 'Industries', href: '/industries' },
    { label: 'Turnkey Clients', href: '/turnkey-clients' },
  ],
  connect: [
    { label: 'Contact', href: '/contact' },
    { label: 'Get a Quote', href: '/contact#quote' },
  ],
};
