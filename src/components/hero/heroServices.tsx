import type { ReactElement } from 'react';
import {
  AccessControlIcon,
  CctvIcon,
  FireSafetyIcon,
  IntrusionIcon,
  NetworkIcon,
  ServersIcon,
  TurnkeyIcon,
  WirelessIcon,
} from './assets/serviceIcons';

/**
 * The eight services promoted to visible orbital nodes.
 * Icons come from the supplied SST asset pack (SST-HERO-ASSETS/services).
 * `orbit` selects which of the three orbital paths the node travels on,
 * `t` is its starting position along that path (0-1),
 * `float` is the period of its independent bobbing motion, in seconds.
 */
export interface HeroService {
  id: string;
  label: string;
  short: string;
  index: string;
  orbit: 0 | 1 | 2;
  t: number;
  float: number;
  icon: ReactElement;
}

export const HERO_SERVICES: HeroService[] = [
  {
    id: 'TURNKEY',
    label: 'Turnkey Projects',
    short: 'Turnkey',
    index: '01',
    orbit: 0,
    t: 0.0,
    float: 6.4,
    icon: TurnkeyIcon,
  },
  {
    id: 'CCTV',
    label: 'CCTV / Video Surveillance',
    short: 'Surveillance',
    index: '02',
    orbit: 0,
    t: 0.34,
    float: 7.1,
    icon: CctvIcon,
  },
  {
    id: 'ACCESS',
    label: 'Access Control',
    short: 'Access',
    index: '03',
    orbit: 1,
    t: 0.12,
    float: 5.3,
    icon: AccessControlIcon,
  },
  {
    id: 'INTRUSION',
    label: 'Intrusion Detection',
    short: 'Intrusion',
    index: '04',
    orbit: 1,
    t: 0.48,
    float: 8.2,
    icon: IntrusionIcon,
  },
  {
    id: 'SAFETY',
    label: 'Fire & Life Safety',
    short: 'Fire Safety',
    index: '05',
    orbit: 0,
    t: 0.66,
    float: 6.9,
    icon: FireSafetyIcon,
  },
  {
    id: 'NETWORK',
    label: 'Network Infrastructure',
    short: 'Network',
    index: '06',
    orbit: 2,
    t: 0.2,
    float: 7.6,
    icon: NetworkIcon,
  },
  {
    id: 'INFRASTRUCTURE',
    label: 'Servers & Storage',
    short: 'Servers',
    index: '07',
    orbit: 1,
    t: 0.78,
    float: 5.8,
    icon: ServersIcon,
  },
  {
    id: 'WIRELESS',
    label: 'Wireless Technology',
    short: 'Wireless',
    index: '08',
    orbit: 2,
    t: 0.62,
    float: 8.7,
    icon: WirelessIcon,
  },
];

/** Secondary services — surfaced in the rotating status readout rather than as nodes. */
export const SECONDARY_SERVICES = [
  'Electrical & Electronics',
  'Hardware & Tools',
  'Logistics & Supply Chain',
];
