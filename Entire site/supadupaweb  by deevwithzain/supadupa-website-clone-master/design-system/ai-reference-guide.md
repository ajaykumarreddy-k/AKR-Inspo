# AI Reference Guide: Recreating the Design DNA

When instructed by a user to recreate this visual language in a new project, follow these strict rules to ensure the **Design DNA** is preserved, regardless of the content.

## 1. Do Not Copy Content or Branding
- Do NOT copy the words "SupaDupa", "We are a creative agency", etc.
- Do NOT pull in the exact same images from the `/public` folder of the reference.
- Translate the **user's provided content** into this structure.

## 2. Global Styling Directives
- **Font:** You MUST use the `Bricolage` font (or a heavily geometric, blocky alternative like `Clash Display` if Bricolage isn't available) with extreme tracking (`tracking-tighter`).
- **Colors:** You MUST stick to flat, highly saturated colors. Do NOT use gradients. Use the tokens mapped in `tailwind-theme.ts` or `css-tokens.md`.
- **Shadows:** Do NOT use drop shadows (`shadow-md`, etc.). Use flat block coloring for depth.
- **Corners:** Use large border radii (`rounded-[30px]`) for primary containers.

## 3. Structural Directives
- Every section MUST have generous breathing room (`gap-10`, `py-20`).
- Ensure the `padding-x` logic is applied globally to prevent content touching screen edges.
- Utilize the `w-[72%]` or `w-1/2` flex box layouts to maintain the specific negative space ratio seen in the reference.

## 4. Motion Directives
- **Scroll Linking is Mandatory.** Do not just trigger animations once. Use `framer-motion`'s `useScroll` to tie scale, rotation, and x-translation (for marquees) directly to the scrollbar.
- **Cards Must Stack.** When displaying a list of features, utilize the sticky offset layout detailed in `cards.md`. Alternate the colors!
- **Weight and Easing.** If using GSAP, ensure easing on mouse followers is set to `0.08` so it feels slightly heavy and viscous, not snappy.
- **Hover States.** Ensure standard buttons jar the user slightly with a high-contrast hover state (e.g., lime green turning to bright yellow).

## Process for Generation
1. Read the user's content (e.g., a SaaS landing page about AI).
2. Map their primary headline to the JS-scaled Hero typography component.
3. Map their feature list to the Sticky Stack Cards.
4. Map their secondary features/testimonials to the Swiper component.
5. Apply the color theme and motion primitives.
