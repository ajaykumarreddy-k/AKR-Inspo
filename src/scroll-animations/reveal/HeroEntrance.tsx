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

export default function HeroEntrance({
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
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          end,
          markers,
          scrub,
          pin,
        },
      });

      tl.from(bgRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: duration * 1.2,
        ease: 'power4.out',
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 80,
            duration: duration * 0.9,
            ease,
          },
          '-=0.6'
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: duration * 0.7,
            ease,
          },
          '-=0.4'
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: duration * 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center min-h-screen py-32 px-4 overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-400 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Hero Entrance
        </h2>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-10 font-light leading-relaxed"
        >
          A full hero section with title, subtitle, CTA, and background all animating
          in sequence on scroll. Everything comes together seamlessly.
        </p>
        <div ref={ctaRef} className="flex items-center justify-center gap-4">
          <button className="px-8 py-3.5 rounded-full bg-white text-neutral-900 font-semibold text-sm hover:bg-gray-100 transition-colors shadow-xl">
            Get Started
          </button>
          <button className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
