import sys
from PIL import Image
import glob
import os

images = {
    "hero": "C:\\Users\\iiiii\\.gemini\\antigravity\\brain\\6dcc3be1-248b-49f4-b9fa-17162bdd807f\\loading_hero_*.png",
}

out_dir = "C:\\Users\\iiiii\\Documents\\google重力無効\\hybrid-snow-hunter-source\\public"

for name, pattern in images.items():
    matches = glob.glob(pattern)
    if not matches:
        print(f"Not found: {name}")
        continue
        
    img_path = matches[-1] # latest
    print(f"Processing {name}: {img_path}")
    
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # threshold for dark blue background (corner pixel was 9, 12, 30)
    for item in datas:
        # Check if color is close to the background dark color
        is_bg = (item[0] < 20 and item[1] < 20 and item[2] < 45)
        
        if is_bg:
            newData.append((0, 0, 0, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    out_path = os.path.join(out_dir, f"loading-hero.png")
    img.save(out_path, "PNG")
    print(f"Saved: {out_path}")

print("Done")
