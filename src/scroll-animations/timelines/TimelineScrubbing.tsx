import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function TimelineScrubbing({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          pin,
          start,
          end,
          scrub,
          markers,
        }
      });
      tl.to('.box-1', { x: 400, opacity: 0.3, rotation: 180, duration, ease })
        .to('.box-2', { y: 200, scale: 1.5, duration, ease }, '-=0.5')
        .to('.box-3', { x: -200, borderRadius: '50%', backgroundColor: '#6366f1', duration, ease }, '-=0.5')
        .to('.box-4', { scale: 0.2, rotation: -360, opacity: 0, duration, ease }, '-=0.5');
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="grid grid-cols-2 gap-8 p-8">
        <div className="box-1 w-36 h-36 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-lg">01</div>
        <div className="box-2 w-36 h-36 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-lg">02</div>
        <div className="box-3 w-36 h-36 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-lg">03</div>
        <div className="box-4 w-36 h-36 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-lg">04</div>
      </div>
      <div className="absolute bottom-8 text-white/40 text-sm tracking-widest uppercase">Scroll to scrub timeline</div>
    </div>
  );
}
