/**
 * Raster assets used by the hero scene. WebP keeps the alpha channel on the
 * photographic cutouts at a fraction of PNG's weight.
 *
 * These are produced from the supplied pack by `scripts/prepare-hero-assets.py`,
 * which keys the flat backdrop out of each render, trims it, grades it toward
 * the plate's daylight and writes a transparent PNG here. Re-run that script
 * after changing anything in SST-HERO-ASSETS/.
 *
 * Only subjects that the pack actually contains appear below. The pack has no
 * train, no truck, no rotor and no cloud plates — those stay vector assets in
 * ./assets/vectors.tsx so the scene is complete and every part still animates.
 */
const BASE = '/SST-HERO-ASSETS/';

export const ASSETS = {
  plate: '/assets/hero/hero-bg.png',
  airplane: BASE + 'transport/airplane.png',
  ship: BASE + 'transport/cargo-ship.png',
  campus: BASE + 'infrastructure/warehouse.png',
  train: BASE + 'transport/train.png',
  truck: BASE + 'transport/truck.png',
  crane: BASE + 'infrastructure/container-crane.png',
  substation: BASE + 'infrastructure/electrical-substation.png',
  tower: BASE + 'infrastructure/communication-tower.png',
  port: BASE + 'environment/port.png',
} as const;

export type AssetKey = keyof typeof ASSETS;
