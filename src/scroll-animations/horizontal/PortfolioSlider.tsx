import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const projects = [
  { id: 1, title: 'Solaris Branding', cat: 'Brand Identity', gradient: 'from-amber-400 to-rose-600' },
  { id: 2, title: 'Oceanic UI', cat: 'UX Design', gradient: 'from-cyan-400 to-blue-600' },
  { id: 3, title: 'MountainDB', cat: 'Database Architecture', gradient: 'from-emerald-400 to-teal-600' },
  { id: 4, title: 'Nova Mobile', cat: 'App Development', gradient: 'from-violet-400 to-purple-600' },
  { id: 5, title: 'Apex Dashboard', cat: 'Data Visualization', gradient: 'from-rose-400 to-pink-600' },
  { id: 6, title: 'Prism Design', cat: 'Design System', gradient: 'from-sky-400 to-indigo-600' },
];

export default function PortfolioSlider({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gray-950 flex items-center">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <h2 className="text-3xl font-bold text-white">Portfolio</h2>
        <p className="text-gray-400 mt-1">Selected work that speaks for itself</p>
      </div>
      <div ref={trackRef} className="flex items-center gap-8 px-[10vw] will-change-transform">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`flex-shrink-0 w-[380px] h-[480px] rounded-3xl bg-gradient-to-br ${p.gradient} relative overflow-hidden group cursor-pointer shadow-xl`}
          >
            <div className="absolute inset-0 bg-gray-950/40 group-hover:bg-gray-950/20 transition-colors duration-500" />
            <div className="relative z-10 p-8 flex flex-col justify-end h-full">
              <span className="text-xs uppercase tracking-widest text-white/60">{p.cat}</span>
              <h3 className="text-3xl font-bold text-white mt-2">{p.title}</h3>
              <div className="mt-4 flex items-center gap-2 text-white/80 text-sm">
                <span>View Project</span>
                <span className="text-lg">&rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
