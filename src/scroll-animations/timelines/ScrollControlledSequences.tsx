import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ScrollControlledSequences({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=300%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.fromTo('.step-1', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration, ease })
        .fromTo('.step-2', { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration, ease }, '-=0.3')
        .fromTo('.step-3', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration, ease }, '-=0.3')
        .fromTo('.step-4', { opacity: 0, rotation: -20 }, { opacity: 1, rotation: 0, duration, ease }, '-=0.3')
        .fromTo('.step-5', { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration, ease }, '-=0.3');
      tl.to('.progress-bar', { width: '100%', duration: 1.2, ease: 'none' }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-12">
      <div className="absolute top-8 left-8 right-8 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="progress-bar h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-0" />
      </div>
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <div className="step-1 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 text-white font-semibold">Step 1 — Initiate</div>
        <div className="step-2 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 text-white font-semibold">Step 2 — Prepare</div>
        <div className="step-3 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 text-white font-semibold">Step 3 — Execute</div>
        <div className="step-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 text-white font-semibold">Step 4 — Review</div>
        <div className="step-5 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 text-white font-semibold">Step 5 — Deliver</div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Scroll through each sequence step</div>
    </div>
  );
}
