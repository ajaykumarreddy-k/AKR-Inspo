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

export default function ScaleScrub({
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
  const scaleUpRef = useRef<HTMLDivElement>(null);
  const scaleDownRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const wobbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.to(scaleUpRef.current, {
        scale: 1.8,
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

      gsap.to(scaleDownRef.current, {
        scale: 0.3,
        opacity: 0.4,
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

      gsap.to(pulseRef.current, {
        scale: 1.5,
        duration: duration * 0.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
          markers: false,
        },
      });

      gsap.to(wobbleRef.current, {
        scaleX: 1.4,
        scaleY: 0.6,
        duration: duration * 0.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 2,
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
        <h2 className="text-4xl font-bold text-white mb-2">Scale Scrub</h2>
        <p className="text-gray-400">Elements scale up and down based on scroll position</p>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-lg mx-auto">
        <div
          ref={scaleUpRef}
          className="aspect-square rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-xl flex items-center justify-center"
        >
          <span className="text-white font-bold text-sm text-center px-2">
            Scale<br />Up
          </span>
        </div>
        <div
          ref={scaleDownRef}
          className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-xl flex items-center justify-center"
        >
          <span className="text-white font-bold text-sm text-center px-2">
            Scale<br />Down
          </span>
        </div>
        <div
          ref={pulseRef}
          className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl flex items-center justify-center"
        >
          <span className="text-white font-bold text-sm text-center px-2">
            Pulse
          </span>
        </div>
        <div
          ref={wobbleRef}
          className="aspect-square rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-xl flex items-center justify-center"
        >
          <span className="text-white font-bold text-sm text-center px-2">
            Wobble
          </span>
        </div>
      </div>
    </div>
  );
}
