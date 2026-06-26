import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ProgressiveReveal({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=300%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.fromTo('.layer-bg', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease })
        .fromTo('.reveal-section-1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration, ease }, '-=0.3')
        .fromTo('.reveal-section-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration, ease }, '-=0.5')
        .fromTo('.reveal-section-3', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration, ease }, '-=0.5')
        .fromTo('.reveal-section-4', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration, ease }, '-=0.5');
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-12">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="layer-bg relative h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-white/20" />
        </div>
        <div className="reveal-section-1 p-5 bg-white/5 backdrop-blur border border-white/10 rounded-xl opacity-0">
          <h3 className="text-indigo-400 font-bold text-sm uppercase tracking-wider">Discovery</h3>
          <p className="text-white/60 text-sm mt-1">Understanding user needs through research and data analysis.</p>
        </div>
        <div className="reveal-section-2 p-5 bg-white/5 backdrop-blur border border-white/10 rounded-xl opacity-0">
          <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Design</h3>
          <p className="text-white/60 text-sm mt-1">Crafting intuitive interfaces with thoughtful user experiences.</p>
        </div>
        <div className="reveal-section-3 p-5 bg-white/5 backdrop-blur border border-white/10 rounded-xl opacity-0">
          <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider">Develop</h3>
          <p className="text-white/60 text-sm mt-1">Building robust solutions using modern technologies and practices.</p>
        </div>
        <div className="reveal-section-4 p-5 bg-white/5 backdrop-blur border border-white/10 rounded-xl opacity-0">
          <h3 className="text-rose-400 font-bold text-sm uppercase tracking-wider">Deploy</h3>
          <p className="text-white/60 text-sm mt-1">Launching and monitoring to ensure continuous improvement.</p>
        </div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Content reveals progressively</div>
    </div>
  );
}
