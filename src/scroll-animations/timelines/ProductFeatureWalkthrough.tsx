import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ProductFeatureWalkthrough({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=300%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.fromTo('.product-mockup', { opacity: 0, scale: 0.6, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 1.5, ease })
        .fromTo('.feature-1', { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration, ease }, '-=0.5')
        .to('.highlight-1', { backgroundColor: '#f59e0b', scale: 1.1, duration: 0.5, ease }, '-=1')
        .fromTo('.feature-2', { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration, ease })
        .to('.highlight-2', { backgroundColor: '#10b981', scale: 1.1, duration: 0.5, ease }, '-=1')
        .fromTo('.feature-3', { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration, ease })
        .to('.highlight-3', { backgroundColor: '#8b5cf6', scale: 1.1, duration: 0.5, ease }, '-=1');
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center gap-16 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-12">
      <div className="product-mockup relative w-72 h-96 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl shadow-2xl border border-white/10 flex items-center justify-center">
        <div className="text-white/30 text-sm font-mono">Product</div>
        <div className="highlight-1 absolute top-8 left-8 w-4 h-4 bg-amber-500/50 rounded-full" />
        <div className="highlight-2 absolute top-8 right-8 w-4 h-4 bg-emerald-500/50 rounded-full" />
        <div className="highlight-3 absolute bottom-16 left-1/2 -translate-x-1/2 w-4 h-4 bg-violet-500/50 rounded-full" />
      </div>
      <div className="flex flex-col gap-6 max-w-xs">
        <div className="feature-1 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10 opacity-0">
          <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider">Speed</h3>
          <p className="text-white/60 text-sm mt-1">Lightning-fast performance</p>
        </div>
        <div className="feature-2 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10 opacity-0">
          <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Reliability</h3>
          <p className="text-white/60 text-sm mt-1">99.9% uptime guaranteed</p>
        </div>
        <div className="feature-3 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10 opacity-0">
          <h3 className="text-violet-400 font-bold text-sm uppercase tracking-wider">Security</h3>
          <p className="text-white/60 text-sm mt-1">Enterprise-grade encryption</p>
        </div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Scroll to explore features</div>
    </div>
  );
}
