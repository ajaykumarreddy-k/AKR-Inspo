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

export default function StartEndMarkers({
  markers = true,
  scrub = false,
  pin = false,
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(box1Ref.current, {
        opacity: 0,
        x: -100,
        duration,
        ease,
        scrollTrigger: {
          trigger: box1Ref.current,
          start: 'top 85%',
          end: 'top 30%',
          markers,
          scrub,
          pin,
          toggleActions: 'play none none none',
          id: 'box1-early',
        },
      });

      gsap.from(box2Ref.current, {
        opacity: 0,
        scale: 0.5,
        rotation: 360,
        duration,
        ease,
        scrollTrigger: {
          trigger: box2Ref.current,
          start: 'top 70%',
          end: 'top 10%',
          markers,
          scrub,
          pin,
          toggleActions: 'play none none none',
          id: 'box2-mid',
        },
      });

      gsap.from(box3Ref.current, {
        opacity: 0,
        y: 80,
        borderRadius: '50%',
        duration,
        ease,
        scrollTrigger: {
          trigger: box3Ref.current,
          start: 'top 50%',
          end: 'bottom 0%',
          markers,
          scrub,
          pin,
          toggleActions: 'play none none none',
          id: 'box3-late',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-2">Start / End Positions</h2>
        <p className="text-gray-400">Each box triggers at a different scroll position</p>
      </div>

      <div className="w-full max-w-lg mx-auto space-y-20">
        <div className="text-center">
          <div
            ref={box1Ref}
            className="w-full h-40 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20 flex items-center justify-center"
          >
            <span className="text-white font-bold text-lg">start: top 85%</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Triggers early — near the bottom of viewport</p>
        </div>

        <div className="text-center">
          <div
            ref={box2Ref}
            className="w-full h-40 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20 flex items-center justify-center"
          >
            <span className="text-white font-bold text-lg">start: top 70%</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Triggers mid-way through scrolling</p>
        </div>

        <div className="text-center">
          <div
            ref={box3Ref}
            className="w-full h-40 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg shadow-rose-500/20 flex items-center justify-center"
          >
            <span className="text-white font-bold text-lg">start: top 50%</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Triggers late — closer to center of viewport</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-8">
          <h4 className="text-white font-semibold mb-3">How Start/End Works</h4>
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
{`start: 'top 80%'  → element's top is at 80% from viewport top
end:   'bottom 20%' → element's bottom is at 20% from viewport top

Format: "{trigger-position} {viewport-position}"
Top of viewport = 0%, Bottom = 100%`}
          </pre>
        </div>
      </div>
    </div>
  );
}
