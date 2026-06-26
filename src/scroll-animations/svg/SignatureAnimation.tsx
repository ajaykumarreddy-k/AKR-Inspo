import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function SignatureAnimation({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const path = pathRef.current;
    if (!el || !path || disabled) return;
    const ctx = gsap.context(() => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: scrub || 1, markers, pin },
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-32 px-8">
      <h2 className="text-3xl font-bold text-white mb-2">Signature Animation</h2>
      <p className="text-gray-400 mb-12">A cursive signature that draws itself</p>
      <svg viewBox="0 0 400 150" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRef}
          d="M 30 100 C 40 40, 60 30, 80 70 C 95 100, 100 120, 110 80 C 120 40, 135 30, 150 70 C 160 95, 170 110, 180 70 C 190 30, 205 40, 210 80 C 215 110, 225 120, 240 70 C 255 20, 270 30, 280 80 C 290 120, 300 110, 315 70 C 330 30, 340 40, 350 80 C 355 100, 360 110, 370 95"
          fill="none"
          stroke="url(#sigGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
