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

export default function ScrubAnimation({
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
  const boxScrubTrueRef = useRef<HTMLDivElement>(null);
  const boxScrubDelayedRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorTrueRef = useRef<HTMLDivElement>(null);
  const indicatorDelayedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.to(boxScrubTrueRef.current, {
        x: trackRef.current ? trackRef.current.offsetWidth - 80 : 400,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          markers,
          pin: false,
          id: 'scrub-true',
        },
      });

      gsap.to(boxScrubDelayedRef.current, {
        x: trackRef.current ? trackRef.current.offsetWidth - 80 : 400,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          markers: false,
          pin: false,
          id: 'scrub-delayed',
        },
      });

      gsap.to(indicatorTrueRef.current, {
        scaleY: 1,
        transformOrigin: 'bottom center',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          markers: false,
        },
      });

      gsap.to(indicatorDelayedRef.current, {
        scaleY: 1,
        transformOrigin: 'bottom center',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          markers: false,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Scrub Animation</h2>
        <p className="text-gray-400">
          Scrub links the animation directly to scroll position. No scrub = one-time playback.
        </p>
      </div>

      <div className="w-full max-w-xl mx-auto space-y-12">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-emerald-400 font-semibold text-sm">scrub: true</span>
            <span className="text-gray-500 text-xs">Instant — no delay</span>
          </div>
          <div
            ref={trackRef}
            className="relative w-full h-20 bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden"
          >
            <div
              ref={boxScrubTrueRef}
              className="absolute top-2 left-2 w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg flex items-center justify-center text-2xl"
            >
              ⚡
            </div>
          </div>
          <div className="mt-2 flex gap-1">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                ref={indicatorTrueRef}
                className="h-full w-full bg-emerald-500 rounded-full origin-bottom scale-y-0"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-amber-400 font-semibold text-sm">scrub: 1</span>
            <span className="text-gray-500 text-xs">1 second delay — smooth lag</span>
          </div>
          <div className="relative w-full h-20 bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <div
              ref={boxScrubDelayedRef}
              className="absolute top-2 left-2 w-16 h-16 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg flex items-center justify-center text-2xl"
            >
              🐢
            </div>
          </div>
          <div className="mt-2 flex gap-1">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                ref={indicatorDelayedRef}
                className="h-full w-full bg-amber-500 rounded-full origin-bottom scale-y-0"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-2">Scrub Values</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li><code className="text-cyan-400">scrub: true</code> — Direct 1:1 mapping with scroll</li>
            <li><code className="text-cyan-400">scrub: 1</code> — 1 second of inertia/lag</li>
            <li><code className="text-cyan-400">scrub: 2</code> — 2 seconds of smooth delay</li>
            <li><code className="text-cyan-400">scrub: false</code> — Play once, not linked to scroll</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
