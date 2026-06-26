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

export default function NumberCounterScrub({
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
  const countRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };

      gsap.to(obj, {
        val: 100,
        duration,
        ease: 'none',
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = Math.round(obj.val).toString();
          }
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
          markers,
        },
      });

      gsap.to(progressRef.current, {
        scaleX: 1,
        duration,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
          markers: false,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-2">Number Counter Scrub</h2>
        <p className="text-gray-400">Counts from 0 to 100 as you scroll</p>
      </div>

      <div className="text-center">
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full blur-3xl opacity-20" />
          <span
            ref={countRef}
            className="relative text-8xl md:text-9xl font-black text-white tabular-nums"
          >
            0
          </span>
          <span className="relative text-4xl md:text-5xl font-black text-white/50 ml-2">%</span>
        </div>

        <div className="w-64 h-3 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div
            ref={progressRef}
            className="h-full w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full origin-left scale-x-0"
          />
        </div>
      </div>
    </div>
  );
}
