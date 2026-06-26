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

const features = [
  { icon: '🚀', title: 'Speed', desc: 'Lightning fast performance optimized for modern browsers.' },
  { icon: '🎨', title: 'Design', desc: 'Beautiful, pixel-perfect animations out of the box.' },
  { icon: '⚡', title: 'Power', desc: 'Full control over every aspect of your animation.' },
  { icon: '🔧', title: 'Flexible', desc: 'Works with any framework or vanilla JS setup.' },
];

export default function FadeLeft({
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
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        x: -60,
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

      const children = listRef.current?.children;
      if (children) {
        gsap.from(children, {
          opacity: 0,
          x: -100,
          duration,
          ease,
          stagger: 0.12,
          scrollTrigger: {
            trigger: listRef.current,
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
        Fade Left
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        Content slides in from the left with a smooth fade.
      </p>

      <div ref={listRef} className="w-full max-w-2xl space-y-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex items-center gap-5 bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-xl p-5"
          >
            <span className="text-3xl">{f.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
