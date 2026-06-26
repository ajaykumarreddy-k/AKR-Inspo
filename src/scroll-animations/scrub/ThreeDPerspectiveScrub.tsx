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

export default function ThreeDPerspectiveScrub({
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
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const container3dRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.to(card1Ref.current, {
        rotateX: 360,
        rotateY: 180,
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

      gsap.to(card2Ref.current, {
        rotateX: -180,
        rotateY: 360,
        z: 100,
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

      gsap.to(card3Ref.current, {
        rotateX: 180,
        rotateY: -180,
        scale: 1.3,
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

      gsap.to(container3dRef.current, {
        rotateX: 20,
        rotateY: 30,
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
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-2">3D Perspective Scrub</h2>
        <p className="text-gray-400">Elements with 3D transforms controlled by scroll</p>
      </div>

      <div
        ref={container3dRef}
        className="perspective-1000"
        style={{ perspective: '1000px' }}
      >
        <div className="grid grid-cols-3 gap-4 w-full max-w-lg mx-auto">
          <div
            ref={card1Ref}
            className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-xl flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="text-white font-bold text-lg" style={{ transform: 'translateZ(20px)' }}>X</span>
          </div>
          <div
            ref={card2Ref}
            className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-xl flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="text-white font-bold text-lg" style={{ transform: 'translateZ(20px)' }}>Y</span>
          </div>
          <div
            ref={card3Ref}
            className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="text-white font-bold text-lg" style={{ transform: 'translateZ(20px)' }}>Z</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm max-w-md">
        <p>Cards rotate on X, Y, and Z axes with perspective transforms.</p>
        <p className="mt-1">Scroll up and down to see the 3D effect in action.</p>
      </div>
    </div>
  );
}
