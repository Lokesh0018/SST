/**
 * Low-poly geographic data for the SST infrastructure globe.
 * Coordinates are [longitude, latitude] in degrees.
 * Deliberately simplified — this is a technical visualisation, not a cartographic map.
 */

export type LonLat = [number, number];

export const LANDMASSES: LonLat[][] = [
  // Africa
  [
    [-17, 15], [-16, 21], [-10, 27], [-5, 31], [10, 33], [20, 32], [32, 31],
    [35, 24], [38, 17], [43, 11], [51, 12], [48, 4], [41, -2], [40, -10],
    [36, -18], [32, -25], [27, -33], [20, -34], [18, -30], [14, -22],
    [12, -16], [9, -1], [1, 5], [-8, 4], [-13, 9], [-17, 15],
  ],
  // Europe
  [
    [-9, 43], [-9, 38], [-1, 36], [3, 42], [9, 44], [13, 45], [19, 40],
    [23, 38], [27, 40], [30, 45], [38, 47], [40, 55], [30, 60], [25, 65],
    [22, 70], [15, 68], [11, 59], [8, 58], [4, 52], [-2, 49], [-5, 44], [-9, 43],
  ],
  // Asia
  [
    [40, 55], [50, 70], [70, 73], [90, 75], [110, 74], [130, 71], [142, 70],
    [145, 60], [140, 50], [133, 43], [129, 40], [122, 38], [120, 32],
    [122, 30], [118, 24], [110, 20], [105, 10], [103, 1], [98, 8], [95, 16],
    [92, 21], [89, 22], [80, 15], [72, 20], [68, 24], [62, 25], [57, 25],
    [52, 30], [48, 30], [43, 40], [40, 45], [40, 55],
  ],
  // North America
  [
    [-168, 66], [-160, 70], [-140, 70], [-125, 70], [-110, 68], [-95, 68],
    [-85, 70], [-75, 68], [-65, 60], [-60, 50], [-66, 45], [-70, 42],
    [-75, 37], [-81, 31], [-80, 25], [-84, 30], [-90, 29], [-97, 26],
    [-105, 22], [-110, 24], [-115, 30], [-122, 37], [-124, 45], [-130, 54],
    [-140, 60], [-150, 60], [-160, 58], [-168, 66],
  ],
  // South America
  [
    [-81, 8], [-76, 10], [-70, 11], [-62, 10], [-52, 5], [-50, 0], [-44, -2],
    [-38, -6], [-35, -8], [-39, -14], [-45, -23], [-48, -25], [-54, -34],
    [-58, -38], [-62, -40], [-65, -45], [-69, -52], [-74, -52], [-73, -45],
    [-71, -35], [-71, -25], [-70, -18], [-75, -14], [-79, -6], [-81, 0], [-81, 8],
  ],
  // Australia
  [
    [113, -22], [114, -26], [118, -34], [125, -32], [132, -32], [138, -35],
    [145, -38], [150, -37], [153, -28], [145, -18], [142, -11], [135, -12],
    [130, -11], [126, -14], [121, -19], [113, -22],
  ],
  // Great Britain + Ireland (single simplified mass)
  [
    [-6, 50], [-2, 51], [0, 53], [-1, 57], [-5, 59], [-8, 56], [-10, 53],
    [-8, 51], [-6, 50],
  ],
  // Japan
  [
    [130, 32], [135, 34], [140, 36], [142, 40], [145, 44], [141, 42],
    [137, 37], [133, 34], [130, 32],
  ],
  // Indonesia / Borneo (indicative arc)
  [
    [96, 5], [104, 2], [110, 0], [117, 1], [119, -3], [114, -8], [106, -7],
    [100, -1], [96, 5],
  ],
];

/** India, rendered as the accent landmass. */
export const INDIA: LonLat[] = [
  [68, 23], [70, 21], [72, 19], [73, 16], [76, 11], [77, 8], [80, 10],
  [80, 13], [81, 16], [84, 19], [87, 21], [89, 22], [92, 22], [94, 25],
  [92, 27], [88, 26], [85, 26], [80, 29], [77, 32], [74, 33], [72, 28],
  [70, 24], [68, 23],
];

export interface GeoNode {
  id: string;
  lon: number;
  lat: number;
  /** Primary nodes render larger and pulse more prominently. */
  primary?: boolean;
  /** Seconds offset so pulses never synchronise. */
  phase: number;
}

export const NETWORK_NODES: GeoNode[] = [
  { id: 'mumbai', lon: 72.9, lat: 19.1, primary: true, phase: 0 },
  { id: 'delhi', lon: 77.2, lat: 28.6, primary: true, phase: 1.3 },
  { id: 'bengaluru', lon: 77.6, lat: 12.9, primary: true, phase: 2.7 },
  { id: 'chennai', lon: 80.3, lat: 13.1, phase: 0.6 },
  { id: 'hyderabad', lon: 78.5, lat: 17.4, phase: 3.4 },
  { id: 'kolkata', lon: 88.4, lat: 22.6, phase: 1.9 },
  { id: 'ahmedabad', lon: 72.6, lat: 23.0, phase: 4.1 },
  { id: 'dubai', lon: 55.3, lat: 25.2, primary: true, phase: 2.2 },
  { id: 'singapore', lon: 103.8, lat: 1.3, primary: true, phase: 3.9 },
  { id: 'london', lon: -0.1, lat: 51.5, primary: true, phase: 0.9 },
  { id: 'frankfurt', lon: 8.7, lat: 50.1, phase: 4.6 },
  { id: 'newyork', lon: -74.0, lat: 40.7, primary: true, phase: 2.9 },
  { id: 'tokyo', lon: 139.7, lat: 35.7, primary: true, phase: 1.1 },
  { id: 'sydney', lon: 151.2, lat: -33.9, phase: 3.1 },
  { id: 'johannesburg', lon: 28.0, lat: -26.2, phase: 5.2 },
  { id: 'saopaulo', lon: -46.6, lat: -23.5, phase: 4.4 },
  { id: 'nairobi', lon: 36.8, lat: -1.3, phase: 2.5 },
  { id: 'riyadh', lon: 46.7, lat: 24.7, phase: 5.8 },
];

/** Great-circle routes drawn between network nodes. */
export const ROUTES: [string, string][] = [
  ['mumbai', 'dubai'],
  ['mumbai', 'singapore'],
  ['delhi', 'frankfurt'],
  ['dubai', 'london'],
  ['london', 'newyork'],
  ['singapore', 'tokyo'],
  ['singapore', 'sydney'],
  ['mumbai', 'nairobi'],
  ['bengaluru', 'riyadh'],
  ['newyork', 'saopaulo'],
  ['nairobi', 'johannesburg'],
  ['delhi', 'kolkata'],
  ['mumbai', 'chennai'],
];
