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
  { id: 1, title: 'Gravity', desc: 'Falling gracefully into place', color: 'from-indigo-500 to-purple-600' },
  { id: 2, title: 'Descent', desc: 'Each element drops into view', color: 'from-rose-500 to-pink-600' },
  { id: 3, title: 'Drop Zone', desc: 'Landing with smooth motion', color: 'from-amber-500 to-orange-600' },
];

export default function FadeDown({
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
        y: -40,
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
          opacity: 0,
          y: -80,
          duration,
          ease: 'back.out(1.7)',
          stagger: 0.15,
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
        Fade Down
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        Elements drop down into view with a smooth fade.
      </p>

      <div ref={itemsRef} className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex-1 rounded-2xl bg-gradient-to-br ${item.color} shadow-2xl p-8 text-white min-h-[200px] flex flex-col justify-center`}
          >
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm opacity-80">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
