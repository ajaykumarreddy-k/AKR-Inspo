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

export default function ImageReveal({
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: duration * 0.8,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          markers,
          scrub,
          pin,
        },
      });

      if (imgRef.current) {
        gsap.from(imgRef.current, {
          scale: 1.4,
          duration: duration * 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: imgRef.current,
            start,
            end: 'center 60%',
            markers: false,
          },
        });
      }

      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          scaleX: 0,
          duration: duration * 1.2,
          ease: 'power4.inOut',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: overlayRef.current,
            start,
            end: 'center 50%',
            markers: false,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-4">
      <div className="text-center mb-16">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Image Reveal
        </h2>
        <p className="text-gray-400 text-lg max-w-md">
          Full-width image reveals from center outward with an overlay effect.
        </p>
      </div>

      <div className="relative w-full max-w-5xl h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <div
          ref={imgRef}
          className="absolute inset-0 bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-700"
          style={{ backgroundSize: 'cover' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <span className="text-7xl block mb-4">🏔️</span>
              <span className="text-xl font-light tracking-widest">LANDSCAPE</span>
            </div>
          </div>
        </div>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-neutral-950"
          style={{ transformOrigin: 'left center' }}
        />
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
