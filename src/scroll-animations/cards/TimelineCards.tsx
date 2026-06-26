import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function TimelineCards({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=350%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el, pin, start, end, scrub, markers,
        }
      });
      tl.fromTo('.timeline-line', { height: 0 }, { height: '100%', duration: 1.5, ease: 'none' })
        .fromTo('.milestone-1', { opacity: 0, x: -60, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration, ease }, '-=1')
        .to('.dot-1', { backgroundColor: '#f59e0b', scale: 1.5, duration: 0.3, ease }, '-=1')
        .fromTo('.milestone-2', { opacity: 0, x: 60, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration, ease })
        .to('.dot-2', { backgroundColor: '#10b981', scale: 1.5, duration: 0.3, ease }, '-=1')
        .fromTo('.milestone-3', { opacity: 0, x: -60, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration, ease })
        .to('.dot-3', { backgroundColor: '#8b5cf6', scale: 1.5, duration: 0.3, ease }, '-=1')
        .fromTo('.milestone-4', { opacity: 0, x: 60, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration, ease })
        .to('.dot-4', { backgroundColor: '#ec4899', scale: 1.5, duration: 0.3, ease }, '-=1');
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-12">
      <div className="relative flex flex-col items-center w-full max-w-lg">
        <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="timeline-line w-full bg-gradient-to-b from-amber-400 via-emerald-400 to-violet-400 rounded-full h-0" />
        </div>
        {[
          { dot: 'dot-1', cls: 'milestone-1', year: '2020', title: 'Founded', desc: 'Company established with a vision to innovate.', align: 'self-start text-right mr-8', side: 'right-0' },
          { dot: 'dot-2', cls: 'milestone-2', year: '2022', title: 'Growth', desc: 'Expanded to 50+ team members globally.', align: 'self-end text-left ml-8', side: 'left-0' },
          { dot: 'dot-3', cls: 'milestone-3', year: '2024', title: 'Scale', desc: 'Reached 1M users across all platforms.', align: 'self-start text-right mr-8', side: 'right-0' },
          { dot: 'dot-4', cls: 'milestone-4', year: '2026', title: 'Future', desc: 'Pioneering next-generation solutions.', align: 'self-end text-left ml-8', side: 'left-0' },
        ].map((m, i) => (
          <div key={i} className={`relative flex items-center w-full my-6 ${m.align}`}>
            <div className={`${m.cls} p-4 bg-white/5 backdrop-blur border border-white/10 rounded-xl max-w-[200px]`}>
              <span className="text-white/40 text-xs">{m.year}</span>
              <h4 className="text-white font-bold text-sm">{m.title}</h4>
              <p className="text-white/50 text-xs mt-0.5">{m.desc}</p>
            </div>
            <div className={`${m.dot} absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/20 border-2 border-slate-800 z-10`} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Milestone timeline</div>
    </div>
  );
}
