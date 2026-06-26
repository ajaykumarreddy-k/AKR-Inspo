import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function InertiaMovement({ markers = false, scrub = true, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'none', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const layers = el.querySelectorAll('.inertia-layer');
    const ctx = gsap.context(() => {
      layers.forEach((layer, i) => {
        const speed = (i + 1) * 0.3;
        gsap.to(layer, {
          yPercent: -50 * speed,
          duration,
          ease,
          scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8 overflow-hidden">
      <div className="inertia-layer text-4xl md:text-6xl font-bold text-red-400 opacity-70">Layer 1</div>
      <div className="inertia-layer text-4xl md:text-6xl font-bold text-green-400 opacity-70 mt-4">Layer 2</div>
      <div className="inertia-layer text-4xl md:text-6xl font-bold text-blue-400 opacity-70 mt-4">Layer 3</div>
      <div className="h-screen" />
    </div>
  );
}
