import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function BeforeAfterSlider({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.to('.slider-clip', { width: '100%', duration: 1.5, ease });
      tl.to('.slider-handle', { left: '100%', duration: 1.5, ease }, '-=1.5');
      tl.fromTo('.before-label', { opacity: 1 }, { opacity: 0, duration: 0.5 }, 0)
        .to('.after-label', { opacity: 1, duration: 0.5 }, '-=0.5');
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-zinc-800 to-gray-900 p-12">
      <div className="relative w-full max-w-xl h-72 rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600 to-pink-800 flex items-center justify-center">
          <span className="text-white/60 text-lg">Before</span>
        </div>
        <div className="slider-clip absolute inset-0 w-0 overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/60 text-lg">After</span>
          </div>
        </div>
        <div className="slider-handle absolute top-0 bottom-0 left-0 w-1 bg-white shadow-lg z-10" />
        <div className="before-label absolute top-4 left-4 text-white/50 text-xs uppercase tracking-wider">Before</div>
        <div className="after-label absolute top-4 right-4 text-white/50 text-xs uppercase tracking-wider opacity-0">After</div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Before / After slider</div>
    </div>
  );
}
