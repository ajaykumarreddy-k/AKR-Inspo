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

export default function StickyHero({
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        markers,
      });

      gsap.to(overlayRef.current, {
        backgroundColor: 'rgba(0,0,0,0.8)',
        duration: 1,
        ease,
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=100%',
          scrub,
          markers: false,
        },
      });

      gsap.fromTo(
        titleRef.current,
        { y: 0, scale: 1 },
        {
          y: -100,
          scale: 0.6,
          opacity: 0.3,
          duration: 1,
          ease,
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=100%',
            scrub,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 0, opacity: 1 },
        {
          y: -80,
          opacity: 0,
          duration: 1,
          ease,
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=80%',
            scrub,
            markers: false,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="relative">
      <div className="h-screen" />

      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-500/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        </div>

        <div ref={overlayRef} className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-white text-center leading-tight"
          >
            Sticky Hero
          </h1>
          <p
            ref={subtitleRef}
            className="mt-6 text-xl md:text-2xl text-white/70 text-center max-w-2xl"
          >
            This hero section stays pinned while content scrolls over it
          </p>
        </div>
      </div>

      <div className="relative z-20 -mt-screen">
        <div className="bg-gray-950 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl text-center space-y-8 py-32">
            <h2 className="text-4xl font-bold text-white">Content Overlay</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              This content scrolls over the pinned hero section. The hero stays locked in place
              while this text and additional content scroll on top of it, creating a layered
              scrolling effect.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg mb-4">
                    {i}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Feature {i}</h3>
                  <p className="text-gray-400 text-sm">
                    Content card that scrolls over the pinned hero area below.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
