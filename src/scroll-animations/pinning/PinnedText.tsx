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

const bgColors = [
  'bg-rose-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-cyan-500',
  'bg-violet-500',
];

export default function PinnedText({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top top',
  end = '+=200%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        markers,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          markers: false,
        },
      });

      bgColors.forEach((color, i) => {
        if (i === 0) return;
        tl.to(bgRef.current, {
          className: `absolute inset-0 ${color} transition-all duration-300`,
          duration: 0.5,
        });
      });

      tl.to(textRef.current, {
        scale: 1.2,
        duration: 1,
        ease: 'power1.inOut',
      }, 0)
        .to(textRef.current, { scale: 1, duration: 1, ease: 'power1.inOut' }, '-=0.5')
        .to(textRef.current, { rotate: 5, duration: 1 }, '-=0.5')
        .to(textRef.current, { rotate: -5, duration: 1 }, '-=0.5')
        .to(textRef.current, { rotate: 0, duration: 1 }, '-=0.5');
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="relative bg-gray-950">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Pinned Text</h2>
          <p className="text-gray-400">Text stays pinned as backgrounds change behind it</p>
        </div>
      </div>

      <div ref={pinRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={bgRef}
          className={`absolute inset-0 ${bgColors[0]} transition-all duration-300`}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 px-6 text-center">
          <h1
            ref={textRef}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Text That Stays
            <br />
            <span className="text-3xl md:text-4xl text-white/70 mt-4 block font-normal">
              While the world changes around it
            </span>
          </h1>
        </div>
      </div>

      <div className="h-screen" />
    </div>
  );
}
