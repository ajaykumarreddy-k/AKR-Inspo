import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const cards = [
  { id: 1, color: 'from-rose-500 to-pink-600', title: 'Mountain View', desc: 'Majestic peaks under a golden sunset' },
  { id: 2, color: 'from-amber-500 to-orange-600', title: 'Ocean Sunset', desc: 'Waves crashing on a fiery horizon' },
  { id: 3, color: 'from-emerald-500 to-teal-600', title: 'Forest Path', desc: 'Ancient trees lining a mossy trail' },
  { id: 4, color: 'from-blue-500 to-indigo-600', title: 'City Lights', desc: 'Neon reflections on rain-soaked streets' },
  { id: 5, color: 'from-purple-500 to-violet-600', title: 'Starry Night', desc: 'Constellations over a silent valley' },
  { id: 6, color: 'from-cyan-500 to-sky-600', title: 'Arctic Dawn', desc: 'Ice crystals catching first light' },
];

export default function HorizontalGallery({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
        <h2 className="text-3xl font-bold text-white">Horizontal Gallery</h2>
        <p className="text-gray-400 mt-1">Scroll down to browse the gallery</p>
      </div>
      <div ref={trackRef} className="flex h-full items-center gap-8 px-[10vw] will-change-transform">
        {cards.map((c) => (
          <div
            key={c.id}
            className={`flex-shrink-0 w-[350px] h-[420px] rounded-3xl bg-gradient-to-br ${c.color} p-8 flex flex-col justify-end shadow-2xl`}
          >
            <h3 className="text-2xl font-bold text-white mb-2">{c.title}</h3>
            <p className="text-white/80 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
