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

const colorStops = [
  { color: '#4f46e5', label: 'Indigo' },
  { color: '#7c3aed', label: 'Violet' },
  { color: '#db2777', label: 'Pink' },
  { color: '#ea580c', label: 'Orange' },
  { color: '#ca8a04', label: 'Yellow' },
  { color: '#16a34a', label: 'Green' },
  { color: '#0891b2', label: 'Cyan' },
  { color: '#4f46e5', label: 'Indigo' },
];

export default function ColorTransitionScrub({
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
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
          markers,
        },
      });

      colorStops.forEach((stop, i) => {
        if (i === 0) return;
        tl.to(bgRef.current, {
          backgroundColor: stop.color,
          duration: 1 / (colorStops.length - 1),
          ease: 'none',
        });
        tl.call(
          () => {
            if (labelRef.current) labelRef.current.textContent = stop.label;
          },
          [],
          0
        );
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-2">Color Transition Scrub</h2>
        <p className="text-gray-400">Background smoothly transitions through colors on scroll</p>
      </div>

      <div
        ref={bgRef}
        className="w-full max-w-lg aspect-video rounded-3xl shadow-2xl flex items-center justify-center"
        style={{ backgroundColor: colorStops[0].color }}
      >
        <div className="text-center">
          <span
            ref={labelRef}
            className="text-4xl font-bold text-white/90 block mb-2"
          >
            {colorStops[0].label}
          </span>
          <span className="text-white/50 text-lg">Scroll to change color</span>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        {colorStops.slice(0, -1).map((stop, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-white/20"
            style={{ backgroundColor: stop.color }}
          />
        ))}
      </div>
    </div>
  );
}
