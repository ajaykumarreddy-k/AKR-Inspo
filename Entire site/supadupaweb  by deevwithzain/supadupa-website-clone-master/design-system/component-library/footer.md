# Footer Component Template

## Purpose
The final impression. Heavy, solid grounding block to anchor the page, utilizing a massive marquee block.

## Structure
```tsx
<div className="w-full flex flex-col gap-10 bg-bg-secondary pt-20 rounded-t-[30px] padding-x relative mt-10">
  
  {/* Pre-Footer Action Area */}
  <div className="w-full flex justify-between items-end border-b-[1px] border-dark-subtle pb-10 xm:flex-col sm:flex-col xm:items-start sm:items-start xm:gap-5 sm:gap-5">
    {/* Large CTA Statement */}
    <h1 className="text-[70px] xm:text-[40px] sm:text-[40px] xm:leading-[40px] sm:leading-[50px] text-accent-tertiary font-bold leading-[70px] tracking-tighter">
      {ctaHeadingLine1} <br /> {ctaHeadingLine2}
    </h1>
    
    {/* Action Links */}
    <div className="flex flex-col gap-3">
       {/* List of anchor tags */}
       <a href="mailto:..." className="text-[25px] xm:text-[20px] sm:text-[20px] text-accent-tertiary font-normal">
          {emailLabel}
       </a>
    </div>
  </div>
  
  {/* Secondary Info Area (Socials, Copyright) */}
  <div className="w-full flex justify-between xm:flex-col sm:flex-col xm:gap-5 sm:gap-5 pb-56">
     {/* Text blocks mapping to font-normal tracking-tight */}
  </div>

  {/* Massive Absolute Positioned Ticker */}
  <div className="w-full absolute bottom-[-5%] overflow-hidden left-0 flex items-center whitespace-nowrap">
    <motion.h1 
      animate={{ x: [0, -1000] }} 
      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      className="text-[300px] xm:text-[150px] sm:text-[150px] text-accent-primary font-bold leading-[250px] xm:leading-[150px] sm:leading-[150px] tracking-tighter opacity-10"
    >
      {massiveBrandTextRepeat}
    </motion.h1>
  </div>
</div>
```

## Interactions
- **Footer Ticker:** An infinite linear scrolling `motion.h1` that bleeds off the bottom of the container. It uses low opacity (`opacity-10`) to serve as a watermark texture.
- **Hover Links:** Standard underlining logic applied to mailto/social links.
