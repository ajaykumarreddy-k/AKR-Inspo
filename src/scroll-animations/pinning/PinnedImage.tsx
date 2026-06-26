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

export default function PinnedImage({
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
  const contentTopRef = useRef<HTMLDivElement>(null);
  const contentBottomRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(
        pinRef.current.querySelector('.image-element'),
        { scale: 0.8, rotate: -5, borderRadius: '2rem' },
        {
          scale: 1.1,
          rotate: 0,
          borderRadius: '1rem',
          duration: 1,
          ease,
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=150%',
            scrub,
            markers: false,
          },
        }
      );

      gsap.from(contentTopRef.current, {
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease,
        scrollTrigger: {
          trigger: contentTopRef.current,
          start: 'top 80%',
          end: 'top center',
          scrub,
          markers: false,
        },
      });

      gsap.from(contentBottomRef.current, {
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease,
        scrollTrigger: {
          trigger: contentBottomRef.current,
          start: 'top 80%',
          end: 'top center',
          scrub,
          markers: false,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="relative bg-gray-950">
      <div className="h-screen flex items-center justify-center" ref={contentTopRef}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-4">Pinned Image</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Scrolling content above the pinned image. The image stays centered while
            text flows around it, demonstrating how pinning can anchor visual elements
            in place during scroll.
          </p>
        </div>
      </div>

      <div ref={pinRef} className="relative h-screen flex items-center justify-center">
        <div className="image-element w-80 h-80 md:w-96 md:h-96 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🖼️</div>
            <p className="text-white/70 text-sm">Pinned Image</p>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center" ref={contentBottomRef}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-400 text-lg leading-relaxed">
            Content below the pinned image. Even as you scroll past, the image remains
            fixed in the center until all surrounding content has passed. This creates
            a focused visual anchor point in the scrolling narrative.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-lg"
              >
                Content Block {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
