# Animation System

Animation is the core of this template's identity. It uses a combination of Framer Motion for scroll/reveal logic and GSAP for complex physics (like mouse tracking).

## Animation Philosophy
- **Fluid & Viscous:** Animations should feel smooth but heavy. Easing is usually `ease: [0.76, 0, 0.24, 1]` or standard `easeInOut`.
- **Scroll-Linked:** Almost all entrance animations are triggered `whileInView`, and many structural animations are directly linked to scroll progress.
- **Magnetic/Interactive:** The hero section employs a physics-based mouse follower, creating a sense of weight and drag.

## Reusable Animation Primitives

### `revealMask()`
- **Action:** Text lines masking in from the bottom up.
- **Config:** `initial={{ y: "100%" }}`, `whileInView={{ y: 0 }}`, `transition={{ delay: stagger, duration: 1, ease: [0.4, 0, 0.2, 1] }}`

### `navDrop()`
- **Action:** Navbar dropping down from the top of the screen on load.
- **Config:** `initial: { y: "-100%" }`, `animate: { y: 0 }`, `transition: { ease: [0.76, 0, 0.24, 1], duration: 1 }`

### `magneticFollow()`
- **Action:** An element smoothly lagging behind mouse movement using Linear Interpolation (LERP).
- **Implementation:** GSAP `requestAnimationFrame` loop tracking `movementX` and `movementY` with a specific friction/easing value (`0.08`).

### `continuousRotate()`
- **Action:** Infinite slow rotation for decorative floating objects.
- **Config:** `animate={{ rotate: [-360, 360] }}`, `transition={{ repeat: Infinity, duration: 20, ease: "linear" }}`

### `stickyStackScale()`
- **Action:** A card scales up slightly as it becomes sticky on scroll.
- **Implementation:** Framer Motion `useScroll` target container, mapped via `useTransform(scrollYProgress, [0, 1], [0.7, 1])`.

### `lineDraw()`
- **Action:** A horizontal border line drawing itself from left to right.
- **Config:** `initial={{ width: "0%" }}`, `whileInView={{ width: "100%", origin: "left" }}`, `transition={{ duration: 0.8 }}`

### `marqueeScroll()`
- **Action:** Text scrolling horizontally based on vertical page scroll.
- **Implementation:** `useTransform(scrollYProgress, [0, 1], [200, -1000])` applied to the `x` property.
