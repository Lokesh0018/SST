"""
Prepare web-ready hero assets from SST-HERO-ASSETS/.

The supplied rasters are 1024x1024 JPEGs (despite .png/.webp extensions) with
no alpha: each is a studio render of one subject on a near-black field, and
several filenames do not match their contents. This script:

  1. keys the flat background out with a border flood fill (robust for dark
     subjects, where a plain luminance key eats the shadow side),
  2. trims the result to the subject and feathers the edge,
  3. grades the night-lit renders toward the daylight of the background plate,
  4. writes transparent PNGs under public/assets/hero/ using names that match
     what each image ACTUALLY shows.

Run: python scripts/prepare-hero-assets.py
"""
from __future__ import annotations

import os
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import numpy as np

# The pack has lived at the repo root and under public/; accept either.
SRC = next(
    (c for c in ('SST-HERO-ASSETS', 'public/SST-HERO-ASSETS') if os.path.isdir(c)),
    'SST-HERO-ASSETS',
)
OUT = 'public/assets/hero'
os.makedirs(OUT, exist_ok=True)


def cutout(path: str, tol: int = 26, feather: float = 1.1) -> Image.Image:
    """Key the flat backdrop out and return an RGBA image trimmed to the subject."""
    im = Image.open(path).convert('RGB')
    arr = np.asarray(im).astype(np.int16)

    # Background colour, sampled from the corners.
    corners = np.concatenate([
        arr[:12, :12].reshape(-1, 3), arr[:12, -12:].reshape(-1, 3),
        arr[-12:, :12].reshape(-1, 3), arr[-12:, -12:].reshape(-1, 3),
    ])
    bg = np.median(corners, axis=0)

    # "Looks like the backdrop" mask, then flood fill inward from the border so
    # dark pixels enclosed by the subject stay opaque.
    near = (np.abs(arr - bg).max(axis=2) <= tol).astype(np.uint8) * 255
    # .copy() detaches from the read-only numpy buffer so floodfill can write.
    mask = Image.fromarray(near, 'L').copy()
    w, h = mask.size
    for seed in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1)):
        if mask.getpixel(seed) == 255:
            ImageDraw.floodfill(mask, seed, 128, thresh=0)
    background = np.asarray(mask) == 128

    alpha = np.where(background, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, 'L')
    # Pull the matte in by a pixel before feathering so no backdrop fringe rides along.
    alpha_img = alpha_img.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(feather))

    rgba = im.convert('RGBA')
    rgba.putalpha(alpha_img)
    bbox = alpha_img.point(lambda v: 255 if v > 6 else 0).getbbox()
    return rgba.crop(bbox) if bbox else rgba


def grade(im: Image.Image, brightness=1.0, contrast=1.0, saturation=1.0, warm=0.0) -> Image.Image:
    """
    Nudge a night-lit render toward the plate's daylight.

    PIL's enhancers blend across every band, alpha included, which quietly
    eats the matte. Grade the colour only and re-attach the original alpha.
    """
    alpha = im.getchannel('A')
    rgb = im.convert('RGB')
    rgb = ImageEnhance.Brightness(rgb).enhance(brightness)
    rgb = ImageEnhance.Contrast(rgb).enhance(contrast)
    rgb = ImageEnhance.Color(rgb).enhance(saturation)
    if warm:
        arr = np.asarray(rgb).astype(np.float32)
        arr[..., 0] = np.clip(arr[..., 0] * (1 + warm), 0, 255)
        arr[..., 2] = np.clip(arr[..., 2] * (1 - warm * 0.6), 0, 255)
        rgb = Image.fromarray(arr.astype(np.uint8), 'RGB')
    out = rgb.convert('RGBA')
    out.putalpha(alpha)
    return out


def bleed(im: Image.Image, passes: int = 14) -> Image.Image:
    """
    Push the subject's colour outward into the transparent margin.

    A cutout keyed off a black backdrop leaves black RGB beneath alpha 0. Any
    soft edge, and any lossy encode, then drags that black into the visible
    rim — which is what reads as a dark box around the object. Flooding the
    margin with the nearest subject colour removes the halo at its source.
    """
    arr = np.asarray(im).astype(np.float32)
    rgb = arr[..., :3].copy()
    alpha = arr[..., 3]
    known = alpha > 8
    rgb[~known] = 0.0

    for _ in range(passes):
        if known.all():
            break
        total = np.zeros_like(rgb)
        count = np.zeros(known.shape, dtype=np.float32)
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            shifted_rgb = np.roll(rgb, (dy, dx), axis=(0, 1))
            shifted_known = np.roll(known, (dy, dx), axis=(0, 1))
            total += shifted_rgb * shifted_known[..., None]
            count += shifted_known
        fill = (~known) & (count > 0)
        rgb[fill] = total[fill] / count[fill][..., None]
        known = known | fill

    out = np.dstack([rgb, alpha]).astype(np.uint8)
    return Image.fromarray(out, 'RGBA')


def waterline(im: Image.Image, keep: float, feather: int = 70) -> Image.Image:
    """Cut a subject off at its waterline and fade the cut, so the plate's own
    water reads through instead of the render's."""
    h = round(im.height * keep)
    out = im.crop((0, 0, im.width, h))
    alpha = np.asarray(out.getchannel('A')).astype(np.float32).copy()
    ramp = np.linspace(1.0, 0.0, feather, dtype=np.float32)[:, None]
    alpha[-feather:] *= ramp
    out.putalpha(Image.fromarray(alpha.astype(np.uint8), 'L'))
    return out


