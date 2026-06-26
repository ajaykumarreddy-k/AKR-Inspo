import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const products = [
  { id: 1, name: 'Nebula Pro', tag: 'Flagship', price: '$2,499', color: 'from-indigo-600 to-purple-800' },
  { id: 2, name: 'Orbit Air', tag: 'Lightweight', price: '$1,299', color: 'from-sky-500 to-cyan-700' },
  { id: 3, name: 'Apex Elite', tag: 'Performance', price: '$3,199', color: 'from-rose-600 to-red-800' },
  { id: 4, name: 'Pulse Mini', tag: 'Compact', price: '$899', color: 'from-emerald-500 to-teal-700' },
  { id: 5, name: 'Vertex X', tag: 'Ultimate', price: '$4,499', color: 'from-amber-600 to-orange-800' },
];

export default function ProductShowcase({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
          scrub: scrub || 1.2,
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
        <h2 className="text-3xl font-bold text-white">Product Showcase</h2>
        <p className="text-gray-400 mt-1">Explore our latest lineup</p>
      </div>
      <div ref={trackRef} className="flex items-center gap-10 px-[10vw] will-change-transform">
        {products.map((p) => (
          <div
            key={p.id}
            className={`flex-shrink-0 w-[340px] h-[460px] rounded-3xl bg-gradient-to-br ${p.color} p-1 shadow-2xl`}
          >
            <div className="w-full h-full rounded-[23px] bg-gray-950/60 backdrop-blur-sm p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50">{p.tag}</span>
                <h3 className="text-2xl font-bold text-white mt-2">{p.name}</h3>
              </div>
              <div>
                <span className="text-4xl font-black text-white">{p.price}</span>
                <button className="block mt-4 w-full py-3 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
