import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function MouseScrollHybrid({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const mouseLayerRef = useRef<HTMLDivElement>(null);

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
      gsap.fromTo(layer1Ref.current, { y: '-20%' }, { y: '20%', ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(layer2Ref.current, { y: '-10%' }, { y: '10%', ease: 'none', scrollTrigger: { ...st } });
      gsap.fromTo(layer3Ref.current, { y: '-5%' }, { y: '5%', ease: 'none', scrollTrigger: { ...st } });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(mouseLayerRef.current, { x: x * 40, y: y * 40, duration: 0.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [disabled]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gray-950">
      <div ref={layer1Ref} className="absolute inset-0 bg-gradient-to-br from-sky-900/40 via-indigo-900/40 to-violet-900/40 will-change-transform" />
      <div ref={layer2Ref} className="absolute inset-0 will-change-transform">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white/10 rounded-full" style={{ left: `${(i * 12.5) % 100}%`, top: `${(i * 7 + 20) % 100}%` }} />
        ))}
      </div>
      <div ref={layer3Ref} className="absolute inset-0 will-change-transform">
        <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-cyan-500/5 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-violet-500/5 blur-2xl" />
      </div>
      <div ref={mouseLayerRef} className="relative z-10 flex flex-col items-center justify-center h-full will-change-transform">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Mouse + Scroll</h2>
        <p className="text-white/50 max-w-md text-center">Move your mouse and scroll to experience hybrid parallax.</p>
      </div>
    </div>
  );
}
