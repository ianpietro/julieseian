import os
from PIL import Image

def make_transparent_correio(path):
    abs_path = os.path.join("/Users/iancapo/antigravity/JULIES E IAN", path)
    img = Image.open(abs_path).convert('RGBA')
    datas = img.getdata()
    new_data = []
    # Correio has white background. Make near-white pixels transparent.
    for item in datas:
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append((0, 0, 0, 255)) # Make foreground solid black so invert(1) makes it solid white
    img.putdata(new_data)
    img.save(abs_path, "PNG")
    print(f"Converted {path} (white bg) successfully!")

def make_transparent_egobrazil(path):
    abs_path = os.path.join("/Users/iancapo/antigravity/JULIES E IAN", path)
    img = Image.open(abs_path).convert('RGBA')
    datas = img.getdata()
    new_data = []
    # EgoBrazil has black background (10, 0, 0). Make near-black pixels transparent.
    for item in datas:
        if item[0] < 30 and item[1] < 30 and item[2] < 30:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append((0, 0, 0, 255)) # Make foreground solid black
    img.putdata(new_data)
    img.save(abs_path, "PNG")
    print(f"Converted {path} (dark bg) successfully!")

# First restore egobrazil from git so we have the original dark background logo to work on
import subprocess
subprocess.run(["git", "checkout", "assets/logo-egobrazil.png"], cwd="/Users/iancapo/antigravity/JULIES E IAN")
subprocess.run(["git", "checkout", "assets/logo-correio.png"], cwd="/Users/iancapo/antigravity/JULIES E IAN")

make_transparent_correio("assets/logo-correio.png")
make_transparent_egobrazil("assets/logo-egobrazil.png")
