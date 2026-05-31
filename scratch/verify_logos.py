import os
from PIL import Image

def inspect_image(path):
    abs_path = os.path.join("/Users/iancapo/antigravity/JULIES E IAN", path)
    if not os.path.exists(abs_path):
        print(f"{path} does not exist!")
        return
    img = Image.open(abs_path)
    print(f"Image: {path}")
    print(f"  Format: {img.format}")
    print(f"  Size: {img.size}")
    print(f"  Mode: {img.mode}")
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        print("  Has potential transparency channel.")
        # Check if there are actual transparent pixels
        rgba = img.convert('RGBA')
        datas = rgba.getdata()
        transparent_pixels = 0
        for item in datas:
            if item[3] < 255:  # alpha < 255
                transparent_pixels += 1
        print(f"  Transparent pixels: {transparent_pixels} / {len(datas)} ({transparent_pixels/len(datas)*100:.2f}%)")
    else:
        print("  NO transparency channel! (Solid RGB)")

inspect_image("assets/logo-correio.png")
inspect_image("assets/logo-egobrazil.png")
inspect_image("assets/logo-tupi.png")
inspect_image("assets/logo-uai.png")
inspect_image("assets/logo-terra.png")
inspect_image("assets/logo-r7.png")
