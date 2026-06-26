import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function BeforeAfterTransitions({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.to('.before-state', { opacity: 0, duration, ease })
        .to('.after-state', { opacity: 1, duration, ease }, '-=1')
        .to('.slider-line', { left: '100%', duration, ease }, '-=1')
        .to('.comparison-label', { y: -20, opacity: 0, duration: 0.5, ease }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-neutral-800 to-gray-900 p-12">
      <div className="relative w-full max-w-2xl h-80 rounded-2xl overflow-hidden shadow-2xl">
        <div className="before-state absolute inset-0 bg-gradient-to-br from-rose-600 to-rose-900 flex items-center justify-center">
          <span className="text-white/80 text-2xl font-bold">Before</span>
        </div>
        <div className="after-state absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-800 flex items-center justify-center opacity-0">
          <span className="text-white/80 text-2xl font-bold">After</span>
        </div>
        <div className="slider-line absolute top-0 bottom-0 left-0 w-1 bg-white shadow-lg" />
        <span className="comparison-label absolute top-4 left-4 text-white/60 text-sm uppercase tracking-wider">Scroll to compare</span>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Before → After transition</div>
    </div>
  );
}
