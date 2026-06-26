import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ZoomReveal({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.fromTo('.zoom-image', { scale: 0.1, opacity: 0, rotation: 15 }, { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease });
      tl.fromTo('.zoom-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease }, '-=0.5');
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-12">
      <div className="flex flex-col items-center gap-8">
        <div className="zoom-image w-72 h-72 bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl flex items-center justify-center opacity-0 scale-10">
          <svg className="w-24 h-24 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <div className="zoom-label text-center opacity-0">
          <h2 className="text-3xl font-bold text-white">Zoom Reveal</h2>
          <p className="text-white/40 mt-2">Image zooms in from distance</p>
        </div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Zoom reveal effect</div>
    </div>
  );
}
