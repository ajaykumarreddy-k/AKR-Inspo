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

const items = [
  { h: 64, color: 'from-sky-400 to-blue-600', label: 'Tall' },
  { h: 48, color: 'from-rose-400 to-pink-600', label: 'Medium' },
  { h: 56, color: 'from-emerald-400 to-teal-600', label: 'Large' },
  { h: 40, color: 'from-amber-400 to-orange-600', label: 'Short' },
  { h: 72, color: 'from-violet-400 to-purple-600', label: 'X-Large' },
  { h: 44, color: 'from-cyan-400 to-blue-600', label: 'Compact' },
  { h: 52, color: 'from-fuchsia-400 to-pink-600', label: 'Wide' },
  { h: 60, color: 'from-lime-400 to-green-600', label: 'Big' },
  { h: 36, color: 'from-indigo-400 to-violet-600', label: 'Small' },
];

export default function MasonryReveal({
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
        y: 30,
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
          y: 50,
          scale: 0.95,
          duration,
          ease,
          stagger: {
            each: 0.08,
            from: 'random',
          },
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
      <h2
        ref={titleRef}
        className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
      >
        Masonry Reveal
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        Masonry grid where items reveal with a staggered random entrance.
      </p>

      <div ref={gridRef} className="columns-2 md:columns-3 gap-4 w-full max-w-5xl">
        {items.map((item, i) => (
          <div
            key={i}
            className={`break-inside-avoid mb-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-2xl flex items-center justify-center text-white font-bold text-lg`}
            style={{ height: `${item.h * 4}px` }}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
