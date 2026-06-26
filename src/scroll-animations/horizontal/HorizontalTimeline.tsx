import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const milestones = [
  { year: '2018', title: 'Founded', desc: 'Company established with a vision' },
  { year: '2019', title: 'MVP Launch', desc: 'First product released to market' },
  { year: '2020', title: 'Series A', desc: 'Raised $10M in funding' },
  { year: '2021', title: 'Global Reach', desc: 'Expanded to 30+ countries' },
  { year: '2022', title: 'AI Platform', desc: 'Launched AI-powered features' },
  { year: '2023', title: 'IPO', desc: 'Public listing on NASDAQ' },
  { year: '2024', title: '1M Users', desc: 'Milestone user base achieved' },
];

export default function HorizontalTimeline({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    const line = lineRef.current;
    if (!el || !track || !line || disabled) return;
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
      gsap.to(line, {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end: () => `+=${total}`,
          scrub: scrub || 1,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gray-950 flex items-center">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <h2 className="text-3xl font-bold text-white">Our Journey</h2>
        <p className="text-gray-400 mt-1">A horizontal timeline of milestones</p>
      </div>
      <div ref={trackRef} className="flex items-center gap-16 px-[15vw] will-change-transform">
        <div ref={lineRef} className="absolute top-1/2 left-[15vw] h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 scale-x-0 will-change-transform" style={{ width: `calc(100% - 30vw)` }} />
        {milestones.map((m) => (
          <div key={m.year} className="flex-shrink-0 w-[220px] text-center relative">
            <div className="w-4 h-4 rounded-full bg-cyan-500 mx-auto mb-4 shadow-lg shadow-cyan-500/50 relative z-10" />
            <span className="text-sm text-cyan-400 font-mono">{m.year}</span>
            <h3 className="text-xl font-bold text-white mt-1">{m.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
