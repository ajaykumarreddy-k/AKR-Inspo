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

const title = 'Character Reveal';
const subtitle = 'Each character animates in one at a time on scroll — a dramatic letter-by-letter entrance.';

function useSplitChars(text: string) {
  return useMemo(
    () =>
      text.split('').map((char, i) => (
        <span key={i} className="char inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      )),
    [text]
  );
}

export default function CharacterReveal({
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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  const titleChars = useSplitChars(title);
  const subtitleChars = useSplitChars(subtitle);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const headingChars = headingRef.current?.querySelectorAll('.char');
      if (headingChars) {
        gsap.from(headingChars, {
          opacity: 0,
          y: 20,
          rotateX: 90,
          duration: duration * 0.5,
          ease,
          stagger: 0.03,
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

      const paraChars = paraRef.current?.querySelectorAll('.char');
      if (paraChars) {
        gsap.from(paraChars, {
          opacity: 0,
          y: 10,
          duration: duration * 0.3,
          ease,
          stagger: 0.01,
          scrollTrigger: {
            trigger: paraRef.current,
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
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold text-white mb-6 text-center max-w-3xl"
      >
        {titleChars}
      </h2>
      <p
        ref={paraRef}
        className="text-lg text-gray-400 text-center max-w-xl leading-relaxed"
      >
        {subtitleChars}
      </p>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
