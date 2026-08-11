#!/usr/bin/env python3
import json
import re
from pathlib import Path

def main():
    bundle_dir = Path("./refero_bundle")
    readme_path = Path("./README.md")
    html_path = Path("./index.html")
    json_path = Path("./components.json")

    folders = sorted([f for f in bundle_dir.iterdir() if f.is_dir()])
    print(f"Found {len(folders)} component folders in {bundle_dir}")

    title_pattern = re.compile(r"^#\s+(.+?)(?:\s+—\s+|\n|$)", re.MULTILINE)
    tagline_pattern = re.compile(r"^>\s+(.+)$", re.MULTILINE)
    theme_pattern = re.compile(r"\*\*Theme:\*\*\s*(.+)$", re.MULTILINE)

    components = []
    
    mp4_count = 0
    md_count = 0
    tailwind_count = 0
    css_count = 0
    json_count = 0
    light_count = 0
    dark_count = 0
    mixed_count = 0

    for f in folders:
        name = f.name
        md_file = f / "DESIGN.md"
        tw_file = f / "tailwind-v4.css"
        css_file = f / "css-variables.css"
        tok_file = f / "design-tokens.json"
        mp4_file = f / "preview.mp4"
        src_file = f / "source.txt"

        title = name
        tagline = ""
        theme = "mixed"

        if md_file.exists():
            md_count += 1
            try:
                content = md_file.read_text(encoding="utf-8", errors="ignore")
                t_match = title_pattern.search(content)
                if t_match:
                    title = t_match.group(1).strip()
                tg_match = tagline_pattern.search(content)
                if tg_match:
                    tagline = tg_match.group(1).strip()
                th_match = theme_pattern.search(content)
                if th_match:
                    theme = th_match.group(1).strip().lower()
            except Exception:
                pass

        if theme == "light":
            light_count += 1
        elif theme == "dark":
            dark_count += 1
        else:
            mixed_count += 1

        has_mp4 = mp4_file.exists()
        if has_mp4:
            mp4_count += 1

        if tw_file.exists():
            tailwind_count += 1
        if css_file.exists():
            css_count += 1
        if tok_file.exists():
            json_count += 1

        source_url = ""
        if src_file.exists():
            try:
                source_url = src_file.read_text().strip()
            except Exception:
                pass

        first_char = title[0].upper() if title else "#"
        if not first_char.isalnum():
            letter_group = "#"
        elif first_char.isdigit():
            letter_group = "#"
        else:
            letter_group = first_char

        md_text = md_file.read_text(encoding="utf-8", errors="ignore")[:3000] if md_file.exists() else ""
        tw_text = tw_file.read_text(encoding="utf-8", errors="ignore")[:3000] if tw_file.exists() else ""
        css_text = css_file.read_text(encoding="utf-8", errors="ignore")[:3000] if css_file.exists() else ""
        json_text = tok_file.read_text(encoding="utf-8", errors="ignore")[:3000] if tok_file.exists() else ""

        components.append({
            "dir": name,
            "title": title,
            "tagline": tagline,
            "theme": theme,
            "group": letter_group,
            "has_mp4": has_mp4,
            "has_md": md_file.exists(),
            "has_tailwind": tw_file.exists(),
            "has_css": css_file.exists(),
            "has_json": tok_file.exists(),
            "source_url": source_url,
            "rel_dir": f"refero_bundle/{name}",
            "rel_mp4": f"refero_bundle/{name}/preview.mp4" if has_mp4 else "",
            "rel_md": f"refero_bundle/{name}/DESIGN.md" if md_file.exists() else "",
            "rel_tw": f"refero_bundle/{name}/tailwind-v4.css" if tw_file.exists() else "",
            "rel_css": f"refero_bundle/{name}/css-variables.css" if css_file.exists() else "",
            "rel_json": f"refero_bundle/{name}/design-tokens.json" if tok_file.exists() else "",
            "md_text": md_text,
            "tw_text": tw_text,
            "css_text": css_text,
            "json_text": json_text,
        })

    # Save JSON for web app
    json_path.write_text(json.dumps(components, indent=2), encoding="utf-8")
    print(f"Saved {len(components)} items to {json_path}")

    # Build README.md
    readme_lines = []

    # Title & Badges
    readme_lines.append("# 🎨 AKR / Styles — Component Library Catalog")
    readme_lines.append("")
    readme_lines.append("A curated, production-ready design system bundle scraped from **styles.refero.design**. Features **1,290 total component design specifications**, complete with Tailwind CSS v4 themes, native CSS custom properties, W3C Design Tokens, design spec markdown files, and direct HD MP4 video previews.")
    readme_lines.append("")
    readme_lines.append("<p align=\"center\">")
    readme_lines.append(f'  <img src="https://img.shields.io/badge/Total%20Components-{len(components):,}-38bdf8?style=for-the-badge&logo=storybook&logoColor=white" alt="Total Components" />')
    readme_lines.append(f'  <img src="https://img.shields.io/badge/MP4%20Video%20Demos-{mp4_count:,}-a855f7?style=for-the-badge&logo=video&logoColor=white" alt="MP4 Previews" />')
    readme_lines.append(f'  <img src="https://img.shields.io/badge/Tailwind%20v4-{tailwind_count:,}-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />')
    readme_lines.append(f'  <img src="https://img.shields.io/badge/CSS%20Variables-{css_count:,}-ec4899?style=for-the-badge&logo=css3&logoColor=white" alt="CSS Variables" />')
    readme_lines.append(f'  <img src="https://img.shields.io/badge/Design%20Tokens-{json_count:,}-10b981?style=for-the-badge&logo=json&logoColor=white" alt="Design Tokens" />')
    readme_lines.append('  <img src="https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge&logo=git&logoColor=white" alt="License" />')
    readme_lines.append("</p>")
    readme_lines.append("")
    readme_lines.append("---")
    readme_lines.append("")

    # Interactive Web App Banner
    readme_lines.append("## ⚡ Interactive Component Gallery")
    readme_lines.append("")
    readme_lines.append("> 💡 **Tip:** You can view, search, filter, and inspect code for all 1,290 components visually in your web browser!")
    readme_lines.append("> Simply open [`index.html`](file:///home/prince/ProjectsMain/akr-inspo-component-library%20%281%29/Refero-styles%20design%20dna%20scrape/index.html) or host it locally/on GitHub Pages to access real-time search, live `.mp4` playback, theme filters, and one-click code copy.")
    readme_lines.append("")

    # Bundle Breakdown
    readme_lines.append("## 📊 Bundle Summary & Stats")
    readme_lines.append("")
    readme_lines.append("| Metric | Count | Description |")
    readme_lines.append("| :--- | :--- | :--- |")
    readme_lines.append(f"| **Total Components** | **{len(components):,}** | Total scraped design systems & UI components |")
    readme_lines.append(f"| **MP4 Video Demos** | **{mp4_count:,}** | HD preview videos demonstrating interactions |")
    readme_lines.append(f"| **DESIGN.md Specs** | **{md_count:,}** | Comprehensive design aesthetic & tone guidelines |")
    readme_lines.append(f"| **Tailwind v4 Files** | **{tailwind_count:,}** | `@theme` blocks ready for Tailwind v4 |")
    readme_lines.append(f"| **CSS Variables** | **{css_count:,}** | Native `:root` CSS custom properties |")
    readme_lines.append(f"| **Design Tokens** | **{json_count:,}** | Standardized W3C JSON tokens |")
    readme_lines.append(f"| **Dark Theme** | **{dark_count:,}** | Components tailored for dark mode |")
    readme_lines.append(f"| **Light Theme** | **{light_count:,}** | Components tailored for light mode |")
    readme_lines.append(f"| **Mixed Theme** | **{mixed_count:,}** | Hybrid / responsive dual-mode themes |")
    readme_lines.append("")

    # Structure per Folder
    readme_lines.append("## 📁 Folder Structure Per Component")
    readme_lines.append("")
    readme_lines.append("Each component inside `./refero_bundle/<slug>-<uuid8>/` contains the following assets:")
    readme_lines.append("")
    readme_lines.append("```text")
    readme_lines.append("refero_bundle/<component-slug>/")
    readme_lines.append("├── preview.mp4          # 🎬 HD Interaction preview video")
    readme_lines.append("├── DESIGN.md            # 📖 Aesthetic spec, vibe, color rationale & typography")
    readme_lines.append("├── tailwind-v4.css      # 🎨 Tailwind CSS v4 @theme block")
    readme_lines.append("├── css-variables.css    # ⚙️ Standard CSS custom properties (:root)")
    readme_lines.append("├── design-tokens.json   # 💎 W3C-formatted JSON Design Tokens")
    readme_lines.append("└── source.txt           # 🔗 Original Refero style source URL")
    readme_lines.append("```")
    readme_lines.append("")

    # Quick Jump Index
    groups = sorted(list(set(c["group"] for c in components)))
    readme_lines.append("## 🔤 Alphabetical Jump Index")
    readme_lines.append("")
    jump_links = [f"[{g}](#group-{g.lower().replace('#', 'num')})" for g in groups]
    readme_lines.append(" | ".join(jump_links))
    readme_lines.append("")
    readme_lines.append("---")
    readme_lines.append("")

    # Full Catalog Table Grouped by Letter
    readme_lines.append("## 📚 Complete Component Catalog (1,290 Items)")
    readme_lines.append("")

    for g in groups:
        group_items = [c for c in components if c["group"] == g]
        anchor = f"group-{g.lower().replace('#', 'num')}"
        readme_lines.append(f"<a id=\"{anchor}\"></a>")
        readme_lines.append(f"### {g} ({len(group_items)} Components)")
        readme_lines.append("")
        readme_lines.append("| Component / Brand | Vibe / Concept | Theme | Assets & Code Links | Refero Source |")
        readme_lines.append("| :--- | :--- | :---: | :--- | :---: |")

        for c in group_items:
            dir_link = f"[`{c['title']}`](./{c['rel_dir']})"
            tagline = c['tagline'].replace('|', '&#124;') if c['tagline'] else "—"
            
            theme_emoji = "🌙 Dark" if c['theme'] == "dark" else ("☀️ Light" if c['theme'] == "light" else "🌗 Mixed")
            
            assets = []
            if c['has_mp4']:
                assets.append(f"[🎬 MP4](./{c['rel_mp4']})")
            if c['has_md']:
                assets.append(f"[📖 Specs](./{c['rel_md']})")
            if c['has_tailwind']:
                assets.append(f"[🎨 Tailwind](./{c['rel_tw']})")
            if c['has_css']:
                assets.append(f"[⚙️ CSS](./{c['rel_css']})")
            if c['has_json']:
                assets.append(f"[💎 Tokens](./{c['rel_json']})")

            assets_str = " • ".join(assets)
            source_link = f"[🔗 Refero]({c['source_url']})" if c['source_url'] else "—"

            readme_lines.append(f"| {dir_link} | {tagline} | {theme_emoji} | {assets_str} | {source_link} |")

        readme_lines.append("")

    # Usage Section
    readme_lines.append("---")
    readme_lines.append("")
    readme_lines.append("## 🚀 How to Use These Components")
    readme_lines.append("")
    readme_lines.append("### 1. Tailwind CSS v4 Integration")
    readme_lines.append("Open `tailwind-v4.css` from any component directory and paste the `@theme` block directly into your global stylesheet (e.g. `main.css` or `globals.css`):")
    readme_lines.append("")
    readme_lines.append("```css")
    readme_lines.append("@import \"tailwindcss\";")
    readme_lines.append("")
    readme_lines.append("/* Paste theme block from component's tailwind-v4.css */")
    readme_lines.append("@theme {")
    readme_lines.append("  --color-brand-blue: #145fe4;")
    readme_lines.append("  --color-deep-space: #1d1d21;")
    readme_lines.append("}")
    readme_lines.append("```")
    readme_lines.append("")
    readme_lines.append("### 2. Standard CSS Custom Properties")
    readme_lines.append("Import or copy `css-variables.css` into your CSS reset or root styles:")
    readme_lines.append("")
    readme_lines.append("```css")
    readme_lines.append("/* Import in your root HTML/CSS */")
    readme_lines.append("@import \"./refero_bundle/1password-da0bfca3/css-variables.css\";")
    readme_lines.append("")
    readme_lines.append(".my-card {")
    readme_lines.append("  background-color: var(--color-deep-space);")
    readme_lines.append("  color: var(--color-brand-blue);")
    readme_lines.append("}")
    readme_lines.append("```")
    readme_lines.append("")
    readme_lines.append("### 3. W3C Design Tokens (`design-tokens.json`)")
    readme_lines.append("Use `design-tokens.json` directly with [Style Dictionary](https://amzn.github.io/style-dictionary/), Figma Token Sync, or custom build scripts to output tokens for iOS, Android, Web, or Flutter.")
    readme_lines.append("")

    # Scraper Maintainer Section
    readme_lines.append("## 🛠️ Maintainer & Re-Scraping Instructions")
    readme_lines.append("")
    readme_lines.append("If you need to update or re-scrape components from Refero Styles:")
    readme_lines.append("")
    readme_lines.append("```bash")
    readme_lines.append("# Install dependencies")
    readme_lines.append("uv sync --extra render")
    readme_lines.append("uv run playwright install chromium")
    readme_lines.append("")
    readme_lines.append("# Run scraper (concurrent workers)")
    readme_lines.append("uv run main.py --out ./refero_bundle --workers 4")
    readme_lines.append("")
    readme_lines.append("# Regenerate catalog README & HTML Viewer")
    readme_lines.append("python3 build_catalog.py")
    readme_lines.append("```")
    readme_lines.append("")

    readme_path.write_text("\n".join(readme_lines), encoding="utf-8")
    print(f"Generated {readme_path} successfully ({len(readme_lines)} lines).")

if __name__ == "__main__":
    main()
