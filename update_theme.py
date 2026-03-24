import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update variables
css = re.sub(r'(--navy:\s*)#0d1f3c;', r'\1#152a36;', css)
css = re.sub(r'(--navy-mid:\s*)#142848;', r'\1#1e3645;', css)
css = re.sub(r'(--gold:\s*)#c9922a;', r'\1#2a8bf2;', css)
css = re.sub(r'(--gold-light:\s*)#e8b24a;', r'\1#5ba3f5;\n    --lime: #ccf330;\n    --lime-dark: #b8df29;', css)
css = re.sub(r'(--white:\s*)#f5f3ef;', r'\1#ffffff;', css)
css = re.sub(r'(--light-bg:\s*)#f0ede8;', r'\1#f4f7f6;', css)

# 2. Hardcoded rgba of gold (201,146,42) -> blue (42,139,242)
css = css.replace('201,146,42', '42,139,242')

# 3. Update buttons to lime
btn_replacements = [
    (r'(\.nav-cta\s*\{[^}]*background:\s*)var\(--gold\)', r'\1var(--lime)'),
    (r'(\.nav-cta:hover\s*\{[^}]*background:\s*)var\(--gold-light\)', r'\1var(--lime-dark)'),
    (r'(\.btn-primary\s*\{[^}]*background:\s*)var\(--gold\)', r'\1var(--lime)'),
    (r'(\.btn-primary:hover\s*\{[^}]*background:\s*)var\(--gold-light\)', r'\1var(--lime-dark)'),
    (r'(\.btn-submit\s*\{[^}]*background:\s*)var\(--gold\)', r'\1var(--lime)'),
    (r'(\.btn-submit:hover\s*\{[^}]*background:\s*)var\(--gold-light\)', r'\1var(--lime-dark)'),
    (r'(\.btn-outline:hover\s*\{[^}]*border-color:\s*)var\(--gold\)', r'\1var(--lime)'),
    (r'(\.btn-outline:hover\s*\{[^}]*color:\s*)var\(--gold\)', r'\1var(--lime)')
]
for pattern, repl in btn_replacements:
    css = re.sub(pattern, repl, css)

# 4. Fix hero badge to lime to pop out
css = re.sub(r'(\.hero-badge\s*\{[^}]*color:\s*)var\(--gold-light\)', r'\1var(--lime)', css)
css = re.sub(r'(\.hero-badge::before\s*\{[^}]*background:\s*)var\(--gold\)', r'\1var(--lime)', css)
css = re.sub(r'(\.hero-badge\s*\{[^}]*background:\s*)rgba\(42,139,242,(\d+\.\d+)\)', r'\1rgba(204,243,48,\2)', css) # lime background
css = re.sub(r'(\.hero-badge\s*\{[^}]*border:\s*1px\s+solid\s*)rgba\(42,139,242,(\d+\.\d+)\)', r'\1rgba(204,243,48,\2)', css) # lime border

# 5. Fix hero stats to lime to match the reference text
css = re.sub(r'(\.hero-stat-num\s*\{[^}]*color:\s*)var\(--gold\)', r'\1var(--lime)', css)

# 6. Update Hero background
css = re.sub(r'(\.hero\s*\{[^}]*background:\s*)var\(--navy\);', r"\1linear-gradient(135deg, #2a8bf2 0%, #152a36 100%);", css)

# 7. Contact Ico
css = re.sub(r'(\.contact-ico\s*\{[^}]*color:\s*)var\(--gold\)', r'\1var(--lime)', css)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS updated successfully")
