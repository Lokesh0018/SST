export interface Client {
  name: string;
  industry: string;
}

// Demo/placeholder client entries — these represent the types of organizations SST works with,
// not actual client relationships. Replace with authorized client information when available.
export const clients: Client[] = [
  { name: 'Premier Banking Corp', industry: 'Banking' },
  { name: 'Horizon Financial', industry: 'Finance' },
  { name: 'GreenField Industries', industry: 'Industrial' },
  { name: 'Atlas Hospitality Group', industry: 'Hospitality' },
  { name: 'TechBridge Solutions', industry: 'Technology' },
  { name: 'Meridian Properties', industry: 'Real Estate' },
  { name: 'SafeGuard Insurance', industry: 'Finance' },
  { name: 'Pacific Manufacturing', industry: 'Industrial' },
  { name: 'Crown Hotels', industry: 'Hospitality' },
  { name: 'DataVault Systems', industry: 'Technology' },
  { name: 'CityScape Developers', industry: 'Real Estate' },
  { name: 'NovaTech Engineering', industry: 'Industrial' },
];
