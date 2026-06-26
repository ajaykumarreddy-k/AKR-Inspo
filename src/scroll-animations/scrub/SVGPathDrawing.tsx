import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  markers?: boolean;
  scrub?: number | boolean;
  pin?: boolean;
  start?: string;
  end?: string;
  duration?: number;
  ease?: string;
  disabled?: boolean;
}

export default function SVGPathDrawing({
  markers = false,
  scrub = 1,
  pin = false,
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
          markers,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-2">SVG Path Drawing</h2>
        <p className="text-gray-400">A star path that draws itself as you scroll</p>
      </div>

      <div className="w-full max-w-md mx-auto">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M100 10 L123.6 67.4 L185.4 67.4 L136.4 103.6 L158.2 161 L100 126.4 L41.8 161 L63.6 103.6 L14.6 67.4 L76.4 67.4 Z"
            fill="none"
            stroke="url(#starGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
        {[
          { path: 'M20 80 Q50 20 80 80 T140 80', color: '#8b5cf6' },
          { path: 'M20 40 Q80 0 140 40 Q80 80 20 40', color: '#06b6d4' },
          { path: 'M20 40 Q50 80 80 40 T140 40', color: '#10b981' },
        ].map((item, i) => (
          <svg key={i} viewBox="0 0 160 100" className="w-full h-auto">
            <path
              d={item.path}
              fill="none"
              stroke={item.color}
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.3}
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
