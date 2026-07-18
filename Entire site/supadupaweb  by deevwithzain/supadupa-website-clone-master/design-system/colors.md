# Color System

This design relies on a bold, high-contrast palette. It mixes deep, grounded darks with vibrant, almost neon accents to create a modern, slightly brutalist but premium feel.

## Base Palette

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `background-dark` | `#163300` | Primary application background (Deep Forest Green). Used for main body and dark sections. |
| `background-alt` | `#260A2F` | Secondary dark background (Deep Purple). Used for footers, sliders, and alternating dark sections. |

## Accents & Highlights

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `accent-primary` | `#9FE870` | Primary CTA, primary highlights, text color against dark backgrounds (Neon Lime). |
| `accent-secondary`| `#FFC091` | Secondary CTA, secondary text highlights (Soft Peach/Orange). |
| `accent-tertiary` | `#FFD7EF` | Soft backgrounds, slider backgrounds, contrasting elements (Soft Pink). |
| `hover-highlight` | `#FFEB69` | Active/Hover state for buttons and interactive elements (Bright Yellow). |

## Surface Colors (Cards & Sections)

The "What We Do" sticky cards cycle through specific color combinations:
1. Card 1: Bg `#9FE870`, Text `#260A2F`
2. Card 2: Bg `#260A2F`, Text `#9FE870`
3. Card 3: Bg `#FFC091`, Text `#260A2F`
4. Card 4: Bg `#FFD7EF`, Text `#260A2F`

## Transparency

- `dark-subtle`: `rgba(255, 255, 255, 0.5)` - Used for subtle dividers or faded text on dark backgrounds.
- `light-subtle`: `rgba(39, 39, 39, 0.5)` - Used for subtle dividers or faded text on light backgrounds.
- **Glassmorphism:** Used sparingly on the Navbar (`backdrop-blur-[5px]`).

## Rules

- **NEVER use gradients.** Backgrounds and elements must be flat, solid colors.
- **ALWAYS ensure extreme contrast.** If the background is dark (e.g., `#163300`), text should be a bright accent (e.g., `#9FE870`).
- **Hover states should pop.** Use `#FFEB69` for a jarring, noticeable change on hover for navigation elements and arrows.
