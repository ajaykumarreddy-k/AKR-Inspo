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

const images = [
  { label: 'Dawn', emoji: '🌅', color: 'from-amber-400 to-orange-600' },
  { label: 'Ocean', emoji: '🌊', color: 'from-cyan-400 to-blue-600' },
  { label: 'Forest', emoji: '🌲', color: 'from-emerald-400 to-teal-600' },
  { label: 'Desert', emoji: '🏜️', color: 'from-yellow-400 to-red-500' },
  { label: 'Night', emoji: '🌃', color: 'from-indigo-500 to-purple-700' },
];

export default function GalleryReveal({
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
  const trackRef = useRef<HTMLDivElement>(null);

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

      const children = trackRef.current?.children;
      if (children) {
        gsap.from(children, {
          opacity: 0,
          x: 80,
          scale: 0.8,
          rotateY: 30,
          duration,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: trackRef.current,
            start,
            end,
            markers: false,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-4">
      <h2
        ref={titleRef}
        className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
      >
        Gallery Reveal
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        A row of images that progressively reveal with stagger and 3D rotation.
      </p>

      <div
        ref={trackRef}
        className="flex flex-col md:flex-row gap-4 w-full max-w-5xl"
      >
        {images.map((img) => (
          <div
            key={img.label}
            className={`flex-1 rounded-2xl bg-gradient-to-br ${img.color} shadow-2xl h-64 flex flex-col items-center justify-center text-white`}
          >
            <span className="text-5xl mb-3">{img.emoji}</span>
            <span className="text-lg font-semibold">{img.label}</span>
          </div>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
