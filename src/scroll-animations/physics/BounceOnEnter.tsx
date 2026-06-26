import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function BounceOnEnter({ markers = false, scrub = false, pin = true, start = 'top 80%', end = '+=200%', duration = 1.2, ease = 'bounce.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const balls = el.querySelectorAll('.bounce-ball');
    const ctx = gsap.context(() => {
      gsap.from(balls, {
        y: -200,
        opacity: 0,
        duration,
        ease,
        stagger: 0.2,
        scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8">
      <div className="flex gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bounce-ball w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl">
            {i}
          </div>
        ))}
      </div>
      <div className="h-screen" />
    </div>
  );
}
