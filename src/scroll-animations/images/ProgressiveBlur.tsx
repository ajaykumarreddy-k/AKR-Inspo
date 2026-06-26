import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ProgressiveBlur({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.fromTo('.blur-image', { filter: 'blur(20px)', scale: 1.1, opacity: 0.3 }, { filter: 'blur(0px)', scale: 1, opacity: 1, duration: 1.5, ease });
      tl.fromTo('.blur-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration, ease }, '-=0.5');
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-zinc-800 to-gray-900 p-12">
      <div className="flex flex-col items-center gap-8">
        <div className="blur-image w-80 h-64 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center" style={{ filter: 'blur(20px)' }}>
          <div className="text-center">
            <div className="text-5xl mb-2">🏔️</div>
            <p className="text-white/60 text-sm">Crystal clear view</p>
          </div>
        </div>
        <div className="blur-label text-center opacity-0">
          <h2 className="text-2xl font-bold text-white">Progressive Blur</h2>
          <p className="text-white/40 text-sm mt-1">From blurry to sharp focus</p>
        </div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Blur clears on scroll</div>
    </div>
  );
}
