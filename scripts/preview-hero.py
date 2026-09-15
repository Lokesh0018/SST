"""
Render a static proxy of the hero composition.

This mirrors the coordinates in EnvironmentScene.tsx and HeroSection.css so
placement, scale and the readability wash can be checked without a browser.
It is a development aid only — nothing here ships.
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np

W, H = 1920, 1080
OUT = sys.argv[1] if len(sys.argv) > 1 else 'hero-preview.png'
IVORY = (255, 253, 248)


def bezier(p0, p1, p2, p3, t):
    u = 1 - t
    x = u**3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t**3 * p3[0]
    y = u**3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t**3 * p3[1]
    return x, y


PATHS = {
    'rail': ((-140, 478), (160, 506), (400, 530), (720, 558)),
    'railFar': ((-140, 462), (160, 490), (400, 514), (700, 542)),
    'road': ((300, 622), (700, 712), (1080, 804), (1560, 952)),
    'roadIn': ((1900, 872), (1690, 926), (1470, 986), (1220, 1072)),
    'bridge': ((980, 690), (1120, 724), (1250, 762), (1380, 806)),
    'ship': ((1360, 744), (1530, 734), (1700, 723), (1890, 712)),
    'shipB': ((1470, 676), (1615, 679), (1760, 681), (1900, 684)),
    'flight': ((2100, 268), (1520, 318), (920, 374), (220, 444)),
    'flightFar': ((2140, 158), (1620, 184), (1120, 216), (560, 256)),
}

canvas = Image.new('RGBA', (W, H), IVORY + (255,))

# --- environment plate, with the upward dissolve from the SVG mask ---
plate = Image.open('public/assets/hero/plate.jpg').convert('RGBA').resize((W, H), Image.LANCZOS)
ramp = np.clip(np.arange(H) / 420.0, 0, 1)[:, None] * np.ones((1, W), dtype=np.float32)
alpha = np.asarray(plate.getchannel('A')).astype(np.float32) * ramp
plate.putalpha(Image.fromarray(alpha.astype(np.uint8), 'L'))
canvas.alpha_composite(plate, (0, 0))


def place(img_path, path_key, t, width, anchor='center', mask_bottom=None):
    im = Image.open(img_path).convert('RGBA')
    h = round(im.height * width / im.width)
    im = im.resize((width, h), Image.LANCZOS)
    if mask_bottom:
        a = np.asarray(im.getchannel('A')).astype(np.float32).copy()
        f = min(mask_bottom, h)
        a[-f:] *= np.linspace(1, 0, f, dtype=np.float32)[:, None]
        im.putalpha(Image.fromarray(a.astype(np.uint8), 'L'))
    x, y = bezier(*PATHS[path_key], t)
    ox = round(x - width / 2)
    oy = round(y - h / 2) if anchor == 'center' else round(y - h)
    canvas.alpha_composite(im, (ox, oy))
    return x, y


place('public/assets/hero/airplane.webp', 'flight', 0.20, 208)
place('public/assets/hero/airplane.webp', 'flightFar', 0.66, 104)
place('public/assets/hero/cargo-ship.webp', 'ship', 0.30, 212, mask_bottom=14)
place('public/assets/hero/cargo-ship.webp', 'shipB', 0.45, 150, mask_bottom=12)

# --- logistics campus, radially masked so no render edge shows ---


draw = ImageDraw.Draw(canvas)
# vector stand-ins: train / truck / turbines, at their scene scale
for key, t, w, h, label in (
    ('rail', 0.42, 126, 20, 'TRAIN'), ('railFar', 0.60, 90, 14, 'TRAIN2'),
    ('road', 0.00, 70, 26, 'TRK-A'), ('road', 0.42, 44, 18, 'CAR-A'), ('road', 0.74, 40, 17, 'CAR-B'),
    ('roadIn', 0.18, 70, 26, 'TRK-B'), ('roadIn', 0.55, 44, 18, 'CAR-C'), ('roadIn', 0.86, 40, 17, 'CAR-D'),
    ('bridge', 0.30, 30, 12, 'CAR-E')):
    x, y = bezier(*PATHS[key], t)
    draw.rectangle([x - w / 2, y - h, x + w / 2, y], outline=(255, 75, 31), width=3)
    draw.text((x - w / 2, y + 4), label, fill=(255, 75, 31))
for tx, ty, s in ((1618, 492, 0.20), (1702, 500, 0.26), (1806, 512, 0.32)):
    hub = ty - 212 * s
    draw.line([(tx, ty), (tx, hub)], fill=(255, 75, 31), width=2)
    draw.ellipse([tx - 78 * s, hub - 78 * s, tx + 78 * s, hub + 78 * s], outline=(255, 75, 31), width=2)

# --- readability wash ---
wash = Image.new('RGBA', (W, H), IVORY + (0,))
yy2, xx2 = np.mgrid[0:H, 0:W]
fx = xx2 / W
scrim = np.interp(fx, [0, 0.30, 0.38, 0.44, 0.48, 0.51], [1.0, 0.97, 0.86, 0.42, 0.10, 0.0])
r2 = np.sqrt(((xx2 - 0.15 * W) / (0.26 * W))**2 + ((yy2 - 0.67 * H) / (0.15 * H))**2)
scrim = np.maximum(scrim, np.interp(r2, [0, 0.52, 0.86], [0.82, 0.42, 0.0]))
top = np.clip(1 - (np.arange(H) / (0.22 * H)), 0, 1)[:, None] * 0.5
wash.putalpha(Image.fromarray((np.clip(scrim + top, 0, 1) * 255).astype(np.uint8), 'L'))
canvas.alpha_composite(wash)

# --- copy block, to check the text never fights the scene ---
try:
    big = ImageFont.truetype('arialbd.ttf', 56)
    small = ImageFont.truetype('arial.ttf', 19)
except OSError:
    big = small = ImageFont.load_default()
draw = ImageDraw.Draw(canvas)
draw.text((192, 300), 'CONNECTING', font=big, fill=(28, 28, 27))
draw.text((192, 358), 'PEOPLE, PLACES', font=big, fill=(28, 28, 27))
draw.text((192, 416), 'SAFER TOMORROWS', font=big, fill=(244, 81, 30))
draw.text((194, 500), 'End-to-end execution of security, infrastructure and technology', font=small, fill=(95, 92, 85))
draw.text((194, 528), 'solutions - delivered on time, at scale.', font=small, fill=(95, 92, 85))
draw.rounded_rectangle([192, 580, 452, 632], 26, fill=(244, 81, 30))
draw.text((216, 598), 'EXPLORE OUR SERVICES', font=small, fill=(255, 255, 255))
for i, (v, l) in enumerate((('500+', 'Happy Clients'), ('12+', 'Industries'), ('50+', 'Cities'), ('100%', 'Safety'))):
    draw.text((194 + i * 132, 700), v, font=small, fill=(28, 28, 27))
    draw.text((194 + i * 140, 864), l, font=small, fill=(95, 92, 85))

# --- globe footprint, so the visual column can be checked for collisions ---
gx0, gy0, R = 1392, 424, 280
veil = Image.new('RGBA', (W, H), (0, 0, 0, 0))
vy, vx = np.mgrid[0:H, 0:W]
vr = np.sqrt(((vx - gx0) / (R * 2.1))**2 + ((vy - gy0) / (R * 2.1))**2)
va = np.clip(1 - vr, 0, 1) ** 1.25 * 0.74
veil.putalpha(Image.fromarray((va * 255).astype(np.uint8), 'L'))
veil_rgb = Image.new('RGBA', (W, H), IVORY + (255,)); veil_rgb.putalpha(veil.getchannel('A'))
canvas.alpha_composite(veil_rgb)
draw = ImageDraw.Draw(canvas)
draw.ellipse([gx0 - R, gy0 - R, gx0 + R, gy0 + R], outline=(28, 28, 27), width=2)
for rx, ry, ox in ((424, 336, 58), (378, 302, 40), (330, 268, 26)):
    draw.ellipse([gx0 + ox - rx, gy0 - ry, gx0 + ox + rx, gy0 + ry], outline=(180, 180, 180), width=1)

import math
for lx, ly, bowf in ((700, 556, -0.30), (1120, 604, -0.16), (1372, 878, 0.12), (1770, 430, 0.20)):
    dx, dy = lx - gx0, ly - gy0
    ln = math.hypot(dx, dy) or 1
    x0, y0 = gx0 + dx / ln * R, gy0 + dy / ln * R
    bow = ln * bowf
    cx, cy = (x0 + lx) / 2 - dy / ln * bow, (y0 + ly) / 2 + dx / ln * bow
    pts = []
    for k in range(41):
        t = k / 40; u = 1 - t
        pts.append((u * u * x0 + 2 * u * t * cx + t * t * lx, u * u * y0 + 2 * u * t * cy + t * t * ly))
    draw.line(pts, fill=(255, 75, 31), width=2)
    draw.ellipse([lx - 6, ly - 6, lx + 6, ly + 6], outline=(255, 75, 31), width=3)

canvas.convert('RGB').save(OUT)
print(OUT)
