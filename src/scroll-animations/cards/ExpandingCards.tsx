import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ExpandingCards({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=250%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.fromTo('.card-expand-1', { width: 64, height: 64, borderRadius: '50%' }, { width: 256, height: 256, borderRadius: '1rem', duration, ease })
        .fromTo('.card-expand-2', { width: 64, height: 64, borderRadius: '50%' }, { width: 256, height: 256, borderRadius: '1rem', duration, ease }, '-=0.7')
        .fromTo('.card-expand-3', { width: 64, height: 64, borderRadius: '50%' }, { width: 256, height: 256, borderRadius: '1rem', duration, ease }, '-=0.7');
      tl.fromTo('.expand-label', { opacity: 1 }, { opacity: 0, duration: 0.4 }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-12">
      <div className="expand-label absolute text-white/20 text-lg tracking-wider top-8">Expanding</div>
      <div className="flex items-center gap-8">
        <div className="card-expand-1 w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 rounded-full shadow-2xl flex items-center justify-center text-white font-bold overflow-hidden">A</div>
        <div className="card-expand-2 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full shadow-2xl flex items-center justify-center text-white font-bold overflow-hidden">B</div>
        <div className="card-expand-3 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full shadow-2xl flex items-center justify-center text-white font-bold overflow-hidden">C</div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Cards expand from circles</div>
    </div>
  );
}
