import { useRef, useEffect, useMemo } from 'react';
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

const lines = [
  'Words animate in sequence',
  'on scroll — each word',
  'gets its own moment',
  'to fade and slide up',
  'creating a dynamic',
  'reading experience',
];

function useSplitWords(text: string) {
  return useMemo(
    () =>
      text.split(' ').map((word, i) => (
        <span key={i} className="word inline-block mr-[0.3em]">
          {word}
        </span>
      )),
    [text]
  );
}

export default function WordReveal({
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

  const titleWords = useSplitWords('Word Reveal');
  const descWords = useSplitWords('Each word animates in sequence on scroll.');

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const titleWordEls = titleRef.current?.querySelectorAll('.word');
      if (titleWordEls) {
        gsap.from(titleWordEls, {
          opacity: 0,
          y: 20,
          duration: duration * 0.5,
          ease,
          stagger: 0.06,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            markers,
            scrub,
            pin,
          },
        });
      }

      const lines = contentRef.current?.children;
      if (lines) {
        Array.from(lines).forEach((line) => {
          const lineEl = line as HTMLDivElement;
          const words = lineEl.querySelectorAll('.word');
          gsap.from(words, {
            opacity: 0,
            y: 30,
            rotationX: 40,
            duration: duration * 0.4,
            ease: 'back.out(1.7)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: lineEl,
              start,
              end,
              markers: false,
            },
          });
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
        {titleWords}
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        {descWords}
      </p>

      <div ref={contentRef} className="w-full max-w-2xl space-y-4">
        {lines.map((line, i) => (
          <p key={i} className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
            {useSplitWords(line)}
          </p>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
