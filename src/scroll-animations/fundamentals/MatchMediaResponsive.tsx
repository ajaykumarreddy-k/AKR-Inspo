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

export default function MatchMediaResponsive({
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
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const breakpointRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isTablet: '(min-width: 640px) and (max-width: 1023px)',
          isMobile: '(max-width: 639px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions!;

          if (reduceMotion) {
            gsap.set([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current], {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
            });
            return;
          }

          if (isDesktop) {
            gsap.fromTo(
              card1Ref.current,
              { opacity: 0, x: -200, rotation: -10 },
              {
                opacity: 1, x: 0, rotation: 0,
                duration, ease,
                scrollTrigger: { trigger: card1Ref.current, start, end, markers, toggleActions: 'play none none none' },
              }
            );
            gsap.fromTo(
              card2Ref.current,
              { opacity: 0, y: 100, scale: 0.5 },
              {
                opacity: 1, y: 0, scale: 1,
                duration, ease,
                scrollTrigger: { trigger: card2Ref.current, start, end, markers: false },
              }
            );
            gsap.fromTo(
              card3Ref.current,
              { opacity: 0, x: 200, rotation: 10 },
              {
                opacity: 1, x: 0, rotation: 0,
                duration, ease,
                scrollTrigger: { trigger: card3Ref.current, start, end, markers: false },
              }
            );
            gsap.fromTo(
              card4Ref.current,
              { opacity: 0, y: -60 },
              {
                opacity: 1, y: 0,
                duration, ease,
                scrollTrigger: { trigger: card4Ref.current, start, end, markers: false },
              }
            );
          } else if (isTablet) {
            gsap.fromTo(
              card1Ref.current,
              { opacity: 0, y: 60, scale: 0.8 },
              {
                opacity: 1, y: 0, scale: 1,
                duration, ease,
                scrollTrigger: { trigger: card1Ref.current, start, end, markers },
              }
            );
            gsap.fromTo(
              card2Ref.current,
              { opacity: 0, y: 60, scale: 0.8 },
              {
                opacity: 1, y: 0, scale: 1,
                duration, ease,
                scrollTrigger: { trigger: card2Ref.current, start, end, markers: false },
              }
            );
            gsap.fromTo(
              card3Ref.current,
              { opacity: 0, y: 60, scale: 0.8 },
              {
                opacity: 1, y: 0, scale: 1,
                duration, ease,
                scrollTrigger: { trigger: card3Ref.current, start, end, markers: false },
              }
            );
            gsap.fromTo(
              card4Ref.current,
              { opacity: 0, y: 60, scale: 0.8 },
              {
                opacity: 1, y: 0, scale: 1,
                duration, ease,
                scrollTrigger: { trigger: card4Ref.current, start, end, markers: false },
              }
            );
          } else if (isMobile) {
            gsap.fromTo(
              card1Ref.current,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0,
                duration: 0.6, ease,
                scrollTrigger: { trigger: card1Ref.current, start: 'top 85%', end, markers },
              }
            );
            gsap.fromTo(
              card2Ref.current,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0,
                duration: 0.6, ease,
                scrollTrigger: { trigger: card2Ref.current, start: 'top 85%', end, markers: false },
              }
            );
            gsap.fromTo(
              card3Ref.current,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0,
                duration: 0.6, ease,
                scrollTrigger: { trigger: card3Ref.current, start: 'top 85%', end, markers: false },
              }
            );
            gsap.fromTo(
              card4Ref.current,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0,
                duration: 0.6, ease,
                scrollTrigger: { trigger: card4Ref.current, start: 'top 85%', end, markers: false },
              }
            );
          }
        }
      );

      return () => mm.revert();
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Responsive ScrollTrigger</h2>
        <p className="text-gray-400">
          Different animations per breakpoint using <code className="text-cyan-400">gsap.matchMedia()</code>
        </p>
      </div>

      <div
        ref={breakpointRef}
        className="text-center text-sm text-cyan-400 font-mono mb-8"
      >
        Resize your browser to see breakpoint changes
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          ref={card1Ref}
          className="h-48 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg flex items-center justify-center"
        >
          <div className="text-center">
            <span className="text-3xl block mb-2">🖥️</span>
            <span className="text-white font-semibold">Desktop</span>
          </div>
        </div>

        <div
          ref={card2Ref}
          className="h-48 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg flex items-center justify-center"
        >
          <div className="text-center">
            <span className="text-3xl block mb-2">📱</span>
            <span className="text-white font-semibold">Tablet</span>
          </div>
        </div>

        <div
          ref={card3Ref}
          className="h-48 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg flex items-center justify-center"
        >
          <div className="text-center">
            <span className="text-3xl block mb-2">📲</span>
            <span className="text-white font-semibold">Mobile</span>
          </div>
        </div>

        <div
          ref={card4Ref}
          className="h-48 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg flex items-center justify-center"
        >
          <div className="text-center">
            <span className="text-3xl block mb-2">♿</span>
            <span className="text-white font-semibold">Reduced Motion</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto mt-12 px-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-2">Breakpoint Conditions</h4>
          <pre className="text-sm text-gray-300 font-mono">
{`isDesktop: '(min-width: 1024px)'
isTablet: '(min-width: 640px) and (max-width: 1023px)'
isMobile: '(max-width: 639px)'
reduceMotion: '(prefers-reduced-motion: reduce)'`}
          </pre>
        </div>
      </div>
    </div>
  );
}
