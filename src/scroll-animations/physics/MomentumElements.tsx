import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function MomentumElements({ markers = false, scrub = 3, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'none', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const items = el.querySelectorAll('.momentum-item');
    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        gsap.to(item, {
          x: (i + 1) * 120,
          rotation: (i + 1) * 15,
          duration,
          ease,
          scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8 gap-6">
      {['Slide', 'Glide', 'Drift'].map((label, i) => (
        <div key={i} className="momentum-item w-48 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {label}
        </div>
      ))}
      <div className="h-screen" />
    </div>
  );
}
