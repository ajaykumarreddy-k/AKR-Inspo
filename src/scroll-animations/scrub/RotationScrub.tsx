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

export default function RotationScrub({
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
  const outerRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reverseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.to(outerRef.current, {
        rotation: 360,
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

      gsap.to(middleRef.current, {
        rotation: -360,
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

      gsap.to(innerRef.current, {
        rotation: 720,
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

      gsap.to(reverseRef.current, {
        rotation: -1080,
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
        <h2 className="text-4xl font-bold text-white mb-2">Rotation Scrub</h2>
        <p className="text-gray-400">Elements rotate at different speeds and directions</p>
      </div>

      <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
        <div
          ref={outerRef}
          className="absolute inset-0 rounded-full border-2 border-dashed border-violet-500/40"
        />
        <div
          ref={middleRef}
          className="absolute inset-4 rounded-full border-2 border-dashed border-cyan-500/40"
        />
        <div
          ref={innerRef}
          className="absolute inset-8 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl"
        >
          <span className="text-3xl font-bold text-white">✦</span>
        </div>
        <div
          ref={reverseRef}
          className="absolute -inset-4 rounded-full border-2 border-dashed border-pink-500/30"
        />
      </div>

      <div className="mt-8 flex gap-4 text-sm text-gray-500">
        <span>Outer: CW</span>
        <span>Middle: CCW</span>
        <span>Inner: Double CW</span>
        <span>Ring: Triple CCW</span>
      </div>
    </div>
  );
}
