export const INDIA_COORD: [number, number] = [83.2185, 17.6868]; // Visakhapatnam

export const services = [
  { id: 'CCTV', slug: 'video-surveillance', category: 'CCTV', label: 'CCTV & Video Surveillance', desc: 'Intelligent surveillance infrastructure for continuous monitoring, perimeter visibility and operational security.', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { id: 'ACCESS', slug: 'access-control', category: 'ACCESS CONTROL', label: 'Access Control', desc: 'Secure physical access management using modern authentication, biometric and credential-based systems.', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { id: 'SAFETY', slug: 'fire-fighting', category: 'FIRE', label: 'Fire & Life Safety', desc: 'Integrated fire detection, alarm and life-safety infrastructure designed to protect people, assets and facilities.', icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z' },
  { id: 'NETWORK', slug: 'network-infrastructure', category: 'NETWORK', label: 'Network Infrastructure', desc: 'Reliable structured networking solutions connecting people, systems, devices and critical operations.', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'SERVERS', slug: 'switches-storage', category: 'SERVERS', label: 'Switches & Storage', desc: 'Scalable server, storage and data infrastructure designed for secure and dependable digital operations.', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01' },
  { id: 'WIRELESS', slug: 'wireless-network', category: 'WIRELESS', label: 'Wireless Technology', desc: 'Enterprise wireless infrastructure delivering reliable connectivity across offices, campuses and operational environments.', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0' },
  { id: 'LOGISTICS', slug: 'logistics', category: 'LOGISTICS', label: 'Logistics & Supply Chain', desc: 'Technology-driven tracking and logistics solutions for improved fleet visibility, movement and operational coordination.', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'DATACENTER', slug: 'data-center-buildouts', category: 'DATACENTER', label: 'Data Center Buildouts', desc: 'Precision cooling, modular server enclosures, and intelligent environmental monitoring systems.', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
  { id: 'SECURITY', slug: 'perimeter-security', category: 'SAFETY', label: 'Perimeter Security', desc: 'Integrated security infrastructure combining multiple protection technologies into one coordinated environment.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { id: 'TURNKEY', slug: 'turnkey-projects', category: 'TURNKEY', label: 'Turnkey Projects', desc: 'End-to-end project execution from planning and system design through installation, integration and commissioning.', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'ELECTRICAL', slug: 'electrical-electronics', category: 'ELECTRICAL', label: 'Electrical & Electronics', desc: 'Integrated electrical and electronic infrastructure supporting reliable, efficient and connected facilities.', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { id: 'INTRUSION', slug: 'intrusion-detection', category: 'INTRUSION', label: 'Intrusion Detection', desc: 'Intelligent perimeter detection systems designed to identify unauthorized movement and security breaches.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' }
];

// Radial organic distribution around India [78.9, 20.5]
export const mapNodes = [
  { id: 'SERVERS', coordinates: [55, 45] as [number, number] },
  { id: 'SECURITY', coordinates: [110, 50] as [number, number] },
  { id: 'CCTV', coordinates: [-10, 35] as [number, number] },
  { id: 'ACCESS', coordinates: [110, 25] as [number, number] },
  { id: 'TURNKEY', coordinates: [20, 15] as [number, number] },
  { id: 'NETWORK', coordinates: [130, 0] as [number, number] },
  { id: 'INTRUSION', coordinates: [-20, -10] as [number, number] },
  { id: 'WIRELESS', coordinates: [120, -25] as [number, number] },
  { id: 'ELECTRICAL', coordinates: [10, -35] as [number, number] },
  { id: 'LOGISTICS', coordinates: [70, -15] as [number, number] },
  { id: 'DATACENTER', coordinates: [90, -25] as [number, number] },
  { id: 'SAFETY', coordinates: [-10, -50] as [number, number] }
];
