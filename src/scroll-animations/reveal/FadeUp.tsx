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

const items = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  title: `Card ${i + 1}`,
  description: 'Animates into view on scroll with stagger.',
  gradient: `from-${['rose', 'sky', 'emerald', 'violet', 'amber', 'cyan', 'pink', 'lime', 'indigo'][i]}-500 to-${
    ['pink', 'blue', 'teal', 'purple', 'orange', 'blue', 'rose', 'green', 'fuchsia'][i]
  }-700`,
}));

export default function FadeUp({
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
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
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

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          duration,
          ease,
          stagger: 0.1,
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
        Fade Up
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        Elements fade and slide up as they enter the viewport with a staggered grid.
      </p>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl h-48 bg-gradient-to-br ${item.gradient} shadow-2xl flex flex-col items-center justify-center p-6 text-white`}
          >
            <span className="text-3xl font-bold mb-2">{item.title}</span>
            <span className="text-sm opacity-80 text-center">{item.description}</span>
          </div>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
