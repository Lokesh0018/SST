import json, math

d = json.load(open('public/countries.geojson', encoding='utf-8'))

def rdp(pts, eps):
    """Ramer-Douglas-Peucker in lon/lat degrees."""
    if len(pts) < 3:
        return pts
    def dist(p, a, b):
        (x, y), (x1, y1), (x2, y2) = p, a, b
        dx, dy = x2 - x1, y2 - y1
        if dx == 0 and dy == 0:
            return math.hypot(x - x1, y - y1)
        t = max(0, min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)))
        return math.hypot(x - (x1 + t * dx), y - (y1 + t * dy))
    a, b = pts[0], pts[-1]
    idx, dmax = 0, 0.0
    for i in range(1, len(pts) - 1):
        dd = dist(pts[i], a, b)
        if dd > dmax:
            idx, dmax = i, dd
    if dmax > eps:
        return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [a, b]

def area(ring):
    s = 0.0
    for i in range(len(ring) - 1):
        s += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]
    return abs(s) / 2

def rings_of(geom):
    t, c = geom['type'], geom['coordinates']
    if t == 'Polygon':
        return [c[0]]
    if t == 'MultiPolygon':
        return [p[0] for p in c]
    return []

world, india = [], []
for f in d['features']:
    name = f['properties'].get('name')
    for ring in rings_of(f['geometry']):
        if area(ring) < 12:           # drop small islands
            continue
        simp = rdp([tuple(p) for p in ring], 1.15)
        if len(simp) < 5:
            continue
        pts = [[round(x, 1), round(y, 1)] for x, y in simp]
        (india if name == 'India' else world).append(pts)

def emit(rings):
    return '[' + ','.join('[' + ','.join('[%g,%g]' % (x, y) for x, y in r) + ']' for r in rings) + ']'

src = f"""/**
 * Coastlines baked from public/countries.geojson (Ramer-Douglas-Peucker, 1.15 deg)
 * at build-prep time, so the globe needs no runtime fetch and no parsing cost.
 * Coordinates are [longitude, latitude] in degrees.
 * Regenerate with scripts/gen-globe-geo.py if the source data changes.
 */
export type LonLat = [number, number];

/** {len(world)} national coastline rings. */
export const WORLD_RINGS: LonLat[][] = {emit(world)} as LonLat[][];

/** India, drawn as the accent territory. */
export const INDIA_RINGS: LonLat[][] = {emit(india)} as LonLat[][];
"""
open('src/components/hero/worldGeo.ts', 'w', encoding='utf-8').write(src)
print('world rings:', len(world), 'india rings:', len(india),
      'points:', sum(len(r) for r in world) + sum(len(r) for r in india),
      'kb:', round(len(src) / 1024, 1))
