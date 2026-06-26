import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function StackingCards({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=300%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.to('.card-1', { y: 0, scale: 1, opacity: 1, duration, ease })
        .to('.card-2', { y: 0, scale: 1, opacity: 1, duration, ease }, '-=0.7')
        .to('.card-3', { y: 0, scale: 1, opacity: 1, duration, ease }, '-=0.7')
        .to('.card-4', { y: 0, scale: 1, opacity: 1, duration, ease }, '-=0.7')
        .to('.card-5', { y: 0, scale: 1, opacity: 1, duration, ease }, '-=0.7');
      tl.fromTo('.stack-label', { opacity: 1 }, { opacity: 0, duration: 0.5 }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-zinc-800 to-gray-900 p-12">
      <div className="relative w-72 h-96">
        <div className="stack-label absolute inset-0 flex items-center justify-center text-white/20 text-lg tracking-wider">Stack</div>
        <div className="card-1 absolute inset-0 bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl shadow-2xl opacity-0 scale-90 translate-y-32 flex items-center justify-center text-white font-bold text-xl">01</div>
        <div className="card-2 absolute inset-0 bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl shadow-2xl opacity-0 scale-90 translate-y-32 flex items-center justify-center text-white font-bold text-xl">02</div>
        <div className="card-3 absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-2xl opacity-0 scale-90 translate-y-32 flex items-center justify-center text-white font-bold text-xl">03</div>
        <div className="card-4 absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl shadow-2xl opacity-0 scale-90 translate-y-32 flex items-center justify-center text-white font-bold text-xl">04</div>
        <div className="card-5 absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl shadow-2xl opacity-0 scale-90 translate-y-32 flex items-center justify-center text-white font-bold text-xl">05</div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Cards stack on scroll</div>
    </div>
  );
}
