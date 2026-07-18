# Sticky Stacking Cards Template

## Purpose
Used for "How it Works", "Features", or "Services" sections. Creates a tactile scrolling experience.

## Structure (Repeated per Card)
```tsx
{/* Container to track scroll progress */}
<div className="h-auto flex items-center justify-center sticky top-40 w-full xm:top-[10%] sm:top-[10%]">
  
  {/* The Card Element */}
  <motion.div 
    style={{ 
      backgroundColor: cardBgColor, // Alternate these!
      top: `calc(-5vh + ${index * 25}px)` // Stacking offset
    }}
    className="w-full p-20 flex justify-between rounded-[30px] gap-10 relative -top-[45%] h-[800px] transform origin-top xm:flex-col sm:flex-col"
  >
    {/* Left Side: Text */}
    <div className="w-1/2 xm:w-full sm:w-full h-full flex flex-col gap-14 pt-10">
       {/* Labels, Large H2 Headings, Paragraphs */}
    </div>
    
    {/* Right Side: Media (Scale linked to scroll!) */}
    <motion.div 
      className="w-1/2 xm:w-full sm:w-full h-full flex items-center justify-center"
      style={{ scale: scrollMappedScale }} // e.g., useTransform(scrollYProgress, [0, 1], [0.7, 1])
    >
      <Image className="w-[80%] object-cover" />
    </motion.div>
  </motion.div>
</div>
```

## Interactions
- **Sticky Offset:** The container holds at `top-40`. As the next card reaches that threshold, it covers the previous one, but slightly offset by `index * 25px` to show the edge of the card behind it.
- **Scroll Scale:** The image inside the card scales from `0.7` to `1.0` as the specific container scrolls into view.

## Rules
- **Color Cycling:** You MUST alternate background colors drastically between cards (e.g., Pink -> Dark Purple -> Lime Green).
- **Height Constraints:** The card height is usually fixed (e.g., `h-[800px]`) to ensure the stacking rhythm works consistently.
