import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function MultiLayerParallax({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: scrub || 1.5,
        markers,
      };
      gsap.fromTo(bgRef.current, { y: '-20%' }, { y: '20%', ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(midRef.current, { y: '-10%' }, { y: '10%', ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(fgRef.current, { y: '5%' }, { y: '-5%', ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(contentRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 70%', end: 'top 30%', scrub: scrub || 1, toggleActions: 'play reverse play reverse' } });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gray-950">
      <div ref={bgRef} className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-900 to-gray-950 will-change-transform" />
      <div ref={midRef} className="absolute inset-0 will-change-transform">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>
      <div ref={fgRef} className="absolute inset-0 will-change-transform">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
          />
        ))}
      </div>
      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">Multi-Layer Parallax</h2>
        <p className="text-xl text-white/60 max-w-lg">Background, midground, and foreground all move at different speeds creating depth.</p>
      </div>
    </div>
  );
}
