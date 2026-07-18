# Universal Apply Mode Directives

If a future prompt contains any of the following trigger phrases:
- "Use this template"
- "Apply this design language"
- "Match this reference"
- "Copy animation style"
- "Use the component style"
- "Use this project's motion"
- "Follow template"

## The AI MUST AUTOMATICALLY EXECUTE THE FOLLOWING:

### ✔ KEEP
- Keep the user's new text content.
- Keep the user's branding and logos.
- Keep the user's required functionality (e.g., if it's a dashboard, keep the charts; if it's a form, keep the inputs).
- Keep the user's specific brand colors if explicitly requested (but map them to the contrast rules of this system).

### ✖ REPLACE
- **Layout:** Replace generic grids with the `flex w-[72%]` and `sticky top-40` stacking patterns.
- **Spacing:** Replace all margins/paddings with the generous `padding-x` and `gap-10` rhythm.
- **Motion:** Replace standard CSS transitions with the Framer Motion `useScroll` and GSAP LERP physics.
- **Components:** Replace standard cards with the highly rounded `rounded-[30px]` flat-color variants.
- **Typography:** Replace default fonts with the `tracking-tighter`, massive `leading-none` typographic scaling approach.
- **Interaction:** Add the magnetic mouse follower and text-hover replacement micro-interactions.

### 🚫 STRICTLY PROHIBITED
- Do NOT copy copyrighted assets, SVGs, or specific text paragraphs from the original source.
- Do NOT attempt to build a pixel-perfect clone of the source website; instead, translate the *spirit* and *rules* of the design onto the new layout.
