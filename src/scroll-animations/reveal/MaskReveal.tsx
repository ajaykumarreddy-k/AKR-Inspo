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

export default function MaskReveal({
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
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
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

      if (maskRef.current) {
        gsap.from(maskRef.current, {
          width: '0%',
          duration,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: maskRef.current,
            start,
            end: 'center 50%',
            markers: false,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-4">
      <div className="text-center mb-16">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Mask Reveal
        </h2>
        <p className="text-gray-400 text-lg max-w-md">
          Content is revealed behind a moving mask that slides open.
        </p>
      </div>

      <div className="relative w-full max-w-3xl h-80 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center">
          <span className="text-6xl">🌿</span>
        </div>
        <div
          ref={maskRef}
          className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-700 flex items-center justify-center overflow-hidden"
        >
          <div className="text-center text-white p-8">
            <span className="text-6xl block mb-4">✨</span>
            <h3 className="text-2xl font-bold">Revealed Content</h3>
            <p className="text-sm opacity-80 mt-2">The mask slides away to show what's beneath</p>
          </div>
        </div>
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
