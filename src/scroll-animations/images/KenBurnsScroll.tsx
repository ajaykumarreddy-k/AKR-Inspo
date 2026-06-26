import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function KenBurnsScroll({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.fromTo('.ken-image', { scale: 1, y: 0 }, { scale: 1.3, y: -30, duration: 1.5, ease });
      tl.fromTo('.ken-overlay', { opacity: 0.6 }, { opacity: 0.2, duration: 1.5, ease }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <div className="ken-image absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 scale-110">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        <div className="absolute bottom-16 left-12">
          <h2 className="text-5xl font-bold text-white mb-2">Mountain Escape</h2>
          <p className="text-white/50 text-lg">Experience the height of nature</p>
        </div>
      </div>
      <div className="ken-overlay absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20" />
      <div className="absolute bottom-8 text-white/40 text-xs tracking-wider">Ken Burns zoom effect</div>
    </div>
  );
}
