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
  { size: 'w-32 h-32', delay: 0, color: 'from-sky-400 to-blue-600' },
  { size: 'w-40 h-40', delay: 0.1, color: 'from-violet-400 to-purple-600' },
  { size: 'w-36 h-36', delay: 0.2, color: 'from-rose-400 to-pink-600' },
  { size: 'w-44 h-44', delay: 0.05, color: 'from-emerald-400 to-teal-600' },
  { size: 'w-28 h-28', delay: 0.15, color: 'from-amber-400 to-orange-600' },
];

export default function ScaleReveal({
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
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        scale: 0.5,
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

      const children = itemsRef.current?.children;
      if (children) {
        gsap.from(children, {
          scale: 0,
          opacity: 0,
          duration,
          ease: 'back.out(2)',
          stagger: 0.12,
          scrollTrigger: {
            trigger: itemsRef.current,
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
        Scale Reveal
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        Elements scale up from zero to their full size on scroll.
      </p>

      <div
        ref={itemsRef}
        className="flex flex-wrap items-center justify-center gap-6 w-full max-w-4xl"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={`${item.size} rounded-2xl bg-gradient-to-br ${item.color} shadow-2xl flex items-center justify-center text-white font-bold text-lg`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
