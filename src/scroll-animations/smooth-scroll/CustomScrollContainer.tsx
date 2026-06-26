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

export default function CustomScrollContainer({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    const scroller = scrollerRef.current;
    if (!el || !scroller || disabled) return;

    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: scroller,
          scroller,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          markers,
        },
      });

      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.from(item, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          duration: 0.7,
          ease,
          scrollTrigger: {
            trigger: item,
            scroller,
            start: 'top 85%',
            end: 'top 35%',
            markers: false,
            toggleActions: 'play none none none',
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  const colors = [
    'from-pink-500 to-rose-600',
    'from-violet-500 to-purple-700',
    'from-sky-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-amber-600',
    'from-cyan-500 to-teal-600',
  ];

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32">
      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Custom Scroll Container</h2>
        <p className="text-gray-400">
          ScrollTrigger tracks a custom div with overflow:auto
        </p>
      </div>

      <div className="w-full max-w-lg relative">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
          <div
            ref={progressRef}
            className="h-full w-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full origin-left scale-x-0"
          />
        </div>

        <div
          ref={scrollerRef}
          className="h-80 overflow-y-auto scroll-smooth rounded-2xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm p-4"
        >
          <div className="space-y-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`h-32 rounded-xl bg-gradient-to-br ${colors[i % colors.length]} shadow-lg flex items-center justify-center`}
              >
                <span className="text-2xl text-white font-bold">Card {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-3 text-center">
          Scroll inside the container &mdash; animations use scroller option
        </p>
      </div>
    </div>
  );
}
