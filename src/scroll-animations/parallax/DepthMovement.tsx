import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function DepthMovement({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const st = {
        trigger: el, start: 'top bottom', end: 'bottom top', scrub: scrub || 1.5, markers,
      };
      gsap.fromTo(bgRef.current, { y: '-30%' }, { y: '30%', ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(midRef.current, { y: '-15%' }, { y: '15%', ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(fgRef.current, { y: '0%' }, { y: '0%', ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(contentRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { trigger: el, start: 'top 70%', end: 'center 40%', scrub: scrub || 1 } });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gray-950">
      <div ref={bgRef} className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-purple-900/60 to-transparent will-change-transform" />
      <div ref={midRef} className="absolute inset-0 will-change-transform">
        <div className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600/10 to-cyan-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-500/5 to-rose-500/5 blur-3xl" />
      </div>
      <div ref={fgRef} className="absolute inset-0 will-change-transform">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px` }}
          />
        ))}
      </div>
      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Depth Movement</h2>
        <p className="text-lg text-white/50 max-w-xl">Foreground, midground, and background each scroll at different speeds, creating a rich sense of depth.</p>
      </div>
    </div>
  );
}
