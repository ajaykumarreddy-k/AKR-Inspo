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

const sentences = [
  'Each sentence appears one by one',
  'as you scroll down the page.',
  'This creates a rhythmic reading experience',
  'that guides the user through content.',
  'Like turning pages in a book,',
  'every line has its moment to shine.',
];

export default function SplitTextReveal({
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
  const contentRef = useRef<HTMLDivElement>(null);

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

      const children = contentRef.current?.children;
      if (children) {
        gsap.from(children, {
          opacity: 0,
          y: 30,
          duration: duration * 0.7,
          ease,
          stagger: 0.25,
          scrollTrigger: {
            trigger: contentRef.current,
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
        Split Text Reveal
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        Sentences reveal one by one as you scroll.
      </p>

      <div ref={contentRef} className="w-full max-w-2xl space-y-6">
        {sentences.map((sentence, i) => (
          <p
            key={i}
            className="text-xl md:text-2xl text-white/90 leading-relaxed font-light tracking-wide"
          >
            {sentence}
          </p>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
