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
      { label: 'Turnkey Projects', href: '/services' },
      { label: 'Intrusion Detection', href: '/services' },
      { label: 'Access Control', href: '/services' },
      { label: 'Switches & Storage', href: '/services' },
      { label: 'Logistics', href: '/services' },
      { label: 'Electrical & Electronics', href: '/services' },
      { label: 'Fire Fighting', href: '/services' },
      { label: 'Video Surveillance', href: '/services' },
      { label: 'Wireless Technology', href: '/services' },
      { label: 'Hardware & Tools', href: '/services' },
      { label: 'Network Infrastructure', href: '/services' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Clients', href: '/clients' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavigation = {
  services: [
    { label: 'Turnkey Projects', href: '/services' },
    { label: 'Intrusion Detection', href: '/services' },
    { label: 'Access Control', href: '/services' },
    { label: 'Switches & Storage', href: '/services' },
    { label: 'Logistics', href: '/services' },
    { label: 'Electrical & Electronics', href: '/services' },
    { label: 'Fire Fighting', href: '/services' },
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
