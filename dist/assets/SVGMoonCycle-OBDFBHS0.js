const e=`import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SVGMoonCycle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<SVGCircleElement>(null);
  const moonRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the shadow circle across the moon to create phases
      gsap.fromTo(shadowRef.current,
        { cx: -40 },
        { 
          cx: 240, 
          duration: 3, 
          ease: 'power1.inOut', 
          repeat: -1,
          yoyo: true
        }
      );
      
      // Subtle pulse on the moon itself
      gsap.to(moonRef.current, {
        opacity: 0.8,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-80 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">SVG Moon Cycle</h2>
      <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-xl">
        <defs>
          <mask id="moon-phase-mask">
            <rect width="200" height="200" fill="white" />
            <circle ref={shadowRef} cx="-40" cy="100" r="60" fill="black" />
          </mask>
        </defs>
        {/* Background outline/stars placeholder */}
        <circle cx="100" cy="100" r="62" fill="none" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        
        {/* The actual moon */}
        <circle 
          ref={moonRef}
          cx="100" cy="100" r="60" 
          fill="var(--color-primary)" 
          mask="url(#moon-phase-mask)" 
        />
      </svg>
    </div>
  );
}
`;export{e as default};
