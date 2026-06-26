import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function SectionSnap({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=400%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      tl.to('.snap-section-1', { y: 0, opacity: 1, scale: 1, duration, ease })
        .to('.snap-section-2', { y: 0, opacity: 1, rotation: 0, duration, ease }, '-=0.5')
        .to('.snap-section-3', { y: 0, opacity: 1, scale: 1, duration, ease }, '-=0.5')
        .to('.snap-section-4', { y: 0, opacity: 1, borderRadius: '1rem', duration, ease }, '-=0.5');
      tl.fromTo('.snap-indicator span', { width: 8, backgroundColor: 'rgba(255,255,255,0.2)' }, { width: 24, backgroundColor: '#f59e0b', duration: 0.3, stagger: 0.2, ease }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-12">
      <div className="snap-indicator absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {[1, 2, 3, 4].map(i => <span key={i} className="block h-2 rounded-full bg-white/20 transition-all" />)}
      </div>
      <div className="relative w-full max-w-lg h-96">
        <div className="snap-section-1 absolute inset-0 bg-gradient-to-br from-rose-600 to-pink-700 rounded-2xl shadow-2xl flex items-center justify-center text-white text-3xl font-bold opacity-0 -translate-y-16 scale-90">Section 1</div>
        <div className="snap-section-2 absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center text-white text-3xl font-bold opacity-0 translate-y-16 rotate-6">Section 2</div>
        <div className="snap-section-3 absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl shadow-2xl flex items-center justify-center text-white text-3xl font-bold opacity-0 translate-y-16 scale-90">Section 3</div>
        <div className="snap-section-4 absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-full shadow-2xl flex items-center justify-center text-white text-3xl font-bold opacity-0 translate-y-16">Section 4</div>
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Sections snap into place</div>
    </div>
  );
}
