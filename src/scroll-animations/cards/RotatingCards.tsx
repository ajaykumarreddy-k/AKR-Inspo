import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function RotatingCards({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=250%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el, pin, start, end, scrub, markers,
        }
      });
      tl.fromTo('.rotate-card-1', { rotationY: 180, opacity: 0 }, { rotationY: 0, opacity: 1, duration, ease })
        .fromTo('.rotate-card-2', { rotationY: 180, opacity: 0 }, { rotationY: 0, opacity: 1, duration, ease }, '-=0.6')
        .fromTo('.rotate-card-3', { rotationY: 180, opacity: 0 }, { rotationY: 0, opacity: 1, duration, ease }, '-=0.6')
        .fromTo('.rotate-card-4', { rotationY: 180, opacity: 0 }, { rotationY: 0, opacity: 1, duration, ease }, '-=0.6');
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-12">
      <div className="grid grid-cols-2 gap-8 perspective-1000">
        <div className="rotate-card-1 w-44 h-44 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-lg" style={{ backfaceVisibility: 'hidden' }}>Card A</div>
        <div className="rotate-card-2 w-44 h-44 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-lg" style={{ backfaceVisibility: 'hidden' }}>Card B</div>
        <div className="rotate-card-3 w-44 h-44 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-lg" style={{ backfaceVisibility: 'hidden' }}>Card C</div>
        <div className="rotate-card-4 w-44 h-44 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-lg" style={{ backfaceVisibility: 'hidden' }}>Card D</div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Cards flip into view</div>
    </div>
  );
}
