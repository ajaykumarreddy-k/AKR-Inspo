import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

const pathA = 'M 50 150 Q 100 20 150 150 T 250 150 T 350 150';
const pathB = 'M 50 150 C 80 50, 120 50, 150 150 C 180 250, 220 250, 250 150 C 280 50, 320 50, 350 150';

export default function MorphSVG({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const path = pathRef.current;
    if (!el || !path || disabled) return;
    const ctx = gsap.context(() => {
      gsap.to(path, {
        attr: { d: pathB }, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: scrub || 1, markers, pin },
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-32 px-8">
      <h2 className="text-3xl font-bold text-white mb-2">Morph SVG</h2>
      <p className="text-gray-400 mb-12">The path morphs between shapes as you scroll</p>
      <svg viewBox="0 0 400 200" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRef}
          d={pathA}
          fill="none"
          stroke="url(#morphGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
