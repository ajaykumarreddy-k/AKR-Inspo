#!/usr/bin/env python3
import json
from pathlib import Path

def generate_index_html():
    json_file = Path("./components.json")
    html_path = Path("./index.html")
    if not json_file.exists():
        print("components.json not found! Run build_catalog.py first.")
        return

    components_data = json_file.read_text(encoding="utf-8")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AKR-Refero — Component Library & Design DNA Catalog (1,290 Styles)</title>
  <meta name="description" content="AKR-Refero Component Library. Curate your design systems into simple collections. Explore 1,290 component styles, complete with MP4 interaction previews, Tailwind v4 themes, CSS variables, and Design Tokens." />

  <!-- Google Sans / Plus Jakarta Sans Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <style>
    :root {{
      --bg-body: #ffffff;
      --bg-hero: #ece5fb;
      --bg-card: #f5f0fe;
      --bg-card-hover: #f0e7fd;
      --bg-pill-active: #eae2f9;
      --bg-arrow: #e5daf9;
      --bg-arrow-hover: #111827;
      --text-main: #000000;
      --text-muted: #6b7280;
      --border-card: #e8dff9;
      --accent-purple: #8b5cf6;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: 'Google Sans Text', 'Google Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #06080d;
      color: var(--text-main);
      line-height: 1.5;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      padding-top: 0;
    }}

    /* Floating Minimalist Dynamic Island Header with Up/Down Controls */
    .dynamic-island-container {{
      position: fixed;
      top: 1.25rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.25rem;
      background: #000000;
      color: #ffffff;
      padding: 0.5rem 1.5rem;
      border-radius: 999px;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.15);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }}

    .dynamic-island-container:hover {{
      transform: translateX(-50%) scale(1.02);
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6);
      border-color: rgba(255, 255, 255, 0.3);
    }}

    .island-brand {{
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #ffffff;
      text-decoration: none;
      display: flex;
      align-items: center;
    }}

    .island-nav-group {{
      display: flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(255, 255, 255, 0.12);
      padding: 0.2rem 0.45rem;
      border-radius: 999px;
    }}

    .island-nav-btn {{
      background: transparent;
      border: none;
      color: #94a3b8;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }}

    .island-nav-btn:hover {{
      background: #ffffff;
      color: #000000;
    }}

    /* Main Container (With Large Bottom Corner Radius) */
    main {{
      width: 100%;
      margin: 0;
      padding: 0 0 5rem 0;
      position: relative;
      z-index: 2;
      background: var(--bg-body);
      border-radius: 0 0 56px 56px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
    }}

    /* Full-Width Edge-to-Edge Hero Banner Section */
    .hero-section {{
      width: 100%;
      background: var(--bg-hero);
      border-radius: 0 0 44px 44px;
      min-height: 80vh;
      padding: 5rem 2rem;
      text-align: center;
      margin-bottom: 3.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }}

    .hero-heading {{
      font-size: 3.75rem;
      font-weight: 700;
      letter-spacing: -0.045em;
      line-height: 1.08;
      max-width: 850px;
      margin: 0 auto 1.5rem auto;
      color: #000000;
    }}

    @media (max-width: 768px) {{
      .hero-heading {{ font-size: 2.25rem; }}
      .content-wrapper {{ padding: 0 1.25rem; }}
    }}

    .hero-desc {{
      font-size: 1.15rem;
      font-weight: 400;
      color: #4b5563;
      max-width: 650px;
      margin: 0 auto 2.5rem auto;
      line-height: 1.5;
    }}

    /* Search Box */
    .search-wrapper {{
      position: relative;
      width: 100%;
      max-width: 580px;
      margin: 0 auto 1.75rem auto;
    }}

    .search-input {{
      width: 100%;
      padding: 1.1rem 1.5rem 1.1rem 3.2rem;
      background: #ffffff;
      border: 1px solid var(--border-card);
      border-radius: 999px;
      font-size: 1rem;
      color: #000000;
      outline: none;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
      transition: all 0.2s ease;
    }}

    .search-input:focus {{
      box-shadow: 0 12px 28px rgba(139, 92, 246, 0.18);
    }}

    .search-icon {{
      position: absolute;
      left: 1.25rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      pointer-events: none;
      display: flex;
      align-items: center;
    }}

    /* SVG Icon Filter Pills */
    .tag-pills {{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.65rem;
      max-width: 900px;
    }}

    .pill-btn {{
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.55rem 1.25rem;
      border-radius: 999px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.06);
      color: #374151;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }}

    .pill-btn svg {{
      transition: stroke 0.2s ease;
    }}

    .pill-btn:hover {{
      background: #000000;
      color: #ffffff;
      border-color: #000000;
    }}

    .pill-btn.active {{
      background: #000000;
      color: #ffffff;
      border-color: #000000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }}

    /* Grid Section Content Wrapper */
    .content-wrapper {{
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 2.5rem;
    }}

    /* 3-Column Collection Cards Grid */
    .cards-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 2rem;
    }}

    .card-item {{
      background: var(--bg-card);
      border-radius: 28px;
      padding: 2.5rem 2.25rem 2.25rem 2.25rem;
      display: flex;
      flex-direction: column;
      position: relative;
      min-height: 420px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      overflow: hidden;
    }}

    .card-item:hover {{
      background: var(--bg-card-hover);
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(139, 92, 246, 0.08);
    }}

    .card-title-heading {{
      font-size: 3rem;
      font-weight: 700;
      letter-spacing: -0.045em;
      color: #000000;
      line-height: 1;
      margin-bottom: 1.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 2;
    }}

    .card-graphic-area {{
      width: 100%;
      height: 220px;
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: auto;
      margin-bottom: 1.5rem;
      position: relative;
    }}

    .card-graphic-area video {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 20px;
    }}

    .no-video-placeholder {{
      color: #6b7280;
      font-size: 0.85rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
    }}

    .card-bottom-bar {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      z-index: 2;
    }}

    .tagline-subtext {{
      font-size: 0.85rem;
      color: var(--text-muted);
      max-width: 75%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }}

    .arrow-circle-btn {{
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bg-arrow);
      color: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: all 0.25s ease;
      margin-left: auto;
    }}

    .card-item:hover .arrow-circle-btn {{
      background: #000000;
      color: #ffffff;
      transform: rotate(45deg) scale(1.08);
    }}

    /* Infinite Scroll Loading Indicator */
    .infinite-scroll-loader {{
      text-align: center;
      padding: 3.5rem 0 1rem 0;
      font-size: 0.95rem;
      font-weight: 600;
      color: #6b7280;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }}

    .spinner {{
      width: 22px;
      height: 22px;
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-top-color: #000000;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }}

    @keyframes spin {{
      to {{ transform: rotate(360deg); }}
    }}

    /* Refined Inspector Modal */
    .modal-backdrop {{
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(12px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }}

    .modal-backdrop.open {{
      opacity: 1;
      pointer-events: auto;
    }}

    .modal-card {{
      width: 100%;
      max-width: 980px;
      max-height: 90vh;
      background: #ffffff;
      border-radius: 32px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
      transform: scale(0.96);
      transition: transform 0.25s ease;
    }}

    .modal-backdrop.open .modal-card {{
      transform: scale(1);
    }}

    .modal-header {{
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #faf8ff;
    }}

    .modal-title-text {{
      font-size: 1.35rem;
      font-weight: 800;
      color: #000000;
      letter-spacing: -0.03em;
    }}

    .modal-close-btn {{
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #e2e8f0;
      border: none;
      color: #000000;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }}

    .modal-close-btn:hover {{
      background: #000000;
      color: #ffffff;
    }}

    .modal-tabs-row {{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #faf8ff;
      border-bottom: 1px solid #f1f5f9;
      padding: 0.75rem 1.75rem;
      overflow-x: auto;
      white-space: nowrap;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }}

    .modal-tabs-row::-webkit-scrollbar {{
      display: none;
    }}

    .modal-tab {{
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.15rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: #475569;
      border: 1px solid transparent;
      background: transparent;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }}

    .modal-tab:hover {{
      background: #ffffff;
      color: #000000;
      border-color: rgba(0, 0, 0, 0.08);
    }}

    .modal-tab.active {{
      background: #000000;
      color: #ffffff;
      border-color: #000000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }}

    .modal-body {{
      padding: 2rem;
      overflow-y: auto;
      flex: 1;
    }}

    .player-container {{
      width: 100%;
      border-radius: 20px;
      overflow: hidden;
      background: #000;
      max-height: 480px;
    }}

    .player-container video {{
      width: 100%;
      height: 100%;
      display: block;
    }}

    .code-box {{
      position: relative;
      background: #0f172a;
      padding: 1.5rem;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-height: 60vh;
      overflow-y: auto;
    }}

    .code-box pre code {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
      color: #f1f5f9;
      display: block;
      white-space: pre-wrap;
      word-break: break-word;
    }}

    .btn-copy {{
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.45rem 1rem;
      font-size: 0.775rem;
      border-radius: 999px;
      background: #ffffff;
      color: #000000;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }}

    .btn-copy:hover {{
      opacity: 0.9;
    }}

    /* Giant Sticky Lock Footer (With Increased Corner Radius & Larger Scale) */
    footer {{
      background: #06080d;
      color: #ffffff;
      padding: 8rem 3.5rem 4.5rem 3.5rem;
      margin-top: 0;
      border-radius: 56px 56px 0 0;
      position: sticky;
      bottom: 0;
      z-index: 1;
      min-height: 65vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    .footer-content {{
      max-width: 1440px;
      margin: 0 auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5rem;
    }}

    .footer-giant-title {{
      font-size: clamp(4.5rem, 14vw, 12rem);
      font-weight: 900;
      letter-spacing: -0.05em;
      line-height: 0.82;
      color: #ffffff;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      user-select: none;
    }}

    .footer-copyright-icon {{
      font-size: clamp(2rem, 5vw, 4.5rem);
      font-weight: 400;
      margin-left: 1.5rem;
      opacity: 0.85;
    }}

    .footer-bottom-bar {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1.75rem;
      padding-top: 2.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      color: #94a3b8;
      font-size: 0.95rem;
    }}

    .footer-links {{
      display: flex;
      gap: 1.75rem;
      flex-wrap: wrap;
    }}

    .footer-link-item {{
      color: #94a3b8;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
      cursor: pointer;
    }}

    .footer-link-item:hover {{
      color: #ffffff;
    }}
  </style>
</head>
<body>

  <!-- Floating Minimalist Dynamic Island Header with Up/Down Navigation Controls -->
  <div class="dynamic-island-container">
    <a href="#" class="island-brand">
      <span>Akr-Refero</span>
    </a>

    <div class="island-nav-group">
      <button class="island-nav-btn" onclick="window.scrollTo({{top: 0, behavior: 'smooth'}})" title="Scroll to Top (▲)">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
      <button class="island-nav-btn" onclick="document.querySelector('footer').scrollIntoView({{behavior: 'smooth'}})" title="Scroll to Footer (▼)">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>
  </div>

  <!-- Main Container (With Large Bottom Corner Radius) -->
  <main>
    <!-- Full-Width Edge-to-Edge Hero Section (0 Margin Top, Spans Left to Right 100%) -->
    <div class="hero-section">
      <h1 class="hero-heading">Curate your design systems into simple collections.</h1>

      <p class="hero-desc">
        Explore 1,290 component design specifications, complete with HD MP4 interaction previews, Tailwind CSS v4 themes, CSS custom properties, and W3C Design Tokens.
      </p>

      <!-- Search Box inside Hero -->
      <div class="search-wrapper">
        <span class="search-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <input type="text" id="searchInput" class="search-input" placeholder="Search 1,290 collections by title, tag, or theme..." />
      </div>

      <!-- SVG Icon Filter Bar -->
      <div class="tag-pills" id="tagPills">
        <button class="pill-btn active" data-filter="all">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg>
          <span>All Styles</span>
        </button>

        <button class="pill-btn" data-filter="video">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="3"/></svg>
          <span>With Video</span>
        </button>

        <button class="pill-btn" data-filter="dark">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <span>Dark Mode</span>
        </button>

        <button class="pill-btn" data-filter="light">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
          <span>Light Mode</span>
        </button>

        <button class="pill-btn" data-filter="mixed">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>Mixed</span>
        </button>

        <button class="pill-btn" data-filter="minimal">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
          <span>Minimal</span>
        </button>

        <button class="pill-btn" data-filter="saas">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          <span>Clean SaaS</span>
        </button>

        <button class="pill-btn" data-filter="brutal">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.38-.43-.6-.98-.6-1.58 0-1.38 1.12-2.5 2.5-2.5H18c2.21 0 4-1.79 4-4 0-4.97-4.48-9-10-9z"/></svg>
          <span>Brutal</span>
        </button>
      </div>
    </div>

    <!-- Cards Grid Content Wrapper -->
    <div class="content-wrapper">
      <!-- 3-Column Collection Cards Grid -->
      <div class="cards-grid" id="cardsGrid"></div>

      <!-- Infinite Scroll Loader -->
      <div class="infinite-scroll-loader" id="infiniteLoader">
        <div class="spinner"></div>
        <span>Loading more collections...</span>
      </div>
    </div>
  </main>

  <!-- Giant Sticky Lock Footer (Matching Reference Image) -->
  <footer>
    <div class="footer-content">
      <div class="footer-giant-title">
        <span>AKR-Refero</span>
        <span class="footer-copyright-icon">©</span>
      </div>

      <div class="footer-bottom-bar">
        <div>1,290 Scraped Component Design Systems • HD MP4 Interaction Previews</div>

        <div class="footer-links">
          <a href="#" class="footer-link-item" onclick="window.scrollTo({{top:0, behavior:'smooth'}}); return false;">Top ↑</a>
          <span class="footer-link-item" onclick="document.getElementById('searchInput').focus()">Search</span>
          <span class="footer-link-item">Tailwind v4</span>
          <span class="footer-link-item">CSS Variables</span>
          <span class="footer-link-item">Design Tokens</span>
        </div>

        <div>© 2026 AKR-Refero Library. All rights reserved.</div>
      </div>
    </div>
  </footer>

  <!-- Refined Inspector Modal -->
  <div class="modal-backdrop" id="modalBackdrop">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title-text" id="modalTitle">Collection Detail</div>
        <button class="modal-close-btn" id="modalClose" title="Close Modal">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="modal-tabs-row" id="modalTabs">
        <button class="modal-tab active" data-modaltab="video">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="3"/></svg>
          <span>MP4 Video</span>
        </button>

        <button class="modal-tab" data-modaltab="md">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <span>DESIGN.md Spec</span>
        </button>

        <button class="modal-tab" data-modaltab="tw">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span>Tailwind v4</span>
        </button>

        <button class="modal-tab" data-modaltab="css">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
          <span>CSS Variables</span>
        </button>

        <button class="modal-tab" data-modaltab="json">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          <span>Design Tokens</span>
        </button>
      </div>

      <div class="modal-body" id="modalBody"></div>
    </div>
  </div>

  <!-- JavaScript App Logic -->
  <script>
    const COMPONENTS = {components_data};

    let filteredComponents = [...COMPONENTS];
    let currentPage = 1;
    const pageSize = 36;
    let activeFilter = 'all';
    let isLoadingMore = false;

    const cardsGrid = document.getElementById('cardsGrid');
    const searchInput = document.getElementById('searchInput');
    const tagPills = document.getElementById('tagPills');
    const infiniteLoader = document.getElementById('infiniteLoader');

    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalTitle = document.getElementById('modalTitle');
    const modalTabs = document.getElementById('modalTabs');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    let currentItem = null;
    let currentModalTab = 'video';

    function renderGrid(append = false) {{
      if (!append) cardsGrid.innerHTML = '';

      const start = (currentPage - 1) * pageSize;
      const end = currentPage * pageSize;
      const slice = filteredComponents.slice(start, end);

      if (slice.length === 0 && !append) {{
        cardsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 5rem 1rem; color: #6b7280;">
          <h3 style="font-size:1.5rem; font-weight:700; margin-bottom:0.5rem; color:#000;">No collections found</h3>
          <p>Try searching for another keyword or filter tag.</p>
        </div>`;
        infiniteLoader.style.display = 'none';
        return;
      }}

      slice.forEach(item => {{
        const card = document.createElement('div');
        card.className = 'card-item';
        card.onclick = () => openInspector(item.dir, 'video');

        let videoHTML = '';
        if (item.has_mp4) {{
          videoHTML = `<video src="${{item.rel_mp4}}" muted loop playsinline onmouseenter="this.play()" onmouseleave="this.pause()"></video>`;
        }} else {{
          videoHTML = `<div class="no-video-placeholder"><span>🎥</span><span>No Video Demo</span></div>`;
        }}

        card.innerHTML = `
          <div class="card-title-heading">${{item.title}}</div>

          <div class="card-graphic-area">
            ${{videoHTML}}
          </div>

          <div class="card-bottom-bar">
            <div class="tagline-subtext">${{item.tagline || 'Curated design collection'}}</div>
            <button class="arrow-circle-btn" title="View Collection Details">↗</button>
          </div>
        `;

        cardsGrid.appendChild(card);
      }});

      if (end >= filteredComponents.length) {{
        infiniteLoader.style.display = 'none';
      }} else {{
        infiniteLoader.style.display = 'flex';
      }}
    }}

    function applyFilters() {{
      const query = searchInput.value.toLowerCase().trim();

      filteredComponents = COMPONENTS.filter(item => {{
        const matchesQuery = !query || 
          item.title.toLowerCase().includes(query) || 
          (item.tagline && item.tagline.toLowerCase().includes(query)) || 
          item.dir.toLowerCase().includes(query);

        let matchesFilter = true;
        if (activeFilter === 'video') matchesFilter = item.has_mp4;
        else if (activeFilter === 'dark') matchesFilter = item.theme === 'dark';
        else if (activeFilter === 'light') matchesFilter = item.theme === 'light';
        else if (activeFilter === 'mixed') matchesFilter = item.theme === 'mixed';
        else if (activeFilter === 'minimal') matchesFilter = (item.tagline && item.tagline.toLowerCase().includes('minimal')) || item.theme === 'light';
        else if (activeFilter === 'saas') matchesFilter = item.tagline && (item.tagline.toLowerCase().includes('saas') || item.tagline.toLowerCase().includes('clean'));
        else if (activeFilter === 'brutal') matchesFilter = item.tagline && (item.tagline.toLowerCase().includes('poster') || item.tagline.toLowerCase().includes('bold'));

        return matchesQuery && matchesFilter;
      }});

      currentPage = 1;
      renderGrid(false);
    }}

    searchInput.addEventListener('input', applyFilters);

    tagPills.addEventListener('click', (e) => {{
      const pill = e.target.closest('.pill-btn');
      if (!pill) return;
      tagPills.querySelectorAll('.pill-btn').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      applyFilters();
    }});

    // Infinite Scroll Event Listener
    window.addEventListener('scroll', () => {{
      if (isLoadingMore) return;
      const scrollPos = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 700;

      if (scrollPos >= threshold) {{
        const maxPages = Math.ceil(filteredComponents.length / pageSize);
        if (currentPage < maxPages) {{
          isLoadingMore = true;
          currentPage++;
          renderGrid(true);
          setTimeout(() => {{ isLoadingMore = false; }}, 250);
        }}
      }}
    }});

    // Modal Inspector Functions with Zero-Latency Inline Fallback & Formatting
    async function openInspector(dir, tab = 'video') {{
      currentItem = COMPONENTS.find(c => c.dir === dir);
      if (!currentItem) return;

      modalTitle.innerText = `${{currentItem.title}} Collection`;
      currentModalTab = tab;

      modalTabs.querySelectorAll('.modal-tab').forEach(t => {{
        t.classList.toggle('active', t.dataset.modaltab === tab);
      }});

      await loadModalContent();
      modalBackdrop.classList.add('open');
    }}

    async function loadModalContent() {{
      if (!currentItem) return;

      if (currentModalTab === 'video') {{
        if (currentItem.has_mp4) {{
          modalBody.innerHTML = `
            <div class="player-container">
              <video src="${{currentItem.rel_mp4}}" controls autoplay loop></video>
            </div>
            <div style="margin-top: 1.25rem; color: #475569; font-size: 0.9rem; line-height: 1.6;">
              <strong style="color:#000;">Concept Tagline:</strong> ${{currentItem.tagline || 'N/A'}}<br>
              <strong style="color:#000;">Refero Catalog Link:</strong> <a href="${{currentItem.source_url}}" target="_blank" style="color: #8b5cf6;">${{currentItem.source_url}}</a>
            </div>
          `;
        }} else {{
          modalBody.innerHTML = `<div style="text-align: center; padding: 4rem; color: #64748b;">No video preview available for this collection.</div>`;
        }}
        return;
      }}

      // Instant Zero-Latency Embedded Snippet Lookup with Formatting
      let text = '';
      if (currentModalTab === 'md') text = currentItem.md_text || '';
      else if (currentModalTab === 'tw') text = currentItem.tw_text || '';
      else if (currentModalTab === 'css') text = currentItem.css_text || '';
      else if (currentModalTab === 'json') {{
        text = currentItem.json_text || '';
        try {{
          text = JSON.stringify(JSON.parse(text), null, 2);
        }} catch(e) {{}}
      }}

      if (text) {{
        modalBody.innerHTML = `
          <div class="code-box">
            <button class="btn-copy" onclick="copySnippet()">Copy Snippet</button>
            <pre><code id="snippetText">${{escapeHtml(text)}}</code></pre>
          </div>
        `;
        return;
      }}

      // Fallback via fetch if embedded text is missing
      let relFile = '';
      if (currentModalTab === 'md') relFile = currentItem.rel_md;
      else if (currentModalTab === 'tw') relFile = currentItem.rel_tw;
      else if (currentModalTab === 'css') relFile = currentItem.rel_css;
      else if (currentModalTab === 'json') relFile = currentItem.rel_json;

      if (!relFile) {{
        modalBody.innerHTML = '<div style="color: #64748b;">File not available.</div>';
        return;
      }}

      try {{
        const resp = await fetch(relFile);
        if (!resp.ok) throw new Error('File load failed');
        let fetchedText = await resp.text();
        if (currentModalTab === 'json') {{
          try {{ fetchedText = JSON.stringify(JSON.parse(fetchedText), null, 2); }} catch(e) {{}}
        }}

        modalBody.innerHTML = `
          <div class="code-box">
            <button class="btn-copy" onclick="copySnippet()">Copy Snippet</button>
            <pre><code id="snippetText">${{escapeHtml(fetchedText)}}</code></pre>
          </div>
        `;
      }} catch (err) {{
        modalBody.innerHTML = `<div style="color: #64748b; padding: 2rem;">Snippet preview available in files: ${{relFile}}</div>`;
      }}
    }}

    function escapeHtml(str) {{
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }}

    function copySnippet() {{
      const code = document.getElementById('snippetText')?.innerText;
      if (code) {{
        navigator.clipboard.writeText(code);
        alert('Copied snippet to clipboard!');
      }}
    }}

    modalTabs.addEventListener('click', async (e) => {{
      const tab = e.target.closest('.modal-tab');
      if (!tab) return;
      modalTabs.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentModalTab = tab.dataset.modaltab;
      await loadModalContent();
    }});

    modalClose.addEventListener('click', () => modalBackdrop.classList.remove('open'));
    modalBackdrop.addEventListener('click', (e) => {{
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('open');
    }});

    // Initial load
    renderGrid();
  </script>
</body>
</html>
"""

    html_path.write_text(html_content, encoding="utf-8")
    print(f"Generated Sticky Footer + Increased Corner Radius web gallery {html_path} successfully!")

if __name__ == "__main__":
    generate_index_html()