def crop_fade(im: Image.Image, box, feather=90, sides=('bottom',), soft=0) -> Image.Image:
    """
    Cut a subject down to the part that can live in the scene and dissolve the
    cut edges into haze, so no straight render boundary is ever visible.
    """
    out = im.crop(box)
    alpha = np.asarray(out.getchannel('A')).astype(np.float32).copy()
    h, w = alpha.shape
    if 'bottom' in sides:
        f = min(feather, h)
        alpha[-f:] *= np.linspace(1, 0, f, dtype=np.float32)[:, None]
    if 'right' in sides:
        f = min(feather, w)
        alpha[:, -f:] *= np.linspace(1, 0, f, dtype=np.float32)[None, :]
    if 'left' in sides:
        f = min(feather, w)
        alpha[:, :f] *= np.linspace(0, 1, f, dtype=np.float32)[None, :]
    if 'top' in sides:
        f = min(feather, h)
        alpha[:f] *= np.linspace(0, 1, f, dtype=np.float32)[:, None]
    if soft:
        # A gentler dissolve on the remaining edges, so no side of the crop
        # ever lands as a straight line on the plate.
        f = min(soft, h // 2, w // 2)
        ramp = np.linspace(0, 1, f, dtype=np.float32)
        alpha[:f] *= ramp[:, None]
        alpha[:, :f] *= ramp[None, :]
    out.putalpha(Image.fromarray(alpha.astype(np.uint8), 'L'))
    return out


def aerial(im: Image.Image, colour=(226, 236, 244), amount=0.0) -> Image.Image:
    """Atmospheric perspective: wash the subject toward the sky so a night-lit
    render settles into the daylight plate instead of punching a hole in it."""
    if not amount:
        return im
    arr = np.asarray(im).astype(np.float32)
    for c in range(3):
        arr[..., c] = arr[..., c] * (1 - amount) + colour[c] * amount
    return Image.fromarray(arr.astype(np.uint8), 'RGBA')


def fit(im: Image.Image, max_w: int) -> Image.Image:
    if im.width <= max_w:
        return im
    return im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)


def save(im: Image.Image, name: str) -> None:
    """WebP keeps the alpha channel at a fraction of PNG's weight — these are
    photographic cutouts, not flat graphics. `exact` keeps the bled colour
    under the transparent pixels instead of letting the encoder reset it."""
    path = os.path.join(OUT, name)
    bleed(im).save(path, quality=88, method=6, exact=True)
    print('%-22s %sx%s  %.0fKB' % (name, im.width, im.height, os.path.getsize(path) / 1024))


# --- the environment plate ---
# public/assets/hero/hero-bg.png supersedes the pack's background when present:
# it is a true 16:9 frame and it actually contains the rail viaduct, wind farm,
# solar array and warehouse the scene needs, so far less has to be faked.
_plate_src = 'public/assets/hero/hero-bg.png'
if not os.path.exists(_plate_src):
    _plate_src = SRC + '/environment/hero-background.webp'
plate = Image.open(_plate_src).convert('RGB')
if abs(plate.width / plate.height - 16 / 9) > 0.02:
    print('note: plate is not 16:9 (%sx%s); scene coordinates assume 16:9' % plate.size)
plate.save(os.path.join(OUT, 'plate.jpg'), quality=86, optimize=True, progressive=True)
print('%-22s %sx%s  %.0fKB' % ('plate.jpg', plate.width, plate.height,
                               os.path.getsize(os.path.join(OUT, 'plate.jpg')) / 1024))

# --- distinct subjects, saved under the names that describe them ---
# transport/airplane.png really is the airliner. It is delivered nose-left and
# is kept that way — mirroring it would reverse the livery. The scene flies it
# on right-to-left paths with a 180-degree autoRotate offset instead.
save(fit(grade(cutout(SRC + '/transport/airplane.png', tol=20), 1.28, 1.02, 0.92), 620), 'airplane.webp')

# transport/train.png, cargo-ship.png and truck.png are all the same container
# vessel; keep one. The hull sits on water, so the matte is cropped above the
# waterline by the scene's own mask rather than here.
save(
    fit(aerial(waterline(grade(cutout(SRC + '/transport/cargo-ship.png', tol=30), 1.14, 0.98, 0.9), 0.94, 46),
               amount=0.16), 620),
    'cargo-ship.webp',
)

# environment/city|clouds-01|clouds-02|haze|port are all the same lit tower.
if '--all' in sys.argv:
    # Extracted on request only: neither is placed in the scene, so shipping
    # them would be dead weight in the build.
    save(fit(aerial(grade(cutout(SRC + '/environment/city.png', tol=24), 1.34, 0.9, 0.62, warm=0.03), amount=0.3), 620),
         'tower.webp')
    save(fit(grade(cutout(SRC + '/energy/wind-turbine-tower.png', tol=22), 1.15, 1.0, 0.9), 600),
         'turbine-base.webp')

# infrastructure/* are all the same logistics campus.
# Graded hard and cropped to the building: the source is shot at night, and
# its tarmac apron is a hard-edged trapezoid — together that is exactly what
# reads as a black box pasted onto a daylight plate. What survives is the
# shed itself, dissolving into haze along every cut.
_campus = grade(cutout(SRC + '/infrastructure/warehouse.png', tol=24), 1.92, 0.78, 0.55, warm=0.04)
_campus = crop_fade(
    _campus,
    (0, 0, int(_campus.width * 0.74), int(_campus.height * 0.62)),
    feather=110,
    sides=('bottom', 'right'),
    soft=46,
)
save(fit(aerial(_campus, amount=0.5), 660), 'logistics-campus.webp')
