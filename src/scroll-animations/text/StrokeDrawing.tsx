import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function StrokeDrawing({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    const svg = svgRef.current;
    if (!el || !svg || disabled) return;
    const path = svg.querySelector('path');
    if (!path) return;
    const length = path.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease,
        scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8">
      <svg ref={svgRef} viewBox="0 0 400 100" className="w-full max-w-xl h-auto" fill="none" stroke="#facc15" strokeWidth="4" strokeLinecap="round">
        <path d="M20,50 Q100,0 200,50 T380,50" />
      </svg>
      <p className="text-white text-xl mt-8">Stroke Drawing on Scroll</p>
      <div className="h-screen" />
    </div>
  );
}
