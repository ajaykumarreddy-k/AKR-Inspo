# Hero Component Template

## Purpose
The first impression block. Immersive, bold, and interactive.

## Structure
```tsx
<div className="w-full min-h-screen flex flex-col items-center justify-center padding-x gap-10">
  {/* Navbar Component Here */}
  
  <div className="flex flex-col justify-start w-full">
    {/* Top Label */}
    <h1 className="text-[24px] xm:text-lg sm:text-lg text-accent-primary font-normal leading-tight tracking-tight">
      {topLabel}
    </h1>
    
    {/* JS Resized Massive Typography (The Split Text Reveal) */}
    <span className="flex text-[250px] text-accent-primary font-bold leading-[200px] tracking-tighter mx-auto whitespace-nowrap text-center">
      {/* Map characters to textMaskReveal animation */}
    </span>
  </div>

  <div 
    className="w-full flex flex-col gap-10 relative"
    {/* GSAP Mouse Events attached here */}
  >
    {/* Interactive Media Container */}
    <div className="w-[600px] h-[400px] absolute left-64 rounded-lg">
      <motion.video 
        {/* GSAP Ref target */}
        className="rounded-[30px] w-full h-full object-cover" 
      />
      
      {/* Decorative Rotating Asset */}
      <motion.div variants={infiniteRotate}>
        <Image src={decorIcon} />
      </motion.div>
    </div>

    {/* Animated Divider */}
    <motion.div variants={lineDraw} className="w-full" />
    
    {/* Bottom Content / CTA */}
    <div className="w-full flex justify-between relative">
       {/* Scroll Arrow (Absolute positioned, rotated) */}
       {/* Subtext and Action Links */}
    </div>
  </div>
</div>
```

## Interactions
- **Typography Scale:** A `useEffect` binary search script calculates the max possible `font-size` so the hero text spans exactly 100% of the container width.
- **Magnetic Media:** The central image/video lags behind the user's cursor using GSAP LERP mechanics.

## Replaceable Elements
- Main text, subtext, media source, and decorative icon.
