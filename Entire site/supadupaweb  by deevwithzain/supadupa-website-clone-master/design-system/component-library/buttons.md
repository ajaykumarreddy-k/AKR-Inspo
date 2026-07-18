# Button & Micro-Interactions Template

## Purpose
Standard interactive elements designed to feel premium and kinetic.

## Text Hover Component (`text-hover.tsx`)
This creates the effect where hovering over a word rapidly pushes out the old characters and slides in new ones.

### Structure
```tsx
<div 
  onMouseEnter={() => setIsHovered(true)} 
  onMouseLeave={() => setIsHovered(false)}
  className="relative overflow-hidden cursor-pointer"
>
  <AnimatedWord title={title1} isHovered={isHovered} />
  <div className="absolute top-0">
    <AnimatedWord title={title2} isHovered={isHovered} />
  </div>
</div>
```
*Note: Inner `AnimatedWord` components map over the letters, applying slight staggered delays using Framer Motion.*

## Standard Pill Buttons
Used in navigation and forms.

```tsx
<button className="text-[17px] font-semibold uppercase text-bg-secondary bg-accent-primary hover:bg-interaction-hover transition-all duration-200 ease-linear rounded-full leading-tight tracking-tight px-6 py-3">
  {text}
</button>
```

## Custom Slider Controls
```tsx
<div className="bg-accent-primary hover:bg-interaction-hover transition-all duration-200 ease-linear cursor-pointer px-3 py-2 rounded-[30px]">
  <Image src={arrowIcon} width={55} height={55} />
</div>
```
