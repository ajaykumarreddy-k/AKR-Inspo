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

const panels = [
  { title: 'Circle Reveal', color: 'from-fuchsia-500 to-violet-600', clip: 'circle(0% at 50% 50%)', clipEnd: 'circle(100% at 50% 50%)' },
  { title: 'Wedge Reveal', color: 'from-cyan-500 to-blue-600', clip: 'polygon(50% 50%, 50% 50%, 50% 50%)', clipEnd: 'polygon(50% 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
  { title: 'Slide Cover', color: 'from-amber-500 to-rose-600', clip: 'inset(0 0 0 100%)', clipEnd: 'inset(0 0 0 0%)' },
];

export default function ClipPathReveal({
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
        clipPath: 'inset(0 100% 0 0)',
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
        Array.from(children).forEach((child, i) => {
          const panel = panels[i];
          const el = child as HTMLDivElement;
          gsap.from(el, {
            clipPath: panel.clip,
            duration,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: el,
              start,
              end: 'center 50%',
              markers: false,
            },
          });
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
        Clip Path Reveal
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        Elements revealed via clip-path animations — circle, wedge, and slide.
      </p>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {panels.map((panel) => (
          <div
            key={panel.title}
            className={`rounded-2xl bg-gradient-to-br ${panel.color} p-8 text-white min-h-[260px] flex flex-col justify-center shadow-2xl`}
          >
            <h3 className="text-2xl font-bold mb-3">{panel.title}</h3>
            <p className="text-sm opacity-80">
              Scroll to reveal this panel via CSS clip-path animation.
            </p>
          </div>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
