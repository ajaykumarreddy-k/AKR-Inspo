import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const items = [
  { id: 1, label: 'Sky', size: 'w-32 h-32', color: 'bg-cyan-500/20 border-cyan-500/30', speed: 0.2, top: '10%', left: '15%' },
  { id: 2, label: 'Clouds', size: 'w-24 h-24', color: 'bg-white/10 border-white/20', speed: 0.4, top: '25%', left: '65%' },
  { id: 3, label: 'Mountain', size: 'w-40 h-40', color: 'bg-emerald-500/20 border-emerald-500/30', speed: 0.6, top: '55%', left: '20%' },
  { id: 4, label: 'Trees', size: 'w-20 h-20', color: 'bg-green-500/20 border-green-500/30', speed: 0.8, top: '70%', left: '70%' },
  { id: 5, label: 'Ground', size: 'w-48 h-16', color: 'bg-amber-500/20 border-amber-500/30', speed: 1.0, top: '85%', left: '35%' },
];

export default function FloatingLayers({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        const layer = layerRefs.current[i];
        if (!layer) return;
        gsap.fromTo(layer, { y: `${-80 * item.speed}px` }, {
          y: `${80 * item.speed}px`, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: scrub || 1.5, markers },
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-b from-sky-950 via-indigo-950 to-gray-950">
      {items.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => { layerRefs.current[i] = el; }}
          className={`absolute ${item.size} rounded-2xl ${item.color} border backdrop-blur-sm flex items-center justify-center will-change-transform`}
          style={{ top: item.top, left: item.left }}
        >
          <span className="text-xs text-white/50 font-medium">{item.label}</span>
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-bold text-white/80 text-center">
          Floating Layers
        </h2>
      </div>
    </div>
  );
}
