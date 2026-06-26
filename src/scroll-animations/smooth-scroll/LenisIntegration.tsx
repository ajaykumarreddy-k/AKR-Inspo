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

export default function LenisIntegration({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    const scroller = scrollContainerRef.current;
    if (!el || !scroller || disabled) return;

    const ctx = gsap.context(() => {
      boxRefs.current.forEach((box, i) => {
        if (!box) return;
        gsap.from(box, {
          y: 80,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease,
          scrollTrigger: {
            trigger: box,
            scroller,
            start: 'top 85%',
            end: 'top 35%',
            markers,
            toggleActions: 'play none none none',
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Lenis Integration</h2>
        <p className="text-gray-400">
          Custom smooth-scroll container with GSAP ScrollTrigger
        </p>
      </div>

      <div
        ref={scrollContainerRef}
        className="w-full max-w-lg h-96 overflow-y-auto scroll-smooth rounded-2xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="p-6 space-y-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { boxRefs.current[i] = el; }}
              className="h-48 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg flex items-center justify-center"
            >
              <span className="text-4xl text-white font-bold">Item {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-4">
        Scroll inside the container to see animations trigger
      </p>
    </div>
  );
}
