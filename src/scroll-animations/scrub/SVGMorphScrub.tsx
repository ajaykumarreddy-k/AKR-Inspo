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

export default function SVGMorphScrub({
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
  const shapeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.to(shapeRef.current, {
        attr: {
          d: 'M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,50 50,10 100,10 Z',
        },
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
        <h2 className="text-4xl font-bold text-white mb-2">SVG Morph Scrub</h2>
        <p className="text-gray-400">SVG path morphs between shapes on scroll</p>
      </div>

      <div className="w-full max-w-xs mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-auto">
          <defs>
            <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path
            ref={shapeRef}
            d="M100,10 L193.3,65 L157,174 L43,174 L6.7,65 Z"
            fill="url(#morphGrad)"
            opacity={0.8}
          />
        </svg>
      </div>

      <p className="text-gray-400 text-center mt-8 max-w-md">
        Scroll to morph the star into a circle using attribute-based path animation.
      </p>
    </div>
  );
}
