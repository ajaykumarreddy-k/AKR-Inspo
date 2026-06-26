import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const items = [
  { id: 1, title: 'Design', desc: 'Pixel-perfect interfaces', color: 'from-fuchsia-500 to-purple-600' },
  { id: 2, title: 'Build', desc: 'Robust architecture', color: 'from-blue-500 to-cyan-600' },
  { id: 3, title: 'Deploy', desc: 'Seamless delivery', color: 'from-emerald-500 to-teal-600' },
  { id: 4, title: 'Scale', desc: 'Grow with confidence', color: 'from-amber-500 to-red-600' },
  { id: 5, title: 'Iterate', desc: 'Continuous improvement', color: 'from-violet-500 to-indigo-600' },
];

export default function HorizontalCards({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
          scrub: scrub || 1.5,
          markers,
          invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gray-950 flex items-center">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <h2 className="text-3xl font-bold text-white">Horizontal Cards</h2>
        <p className="text-gray-400 mt-1">Cards sliding in a pinned track</p>
      </div>
      <div ref={trackRef} className="flex items-center gap-6 px-[10vw] will-change-transform">
        {items.map((i) => (
          <div
            key={i.id}
            className={`flex-shrink-0 w-[300px] h-[380px] rounded-2xl bg-gradient-to-br ${i.color} p-8 flex flex-col justify-center items-center text-center shadow-xl border border-white/10`}
          >
            <span className="text-5xl font-black text-white/20 mb-4">0{i.id}</span>
            <h3 className="text-2xl font-bold text-white mb-2">{i.title}</h3>
            <p className="text-white/70 text-sm">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
