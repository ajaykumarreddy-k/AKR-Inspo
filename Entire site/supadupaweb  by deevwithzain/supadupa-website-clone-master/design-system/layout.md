# Layout System

The overarching layout philosophy is built on defined constraints that intentionally break to create visual interest. 

## The Grid
The design system does not use a rigid 12-column CSS Grid. Instead, it relies on Flexbox with explicit width percentages.
- **Main Container:** Most sections center their content and restrict width to `w-[72%]` on desktop.
- **Split Sections:** Content frequently splits into a `w-1/2` flex layout on desktop, collapsing to `w-full flex-col` on mobile.

## Alignment Rules
- Text blocks are strictly left-aligned within their flex containers.
- Hero text is center-aligned but manually adjusted via JS scaling to span edge-to-edge.
- Marquee text is inherently horizontally aligned but uses rotation and absolute positioning for intersecting graphics.

## Sticky Sections
- Sticky layouts are heavily utilized (`sticky top-40`) to create "stacking" effects as the user scrolls down the page. The container holds its position while children animate their scale based on scroll progress.

## Z-Index Hierarchy
- **Navbar:** Must always sit on top with a glassmorphic blur (`z-50 backdrop-blur-[5px]`).
- **Interactive Layers:** Buttons and hover elements require relative positioning and sometimes high z-indexes to ensure hover states fire correctly over underlying canvases.
- **Backgrounds:** Floating animations and parallax backgrounds remain at `z-0` or negative indexes.
