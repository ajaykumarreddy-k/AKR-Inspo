import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function DrawSVG({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
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
      <h2 className="text-3xl font-bold text-white mb-2">Draw SVG</h2>
      <p className="text-gray-400 mb-12">An SVG path that draws itself on scroll</p>
      <svg viewBox="0 0 400 200" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRef}
          d="M 20 100 Q 60 20 100 100 T 180 100 T 260 100 T 340 100 Q 360 140 380 100"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
