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

export default function GPUAcceleratedTransforms({
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
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badRef = useRef<HTMLDivElement>(null);
  const goodRef = useRef<HTMLDivElement>(null);
  const explainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      boxRefs.current.forEach((box, i) => {
        if (!box) return;
        const delay = i * 0.12;

        gsap.from(box, {
          opacity: 0,
          y: 60,
          scale: 0.85,
          rotation: -10,
          duration: 0.7,
          delay,
          ease,
          scrollTrigger: {
            trigger: box,
            start,
            end,
            markers,
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.to(badRef.current, {
        x: 300,
        rotation: 360,
        scale: 1.3,
        duration: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: badRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: true,
          markers: false,
        },
      });

      gsap.to(goodRef.current, {
        x: 300,
        rotation: 360,
        scale: 1.3,
        duration: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: goodRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: true,
          markers: false,
        },
      });

      if (explainRef.current) {
        gsap.from(explainRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease,
          scrollTrigger: {
            trigger: explainRef.current,
            start: 'top 85%',
            end: 'top 45%',
            markers: false,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  const tips = [
    'Use transform & opacity only (GPU composited)',
    'Avoid animating layout properties like width, height, top, left',
    'Prefer translateX/Y over left/top',
    'Use scale instead of width/height animations',
    'will-change: transform hints the browser',
  ];

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-12 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">GPU Accelerated Transforms</h2>
        <p className="text-gray-400">
          Only transform and opacity properties for best performance
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-gray-800/50 border border-gray-700 p-4 text-center">
            <h4 className="text-red-400 font-bold text-sm mb-2">Avoid (top/left)</h4>
            <div
              ref={badRef}
              className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 shadow-lg mx-auto"
            />
          </div>
          <div className="rounded-xl bg-gray-800/50 border border-gray-700 p-4 text-center">
            <h4 className="text-emerald-400 font-bold text-sm mb-2">GPU (translate/scale/rotate)</h4>
            <div
              ref={goodRef}
              className="w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mx-auto"
            />
          </div>
        </div>

        <div
          ref={explainRef}
          className="rounded-xl bg-gray-800/50 border border-gray-700 p-5"
        >
          <h3 className="text-white font-bold mb-3">GPU-Friendly Properties</h3>
          <div className="space-y-2">
            {tips.map((tip, i) => (
              <div
                key={i}
                ref={(el) => { boxRefs.current[i] = el; }}
                className="flex items-center gap-3 text-sm text-gray-300"
              >
                <span className="text-emerald-400">✓</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
