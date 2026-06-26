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

const sections = [
  { title: 'Section One', color: 'from-rose-600 to-pink-800', text: 'First pinned section locks into view as you scroll.' },
  { title: 'Section Two', color: 'from-amber-500 to-orange-700', text: 'Second section takes over, each pins independently.' },
  { title: 'Section Three', color: 'from-emerald-500 to-teal-800', text: 'Third section slides in as the previous one releases.' },
  { title: 'Section Four', color: 'from-blue-600 to-indigo-900', text: 'Fourth and final pinned section in the sequence.' },
];

export default function MultiSectionPin({
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
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section, i) => {
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
          markers,
        });

        gsap.from(section.querySelector('.section-content'), {
          scale: 0.8,
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top top',
            scrub,
            markers: false,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="bg-gray-950">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Multi-Section Pin</h2>
          <p className="text-gray-400">Multiple pinned sections in sequence</p>
        </div>
      </div>

      {sections.map((section, i) => (
        <div
          key={i}
          ref={(el) => { sectionsRef.current[i] = el!; }}
          className={`h-screen bg-gradient-to-br ${section.color} flex items-center justify-center px-6`}
        >
          <div className="section-content text-center max-w-lg">
            <span className="text-8xl font-black text-white/10 block mb-4">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-4xl font-bold text-white mb-4">{section.title}</h3>
            <p className="text-white/70 text-lg">{section.text}</p>
          </div>
        </div>
      ))}

      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-400 text-xl">All sections complete</p>
      </div>
    </div>
  );
}
