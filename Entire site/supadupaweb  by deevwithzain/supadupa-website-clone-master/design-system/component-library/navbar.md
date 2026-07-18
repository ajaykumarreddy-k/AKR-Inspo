# Navbar Component Template

## Purpose
Global navigation. Sticky, glassmorphic, with micro-interactions.

## Structure
```tsx
<motion.nav 
  initial="hidden" 
  whileInView="vissible" 
  variants={navVariants}
  className="w-full py-3 padding-x fixed top-0 left-0 z-50 backdrop-blur-[5px] flex items-center justify-between"
>
  {/* Logo Slot */}
  <div className="w-[50%]">
    <Image className="xm:w-[70px] sm:w-[70px]" />
  </div>
  
  {/* Actions */}
  <div className="flex gap-x-4">
    {/* Standard Pill Button */}
    <button className="text-[17px] font-semibold uppercase text-bg-secondary bg-accent-secondary rounded-full leading-tight tracking-tight px-6 py-3">
      {actionText}
    </button>
    
    {/* Menu Trigger */}
    <div className="relative">
      <button className="flex gap-2 items-center text-[17px] font-semibold text-bg-secondary bg-accent-secondary rounded-full px-4 py-3 group">
         {/* Animated Hover Icon */}
         <Image className="group-hover:rotate-[60deg] transition-all duration-300 ease-linear" />
         <TextHover titile1="Menu" titile2="Menu" />
      </button>
      
      {/* Dropdown Canvas */}
      <AnimatePresence>
        {active && (
          <motion.div className="absolute flex flex-col gap-2 bg-accent-secondary pl-5 pr-16 py-8 rounded-[20px] right-0 mt-8">
            {/* Links */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
</motion.nav>
```

## Replaceable Elements
- Logo SVG.
- Primary CTA action (e.g., Language switch vs "Get Started").
- Menu links list.
