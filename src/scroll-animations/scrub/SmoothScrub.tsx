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

export default function SmoothScrub({
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
  const boxRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: trackRef.current ? trackRef.current.offsetWidth - 80 : 400,
        duration,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
          markers,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-2">Smooth Scrub</h2>
        <p className="text-gray-400">Box smoothly moves from left to right with scrub: 1</p>
      </div>

      <div className="w-full max-w-2xl mx-auto">
        <div
          ref={trackRef}
          className="relative w-full h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center px-4"
        >
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -translate-y-1/2" />
          <div className="absolute left-4 text-white/20 text-sm">Start</div>
          <div className="absolute right-4 text-white/20 text-sm">End</div>
          <div
            ref={boxRef}
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-2xl shadow-violet-500/30 flex items-center justify-center text-white text-2xl font-bold relative z-10"
          >
            ✦
          </div>
        </div>
      </div>
    </div>
  );
}
