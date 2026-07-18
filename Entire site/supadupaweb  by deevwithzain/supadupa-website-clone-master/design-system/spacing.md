# Spacing and Layout System

The spatial philosophy of this design relies on generous paddings and distinct, compartmentalized container blocks with rounded corners.

## Global Padding
A global utility class `.padding-x` defines the horizontal breathing room for the entire site:
- **Desktop:** `px-[30px]`
- **Mobile/Tablet:** `px-[20px]`
*Rule: All full-width sections must apply this class to keep content aligned.*

## Container Widths & Grids
- **Standard Constrained Content:** Content within full-width sections often restricts itself to a partial width to create negative space.
  - Desktop: `w-[72%]` or `w-1/2` for split layouts.
  - Mobile: `w-full`.
- **Flex Layouts:** The primary layout tool is Flexbox. Most sections use `flex flex-col` or `flex justify-between items-center`.
- **Gaps:** 
  - Standard spacing between major flex items: `gap-10` (40px).
  - Tighter coupling (text blocks): `gap-2` to `gap-4`.
  - Massive spacing (hero elements): `mt-20`.

## Breakpoints
Custom tailored breakpoints for granular control:
- `xm`: max-width `400px` (Extra Mobile)
- `sm`: `401px` - `768px` (Mobile)
- `md`: `769px` - `1024px` (Tablet)
- `lg`: `1025px` - `1490px` (Desktop)
- `xl`: min-width `1491px` (Large Desktop)
*Rule: The template heavily relies on `xm` and `sm` media queries to radically change layout directions (e.g., `xm:flex-col sm:flex-col`).*

## Shape Language & Borders
- **Border Radius:** `rounded-[30px]` is heavily used for massive container blocks, sliders, and cards. `rounded-[20px]` is used for slightly smaller blocks. `rounded-full` is used for buttons.
- **Borders:** Thin solid borders are used occasionally (`border-[1.5px]`), but the design primarily relies on background color contrast to define edges.
- **Lines:** Dividers are explicitly drawn using `div` elements with height `1px` or animated `borderTopWidth`.
