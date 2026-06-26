import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function LayeredSections({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=300%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.to('.layer-1', { y: -80, opacity: 0.6, scale: 0.9, duration, ease })
        .to('.layer-2', { y: -60, opacity: 0.8, scale: 0.95, duration, ease }, '-=0.7')
        .to('.layer-3', { y: 0, opacity: 1, scale: 1, duration, ease }, '-=0.7')
        .to('.layer-4', { y: 60, opacity: 0.5, duration, ease }, '+=0.2')
        .to('.layer-5', { y: 0, opacity: 1, duration, ease }, '-=0.5');
      tl.fromTo('.layer-label', { opacity: 1 }, { opacity: 0, duration: 0.4 }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-12">
      <div className="layer-label absolute text-white/20 text-lg tracking-wider top-8">Layers</div>
      <div className="relative w-80 h-80">
        <div className="layer-1 absolute inset-0 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 backdrop-blur rounded-3xl border border-white/5 flex items-center justify-center text-white/60 text-lg font-bold">Layer 1</div>
        <div className="layer-2 absolute inset-4 bg-gradient-to-br from-purple-600/40 to-pink-600/40 backdrop-blur rounded-3xl border border-white/5 flex items-center justify-center text-white/70 text-lg font-bold">Layer 2</div>
        <div className="layer-3 absolute inset-8 bg-gradient-to-br from-rose-600/50 to-orange-600/50 backdrop-blur rounded-3xl border border-white/10 flex items-center justify-center text-white/80 text-lg font-bold">Layer 3</div>
        <div className="layer-4 absolute inset-12 bg-gradient-to-br from-amber-600/60 to-yellow-600/60 backdrop-blur rounded-3xl border border-white/10 flex items-center justify-center text-white/90 text-lg font-bold">Layer 4</div>
        <div className="layer-5 absolute inset-16 bg-gradient-to-br from-emerald-600/80 to-teal-600/80 backdrop-blur rounded-3xl border border-white/20 flex items-center justify-center text-white font-bold text-lg">Layer 5</div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Layers reveal on scroll</div>
    </div>
  );
}
