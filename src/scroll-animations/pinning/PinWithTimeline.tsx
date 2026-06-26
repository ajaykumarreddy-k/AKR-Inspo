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

export default function PinWithTimeline({
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
  const boxRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

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

      tl.to(boxRef.current, {
        x: 200,
        rotation: 360,
        borderRadius: '50%',
        backgroundColor: '#8b5cf6',
        duration: 1,
        ease: 'power2.inOut',
      })
        .to(boxRef.current, {
          x: 0,
          y: 100,
          scale: 1.5,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to(boxRef.current, {
          y: 0,
          rotation: 720,
          borderRadius: '1rem',
          backgroundColor: '#ec4899',
          duration: 1,
          ease: 'power2.inOut',
        });

      tl.to(
        circleRef.current,
        {
          scale: 1.5,
          opacity: 0.3,
          duration: 1,
          ease: 'power1.inOut',
        },
        0
      )
        .to(circleRef.current, { scale: 0.5, opacity: 1, duration: 1 }, '-=0.5')
        .to(circleRef.current, { scale: 2, opacity: 0, duration: 1 }, '-=0.5');

      tl.to(
        textRef.current,
        {
          text: 'Animating...',
          duration: 0.5,
        },
        0.3
      )
        .to(textRef.current, { text: 'Through Timeline', duration: 0.5 }, '-=0.2')
        .to(textRef.current, { text: 'Pin Complete!', duration: 0.5 }, '-=0.2');

      tl.to(
        barRef.current,
        {
          scaleX: 1,
          duration: 2.5,
          ease: 'none',
        },
        0
      );
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="relative bg-gray-950">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Pin With Timeline</h2>
          <p className="text-gray-400">A pinned element animates through a GSAP timeline</p>
        </div>
      </div>

      <div
        ref={pinRef}
        className="relative h-screen flex flex-col items-center justify-center gap-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <div
              ref={circleRef}
              className="absolute -inset-8 rounded-full bg-purple-500/20"
            />
            <div
              ref={boxRef}
              className="w-32 h-32 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl shadow-purple-500/30 flex items-center justify-center"
            >
              <span className="text-4xl">✦</span>
            </div>
          </div>

          <h3
            ref={textRef}
            className="text-2xl font-bold text-white text-center"
          >
            Ready...
          </h3>

          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={barRef}
              className="h-full w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full origin-left scale-x-0"
            />
          </div>
        </div>
      </div>

      <div className="h-screen" />
    </div>
  );
}
