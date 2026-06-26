import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function VideoFrameAnimation({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.to('.vf-frame', { opacity: 0, duration: 0.2, ease }, 0);
      tl.to('.vf-1', { opacity: 1, duration: 0.2, ease }, 0)
        .to('.vf-2', { opacity: 1, duration: 0.2, ease })
        .to('.vf-3', { opacity: 1, duration: 0.2, ease })
        .to('.vf-4', { opacity: 1, duration: 0.2, ease })
        .to('.vf-5', { opacity: 1, duration: 0.2, ease })
        .to('.vf-6', { opacity: 1, duration: 0.2, ease })
        .to('.vf-7', { opacity: 1, duration: 0.2, ease })
        .to('.vf-8', { opacity: 1, duration: 0.2, ease });
      tl.fromTo('.vf-progress', { width: '0%' }, { width: '100%', duration: 1.5, ease: 'none' }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-12">
      <div className="relative w-80 h-64 rounded-2xl overflow-hidden shadow-2xl bg-black/50">
        {[
          { cls: 'vf-1', color: 'from-red-500 to-red-700', label: 'Frame 01' },
          { cls: 'vf-2', color: 'from-orange-500 to-orange-700', label: 'Frame 02' },
          { cls: 'vf-3', color: 'from-amber-500 to-amber-700', label: 'Frame 03' },
          { cls: 'vf-4', color: 'from-yellow-500 to-yellow-700', label: 'Frame 04' },
          { cls: 'vf-5', color: 'from-lime-500 to-lime-700', label: 'Frame 05' },
          { cls: 'vf-6', color: 'from-green-500 to-green-700', label: 'Frame 06' },
          { cls: 'vf-7', color: 'from-emerald-500 to-emerald-700', label: 'Frame 07' },
          { cls: 'vf-8', color: 'from-teal-500 to-teal-700', label: 'Frame 08' },
        ].map((f, i) => (
          <div key={i} className={`vf-frame ${f.cls} absolute inset-0 bg-gradient-to-br ${f.color} flex items-center justify-center opacity-0`}>
            <span className="text-white/80 text-lg font-mono">{f.label}</span>
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div className="vf-progress h-full bg-white/60 w-0" />
        </div>
      </div>
      <div className="text-white/40 text-xs font-mono tracking-wider">Video Frame Simulation</div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Scroll to advance frames</div>
    </div>
  );
}
