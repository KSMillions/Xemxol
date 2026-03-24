import re
import os
import base64

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Extract CSS
style_match = re.search(r'<style>(.*?)</style>', html, flags=re.DOTALL)
if style_match:
    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(style_match.group(1).strip())
    html = html.replace(style_match.group(0), '<link rel="stylesheet" href="style.css">')

# 2. Extract JS
script_match = re.search(r'<script>\s*(function handleSubmit.*?)</script>', html, flags=re.DOTALL)
if script_match:
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(script_match.group(1).strip())
    html = html.replace(script_match.group(0), '<script src="script.js"></script>')

# 3. Extract Base64 Images
os.makedirs('assets/images', exist_ok=True)
img_matches = re.finditer(r'<img\s+src="data:image/([^;]+);base64,([^"]+)"([^>]*)>', html)
for i, match in enumerate(img_matches):
    ext = match.group(1)
    b64_data = match.group(2)
    other_attrs = match.group(3)
    
    filename = f'assets/images/image_{i+1}.{ext}'
    with open(filename, 'wb') as f:
        f.write(base64.b64decode(b64_data))
    
    new_img_tag = f'<img src="{filename}"{other_attrs}>'
    html = html.replace(match.group(0), new_img_tag)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Extraction complete.")
