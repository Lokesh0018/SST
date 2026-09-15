"""
Generate src/components/hero/assets/serviceIcons.tsx from the supplied
SST-HERO-ASSETS/services/*.svg.

The artwork is used exactly as delivered — same 64x64 geometry, same stroke
weight. The only change is swapping the hard-coded #FF4B1F for currentColor so
a node can invert its icon on hover without shipping a second copy.
"""
import glob
import os
import re

SRC = 'SST-HERO-ASSETS/services'
OUT = 'src/components/hero/assets/serviceIcons.tsx'

NAMES = {
    'access-control': 'AccessControlIcon',
    'cctv': 'CctvIcon',
    'electrical': 'ElectricalIcon',
    'fire-safety': 'FireSafetyIcon',
    'intrusion': 'IntrusionIcon',
    'logistics': 'LogisticsIcon',
    'network': 'NetworkIcon',
    'servers': 'ServersIcon',
    'turnkey': 'TurnkeyIcon',
    'wireless': 'WirelessIcon',
}

parts = []
for path in sorted(glob.glob(SRC + '/*.svg')):
    slug = os.path.basename(path)[:-4]
    if slug not in NAMES:
        continue
    svg = open(path, encoding='utf-8').read()
    inner = re.search(r'<svg[^>]*>(.*)</svg>', svg, re.S).group(1).strip()
    inner = inner.replace('#FF4B1F', 'currentColor')
    inner = re.sub(r'\b(stroke|fill|stroke-width|stroke-linecap|stroke-linejoin)="',
                   lambda m: {'stroke': 'stroke="', 'fill': 'fill="',
                              'stroke-width': 'strokeWidth="',
                              'stroke-linecap': 'strokeLinecap="',
                              'stroke-linejoin': 'strokeLinejoin="'}[m.group(1)], inner)
    inner = re.sub(r'<!--.*?-->', '', inner, flags=re.S)
    inner = '\n'.join('    ' + ln.strip() for ln in inner.splitlines() if ln.strip())
    parts.append(
        'export const %s = (\n  <svg viewBox="0 0 64 64" aria-hidden="true">\n%s\n  </svg>\n);'
        % (NAMES[slug], inner)
    )

header = '''/**
 * Service icons, generated from SST-HERO-ASSETS/services/*.svg.
 *
 * The supplied artwork is used as delivered — same 64x64 geometry and stroke
 * weight. `#FF4B1F` is swapped for `currentColor` so a node can invert its
 * icon on hover from one copy of the art.
 *
 * Regenerate with scripts/gen-service-icons.py — do not hand-edit.
 */

'''
open(OUT, 'w', encoding='utf-8').write(header + '\n\n'.join(parts) + '\n')
print('wrote', OUT, '-', len(parts), 'icons')
