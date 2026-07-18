# Motion Guidelines

This document details the exact parameters and timings for motion to ensure the DNA is preserved across any application.

## Timings
- **Slow & Deliberate:** Major structural reveals take `1s` (1000ms).
- **Snappy Micro-interactions:** Button hovers, arrow shifts, and color transitions take `0.2s` to `0.3s`.
- **Staggers:** Text reveals should stagger their children tightly, e.g., `delay: i * 0.08`.

## Easing Curves
- **The "Supadupa" Curve:** `[0.76, 0, 0.24, 1]` (Used for Nav drops, page slides, major structural shifts).
- **The "Reveal" Curve:** `[0.4, 0, 0.2, 1]` (Used for text and image masking reveals).
- **Linear:** `ease: "linear"` (Strictly reserved for infinite looping background shapes).

## Physics (GSAP LERP)
When applying the magnetic mouse follow effect to an element (like a hero image/video):
- **Speed Multiplier:** `0.01` (Applied to delta mouse movement).
- **Friction/Easing:** `0.08` (Determines how quickly the element catches up to the target).
- **Reset Logic:** When the mouse leaves the area, immediately tween back to `x: 0, y: 0` over `0.5s` using `power3.out`.

## Scroll Tracking
- Always use Framer Motion's `useScroll` with `offset: ["start end", "end start"]` (or `"start start"`) to link element positions directly to the user's scrollbar. This creates a tactile, connected feeling that standard scroll-triggering cannot achieve.
