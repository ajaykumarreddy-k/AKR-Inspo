# Design Patterns

This document outlines the recurring visual and architectural patterns found throughout the template. 
When building new sections, you must adhere to these structural rules to maintain the Design DNA.

## 1. Full-Viewport Immersive Sections
- **DO:** Make hero and major transition sections take up `min-h-screen`.
- **DO:** Use large, bold, screen-filling typography for primary headings.
- **DO NOT:** Cramp content at the top of the page. Allow generous breathing room (`gap-10`, `pt-20`).
- **Pattern:** `w-full min-h-screen flex flex-col items-center justify-center padding-x gap-10`

## 2. The Alternating "Sticky Stack" Layout
- **Pattern:** Sections that explain steps, features, or processes (e.g., `wwd-cards.tsx`) should stack on top of each other dynamically as the user scrolls.
- **Behavior:** The container is marked as `sticky top-40` (or `top-[10%]`), with inner cards transforming their scale (`0.7` to `1`) based on `framer-motion`'s `useScroll` progress.
- **Visuals:** Alternate background and text colors drastically between stacked cards to create high contrast and visual rhythm.

## 3. Carousel and Horizontal Flow
- **Pattern:** For content like testimonials, collaborations, or secondary features, use a horizontal swipe layout (via `Swiper`).
- **Controls:** Custom navigation buttons should be large, pill-shaped or circular, filled with a contrasting accent color (e.g., `#9fe870` or `#FFD7EF`), and scale/color shift on hover.
- **Spacing:** Ensure horizontal sliders bleed off the edge slightly or have generous padding (`padding-x`, `spaceBetween={30}`).

## 4. Marquee Separators
- **Pattern:** Use infinite scrolling text (`marquee.tsx`) as a divider between distinct logical sections of the page.
- **Behavior:** The marquee should scroll horizontally linked to the vertical scroll position (`useTransform` mapping `scrollYProgress` to `x: [200, -1000]`).
- **Additions:** Include rotating graphical assets (like a star or polygon) between the repeating text blocks to add kinetic energy.

## 5. Floating Interactive Elements
- **Pattern:** Decorative elements (like `collaborationCircle` or `heroCircle`) should float in absolute positions.
- **Behavior:** Apply an infinite continuous rotation to these elements (`animate={{ rotate: [-360, 360] }}`, `duration: 20`, `ease: "linear"`).
- **Visibility:** Hide these small decorative elements on mobile (`xm:hidden sm:hidden`) to reduce clutter.

## 6. Granular Micro-interactions
- **Links:** All text links should have a custom animated underline (usually a `div` with height `1px` below the text).
- **Hover States:** Buttons and interactive cards should have swift transition times (`duration-200` or `duration-300`, `ease-linear`) changing backgrounds to bright highlights (e.g., `#FFEB69`).

## 7. Fluid Typography Scaling
- **Pattern:** Hero headers shouldn't just rely on CSS media queries; they use JS-based dynamic scaling (binary search algorithm for font-size) to perfectly fit the container width.

## DOs and DON'Ts
- **DO** use highly saturated, bold contrasting colors (Dark Green vs Neon Green vs Pink).
- **DO** rely heavily on scroll-linked animations.
- **DO** use absolute positioning to overlap images and text slightly to break the grid.
- **DO NOT** use subtle drop shadows. Keep elements flat and high-contrast (Brutalist leaning).
- **DO NOT** use gradients for backgrounds. Stick to solid, bold color blocks.
