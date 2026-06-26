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

const cards = [
  { title: 'Clarity', desc: 'From blurry abstraction to crystal clear reality.', gradient: 'from-indigo-500 to-purple-700' },
  { title: 'Focus', desc: 'Sharp details emerge as you scroll into view.', gradient: 'from-teal-500 to-cyan-700' },
  { title: 'Vision', desc: 'See the bigger picture come into focus.', gradient: 'from-orange-500 to-red-700' },
];

export default function BlurReveal({
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
        filter: 'blur(20px)',
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
          filter: 'blur(16px)',
          scale: 1.1,
          duration,
          ease,
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
      <h2
        ref={titleRef}
        className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
      >
        Blur Reveal
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        Elements transition from blurry to sharp as you scroll.
      </p>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-2xl bg-gradient-to-br ${card.gradient} p-8 text-white min-h-[220px] flex flex-col justify-center shadow-2xl`}
          >
            <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
            <p className="text-sm opacity-80 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
