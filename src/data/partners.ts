export interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'Alliance' | 'Solutions';
}

export const partners: Partner[] = [
  // Technology Alliance Partners
  { id: '1', name: 'Toshiba', logo: '/images/logo/Toshiba.svg', type: 'Alliance' },
  { id: '2', name: 'Seagate', logo: '/images/logo/seagate.svg', type: 'Alliance' },
  { id: '3', name: 'HINDIASM', logo: '', type: 'Alliance' },
  { id: '4', name: 'GST', logo: '', type: 'Alliance' },
  { id: '5', name: 'Dahua Technology', logo: '/images/logo/Dahua_Technology.svg', type: 'Alliance' },
  { id: '6', name: 'Ruckus', logo: '/images/logo/Ruckus.png', type: 'Alliance' },
  { id: '7', name: 'CommScope', logo: '/images/logo/CommScope.svg', type: 'Alliance' },
  { id: '8', name: 'EST', logo: '', type: 'Alliance' },
  { id: '9', name: 'MORLEY', logo: '', type: 'Alliance' },
  { id: '10', name: 'Uniview', logo: '/images/logo/uniview.svg', type: 'Alliance' },
  { id: '11', name: 'NOTIFIER by Honeywell', logo: '', type: 'Alliance' },

  // Technology Solutions Partners
  { id: '12', name: 'DELL', logo: '', type: 'Solutions' },
  { id: '13', name: 'CISCO', logo: '', type: 'Solutions' },
  { id: '14', name: 'AXIS', logo: '', type: 'Solutions' },
  { id: '15', name: 'Dahua Technology', logo: '/images/logo/Dahua_Technology.svg', type: 'Solutions' },
  { id: '16', name: 'HIKVISION', logo: '', type: 'Solutions' },
  { id: '17', name: 'Honeywell', logo: '', type: 'Solutions' },
  { id: '18', name: 'SAMSUNG', logo: '', type: 'Solutions' },
  { id: '19', name: 'KENT CamAttendance', logo: '', type: 'Solutions' },
  { id: '20', name: 'AHUJA', logo: '', type: 'Solutions' },
  { id: '21', name: 'CP PLUS', logo: '', type: 'Solutions' },
  { id: '22', name: 'milestone', logo: '', type: 'Solutions' },
  { id: '23', name: 'SONY', logo: '', type: 'Solutions' },
  { id: '24', name: 'hp', logo: '', type: 'Solutions' },
];
