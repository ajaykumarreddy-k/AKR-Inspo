import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ImageSequencePlayback({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.to('.seq-frame', { opacity: 0, duration: 0.3, ease }, 0);
      tl.to('.frame-1', { opacity: 1, duration: 0.3, ease }, 0)
        .to('.frame-2', { opacity: 1, duration: 0.3, ease })
        .to('.frame-3', { opacity: 1, duration: 0.3, ease })
        .to('.frame-4', { opacity: 1, duration: 0.3, ease })
        .to('.frame-5', { opacity: 1, duration: 0.3, ease })
        .to('.frame-6', { opacity: 1, duration: 0.3, ease });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-12">
      <div className="relative w-96 h-64 rounded-2xl overflow-hidden shadow-2xl">
        {[
          'from-rose-500 to-pink-600', 'from-violet-500 to-purple-600',
          'from-blue-500 to-cyan-600', 'from-emerald-500 to-teal-600',
          'from-amber-500 to-orange-600', 'from-red-500 to-rose-600'
        ].map((grad, i) => (
          <div key={i} className={`seq-frame frame-${i + 1} absolute inset-0 bg-gradient-to-br ${grad} flex items-center justify-center opacity-0`}>
            <span className="text-white/80 text-6xl font-bold">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Image sequence — scroll to advance frames</div>
    </div>
  );
}
