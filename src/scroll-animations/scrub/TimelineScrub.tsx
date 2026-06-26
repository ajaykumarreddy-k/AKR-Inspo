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

export default function TimelineScrub({
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
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const box4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
          markers,
        },
      });

      tl.to(box1Ref.current, {
        x: 200,
        rotation: 360,
        scale: 1.3,
        duration: 1,
        ease: 'power2.inOut',
      });

      tl.to(
        box2Ref.current,
        {
          y: -100,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(2)',
        },
        '-=0.5'
      );

      tl.to(
        box3Ref.current,
        {
          rotation: 180,
          scale: 1.5,
          backgroundColor: '#8b5cf6',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '-=0.4'
      );

      tl.to(
        box4Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-2">Timeline Scrub</h2>
        <p className="text-gray-400">Multiple elements animate through a timeline with scrub</p>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto w-full">
        <div
          ref={box1Ref}
          className="h-36 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-xl flex items-center justify-center text-white text-2xl font-bold"
        >
          01
        </div>
        <div
          ref={box2Ref}
          className="h-36 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-xl flex items-center justify-center text-white text-2xl font-bold opacity-30 scale-75"
        >
          02
        </div>
        <div
          ref={box3Ref}
          className="h-36 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl flex items-center justify-center text-white text-2xl font-bold"
        >
          03
        </div>
        <div
          ref={box4Ref}
          className="h-36 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-xl flex items-center justify-center text-white text-2xl font-bold opacity-0 translate-y-8"
        >
          04
        </div>
      </div>
    </div>
  );
}
