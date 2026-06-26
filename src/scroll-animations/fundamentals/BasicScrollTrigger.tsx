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

export default function BasicScrollTrigger({
  markers = false,
  scrub = false,
  pin = false,
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.8,
        duration,
        ease,
        scrollTrigger: {
          trigger: boxRef.current,
          start,
          end,
          markers,
          scrub,
          pin,
          toggleActions: 'play none none none',
        },
      });

      gsap.from(textRef.current, {
        opacity: 0,
        x: -40,
        duration: duration * 0.8,
        delay: 0.15,
        ease,
        scrollTrigger: {
          trigger: boxRef.current,
          start,
          end,
          markers: false,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">Basic ScrollTrigger</h2>
        <p className="text-gray-400">Scroll down to see the fade-in animation</p>
      </div>

      <div className="w-full max-w-lg mx-auto space-y-8">
        <div
          ref={boxRef}
          className="w-full h-80 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-2xl shadow-violet-500/20 flex items-center justify-center"
        >
          <span className="text-6xl">✨</span>
        </div>

        <h3
          ref={textRef}
          className="text-2xl font-semibold text-white text-center"
        >
          Fades in from below with a smooth scale effect
        </h3>
      </div>
    </div>
  );
}
