import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const logos = [
  'Nexus', 'Prism', 'Apex', 'Orbit', 'Pulse', 'Vertex', 'Nova', 'Zephyr',
  'Nexus', 'Prism', 'Apex', 'Orbit', 'Pulse', 'Vertex', 'Nova', 'Zephyr',
];

export default function InfiniteHorizontalLoop({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track || disabled) return;
    const ctx = gsap.context(() => {
      const half = track.scrollWidth / 2;
      gsap.set(track, { x: 0 });
      gsap.to(track, {
        x: -half,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          pin,
          start,
          end: `+=${half}`,
          scrub: scrub || 1,
          markers,
        },
        onComplete: () => {
          gsap.set(track, { x: 0 });
        },
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gray-950 flex items-center">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <h2 className="text-3xl font-bold text-white">Infinite Loop</h2>
        <p className="text-gray-400 mt-1">Endless horizontal scroll of brand logos</p>
      </div>
      <div ref={trackRef} className="flex items-center gap-12 will-change-transform">
        {logos.map((name, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-44 h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <span className="text-xl font-bold text-white/40 tracking-widest uppercase">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
