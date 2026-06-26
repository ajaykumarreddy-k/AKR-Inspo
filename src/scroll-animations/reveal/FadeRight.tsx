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

const stats = [
  { value: '99.9%', label: 'Uptime' },
  { value: '2.5M+', label: 'Requests' },
  { value: '150+', label: 'Countries' },
  { value: '8ms', label: 'Avg Latency' },
];

export default function FadeRight({
  markers = false,
  scrub = false,
  pin = false,
  start = 'top 85%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        x: 60,
        duration: duration * 0.8,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          markers,
          scrub,
          pin,
        },
      });

      const children = gridRef.current?.children;
      if (children) {
        gsap.from(children, {
          opacity: 0,
          x: 100,
          duration,
          ease: 'back.out(1.4)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start,
            end,
            markers: false,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-4">
      <div className="text-center mb-16">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Fade Right
        </h2>
        <p className="text-gray-400 text-lg max-w-md">
          Content slides in from the right with a smooth fade.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center"
          >
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
              {s.value}
            </div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
