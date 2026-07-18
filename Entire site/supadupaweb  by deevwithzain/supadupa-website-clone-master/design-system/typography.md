# Typography System

The typography is characterized by massive, screen-filling headlines, tight tracking (letter-spacing), and tight leading (line-height). 

## Font Family
- **Primary Font:** `Bricolage` (used globally via `@font-face` in `globals.css`).
- All text on the platform defaults to this typeface.

## Typography Scale

### Hero & Massive Headers
- **Size:** Extremely dynamic, often utilizing JS to calculate exact viewport width, or hardcoded up to `200px` / `250px`.
- **Weight:** `font-bold`
- **Leading:** `leading-[200px]` (on desktop), scaling down to `leading-[75px]` on mobile.
- **Tracking:** `tracking-tighter` (negative letter spacing).
- *Usage:* Only for the most critical entry text and marquee dividers.

### Primary Section Headings (H1/H2)
- **Size:** `text-[80px]` (Desktop), `text-[40px]` (Mobile).
- **Weight:** `font-bold`
- **Leading:** `leading-[80px]` (Desktop), `leading-none` (Mobile).
- **Tracking:** `tracking-tighter`
- *Usage:* Section titles, slider titles, card titles.

### Subheadings (H3/H4)
- **Size:** `text-[40px]` (Desktop), `text-[27px]` (Mobile).
- **Weight:** `font-medium` to `font-normal`
- **Leading:** `leading-tight`
- **Tracking:** `tracking-tight`

### Body Text & Labels
- **Size:** `text-[24px]` down to `text-[20px]` (Desktop), `text-[18px]` to `text-[16px]` (Mobile).
- **Weight:** `font-normal`
- **Leading:** `leading-normal` to `leading-tight`
- **Tracking:** `tracking-tighter` or `tracking-tight`
- *Usage:* Paragraph descriptions, tiny top-labels for sections.

### Buttons & Navigation
- **Size:** `text-[17px]` to `text-[16px]`.
- **Weight:** `font-semibold`
- **Casing:** `uppercase` or `capitalize`.
- **Tracking:** `tracking-tight`.

## Rhythm and Rules
- **NEVER use browser defaults.**
- **ALWAYS tighten tracking.** Large text must have `tracking-tighter` to create a dense, blocky feel.
- **Line heights must be minimal.** Use `leading-none` or `leading-tight` for headings to ensure multiple lines stack closely together.
- Use line breaks (`<br />`) strategically within `<h2>` elements to force specific typographic compositions rather than relying purely on container widths.
