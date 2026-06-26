import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const panels = [
  { id: 1, title: 'Discover', desc: 'Uncover insights hidden in your data', gradient: 'from-violet-600 to-indigo-900' },
  { id: 2, title: 'Design', desc: 'Craft experiences that delight users', gradient: 'from-blue-600 to-cyan-900' },
  { id: 3, title: 'Develop', desc: 'Build with cutting-edge technology', gradient: 'from-emerald-600 to-teal-900' },
  { id: 4, title: 'Deliver', desc: 'Ship with confidence and speed', gradient: 'from-amber-600 to-red-900' },
];

export default function StickyHorizontalScroll({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track || disabled) return;
    const ctx = gsap.context(() => {
      const total = track.scrollWidth - el.offsetWidth;
      gsap.to(track, {
        x: () => -total,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          pin,
          start,
          end: () => `+=${total}`,
          scrub: scrub || 1,
          markers,
          invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gray-950">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <h2 className="text-3xl font-bold text-white">Sticky Horizontal Scroll</h2>
        <p className="text-gray-400 mt-1">A stickied container that scrolls horizontally</p>
      </div>
      <div ref={trackRef} className="flex h-full will-change-transform">
        {panels.map((p) => (
          <div
            key={p.id}
            className={`flex-shrink-0 w-screen h-full bg-gradient-to-br ${p.gradient} flex flex-col items-center justify-center p-12`}
          >
            <span className="text-7xl font-black text-white/10 mb-6">0{p.id}</span>
            <h3 className="text-5xl font-bold text-white mb-4">{p.title}</h3>
            <p className="text-xl text-white/60 max-w-md text-center">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
