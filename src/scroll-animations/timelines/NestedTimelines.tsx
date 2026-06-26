import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function NestedTimelines({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=250%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const child1 = gsap.timeline();
      child1.to('.child-a', { x: 300, scale: 1.3, duration, ease });
      child1.to('.child-a', { rotation: 180, backgroundColor: '#a78bfa', duration, ease }, '-=0.3');

      const child2 = gsap.timeline();
      child2.to('.child-b', { y: -200, borderRadius: '50%', duration, ease });
      child2.to('.child-b', { scale: 1.6, borderColor: '#f472b6', borderWidth: 4, duration, ease }, '-=0.3');

      const child3 = gsap.timeline();
      child3.to('.child-c', { opacity: 0.3, x: -250, duration, ease });
      child3.to('.child-c', { scale: 0.4, backgroundColor: '#34d399', duration, ease }, '-=0.3');

      const parent = gsap.timeline({
        scrollTrigger: {
          trigger: el, pin, start, end, scrub, markers,
        }
      });
      parent.add(child1).add(child2, '-=0.8').add(child3, '-=0.8');
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 overflow-hidden">
      <h2 className="text-white/60 text-sm tracking-widest uppercase mb-6">Nested Timelines</h2>
      <div className="child-a w-32 h-32 bg-gradient-to-br from-violet-400 to-violet-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold">Child A</div>
      <div className="child-b w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold border-2 border-transparent">Child B</div>
      <div className="child-c w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold">Child C</div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Each child is a separate timeline</div>
    </div>
  );
}
