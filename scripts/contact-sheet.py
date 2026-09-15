"""Build a labeled contact sheet of the supplied hero assets for identification."""
import glob
import os
import sys
from PIL import Image, ImageDraw

SRC = 'SST-HERO-ASSETS'
files = sorted(
    p for p in glob.glob(SRC + '/*/*.png') + glob.glob(SRC + '/*/*.webp')
    if '/references/' not in p.replace(os.sep, '/')
)

cell, cols = 300, 4
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * cell, rows * (cell + 24)), (244, 244, 244))
draw = ImageDraw.Draw(sheet)

for i, path in enumerate(files):
    im = Image.open(path).convert('RGB')
    im.thumbnail((cell, cell))
    x, y = (i % cols) * cell, (i // cols) * (cell + 24)
    sheet.paste(im, (x + (cell - im.width) // 2, y))
    draw.text((x + 5, y + cell + 6), '%d: %s' % (i, os.path.basename(path)), fill=(15, 15, 15))

out = sys.argv[1]
sheet.save(out)
print(out, sheet.size)
for i, path in enumerate(files):
    print(i, path)
