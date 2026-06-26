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

const poem = [
  'Scroll down slowly,',
  'and watch each line',
  'of text reveal itself',
  'one by one,',
  'building a rhythm',
  'that guides your eye',
  'through the content',
  'at a deliberate pace.',
  '',
  'Line by line,',
  'the story unfolds,',
  'each verse a step',
  'on the journey.',
];

export default function LineReveal({
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
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 20,
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

      const children = linesRef.current?.children;
      if (children) {
        gsap.from(children, {
          opacity: 0,
          y: 40,
          duration: duration * 0.6,
          ease,
          stagger: 0.12,
          scrollTrigger: {
            trigger: linesRef.current,
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
        Line Reveal
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        Lines of text reveal one by one with a smooth entrance.
      </p>

      <div
        ref={linesRef}
        className="w-full max-w-xl border-l-2 border-neutral-700 pl-6 space-y-1"
      >
        {poem.map((line, i) => (
          <p
            key={i}
            className={`text-lg md:text-xl leading-relaxed ${
              line === '' ? 'h-6' : 'text-white/80 font-light'
            }`}
          >
            {line}
          </p>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
