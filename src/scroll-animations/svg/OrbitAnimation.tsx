import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const satellites = [
  { angle: 0, color: 'from-cyan-400 to-blue-600', label: 'A' },
  { angle: 72, color: 'from-rose-400 to-pink-600', label: 'B' },
  { angle: 144, color: 'from-amber-400 to-orange-600', label: 'C' },
  { angle: 216, color: 'from-emerald-400 to-teal-600', label: 'D' },
  { angle: 288, color: 'from-violet-400 to-purple-600', label: 'E' },
];

export default function OrbitAnimation({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      orbitRefs.current.forEach((sat, i) => {
        if (!sat) return;
        gsap.to(sat, {
          rotation: 360, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: scrub || 1, markers, pin },
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-32 px-8">
      <h2 className="text-3xl font-bold text-white mb-2">Orbit Animation</h2>
      <p className="text-gray-400 mb-12">Elements orbit around a center point on scroll</p>
      <div className="relative w-72 h-72">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 shadow-xl shadow-yellow-500/30" />
        {satellites.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const r = 130;
          const x = 144 + r * Math.cos(rad) - 16;
          const y = 144 + r * Math.sin(rad) - 16;
          return (
            <div
              key={s.label}
              ref={(el) => { orbitRefs.current[i] = el; }}
              className={`absolute w-8 h-8 rounded-full bg-gradient-to-br ${s.color} shadow-lg flex items-center justify-center text-xs font-bold text-white will-change-transform`}
              style={{ left: x, top: y, transformOrigin: `${144 - x + 16}px ${144 - y + 16}px` }}
            >
              {s.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
