import os
from PIL import Image

abs_path = "/Users/iancapo/antigravity/JULIES E IAN/assets/logo-egobrazil.png"
img = Image.open(abs_path)
print("Image Mode:", img.mode)

# Let's read a few pixels from the corners (usually background)
width, height = img.size
corners = [
    (0, 0), (width-1, 0), (0, height-1), (width-1, height-1),
    (10, 10), (width-11, 10), (10, height-11), (width-11, height-11)
]

print("Corner pixel values:")
for x, y in corners:
    print(f"Pixel at ({x}, {y}): {img.getpixel((x, y))}")

# Let's count unique pixel values or print some sample stats
pixels = list(img.getdata())
from collections import Counter
c = Counter(pixels)
print("Top 10 most common pixel values:")
for val, count in c.most_common(10):
    print(f"  {val}: {count}")
