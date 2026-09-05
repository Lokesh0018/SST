export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Video Surveillance', href: '/solutions/video-surveillance' },
      { label: 'Access Control', href: '/solutions/access-control' },
      { label: 'Network Infrastructure', href: '/solutions/network-infrastructure' },
      { label: 'Electrical & Electronic', href: '/solutions/electrical' },
      { label: 'Fire & Safety', href: '/solutions/fire-safety' },
      { label: 'Logistics & Operations', href: '/solutions/logistics' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavigation = {
  solutions: [
    { label: 'Video Surveillance', href: '/solutions/video-surveillance' },
    { label: 'Access Control', href: '/solutions/access-control' },
    { label: 'Network Infrastructure', href: '/solutions/network-infrastructure' },
    { label: 'Electrical', href: '/solutions/electrical' },
    { label: 'Fire & Safety', href: '/solutions/fire-safety' },
    { label: 'Logistics', href: '/solutions/logistics' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Clients', href: '/clients' },
    { label: 'Industries', href: '/industries' },
    { label: 'Turnkey Projects', href: '/turnkey-projects' },
  ],
  connect: [
    { label: 'Contact', href: '/contact' },
    { label: 'Get a Quote', href: '/contact#quote' },
  ],
};
