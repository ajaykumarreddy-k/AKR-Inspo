import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function FloatingPanels({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=250%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.to('.panel-1', { x: 200, y: -80, rotation: 12, scale: 1.1, duration, ease })
        .to('.panel-2', { x: -180, y: -60, rotation: -8, scale: 1.15, duration, ease }, '-=0.8')
        .to('.panel-3', { x: 100, y: 80, rotation: -15, scale: 0.9, duration, ease }, '-=0.8')
        .to('.panel-4', { x: -120, y: 100, rotation: 20, scale: 0.95, duration, ease }, '-=0.8');
      tl.fromTo('.float-backdrop', { opacity: 0.3 }, { opacity: 0.8, duration, ease }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-12 overflow-hidden">
      <div className="float-backdrop absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-fuchsia-500/10 opacity-30" />
      <div className="relative w-80 h-80">
        <div className="panel-1 absolute top-4 left-4 w-36 h-36 bg-gradient-to-br from-rose-500/80 to-pink-600/80 backdrop-blur rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center text-white font-bold">Panel A</div>
        <div className="panel-2 absolute bottom-4 right-4 w-36 h-36 bg-gradient-to-br from-cyan-500/80 to-blue-600/80 backdrop-blur rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center text-white font-bold">Panel B</div>
        <div className="panel-3 absolute bottom-4 left-4 w-32 h-32 bg-gradient-to-br from-amber-500/80 to-orange-600/80 backdrop-blur rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center text-white font-bold">Panel C</div>
        <div className="panel-4 absolute top-4 right-4 w-28 h-28 bg-gradient-to-br from-emerald-500/80 to-teal-600/80 backdrop-blur rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center text-white font-bold">Panel D</div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Panels float on scroll</div>
    </div>
  );
}
