# Component Library

The components in this design system are large, monolithic blocks rather than atomic fragments. This ensures the structural rhythm of the page remains intact.

## Available Component Templates

1. **[Hero (`hero.md`)](./component-library/hero.md)**
   - Massive typography scaling via JS.
   - Magnetic mouse tracking (GSAP) on center media.
   - Staggered text reveals.

2. **[Sticky Stack Cards (`cards.md`)](./component-library/cards.md)**
   - Framer Motion scroll-linked scaling.
   - Fixed sticky positioning.
   - Alternating high-contrast color palettes.

3. **[Navbar (`navbar.md`)](./component-library/navbar.md)**
   - Glassmorphic top bar.
   - Dropdown reveal animation.
   - Accent-colored pills.

4. **[Buttons (`buttons.md`)](./component-library/buttons.md)**
   - Text hover micro-interactions (staggered letter replacement).
   - Solid, rounded-full pill shapes.

5. **[Footer (`footer.md`)](./component-library/footer.md)**
   - Large scrolling ticker.
   - Bold background block.

## How to use
When adapting this template for a new project, wrap the new text/image content within these structural component templates. Do not break the `flex` or `padding-x` constraints unless explicitly required by the new content structure.
