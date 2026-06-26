#!/usr/bin/env python3
import os, shutil

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Components-maintiles")

moves = [
    # UI-Components (from components/compo1/)
    ("components/compo1/compo1.html", "UI-Components/compo1/compo1.html"),
    ("components/compo1/compo1.png",  "UI-Components/compo1/compo1.png"),
    ("components/compo1/compo2.html", "UI-Components/compo2/compo2.html"),
    ("components/compo1/compo2.png",  "UI-Components/compo2/compo2.png"),
    *[(f"components/compo1/c{n}.html", f"UI-Components/c{n}/c{n}.html") for n in [3,4,5,6,8,9,10,11]],
    *[(f"components/compo1/c{n}.png",  f"UI-Components/c{n}/c{n}.png")  for n in [3,4,5,6,8,9,10,11]],
    # c7 is directly in components/
    ("components/c7.html", "UI-Components/c7/c7.html"),
    ("components/c7.png",  "UI-Components/c7/c7.png"),
    # Page-Templates
    ("Trvel agency/index.html",        "Page-Templates/travel-agency/travel-agency.html"),
    ("Trvel agency/designref.png",     "Page-Templates/travel-agency/travel-agency.png"),
    ("Trvel agency/roundedcorner.html","Page-Templates/travel-agency/roundedcorner.html"),
    # Themes
    *[(f"theme/t{i}.html", f"Themes/t{i}/t{i}.html") for i in range(1,7)],
    *[(f"theme/t{i}.png",  f"Themes/t{i}/t{i}.png")  for i in range(1,7)],
    ("theme-unique/index.html", "Themes/theme-unique/theme-unique.html"),
    ("theme-unique/image.png",  "Themes/theme-unique/theme-unique.png"),
    # Footers
    *[(f"footer/c{n}.html", f"Footers/f{n}/f{n}.html") for n in range(1, 10)],
    *[(f"footer/c{n}.png",  f"Footers/f{n}/f{n}.png")  for n in range(1, 10)],
    # Testimonials
    ("testimonials/1.html", "Testimonials/ts1/ts1.html"),
    ("testimonials/1.png",  "Testimonials/ts1/ts1.png"),
    # Flows-Layouts
    ("Flow/c1.html", "Flows-Layouts/fl1/fl1.html"),
    ("Flow/c1.png",  "Flows-Layouts/fl1/fl1.png"),
]

errors = []
for src_rel, dst_rel in moves:
    src = os.path.join(BASE, src_rel)
    dst = os.path.join(BASE, dst_rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if os.path.exists(src):
        shutil.move(src, dst)
        print(f"  MOVED  {src_rel} → {dst_rel}")
    else:
        errors.append(f"  MISSING {src_rel}")
        print(f"  SKIP (not found): {src_rel}")

# Remove old (now-empty) directories
for old in ["components/compo1", "components", "Trvel agency", "theme", "theme-unique", "footer", "testimonials", "Flow"]:
    old_path = os.path.join(BASE, old)
    if os.path.exists(old_path):
        try:
            shutil.rmtree(old_path)
            print(f"  REMOVED  {old}/")
        except Exception as e:
            print(f"  ERROR REMOVING {old}/: {e}")

if errors:
    print("\n⚠️  Some files were missing:")
    for e in errors:
        print(e)
else:
    print("\n✅ All done — no errors.")

# Print final tree
print("\n=== New structure ===")
for root, dirs, files in os.walk(BASE):
    dirs.sort()
    files.sort()
    level = root.replace(BASE, "").count(os.sep)
    indent = "  " * level
    print(f"{indent}{os.path.basename(root)}/")
    for f in files:
        print(f"{indent}  {f}")
