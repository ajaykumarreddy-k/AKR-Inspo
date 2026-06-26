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

export default function ScrollVelocity({
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
  const ballFastRef = useRef<HTMLDivElement>(null);
  const ballModerateRef = useRef<HTMLDivElement>(null);
  const ballSlowRef = useRef<HTMLDivElement>(null);
  const velocityIndicatorRef = useRef<HTMLDivElement>(null);
  const velocityTextRef = useRef<HTMLSpanElement>(null);
  const barFastRef = useRef<HTMLDivElement>(null);
  const barModerateRef = useRef<HTMLDivElement>(null);
  const barSlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    let lastY = 0;
    let velocity = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        markers,
        onUpdate: (self) => {
          const delta = self.scroll() - lastY;
          lastY = self.scroll();
          velocity = Math.abs(delta);

          if (velocityIndicatorRef.current) {
            const hue = Math.min(velocity * 8, 120);
            velocityIndicatorRef.current.style.width = `${Math.min(velocity * 3, 100)}%`;
            velocityIndicatorRef.current.style.background = `hsl(${hue}, 80%, 50%)`;
          }

          if (velocityTextRef.current) {
            velocityTextRef.current.textContent = `${Math.round(velocity)}`;
          }
        },
      });

      gsap.to(ballFastRef.current, {
        y: 300,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          markers: false,
        },
      });

      gsap.to(ballModerateRef.current, {
        y: 250,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
          markers: false,
        },
      });

      gsap.to(ballSlowRef.current, {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
          markers: false,
        },
      });

      const fastTL = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          markers: false,
        },
      });

      fastTL
        .to(barFastRef.current, {
          scaleX: 1.5,
          backgroundColor: '#f43f5e',
          duration: 0.3,
        })
        .to(barFastRef.current, {
          scaleX: 1,
          backgroundColor: '#3b82f6',
          duration: 0.3,
        });

      const moderateTL = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
          markers: false,
        },
      });

      moderateTL
        .to(barModerateRef.current, {
          scaleX: 1.3,
          backgroundColor: '#f59e0b',
          duration: 0.3,
        })
        .to(barModerateRef.current, {
          scaleX: 1,
          backgroundColor: '#3b82f6',
          duration: 0.3,
        });

      const slowTL = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
          markers: false,
        },
      });

      slowTL
        .to(barSlowRef.current, {
          scaleX: 1.2,
          backgroundColor: '#10b981',
          duration: 0.3,
        })
        .to(barSlowRef.current, {
          scaleX: 1,
          backgroundColor: '#3b82f6',
          duration: 0.3,
        });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Scroll Velocity</h2>
        <p className="text-gray-400">
          Elements react to how fast you scroll — faster scroll = more dramatic animation
        </p>
      </div>

      <div className="w-full max-w-lg mx-auto space-y-8">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold">Velocity Meter</span>
            <span ref={velocityTextRef} className="text-2xl font-bold text-cyan-400 font-mono">0</span>
          </div>
          <div className="h-4 bg-gray-900 rounded-full overflow-hidden">
            <div
              ref={velocityIndicatorRef}
              className="h-full w-0 rounded-full transition-all duration-75"
            />
          </div>
          <p className="text-gray-500 text-xs mt-2">Scroll speed determines bar intensity</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              ref={ballFastRef}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shrink-0"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-white text-sm font-medium">scrub: true</span>
                <span className="text-rose-400 text-xs">Instant</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full mt-1 overflow-hidden">
                <div ref={barFastRef} className="h-full w-full bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              ref={ballModerateRef}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shrink-0"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-white text-sm font-medium">scrub: 0.5</span>
                <span className="text-amber-400 text-xs">Moderate</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full mt-1 overflow-hidden">
                <div ref={barModerateRef} className="h-full w-full bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              ref={ballSlowRef}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shrink-0"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-white text-sm font-medium">scrub: 1.5</span>
                <span className="text-emerald-400 text-xs">Slow / Laggy</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full mt-1 overflow-hidden">
                <div ref={barSlowRef} className="h-full w-full bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
