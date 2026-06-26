import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function WaveDrawing({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const wave = waveRef.current;
    if (!el || !wave || disabled) return;
    const ctx = gsap.context(() => {
      const length = wave.getTotalLength();
      gsap.set(wave, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(wave, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: scrub || 1, markers, pin },
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-32 px-8">
      <h2 className="text-3xl font-bold text-white mb-2">Wave Drawing</h2>
      <p className="text-gray-400 mb-12">A wave pattern that draws progressively</p>
      <svg viewBox="0 0 500 200" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={waveRef}
          d="M 0 100 Q 40 20 80 100 T 160 100 T 240 100 T 320 100 T 400 100 T 480 100 Q 500 140 500 200"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
