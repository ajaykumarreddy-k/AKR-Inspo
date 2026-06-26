import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const panels = [
  { id: 1, title: 'Vision', desc: 'Seeing beyond the horizon', gradient: 'from-fuchsia-600 to-purple-900' },
  { id: 2, title: 'Mission', desc: 'Executing with precision', gradient: 'from-blue-600 to-indigo-900' },
  { id: 3, title: 'Impact', desc: 'Making a difference at scale', gradient: 'from-teal-600 to-emerald-900' },
];

const hItems = [
  { id: 'a', title: 'Innovation', gradient: 'from-rose-500 to-pink-700' },
  { id: 'b', title: 'Craftsmanship', gradient: 'from-amber-500 to-orange-700' },
  { id: 'c', title: 'Reliability', gradient: 'from-cyan-500 to-sky-700' },
  { id: 'd', title: 'Velocity', gradient: 'from-violet-500 to-purple-700' },
];

export default function MixedVerticalHorizontal({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!el || !section || !track || disabled) return;
    const ctx = gsap.context(() => {
      const total = track.scrollWidth - (section.offsetWidth || window.innerWidth);
      gsap.to(track, {
        x: () => -total,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
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
    <div ref={containerRef} className="bg-gray-950">
      {panels.map((p) => (
        <section
          key={p.id}
          className={`min-h-screen bg-gradient-to-br ${p.gradient} flex flex-col items-center justify-center p-12`}
        >
          <span className="text-6xl font-black text-white/10 mb-4">0{p.id}</span>
          <h2 className="text-5xl font-bold text-white mb-4">{p.title}</h2>
          <p className="text-xl text-white/60 max-w-md text-center">{p.desc}</p>
        </section>
      ))}
      <div ref={sectionRef} className="relative h-screen overflow-hidden bg-gray-950">
        <h3 className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-2xl font-bold text-white">
          Horizontal Showcase
        </h3>
        <div ref={trackRef} className="flex h-full items-center gap-8 px-[10vw] will-change-transform">
          {hItems.map((item) => (
            <div
              key={item.id}
              className={`flex-shrink-0 w-[400px] h-[350px] rounded-3xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-2xl`}
            >
              <h4 className="text-3xl font-bold text-white">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
