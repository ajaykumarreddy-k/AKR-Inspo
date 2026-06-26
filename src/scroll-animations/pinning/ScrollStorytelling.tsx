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

const storyParts = [
  { text: 'Once upon a time...', sub: 'A story begins', bg: 'from-indigo-900 to-purple-900' },
  { text: 'A hero arose', sub: 'From humble beginnings', bg: 'from-purple-900 to-fuchsia-900' },
  { text: 'They faced great trials', sub: 'Challenges at every turn', bg: 'from-fuchsia-900 to-pink-900' },
  { text: 'And found their strength', sub: 'Inner power awakened', bg: 'from-pink-900 to-rose-900' },
  { text: 'The journey continues...', sub: 'To be continued', bg: 'from-rose-900 to-indigo-900' },
];

export default function ScrollStorytelling({
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
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=500%',
        pin: true,
        markers,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=500%',
          scrub: 1,
          markers: false,
        },
      });

      storyParts.forEach((part, i) => {
        if (i === 0) return;
        const prevSection = sectionsRef.current[i - 1];
        const section = sectionsRef.current[i];
        if (!prevSection || !section) return;

        tl.to(textRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: 'power2.in',
        })
          .set(textRef.current, { text: part.text })
          .to(textRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
          .to(subRef.current, {
            opacity: 0,
            duration: 0.2,
          }, '-=0.6')
          .set(subRef.current, { text: part.sub })
          .to(subRef.current, { opacity: 1, duration: 0.2 }, '-=0.2');
      });

      sectionsRef.current.forEach((section, i) => {
        if (!section) return;
        gsap.fromTo(
          section,
          { backgroundColor: storyParts[i].bg },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub,
              markers: false,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="relative bg-gray-950">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Scroll Storytelling</h2>
          <p className="text-gray-400">Scroll to read the story</p>
        </div>
      </div>

      {storyParts.map((part, i) => (
        <div
          key={i}
          ref={(el) => { sectionsRef.current[i] = el!; }}
          className={`h-screen bg-gradient-to-br ${part.bg} flex items-center justify-center`}
        />
      ))}

      <div ref={pinRef} className="absolute top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-10">
        <div className="text-center px-6">
          <h1 ref={textRef} className="text-5xl md:text-7xl font-bold text-white mb-6">
            {storyParts[0].text}
          </h1>
          <p ref={subRef} className="text-xl md:text-2xl text-white/60">
            {storyParts[0].sub}
          </p>
        </div>
      </div>

      <div className="h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400 text-xl">The end</p>
      </div>
    </div>
  );
}
